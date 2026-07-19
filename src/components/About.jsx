import Reveal from './Reveal.jsx'

export default function About({ profile }) {
  return (
    <section id="about" className="container" >
      <Reveal>
        <div className="section-heading">
          <span className="num">01</span>
          <h2>about.txt</h2>
          <span className="rule" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="about-grid">
          <div className="about-avatar">
            <img src={profile.avatar} alt={profile.name} />
          </div>
          <div className="about-text">
            <p>{profile.about}</p>
            <div className="about-meta">
              <span className="chip">{profile.role}</span>
              <span className="chip">{profile.location}</span>
              <span className="chip">{profile.handle}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
