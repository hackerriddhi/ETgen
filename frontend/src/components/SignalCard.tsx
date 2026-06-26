import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Signal } from '../types';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';

export const SignalCard = ({ signal, index }: { signal: Signal; index: number }) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getScoreColor = (score: number) => {
    if (score > 70) return 'text-bullish';
    if (score > 40) return 'text-warning';
    return 'text-bearish';
  };

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'BUY': return 'bg-bullish/10 text-bullish border-bullish/20 shadow-[0_0_15px_rgba(0,255,136,0.2)]';
      case 'SELL': return 'bg-bearish/10 text-bearish border-bearish/20 shadow-[0_0_15px_rgba(255,51,102,0.2)]';
      default: return 'bg-warning/10 text-warning border-warning/20 shadow-[0_0_15px_rgba(255,170,0,0.2)]';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-6 flex flex-col gap-5 cursor-pointer group"
      onClick={() => navigate(`/signal/${signal.symbol}`)}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${(Number(x) + 0.5) * 100}% ${(Number(y) + 0.5) * 100}%, rgba(0, 240, 255, 0.08), transparent 40%)`
          )
        }}
      />

      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold tracking-tighter group-hover:text-primary transition-colors duration-300">{signal.symbol}</h3>
            <Sparkles size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">{signal.name}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={`text-3xl font-bold mono leading-none ${getScoreColor(signal.score)}`}>
            {signal.score}
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest border ${getBadgeStyles(signal.type)}`}>
            {signal.type}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 relative z-10">
        {signal.agents.map((agent, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:border-white/10 transition-colors">
            <span className="text-lg">{agent.icon}</span>
            <span className="text-xs font-medium text-text-primary/90">{agent.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-5 border-t border-white/[0.08] flex items-center justify-between relative z-10">
        <div>
          <p className="text-[9px] uppercase font-black tracking-[0.2em] text-text-secondary mb-1">AI Potential</p>
          <p className="text-bullish font-bold mono text-base">{signal.potential}</p>
        </div>
        <button className="premium-button !px-4 !py-2 !text-[11px] !rounded-lg">
          Analyze <ArrowUpRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

