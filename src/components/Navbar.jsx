import { useState } from 'react'

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#resume', label: 'resume' },
  { href: '#terminal', label: 'terminal' },
  { href: '#contact', label: 'contact' },
]

export default function Navbar({ title }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <span className="nav-logo">{title}</span>
        <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? '[x]' : '[≡]'}
        </button>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
