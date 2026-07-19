import { useState } from 'react'
import data from './data.json'
import BootSequence from './components/BootSequence.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Resume from './components/Resume.jsx'
import Terminal from './components/Terminal.jsx'
import Footer from './components/Footer.jsx'
import Character from './components/Character.jsx'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      {!booted && (
        <BootSequence messages={data.profile.bootMessages} onDone={() => setBooted(true)} />
      )}

      <div className="crt-overlay" />
      <div className="crt-vignette" />
      <div className="crt-flicker" />

      {booted && (
        <>
          <Navbar title={data.site.title} />
          <Hero profile={data.profile} />
          <About profile={data.profile} />
          <Skills skills={data.skills} />
          {/* <Projects projects={data.projects} /> */}
          <Resume resume={data.resume} />
          <Terminal terminal={data.terminal} />
          <Footer profile={data.profile} />
          <Character character={data.character} />
        </>
      )}
    </>
  )
}
