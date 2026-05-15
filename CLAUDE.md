# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (Docker — preferred)
docker compose up

# Development (local)
npm install
npm run dev

# Production build (must pass before deploying)
npm run build

# Preview production build
npm run preview
```

## Architecture

Vue 3 + TypeScript + Vite SPA with three fully independent views, each accessed via a unique URL (no shared navigation). The app is deployed to Vercel; `vercel.json` rewrites all paths to `index.html` so Vue Router handles routing client-side.

### Views and routes

| Route | View | Theme |
|---|---|---|
| `/entre-sin-pensar` | `CuriosityView.vue` | Texto estático con jitter leve, sin glitch de caracteres |
| `/no-mires-atras` | `SearchingView.vue` | Glitch sutil constante (intensity 0.1) |
| `/nunca-estuve-solo` | `FoundView.vue` | Glitch medio, cara en fondo, alternancia :( / :) |

Each view is meant to be reached via a physical QR code; there is intentionally no navigation between them.

### Shared components

- **`VhsOverlay.vue`** — fixed full-screen overlay (`z-index: 9999`) with scanlines, animated grain noise, brightness flicker, and occasional horizontal distortion. Always included in every view.
- **`GlitchText.vue`** — accepts `text`, `intensity` (`low` | `medium` | `high`), and `tag` props. Runs a character-scramble on mount and on a recurring timer; adds `::before`/`::after` clip-path glitch via CSS.

### Visual rules

- Font: **VCR OSD Mono** loaded from `src/assets/fonts/vcr_osd_mono_1.001.ttf` — must be present or all text falls back to monospace.
- Palette: black/white for views 1–2; dark red (`#0d0000`, `#cc2200`) only in view 3.
- No cursor (`cursor: none` globally in `style.css`).
- All visual effects are pure CSS/Vue — no animation libraries.
