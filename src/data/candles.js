// Deterministic-ish local OHLC generator. Produces mock candles for the
// chart from a market's base price + volatility. No external data source.
export function generateCandles(market, timeframe, count = 160) {
  const now = Math.floor(Date.now() / 1000)
  const step = timeframe.seconds
  const start = now - step * count
  const candles = []
  let price = market.basePrice
  let seed = hashString(market.id + timeframe.id)

  for (let i = 0; i < count; i++) {
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    const drift = (rnd() - 0.5) * market.volatility * 2
    const open = price
    const close = open + drift
    const high = Math.max(open, close) + rnd() * market.volatility
    const low = Math.min(open, close) - rnd() * market.volatility
    candles.push({
      time: start + i * step,
      open: round(open, market),
      high: round(high, market),
      low: round(low, market),
      close: round(close, market)
    })
    price = close
  }
  return candles
}

// Returns the next candle following the last one, for live simulation.
export function nextCandle(prev, market, timeframe) {
  const rnd = Math.random()
  const drift = (rnd - 0.5) * market.volatility * 2
  const open = prev.close
  const close = open + drift
  const high = Math.max(open, close) + Math.random() * market.volatility
  const low = Math.min(open, close) - Math.random() * market.volatility
  return {
    time: prev.time + timeframe.seconds,
    open: round(open, market),
    high: round(high, market),
    low: round(low, market),
    close: round(close, market)
  }
}

function round(v, market) {
  const decimals = market.basePrice > 100 ? 2 : 5
  return Number(v.toFixed(decimals))
}

function hashString(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h) % 233280
}
