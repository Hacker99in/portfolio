# Retro Terminal Portfolio (React + Vite)

A dark, CRT-terminal themed portfolio site. Boot-up cut-scene on load, scanline/glow effects,
scroll-reveal animations (with a glitch "cut" on project cards), typewriter tagline, and
animated skill bars — all built with React + Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Edit your content

Everything on the page — name, tagline, about text, socials, skills, projects, work
experience, education, and resume link — lives in one file:

```
src/data/data.json
```

Change the values there and the site updates automatically (no code edits needed).
Key sections:

- `meta.bootLines` — the lines typed out in the boot-up cut-scene
- `profile` — name, handle, tagline, location, status, about text, socials
- `skills.categories` — grouped skills with a `level` (0–100) that drives the bar width
- `projects` — cards shown in the Projects section (`status` can be `LIVE`, `ARCHIVED`,
  `MAINTAINED`, etc. — anything other than `ARCHIVED` renders in green, `ARCHIVED` renders amber)
- `experience` — timeline entries in the Resume section
- `education` — degrees listed under the timeline
- `resume.fileUrl` — point this at your actual resume PDF (drop it in `public/` and reference
  it as `/your-resume.pdf`) and it powers the download button
- `contact` — heading, subheading, and email shown in the contact panel

## Project structure

```
src/
  data/data.json        <- all editable content
  components/
    BootScreen.jsx       boot-up cut-scene (typed terminal lines)
    CRTOverlay.jsx        scanlines / vignette / moving scan bar
    Header.jsx             sticky nav with terminal window chrome
    Hero.jsx                 name, typewriter tagline, animated "whoami" terminal
    About.jsx
    Skills.jsx               animated progress bars
    Projects.jsx             project cards (glitch-in on scroll)
    Resume.jsx                experience timeline + education + resume download
    Contact.jsx
    Footer.jsx
    BackToTop.jsx
    Reveal.jsx                shared scroll-reveal animation wrapper
  App.jsx                 wires everything together
  index.css               retro CRT theme (colors, fonts, effects — all in CSS variables)
```

## Customizing the look

Colors, fonts and spacing are all CSS variables at the top of `src/index.css` under `:root`.
Swap `--phosphor` (the green) and `--amber` for a different retro palette (e.g. amber-only
CRT, or a synthwave pink/cyan combo) without touching any component code.

Respects `prefers-reduced-motion` — scanline movement and reveal transitions are disabled
for users who have that OS setting on.
"# portfolio" 
