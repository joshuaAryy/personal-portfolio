# Joshua Aryeetey · Portfolio client

The first public implementation slice of Joshua's portfolio. It translates the approved Figma client shell, Projects lobby, Profile Overview, and the reviewed Experience and Demos states. Some identity and scene artwork remains deferred while original vectors and publication rights are resolved.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Direct route loads are handled by the Vite fallback.

The Cloudflare Pages static deployment command is `npm run build && npx wrangler pages deploy dist --project-name joshuaik2 --branch feat/initial-client-shell`. The `public/_redirects` file enables direct loading of client routes on Pages.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

## Routes

- `/projects` — project selection lobby
- `/experience` — experience selection lobby
- `/profile` — Profile Overview
- `/profile/demos` — three reviewed Demos states
- `/projects/:slug` and `/experience/:slug` — stable paths with visible deferred-story screens until each long form story is implemented

`docs/ARCHITECTURE.md` describes the small client structure. `docs/IMPLEMENTATION_STATUS.md` maps routes to Figma nodes and current readiness.

## Public assets

The bundled Food Tracker mark, Crest sample capture, and Cho’Veigo Recommendations still are owner-cleared portfolio media recorded in the source handoff. No Riot or CommunityDragon artwork or marks are bundled. The scene and shell separators are CSS. The canonical portfolio J, portrait, and unresolved scenic images remain deferred. The font styles currently load League Spartan and Cinzel through Google Fonts; the fallback stack keeps the site readable offline.
