# Portfolio Surface Map

This public handoff maps current portfolio surfaces and selected Figma node references to their website routes. It omits source-repository and design-file URLs. For implementation and release status, see [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).

| Surface | Route | Current handoff |
|---|---|---|
| Opening and identity | `/` to `/projects` | One-shot J reveal with a 532 px registration circle, cardinal ticks, +1.2° settle, and 180 ms Projects underlay crossfade; reduced motion skips rotation/light-pass and uses a 120 ms handoff. |
| Projects lobby | `/projects` | Project selection with links to available stories. Public cards use portfolio-owned F, C, FT, and CV index glyphs where project marks are not cleared; they are not represented as official logos. |
| Motion and prototype notes | cross-route | Page 09 has the opening timeline `2025:84` and interaction ledger `2176:2`; the ring settle at `2025:97` is +1.2° and matches the implementation record. |
| Food Tracker | `/projects/food-tracker` | Story body `1813:42` is 1560×2203, with product-anatomy figure `2032:2`, search decision plate `2084:2`, and benchmark context. |
| Crest | `/projects/crest` | Responsive story with an owner-cleared sample capture and sample-data context. |
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

The current integration is deployed to the public staging project at `https://bf016423.joshuaik2.pages.dev/` (deployment `bf016423-334e-40a4-9cb3-e55a4d5e307a`, source `b28f704`); the staging alias is `https://joshuaik2.pages.dev/`. All 15 requested route URLs returned HTTP 200 with the same 635-byte SPA shell, verifying hosting fallback only. The authorized v13 PDF returned HTTP 200 as `application/pdf`, measured 164,726 bytes, and matches SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`. Visual, responsive, keyboard, reduced-motion, and native PDF browser/runtime QA remain pending because no browser was available; no screenshot or live-browser verification is claimed.

The Food Tracker and Cho’Veigo body heights above supersede earlier measurements. Chapter-anchor coordinates and end/tail measurements in older design records are prior references and have not been re-audited against the updated body geometry.

## LiS evidence note sync (2026-09-27)

In the IMPLEMENT READY body 1438:4 on 03 Experience, text node 2167:2 (DeepMol · method/sample qualification) states: “The available records do not link these methods to the 500 DeepMol samples.” This mirrors the website caveat and does not change the owner-sourced count or claim a sample-to-method relationship.
