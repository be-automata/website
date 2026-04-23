# Changelog

All notable changes to the Automata website are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions use the 4-digit `MAJOR.MINOR.PATCH.MICRO` scheme.

## [0.1.2.0] - 2026-04-22

### Added

- **Privacy Policy** (`/privacidad` + `/en/privacy`) — bilingual GDPR-aware notice disclosing AUTOMATA AI LLC (Kansas) as data controller, Vercel as sole processor, and the actual reality of the site (no analytics, no non-essential cookies). Covers LGPD (Brazil), LFPDPPP (Mexico), Law 1581/2012 (Colombia), Law 25.326 (Argentina), Law 19.628 (Chile), Law 29733 (Peru), GDPR (EU/UK), and CCPA/CPRA (California), with explicit international-transfer language for both EU/UK→US and LATAM→US flows.
- **Terms of Use** (`/terminos` + `/en/terms`) — bilingual terms with Kansas governing law, Johnson County venue, IP carve-out for MIT open-source projects linked from the site (e.g. `orch-agents`), and standard liability/warranty disclaimers.
- **Footer legal links** — `Privacy · Terms` row on every page, locale-aware, styled in the existing `t-caption` bottom bar next to the copyright.
- **Playwright coverage** for the new language-switch routes. Suite grows from 7 → 11 tests.

### Changed

- **`src/i18n/ui.ts`** — `slugTranslations` now maps `privacidad ↔ privacy` and `terminos ↔ terms`, so the header language switcher translates cleanly on every new route.

## [0.1.1.0] - 2026-04-21

### Fixed

- **Language switcher on non-home pages** — clicking EN/ES from `/capacidades`, `/casos`, or any case study no longer lands on a 404. The switcher now translates the localized slug (`capacidades` ↔ `capabilities`, `casos` ↔ `cases`) and preserves any trailing `[slug]` segment on case-study URLs.

### Added

- **Playwright E2E suite** for the language switcher (7 tests, both directions, across home / capabilities / cases index / case-study detail). Run with `npm run test:e2e` (or `test:e2e:ui` for the Playwright UI, `test:e2e:report` to open the last HTML report).

## [0.1.0.0] - 2026-04-21

### Added

- **Initial public website** — bilingual (ES primary, EN secondary) marketing site for the Automata brand, built on Astro 5 + Tailwind CSS v4 + MDX content collections.
- **Home pages** (`/` and `/en/`) with seven sections: hero with status indicator, offer ladder (4 tiers), 3-phase process stepper, case studies grid, stats row, WORKFLOW.md code artifact, differentiator pillars, and contact CTA.
- **Capabilities pages** (`/capacidades` and `/en/capabilities`) with the full L0–L5 maturity ladder as expandable details, four technical capability clusters, an "About the stack" section, an "What we don't do" anti-list, and contact CTA.
- **Case study system** — content collection backed by MDX, dynamic routing at `/casos/[slug]` and `/en/cases/[slug]`, plus index pages at `/casos` and `/en/cases`. Ships with two live cases: `orch-agents` and `tapioca.money`.
- **Design system** — tokens translated from `docs/brand/DESIGN.md` (ElevenLabs-inspired) into Tailwind v4 `@theme` variables: achromatic palette with warm-stone accent, multi-layer shadow stack (sub-0.1 opacity), Inter Variable at weight 200/300 as Waldenburg stand-in, Geist Mono Variable for code.
- **Reusable components** — `Hero`, `Ladder`, `Stepper`, `CaseStudyGrid`, `Stats`, `CodeArtifact`, `Pillars`, `MaturityLadder`, `CapabilityGroup`, `AntiList`, `ContactCTA`, `SectionHeader`, `Navigation`, `Footer`.
- **Visual contrast layer** — section-level watermark numerals, pulsing green status dot, terminal-styled code block with lightweight syntax highlighting, oversized stat callouts, mixed-weight emphasis in pillars, CSS-only scroll-reveal via `animation-timeline`.
- **i18n** — native Astro i18n (ES at `/`, EN at `/en/`) with `hreflang` alternates, language toggle in navigation, and per-locale strings in `src/i18n/ui.ts`.
- **First-person plural voice** throughout the site ("Diseñamos" / "We design"), signalling agency-scale credibility. Client-voice quotes in the offer ladder remain singular on purpose.
- **SEO plumbing** — automatic sitemap via `@astrojs/sitemap`, Open Graph + Twitter meta tags per page, `hreflang` alternates.
