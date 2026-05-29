import { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { MARKETS, TIMEFRAMES } from '../data/markets.js'

const AppContext = createContext(null)
const STORAGE_KEY = 'tadex.state.v1'

const defaultState = {
  activeAccount: 'demo', // 'demo' | 'live'
  accounts: {
    demo: { id: 'demo', label: 'Demo Account', balance: 10000, currency: 'USD' },
    live: { id: 'live', label: 'Live Account', balance: 0, currency: 'USD' }
  },
  selectedMarket: MARKETS[0].id,
  timeframe: TIMEFRAMES[0].id,
  amount: 10,
  duration: 60,
  trades: [] // { id, market, direction, amount, payout, account, openPrice, result, profit, createdAt, expiresAt }
}

// Load persisted state from localStorage and merge over defaults. Any open
// trades from a previous session are marked closed so balances stay sane
// (their settlement timers no longer exist after a reload).
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const saved = JSON.parse(raw)
    return {
      ...defaultState,
      ...saved,
      accounts: { ...defaultState.accounts, ...(saved.accounts || {}) },
      trades: (saved.trades || []).map((t) =>
        t.result === 'open' ? { ...t, result: 'loss' } : t
      )
    }
  } catch {
    return defaultState
  }
}

function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable (private mode / quota) - ignore */
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return { ...state, activeAccount: action.account }
    case 'SET_MARKET':
      return { ...state, selectedMarket: action.market }
    case 'SET_TIMEFRAME':
      return { ...state, timeframe: action.timeframe }
    case 'SET_AMOUNT':
      return { ...state, amount: Math.max(1, action.amount) }
    case 'SET_DURATION':
      return { ...state, duration: action.duration }
    case 'PLACE_TRADE': {
      const acct = state.accounts[state.activeAccount]
      if (acct.balance < action.trade.amount) return state
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [state.activeAccount]: { ...acct, balance: acct.balance - action.trade.amount }
        },
        trades: [action.trade, ...state.trades]
      }
    }
    case 'SETTLE_TRADE': {
      const trade = state.trades.find((t) => t.id === action.id)
      if (!trade || trade.result !== 'open') return state
      const acct = state.accounts[trade.account]
      const credit = action.won ? trade.amount + trade.profit : 0
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [trade.account]: { ...acct, balance: acct.balance + credit }
        },
        trades: state.trades.map((t) =>
          t.id === action.id
            ? { ...t, result: action.won ? 'win' : 'loss', closePrice: action.closePrice }
            : t
        )
      }
    }
    case 'ADJUST_BALANCE': {
      const acct = state.accounts[action.account]
      const balance = Math.max(0, acct.balance + action.delta)
      return { ...state, accounts: { ...state.accounts, [action.account]: { ...acct, balance } } }
    }
    case 'RESET_DEMO':
      return {
        ...state,
        accounts: { ...state.accounts, demo: { ...state.accounts.demo, balance: 10000 } }
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  // Persist the full state snapshot whenever it changes.
  useEffect(() => { persistState(state) }, [state])

  const setAccount = useCallback((account) => dispatch({ type: 'SET_ACCOUNT', account }), [])
  const setMarket = useCallback((market) => dispatch({ type: 'SET_MARKET', market }), [])
  const setTimeframe = useCallback((timeframe) => dispatch({ type: 'SET_TIMEFRAME', timeframe }), [])
  const setAmount = useCallback((amount) => dispatch({ type: 'SET_AMOUNT', amount }), [])
  const setDuration = useCallback((duration) => dispatch({ type: 'SET_DURATION', duration }), [])
  const placeTrade = useCallback((trade) => dispatch({ type: 'PLACE_TRADE', trade }), [])
  const settleTrade = useCallback((id, won, closePrice) => dispatch({ type: 'SETTLE_TRADE', id, won, closePrice }), [])
  const adjustBalance = useCallback((account, delta) => dispatch({ type: 'ADJUST_BALANCE', account, delta }), [])
  const resetDemo = useCallback(() => dispatch({ type: 'RESET_DEMO' }), [])

  const value = {
    ...state,
    account: state.accounts[state.activeAccount],
    setAccount, setMarket, setTimeframe, setAmount, setDuration,
    placeTrade, settleTrade, adjustBalance, resetDemo
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
