import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

// Minimal landing page. Marketing kept intentionally light per scope.
export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <Logo />
        <Link to="/trade" className="btn btn-accent">Open app</Link>
      </header>
      <section className="landing-hero">
        <h1>Trade smarter with <span style={{ color: 'var(--accent)' }}>TADEX</span></h1>
        <p className="text-dim">A fast, mobile-first trading experience. Practice on a demo account, then go live.</p>
        <Link to="/trade" className="btn btn-accent" style={{ display: 'inline-block', marginTop: 8 }}>
          Start trading
        </Link>
      </section>
    </div>
  )
}
