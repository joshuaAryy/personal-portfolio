# Implementation status

Source Figma file: [Portfolio design](https://www.figma.com/design/9zvk9iSRPKSsJ6llDJrQmA). Node IDs and geometry are from the local 2026-09-25 handoff. This table describes the code at this commit, not the status of the Figma design.

| Surface | Figma root | Route | Code state | Remaining visual or content work |
|---|---:|---|---|---|
| Shared shell and rail | 524:4, 524:145 | All | Initial responsive implementation | Canonical J; original rail identity; finer ornament and art replacement |
| Projects lobby | 511:2 | `/projects` | Initial implementation; project selection and links work | Original scenic artwork; precise card contours, marks and lower tray polish |
| Experience lobby | 704:2 | `/experience` | Initial implementation; selection and links work | Review-candidate details; original scenic artwork and identity marks |
| Profile Overview | 960:2 | `/profile` | Initial structure and factual content | Owner portrait, original identity banner, material polish and precise Figma matching |
| Demos · Food | 1316:35 | `/profile/demos` | Selectable; owner-approved mark still | Final player and selector visual polish; authentic Food app UI still pending owner |
| Demos · Crest | 1316:4534 | `/profile/demos` | Selectable; owner-cleared sample capture and YouTube link | Compare bundled capture crop to exact Figma still |
| Demos · Cho’Veigo | 1298:2 | `/profile/demos` | Selectable; owner-cleared static Recommendations still | Compare bundled crop to exact Figma still |
| Project detail roots | 1813:2, 1817:4, 1813:379, 1831:2 | `/projects/food-tracker`, `/projects/crest`, `/projects/choveigo`, `/projects/fraymakers` | Stable routes with explicit deferred stories | Port approved editorial stories and source media as each clears public assets |
| Experience details | 1438:2, 1438:276 | `/experience/living-in-silico`, `/experience/stush-patties` | Stable routes with explicit deferred stories | Port long form stories; verify public marks and media |
| Journey | 1287:7 | — | Deferred | Complete full length environmental treatment in Figma, then port |
| Personal Highlights | — | — | Deferred | Owner photo set and final composition |
| Canonical J / opening | — | — | Deferred | Identity vector and motion design pending |
| Resume Found / viewer | — | — | Deferred | Current approved design and resume file pending |

## Public asset record

| Bundled file | Local source handoff | Use |
|---|---|---|
| `public/media/food-tracker-mark.png` | `exploration-assets/food-demo-logo-raw.png` | Static Food Demos still and thumbnail |
| `public/media/crest-sample.png` | `exploration-assets/crest-capture-qa-20260925.png` | Owner-cleared sample capture; sample cue and public YouTube link |
| `public/media/choveigo-recommendations.png` | `exploration-assets/choveigo-recommendations-poster.png` | Owner-cleared static Recommendations still |

No local source handoff docs or old portfolio files are copied into this repository.

## Staging

The initial shell was deployed to the separate Cloudflare Pages project at https://joshuaik2.pages.dev/ on 2026-09-26. The deployment also returned the immutable preview URL https://c8918e26.joshuaik2.pages.dev/. Root and `/profile/demos` returned HTTP 200 after upload. This project is separate from the existing primary portfolio deployment.
