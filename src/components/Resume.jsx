import Reveal from './Reveal.jsx';

export default function Resume({ experience, education, resume }) {
  return (
    <section id="resume">
      <div className="container">
        <div className="section-label">SECTION 04</div>
        <div className="resume-top">
          <h2 className="section-title" style={{ margin: 0 }}>
            EXPERIENCE_<span className="accent">LOG</span>
          </h2>
          <a href={resume.fileUrl} className="btn" download>
            {resume.downloadLabel}
          </a>
        </div>

        <Reveal>
          <div className="timeline">
            {experience.map((job) => (
              <div className="timeline-item" key={`${job.role}-${job.company}`}>
                <h3 className="timeline-role">{job.role}</h3>
                <div className="timeline-meta">
                  <span className="co">{job.company}</span>
                  <span>{job.period}</span>
                </div>
                <ul className="timeline-points">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="edu-block">
            <h3 className="skill-cat-title">EDUCATION</h3>
            {education.map((e) => (
              <div key={e.degree} style={{ marginTop: 10 }}>
                <div style={{ color: 'var(--text)', fontSize: 14 }}>{e.degree}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: 12, marginTop: 2 }}>
                  {e.school} &middot; {e.period}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
