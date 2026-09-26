# Joshua Aryeetey · Portfolio client

The public implementation of Joshua's portfolio includes the client shell, project and experience lobbies, a structural Profile Overview, the complete Food Tracker case study, and two Demos states with cleared stills. Profile Overview has not passed visual fidelity review. The other project and experience stories remain in development and their reserved URLs return to the matching lobby. The Food Tracker logo and demo remain unpublished while logo rights and an authentic product capture are unresolved.

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
npm run build
```

## Routes

- `/projects` — project selection lobby
- `/projects/food-tracker` — Food Tracker editorial case study
- `/experience` — experience selection lobby
- `/profile` — Profile Overview
- `/profile/demos` — Crest and Cho’Veigo stills; Food Tracker is withheld pending its authentic capture and mark clearance
- Other `/projects/:slug` and `/experience/:slug` paths — reserved paths return to their lobby until the matching story is ready

`docs/ARCHITECTURE.md` describes the small client structure. `docs/IMPLEMENTATION_STATUS.md` maps routes to Figma nodes and current readiness.

## Public assets

Only the Crest sample capture and Cho’Veigo Recommendations still are bundled in this client, both matching the owner-cleared source handoff. The Food Tracker logo is omitted while public embedding rights remain unconfirmed. No Riot or CommunityDragon artwork or marks are bundled. The scene and shell separators are CSS. The canonical portfolio J, portrait, and unresolved scenic images remain deferred. The font styles currently load League Spartan and Cinzel through Google Fonts; the fallback stack keeps the site readable offline.
