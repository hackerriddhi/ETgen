import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getSignals } from '../services/api';
import { Signal } from '../types';
import { SignalCard } from '../components/SignalCard';
import { Search, Filter, SlidersHorizontal, Zap, TrendingUp, TrendingDown, Target } from 'lucide-react';

export default function Signals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getSignals().then(res => {
      setSignals(res);
      setLoading(false);
    });
  }, []);

  const filteredSignals = signals.filter(s => {
    const matchesFilter = filter === 'ALL' || s.type === filter;
    const matchesSearch = s.symbol.toLowerCase().includes(search.toLowerCase()) || 
                          s.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-primary text-5xl font-black"
      >◈</motion.div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <Zap className="text-primary" size={24} />
          </div>
          <h1 className="text-5xl font-black tracking-tighter uppercase glow-text">Signal Intelligence</h1>
        </motion.div>
        <p className="text-text-secondary font-medium tracking-tight max-w-2xl">
          Real-time institutional-grade signals fused from technical, fundamental, and alternative data sources.
        </p>
      </header>

      <section className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center sticky top-24 z-40 backdrop-blur-3xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text"
            placeholder="Search symbols or company names..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-primary/50 transition-all font-bold"
          />
        </div>
        
        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
          {['ALL', 'BUY', 'SELL', 'HOLD'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === type ? 'bg-primary text-background shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <button className="p-4 rounded-2xl bg-white/5 border border-white/10 text-text-secondary hover:text-primary transition-all">
          <SlidersHorizontal size={18} />
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredSignals.map((s, i) => (
            <SignalCard key={s.symbol} signal={s} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filteredSignals.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-32 text-center flex flex-col items-center gap-6"
        >
          <div className="p-6 rounded-full bg-white/5 border border-white/10">
            <Target size={48} className="text-text-secondary opacity-20" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-black tracking-tight">No Signals Detected</h3>
            <p className="text-text-secondary text-sm font-medium">Try adjusting your filters or search parameters.</p>
          </div>
        </motion.div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <StatsCard 
          icon={<TrendingUp className="text-bullish" />} 
          label="Avg. Bullish Conviction" 
          value="84.2%" 
          sub="Across 12 Signals"
        />
        <StatsCard 
          icon={<TrendingDown className="text-bearish" />} 
          label="Avg. Bearish Conviction" 
          value="71.5%" 
          sub="Across 4 Signals"
        />
        <StatsCard 
          icon={<Zap className="text-primary" />} 
          label="Fusion Accuracy" 
          value="89.1%" 
          sub="Last 30 Days"
        />
      </section>
    </div>
  );
}

const StatsCard = ({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) => (
  <div className="glass-card p-8 flex flex-col gap-4 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform" />
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary">{label}</span>
    </div>
    <div className="flex flex-col">
      <span className="text-4xl font-black mono tracking-tighter">{value}</span>
      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-1">{sub}</span>
    </div>
  </div>
);
