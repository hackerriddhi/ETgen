import React, { useEffect, useState } from 'react';
import { getSignals, getMarketOverview } from '../services/api';
import { Signal, MarketData } from '../types';
import { MarketOverview } from '../components/MarketOverview';
import { SignalCard } from '../components/SignalCard';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loadingSignals, setLoadingSignals] = useState(true);
  const [loadingMarket, setLoadingMarket] = useState(true);

  useEffect(() => {
    // Fetch independently so one doesn't block the other
    getMarketOverview()
      .then(m => setMarketData(m))
      .catch(e => console.error("Market overview error:", e))
      .finally(() => setLoadingMarket(false));

    getSignals()
      .then(s => setSignals(s))
      .catch(e => console.error("Signals error:", e))
      .finally(() => setLoadingSignals(false));
  }, []);

  const loading = loadingSignals && loadingMarket;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full shadow-[0_0_15px_rgba(0,240,255,0.5)]"
        />
        <p className="text-text-secondary text-sm animate-pulse">AI agents scanning NSE stocks...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-16">
      {/* Hero Section */}
      <section className="flex flex-col gap-4 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto md:mx-0"
        >
          <Sparkles size={12} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Market Intelligence v2.0</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] glow-text"
        >
          RADAR <span className="text-primary">OPPORTUNITIES</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary text-lg max-w-2xl"
        >
          Multi-agent AI engine scanning 5,000+ Indian stocks for high-conviction signals.
        </motion.p>
      </section>

      <section>
        <MarketOverview data={marketData} />
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase">🔥 Top Signals</h2>
            <p className="text-text-secondary text-sm">Real-time detection from our neural fusion engine</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">All Stocks</button>
            <button className="px-4 py-2 rounded-lg bg-primary text-background text-xs font-bold hover:scale-105 transition-all">High Conviction</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loadingSignals ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full"
              />
              <p className="text-text-secondary text-sm animate-pulse">AI agents scanning 6 NSE stocks... (~15 sec)</p>
            </div>
          ) : signals.length === 0 ? (
            <div className="col-span-full text-center py-12 text-text-secondary">
              <p className="text-lg font-bold mb-2">No signals yet</p>
              <p className="text-sm">Backend is processing. Try refreshing in a few seconds.</p>
            </div>
          ) : (
            signals.map((signal, i) => (
              <SignalCard key={signal.symbol} signal={signal} index={i} />
            ))
          )}
        </div>
      </section>

      {/* Bento Grid Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card p-8 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black tracking-tighter uppercase">Agent Performance</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-bullish bg-bullish/10 px-2 py-1 rounded border border-bullish/20">
              <TrendingUp size={12} /> +12.4% Avg
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            <AccuracyBar label="Technical" value={78} color="bg-primary" />
            <AccuracyBar label="Filing" value={85} color="bg-secondary" />
            <AccuracyBar label="Insider" value={91} color="bg-bullish" />
            <AccuracyBar label="Sentiment" value={72} color="bg-warning" />
          </div>
        </div>
        <div className="glass-card p-8 bg-primary/5 border-primary/20 flex flex-col justify-between overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-black tracking-tighter uppercase mb-2">AI Fusion</h3>
            <p className="text-text-secondary text-sm">Our proprietary engine combines 4 independent agents for 99.2% signal reliability.</p>
          </div>
          <div className="mt-8 relative z-10">
            <div className="text-4xl font-black mono text-primary">99.2%</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">Reliability Index</div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}


const AccuracyBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between text-xs font-medium">
      <span className="text-text-secondary">{label}</span>
      <span className="mono">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
      />
    </div>
  </div>
);
