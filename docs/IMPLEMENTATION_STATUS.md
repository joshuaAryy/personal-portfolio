# Implementation status

Updated 2026-09-27. This file separates design readiness from website implementation and browser review.

| Surface | Figma root | Route | Current state | Remaining work |
|---|---:|---|---|---|
| Shared shell and rail | 524:4, 524:145 | All | Responsive shell, route-change main focus, semantic navigation, and canonical inline J in the brand and owner cards | Browser review at desktop and narrow sizes; confirm selected/hover contrast and rail details |
| Projects lobby | 511:2 | `/projects` | Selectable lobby with explicit case-study availability and source links only when present | Compare card geometry and lower tray against the reference; original scenic art remains open |
| Experience lobby | 704:2 | `/experience` | Selectable lobby; unfinished stories do not open placeholder pages | Compare card geometry and lower tray against the reference |
| Profile Overview | 960:2 | `/profile` | Overview content is extracted to `src/ProfileOverview.tsx`; project entries use an original beveled enclosure, route-local summaries, and original signal medallions. The identity rail still uses initials because no portrait is available. | Browser visual/keyboard review; compare against the approved frame; real portrait and any project-owned marks remain separate inputs |
| Demos · Crest | 1316:4534 | `/profile/demos` | Selectable, owner-cleared sample capture with sample-data context | Browser review of the crop and player treatment |
| Demos · Cho’Veigo | 1298:2 | `/profile/demos` | Selectable, owner-cleared static Recommendations capture | Browser review of the crop and selector treatment |
| Demos · Food Tracker | 1316:35 | — | Withheld; no authentic current-build capture is available and public mark reuse is unconfirmed | Owner-provided product capture and publication confirmation |
| Help guide | 2014:11 | `/help` | Responsive route in `src/Help.tsx`; reachable from the rail and narrow header; includes the live Journey route | Browser keyboard/responsive review and rail-footer contrast review |
| 404 recovery | 2014:94 | `*` fallback | Branded recovery in `src/NotFoundContent.tsx`; links to current lobbies and Profile | Browser review; client-side fallback does not guarantee an HTTP 404 response |
| Shared utility states | 2014:151; 2014:2 | Context-dependent | Typed empty/unavailable states in `src/UtilityState.tsx`; offline state is not asserted by default and no automatic retry is promised | Apply only when a real route state requires it; review in browser |
| Food Tracker case study | 1813:2 | `/projects/food-tracker` | Extracted responsive route in `src/FoodTrackerCaseStudy.tsx`; trust-first story and five-stage product anatomy; benchmark values retain their source and scale-only context | Browser visual/keyboard review |
| Crest | 1817:4 | `/projects/crest` | Extracted route in `src/CrestCaseStudy.tsx`; quieter separators match the reviewed Figma treatment; sample capture is owner-cleared | Browser visual/keyboard review; keep the Crest logo out of public code until publication rights are confirmed |
| Cho’Veigo | 1813:379 | `/projects/choveigo` | Evidence worksheet distinguishes Fit, Eligibility, and Recommendation; static Recommendations capture remains owner-cleared; no playable video is implied | Browser visual/keyboard review; stage the current worksheet before treating the deployed route as current |
| Fraymakers | 1831:2 | `/projects/fraymakers` | Responsive, asset-free editorial route with a warm pipeline figure and explicit project ownership boundaries | Browser visual/keyboard review; authentic thumbnails, VOD/config samples, and third-party asset rights remain deferred |
| Living in Silico | 1438:2 | `/experience/living-in-silico` | Responsive text/vector story with a Method / Attempt / Outcome record; 500 generated SMILES samples are attributed to DeepMol; no successful REINVENT4 result is claimed | Browser visual/keyboard review; logo rights, run artifacts, and dataset provenance remain separate evidence inputs |
| Stush Patties | 1438:276 | `/experience/stush-patties` | Responsive story and distributor-normalization schematic; no client rows or private filenames are included | Browser visual/keyboard review; confirm mark rights before any logo is used |
| Journey | 1287:7 | `/profile/journey` | Full 1600 px story implemented in `src/JourneyCase.tsx`; eight beats and five waypoints; locator follows the shared 35% reading line, reflows below 900 px, and the Figma root now shows LiS selected consistently | Browser visual/live keyboard review. The color field continues through the full canvas; source texture fades near the first fold |
| Personal Highlights | — | — | Disabled/deferred | Owner photo set and separate content instruction |
| J identity study | 1950:2; vector 1950:6; monochrome 1950:40 | Shared shell / opening | Canonical vector accepted after Luna critique and one Sol convergence decision. Glyph ratio is 0.8315; the code in `src/identity/JMark.tsx` matches the narrower Figma silhouette. Ringed 54/32 px and ring-free 16 px variants passed source review. | Browser contrast and placement review in the website shell |
| Opening sequence | 2025:2; notes 2025:84 | `/` then `/projects` | One-shot two-second intro, visible 48 px Skip action, canonical J, and reduced-motion handoff at 120 ms | Browser visual, keyboard, reduced-motion, and timing review |
| Resume Found and PDF viewer | 69:304; 69:439 | `/resume`; `/resume/viewer` | Implemented in `src/ResumeFlow.tsx` with the exact owner-authorized General Resume v13 PDF. Found, viewer, download, and fullscreen/open actions target the same bundled asset. | Browser visual/keyboard/responsive review; verify native PDF behavior in target browsers |

The six long-form project and experience stories already use their documented full body heights. Further design work should improve distinct figures and page treatments rather than extend those story bodies again.

## Public assets

| Bundled file | Public use |
|---|---|
| `public/media/crest-sample.png` | Owner-cleared sample capture with sample-data context |
| `public/media/choveigo-recommendations.png` | Owner-cleared static Recommendations still |
| `public/resume/Joshua_Aryeetey_General_Resume_v13.pdf` | Canonical general resume supplied and authorized for public use; SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299` |

Food Tracker media and project marks without confirmed publication rights are not bundled. No uncleared Riot or CommunityDragon artwork is bundled.

## Staging

| Destination | Current record |
|---|---|
| Public repository | `https://github.com/joshuaAryy/personal-portfolio` |
| Last deployed branch | `feat/initial-client-shell` |
| Staging site | `https://joshuaik2.pages.dev/` |
| Last immutable deployment | `https://1b3c7a8d.joshuaik2.pages.dev/` (deployment `1b3c7a8d-46ee-4576-8a6c-a480ab3a5a3e`; source metadata `5c2d5cc`) |

The current integration was uploaded from the clean, committed `feat/canonical-j-opening` worktree to the separate `joshuaik2` staging project. Wrangler identifies deployment `1b3c7a8d-46ee-4576-8a6c-a480ab3a5a3e` as Production on the staging project’s configured branch, `feat/initial-client-shell`; source metadata is `5c2d5cc`, with app code at `45e0c60`. The staging root and six tested client routes returned HTTP 200, and the bundled JavaScript and CSS also returned HTTP 200. The v13 PDF served from the staging alias has the same SHA-256 as the owner-supplied asset. The primary portfolio project was not targeted.

## Current validation

`npm run lint`, `npm run build` (including TypeScript compilation), and `git diff --check` pass on the current worktree. The in-app browser had no available browser surface, so screenshots, live keyboard behavior, responsive rendering, reduced-motion behavior, and native PDF browser behavior have not been independently reviewed. No unit tests were run after the current integration changes.
