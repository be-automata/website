# CLAUDE.md

Instructions for Claude Code working in this repo. See `README.md` for the human-facing overview.

## Project

Bilingual (ES primary, EN secondary) marketing + case-studies site for the Automata brand. Astro 5 static output, Tailwind CSS v4, MDX content collections. ES lives at `/`, EN at `/en/`. Localized slugs differ per language: `/capacidades` ↔ `/en/capabilities`, `/casos` ↔ `/en/cases`.

## Commands

- `npm run dev` — dev server on `:4321`
- `npm run build` — static output to `dist/`
- `npm run check` — Astro + content-collection type check (run before shipping)
- `npm run test:e2e` — Playwright E2E suite (Chromium)
- `npm run gen:og` / `npm run gen:icons` — regenerate brand assets

## Testing

Playwright suite in `tests/e2e/` (currently covers the language switcher). `playwright.config.ts` auto-boots `npm run dev` or reuses an existing dev server. When adding a new localized route, add the slug pair to `slugTranslations` in `src/i18n/ui.ts` and extend `tests/e2e/language-switch.spec.ts` with a matching case.

The Astro dev toolbar injects extra `<h1>` tags — scope Playwright heading assertions to `main h1` or use `.first()` to avoid strict-mode violations.

## Deploy Configuration

- **Platform:** Vercel (auto-deploy on merge to `main`; GitHub ↔ Vercel integration)
- **Production URL:** https://beautomata.com (also reachable at https://www.beautomata.com — apex redirects to www)
- **Preview deploys:** Vercel builds a preview on every PR. These URLs are **team-scoped and return 401 by design** — do NOT use them for canary health checks, use the production URL after merge instead.
- **Deploy status commands:** none needed; Vercel deploys are fast (<60s for this static site). Post-merge, poll `curl -sL https://beautomata.com/<path>` — always pass `-L` because the apex redirects.
- **Staging:** none configured. Merges to `main` go straight to production.

## Gotchas

- Case-study filenames must use a hyphen language suffix (`<slug>-es.mdx`, `<slug>-en.mdx`), not dots — the collection filter reads the `lang` frontmatter field, but Astro has historically had bugs with multi-dot filenames.
- The content schema field is `caseSlug`, not `slug` — `slug` is reserved by Astro's content collections API.
- When switching languages from a non-home page, `Navigation.astro` calls `translatePath()` from `src/i18n/ui.ts`, which uses a flat slug dictionary. Unknown slugs pass through unchanged and will 404 on the other side — add the pair to `slugTranslations` when adding a new localized route.

## Versioning

Four-digit scheme `MAJOR.MINOR.PATCH.MICRO` tracked in `VERSION`. CHANGELOG uses Keep a Changelog format. Current: see `VERSION`.
