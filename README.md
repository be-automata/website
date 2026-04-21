# Automata — Website

Production AI agents with review gates. Not vibes.

Marketing + case-studies site for the Automata brand, built as a bilingual (ES/EN) static site. Implements the design system in `docs/brand/DESIGN.md` (ElevenLabs-inspired) and the content architecture documented in `~/.claude/projects/-Users-senior-Developer-Automata-website/memory/`.

## Stack

- Astro 5 (static output, built-in i18n)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- MDX content collections (typed with Zod)
- Inter Variable + Geist Mono Variable (fontsource)

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output to dist/
npm run preview   # serve built output locally
npm run check     # type-check Astro + content collections
```

## Structure

```
src/
├── content/
│   └── case-studies/
│       ├── orch-agents.{es,en}.mdx
│       └── tapioca.{es,en}.mdx
├── components/         # Hero, Ladder, Stepper, CaseStudyGrid, Pillars, ContactCTA, MaturityLadder, CapabilityGroup, AntiList, Navigation, Footer
├── layouts/            # BaseLayout, CaseStudyLayout
├── pages/
│   ├── index.astro            # ES home (/)
│   ├── capacidades.astro      # ES capabilities (/capacidades)
│   ├── casos/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── en/
│       ├── index.astro        # EN home (/en/)
│       ├── capabilities.astro
│       └── cases/
│           ├── index.astro
│           └── [slug].astro
├── i18n/ui.ts
└── styles/global.css   # DESIGN.md tokens translated to CSS variables
```

## Content

Case studies are MDX files filtered by the `lang` frontmatter field. To add one:

1. Drop a new `<slug>.{es,en}.mdx` in `src/content/case-studies/`
2. Include `slug`, `lang`, `title`, `tagline`, `stack`, `license`, and optional `repoUrl` / `liveUrl`
3. Update the problem/solution/status maps in the `/casos/index.astro` and `/en/cases/index.astro` summaries

## Design system

Tokens live in `src/styles/global.css` as Tailwind v4 `@theme` variables. The display font defaults to Inter at weight 200/300 as a royalty-free stand-in for Waldenburg — swap `--font-display` when a Waldenburg license is in place.
