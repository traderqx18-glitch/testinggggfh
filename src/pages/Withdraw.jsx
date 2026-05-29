import { useState } from 'react'
import { useApp } from '../state/AppContext.jsx'

// Withdraw page: local-state form only. No real payment processing.
export default function Withdraw() {
  const { accounts, adjustBalance } = useApp()
  const [value, setValue] = useState(50)
  const [msg, setMsg] = useState(null)
  const live = accounts.live.balance

  function submit(e) {
    e.preventDefault()
    if (value <= 0) return
    if (value > live) { setMsg({ ok: false, text: 'Amount exceeds available balance.' }); return }
    adjustBalance('live', -value)
    setMsg({ ok: true, text: `Withdrawal of $${value} requested (simulated).` })
  }

  return (
    <div className="page">
      <h2>Withdraw</h2>
      <p className="text-dim" style={{ marginTop: -8 }}>Available: ${live.toFixed(2)}</p>
      <form className="card form-card" onSubmit={submit}>
        <label className="text-dim">Amount (USD)</label>
        <input className="input" type="number" min="1" value={value} onChange={(e) => setValue(Number(e.target.value))} />
        <button className="btn btn-accent btn-block" type="submit">Request withdrawal</button>
        {msg && <div className={msg.ok ? 'up' : 'down'}>{msg.text}</div>}
      </form>
    </div>
  )
}
