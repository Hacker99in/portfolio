import Reveal from './Reveal.jsx'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="container">
      <Reveal>
        <div className="section-heading">
          <span className="num">03</span>
          <h2>projects/</h2>
          <span className="rule" />
        </div>
      </Reveal>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <Reveal delay={i * 0.08} key={p.title}>
            <div className={`panel project-card${p.featured ? ' fx-static-noise' : ''}`}>
              {p.featured && <span className="featured-badge fx-alert-pulse">featured</span>}
              <img className="project-img" src={p.image} alt={p.title} />
              <div className="project-body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="tech-tags">
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer">
                      live ↗
                    </a>
                  )}
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noreferrer">
                      source ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}