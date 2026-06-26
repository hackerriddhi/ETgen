import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { FloatingParticles } from './components/FloatingParticles';
import Dashboard from './pages/Dashboard';
import Signals from './pages/Signals';
import SignalDetail from './pages/SignalDetail';
import Chat from './pages/Chat';
import Portfolio from './pages/Portfolio';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <FloatingParticles />
        <Navbar />
        <main className="flex-1 relative z-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signals" element={<Signals />} />
            <Route path="/signal/:symbol" element={<SignalDetail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>
        
        <footer className="py-8 text-center text-text-secondary text-xs border-t border-white/5 mt-auto">
          <p>© 2026 Opportunity Radar • AI-Powered Investment Intelligence</p>
          <p className="mt-1 opacity-50">Market data delayed by 15 mins. Not financial advice.</p>
        </footer>
      </div>
    </Router>
  );
}
