import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Floating sidekick character. Click the portrait to cycle through
 * dialog lines defined in data.character.dialogs (fully editable via JSON).
 * Swap data.character.image to any image URL/path to change the character later.
 */
export default function Character({ character }) {
  const [index, setIndex] = useState(-1) // -1 = greeting state, not yet clicked
  const [clickCount, setClickCount] = useState(0)

  const handleClick = () => {
    const next = (index + 1) % character.dialogs.length
    setIndex(next)
    setClickCount((c) => c + 1)
  }

  const line =
    index === -1
      ? character.greeting
      : character.dialogs[index].replace('{count}', String(clickCount))

  return (
    <div className="character-widget">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="character-bubble"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.25 }}
        >
          <span className="name-tag">{character.name}</span>
          {line}
          <div className="character-hint">click me →</div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        className="character-avatar-btn"
        onClick={handleClick}
        whileTap={{ scale: 0.85, rotate: -8 }}
        aria-label={`Talk to ${character.name}`}
      >
        <img src={character.image} alt={character.name} />
      </motion.button>
    </div>
  )
}
