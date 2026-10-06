# Owner-review correction Preview — 2026-10-06

## Deployment

- Application source: **`6dcaf8ed1839e1b44cc36dee9338883c5c69e54e`**, branch `feat/portfolio-integration`.
- Immutable feature Preview: <https://977b240e.joshuaik2.pages.dev/>.
- Cloudflare deployment: `977b240e-f357-483a-abd4-3c7f2dd43f8b`, environment **Preview**, source `6dcaf8e`.
- The build came from a detached clean checkout of the source commit. Local untracked experiments and review files were excluded. Production was not targeted.

## Verification

- `npm test -- --run`: 175 tests passed across 25 files, both in the correction worktree and the clean source checkout.
- `npm run build`: TypeScript and Vite production build passed in the clean source checkout.
- `git diff --check`: passed before the application checkpoint.
- Installed Chrome checked all 18 direct application routes at 1440×900 and 390×844. All returned HTTP 200. No broken `<img>` resources, same-origin request failures, page errors, console errors, or horizontal document overflow were observed.
- Opening reached `/home` in about 4.0 seconds from navigation; Skip and reduced-motion handoffs reached `/home`.
- Home Experience selection and Confirm navigated to `/experience`. Resume Found opened over the originating Home at desktop and narrow widths; the Home underlay remained visible, `aria-hidden` and inert while active, and Escape restored Home. Profile began with its signal panel hidden and exposed it on keyboard focus. Crest opened and advanced in the embedded player while remaining on `/profile/demos`.
- These checks verify route/runtime usability, not owner acceptance, visual parity with every Figma frame, or cross-browser behavior.

Routes checked: `/home`, `/projects`, `/experience`, `/hackathons`, `/education`, `/education/projects`, `/profile`, `/profile/journey`, `/profile/highlights`, `/profile/demos`, `/projects/food-tracker`, `/projects/crest`, `/projects/fraymakers`, `/projects/choveigo`, `/experience/living-in-silico`, `/experience/stush-patties`, `/resume`, and `/resume/viewer`.

## Included owner-review work

- Current Opening choreography and v8-based feature-review formation, with the production/archive J policy unchanged.
- Home mode previews and utilities, category lobbies, identity fitting, Resume Found takeover, Profile, Journey, and Personal Highlights.
- Current Education route and Demos experience.
- Food Tracker, Cho’Veigo, Fraymakers, Living in Silico, and Stush received substantial additional story/layout revisions in this checkpoint. Crest’s existing expanded one-transaction → two-source → human-review sequence, separate system map, and policy retrieval chapter remain in the review build and were checked; Crest had no source delta in this app commit. All six remain open to the owner; passing tests and smoke checks do not establish story acceptance.

## Known limits

- Food Tracker has authentic stills but no current demo video. Cho’Veigo has an authentic Recommendations capture but no privacy-safe video available for this Preview. Crest’s embedded video plays in-page.
- Personal Highlights uses the owner’s strongest selected photos in this review build; two sensitive areas were masked. Other people remain recognizable, so public release consent is still a final owner check.
- Dental, Bookstore, and CMOS remain constrained by missing primary implementation artifacts; the ALU/FSM project uses verified source detail.
- Live screen-reader interaction remains manual. This Preview has not been through final owner visual review, cross-browser certification, or public-release review.
- J identity remains separate and unapproved. Sonnet v8 is used for the Opening feature-review implementation; archive `159:2` remains production fallback. Candidate 05 is not integrated.
- Full `npm audit` reports one high advisory for development-only `source-map-js@1.2.1`, reached through PostCSS/Vite. `npm audit --omit=dev` reports no production dependency advisories; the static Preview does not ship the development tool. This was recorded as repository maintenance and left outside the owner-directed UI/content correction.
