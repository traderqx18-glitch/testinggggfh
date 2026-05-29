import { usePrice } from '../hooks/usePrice.js'

// Compact live price + session change readout for the dashboard header.
// Driven by a local simulation only.
export default function PriceTicker({ marketId }) {
  const { price, change, changePct, decimals } = usePrice(marketId)
  const up = change >= 0
  return (
    <div className="price-ticker">
      <span className="price-ticker-value">{price.toFixed(decimals)}</span>
      <span className={up ? 'up' : 'down'} style={{ fontSize: 12, fontWeight: 700 }}>
        {up ? '▲' : '▼'} {Math.abs(changePct).toFixed(2)}%
      </span>
    </div>
  )
}
