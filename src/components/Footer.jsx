import Reveal from './Reveal.jsx'

const ICONS = {
  github: '⌥',
  linkedin: 'in',
  twitter: '𝕏',
  mail: '@',
}

export default function Footer({ profile }) {
  return (
    <>
      <section id="contact" className="container">
        <Reveal>
          <div className="section-heading">
            <span className="num">06</span>
            <h2>contact</h2>
            <span className="rule" />
          </div>
          <p className="hero-sub" style={{ marginBottom: 24 }}>
            Got a project in mind, or just want to talk retro computers? My inbox is open.
          </p>
          <a className="btn" href={`mailto:${profile.email}`}>
            ✉ {profile.email}
          </a>
        </Reveal>
      </section>
      <footer>
        <div className="footer-socials">
          {profile.socials.map((s) => (
            <a href={s.url} key={s.label} target="_blank" rel="noreferrer">
              [{ICONS[s.icon] || s.label[0]}] {s.label}
            </a>
          ))}
        </div>
        <div>© {new Date().getFullYear()} {profile.name} — built with React &amp; way too much nostalgia.</div>
      </footer>
    </>
  )
}
