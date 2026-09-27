# Joshua Aryeetey · Portfolio client

The public implementation of Joshua's portfolio includes the client shell, project and experience lobbies, a structural Profile Overview, and the Food Tracker, Crest, and Cho’Veigo editorial case studies. Cho’Veigo is deployed to the separate staging site at https://joshuaik2.pages.dev/projects/choveigo. Profile Overview has not passed visual fidelity review. Fraymakers and the Experience stories remain in development and their reserved URLs return to the matching lobby. Food Tracker Demos remain unpublished while logo rights and an authentic product capture are unresolved.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Direct route loads are handled by the Vite fallback.

Run `npm run deploy` to build and deploy the staging branch to Cloudflare Pages. The deployment script pins Wrangler to `4.141.0`. The `public/_redirects` file enables direct loading of client routes on Pages.

## Checks

```sh
npm run lint
npm run typecheck
npm test -- --run
npm run build
```

## Routes

- `/projects` — project selection lobby
- `/projects/food-tracker` — Food Tracker editorial case study
- `/projects/choveigo` — Cho’Veigo editorial case study (deployed to staging)
- `/experience` — experience selection lobby
- `/profile` — Profile Overview
- `/profile/demos` — Crest and Cho’Veigo stills; Food Tracker is withheld pending its authentic capture and mark clearance
- `/projects/fraymakers` and other unfinished detail paths — reserved paths return to their lobby until the matching story is ready

`docs/ARCHITECTURE.md` describes the small client structure. `docs/IMPLEMENTATION_STATUS.md` maps routes to Figma nodes and current readiness.

## Public assets

Only the Crest sample capture and Cho’Veigo Recommendations still are bundled in this client, both matching the owner-cleared source handoff. The Food Tracker logo is omitted while public embedding rights remain unconfirmed. No Riot or CommunityDragon artwork or marks are bundled. The scene and shell separators are CSS. The canonical portfolio J, portrait, and unresolved scenic images remain deferred. The font styles currently load League Spartan and Cinzel through Google Fonts; the fallback stack keeps the site readable offline.
