# Implementation status

Source Figma file: [Portfolio design](https://www.figma.com/design/9zvk9iSRPKSsJ6llDJrQmA). Node IDs and geometry are from the local 2026-09-25 handoff, with the identity candidate and Crest final story added on 2026-09-26. This table distinguishes code implementation from visual approval.

| Surface | Figma root | Route | Current state | Remaining work |
|---|---:|---|---|---|
| Shared shell and rail | 524:4, 524:145 | All | Initial responsive implementation; rail follows the documented project order; route changes focus main content | Review shell against source at desktop/mobile; canonical J and original rail identity |
| Projects lobby | 511:2 | `/projects` | Selectable lobby; case study status is explicit; public repository links appear only when available | Original scenic art; compare card geometry and lower tray against source |
| Experience lobby | 704:2 | `/experience` | Selectable lobby; unfinished stories do not open placeholder pages | Original scenic art; compare card geometry and lower tray against source |
| Profile Overview | 960:2 | `/profile` | Structural stand-in; not visually reviewed as a Figma translation | Replace the generic banner, portrait, and grid with an original rights-safe composition; compare against the approved frame |
| Demos · Crest | 1316:4534 | `/profile/demos` | Selectable; cleared sample capture and public demo link | Compare bundled crop and player treatment to the Figma still |
| Demos · Cho’Veigo | 1298:2 | `/profile/demos` | Selectable; cleared static Recommendations still | Compare bundled crop and selector treatment to the Figma still |
| Demos · Food Tracker | 1316:35 | — | Withheld from public showcase | Owner confirmation of logo embedding rights and authentic product UI capture |
| Food Tracker case study | 1813:2 | `/projects/food-tracker` | Implemented as a responsive editorial story; chapter links follow scroll position; benchmark uses development and holdout tables | Browser visual/keyboard review; compare responsive page against approved source |
| Crest | 1817:4 | `/projects/crest` | Responsive editorial story implemented and deployed; grounded-policy decision figure, sample-data cue, and supported third-place result | Browser visual/keyboard review against the approved source; keep the Crest logo out of public code until its embedding rights are confirmed |
| Cho’Veigo, Fraymakers | 1813:379, 1831:2 | Reserved paths redirect to `/projects` | No public placeholder story screens | Complete their design gates, then implement the full editorial stories with distinct evidence figures |
| Experience story roots | 1438:2, 1438:276 | Reserved paths redirect to `/experience` | No public placeholder story screen | Design and implement the Living in Silico and Stush Patties editorial stories |
| Journey | 1287:7 | — | Figma source has full story content and viewport work; full scenic implementation remains deferred | Finish environmental treatment and port the full vertical story |
| Personal Highlights | — | — | Deferred | Owner photo set and final composition |
| J identity study | 1950:2 | — | Review candidate only; first-party editable vector geometry, not canonical | Iterate silhouette and small-size clarity; do not ship as the final mark yet |
| Opening sequence | — | — | Deferred | Final identity asset, timing, skip treatment, and reduced-motion review |
| Resume Found and PDF viewer | Archived roots 69:304, 69:439 | — | Archived exploratory work only | Approved current design and resume file; replace placeholder page with real authorized PDF |

The Figma body fills for all six existing long-form project and experience chapters already span their full documented story heights. Further visual work should focus on the distinct case-study figures and page treatments rather than extending those fills again.

## Public assets

| Bundled file | Local source handoff | Use |
|---|---|---|
| `public/media/crest-sample.png` | `exploration-assets/crest-capture-qa-20260925.png` | Cleared sample capture with sample-data cue and public YouTube link |
| `public/media/choveigo-recommendations.png` | `exploration-assets/choveigo-recommendations-poster.png` | Cleared static Recommendations still |

The Food Tracker mark is not bundled while public embedding rights are confirmed. No Riot or CommunityDragon artwork, marks, or owner-only video are in this repository.

## Staging

| Destination | Link |
|---|---|
| Public repository | `https://github.com/joshuaAryy/personal-portfolio` |
| Branch | `feat/initial-client-shell` |
| Staging site | https://joshuaik2.pages.dev/ |
| Current immutable deployment | https://dd7e6a7a.joshuaik2.pages.dev/ |

The staging project is separate from the existing primary portfolio deployment. HTTP HEAD requests returned 200 for the lobby root, the Food Tracker route, the Crest route, and the immutable Crest deployment URL. The browser-control runtime was unavailable, so browser screenshots and live keyboard behavior could not be independently reviewed here.

## Source-review corrections in the working tree

- Lobby cards reflow to three columns at tablet widths; the 651–900 px five-column squeeze is removed.
- Lobby and rail no longer lead into generic story placeholders. Unfinished detail URLs return to their matching lobby, while Food Tracker opens its implemented case study.
- Food Tracker’s mark is removed from `public/media`; only cleared Crest and Cho’Veigo media remain bundled.
- The skip-link target is focusable, route changes focus the main content, and rail project order matches the Figma rail.
- The Profile Overview remains a structural stand-in pending a rights-safe composition and visual fidelity review.

`npm run lint`, `npm run typecheck`, and `npm run build` pass for the Food Tracker and Crest implementations. Both feature routes are deployed to the separate staging project. Browser-based visual and live keyboard review remains outstanding because the browser-control runtime was unavailable.

No local source handoff docs or old portfolio files are copied into this repository.
