import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Bot, Trash2, Sparkles } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import ChatMessage from './components/ChatMessage';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => { fetchHistory(); }, []);
  useEffect(() => { scrollToBottom(); }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/history`);
      setMessages(data);
    } catch (error) { console.error("Error fetching history:", error); }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageText = input;
    setInput('');
    setLoading(true);

    const tempUserMsg = { role: 'user', text: userMessageText, timestamp: new Date() };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const { data } = await axios.post(`${API_URL}/chat`, { message: userMessageText });
      setMessages((prev) => [...prev, data.aiMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    if (window.confirm("Are you sure you want to delete all chat history?")) {
      try {
        await axios.delete(`${API_URL}/history`);
        setMessages([]);
      } catch (error) { console.error("Error clearing history:", error); }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
      
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                  <Bot className="text-white w-5 h-5" />
              </div>
              <div>
                  <h1 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight flex items-center gap-2">
                    Al Assistant <Sparkles size={14} className="text-amber-400" />
                  </h1>
                  <p className="text-[10px] text-green-600 dark:text-green-400 font-semibold tracking-wide flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
                <ThemeToggle />
                <button 
                    onClick={clearChat} 
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all" 
                    title="Clear History"
                >   
                    <Trash2 size={20}  />
                </button>
            </div>
        </div>
      </header>

      
      <main className="flex-1 overflow-y-auto pt-20 pb-4 px-4 scroll-smooth">
        <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-end">
            
            {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-full mb-4">
                    <Bot size={48} className="text-indigo-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">How can I help you today?</h2>
                <p className="text-gray-500 mt-2"> Ask me anything.</p>
            </div>
            )}
            
            {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
            ))}

            {loading && (
            <div className="flex justify-start mb-6">
                <div className="bg-white dark:bg-gray-800 px-5 py-4 rounded-2xl rounded-bl-none border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Thinking</span>
                    <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce animation-delay-200"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                </div>
            </div>
            )}
            
            <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="p-4 bg-transparent">
        <div className="max-w-3xl mx-auto">
            <form 
                onSubmit={handleSend} 
                className="relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-none flex items-center p-2 transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500"
            >
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white px-4 py-3 placeholder-gray-400 font-medium"
                disabled={loading}
                autoFocus
            />
            <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md transform hover:scale-105"
            >
                <Send size={18} strokeWidth={2.5} />
            </button>
            </form>
            <p className="text-center text-xs text-gray-400 mt-2">
                
            </p>
        </div>
      </footer>
    </div>
  );
}

export default App;