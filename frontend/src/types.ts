export interface Signal {
  symbol: string;
  name: string;
  score: number;
  type: 'BUY' | 'SELL' | 'HOLD';
  potential: string;
  agents: {
    icon: string;
    label: string;
  }[];
}

export interface MarketData {
  name: string;
  price: number;
  change: number;
  sparkline: number[];
}

export interface StockAnalysis {
  symbol: string;
  name: string;
  price: number;
  change: number;
  score: number;
  chartData: { date: string; price: number }[];
  agents: {
    technical: { rsi: number; macd: string; bollinger: string; verdict: string };
    fundamental: { revenue: string; profit: string; highlight: string; verdict: string };
    insider: { recent: string; holding: string; pledge: string; verdict: string };
    sentiment: { articles: number; score: number; theme: string; verdict: string };
    fusion: { convergence: string; backtest: string; confidence: number; verdict: string };
  };
  backtest: { days: number; return: number }[];
  successRate: number;
}

export interface Holding {
  symbol: string;
  qty: number;
  buyPrice: number;
  currentPrice: number;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  agents?: string[];
  sources?: string[];
}
