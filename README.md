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
npm run dev              # http://localhost:4321
npm run build            # static output to dist/
npm run preview          # serve built output locally
npm run check            # type-check Astro + content collections
npm run test:e2e         # Playwright E2E suite (language switcher, etc.)
npm run test:e2e:ui      # Playwright UI mode
npm run test:e2e:report  # open the last HTML report
npm run gen:og           # regenerate public/og-default.png (satori + resvg)
npm run gen:icons        # regenerate public/apple-touch-icon.png
```

## Testing

End-to-end tests run in Chromium via Playwright. The current suite covers the bilingual user flows (language switcher across home, capabilities, cases index, and case-study detail). `playwright.config.ts` auto-starts `npm run dev` on `:4321` if nothing is already listening there, and reuses an existing dev server otherwise.

```bash
npm run test:e2e         # headless
npm run test:e2e:ui      # interactive Playwright UI
npm run test:e2e:report  # open the last HTML report
```

Reproducing the switcher bug fixed in v0.1.1.0:

```bash
git revert 1f07abe --no-edit && npm run test:e2e
# Expect: 5/7 fail with received-URL evidence (e.g. /en/capacidades instead of /en/capabilities).
```

## Structure

```
src/
├── content/
│   └── case-studies/
│       ├── orch-agents-es.mdx
│       ├── orch-agents-en.mdx
│       ├── tapioca-es.mdx
│       └── tapioca-en.mdx
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
├── i18n/ui.ts          # locale strings + translatePath() for the language switcher
└── styles/global.css   # DESIGN.md tokens translated to CSS variables

tests/
└── e2e/                # Playwright specs (language-switch.spec.ts, ...)

scripts/
├── generate-og.mjs     # builds public/og-default.png from satori + resvg
└── generate-icons.mjs  # builds public/apple-touch-icon.png

playwright.config.ts    # auto-boots `npm run dev` on :4321
```

## Content

Case studies are MDX files filtered by the `lang` frontmatter field. To add one:

1. Drop `<slug>-es.mdx` and `<slug>-en.mdx` in `src/content/case-studies/` (the language suffix is mandatory)
2. Include `caseSlug`, `lang`, `title`, `tagline`, `stack`, `license`, and optional `repoUrl` / `liveUrl` (schema in `src/content.config.ts`)
3. Update the problem/solution/status maps in `src/pages/casos/index.astro` and `src/pages/en/cases/index.astro`

## Design system

Tokens live in `src/styles/global.css` as Tailwind v4 `@theme` variables. The display font defaults to Inter at weight 200/300 as a royalty-free stand-in for Waldenburg — swap `--font-display` when a Waldenburg license is in place.
