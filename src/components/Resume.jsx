import Reveal from './Reveal.jsx'

export default function Resume({ resume }) {
  return (
    <section id="resume" className="container">
      <Reveal>
        <div className="section-heading">
          <span className="num">04</span>
          <h2>resume.log</h2>
          <span className="rule" />
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="resume-summary">{resume.summary}</p>
        <a className="btn" href={resume.downloadUrl} download style={{ marginBottom: 40, display: 'inline-flex' }}>
          ↓ download resume
        </a>
      </Reveal>

      <Reveal delay={0.1}>
        <h3 style={{ fontSize: 13, color: 'var(--amber)', marginTop: 40, marginBottom: 20 }}>
          &gt; experience
        </h3>
        <div className="timeline">
          {resume.experience.map((job) => (
            <div className="timeline-item" key={job.role + job.company}>
              <h3>{job.role} · {job.company}</h3>
              <div className="meta">{job.period}</div>
              <ul>
                {job.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <h3 style={{ fontSize: 13, color: 'var(--amber)', marginTop: 44, marginBottom: 20 }}>
          &gt; education
        </h3>
        <div className="timeline">
          {resume.education.map((ed) => (
            <div className="timeline-item" key={ed.degree}>
              <h3>{ed.degree}</h3>
              <div className="meta">{ed.school} · {ed.period}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
