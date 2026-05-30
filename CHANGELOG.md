# Changelog

All notable changes to the Automata website are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions use the 4-digit `MAJOR.MINOR.PATCH.MICRO` scheme.

## [0.1.4.0] - 2026-05-30

### Changed

- **EN copy rewritten for non-technical buyers** as a first-class draft (not a literal translation of ES). Symmetric to the ES rewrite in v0.1.3.0 — friends who validated the new ES voice approved porting the same softening to EN. Voice and ladder structure preserved; vocabulary swapped consistently across the homepage, capabilities page, case studies, and `/en/cases` index. Load-bearing replacements: "production AI agents" → "AI that does real work", "review gates" / "scoped authority" / "simulation-before-execute" / "traceability" / "blast radius" → plain-language equivalents ("a human approves every important step", "limited permissions", "preview before applying", "a log of every decision", "how big can the damage get"), "Framework-agnostic" pillar → "We don't lock you into a platform", "Legibility before magic" pillar → "Written processes, not in heads", "Tribal → legible in one file" → "The knowledge from one head, now in a file".
- **EN capabilities page (`/en/capabilities`) restructured outcome-first** to match `/capacidades`. The four `CapabilityGroup` titles flipped from mechanism (`Agent orchestration`, `RAG & knowledge`, `Autonomous agent security`, `Production infrastructure`) to outcomes (`AI that does real work, without constant supervision`, `Finds answers in your documents — without making things up`, `AI that stays in its lane`, `Works where your team already works, not on a separate platform`). Plain-language bullets on top; original technical bullets demoted into collapsed `<details>` blocks via the `details[]` prop landed in v0.1.3.0, with `detailsLabel="Technical details"` passed explicitly on every EN call to override the ES default.
- **EN maturity ladder names softened** to mirror ES: `Tribal` → `In heads`, `Legible` → `Written`, `Operating` → `In real use`, `Adaptive` → `Watchful`, `Self-improving` → `Improves with use`. Quotes and signals stay diagnostic.
- **EN footer tagline** (every `/en/*` page, via `src/i18n/ui.ts`) — `"Production AI agents — with review gates, not vibes."` → `"AI that does real work — with a human approving every important step."`.
- **EN anti-list voice** switched from singular ("I don't build…") to plural ("We don't build…") to match the agency-scale first-person plural used throughout the rest of the site.
- **EN case-studies index status strings** softened: `OSS · MIT · v0.4.0` → `Open source · MIT · v0.4.0`; `Production · BUSL · v0.2.0` → `In real customer use · v0.2.0`.

### Added

- **EN case studies open with a new `## Summary — for non-technical readers` block**, mirroring the ES `En resumen — para no-técnicos` intro added in v0.1.3.0. `tapioca-en.mdx` additionally gains a `## Technical evidence` section that corrals all crypto-specific jargon (ZeroDev Kernel V3, EIP-7702, ERC-4337, AES-256-GCM, Morpho/YO/Aave/Moonwell) into a clearly-labeled section non-crypto readers can skip.

### Notes

- No code-collection schema or component changes — `CapabilityGroup.astro`'s `details[]` / `detailsLabel?` props (added in v0.1.3.0) were already shared across both locales; the EN side just started using them this pass.
- `slugTranslations` in `src/i18n/ui.ts` already mapped the relevant routes — no new entries needed.

## [0.1.3.1] - 2026-05-26

### Security

- **`devalue` lifted past the DoS-via-sparse-array advisory** ([GHSA-77vg-94rm-hx3p](https://github.com/advisories/GHSA-77vg-94rm-hx3p)). Resolved transitively through `astro` via `npm audit fix` (5.7.1 → 5.8.1, within astro 5.x semver). Surfaced by the `/cso` audit on 2026-05-25 after the prior `@astrojs/check → devDependencies` cleanup removed the noise that was masking it. Reachability on this static-output marketing site was already low (no dynamic deserialization at runtime), but closing the known-vulnerable version is free.

### Notes

- `npm audit --omit=dev` now reports 2 vulnerabilities (1 moderate, 1 low) — both transitive through `astro` itself and clear with the astro 6.x major upgrade. Not addressed in this release; tracked in `.gstack/security-reports/2026-05-25-215730.json` under `follow_up_findings_surfaced`.

## [0.1.3.0] - 2026-05-25

### Changed

- **ES copy rewritten for non-technical buyers** (founders/CEOs, ops leads, marketing/PM). Friends reviewing the site said the original copy was too technical for the actual target audience. Voice and ladder structure preserved; vocabulary swapped consistently across the homepage, capabilities page, case studies, and casos index. Load-bearing translations: "agente de IA" → "sistema de IA", "puertas de revisión" → "un humano aprueba antes de cada acción importante", "autoridad acotada" → "permisos limitados" (with credit-card metaphor for `tapioca`), "framework-agnóstico" pillar → "No te encadenamos a una plataforma".
- **Capabilities page (`/capacidades`) restructured outcome-first.** The four group titles flipped from mechanism (`Orquestación de agentes`, `RAG y conocimiento`, …) to outcomes (`IA que ejecuta trabajo real, sin supervisión constante`, `Encuentra respuestas en tus documentos — sin inventar`, `IA que no se sale del carril`, `Funciona donde ya trabajas, no en una plataforma aparte`). Plain-language bullets on top; original technical bullets demoted into collapsed `<details>` blocks for engineering readers.
- **Maturity ladder names softened** for L3–L5: `Operando` → `En uso real`, `Adaptativo` → `Atento`, `Auto-mejorando` → `Mejora con cada uso`. Quotes/signals stay diagnostic.
- **Footer tagline** (every page, via `src/i18n/ui.ts`) — `"Agentes de IA en producción — con puertas de revisión, no a ciegas."` → `"IA que ejecuta trabajo real — con un humano que aprueba antes de cada paso importante."`.
- **Case studies (`orch-agents`, `tapioca`)** open with a new "En resumen — para no-técnicos" block. `tapioca` corrals all crypto-specific jargon (USDC, EIP-7702, ZeroDev, AES-256-GCM) into a clearly-labeled "Evidencia técnica" section so non-crypto readers can skip it.

### Added

- **`CapabilityGroup.astro` optional `details[]` prop** with native `<details><summary>Detalles técnicos</summary>` rendering. Lets pages show plain-language outcomes on top of each card with the deep mechanics tucked behind a click, no new component, no Tailwind class system needed.

### Notes

- EN locale (`/en/*`) intentionally **not** rewritten this pass. Ship ES first, validate with the friends who flagged the issue, then port EN as a first-class draft (not a literal translation).
- `.gitignore` now excludes `.gstack/` and `.superset/` (local AI-tooling artifacts).

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
