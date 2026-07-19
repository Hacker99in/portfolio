import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero({ profile }) {
  const [typed, setTyped] = useState('')
  const full = profile.tagline

  useEffect(() => {
    setTyped('')
    let i = 0
    const t = setInterval(() => {
      i++
      setTyped(full.slice(0, i))
      if (i >= full.length) clearInterval(t)
    }, 28)
    return () => clearInterval(t)
  }, [full])

  return (
    <section className="hero container" id="top">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="hero-eyebrow">// {profile.role} — {profile.location}</div>
        <h1 className="glitch" data-text={profile.name}>
          <span>{profile.name}</span>
        </h1>
        <p className="hero-sub">
          {typed}
          <span className="type-cursor">&nbsp;</span>
        </p>
        <div className="hero-actions">
          <a className="btn" href="#projects">view projects</a>
          <a className="btn amber" href="#terminal">open terminal</a>
        </div>
      </motion.div>
    </section>
  )
}
