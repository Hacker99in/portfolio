import Reveal from './Reveal.jsx'

export default function Skills({ skills }) {
  return (
    <section id="skills" className="container">
      <Reveal>
        <div className="section-heading">
          <span className="num">02</span>
          <h2>skills.json</h2>
          <span className="rule" />
        </div>
      </Reveal>
      <div className="skills-grid">
        {skills.map((group, gi) => (
          <Reveal delay={gi * 0.08} key={group.category}>
            <div className="panel skill-card">
              <h3>&gt; {group.category}</h3>
              {group.items.map((item) => (
                <div className="skill-bar-row" key={item}>
                  <span className="dot">■</span> {item}
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
