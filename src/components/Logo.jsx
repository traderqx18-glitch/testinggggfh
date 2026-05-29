// Text-based TADEX wordmark placeholder. Swap for brand asset later.
export default function Logo({ size = 22 }) {
  return (
    <span
      style={{
        fontSize: size,
        fontWeight: 800,
        letterSpacing: '0.14em',
        color: 'var(--text)',
        display: 'inline-flex',
        alignItems: 'center'
      }}
      aria-label="TADEX"
    >
      TA<span style={{ color: 'var(--accent)' }}>DEX</span>
    </span>
  )
}
