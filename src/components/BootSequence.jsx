import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * A boot-up "cut scene" that plays once when the site loads.
 * Lines come from data.profile.bootMessages so they're editable via JSON.
 */
export default function BootSequence({ messages, onDone }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [finishing, setFinishing] = useState(false)

  useEffect(() => {
    if (visibleCount < messages.length) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), 380)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setFinishing(true), 450)
      return () => clearTimeout(t)
    }
  }, [visibleCount, messages.length])

  useEffect(() => {
    if (finishing) {
      const t = setTimeout(onDone, 500)
      return () => clearTimeout(t)
    }
  }, [finishing, onDone])

  return (
    <AnimatePresence>
      {!finishing && (
        <motion.div
          className="boot-screen"
          exit={{ opacity: 0, filter: 'brightness(3)' }}
          transition={{ duration: 0.45 }}
        >
          {messages.slice(0, visibleCount).map((line, i) => (
            <div className="boot-line" key={i}>
              {line}
            </div>
          ))}
          {visibleCount < messages.length && <span className="boot-cursor" />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
