import { useEffect, useState } from 'react'
import { useApp } from '../state/AppContext.jsx'

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function time(ts) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function Countdown({ expiresAt }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(id)
  }, [])
  const left = Math.max(0, Math.ceil((expiresAt - now) / 1000))
  return <span className="text-dim">{left}s</span>
}

function StatusBadge({ result }) {
  const map = {
    open: { cls: 'badge badge-open', label: 'Open' },
    win: { cls: 'badge badge-win', label: 'Win' },
    loss: { cls: 'badge badge-loss', label: 'Loss' }
  }
  const s = map[result] || map.open
  return <span className={s.cls}>{s.label}</span>
}

// Trade history driven entirely by local state.
export default function History() {
  const { trades } = useApp()
  return (
    <div className="page">
      <h2>Trade history</h2>
      {trades.length === 0 && (
        <div className="text-dim">No trades yet. Place your first trade from the dashboard.</div>
      )}
      <div className="history-list">
        {trades.map((t) => (
          <div key={t.id} className="card history-item">
            <div className="history-main">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700 }}>{t.market}</span>
                <StatusBadge result={t.result} />
              </div>
              <div className="text-dim" style={{ fontSize: 12 }}>
                {t.direction === 'up' ? '▲ Higher' : '▼ Lower'} · {t.account} · ${fmt(t.amount)}
              </div>
              <div className="text-dim" style={{ fontSize: 11, marginTop: 2 }}>
                {time(t.createdAt)}
                {t.openPrice != null && <> · open {t.openPrice}</>}
                {t.result !== 'open' && t.closePrice != null && <> · close {t.closePrice}</>}
              </div>
            </div>
            <div className="history-result">
              {t.result === 'open' && t.expiresAt != null && <Countdown expiresAt={t.expiresAt} />}
              {t.result === 'open' && t.expiresAt == null && <span className="text-dim">Open…</span>}
              {t.result === 'win' && <span className="up" style={{ fontWeight: 700 }}>+${fmt(t.profit)}</span>}
              {t.result === 'loss' && <span className="down" style={{ fontWeight: 700 }}>−${fmt(t.amount)}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
