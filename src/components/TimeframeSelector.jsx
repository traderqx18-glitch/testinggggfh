import { useApp } from '../state/AppContext.jsx'
import { TIMEFRAMES } from '../data/markets.js'

export default function TimeframeSelector() {
  const { timeframe, setTimeframe } = useApp()
  return (
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '8px 0' }}>
      {TIMEFRAMES.map((tf) => (
        <button
          key={tf.id}
          className={'chip' + (tf.id === timeframe ? ' active' : '')}
          onClick={() => setTimeframe(tf.id)}
        >
          {tf.label}
        </button>
      ))}
    </div>
  )
}
