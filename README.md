# Logan AI Assistant

An interactive prototype of an AI maintenance-assistant portal for a cold-rolling
aluminum plant, built from the Claude Design brief. React + Vite, deployed to
GitHub Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/logan-aluminum-demo/
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy (GitHub Pages)

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. The site is served at:

```
https://<owner>.github.io/logan-aluminum-demo/
```

The Vite `base` in `vite.config.js` must match the repo name (`/logan-aluminum-demo/`)
for assets to resolve under the Pages project subpath. If you rename the repo,
update `base` to match.

## Structure

- `src/App.jsx` — app shell, routing between screens, global state (active screen,
  command palette, source slide-over, voice-record toggle).
- `src/screens/` — one component per screen (Dashboard, Assistant/Chat, Documents,
  Asset Tree, PLC diff, Schematics, Predictive, Pattern Finder, Defects, Spares,
  Handover, Improvement Inbox, Audit Log).
- `src/components/` — Sidebar, Topbar, SourceSlideOver, CommandPalette.
- `src/data.js` — all demo content (faults, documents, sources, etc.).
- `src/css.js` — small helper that turns the design's inline CSS strings into React
  style objects, so the original styling is kept verbatim.
