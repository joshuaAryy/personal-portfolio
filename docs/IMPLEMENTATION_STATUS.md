# Implementation status

Updated 2026-09-27. This file separates design readiness from website implementation and browser review.

| Surface | Figma root | Route | Current state | Remaining work |
|---|---:|---|---|---|
| Shared shell and rail | 524:4, 524:145 | All | Responsive shell, route-change main focus, semantic navigation, and canonical inline J in the brand and owner cards | Browser review at desktop and narrow sizes; confirm selected/hover contrast and rail details |
| Projects lobby | 511:2 | `/projects` | Selectable lobby with explicit case-study availability and source links only when present. Figma medallions for Fraymakers, Crest, and Cho’Veigo now use portfolio-owned F, C, and CV index glyphs instead of repeated Food Tracker placeholders; the public site uses F, C, FT, and CV glyphs where marks are not cleared. These are not official project logos. | Browser visual/keyboard/responsive review; original scenic art remains open |
| Experience lobby | 704:2 | `/experience` | Selectable lobby; unfinished stories do not open placeholder pages. Figma review confirmed the five-card geometry, selected tray, role legend, and CTA hierarchy; selected Living in Silico facts match the source handoff. | Browser visual/keyboard/responsive review |
| Profile Overview | 960:2 | `/profile` | Overview content is extracted to `src/ProfileOverview.tsx`; project entries use an original beveled enclosure, route-local summaries, and original signal medallions. The identity rail still uses initials because no portrait is available. | Browser visual/keyboard review; compare against the approved frame; real portrait and any project-owned marks remain separate inputs |
| Demos · Crest | 1316:4534 | `/profile/demos` | Selectable, owner-cleared sample capture with sample-data context | Browser review of the crop and player treatment |
| Demos · Cho’Veigo | 1298:2 | `/profile/demos` | Selectable, owner-cleared static Recommendations capture | Browser review of the crop and selector treatment |
| Demos · Food Tracker | 1316:35 | — | Withheld; no authentic current-build capture is available and public mark reuse is unconfirmed | Owner-provided product capture and publication confirmation |
| Help guide | 2014:11 | `/help` | Responsive route in `src/Help.tsx`; reachable from the rail and narrow header; includes the live Journey route | Browser keyboard/responsive review and rail-footer contrast review |
| 404 recovery | 2014:94 | `*` fallback | Branded recovery in `src/NotFoundContent.tsx`; links to current lobbies and Profile | Browser review; client-side fallback does not guarantee an HTTP 404 response |
| Shared utility states | 2014:151; 2014:2 | Context-dependent | Typed empty/unavailable states in `src/UtilityState.tsx`; offline state is not asserted by default and no automatic retry is promised | Apply only when a real route state requires it; review in browser |
| Food Tracker case study | 1813:2 | `/projects/food-tracker` | Route composition in `src/project-pages/FoodTrackerPage.tsx`; story in `src/FoodTrackerCaseStudy.tsx`; trust-first story, five-stage product anatomy, and search decision plate showing deterministic, fuzzy, and semantic candidates flowing through a deterministic evaluator; benchmark values retain their source and scale-only context | Temporary full-body preview confirmed the lower anatomy, iteration, boundaries, workflow, and Reflection spacing; browser visual/keyboard review remains open |
| Crest | 1817:4 | `/projects/crest` | Route composition in `src/project-pages/CrestPage.tsx`; story in `src/CrestCaseStudy.tsx`; quieter separators match the reviewed Figma treatment; sample capture is owner-cleared | Browser visual/keyboard review; keep the Crest logo out of public code until publication rights are confirmed |
| Cho’Veigo | 1813:379 | `/projects/choveigo` | Evidence worksheet distinguishes Fit, Eligibility, and Recommendation; the owner-cleared static Recommendations capture now has an adjacent disclosure that its strength labels are unvalidated; no playable video is implied | Browser visual/keyboard review remains open. No role-specific evaluation record is available, so the visible strength labels stay qualified and must not be re-scored or given an invented rationale |
| Fraymakers | 1831:2 | `/projects/fraymakers` | Responsive, asset-free editorial route with explicit project ownership boundaries. The Figma lower panel now shows match/YAML and visual-layer categories flowing through thumbnail assembly to a 1280 × 720 PNG and VOD use; it adds no client art and does not imply automatic upload | Browser visual/keyboard review; authentic thumbnails, VOD/config samples, and third-party asset rights remain deferred |
| Living in Silico | 1438:2 | `/experience/living-in-silico` | Responsive research story with separate DeepMol output and REINVENT4 attempt/outcome records; 500 generated SMILES samples are attributed to DeepMol; method details are labeled contextual, with a visible note that run artifacts cannot verify how they relate to the 500 samples; the REINVENT4 record states that successful generation was not achieved | Research cards were reviewed in a temporary preview; full lower-page and browser visual/keyboard review remain open; logo rights, run artifacts, and dataset provenance remain separate evidence inputs |
| Stush Patties | 1438:276 | `/experience/stush-patties` | Responsive story; Figma schematic `1992:2` shows the Koyo-only `input → temporary position-and-cell parser exception → normalized reporting handoff` sequence, and the unconfirmed graphic mark has been removed from the hero. The website uses a source-safe Koyo note; no client rows, field names, private filenames, or sample values are included. | Browser visual/keyboard review; lower-story Figma render is clipped; supplied sources contain no field-level Koyo example |
| Journey | 1287:7 | `/profile/journey` | Full 1600 px story implemented in `src/JourneyCase.tsx`; eight beats and five waypoints; locator follows the shared 35% reading line, reflows below 900 px, the Figma root shows LiS selected consistently, and the “MORE BELOW ↓” cue was retuned and rechecked at native size with no visible clipping or connector overlap | Browser visual/live keyboard review. The color field continues through the full canvas; source texture fades near the first fold |
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
| Last immutable deployment | `https://70e43caa.joshuaik2.pages.dev/` (deployment `70e43caa-fff1-4857-9b13-1ae7942786da`; source metadata `34717fe`) |

The current integration is committed on public-repository branch `feat/portfolio-integration` and was uploaded to the separate `joshuaik2` staging project. Wrangler identifies deployment `70e43caa-fff1-4857-9b13-1ae7942786da` as Production on the staging project's configured branch label, `feat/initial-client-shell`; its source metadata and application implementation commit are `34717fe`. The Cloudflare branch label selects the staging project's production environment; the GitHub integration branch remains `feat/portfolio-integration`. The homepage, all explicit portfolio routes, JavaScript, and CSS on the immutable deployment returned HTTP 200; `/experience/living-in-silico` and `/resume/viewer` on the staging alias also returned HTTP 200. The v13 PDF on both the immutable deployment and staging alias returned HTTP 200 with 164,726 bytes and SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`, matching the approved workspace source. The primary portfolio project was not targeted.

## Current validation

`npm run typecheck`, `npm run lint`, `npm run build` (including TypeScript compilation), and `git diff --check` passed on the current code changes. Deployment HTTP checks confirmed the fixed routes, built JS/CSS, and exact v13 PDF hash. The in-app browser had no available browser surface, so live keyboard behavior, responsive rendering, reduced-motion behavior, and native PDF browser behavior have not been independently reviewed. No unit tests were run after the current integration changes.
