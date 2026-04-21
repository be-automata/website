# Changelog

All notable changes to the Automata website are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions use the 4-digit `MAJOR.MINOR.PATCH.MICRO` scheme.

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
