import { Holding, MarketData, Signal, StockAnalysis, ChatMessage } from '../types';

const API_BASE = "https://etgenbackend.onrender.com/api";

// ─── API Functions — all data from real backend ───

export async function getSignals(): Promise<Signal[]> {
  const res = await fetch(`${API_BASE}/signals?limit=6`, { signal: AbortSignal.timeout(60000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

export async function getStockAnalysis(symbol: string): Promise<StockAnalysis> {
  const res = await fetch(`${API_BASE}/stock/${symbol}`, { signal: AbortSignal.timeout(45000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

export async function sendChatMessage(message: string): Promise<string> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data.response;
}

export async function getPortfolioSignals(holdings: Holding[]): Promise<Signal[]> {
  const res = await fetch(`${API_BASE}/portfolio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ holdings }),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}

export async function getMarketOverview(): Promise<MarketData[]> {
  const res = await fetch(`${API_BASE}/market-overview`, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}
