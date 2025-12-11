import React, { useState } from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  };

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  return (
    <div className={`group flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}>
      <div 
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm border 
        ${isUser 
            ? 'bg-indigo-600 border-indigo-600 text-white' 
            : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 text-emerald-500'
        }`}
      >
        {isUser ? <User size={20} /> : <Bot size={22} />}
      </div>

      <div
        className={`relative max-w-[85%] lg:max-w-[75%] rounded-2xl px-5 py-4 shadow-sm text-[15px] leading-relaxed
        ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-sm'
            : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-bl-sm border border-gray-100 dark:border-gray-700/50'
        }`}
      >
        <div className="markdown-content">
             {isUser ? (
                <p className="whitespace-pre-wrap">{message.text}</p>
             ) : (
                <ReactMarkdown 
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-4 mb-2 border-b pb-1 border-gray-200 dark:border-gray-700" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-base font-semibold mt-2 mb-1" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-gray-400" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mt-2 space-y-1 marker:text-gray-400" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    strong: ({node, ...props}) => <span className="font-bold text-gray-900 dark:text-white" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    code: ({node, inline, className, children, ...props}) => {
                        return !inline ? (
                          <div className="relative group/code my-4">
                            <div className="absolute right-2 top-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                <button onClick={() => copyCode(String(children))} className="p-1 bg-gray-700 rounded text-gray-300 hover:text-white" title="Copy code">
                                    <Copy size={14}/>
                                </button>
                            </div>
                            <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-gray-700" {...props}>
                                {children}
                            </code>
                          </div>
                        ) : (
                          <code className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400" {...props}>
                            {children}
                          </code>
                        )
                    }
                  }}
                >
                  {message.text}
                </ReactMarkdown>
             )}
        </div>

        <div className={`flex items-center justify-between mt-3 pt-2 ${!isUser && 'border-t border-gray-100 dark:border-gray-700/50'}`}>
            
            {!isUser ? (
                <button 
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-indigo-500 transition-colors p-1 -ml-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    title="Copy response"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-green-500" />
                            <span className="text-green-500">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            ) : (
                <div></div> 
            )}

            <span className={`text-[10px] opacity-60 font-medium ${isUser ? 'text-indigo-100' : 'text-gray-400'}`}>
            {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;