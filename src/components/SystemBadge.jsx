import { useEffect, useState } from 'react'
import './SystemBadge.css'

/**
 * SystemBadge — small fixed-corner readout: session uptime + local time.
 * Purely cosmetic, purely additive: <SystemBadge /> with no required props.
 * No real user data (IP, location, etc.) is collected or shown — just a
 * client-side clock, to keep it honest and privacy-safe while still fitting
 * the "hacker terminal" aesthetic.
 */
export default function SystemBadge({ label = 'SESSION' }) {
  const [uptime, setUptime] = useState(0)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => {
      setUptime((u) => u + 1)
      setNow(new Date())
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  return (
    <div className="sys-badge" aria-hidden="true">
      <span className="sys-dot" />
      <span className="sys-label">{label}</span>
      <span className="sys-sep">·</span>
      <span>{fmt(uptime)}</span>
      <span className="sys-sep">·</span>
      <span>{now.toLocaleTimeString()}</span>
    </div>
  )
}
