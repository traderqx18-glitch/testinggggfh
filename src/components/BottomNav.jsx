import { NavLink } from 'react-router-dom'

const items = [
  { to: '/trade', label: 'Trade', icon: '◈' },
  { to: '/history', label: 'History', icon: '↻' },
  { to: '/deposit', label: 'Deposit', icon: '⊕' },
  { to: '/withdraw', label: 'Withdraw', icon: '⊖' },
  { to: '/profile', label: 'Profile', icon: '◉' }
]

// Mobile bottom navigation. Hidden on desktop via CSS.
export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((it) => (
        <NavLink key={it.to} to={it.to} className={({ isActive }) => 'bottom-nav-item' + (isActive ? ' active' : '')}>
          <span className="bottom-nav-icon">{it.icon}</span>
          <span>{it.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
