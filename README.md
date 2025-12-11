#  AI Chat Assistant 
A modern, full-stack AI Chat application built with the MERN stack (MongoDB, Express, React, Node.js). It features real-time AI responses using the Groq, dark/light mode, and persistent chat history stored in MongoDB.

###  **Live Demo**

> **Frontend:** [https://ai-chat-app-pas.vercel.app]  
> **Backend:** [https://ai-chat-app-k3rl.onrender.com]

-----

##  Screenshots

![ Preview](https://github.com/user-attachments/assets/f1b0782a-2269-4da1-87b6-6ec924745162)


-----

##  Features

  *  Smart AI Integration: Powered by Groq (Llama 3) for lightning-fast responses.
  *  Persistent History: All conversations are saved to MongoDB and loaded on refresh.
  *  Dark/Light Theme: Fully responsive UI with a seamless theme toggler.
  *  Markdown Support: Properly renders code blocks, bold text, lists, and headers.
  *  One-Click Copy: Easily copy AI responses or specific code blocks.
  *  Responsive Design: Works perfectly on Mobile, Tablet, and Desktop.

-----

## 🛠️ Tech Stack

**Frontend:**

  * React (Vite)
  * Tailwind CSS (Styling)
  * Lucide React (Icons)
  * Axios (API Requests)

**Backend:**

  * Node.js & Express
  * MongoDB & Mongoose
  * Groq SDK (AI Model)
  * Cors & Dotenv

-----

## 📂 Folder Structure

The project is organized into two main folders: `frontend` (React UI) and `backend` (Express Server).

```

ai-chat-app/
├── backend/                \Node.js & Express Server
│   ├── models/
│   │   └── Chat.js         \Mongoose Schema for saving messages
│   ├── .env                \API Keys (MongoDB, Groq)
│   ├── server.js           \Main server entry point
│   └── package.json
│
└── frontend/               \React + Vite Client
├── public/
├── src/
│   ├── components/
│   │   ├── ChatMessage.jsx  \Individual chat  component
│   │   └── ThemeToggle.jsx  \Dark/Light mode switch
│   ├── App.jsx              \Main chat interface logic
│   ├── index.css            \Tailwind & global styles
│   └── main.jsx
├── .env                \API URL configuration
├── tailwind.config.js
└── package.json

```


## ⚙️ Installation & Setup

### 1\. Clone the Repository

```bash
git clone https://github.com/prathamesonar/ai-chat-app.git
cd ai-chat-app
```

### 2\. Backend Setup

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Start the server:

```bash
node server.js
```

### 3\. Frontend Setup

Open a new terminal, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the React app:

```bash
npm run dev
```



