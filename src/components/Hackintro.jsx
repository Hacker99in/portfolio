import './Hackintro.css'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GLYPHS = '01アイウエオカキクケコサシスセソ0123456789$#%&@!?<>[]{}/\\|'

const PHASES = [
 { text: '!!! TEST TEST TEST !!!', duration: 5000 },
]

export default function HackIntro({ onDone }) {
  alert('HACKINTRO IS RUNNING')

  const canvasRef = useRef(null)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [shake, setShake] = useState(false)
  const [flashDone, setFlashDone] = useState(false)

  useEffect(() => {
    if (reducedMotion) onDone()
  }, [reducedMotion, onDone])

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let columns
    let drops

    const setup = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / 16)
      drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -40))
    }
    setup()
    window.addEventListener('resize', setup)

    const draw = () => {
      ctx.fillStyle = 'rgba(6,2,3,0.14)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = '14px "Share Tech Mono", monospace'
      for (let i = 0; i < drops.length; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        const x = i * 16
        const y = drops[i] * 16
        ctx.fillStyle = Math.random() > 0.96 ? '#ffe1e1' : '#ff2d3d'
        ctx.fillText(char, x, y)
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', setup)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    if (phaseIndex >= PHASES.length) {
      const t = setTimeout(() => setFlashDone(true), 240)
      return () => clearTimeout(t)
    }
    const phase = PHASES[phaseIndex]
    let shakeTimer
    if (phase.alert) {
      setShake(true)
      shakeTimer = setTimeout(() => setShake(false), 220)
    }
    const t = setTimeout(() => setPhaseIndex((p) => p + 1), phase.duration)
    return () => {
      clearTimeout(t)
      clearTimeout(shakeTimer)
    }
  }, [phaseIndex, reducedMotion])

  useEffect(() => {
    if (flashDone) {
      const t = setTimeout(onDone, 400)
      return () => clearTimeout(t)
    }
  }, [flashDone, onDone])

  if (reducedMotion) return null

  const current = PHASES[Math.min(phaseIndex, PHASES.length - 1)]

  return (
    <AnimatePresence>
      {!flashDone ? (
        <motion.div
          className={`hack-intro${shake ? ' hack-shake' : ''}`}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <canvas ref={canvasRef} className="hack-canvas" />
          <div className="hack-scanline" />
          <div className="hack-vignette-red" />

          <div className="hack-content">
            <div className="hack-loglist">
              {PHASES.slice(0, phaseIndex).map((p, i) => (
                <div key={i} className="hack-logline hack-logline-done">
                  {p.text}
                </div>
              ))}
            </div>

            <div
              className={
                'hack-status' +
                (current?.alert ? ' hack-status-alert' : '') +
                (current?.success ? ' hack-status-success' : '')
              }
              data-text={current?.text}
            >
              {current?.text}
              <span className="hack-cursor" />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="hack-flash"
          className="hack-flash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </AnimatePresence>
  )
}