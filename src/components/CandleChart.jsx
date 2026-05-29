import { useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'
import { generateCandles, nextCandle } from '../data/candles.js'
import { getMarket, TIMEFRAMES } from '../data/markets.js'
import { useApp } from '../state/AppContext.jsx'

// Candlestick chart backed by local mock OHLC data. A timer appends a
// simulated candle periodically so the chart feels live. No network.
export default function CandleChart({ marketId, timeframeId }) {
  const { trades } = useApp()
  const containerRef = useRef(null)
  const chartRef = useRef(null)
  const seriesRef = useRef(null)
  const lastRef = useRef(null)
  const priceLinesRef = useRef([])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const chart = createChart(el, {
      layout: {
        background: { type: ColorType.Solid, color: '#0f172a' },
        textColor: '#94a3b8',
        attributionLogo: false
      },
      grid: {
        vertLines: { color: '#1e293b' },
        horzLines: { color: '#1e293b' }
      },
      rightPriceScale: { borderColor: '#1e293b' },
      timeScale: { borderColor: '#1e293b', timeVisible: true, secondsVisible: false },
      crosshair: { mode: 1 },
      autoSize: true
    })
    const series = chart.addCandlestickSeries({
      upColor: '#22c55e', downColor: '#ef4444',
      borderUpColor: '#22c55e', borderDownColor: '#ef4444',
      wickUpColor: '#22c55e', wickDownColor: '#ef4444'
    })
    chartRef.current = chart
    seriesRef.current = series
    return () => { chart.remove() }
  }, [])

  useEffect(() => {
    const market = getMarket(marketId)
    const timeframe = TIMEFRAMES.find((t) => t.id === timeframeId) || TIMEFRAMES[0]
    const data = generateCandles(market, timeframe)
    seriesRef.current.setData(data)
    chartRef.current.timeScale().fitContent()
    lastRef.current = data[data.length - 1]

    const interval = setInterval(() => {
      const candle = nextCandle(lastRef.current, market, timeframe)
      lastRef.current = candle
      seriesRef.current.update(candle)
    }, 2000)
    return () => clearInterval(interval)
  }, [marketId, timeframeId])

  // Draw entry markers + price lines for open trades on this market.
  useEffect(() => {
    const series = seriesRef.current
    if (!series) return
    const open = trades.filter((t) => t.marketId === marketId && t.result === 'open')

    // Reset previous price lines.
    priceLinesRef.current.forEach((pl) => series.removePriceLine(pl))
    priceLinesRef.current = open.map((t) =>
      series.createPriceLine({
        price: t.openPrice,
        color: t.direction === 'up' ? '#22c55e' : '#ef4444',
        lineWidth: 1,
        lineStyle: 2,
        axisLabelVisible: true,
        title: (t.direction === 'up' ? '\u25B2' : '\u25BC') + ' ' + t.openPrice
      })
    )

    series.setMarkers(
      open.map((t) => ({
        time: Math.floor(t.createdAt / 1000),
        position: t.direction === 'up' ? 'belowBar' : 'aboveBar',
        color: t.direction === 'up' ? '#22c55e' : '#ef4444',
        shape: t.direction === 'up' ? 'arrowUp' : 'arrowDown',
        text: t.direction === 'up' ? 'Higher' : 'Lower'
      }))
    )
  }, [trades, marketId])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
