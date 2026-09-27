# Joshua Aryeetey · Portfolio client

This Vite and React client contains project and experience indexes, six long-form stories, Profile, Journey, Demos, Help, resume, and recovery routes. The latest immutable staging deployment uses application source `e5306ed`; live browser review remains pending. Its HTTP 200 route checks confirmed hosting fallback only, not client-side rendering.

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
- Known project or experience details without a dedicated route return to their section index. Unknown slugs and other unmatched paths show branded recovery.

## Assets and staging

The canonical inline J and owner portrait are already in the source and bundle. The approved monochrome J is also linked as the favicon. The owner-cleared Crest sample capture and Cho’Veigo Recommendations still are bundled. The Food Tracker demo remains withheld; marks without confirmed public-use rights and original scenic art remain deferred.

The separate staging site is [joshuaik2.pages.dev](https://joshuaik2.pages.dev/). Its latest immutable deployment is [a988bec6.joshuaik2.pages.dev](https://a988bec6.joshuaik2.pages.dev/) (deployment `a988bec6-a939-4ba7-ac75-0d12d88a3622`), dated 2026-09-27 and built from application source `e5306ed`. Seven selected routes returned the shared 635-byte SPA shell, verifying hosting fallback only; client-side route rendering remains unverified. The favicon returns HTTP 200 as image/svg+xml (466 bytes). The authorized v13 PDF returns HTTP 200 as application/pdf, 164,726 bytes, with SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`. The primary production project was not targeted.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/IMPLEMENTATION_STATUS.md](docs/IMPLEMENTATION_STATUS.md), and [docs/ASSET_MANIFEST.md](docs/ASSET_MANIFEST.md) for implementation, review, deployment, and asset details.
