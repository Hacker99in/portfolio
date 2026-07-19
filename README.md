# Retro Terminal Portfolio

A dark, CRT/retro-terminal themed personal portfolio built with React + Vite +
Framer Motion. Everything you'd want to personalize lives in **one file**:
`src/data.json`.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To build for deployment:

```bash
npm run build
npm run preview   # preview the production build locally
```

The `dist/` folder can be deployed to Vercel, Netlify, GitHub Pages, or any
static host.

## Editing your content — `src/data.json`

This one file drives the whole site. No component code needs to change for
normal edits.

| Key | Controls |
|---|---|
| `site.title` | Text in the top-left nav / browser tab feel |
| `profile` | Name, tagline, role, about text, avatar image, socials, boot-up cutscene lines |
| `skills` | Skill categories + items shown in the Skills grid |
| `projects` | Project cards — title, description, tech tags, image, links, `featured` badge |
| `resume` | Summary, work experience timeline, education, resume download link |
| `character` | The floating sidekick: name, image, greeting, and the list of `dialogs` it cycles through when clicked. Use `{count}` inside a dialog string to show how many times it's been clicked. |
| `terminal` | Prompt label, welcome lines, and a `commands` object — the key is what the user types, the value is the response text. Add a new command by adding a new key/value pair, no code changes needed. |

### Changing the character image

Just replace `character.image` in `data.json` with any image URL, or drop a
file into `public/` (e.g. `public/pixel.png`) and set the value to
`/pixel.png`. Works with static PNGs, GIFs, or SVGs. Keep it roughly square
for the round portrait frame.

### Adding a resume PDF

Drop your PDF into `public/resume.pdf` (or any filename) and update
`resume.downloadUrl` in `data.json` to match, e.g. `/resume.pdf`.

### Adding terminal commands

Edit `terminal.commands` in `data.json`:

```json
"commands": {
  "help": "...",
  "yourcommand": "This is what gets printed back."
}
```

Built-in commands that always work regardless of JSON: `clear` (clears the
screen) and `echo <text>` (echoes text back). Use ↑ / ↓ in the terminal to
navigate command history.

## Design notes

- Theme: CRT phosphor terminal — scanlines, vignette, subtle screen flicker,
  and a glitch effect on the hero name.
- Fonts: `Press Start 2P` (pixel display headings), `VT323` (retro body
  copy), `Share Tech Mono` (terminal/UI text).
- "Cut scenes": a boot sequence plays once on load, and each section fades /
  slides into view as you scroll (see `src/components/Reveal.jsx`).
- Fully responsive down to mobile — the nav collapses into a toggle menu and
  grids reflow to single columns.
- Respects `prefers-reduced-motion`.

## Project structure

```
src/
  data.json              ← edit this for your content
  App.jsx                ← page composition
  index.css              ← theme, animations, responsive layout
  components/
    BootSequence.jsx      boot-up cutscene
    Reveal.jsx             scroll-reveal animation wrapper
    Navbar.jsx
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    Resume.jsx
    Character.jsx          floating sidekick widget
    Terminal.jsx            fake terminal
    Footer.jsx
```
