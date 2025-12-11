const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['user', 'model', 'assistant'], 
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', chatSchema);