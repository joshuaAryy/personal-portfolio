# Portfolio Surface Map

This public handoff maps current portfolio surfaces and selected Figma node references to their website routes. It omits source-repository and design-file URLs. For implementation and release status, see [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).

| Surface | Route | Current handoff |
|---|---|---|
| Opening and identity | `/` to `/projects` | One-shot J reveal with a 532 px registration circle, cardinal ticks, +1.2° settle, and 180 ms Projects underlay crossfade; reduced motion skips rotation/light-pass and uses a 120 ms handoff. |
| Projects lobby | `/projects` | Project selection with links to available stories. Public cards use portfolio-owned F, C, FT, and CV index glyphs where project marks are not cleared; they are not represented as official logos. |
| Motion and prototype notes | cross-route | Page 09 has the opening timeline `2025:84` and interaction ledger `2176:2`; the ring settle at `2025:97` is +1.2° and matches the implementation record. |
| Food Tracker | `/projects/food-tracker` | Story body `1813:42` is 1560×2203, with product-anatomy figure `2032:2`, search decision plate `2084:2`, and benchmark context; the site separates the three parallel candidate sources before their union. |
| Crest | `/projects/crest` | Responsive story with an owner-cleared sample capture and sample-data context; policy flow, five rule-based signal labels, and AI boundary from body `1817:39` are represented on the site. |
| Cho'Veigo | `/projects/choveigo` | Story body `1813:419` is 1560×2670 and includes worksheet `2043:2`; distinct Fit, Eligibility, and Recommendation stages; the static Recommendations capture is followed by an explicit unvalidated-strength disclosure. |
| Fraymakers | `/projects/fraymakers` | Story body `1831:32` is 1560×1340, with workflow figure `2118:2`; responsive, asset-free editorial story. |
| Experience lobby | `/experience` | Links to available experience stories. |
| Hackathons lobby | not in current route scope | Figma root `730:3316` remains REVIEW CANDIDATE. The required third-place Crest result is included on `/projects/crest`; the current brief does not require a standalone Hackathons route. |
| Education lobby | not in current route scope | Figma root `738:3316` remains REVIEW CANDIDATE. The current brief does not require a standalone Education route; claims need owner confirmation before promotion. |
| Living in Silico | `/experience/living-in-silico` | Parent `1438:2` and story body `1438:4` (1560×2320) are both marked IMPLEMENT READY. Responsive text-and-vector story with separate DeepMol output and REINVENT4 researched/attempted outcome records; no successful REINVENT4 generation is claimed. |
| Stush Patties | `/experience/stush-patties` | Story body `1438:278` is 1560×2080, with distributor-normalization diagram `1992:2` showing a Koyo-only temporary position-and-cell parser exception; unconfirmed graphic mark removed from the story hero. |
| Profile Overview | `/profile` | Overview content with route links to Journey and Demos. |
| Journey | `/profile/journey` | 1600 px story inside the full-height inspection canvas; root `1287:7` is labeled IMPLEMENT READY; the locator follows the 35% reading line and content reflows below a 900 px container width. |
| Demos | `/profile/demos` | Selectable Crest and Cho'Veigo stills; Food Tracker is not included in the website demo selector. |
| Help and recovery | `/help`, unknown client routes | Help guide and branded recovery links. A client-side recovery screen does not guarantee an HTTP 404 status. |
| Resume | `/resume`, `/resume/viewer` | Resume Found and PDF viewer use `public/resume/Joshua_Aryeetey_General_Resume_v13.pdf` for display, download, and fullscreen/open. |
| Personal Highlights | not available | Unavailable pending a separate content direction. |

The current integration is deployed to the public staging project at `https://2048d38f.joshuaik2.pages.dev/` (deployment `2048d38f-095d-4f07-a409-0df767a7a4d9`, source `4b35b3a`); the staging alias is `https://joshuaik2.pages.dev/`. All 15 requested route URLs returned HTTP 200 with the same 635-byte SPA shell, verifying hosting fallback only. The authorized v13 PDF returned HTTP 200 as `application/pdf`, measured 164,726 bytes, and matches SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`. Visual, responsive, keyboard, reduced-motion, and native PDF browser/runtime QA remain pending because no browser was available; no screenshot or live-browser verification is claimed.

The Food Tracker and Cho’Veigo body heights above supersede earlier measurements. Chapter-anchor coordinates and end/tail measurements in older design records are prior references and have not been re-audited against the updated body geometry.

## LiS research copy sync (2026-09-27)

The public LiS story labels the 500 generated SMILES samples as DeepMol output and lists modeling methods separately, without claiming they generated those samples. The unresolved method/output relationship is retained in [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md).

## Stush ending copy sync (2026-09-27)

Website `src/StushPattiesCase.tsx` and Figma body `1438:278` now use the same outcome summary and reflection. The workflow plate `1992:2` retains the detailed CSV, data dictionary, quality report, and Power BI handoff; the ending summarizes the result without repeating the artifact list or publishing internal provenance disclaimers.

## Food Tracker and Crest figure sync (2026-09-27)

The Food Tracker decision plate `2084:2` now gives deterministic, fuzzy, and semantic retrieval distinct peer boxes joined before candidate union. Crest's website policy pipeline uses the `ATLAS SEARCH` label from `1962:2`, retains vector retrieval in the owner-reported flow caption, and restores the signal and AI-boundary block from body nodes `1817:396–409`.
