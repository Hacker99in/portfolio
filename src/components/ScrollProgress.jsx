import { useEffect, useState } from 'react'
import './ScrollProgress.css'

/**
 * ScrollProgress — thin fixed progress bar showing scroll depth.
 * Fully additive: <ScrollProgress /> mounted once, no props required.
 */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      setPct(height > 0 ? (scrollTop / height) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
