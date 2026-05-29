import { useApp } from '../state/AppContext.jsx'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.js'

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Slide-in profile drawer. Controlled by the parent page via `open`.
export default function ProfileDrawer({ open, onClose }) {
  const { accounts, activeAccount, setAccount, resetDemo } = useApp()
  useBodyScrollLock(open)
  return (
    <>
      <div className={'drawer-backdrop' + (open ? ' show' : '')} onClick={onClose} />
      <aside className={'drawer' + (open ? ' open' : '')}>
        <div className="drawer-header">
          <div className="avatar">T</div>
          <div>
            <div style={{ fontWeight: 700 }}>TADEX Trader</div>
            <div className="text-dim" style={{ fontSize: 12 }}>trader@tadex.local</div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="drawer-section">
          <div className="text-dim" style={{ fontSize: 12, marginBottom: 8 }}>Accounts</div>
          {Object.values(accounts).map((a) => (
            <button
              key={a.id}
              className={'account-option' + (a.id === activeAccount ? ' active' : '')}
              onClick={() => setAccount(a.id)}
            >
              <span className={'dot ' + (a.id === 'live' ? 'dot-live' : 'dot-demo')} />
              <span style={{ flex: 1, textAlign: 'left' }}>{a.label}</span>
              <strong>${fmt(a.balance)}</strong>
            </button>
          ))}
        </div>

        <div className="drawer-section">
          <button className="btn btn-block" onClick={resetDemo}>Reset demo balance</button>
        </div>

        <div className="drawer-section text-dim" style={{ fontSize: 12 }}>
          TADEX is a frontend demo. All balances and trades are simulated locally.
        </div>
      </aside>
    </>
  )
}
