import { useState } from 'react'
import ProfileDrawer from '../components/ProfileDrawer.jsx'
import { useApp } from '../state/AppContext.jsx'

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Profile page. Reuses the drawer for account actions and shows a summary.
export default function Profile() {
  const { accounts, trades } = useApp()
  const [open, setOpen] = useState(false)
  const wins = trades.filter((t) => t.result === 'win').length
  const losses = trades.filter((t) => t.result === 'loss').length

  return (
    <div className="page">
      <h2>Profile</h2>
      <div className="card profile-summary">
        <div className="avatar lg">T</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>TADEX Trader</div>
          <div className="text-dim" style={{ fontSize: 13 }}>trader@tadex.local</div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card stat"><div className="text-dim">Demo</div><strong>${fmt(accounts.demo.balance)}</strong></div>
        <div className="card stat"><div className="text-dim">Live</div><strong>${fmt(accounts.live.balance)}</strong></div>
        <div className="card stat"><div className="text-dim">Wins</div><strong className="up">{wins}</strong></div>
        <div className="card stat"><div className="text-dim">Losses</div><strong className="down">{losses}</strong></div>
      </div>

      <button className="btn btn-block" onClick={() => setOpen(true)}>Open account menu</button>
      <ProfileDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
