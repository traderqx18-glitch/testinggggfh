import { useState } from 'react'
import { useApp } from '../state/AppContext.jsx'

const PRESETS = [50, 100, 250, 500, 1000]

// Deposit page: local-state form only. No real payment processing.
export default function Deposit() {
  const { adjustBalance, setAccount, accounts } = useApp()
  const [value, setValue] = useState(100)
  const [done, setDone] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (value <= 0) return
    adjustBalance('live', value)
    setAccount('live')
    setDone(true)
    setTimeout(() => setDone(false), 2500)
  }

  return (
    <div className="page">
      <h2>Deposit</h2>
      <p className="text-dim" style={{ marginTop: -8 }}>Add funds to your live account (simulated).</p>
      <form className="card form-card" onSubmit={submit}>
        <div className="preset-row">
          {PRESETS.map((p) => (
            <button type="button" key={p} className={'chip' + (p === value ? ' active' : '')} onClick={() => setValue(p)}>
              ${p}
            </button>
          ))}
        </div>
        <label className="text-dim">Amount (USD)</label>
        <input className="input" type="number" min="1" value={value} onChange={(e) => setValue(Number(e.target.value))} />
        <button className="btn btn-accent btn-block" type="submit">Deposit ${value}</button>
        {done && <div className="up">Deposit added. Live balance: ${accounts.live.balance.toFixed(2)}</div>}
      </form>
    </div>
  )
}
