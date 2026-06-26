import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStockAnalysis } from '../services/api';
import { StockAnalysis } from '../types';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { ArrowLeft, TrendingUp, FileText, Users, Newspaper, Zap, ArrowUpRight } from 'lucide-react';

export default function SignalDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<StockAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (symbol) {
      getStockAnalysis(symbol).then(res => {
        setData(res);
        setLoading(false);
      });
    }
  }, [symbol]);

  if (loading || !data) return (
    <div className="h-screen flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-primary text-4xl font-black"
      >◈</motion.div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-12">
      <motion.button 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
      >
        <ArrowLeft size={14} /> Back to Radar
      </motion.button>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="flex flex-col gap-2">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <h1 className="text-6xl font-black tracking-tighter leading-none">{data.symbol}</h1>
            <div className={`px-4 py-1 rounded-full text-xs font-black tracking-widest border ${data.change >= 0 ? 'bg-bullish/10 text-bullish border-bullish/20' : 'bg-bearish/10 text-bearish border-bearish/20'}`}>
              {data.change >= 0 ? '+' : ''}{data.change}%
            </div>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-xl font-medium tracking-tight"
          >{data.name}</motion.p>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="flex flex-col items-end">
            <span className="text-text-secondary text-[10px] uppercase font-black tracking-[0.2em]">Market Price</span>
            <span className="text-5xl font-black mono tracking-tighter">₹{data.price.toLocaleString('en-IN')}</span>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/[0.03]" />
              <motion.circle 
                cx="48" cy="48" r="42" stroke="currentColor" strokeWidth="10" fill="transparent" 
                strokeDasharray={264}
                initial={{ strokeDashoffset: 264 }}
                animate={{ strokeDashoffset: 264 - (264 * data.score) / 100 }}
                transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                className="text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-black mono text-2xl">{data.score}</div>
          </div>
        </div>
      </header>

      <section className="glass-card p-8 h-[450px]">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-sm font-black uppercase tracking-[0.2em]">Neural Price Trajectory</h3>
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
            {['1W', '1M', '3M', '6M', '1Y'].map(range => (
              <button key={range} className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${range === '1M' ? 'bg-primary text-background' : 'text-text-secondary hover:text-text-primary'}`}>
                {range}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data.chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(5, 5, 8, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
              itemStyle={{ color: '#00f0ff', fontFamily: 'JetBrains Mono', fontSize: '12px' }}
              cursor={{ stroke: '#00f0ff', strokeWidth: 1 }}
            />
            <Area type="monotone" dataKey="price" stroke="#00f0ff" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={4} />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AgentCard 
          icon={<TrendingUp size={20} className="text-primary" />} 
          title="Technical" 
          verdict={data.agents.technical.verdict}
          details={[
            { label: 'RSI', value: data.agents.technical.rsi, color: 'text-bullish' },
            { label: 'MACD', value: data.agents.technical.macd },
            { label: 'Bollinger', value: data.agents.technical.bollinger }
          ]}
        />
        <AgentCard 
          icon={<FileText size={20} className="text-secondary" />} 
          title="Fundamentals" 
          verdict={data.agents.fundamental.verdict}
          details={[
            { label: 'Revenue', value: data.agents.fundamental.revenue },
            { label: 'Profit', value: data.agents.fundamental.profit },
            { label: 'Highlight', value: data.agents.fundamental.highlight, color: 'text-primary' }
          ]}
        />
        <AgentCard 
          icon={<Users size={20} className="text-bullish" />} 
          title="Insider" 
          verdict={data.agents.insider.verdict}
          details={[
            { label: 'Recent', value: data.agents.insider.recent },
            { label: 'Promoter', value: data.agents.insider.holding },
            { label: 'Pledge', value: data.agents.insider.pledge, color: 'text-bullish' }
          ]}
        />
        <AgentCard 
          icon={<Newspaper size={20} className="text-warning" />} 
          title="Sentiment" 
          verdict={data.agents.sentiment.verdict}
          details={[
            { label: 'Articles', value: data.agents.sentiment.articles },
            { label: 'Score', value: `${data.agents.sentiment.score}/1.0`, color: 'text-bullish' },
            { label: 'Theme', value: data.agents.sentiment.theme }
          ]}
        />
      </section>

      <section className="glass-card p-10 border-primary/20 bg-primary/[0.02] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <Zap className="text-primary fill-primary" size={24} />
              </div>
              <h3 className="text-3xl font-black tracking-tighter uppercase">Signal Fusion Engine</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary">Convergence</span>
                <span className="text-lg font-bold">{data.agents.fusion.convergence}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary">Historical Backtest</span>
                <span className="text-lg font-bold">{data.agents.fusion.backtest}</span>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary mb-2 block">Final AI Verdict</span>
              <p className="text-2xl font-black text-primary leading-tight tracking-tight">{data.agents.fusion.verdict}</p>
            </div>
          </div>
          <div className="w-full lg:w-72 flex flex-col items-center gap-6">
            <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Success', value: data.successRate },
                      { name: 'Other', value: 100 - data.successRate }
                    ]}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    <Cell fill="#00ff88" className="drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
                    <Cell fill="rgba(255,255,255,0.03)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black mono tracking-tighter">{data.successRate}%</span>
                <span className="text-[10px] uppercase font-black tracking-widest text-text-secondary">Win Rate</span>
              </div>
            </div>
            <button className="premium-button w-full">Deploy Capital <ArrowUpRight size={18} /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

const AgentCard = ({ icon, title, verdict, details }: { icon: React.ReactNode; title: string; verdict: string; details: { label: string; value: any; color?: string }[] }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="glass-card p-6 flex flex-col gap-4"
  >
    <div className="flex items-center gap-3">
      {icon}
      <h3 className="font-bold text-sm">{title}</h3>
    </div>
    <div className="flex flex-col gap-3">
      {details.map((d, i) => (
        <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-xs text-text-secondary">{d.label}</span>
          <span className={`text-xs font-bold mono ${d.color || 'text-text-primary'}`}>{d.value}</span>
        </div>
      ))}
    </div>
    <div className="mt-auto pt-2">
      <p className="text-[10px] uppercase tracking-widest text-text-secondary mb-1">Verdict</p>
      <p className="text-sm font-medium leading-tight">{verdict}</p>
    </div>
  </motion.div>
);
