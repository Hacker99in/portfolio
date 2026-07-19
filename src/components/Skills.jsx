import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';

function SkillBar({ name, level }) {
  return (
    <div className="skill-row">
      <div className="skill-row-top">
        <span>{name}</span>
        <span className="pct">{level}%</span>
      </div>
      <div className="bar-track">
        <motion.div
          className="bar-fill"
          initial={{ width: '0%' }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills({ categories }) {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-label">SECTION 02</div>
        <h2 className="section-title">
          SKILL_<span className="accent">TREE</span>
        </h2>
        <div className="skills-grid">
          {categories.map((cat, ci) => (
            <Reveal key={cat.name} delay={ci * 0.08}>
              <div className="panel" style={{ padding: 22 }}>
                <h3 className="skill-cat-title">{cat.name}</h3>
                {cat.items.map((item) => (
                  <SkillBar key={item.name} name={item.name} level={item.level} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
