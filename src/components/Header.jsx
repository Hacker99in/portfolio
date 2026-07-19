import { useState } from 'react';

const NAV_ITEMS = [
  { href: '#about', label: '01_about' },
  { href: '#skills', label: '02_skills' },
  { href: '#projects', label: '03_projects' },
  { href: '#resume', label: '04_resume' },
  { href: '#contact', label: '05_contact' },
];

export default function Header({ profile }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="term-chrome">
        <span className="term-dot red" />
        <span className="term-dot yellow" />
        <span className="term-dot green" />
        <span className="term-path">~/{profile.handle.replace('@', '')}/portfolio</span>
      </div>
      <div className="nav-row">
        <a href="#hero" className="logo">
          {profile.handle}
          <span className="blink-caret" />
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          [ MENU ]
        </button>
      </div>
    </header>
  );
}
