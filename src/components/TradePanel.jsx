import { useState } from 'react'
import { useApp } from '../state/AppContext.jsx'
import { getMarket, TRADE_DURATIONS } from '../data/markets.js'
import { generateCandles } from '../data/candles.js'
import { TIMEFRAMES } from '../data/markets.js'

const AMOUNT_PRESETS = [10, 25, 50, 100, 250]

function lastPrice(marketId, timeframeId) {
  const market = getMarket(marketId)
  const tf = TIMEFRAMES.find((t) => t.id === timeframeId) || TIMEFRAMES[0]
  const data = generateCandles(market, tf, 40)
  return data[data.length - 1].close
}

// Trade panel: amount input, duration, payout preview, Higher/Lower.
// Trades settle locally after their duration with a simulated outcome.
export default function TradePanel() {
  const {
    selectedMarket, timeframe, amount, duration, account,
    setAmount, setDuration, placeTrade, settleTrade
  } = useApp()
  const market = getMarket(selectedMarket)
  const profit = +(amount * (market.payout / 100)).toFixed(2)
  const [toast, setToast] = useState(null)

  function changeAmount(raw) {
    const n = Number(raw)
    if (Number.isNaN(n) || n < 1) { setAmount(1); return }
    setAmount(Math.floor(n))
  }

  function trade(direction) {
    if (amount < 1 || amount > account.balance) return
    const openPrice = lastPrice(selectedMarket, timeframe)
    const id = 't_' + Date.now()
    // Simulate settlement after the chosen duration (sped up for demo feel).
    const settleMs = Math.min(duration, 8) * 1000
    placeTrade({
      id,
      market: market.name,
      marketId: market.id,
      direction,
      amount,
      payout: market.payout,
      profit,
      account: account.id,
      openPrice,
      result: 'open',
      createdAt: Date.now(),
      expiresAt: Date.now() + settleMs,
      duration
    })
    setToast(`${direction === 'up' ? 'Higher' : 'Lower'} · $${amount} on ${market.name}`)
    setTimeout(() => setToast(null), 2200)
    setTimeout(() => {
      const closePrice = lastPrice(selectedMarket, timeframe)
      const wentUp = closePrice >= openPrice
      const won = direction === 'up' ? wentUp : !wentUp
      settleTrade(id, won, closePrice)
    }, settleMs)
  }

  const tooLow = amount < 1
  const insufficient = amount > account.balance

  return (
    <div className="trade-panel">
      <div className="field">
        <label className="text-dim">Amount</label>
        <div className="amount-row">
          <button className="step" onClick={() => setAmount(amount - 5)}>−</button>
          <input
            className="input amount-input"
            type="number"
            min="1"
            value={amount}
            onChange={(e) => changeAmount(e.target.value)}
          />
          <button className="step" onClick={() => setAmount(amount + 5)}>+</button>
        </div>
        <div className="preset-row" style={{ marginTop: 8 }}>
          {AMOUNT_PRESETS.map((p) => (
            <button
              key={p}
              className={'chip' + (p === amount ? ' active' : '')}
              onClick={() => setAmount(p)}
            >
              ${p}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label className="text-dim">Time</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TRADE_DURATIONS.map((d) => (
            <button
              key={d.id}
              className={'chip' + (d.id === duration ? ' active' : '')}
              onClick={() => setDuration(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="payout-line">
        <span className="text-dim">Payout {market.payout}%</span>
        <span className="up" style={{ fontWeight: 700 }}>+${profit.toFixed(2)}</span>
      </div>

      {insufficient && <div className="down" style={{ fontSize: 12 }}>Insufficient balance</div>}

      <div className="trade-buttons">
        <button className="btn btn-up btn-block" disabled={tooLow || insufficient} onClick={() => trade('up')}>
          ▲ Higher
        </button>
        <button className="btn btn-down btn-block" disabled={tooLow || insufficient} onClick={() => trade('down')}>
          ▼ Lower
        </button>
      </div>

      {toast && <div className="trade-toast">{toast}</div>}
    </div>
  )
}
