require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Groq = require('groq-sdk');
const Chat = require('./models/Chat');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' Connected to MongoDB');
    listAvailableModels();
  })
  .catch((err) => console.error(' MongoDB Connection Error:', err));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function listAvailableModels() {
  try {
    const models = await groq.models.list();
    console.log('\n Available Groq Models:');
    models.data.forEach(model => {
      console.log(`  - ${model.id}`);
    });
    console.log('\n');
  } catch (error) {
    console.error(' Failed to list models:', error.message);
  }
}

app.get('/api/history', async (req, res) => {
  try {
    const history = await Chat.find().sort({ timestamp: 1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const userChat = new Chat({ role: 'user', text: message });
    await userChat.save();

    const result = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 1024
    });

    const aiResponseText = result.choices[0].message.content;

    const aiChat = new Chat({ role: 'assistant', text: aiResponseText });
    await aiChat.save();

    res.json({ userMsg: userChat, aiMsg: aiChat });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.delete('/api/history', async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.json({ message: "Chat cleared" });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});