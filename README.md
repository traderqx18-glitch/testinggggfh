# TADEX Frontend

Independent TADEX trading frontend. React + Vite. Frontend-only with local
mock data and local state. No backend, APIs, authentication server, or
websockets.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Architecture

- `src/state/` Global app state via React Context + reducer (accounts,
  balances, selected asset/timeframe, trades).
- `src/data/` Local mock market data and OHLC candle generation.
- `src/components/` Reusable UI (chart, selectors, trade panel, nav, drawer).
- `src/pages/` Routed screens (landing, dashboard, history, deposit,
  withdraw, profile).
- `src/App.jsx` Routing + responsive shell (mobile bottom nav, desktop
  sidebar).

Charting uses `lightweight-charts`. All prices and trades are simulated
locally; nothing is sent anywhere.
