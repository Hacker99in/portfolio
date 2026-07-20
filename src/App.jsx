import { useState } from "react";
import data from "./data.json";

import HackIntro from "./components/HackIntro.jsx";
import BootSequence from "./components/BootSequence.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Resume from "./components/Resume.jsx";
import Terminal from "./components/Terminal.jsx";
import Footer from "./components/Footer.jsx";
import Character from "./components/Character.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import EasterEggs from "./components/EasterEggs.jsx";
import Reveal from "./components/Reveal.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import SystemBadge from "./components/SystemBadge.jsx";
import TerminalPro from "./components/TerminalPro.jsx";

export default function App() {
  const [hacked, setHacked] = useState(false)
  const [booted, setBooted] = useState(false)

  return (
    <>
      {!hacked && <HackIntro onDone={() => setHacked(true)} />}

      {hacked && !booted && (
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
          {<Projects projects={data.projects} /> }
          <Resume resume={data.resume} />
          <Terminal terminal={data.terminal} />
          <Footer profile={data.profile} />
          {/* <Character character={data.character} /> */}
        </>
      )}
    </>
  )
}