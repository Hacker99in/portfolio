import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function useTypewriter(text, speed = 45, start = true) {
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!start) return;
    let i = 0;
    setOutput('');
    const interval = setInterval(() => {
      i++;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);

  return output;
}

function TerminalLine({ type, text, delay }) {
  return (
    <motion.div
      className={`term-line ${type === 'prompt' ? 'term-prompt' : 'term-out'}`}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      {text}
    </motion.div>
  );
}

export default function Hero({ profile, started }) {
  const tagline = useTypewriter(profile.tagline, 45, started);

  const termLines = [
    { type: 'prompt', text: 'guest@portfolio:~$ whoami' },
    { type: 'out', text: `${profile.name} — ${profile.tagline}` },
    { type: 'prompt', text: 'guest@portfolio:~$ cat location.txt' },
    { type: 'out', text: profile.location },
    { type: 'prompt', text: 'guest@portfolio:~$ ls socials/' },
    { type: 'out', text: profile.socials.map((s) => s.label).join('   ') },
    { type: 'prompt', text: 'guest@portfolio:~$ _' },
  ];

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-eyebrow">
              <span className="status-dot" /> {profile.status.replace(/_/g, ' ')}
            </div>
            <h1 className="hero-name">
              Hi, I'm <span className="accent">{profile.name}</span>
            </h1>
            <div className="typewriter">{tagline}</div>
            <p className="hero-desc">{profile.about}</p>
            <div className="hero-actions">
              <a href="#projects" className="btn">VIEW_PROJECTS</a>
              <a href="#contact" className="btn ghost">GET_IN_TOUCH</a>
            </div>
          </motion.div>

          <motion.div
            className="panel hero-terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="panel-head">
              <span className="dot" style={{ background: '#ff5f56' }} />
              <span className="dot" style={{ background: '#ffbd2e' }} />
              <span className="dot" style={{ background: '#27c93f' }} />
              <span style={{ marginLeft: 'auto' }}>whoami.sh</span>
            </div>
            <div className="hero-terminal-body">
              {started &&
                termLines.map((line, idx) => (
                  <TerminalLine key={idx} type={line.type} text={line.text} delay={idx * 0.28} />
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
