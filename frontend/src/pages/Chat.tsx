import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, Zap, Shield, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendChatMessage } from '../services/api';
import { ChatMessage } from '../types';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(input);
      const aiMsg: ChatMessage = { 
        role: 'ai', 
        content: response,
        agents: ['📊 Technical', '📑 Filing', '⚡ Fusion'],
        sources: ['Market Data Feed', 'Institutional Reports']
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 h-[calc(100vh-80px)] flex flex-col py-8 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <header className="flex flex-col items-center mb-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <Bot className="text-primary" size={28} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase glow-text">Market Intelligence</h1>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 text-text-secondary text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <span className="flex items-center gap-1.5"><Zap size={12} className="text-primary" /> Real-time Analysis</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span className="flex items-center gap-1.5"><Shield size={12} className="text-bullish" /> Verified Sources</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-secondary" /> Multi-Agent Fusion</span>
        </motion.div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-4 flex flex-col gap-8 no-scrollbar relative z-10 pb-10"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary opacity-60`}>
                  {msg.role === 'user' ? (
                    <>Investor <User size={12} /></>
                  ) : (
                    <><Bot size={12} /> Opportunity AI</>
                  )}
                </div>
                
                <div className={`p-6 rounded-3xl glass-card relative overflow-hidden ${
                  msg.role === 'user' 
                    ? 'bg-primary/[0.05] border-primary/20 rounded-tr-none' 
                    : 'bg-white/[0.02] border-white/10 rounded-tl-none'
                }`}>
                  {msg.role === 'ai' && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                  )}
                  
                  <div className="markdown-body text-sm leading-relaxed prose prose-invert max-w-none font-medium">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  
                  {msg.agents && (
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
                      {msg.agents.map(agent => (
                        <span key={agent} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-wider text-text-secondary hover:text-primary hover:border-primary/30 transition-colors cursor-default">
                          {agent}
                        </span>
                      ))}
                    </div>
                  )}

                  {msg.sources && (
                    <div className="mt-4 flex flex-wrap gap-3 items-center">
                      <Info size={10} className="text-text-secondary" />
                      {msg.sources.map((source, idx) => (
                        <span key={idx} className="text-[9px] text-text-secondary/60 font-medium italic">
                          [{idx + 1}] {source}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex justify-start"
          >
            <div className="glass-card p-5 rounded-2xl flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-primary/60">Analyzing Markets...</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 relative z-20">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about any stock, market trend, or investment idea..."
            className="relative w-full bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-6 pr-20 focus:outline-none focus:border-primary/40 transition-all text-base backdrop-blur-3xl placeholder:text-text-secondary/40 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-2xl bg-primary text-background hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:scale-100 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            <Send size={22} />
          </button>
        </div>
        <p className="text-center mt-4 text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary/40">
          AI can make mistakes. Verify critical financial data.
        </p>
      </div>
    </div>
  );
}
