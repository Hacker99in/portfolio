import { useEffect, useState } from 'react'
import './EasterEggs.css'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

/**
 * EasterEggs — mount once, anywhere. Fully additive, zero required props.
 *  - Listens for the Konami code and fires an "achievement unlocked" toast.
 *  - Drops a styled hacker-vibe message into the browser console on load
 *    (a small but classic flourish recruiters/engineers notice).
 *
 * Optional props:
 *  - onUnlock: fn() called when the code is entered (e.g. reveal a secret
 *    terminal command, spike the matrix rain opacity, etc.)
 *  - consoleName: name to print in the console banner
 */
export default function EasterEggs({ onUnlock, consoleName }) {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    let progress = 0
    const onKey = (e) => {
      const key = e.key
      const expected = KONAMI[progress]
      const matches =
        key === expected || key.toLowerCase() === expected.toLowerCase()
      progress = matches ? progress + 1 : key === KONAMI[0] ? 1 : 0
      if (progress === KONAMI.length) {
        progress = 0
        setToast('ACHIEVEMENT UNLOCKED: konami sequence recognized')
        onUnlock?.()
        setTimeout(() => setToast(null), 4000)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onUnlock])

  useEffect(() => {
    const style = 'color:#00ff9c;font-family:monospace;font-size:12px;'
    console.log('%c' +
      ' ██████╗ ██╗  ██╗\n' +
      '██╔═══██╗██║ ██╔╝\n' +
      '██║   ██║█████╔╝ \n' +
      '██║   ██║██╔═██╗ \n' +
      '╚██████╔╝██║  ██╗\n' +
      ' ╚═════╝ ╚═╝  ╚═╝', style)
    console.log(
      `%clooking around, huh? nice.${consoleName ? ` — ${consoleName}` : ''}\ntry the konami code somewhere on this page.`,
      'color:#4dff8f;font-family:monospace;'
    )
  }, [consoleName])

  if (!toast) return null

  return (
    <div className="egg-toast" role="status">
      <span className="egg-toast-dot" />
      {toast}
    </div>
  )
}
