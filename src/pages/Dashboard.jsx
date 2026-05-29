import { useState } from 'react'
import AccountSwitcher from '../components/AccountSwitcher.jsx'
import AssetSelector from '../components/AssetSelector.jsx'
import TimeframeSelector from '../components/TimeframeSelector.jsx'
import CandleChart from '../components/CandleChart.jsx'
import PriceTicker from '../components/PriceTicker.jsx'
import TradePanel from '../components/TradePanel.jsx'
import ProfileDrawer from '../components/ProfileDrawer.jsx'
import Logo from '../components/Logo.jsx'
import { useApp } from '../state/AppContext.jsx'

// Core product screen. Mobile-first: header, asset + timeframe, chart, then
// the trade panel. On desktop the trade panel sits beside the chart.
export default function Dashboard() {
  const { selectedMarket, timeframe } = useApp()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="dashboard">
      <header className="dash-header">
        <button className="icon-btn show-mobile" onClick={() => setDrawerOpen(true)} aria-label="Menu">☰</button>
        <div className="show-desktop"><Logo size={18} /></div>
        <AssetSelector />
        <PriceTicker marketId={selectedMarket} />
        <div style={{ flex: 1 }} />
        <AccountSwitcher />
      </header>

      <div className="dash-toolbar">
        <TimeframeSelector />
      </div>

      <div className="dash-body">
        <div className="chart-area">
          <CandleChart marketId={selectedMarket} timeframeId={timeframe} />
        </div>
        <div className="panel-area">
          <TradePanel />
        </div>
      </div>

      <ProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
