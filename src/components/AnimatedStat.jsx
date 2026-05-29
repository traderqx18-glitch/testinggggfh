import { useCountUp } from '../hooks/useCountUp.js'

// Single animated statistic for the landing page. Pure local animation.
export default function AnimatedStat({ value, label, prefix = '', suffix = '', decimals = 0 }) {
  const n = useCountUp(value)
  const display = n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
  return (
    <div className="stat-anim">
      <div className="stat-anim-value">{prefix}{display}{suffix}</div>
      <div className="text-dim stat-anim-label">{label}</div>
    </div>
  )
}
