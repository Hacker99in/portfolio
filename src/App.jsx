import { useEffect, useState } from 'react';
import data from './data/data.json';

import BootScreen from './components/BootScreen.jsx';
import CRTOverlay from './components/CRTOverlay.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';

export default function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (booted) document.title = data.meta.siteTitle;
  }, [booted]);

  return (
    <>
      <BootScreen lines={data.meta.bootLines} onDone={() => setBooted(true)} />
      <CRTOverlay />

      <div id="site" className={booted ? 'revealed' : ''}>
        <Header profile={data.profile} />
        <main>
          <Hero profile={data.profile} started={booted} />
          <About profile={data.profile} />
          <Skills categories={data.skills.categories} />
          <Projects projects={data.projects} />
          <Resume experience={data.experience} education={data.education} resume={data.resume} />
          <Contact contact={data.contact} />
        </main>
        <Footer profile={data.profile} />
      </div>

      <BackToTop />
    </>
  );
}
