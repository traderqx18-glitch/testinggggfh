import { useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'
import { generateCandles, nextCandle } from '../data/candles.js'
import { getMarket, TIMEFRAMES } from '../data/markets.js'

// Candlestick chart backed by local mock OHLC data. A timer appends a
// simulated candle periodically so the chart feels live. No network.
export default function CandleChart({ marketId, timeframeId }) {
  const containerRef = useRef(null)
  const chartRef = useRef(null)
  const seriesRef = useRef(null)
  const lastRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const chart = createChart(el, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8b97a7'
      },
      grid: {
        vertLines: { color: 'rgba(35,44,55,0.6)' },
        horzLines: { color: 'rgba(35,44,55,0.6)' }
      },
      rightPriceScale: { borderColor: '#232c37' },
      timeScale: { borderColor: '#232c37', timeVisible: true, secondsVisible: false },
      crosshair: { mode: 1 },
      autoSize: true
    })
    const series = chart.addCandlestickSeries({
      upColor: '#16c784', downColor: '#ea3943',
      borderUpColor: '#16c784', borderDownColor: '#ea3943',
      wickUpColor: '#16c784', wickDownColor: '#ea3943'
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

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
