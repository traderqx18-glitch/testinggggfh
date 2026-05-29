import { useState } from 'react'
import { useApp } from '../state/AppContext.jsx'

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Demo/Live account switcher shown in the header. Opens a small popover.
export default function AccountSwitcher() {
  const { accounts, activeAccount, account, setAccount } = useApp()
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button className="account-pill" onClick={() => setOpen((v) => !v)}>
        <span className={'dot ' + (activeAccount === 'live' ? 'dot-live' : 'dot-demo')} />
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
          <span className="text-dim" style={{ fontSize: 11 }}>{activeAccount === 'live' ? 'Live' : 'Demo'}</span>
          <strong style={{ fontSize: 14 }}>${fmt(account.balance)}</strong>
        </span>
        <span className="text-dim">▾</span>
      </button>

      {open && (
        <>
          <div className="popover-backdrop" onClick={() => setOpen(false)} />
          <div className="popover">
            {Object.values(accounts).map((acct) => (
              <button
                key={acct.id}
                className={'account-option' + (acct.id === activeAccount ? ' active' : '')}
                onClick={() => { setAccount(acct.id); setOpen(false) }}
              >
                <span className={'dot ' + (acct.id === 'live' ? 'dot-live' : 'dot-demo')} />
                <span style={{ flex: 1, textAlign: 'left' }}>{acct.label}</span>
                <strong>${fmt(acct.balance)}</strong>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
