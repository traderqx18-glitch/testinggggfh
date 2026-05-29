// Local mock market catalog. No network, no API. Purely static reference data.
// `flag` is rendered as emoji (may show as letters on some OSes); `isOtc`
// marks over-the-counter markets shown with a distinct badge.
export const MARKETS = [
  { id: 'EURUSD', name: 'EUR/USD', flag: '\uD83C\uDDEA\uD83C\uDDFA\uD83C\uDDFA\uD83C\uDDF8', category: 'Forex', isOtc: false, payout: 92, basePrice: 1.0865, volatility: 0.0006 },
  { id: 'GBPUSD', name: 'GBP/USD', flag: '\uD83C\uDDEC\uD83C\uDDE7\uD83C\uDDFA\uD83C\uDDF8', category: 'Forex', isOtc: false, payout: 88, basePrice: 1.2710, volatility: 0.0008 },
  { id: 'USDJPY', name: 'USD/JPY', flag: '\uD83C\uDDFA\uD83C\uDDF8\uD83C\uDDEF\uD83C\uDDF5', category: 'Forex', isOtc: false, payout: 87, basePrice: 156.40, volatility: 0.09 },
  { id: 'EURUSD_OTC', name: 'EUR/USD OTC', flag: '\uD83C\uDDEA\uD83C\uDDFA\uD83C\uDDFA\uD83C\uDDF8', category: 'Forex', isOtc: true, payout: 95, basePrice: 1.0870, volatility: 0.0007 },
  { id: 'GBPUSD_OTC', name: 'GBP/USD OTC', flag: '\uD83C\uDDEC\uD83C\uDDE7\uD83C\uDDFA\uD83C\uDDF8', category: 'Forex', isOtc: true, payout: 93, basePrice: 1.2715, volatility: 0.0009 },
  { id: 'BTCUSD', name: 'BTC/USD', flag: '', category: 'Crypto', isOtc: false, payout: 90, basePrice: 64250, volatility: 120 },
  { id: 'ETHUSD', name: 'ETH/USD', flag: '', category: 'Crypto', isOtc: false, payout: 89, basePrice: 3120, volatility: 9 },
  { id: 'XAUUSD', name: 'Gold', flag: '', category: 'Commodities', isOtc: false, payout: 85, basePrice: 2335.5, volatility: 1.4 },
  { id: 'AAPL', name: 'Apple', flag: '', category: 'Stocks', isOtc: false, payout: 80, basePrice: 195.2, volatility: 0.35 },
  { id: 'TSLA', name: 'Tesla', flag: '', category: 'Stocks', isOtc: false, payout: 82, basePrice: 178.6, volatility: 0.9 }
]

export const TIMEFRAMES = [
  { id: '1m', label: '1m', seconds: 60 },
  { id: '5m', label: '5m', seconds: 300 },
  { id: '15m', label: '15m', seconds: 900 },
  { id: '1h', label: '1H', seconds: 3600 },
  { id: '4h', label: '4H', seconds: 14400 },
  { id: '1d', label: '1D', seconds: 86400 }
]

// Trade expiration durations (seconds). Independent from chart timeframes.
export const TRADE_DURATIONS = [
  { id: 30, label: '30 sec' },
  { id: 60, label: '1 min' },
  { id: 120, label: '2 min' },
  { id: 300, label: '5 min' }
]

export function getMarket(id) {
  return MARKETS.find((m) => m.id === id) || MARKETS[0]
}
