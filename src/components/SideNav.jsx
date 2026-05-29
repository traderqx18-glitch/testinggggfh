import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'

const items = [
  { to: '/trade', label: 'Trade', icon: '◈' },
  { to: '/history', label: 'History', icon: '↻' },
  { to: '/deposit', label: 'Deposit', icon: '⊕' },
  { to: '/withdraw', label: 'Withdraw', icon: '⊖' },
  { to: '/profile', label: 'Profile', icon: '◉' }
]

// Desktop sidebar navigation. Hidden on mobile via CSS.
export default function SideNav() {
  return (
    <aside className="side-nav">
      <div style={{ padding: '18px 16px' }}><Logo /></div>
      <nav>
        {items.map((it) => (
          <NavLink key={it.to} to={it.to} className={({ isActive }) => 'side-nav-item' + (isActive ? ' active' : '')}>
            <span className="side-nav-icon">{it.icon}</span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
