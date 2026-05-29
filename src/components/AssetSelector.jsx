import { useState } from 'react'
import { useApp } from '../state/AppContext.jsx'
import { MARKETS, getMarket } from '../data/markets.js'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.js'

// Asset selector opens a bottom-sheet/modal list of mock instruments.
export default function AssetSelector() {
  const { selectedMarket, setMarket } = useApp()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const current = getMarket(selectedMarket)
  useBodyScrollLock(open)

  const filtered = MARKETS.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.id.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <button className="btn asset-trigger" onClick={() => setOpen(true)}>
        {current.flag && <span className="asset-flag">{current.flag}</span>}
        <strong>{current.name.replace(' OTC', '')}</strong>
        {current.isOtc && <span className="otc-badge">OTC</span>}
        <span className="text-dim" style={{ fontSize: 12 }}>{current.payout}%</span>
        <span className="text-dim">▾</span>
      </button>

      {open && (
        <div className="sheet-overlay" onClick={() => setOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <h3 style={{ margin: '0 0 12px' }}>Select asset</h3>
            <input
              className="input"
              placeholder="Search markets"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div style={{ marginTop: 12, maxHeight: '50vh', overflowY: 'auto' }}>
              {filtered.map((m) => (
                <button
                  key={m.id}
                  className={'asset-row' + (m.isOtc ? ' asset-row-otc' : '') + (m.id === selectedMarket ? ' active' : '')}
                  onClick={() => { setMarket(m.id); setOpen(false) }}
                >
                  <div className="asset-row-left">
                    <span className="asset-flag">{m.flag || '\u25C8'}</span>
                    <div>
                      <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {m.name.replace(' OTC', '')}
                        {m.isOtc && <span className="otc-badge">OTC</span>}
                      </div>
                      <div className="text-dim" style={{ fontSize: 12 }}>{m.category}</div>
                    </div>
                  </div>
                  <div className="up" style={{ fontWeight: 700 }}>{m.payout}%</div>
                </button>
              ))}
              {filtered.length === 0 && <div className="text-dim" style={{ padding: 16 }}>No matches</div>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
