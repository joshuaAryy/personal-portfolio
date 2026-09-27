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

## Current Figma geometry and readiness notes

| Story | Current body and figures |
|---|---|
| Food Tracker | `1813:42`, 1560×2203; product-anatomy figure `2032:2`; search decision plate `2084:2`. |
| Cho’Veigo | `1813:419`, 1560×2670; evidence worksheet `2043:2`. |
| Fraymakers | `1831:32`, 1560×1340; workflow figure `2118:2`. |
| Living in Silico | `1438:4`, 1560×2320. Parent `1438:2` is IMPLEMENT READY; the content node `1438:4` now matches its ready parent. |
| Stush Patties | `1438:278`, 1560×2080; workflow diagram `1992:2`. |
| Journey | 1600 px story inside inspection canvas `1287:7`; the root label now reads IMPLEMENT READY. |

These body dimensions are current. Chapter-anchor coordinates and end/tail measurements in older design records remain prior references and have not been re-audited against updated body geometry.

Journey’s design reference presents the whole story for inspection; the website keeps the shared shell and scrolls the story inside its content area. The locator behavior is implemented, but live scroll, keyboard, and responsive review remains pending.

## Media and factual limits

Public media is limited to the owner-cleared Crest sample capture, the owner-cleared static Cho’Veigo Recommendations capture, and the authorized resume PDF. Food Tracker has no authentic current-build capture and its project mark is not cleared for public reuse. Fraymakers media and unconfirmed project marks are omitted. Do not embed third-party game art or marks without confirmed publication rights. Diagrams are explanatory portfolio-owned vectors, not screenshots of running products. Sample values are identified as sample data and are not presented as outcomes.

The Resume Found → Resume Viewer → Download/Open Fullscreen flow uses `public/resume/Joshua_Aryeetey_General_Resume_v13.pdf` only. The PDF is the approved canonical general resume; its contents are not regenerated or substituted.

## Delivery and review state

The current integration is committed on public-repository branch `feat/portfolio-integration` and was uploaded to the separate `joshuaik2` staging project at `https://ce8b0f14.joshuaik2.pages.dev/`. The latest deployment is `ce8b0f14-1431-48db-99fb-3213d19f41fa`, dated 2026-09-27, with application source `2f8ae63`. Wrangler identifies it as Production on the staging project's configured Cloudflare branch label `feat/initial-client-shell`; that label is deployment metadata, not the Git integration branch. All 15 requested route URLs returned the same 574-byte SPA shell, verifying hosting/fallback only, not client-side route rendering. The resume PDF returned HTTP 200 with `application/pdf`, 164,726 bytes and SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`. Keep this staging project and Cloudflare branch label unchanged; the primary portfolio is separate.

The full 36-test suite across eight files, including focused shell and route-mapping coverage, passes along with typecheck, lint, production build, and diff checks. Latest deployment checks confirm hosting fallback and the served PDF bytes/hash; the route URLs returned only the shared SPA shell and do not confirm client-side rendering. Browser visual, keyboard, responsive, reduced-motion, and native PDF behavior review remain pending because no browser instance was available. Figma source review and website code review are not substitutes for that live review.

## Living in Silico research qualifier

Figma node 2167:2 below the DeepMol method description states that available records do not link the listed methods to the 500 DeepMol samples. The website preserves the same evidence boundary.
