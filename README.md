# Abishek K — Portfolio

Personal portfolio site for Abishek K, Full Stack Developer.
Theme: "Developer Command Center" — dark UI with a gold accent, inspired by GitHub, Vercel, Linear, and VS Code.

## Structure

```
abishek-portfolio/
├── index.html          Main page — all sections
├── css/
│   └── style.css       Full stylesheet (tokens, layout, components, responsive)
├── js/
│   └── main.js         Scroll progress, reveal animations, counters, typing effects
├── images/
│   └── abishek.png     ← ADD YOUR PHOTO HERE (see below)
└── README.md
```

## Before you deploy

1. **Add your photo**
   Place a photo named exactly `abishek.png` inside the `images/` folder.
   Recommended: square crop, at least 500×500px, good lighting, plain background.

2. **Resume download**
   The "Download Resume" button links to `Abishek_K_Resume.pdf`.
   Add a PDF with that exact filename to the project root, or update the `href`
   in `index.html` (search for `Download Resume`) to point wherever you host it.

3. **Repository / Live Demo links**
   Each project card has `Repository` and `Live Demo` buttons currently pointing to `#`.
   Update the `href` values in `index.html` under the `#projects` section with your
   real GitHub repo links and any deployed URLs. The Real-Time Chat Application
   button is already wired to `https://github.com/abijerey/RealtimeChatApp`.

4. **Contact details**
   Phone, email, GitHub, and LinkedIn are pulled into the terminal section in
   `js/main.js` (`terminalOutput` array). Update there if anything changes.

## Running locally

No build step — it's plain HTML/CSS/JS. Just open `index.html` in a browser,
or serve it locally:

```bash
npx serve .
```

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo (e.g. `abishek-portfolio`).
2. In the repo: **Settings → Pages → Source** → select the `main` branch, root folder.
3. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Notes

- All animations respect `prefers-reduced-motion`.
- Fonts used: Space Grotesk (headings), Inter (body), JetBrains Mono (code/labels) — loaded via Google Fonts in `index.html`.
- Content in Experience, Education, Achievements, and Projects sections is sourced directly from Abishek's resume — no placeholder or borrowed content.