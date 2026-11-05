# Consolidated correction Preview verification — 2026-10-06

## Deployed source

- **Preview:** https://2724fdbc.joshuaik2.pages.dev/
- **Cloudflare deployment:** `2724fdbc-5f4e-4552-8ad8-60f5e84e4fe2`
- **Environment / branch:** Preview / `feat/portfolio-integration`
- **Application source:** `ffc7580b8b57f90c7918af213e6b2ed68248942a`
- Wrangler deployment listing identifies source `ffc7580`.
- The deployment was built from a clean detached worktree at that exact commit. The committed public asset set excludes unrelated local experiments and the unused raw Personal Highlights originals.

## Build and tests

- `npm test -- --run --dir src`: **176 tests passed across 25 files**.
- `npm run build`: passed (`tsc -b` and Vite production build).
- `git diff --check`: passed on the integration checkout.

## Installed Chrome verification

Playwright 1.63.0 drove installed Chrome against the immutable Preview.

All **19 desktop routes** returned HTTP 200 at 1440×1000, rendered an `h1`, had no broken `<img>` elements, no page errors, and matched viewport width:

`/home`, `/projects`, `/experience`, `/hackathons`, `/education`, `/education/projects`, `/resume`, `/resume/viewer`, `/profile`, `/profile/journey`, `/profile/demos`, `/profile/highlights`, `/projects/food-tracker`, `/projects/choveigo`, `/projects/crest`, `/projects/fraymakers`, `/experience/living-in-silico`, `/experience/stush-patties`, and `/help`.

All **14 narrow routes** returned HTTP 200 at 390×844, rendered an `h1`, had no broken `<img>` elements or page errors, and matched viewport width:

`/home`, `/projects`, `/resume`, `/profile`, `/profile/journey`, `/profile/demos`, `/profile/highlights`, `/education/projects`, `/projects/food-tracker`, `/projects/choveigo`, `/projects/crest`, `/projects/fraymakers`, `/experience/living-in-silico`, and `/experience/stush-patties`.

Additional interaction checks:

- Resume opened as a modal over Home; Escape returned to `/home`.
- Crest selected and played in the in-page YouTube-nocookie iframe without leaving `/profile/demos`.
- On local installed Chrome against the same committed source, Opening natural handoff, Skip, and reduced-motion handoff all reached `/home`.

## Review scope and known limits

The Preview includes the current shell and Opening, Home modes/utilities, category lobbies, Resume Found/Viewer, Profile, Journey, Demos, Personal Highlights, Education projects, and all six materially re-authored long-form case studies. The case studies remain open for owner review; route, build, test, and smoke-render success do not constitute story acceptance.

Food Tracker demo video and a privacy-safe Cho’Veigo video remain pending. Dental, Bookstore, and CMOS technical evidence remains gated; no unsupported project implementation details were added. Live screen-reader interaction and final public-release photo-consent review remain manual. J Candidate 05 and the separate identity lane were not integrated. Production was not targeted.
