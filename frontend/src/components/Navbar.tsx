import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { LayoutDashboard, Zap, MessageSquare, Briefcase, Globe, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[100] border-b border-white/5 bg-background/60 backdrop-blur-2xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 group relative">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all" />
            <span className="relative text-primary text-3xl font-black tracking-tighter">◈</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter glow-text group-hover:text-primary transition-colors leading-none">
              OPPORTUNITY RADAR
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-text-secondary opacity-60">AI Investment Fusion</span>
          </div>
        </NavLink>

        <div className="hidden md:flex items-center gap-10">
          <NavItem to="/" icon={<LayoutDashboard size={16} />} label="Dashboard" />
          <NavItem to="/signals" icon={<Zap size={16} />} label="Signals" />
          <NavItem to="/chat" icon={<MessageSquare size={16} />} label="Intelligence" />
          <NavItem to="/portfolio" icon={<Briefcase size={16} />} label="Portfolio" />
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-bullish" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Secure</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">NSE/BSE Live</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-primary/10 border border-primary/20 group cursor-pointer hover:bg-primary/20 transition-all">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00f0ff]"
            />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">AI Core Active</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary group ${
        isActive ? 'text-primary' : 'text-text-secondary'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span className={`transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-text-secondary/60'}`}>
          {icon}
        </span>
        {label}
        {isActive && (
          <motion.div 
            layoutId="nav-underline"
            className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_#00f0ff]"
          />
        )}
      </>
    )}
  </NavLink>
);
