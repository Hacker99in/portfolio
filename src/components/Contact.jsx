import Reveal from './Reveal.jsx';

export default function Contact({ contact }) {
  return (
    <section id="contact">
      <div className="container">
        <Reveal className="panel contact-panel">
          <div className="section-label" style={{ justifyContent: 'center' }}>SECTION 05</div>
          <h2 className="section-title">{contact.heading}</h2>
          <p className="contact-sub">{contact.subheading}</p>
          <a href={`mailto:${contact.email}`} className="contact-email">
            {contact.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
