# Figma implementation summary

This page summarizes the current design-to-code relationship for the portfolio. Figma readiness, website implementation, staging, and browser review are separate states; a design reference does not by itself confirm implementation or QA.

## Shared reference shell

The standard desktop reference is 1920 × 1080: an 82 px top shell, a 1560 × 998 central viewport, and a 360 × 998 activity rail. Detail stories scroll within the central viewport while the shell and rail remain outside that scroller. Responsive behavior is implemented on several routes; live browser review is still pending.

## Identity

The canonical first-party J is implemented as an inline vector and shared by the opening and site shell. Its glyph ratio is 0.8315. Source review accepted the ringed mark at 32 px and above, and the ring-free monochrome mark at 16 px. The opening adds the Figma 532 px registration circle and ticks, a +1.2° to 0° settle by 460 ms, and a 1.82–2.00 s crossfade to the Projects client. Browser contrast and placement review remain open.

## Route mapping

| Design surface | Website route | Current implementation |
|---|---|---|
| Projects and Experience lobbies | `/projects`, `/experience` | Selectable lobbies; unfinished stories do not open placeholder pages. |
| Food Tracker and Crest | `/projects/food-tracker`, `/projects/crest` | Responsive, editorial case-study routes with project-specific story structure. |
| Cho’Veigo and Fraymakers | `/projects/choveigo`, `/projects/fraymakers` | Responsive case studies; Cho’Veigo separates Fit, Eligibility, and Recommendation evidence. |
| Living in Silico and Stush Patties | `/experience/living-in-silico`, `/experience/stush-patties` | Responsive stories with factual process diagrams and stated ownership boundaries. |
| Profile Overview and demos | `/profile`, `/profile/demos` | Overview and selectable demo states; only cleared Crest and Cho’Veigo captures are shown. |
| Journey | `/profile/journey` | Full-length story with eight beats and five waypoints. Its locator follows the 35% reading line and reflows below 900 px. |
| Resume Found and viewer | `/resume`, `/resume/viewer` | Found state, PDF viewer, download, and fullscreen/open actions all use the exact authorized v13 PDF. |
| Help and recovery | `/help`, unmatched routes | Responsive help guide and branded client-side recovery page. |

Journey’s design reference presents the whole story for inspection; the website keeps the shared shell and scrolls the story inside its content area. The locator behavior is implemented, but live scroll, keyboard, and responsive review remains pending.

## Media and factual limits

Public media is limited to the owner-cleared Crest sample capture, the owner-cleared static Cho’Veigo Recommendations capture, and the authorized resume PDF. Food Tracker has no authentic current-build capture and its project mark is not cleared for public reuse. Fraymakers media and unconfirmed project marks are omitted. Do not embed third-party game art or marks without confirmed publication rights. Diagrams are explanatory portfolio-owned vectors, not screenshots of running products. Sample values are identified as sample data and are not presented as outcomes.

The Resume Found → Resume Viewer → Download/Open Fullscreen flow uses `public/resume/Joshua_Aryeetey_General_Resume_v13.pdf` only. The PDF is the approved canonical general resume; its contents are not regenerated or substituted.

## Delivery and review state

The current integration is committed on public-repository branch `feat/portfolio-integration` and was uploaded from its clean worktree to the separate `joshuaik2` staging project at `https://bdf8c5e4.joshuaik2.pages.dev/`. Wrangler identifies deployment `bdf8c5e4-0fa8-4019-a81b-11e244d55d19` as Production on the staging project's configured branch label `feat/initial-client-shell`; the deployed application source is commit `09d5d1b`. Later branch commits are documentation-only and do not change the deployed app. Keep this staging project and Cloudflare branch label unchanged; the primary portfolio is separate.

The full 11-test suite, typecheck, lint, production build, diff checks, staging route responses, and served PDF hash pass. Browser visual, keyboard, responsive, reduced-motion, and native PDF behavior review remain pending because no in-app browser surface was available. Figma source review and website code review are not substitutes for that live review.
