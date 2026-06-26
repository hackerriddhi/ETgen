import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getPortfolioSignals } from '../services/api';
import { Holding, Signal } from '../types';
import { SignalCard } from '../components/SignalCard';
import { Plus, Trash2, TrendingUp, TrendingDown, AlertCircle, Wallet, PieChart as PieIcon, Activity, ArrowUpRight, Search } from 'lucide-react';

export default function Portfolio() {
  const [holdings, setHoldings] = useState<Holding[]>([
    { symbol: 'RELIANCE', qty: 10, buyPrice: 2650, currentPrice: 2845.20 },
    { symbol: 'TCS', qty: 5, buyPrice: 3800, currentPrice: 3912.45 },
    { symbol: 'HDFCBANK', qty: 15, buyPrice: 1520, currentPrice: 1520.45 }
  ]);
  const [relevantSignals, setRelevantSignals] = useState<Signal[]>([]);
  const [newSymbol, setNewSymbol] = useState('');
  const [newQty, setNewQty] = useState('');
  const [newPrice, setNewPrice] = useState('');

  useEffect(() => {
    getPortfolioSignals(holdings).then(setRelevantSignals);
  }, [holdings]);

  const addHolding = () => {
    if (!newSymbol || !newQty || !newPrice) return;
    const holding: Holding = {
      symbol: newSymbol.toUpperCase(),
      qty: Number(newQty),
      buyPrice: Number(newPrice),
      currentPrice: Number(newPrice) * 1.02 // Mock current price
    };
    setHoldings([...holdings, holding]);
    setNewSymbol('');
    setNewQty('');
    setNewPrice('');
  };

  const removeHolding = (symbol: string) => {
    setHoldings(holdings.filter(h => h.symbol !== symbol));
  };

  const totalInvestment = holdings.reduce((acc, h) => acc + h.qty * h.buyPrice, 0);
  const currentValuation = holdings.reduce((acc, h) => acc + h.qty * h.currentPrice, 0);
  const totalPnL = currentValuation - totalInvestment;
  const totalPnLPercent = (totalPnL / totalInvestment) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-12">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="flex flex-col gap-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <Wallet className="text-primary" size={24} />
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase glow-text">Portfolio Intelligence</h1>
          </motion.div>
          <p className="text-text-secondary font-medium tracking-tight">Real-time performance tracking with AI-driven signal fusion.</p>
        </div>
        
        <div className="flex flex-wrap gap-8 lg:gap-12">
          <div className="flex flex-col items-start lg:items-end">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary mb-1">Current Valuation</span>
            <span className="text-4xl font-black mono tracking-tighter">₹{currentValuation.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex flex-col items-start lg:items-end">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary mb-1">Total Returns</span>
            <div className={`flex items-center gap-2 text-4xl font-black mono tracking-tighter ${totalPnL >= 0 ? 'text-bullish' : 'text-bearish'}`}>
              {totalPnL >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
              <span>{totalPnL >= 0 ? '+' : ''}₹{Math.abs(totalPnL).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              <span className="text-lg opacity-60 ml-1">({totalPnLPercent.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <section className="glass-card p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
            <div className="flex items-center gap-3 mb-8">
              <Plus className="text-primary" size={20} />
              <h3 className="text-sm font-black uppercase tracking-[0.2em]">Add Asset to Radar</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-text-secondary ml-1">Symbol</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
                  <input 
                    placeholder="e.g. RELIANCE" 
                    value={newSymbol}
                    onChange={e => setNewSymbol(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all font-bold"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-text-secondary ml-1">Quantity</label>
                <input 
                  placeholder="0" 
                  type="number"
                  value={newQty}
                  onChange={e => setNewQty(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all font-bold"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-black tracking-widest text-text-secondary ml-1">Buy Price</label>
                <input 
                  placeholder="₹0.00" 
                  type="number"
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all font-bold"
                />
              </div>
              <div className="flex flex-col justify-end">
                <button 
                  onClick={addHolding}
                  className="premium-button w-full py-3.5"
                >
                  Track Asset
                </button>
              </div>
            </div>
          </section>

          <section className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-sm font-black uppercase tracking-[0.2em]">Asset Breakdown</h3>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
                <Activity size={12} className="text-primary" /> Live Market Feed
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02]">
                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black">Asset</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black">Holdings</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black">Avg Cost</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black">LTP</th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-[0.2em] text-text-secondary font-black">Unrealized P&L</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {holdings.map((h, i) => {
                      const pnl = (h.currentPrice - h.buyPrice) * h.qty;
                      const pnlPercent = ((h.currentPrice - h.buyPrice) / h.buyPrice) * 100;
                      return (
                        <motion.tr 
                          key={h.symbol}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: i * 0.05 }}
                          className="hover:bg-white/[0.03] transition-colors group"
                        >
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              <span className="text-lg font-black tracking-tight">{h.symbol}</span>
                              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Equity</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-sm font-bold mono">{h.qty} Units</span>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-sm font-bold mono text-text-secondary">₹{h.buyPrice.toLocaleString()}</span>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-sm font-bold mono">₹{h.currentPrice.toLocaleString()}</span>
                          </td>
                          <td className="px-8 py-6">
                            <div className={`flex flex-col ${pnl >= 0 ? 'text-bullish' : 'text-bearish'}`}>
                              <span className="text-sm font-black mono">{pnl >= 0 ? '+' : ''}₹{pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                              <span className="text-[10px] font-black uppercase tracking-widest">{pnlPercent.toFixed(2)}%</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button 
                              onClick={() => removeHolding(h.symbol)} 
                              className="p-2 rounded-lg hover:bg-bearish/10 text-text-secondary hover:text-bearish transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="glass-card p-10 flex flex-col items-center text-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bullish/40 to-transparent" />
            <div className="flex flex-col items-center gap-2">
              <Activity className="text-bullish" size={24} />
              <h3 className="text-sm font-black uppercase tracking-[0.2em]">Portfolio Health</h3>
            </div>
            
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/[0.03]" />
                <motion.circle 
                  cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={552}
                  initial={{ strokeDashoffset: 552 }}
                  animate={{ strokeDashoffset: 552 - (552 * 82) / 100 }}
                  transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                  className="text-bullish drop-shadow-[0_0_12px_rgba(0,255,136,0.4)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black mono tracking-tighter">82</span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary">Optimum</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <HealthItem label="Diversification" value="Superior" color="text-bullish" />
              <HealthItem label="Risk Exposure" value="Moderate" color="text-warning" />
              <HealthItem label="AI Conviction" value="High" color="text-primary" />
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <AlertCircle size={16} className="text-primary" />
                Holding Signals
              </h3>
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest">
                {relevantSignals.length} Active
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {relevantSignals.map((s, i) => (
                <SignalCard key={s.symbol} signal={s} index={i} />
              ))}
              {relevantSignals.length === 0 && (
                <div className="glass-card p-10 text-center flex flex-col items-center gap-4">
                  <PieIcon size={32} className="text-text-secondary opacity-20" />
                  <p className="text-xs font-medium text-text-secondary tracking-tight">
                    No critical AI signals detected for your current asset pool.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const HealthItem = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-colors">
    <span className="text-[10px] uppercase font-black tracking-widest text-text-secondary">{label}</span>
    <span className={`text-xs font-black uppercase tracking-wider ${color}`}>{value}</span>
  </div>
);
