// Local mock market catalog. No network, no API. Purely static reference data.
export const MARKETS = [
  { id: 'EURUSD', name: 'EUR/USD', category: 'Forex', payout: 92, basePrice: 1.0865, volatility: 0.0006 },
  { id: 'GBPUSD', name: 'GBP/USD', category: 'Forex', payout: 88, basePrice: 1.2710, volatility: 0.0008 },
  { id: 'USDJPY', name: 'USD/JPY', category: 'Forex', payout: 87, basePrice: 156.40, volatility: 0.09 },
  { id: 'BTCUSD', name: 'BTC/USD', category: 'Crypto', payout: 90, basePrice: 64250, volatility: 120 },
  { id: 'ETHUSD', name: 'ETH/USD', category: 'Crypto', payout: 89, basePrice: 3120, volatility: 9 },
  { id: 'XAUUSD', name: 'Gold', category: 'Commodities', payout: 85, basePrice: 2335.5, volatility: 1.4 },
  { id: 'AAPL', name: 'Apple', category: 'Stocks', payout: 80, basePrice: 195.2, volatility: 0.35 },
  { id: 'TSLA', name: 'Tesla', category: 'Stocks', payout: 82, basePrice: 178.6, volatility: 0.9 }
]

export const TIMEFRAMES = [
  { id: '1m', label: '1m', seconds: 60 },
  { id: '5m', label: '5m', seconds: 300 },
  { id: '15m', label: '15m', seconds: 900 },
  { id: '1h', label: '1h', seconds: 3600 },
  { id: '4h', label: '4h', seconds: 14400 },
  { id: '1d', label: '1d', seconds: 86400 }
]

export const TRADE_DURATIONS = [
  { id: 60, label: '1:00' },
  { id: 180, label: '3:00' },
  { id: 300, label: '5:00' },
  { id: 900, label: '15:00' }
]

export function getMarket(id) {
  return MARKETS.find((m) => m.id === id) || MARKETS[0]
}
