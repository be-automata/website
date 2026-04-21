# TODOS

Priorities: **P0** blocking, **P1** next up, **P2** nice-to-have, **P3** later, **P4** maybe.

## Deployment

- **Create GitHub repo under `be-automata` org** — **Priority: P0** — `/ship` halted at push because no remote is configured. Create `github.com/be-automata/website` (or chosen slug), then `git remote add origin <url> && git push -u origin main && git push -u origin <branch>`.
- **Set up Vercel / Cloudflare Pages deployment** — **Priority: P1** — Astro builds to `dist/`. Both platforms auto-detect Astro. Point DNS for `beautomata.com` once deployed.

## Branding

- **Replace favicon SVG** — **Priority: P2** — `public/favicon.svg` is a placeholder letter-mark ("A" on black square). Swap for the real brand mark when ready.
- **License and load Waldenburg font** — **Priority: P3** — Currently falling back to Inter Variable at weight 200 per `src/styles/global.css`. `DESIGN.md` §3 specifies Waldenburg. Swap `--font-display` once licensed.
- **Replace favicon and add OG image** — **Priority: P2** — No `og:image` is set in `BaseLayout.astro` yet. Create a branded 1200×630 PNG and reference it.

## Content

- **Third case study** — **Priority: P3** — Current slots show two cases (`orch-agents`, `tapioca`). When a new client case is ready, drop `<slug>-{es,en}.mdx` into `src/content/case-studies/` and update the `problemMap`/`solutionMap`/`statusMap` objects in both `src/pages/casos/index.astro` and `src/pages/en/cases/index.astro`.
- **Blog / insights section** — **Priority: P4** — Not scoped for v0.1. Would re-use the existing content collection pattern.

## Completed
