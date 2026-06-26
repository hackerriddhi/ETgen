import React from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { MarketData } from '../types';

export const MarketOverview = ({ data }: { data: MarketData[] }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {data.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card min-w-[240px] p-4 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{item.name}</span>
            <span className={`text-xs font-bold mono ${item.change >= 0 ? 'text-bullish' : 'text-bearish'}`}>
              {item.change >= 0 ? '+' : ''}{item.change}%
            </span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <span className="text-xl font-bold mono tracking-tighter">
              {item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <div className="w-20 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={item.sparkline.map(v => ({ v }))}>
                  <defs>
                    <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={item.change >= 0 ? '#00ff88' : '#ff3366'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={item.change >= 0 ? '#00ff88' : '#ff3366'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={item.change >= 0 ? '#00ff88' : '#ff3366'}
                    fill={`url(#grad-${i})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
