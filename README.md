# Joshua Aryeetey · Portfolio client

This Vite and React client contains project and experience indexes, six long-form stories, Profile, Journey, Demos, Help, resume, and recovery routes. Its current implementation is being realigned to the active Figma direction; route coverage, tests, build status, and hosting fallback do not establish visual completion. The latest recorded immutable staging deployment uses application source `e5306ed`; browser-rendered review remains pending. Its HTTP 200 route checks confirmed hosting fallback only, not client-side rendering.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Direct route loads are handled by the Vite fallback.

```sh
npm run deploy
```

Deploys to the separate `joshuaik2` Cloudflare Pages staging project, using Wrangler `4.141.0`. The `public/_redirects` file enables direct loading of client routes on Pages.

## Checks

```sh
npm run lint
npm run typecheck
npm test -- --run
npm run build
```

## Routes

- `/` — opening sequence (target flow: Home / Explore, then visitor-selected destination)
- `/projects` and `/experience` — project and experience indexes
- `/projects/food-tracker`, `/projects/crest`, `/projects/fraymakers`, `/projects/choveigo` — project stories
- `/experience/living-in-silico`, `/experience/stush-patties` — experience stories
- `/profile`, `/profile/journey`, `/profile/demos` — Profile sections
- `/help` — Help entry (intended visible behavior: contextual overlay)
- `/resume` and `/resume/viewer` — resume flow and PDF viewer
- Known project or experience details without a dedicated route return to their section index. Unknown slugs and other unmatched paths show branded recovery.

## Active design status and documentation sync

The archive J `159:2` remains the temporary production fallback and quality standard, not final identity approval. The editable J is **ACTIVE RECONSTRUCTION / NEEDS REDESIGN**; Pass30 clearance is superseded and Pass46 direct macro comparison `3167:2` places the archive, Pass35 archive-contour vector, current reconstruction, and both upper-serif studies at equal scale with 54/32/16px proofs. Pass35 is the strongest editable integrated base to improve, while the archive remains the standard. No reconstruction is approved. Preserve the segmented Opening direction while the J is unresolved; website motion still needs sync. Profile keeps its approved composition, static lower signals, four equal Projects sectors, and separate hover overlays; finish the final project marks/assets without redesigning the base. Home keeps its architecture while icons, backgrounds, shell/materials, and implementation clarity remain open. Food Tracker is the flagship: preserve its owner-positive Pass10 first fold and retrieval story, finish the full long-form page, and use authentic product media for the next major visual lift when available. Preserve the owner-positive Stush Patties and Living in Silico directions and Fraymakers’ technical visual language. Cho’Veigo remains product-first; review its Recommendations demo scale, crop/framing, and whole-page architecture balance without shrinking it blindly. Continue improving Crest’s visual storytelling while preserving “One transaction. Two sources. Human review.” Public case-study copy is curated from, and distinct from, the factual source record.

The [implementation status](docs/IMPLEMENTATION_STATUS.md) is the active control ledger. After any meaningful owner/Figma decision, update it and the relevant decision/node/spec/source doc, supersede the stale direction, then commit and push a documentation-only change to `feat/portfolio-integration` before waiting for website implementation. Do not document transient pixel experiments as durable decisions.

See [design decisions](docs/DESIGN_DECISIONS.md), [Figma node map](docs/FIGMA_NODE_MAP.md), [implementation spec](docs/FIGMA_IMPLEMENTATION_SPEC.md), and [asset manifest](docs/ASSET_MANIFEST.md). Active Figma key `9zvk9iSRPKSsJ6llDJrQmA` was inspected on 2026-09-30, including Cho’Veigo’s opening and architecture section; case-study body screenshot crops remain limited to 938px. No site visual acceptance is claimed.

## Staging record

The latest recorded immutable deployment is [a988bec6.joshuaik2.pages.dev](https://a988bec6.joshuaik2.pages.dev/) (deployment `a988bec6-a939-4ba7-ac75-0d12d88a3622`), dated 2026-09-27 and built from application source `e5306ed`. Seven selected routes returned the shared 635-byte SPA shell, verifying hosting fallback only; client-side route rendering remains unverified. The favicon returned HTTP 200 as SVG (466 bytes), and the authorized v13 PDF returned HTTP 200 as PDF (164,726 bytes; SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`). The primary production project was not targeted.
