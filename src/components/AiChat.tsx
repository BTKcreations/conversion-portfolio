import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hey! 👋 I\'m **Tharun** — I reply in **English or Telugu** only. Ask me about my work, projects, services, or pricing!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:4000/api/chat' 
        : 'https://api.bstk.in/api/chat';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          history: messages.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content }))
        })
      });

      if (!response.ok) throw new Error('Failed to connect to backend.');

      // Prepare for streaming
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      setMessages(prev => [...prev, { role: 'bot', content: '' }]);
      
      if (reader) {
        let accumulatedResponse = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          accumulatedResponse += chunk;
          
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = accumulatedResponse;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: 'Hmm, something went wrong on my end. Please try again in a moment — or reach me directly via the contact form.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] h-[70vh] sm:h-[520px] rounded-3xl flex flex-col overflow-hidden shadow-2xl shadow-neutral-950/20 bg-white border border-neutral-200"
          >
            {/* Header */}
            <div className="p-4 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neutral-950 flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-neutral-900">Ask Tharun AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
                    </span>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-2 hover:bg-neutral-200/70 rounded-lg transition-colors text-neutral-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-neutral-950 text-white' : 'bg-emerald-600 text-white'}`}>
                      {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed prose-chat ${
                      m.role === 'user' 
                        ? 'bg-neutral-950 text-white rounded-tr-none' 
                        : 'bg-neutral-100 text-neutral-800 rounded-tl-none border border-neutral-200/70'
                    }`}>
                      {m.content ? (
                        <div className="break-words">
                          <ReactMarkdown>
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        isLoading && i === messages.length - 1 ? <Loader2 size={14} className="animate-spin text-emerald-600" /> : ''
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-100 bg-neutral-50/80">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my work, skills, pricing..."
                  className="w-full bg-white border border-neutral-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-emerald-600 transition-colors text-neutral-900 placeholder:text-neutral-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neutral-950 hover:bg-emerald-600 disabled:bg-neutral-300 disabled:opacity-50 text-white rounded-lg transition-all"
                >
                  {isLoading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                </button>
              </div>
              <p className="text-[10px] text-center text-neutral-400 mt-2">
                AI assistant · responses may take a few seconds
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI chat"
        className="w-14 h-14 rounded-full bg-neutral-950 hover:bg-emerald-600 flex items-center justify-center text-white shadow-2xl shadow-neutral-950/30 transition-colors relative"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default AiChat;
