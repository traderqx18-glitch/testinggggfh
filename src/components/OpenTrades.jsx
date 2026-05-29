import { useEffect, useState } from 'react'
import { useApp } from '../state/AppContext.jsx'
import { usePrice } from '../hooks/usePrice.js'
import { getMarket } from '../data/markets.js'

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Estimated live P/L for an open binary trade: full payout if currently
// in-the-money, otherwise the staked amount at risk. Local estimate only.
function estimatePL(trade, price) {
  const inMoney = trade.direction === 'up' ? price >= trade.openPrice : price <= trade.openPrice
  return inMoney ? trade.profit : -trade.amount
}

function TradeRow({ trade }) {
  const { price, decimals } = usePrice(trade.marketId)
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(id)
  }, [])

  const pl = estimatePL(trade, price)
  const up = pl >= 0
  const left = trade.expiresAt ? Math.max(0, Math.ceil((trade.expiresAt - now) / 1000)) : null

  return (
    <div className="open-trade">
      <div className="open-trade-main">
        <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          {getMarket(trade.marketId).name.replace(' OTC', '')}
          <span className="text-dim" style={{ fontSize: 11 }}>
            {trade.direction === 'up' ? '\u25B2' : '\u25BC'}
          </span>
        </div>
        <div className="text-dim" style={{ fontSize: 11 }}>
          ${fmt(trade.amount)} · entry {trade.openPrice.toFixed(decimals)}
        </div>
      </div>
      <div className="open-trade-right">
        <span className={up ? 'up' : 'down'} style={{ fontWeight: 700, fontSize: 13 }}>
          {up ? '+' : '\u2212'}{fmt(Math.abs(pl))} USD
        </span>
        {left != null && <span className="text-dim" style={{ fontSize: 11 }}>{left}s</span>}
      </div>
    </div>
  )
}

// Active trades for the current account, shown below the trade buttons.
export default function OpenTrades() {
  const { trades, activeAccount } = useApp()
  const open = trades.filter((t) => t.result === 'open' && t.account === activeAccount)
  if (open.length === 0) return null
  return (
    <div className="open-trades">
      <div className="text-dim" style={{ fontSize: 12, fontWeight: 600 }}>Open trades</div>
      {open.map((t) => <TradeRow key={t.id} trade={t} />)}
    </div>
  )
}
