import Reveal from './Reveal.jsx';

export default function Projects({ projects }) {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-label">SECTION 03</div>
        <h2 className="section-title">
          PROJECT_<span className="accent">LOG</span>
        </h2>
        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <Reveal key={proj.id} glitch delay={(idx % 2) * 0.08} as="article" className="panel project-card">
              <div className="project-top">
                <div>
                  <h3 className="project-title">{proj.title}</h3>
                  <span className="project-year">{proj.year}</span>
                </div>
                <span className={`project-status ${proj.status === 'ARCHIVED' ? 'alert' : ''}`}>
                  {proj.status}
                </span>
              </div>
              <p className="project-desc">{proj.description}</p>
              <div className="project-stack">
                {proj.stack.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={proj.link} target="_blank" rel="noopener noreferrer">VIEW_LIVE ↗</a>
                <a href={proj.repo} target="_blank" rel="noopener noreferrer">SOURCE_CODE ↗</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
