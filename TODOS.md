# TODOS

Priorities: **P0** blocking, **P1** next up, **P2** nice-to-have, **P3** later, **P4** maybe.

## Branding

- **License and load Waldenburg font** — **Priority: P3** — Currently falling back to Inter Variable at weight 200 per `src/styles/global.css`. `DESIGN.md` §3 specifies Waldenburg. Swap `--font-display` once licensed.

## Content

- **Third case study** — **Priority: P3** — Current slots show two cases (`orch-agents`, `tapioca`). When a new client case is ready, drop `<slug>-{es,en}.mdx` into `src/content/case-studies/` and update the `problemMap`/`solutionMap`/`statusMap` objects in both `src/pages/casos/index.astro` and `src/pages/en/cases/index.astro`.
- **Blog / insights section** — **Priority: P4** — Not scoped for v0.1. Would re-use the existing content collection pattern.

## Completed

- **Create GitHub repo under `be-automata` org** — P0 — Completed: v0.1.0.0 (2026-04-21). Public at github.com/be-automata/website.
- **Set up Vercel / Cloudflare Pages deployment** — P1 — Completed: v0.1.0.0 (2026-04-21). Live at www.beautomata.com. GitHub ↔ Vercel auto-deploy on `main` wired up on 2026-04-21.
- **Replace favicon SVG** — P2 — Completed: 2026-04-21. Black rounded square, Helvetica Neue weight-300 "A", green accent dot tying to the status-indicator brand. `public/favicon.svg` + auto-generated `public/apple-touch-icon.png` (180×180) via `npm run gen:icons`.
- **Add OG image** — P2 — Completed: 2026-04-21. 1200×630 branded card generated with satori + @resvg/resvg-js using real Inter fonts. Regenerate with `npm run gen:og` (auto-downloads TTFs from rsms/inter v4.1). Full `og:*` and `twitter:*` meta wired in `BaseLayout.astro`.
