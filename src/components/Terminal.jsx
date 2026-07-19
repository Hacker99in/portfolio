import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'

/**
 * A fake terminal. Responses to commands come from data.terminal.commands
 * (a simple string map) so new commands can be added purely in JSON.
 * Built-in commands (always available regardless of JSON): help*, clear, echo.
 * *'help' is still driven by data.terminal.commands.help if present.
 */
export default function Terminal({ terminal }) {
  const [history, setHistory] = useState(() =>
    terminal.welcome.map((line) => ({ type: 'output', text: line }))
  )
  const [input, setInput] = useState('')
  const [cmdLog, setCmdLog] = useState([])
  const [logIndex, setLogIndex] = useState(-1)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  const run = (raw) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    setHistory((h) => [...h, { type: 'prompt', text: trimmed }])
    setCmdLog((log) => [trimmed, ...log])
    setLogIndex(-1)

    const [cmd, ...rest] = trimmed.split(' ')
    const lower = cmd.toLowerCase()

    if (lower === 'clear') {
      setHistory([])
      return
    }

    if (lower === 'echo') {
      setHistory((h) => [...h, { type: 'output', text: rest.join(' ') }])
      return
    }

    const commands = terminal.commands || {}
    if (Object.prototype.hasOwnProperty.call(commands, lower)) {
      setHistory((h) => [...h, { type: 'output', text: commands[lower] }])
      return
    }

    const msg = (terminal.unknownCommandMessage || "command not found: {cmd}").replace(
      '{cmd}',
      cmd
    )
    setHistory((h) => [...h, { type: 'output', text: msg }])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    run(input)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
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
        <div className="terminal-window" onClick={() => document.getElementById('term-input')?.focus()}>
          <div className="terminal-titlebar">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">{terminal.prompt}: ~</span>
          </div>
          <div className="terminal-body" ref={bodyRef}>
            {history.map((line, i) =>
              line.type === 'prompt' ? (
                <div className="terminal-line prompt-line" key={i}>
                  <span className="prompt-label">{terminal.prompt}$</span> {line.text}
                </div>
              ) : (
                <div className="terminal-line output" key={i}>
                  {line.text}
                </div>
              )
            )}
          </div>
          <form className="terminal-input-row" onSubmit={onSubmit}>
            <span className="prompt-label">{terminal.prompt}$</span>
            <input
              id="term-input"
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck="false"
              placeholder="type a command..."
            />
          </form>
        </div>
        <div className="terminal-hint">
          try: {Object.keys(terminal.commands || {}).slice(0, 5).join(', ')} — ↑/↓ for history
        </div>
      </Reveal>
    </section>
  )
}
