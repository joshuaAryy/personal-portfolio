# Joshua Aryeetey · Portfolio client

This Vite and React client contains project and experience indexes, six long-form stories, Profile, Journey, Demos, Help, resume, and recovery routes. Design and implementation are converging continuously: stable structure and interaction move into React, then the rendered site is compared with Figma and corrected. Route coverage, tests, build status, and hosting fallback do not establish visual completion. The latest recorded immutable staging deployment uses application source `e5306ed`; current rendered parity is still being reviewed. Its HTTP 200 route checks confirmed hosting fallback only, not client-side rendering.

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

The J decision is closed: archive `159:2` is selected for Opening and Resume Found. The single archive-faithful reconstruction and one correction were compared with the archive/current/upper-serif studies at large and 54/32/16px; candidate `3289:31` remained weaker in integrated silhouette, energy, and material, so the archive ships and J design will not reopen. Small contexts use optical glyphs: 54px and responsive 32px header, exact 48px rail clone `3317:4`, and native 16px favicon. The authentic large source is 220×220; the 700px Figma export is an upscale used for display density, so rendered softness still needs site comparison. The segmented Hextech Opening is implemented with restrained opposing ring motion, a roughly two-second sequence, Skip, and near-instant reduced motion; Figma-to-site comparison remains open.

Preserve Home's existing architecture while final icon, background, shell/material, spacing, and no-overflow details converge. Preserve Profile `960:2`, its four equal Projects sectors, static lower signals, and separate hover/focus overlays; the four-state strip `3285:45` is review-only. Six complete long-form case-study review frames are indexed in [the node map](docs/FIGMA_NODE_MAP.md), paired with 1920×1080 scrolling production frames. Keep Food Tracker's owner-positive product/retrieval opening and use authentic product media for its next major visual uplift. Preserve the strong Stush Patties, Living in Silico, and Fraymakers directions. Cho'Veigo is product-first; its full-page Figma balance review found no material imbalance, so keep current demo scale/crop and compare the rendered site. Preserve Crest's product-first workflow, “One transaction. Two sources. Human review.” Public case-study copy is curated from, and distinct from, the factual source record.

The [implementation status](docs/IMPLEMENTATION_STATUS.md) is the active control ledger. After any meaningful owner/Figma decision, update it and the relevant decision/node/spec/source doc, supersede stale direction, then commit and push a documentation-only change to `feat/portfolio-integration` without waiting for website implementation. Implementation may begin when structure, content hierarchy, and interaction intent are stable; final acceptance follows render → compare → correct → owner review. Do not document transient pixel experiments as durable decisions.

See [design decisions](docs/DESIGN_DECISIONS.md), [Figma node map](docs/FIGMA_NODE_MAP.md), [implementation spec](docs/FIGMA_IMPLEMENTATION_SPEC.md), and [asset manifest](docs/ASSET_MANIFEST.md). Active Figma key `9zvk9iSRPKSsJ6llDJrQmA` was inspected on 2026-09-30. Source-body screenshot exports crop at 938px, so the six separate full-page review frames and Profile state strip provide the owner-visible review surfaces. No portfolio-wide site visual acceptance is claimed.

## Staging record

The latest recorded immutable deployment is [a988bec6.joshuaik2.pages.dev](https://a988bec6.joshuaik2.pages.dev/) (deployment `a988bec6-a939-4ba7-ac75-0d12d88a3622`), dated 2026-09-27 and built from application source `e5306ed`. Seven selected routes returned the shared 635-byte SPA shell, verifying hosting fallback only; client-side route rendering remains unverified. The favicon returned HTTP 200 as SVG (466 bytes), and the authorized v13 PDF returned HTTP 200 as PDF (164,726 bytes; SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`). The primary production project was not targeted.
