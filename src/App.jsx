import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SideNav from './components/SideNav.jsx'
import BottomNav from './components/BottomNav.jsx'
import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import History from './pages/History.jsx'
import Deposit from './pages/Deposit.jsx'
import Withdraw from './pages/Withdraw.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  if (isLanding) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    )
  }

  return (
    <div className="app-shell with-nav">
      <SideNav />
      <main className="app-main">
        <Routes>
          <Route path="/trade" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/trade" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
