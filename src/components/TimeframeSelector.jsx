import { useApp } from '../state/AppContext.jsx'
import { TIMEFRAMES } from '../data/markets.js'

export default function TimeframeSelector() {
  const { timeframe, setTimeframe } = useApp()
  return (
    <div className="timeframe-bar">
      {TIMEFRAMES.map((tf) => (
        <button
          key={tf.id}
          className={'tf-chip' + (tf.id === timeframe ? ' active' : '')}
          onClick={() => setTimeframe(tf.id)}
        >
          {tf.label}
        </button>
      ))}
    </div>
  )
}
