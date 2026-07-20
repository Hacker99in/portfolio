import { useEffect, useMemo, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'
import './TerminalPro.css'

/**
 * TerminalPro — a drop-in UPGRADE that sits alongside the original Terminal.jsx
 * (does not modify it). Same core prop (`terminal`) still works, plus new
 * optional props that unlock extra power. Nothing is required — every new
 * prop degrades gracefully if you don't pass it.
 *
 * Props:
 *  - terminal   (required, same shape as before: { prompt, welcome, commands, unknownCommandMessage })
 *  - data       (optional, full site data.json) — powers skills/projects/resume/contact/social commands
 *  - onToggleMatrix (optional fn)  — called by the `matrix` command
 *  - onThemeChange  (optional fn(color)) — called by the `theme <color>` command
 *  - onReboot       (optional fn)  — called by `exit` / `logout` (e.g. replay boot sequence)
 *
 * New built-ins (always on top of your JSON commands):
 *   help, whoami, about, skills, projects, resume, contact, social,
 *   date, banner, history, sudo, matrix, theme, ls, cd, pwd, cat, open,
 *   exit / logout
 *
 * Extras: Tab-completion, colored output (info/success/error/ascii),
 * Ctrl+L to clear, persistent command history across the session.
 */

const FILES = (data) => ({
  '~': {
    type: 'dir',
    children: ['about.txt', 'skills.json', 'projects/', 'resume.pdf', 'contact.txt'],
  },
  'about.txt': {
    type: 'file',
    content: () => data?.profile?.bio || data?.profile?.tagline || 'No bio found.',
  },
  'skills.json': {
    type: 'file',
    content: () =>
      (data?.skills || [])
        .map((s) => (typeof s === 'string' ? s : s.name))
        .join(', ') || 'No skills listed.',
  },
  'resume.pdf': {
    type: 'file',
    content: () =>
      data?.resume?.url
        ? `Resume: ${data.resume.url} (use "open resume" to launch it)`
        : 'No resume on file.',
  },
  'contact.txt': {
    type: 'file',
    content: () =>
      data?.profile?.email
        ? `email: ${data.profile.email}`
        : 'No contact info on file.',
  },
})

const BANNER = (name = 'root') => [
  ' ██████╗ ██╗  ██╗',
  '██╔═══██╗██║ ██╔╝',
  '██║   ██║█████╔╝ ',
  '██║   ██║██╔═██╗ ',
  '╚██████╔╝██║  ██╗',
  ' ╚═════╝ ╚═╝  ╚═╝',
  `welcome back, ${name}. type 'help' to see what's possible.`,
]

export default function TerminalPro({
  terminal,
  data,
  onToggleMatrix,
  onThemeChange,
  onReboot,
}) {
  const files = useMemo(() => FILES(data), [data])
  const [cwd, setCwd] = useState('~')
  const [history, setHistory] = useState(() =>
    terminal.welcome.map((line) => ({ type: 'output', text: line }))
  )
  const [input, setInput] = useState('')
  const [cmdLog, setCmdLog] = useState([])
  const [logIndex, setLogIndex] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  const push = (lines, type = 'output') => {
    const arr = Array.isArray(lines) ? lines : [lines]
    setHistory((h) => [...h, ...arr.map((text) => ({ type, text }))])
  }

  const jsonCommands = terminal.commands || {}
  const builtins = [
    'help', 'clear', 'echo', 'whoami', 'about', 'skills', 'projects',
    'resume', 'contact', 'social', 'date', 'banner', 'history', 'sudo',
    'matrix', 'theme', 'ls', 'cd', 'pwd', 'cat', 'open', 'exit', 'logout',
  ]
  const allCommandNames = useMemo(
    () => Array.from(new Set([...builtins, ...Object.keys(jsonCommands)])),
    [jsonCommands]
  )

  const run = (raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    push(trimmed, 'prompt')
    setCmdLog((log) => [trimmed, ...log])
    setLogIndex(-1)

    const [cmdRaw, ...rest] = trimmed.split(' ')
    const cmd = cmdRaw.toLowerCase()
    const arg = rest.join(' ')

    switch (cmd) {
      case 'clear':
        setHistory([])
        return

      case 'echo':
        push(rest.join(' '))
        return

      case 'help': {
        const custom = Object.keys(jsonCommands)
        push([
          'available commands:',
          '  help, clear, echo, whoami, about, skills, projects, resume,',
          '  contact, social, date, banner, history, ls, cd, pwd, cat <file>,',
          '  open <target>, theme <color>, matrix, exit',
          custom.length ? `  custom: ${custom.join(', ')}` : null,
          'tip: ↑ / ↓ browse history · Tab to autocomplete · Ctrl+L to clear',
        ].filter(Boolean))
        return
      }

      case 'whoami':
        push(data?.profile?.name ? `${data.profile.name} — ${data.profile.role || 'developer'}` : 'guest@portfolio')
        return

      case 'about':
        push(files['about.txt'].content())
        return

      case 'skills':
        push(files['skills.json'].content())
        return

      case 'projects': {
        const projects = data?.projects || []
        if (!projects.length) {
          push('No projects indexed yet.')
          return
        }
        push(projects.map((p, i) => `${i + 1}. ${p.name || p.title}${p.url ? ` — ${p.url}` : ''}`))
        return
      }

      case 'resume':
        push(files['resume.pdf'].content())
        return

      case 'contact':
        push(files['contact.txt'].content())
        return

      case 'social': {
        const links = data?.profile?.socials || data?.socials
        if (!links) {
          push('No social links configured.')
          return
        }
        push(Object.entries(links).map(([k, v]) => `${k}: ${v}`))
        return
      }

      case 'date':
        push(new Date().toString())
        return

      case 'banner':
        push(BANNER(data?.profile?.name?.split(' ')[0]), 'ascii')
        return

      case 'history':
        push(cmdLog.length ? cmdLog.slice().reverse() : 'no history yet')
        return

      case 'sudo':
        push(`Nice try. Permission denied: you're not root here 😏`, 'error')
        return

      case 'matrix':
        if (onToggleMatrix) {
          onToggleMatrix()
          push('matrix rain toggled.', 'success')
        } else {
          push('matrix module not wired up in this build.', 'error')
        }
        return

      case 'theme':
        if (!arg) {
          push('usage: theme <color>  e.g. theme #4dff8f', 'error')
          return
        }
        if (onThemeChange) {
          onThemeChange(arg)
          push(`theme accent set to ${arg}`, 'success')
        } else {
          push('theme module not wired up in this build.', 'error')
        }
        return

      case 'pwd':
        push(cwd)
        return

      case 'ls': {
        const dir = files[cwd]
        push(dir?.children ? dir.children.join('  ') : 'not a directory')
        return
      }

      case 'cd': {
        if (!arg || arg === '~') {
          setCwd('~')
          return
        }
        push(`cd: no such directory: ${arg}`, 'error')
        return
      }

      case 'cat': {
        if (!arg) {
          push('usage: cat <file>', 'error')
          return
        }
        const entry = files[arg]
        if (!entry || entry.type !== 'file') {
          push(`cat: ${arg}: no such file`, 'error')
          return
        }
        push(entry.content())
        return
      }

      case 'open': {
        const target = arg.toLowerCase()
        if (target === 'resume' && data?.resume?.url) {
          window.open(data.resume.url, '_blank', 'noopener,noreferrer')
          push('opening resume…', 'success')
          return
        }
        const el = document.getElementById(target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          push(`navigating to #${target}`, 'success')
          return
        }
        if (arg.startsWith('http')) {
          window.open(arg, '_blank', 'noopener,noreferrer')
          push(`opening ${arg}…`, 'success')
          return
        }
        push(`open: nothing found for "${arg}"`, 'error')
        return
      }

      case 'exit':
      case 'logout':
        push('connection terminated.', 'error')
        if (onReboot) setTimeout(onReboot, 600)
        return

      default: {
        if (Object.prototype.hasOwnProperty.call(jsonCommands, cmd)) {
          push(jsonCommands[cmd])
          return
        }
        push(
          (terminal.unknownCommandMessage || "command not found: {cmd}").replace('{cmd}', cmdRaw),
          'error'
        )
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    run(input)
    setInput('')
  }

  const autocomplete = () => {
    if (!input) return
    const [first, ...rest] = input.split(' ')
    const matches = allCommandNames.filter((c) => c.startsWith(first.toLowerCase()))
    if (matches.length === 1) {
      setInput([matches[0], ...rest].join(' '))
    } else if (matches.length > 1) {
      push(`possible: ${matches.join('  ')}`, 'info')
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      autocomplete()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdLog.length === 0) return
      const next = Math.min(logIndex + 1, cmdLog.length - 1)
      setLogIndex(next)
      setInput(cmdLog[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = logIndex - 1
      if (next < 0) {
        setLogIndex(-1)
        setInput('')
      } else {
        setLogIndex(next)
        setInput(cmdLog[next])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    }
  }

  return (
    <section id="terminal" className="container">
      <Reveal>
        <div className="section-heading">
          <span className="num">05</span>
          <h2>terminal</h2>
          <span className="rule" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="terminal-window terminal-pro" onClick={() => inputRef.current?.focus()}>
          <div className="terminal-titlebar">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">{terminal.prompt}: {cwd}</span>
          </div>
          <div className="terminal-body" ref={bodyRef}>
            {history.map((line, i) => (
              <div className={`terminal-line ${line.type === 'prompt' ? 'prompt-line' : `output out-${line.type}`}`} key={i}>
                {line.type === 'prompt' ? (
                  <><span className="prompt-label">{terminal.prompt}$</span> {line.text}</>
                ) : (
                  line.text
                )}
              </div>
            ))}
          </div>
          <form className="terminal-input-row" onSubmit={onSubmit}>
            <span className="prompt-label">{terminal.prompt}$</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck="false"
              placeholder="type a command... (try 'help')"
            />
          </form>
        </div>
        <div className="terminal-hint">
          try: help, whoami, skills, projects, resume, sudo — ↑/↓ history · Tab autocomplete · Ctrl+L clear
        </div>
      </Reveal>
    </section>
  )
}
