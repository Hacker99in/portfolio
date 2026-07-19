import Reveal from './Reveal.jsx';

const ICON_MAP = {
  github: '◆',
  linkedin: '▣',
  twitter: '✈',
  mail: '✉',
};

export default function About({ profile }) {
  return (
    <section id="about">
      <div className="container">
        <div className="section-label">SECTION 01</div>
        <h2 className="section-title">
          ABOUT_<span className="accent">ME</span>
        </h2>
        <div className="about-grid">
          <Reveal>
            <div className="avatar-box">{profile.avatarText}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about-text">{profile.about}</p>
            <div className="about-meta">
              <span>LOCATION: <b>{profile.location}</b></span>
              <span>STATUS: <b>{profile.status.replace(/_/g, ' ')}</b></span>
            </div>
            <div className="social-row">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label}>
                  {ICON_MAP[s.icon] || '◆'}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
