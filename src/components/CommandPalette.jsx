import { useEffect, useMemo, useRef, useState } from 'react'
import './CommandPalette.css'

/**
 * CommandPalette — global Cmd/Ctrl+K launcher, VS Code style.
 * Fully additive: mount it once anywhere in App.jsx, e.g.
 *   <CommandPalette sections={['top','about','skills','projects','resume','terminal']}
 *                    onToggleMatrix={...} onThemeChange={...} />
 * Every prop is optional — it always renders the navigation entries;
 * action entries appear only if their handler is provided.
 */
export default function CommandPalette({
  sections = [],
  socials = {},
  onToggleMatrix,
  onThemeChange,
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  const items = useMemo(() => {
    const nav = sections.map((s) => ({
      id: `go-${s}`,
      label: `go to ${s}`,
      hint: 'navigate',
      action: () => document.getElementById(s)?.scrollIntoView({ behavior: 'smooth' }),
    }))
    const social = Object.entries(socials).map(([k, v]) => ({
      id: `social-${k}`,
      label: `open ${k}`,
      hint: 'social',
      action: () => window.open(v, '_blank', 'noopener,noreferrer'),
    }))
    const actions = []
    if (onToggleMatrix) {
      actions.push({ id: 'matrix', label: 'toggle matrix rain', hint: 'action', action: onToggleMatrix })
    }
    if (onThemeChange) {
      actions.push(
        { id: 'theme-green', label: 'theme: green', hint: 'action', action: () => onThemeChange('#00ff9c') },
        { id: 'theme-amber', label: 'theme: amber', hint: 'action', action: () => onThemeChange('#ffb454') },
        { id: 'theme-blue', label: 'theme: blue', hint: 'action', action: () => onThemeChange('#6fc3ff') }
      )
    }
    return [...nav, ...social, ...actions]
  }, [sections, socials, onToggleMatrix, onThemeChange])

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const runActive = () => {
    const item = filtered[active]
    if (item) {
      item.action()
      setOpen(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      runActive()
    }
  }

  if (!open) return null

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-input-row">
          <span className="cmdk-caret">&gt;</span>
          <input
            ref={inputRef}
            className="cmdk-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type a command or search…"
            spellCheck="false"
            autoComplete="off"
          />
          <kbd className="cmdk-esc">esc</kbd>
        </div>
        <div className="cmdk-list">
          {filtered.length === 0 && <div className="cmdk-empty">no matches</div>}
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`cmdk-item ${i === active ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => {
                item.action()
                setOpen(false)
              }}
            >
              <span>{item.label}</span>
              <span className="cmdk-hint">{item.hint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
