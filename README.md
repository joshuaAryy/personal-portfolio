# Joshua Aryeetey · Portfolio client

This Vite and React client contains project and experience indexes, six long-form stories, Profile, Journey, Demos, Help, resume, and recovery routes. Implementation is in place, while visual and browser review remains pending. The latest immutable staging deployment predates the current source updates; its HTTP 200 route checks confirmed hosting fallback only, not client-side rendering.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Direct route loads are handled by the Vite fallback.

`npm run deploy` builds and deploys to the separate `joshuaik2` Cloudflare Pages staging project, using Wrangler `4.141.0`. The `public/_redirects` file enables direct loading of client routes on Pages.

## Checks

```sh
npm run lint
npm run typecheck
npm test -- --run
npm run build
```

## Routes

- `/` — opening sequence and Projects
- `/projects` and `/experience` — project and experience indexes
- `/projects/food-tracker`, `/projects/crest`, `/projects/fraymakers`, `/projects/choveigo` — project stories
- `/experience/living-in-silico`, `/experience/stush-patties` — experience stories
- `/profile`, `/profile/journey`, `/profile/demos` — Profile sections
- `/help` — help guide
- `/resume` and `/resume/viewer` — resume flow and PDF viewer
- Unmatched paths show branded recovery; unfinished project and experience slugs return to their respective indexes.

## Assets and staging

The canonical inline J and owner portrait are already in the source and bundle. The approved monochrome J is also linked as the favicon. The owner-cleared Crest sample capture and Cho’Veigo Recommendations still are bundled. The Food Tracker demo remains withheld; marks without confirmed public-use rights and original scenic art remain deferred.

The separate staging site is [joshuaik2.pages.dev](https://joshuaik2.pages.dev/). Its latest immutable deployment is [ce8b0f14.joshuaik2.pages.dev](https://ce8b0f14.joshuaik2.pages.dev/), dated 2026-09-27 and built from application source `2f8ae63`. This deployment predates current uncommitted fixes. The documented HTTP 200 route checks returned the shared SPA shell and verify hosting fallback only; client-side route rendering has not been browser-verified. The primary production project was not targeted.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/IMPLEMENTATION_STATUS.md](docs/IMPLEMENTATION_STATUS.md), and [docs/ASSET_MANIFEST.md](docs/ASSET_MANIFEST.md) for implementation, review, deployment, and asset details.
