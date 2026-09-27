# Figma implementation summary

This page summarizes the current design-to-code relationship for the portfolio. Figma readiness, website implementation, staging, and browser review are separate states; a design reference does not by itself confirm implementation or QA.

## Shared reference shell

The standard desktop reference is 1920 × 1080: an 82 px top shell, a 1560 × 998 central viewport, and a 360 × 998 activity rail. Detail stories scroll within the central viewport while the shell and rail remain outside that scroller. Responsive behavior is implemented on several routes; live browser review is still pending.

## Identity

The canonical first-party J is implemented as an inline vector and shared by the opening and site shell. Its glyph ratio is 0.8315. Source review accepted the ringed mark at 32 px and above, and the ring-free monochrome mark at 16 px. The opening adds the Figma 532 px registration circle and ticks, a +1.2° to 0° settle by 460 ms, and a 1.82–2.00 s crossfade to the Projects client. Browser contrast and placement review remain open.

## Motion and prototype notes

Figma Page 09 pairs the two-second opening timeline (`2025:84`) with the interaction ledger (`2176:2`). The opening settle at `2025:97` is +1.2° to 0°, matching the website source. The ledger documents only verified timing: Profile navigation uses 200 ms Smart Animate with Ease Out; Experience-story return links use a 200 ms Ease Out dissolve; Demos selector reactions are immediate; case-study chapter and Journey waypoint prototypes change selection state without scrolling the story; Resume frames have no wired route reaction. Website behavior and reduced-motion handling are detailed in [INTERACTION_AND_MOTION_SPEC.md](INTERACTION_AND_MOTION_SPEC.md). Live browser review remains pending.

## Route mapping

| Design surface | Website route | Current implementation |
|---|---|---|
| Projects and Experience lobbies | `/projects`, `/experience` | Selectable lobbies; unfinished stories do not open placeholder pages. |
| Food Tracker and Crest | `/projects/food-tracker`, `/projects/crest` | Responsive, editorial case-study routes with project-specific story structure. |
| Cho’Veigo and Fraymakers | `/projects/choveigo`, `/projects/fraymakers` | Responsive case studies; Cho’Veigo separates Fit, Eligibility, and Recommendation evidence. |
| Living in Silico and Stush Patties | `/experience/living-in-silico`, `/experience/stush-patties` | Responsive stories with factual process diagrams and stated ownership boundaries. |
| Profile Overview and demos | `/profile`, `/profile/demos` | Overview and selectable demo states; only cleared Crest and Cho’Veigo captures are shown. |
| Journey | `/profile/journey` | Full-length 1840 px story with nine beats and five waypoints; Living in Silico has distinct research-spark and lecture-memory beats under one waypoint. Its locator follows the 35% reading line and reflows below 900 px. |
| Resume Found and viewer | `/resume`, `/resume/viewer` | Found state, PDF viewer, download, and fullscreen/open actions all use the exact authorized v13 PDF. |
| Help and recovery | `/help`, unmatched routes | Responsive help guide and branded client-side recovery page. |
| Hackathons and Education lobby candidates | none in current scope | Figma roots `730:3316` and `738:3316` remain REVIEW CANDIDATE; the brief does not require standalone routes. Education claims need owner confirmation before promotion. |

## Current Figma geometry and readiness notes

| Story | Current body and figures |
|---|---|
| Food Tracker | `1813:42`, 1560×2203; product-anatomy figure `2032:2`; search decision plate `2084:2`. |
| Cho’Veigo | `1813:419`, 1560×2670; evidence worksheet `2043:2`. |
| Fraymakers | `1831:32`, 1560×1340; workflow figure `2118:2`. |
| Living in Silico | `1438:4`, 1560×2320. Parent `1438:2` is IMPLEMENT READY; the content node `1438:4` now matches its ready parent. |
| Stush Patties | `1438:278`, 1560×2080; workflow diagram `1992:2`. |
| Journey | 1840 px story inside 2004 px inspection canvas `1287:7`; the root label reads IMPLEMENT READY. The Living in Silico waypoint leads to the research spark and then the Stanford lecture memory. |

These body dimensions are current. Chapter-anchor coordinates and end/tail measurements in older design records remain prior references and have not been re-audited against updated body geometry.

Journey’s design reference presents the whole story for inspection; the website keeps the shared shell and scrolls the story inside its content area. The locator behavior is implemented, but live scroll, keyboard, and responsive review remains pending.

## Media and factual limits

Public media is limited to the owner-cleared Crest sample capture, the owner-cleared static Cho’Veigo Recommendations capture, and the authorized resume PDF. Food Tracker has no authentic current-build capture and its project mark is not cleared for public reuse. Fraymakers media and unconfirmed project marks are omitted. Do not embed third-party game art or marks without confirmed publication rights. Diagrams are explanatory portfolio-owned vectors, not screenshots of running products. Sample values are identified as sample data and are not presented as outcomes.

The Resume Found → Resume Viewer → Download/Open Fullscreen flow uses `public/resume/Joshua_Aryeetey_General_Resume_v13.pdf` only. The PDF is the approved canonical general resume; its contents are not regenerated or substituted.

## Delivery and review state

The public-repository integration branch `feat/portfolio-integration` is at `b76c631`. Its application source remains `9aac4d5`; commits since that source revision contain documentation updates only. The latest immutable deployment at `https://84d0f7a9.joshuaik2.pages.dev/` is id `84d0f7a9-c594-4a92-b51c-237bc42256d9`, dated 2026-09-27, with application source `9aac4d5`. Wrangler identifies it as Production on the staging project's configured Cloudflare branch label `feat/initial-client-shell`; that label is deployment metadata, not the Git integration branch. Four selected route URLs returned the same 635-byte SPA shell, verifying hosting/fallback only, not client-side route rendering. The resume PDF returned HTTP 200 with `application/pdf`, 164,726 bytes and SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`. Keep this staging project and Cloudflare branch label unchanged; the primary portfolio is separate.

The last full 36-test run across eight files passed after route extraction; the suite now includes the nine-beat Journey order test and passes after the Journey layout update. Typecheck, lint, production build, and diff checks passed after the latest source changes. Four selected route probes on the current immutable deployment returned only the shared SPA shell. Those responses confirm hosting fallback, not client-side rendering; the canonical v13 PDF bytes and hash match the authorized source. Browser visual, keyboard, responsive, reduced-motion, and native PDF behavior review remain pending because no browser instance was available. Figma source review and website code review are not substitutes for that live review.

## Living in Silico method/output distinction

The page labels the 500 generated SMILES samples as DeepMol output and presents modeling methods as a separate list without claiming that they generated those samples. The unresolved method/output relationship stays in [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md).
