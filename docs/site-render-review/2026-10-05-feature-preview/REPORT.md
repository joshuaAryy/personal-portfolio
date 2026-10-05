# Owner-review feature Preview - 2026-10-05

## Deployment

- Cloudflare Pages project: `joshuaik2` (feature/staging Preview)
- Branch: `feat/portfolio-integration`
- Deployed branch snapshot: `b53bfdb843feb699d17b129527f58f18c720d0a1`
- Latest application-code commit: `e9019afe23b9b10235ca9abbab54de1ab756af6`; deployed application files match this commit, with later branch commits containing documentation changes.
- Immutable Preview: https://db07fba4.joshuaik2.pages.dev/
- Branch alias: https://feat-portfolio-integration.joshuaik2.pages.dev/
- Deployment ID: `db07fba4-59b3-48f5-8fcf-36971bf7ad0a`
- Wrangler verified the deployment environment as **Preview** on `feat/portfolio-integration`. The older `c96f4db` deployment remains a prior Preview. Production was not targeted.
- `npm run deploy` completed the TypeScript/Vite production build and deployed `dist`.

## Smoke verification

Playwright with installed Chrome 153 checked 20 direct routes at desktop 1920x1080 and narrow 390x844: 40 route/viewport loads. The 20 routes were `/`, `/home`, `/projects`, `/experience`, `/hackathons`, `/education`, `/education/projects`, `/help`, `/profile`, `/resume`, `/resume/viewer`, `/profile/journey`, `/profile/demos`, `/profile/highlights`, `/projects/food-tracker`, `/projects/crest`, `/projects/fraymakers`, `/projects/choveigo`, `/experience/living-in-silico`, and `/experience/stush-patties`.

- No failed route documents or page errors
- No broken images or failed same-origin assets
- No horizontal overflow at either viewport
- Branch alias returned HTTP 200 for `/`, `/projects/food-tracker`, and `/education/projects`
- Representative screenshots were visually inspected for Home and Food Tracker at desktop/narrow sizes, Education projects at desktop, and Personal Highlights at narrow size; no obvious broken assets or deployment regression was found.

This is a usability/deployment smoke check, not owner visual acceptance or a claim of pixel parity.

## Owner review notes

- J identity is a separate review lane. The site retains archive J `159:2` as the production fallback; no candidate was integrated.
- Food Tracker has authentic product stills; its real demo remains pending. Cho'Veigo is represented by the safe static Recommendations capture while a privacy-safe video remains pending. Crest demo remains playable.
- Education includes verified ALU/FSM source detail. Dental, Bookstore, and CMOS remain evidence-pending for further owner-source reconciliation; their current wording avoids unsupported implementation claims.
- Live screen-reader interaction remains a manual follow-up. Browser automation does not substitute for it.
- Owner review remains open; this Preview is ready for that review.
