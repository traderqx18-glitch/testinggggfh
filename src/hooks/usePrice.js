import { useEffect, useRef, useState } from 'react'
import { getMarket } from '../data/markets.js'

function decimalsFor(market) {
  return market.basePrice > 100 ? 2 : 5
}

// Locally simulated live price for a market. Mirrors the chart's mock
// model (base price + volatility random walk). No network, no API.
// Returns { price, open, change, changePct, decimals }.
export function usePrice(marketId, intervalMs = 1000) {
  const market = getMarket(marketId)
  const openRef = useRef(market.basePrice)
  const priceRef = useRef(market.basePrice)
  const [price, setPrice] = useState(market.basePrice)

  // Reset session open when the market changes.
  useEffect(() => {
    openRef.current = market.basePrice
    priceRef.current = market.basePrice
    setPrice(market.basePrice)
  }, [market.id, market.basePrice])

  useEffect(() => {
    const id = setInterval(() => {
      const drift = (Math.random() - 0.5) * market.volatility * 2
      const next = priceRef.current + drift
      priceRef.current = next
      setPrice(next)
    }, intervalMs)
    return () => clearInterval(id)
  }, [market.id, market.volatility, intervalMs])

  const open = openRef.current
  const change = price - open
  const changePct = open !== 0 ? (change / open) * 100 : 0
  return { price, open, change, changePct, decimals: decimalsFor(market) }
}
