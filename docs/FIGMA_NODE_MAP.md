# Portfolio Surface Map

This public handoff maps current portfolio surfaces and selected Figma node references to their website routes. It omits source-repository and design-file URLs. For implementation and release status, see [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).

| Surface | Route | Current handoff |
|---|---|---|
| Opening and identity | `/` to `/projects` | One-shot J reveal with a 532 px registration circle, cardinal ticks, +1.2° settle, and 180 ms Projects underlay crossfade; reduced motion skips rotation/light-pass and uses a 120 ms handoff. |
| Projects lobby | `/projects` | Project selection with links to available stories. Public cards use portfolio-owned F, C, FT, and CV index glyphs where project marks are not cleared; they are not represented as official logos. |
| Food Tracker | `/projects/food-tracker` | Responsive editorial story with product-search evidence, a candidate-union decision plate (`2084:2`), and benchmark context. |
| Crest | `/projects/crest` | Responsive story with an owner-cleared sample capture and sample-data context. |
| Cho'Veigo | `/projects/choveigo` | Responsive story with distinct Fit, Eligibility, and Recommendation stages; the static Recommendations capture is followed by an explicit unvalidated-strength disclosure. |
| Fraymakers | `/projects/fraymakers` | Responsive, asset-free editorial story with a pipeline figure. |
| Experience lobby | `/experience` | Links to available experience stories. |
| Living in Silico | `/experience/living-in-silico` | Responsive text-and-vector story with separate DeepMol output and REINVENT4 researched/attempted outcome records; no successful REINVENT4 generation is claimed. |
| Stush Patties | `/experience/stush-patties` | Responsive story with distributor-normalization diagram `1992:2`, showing a Koyo-only temporary position-and-cell parser exception between input and reporting handoff; unconfirmed graphic mark removed from the story hero. |
| Profile Overview | `/profile` | Overview content with route links to Journey and Demos. |
| Journey | `/profile/journey` | Full 1600 px desktop story, 35% reading-line locator, and content reflow below a 900 px container width. The design state is consistent with Living in Silico. |
| Demos | `/profile/demos` | Selectable Crest and Cho'Veigo stills; Food Tracker is not included in the website demo selector. |
| Help and recovery | `/help`, unknown client routes | Help guide and branded recovery links. A client-side recovery screen does not guarantee an HTTP 404 status. |
| Resume | `/resume`, `/resume/viewer` | Resume Found and PDF viewer use `public/resume/Joshua_Aryeetey_General_Resume_v13.pdf` for display, download, and fullscreen/open. |
| Personal Highlights | not available | Unavailable pending a separate content direction. |

The current integration is deployed to the public staging project at `https://bdf8c5e4.joshuaik2.pages.dev/` (deployment `bdf8c5e4-0fa8-4019-a81b-11e244d55d19`, source `09d5d1b`). The homepage and all 14 client routes returned HTTP 200 on the immutable deployment; its JavaScript (352,349 bytes) and CSS (122,079 bytes) also returned HTTP 200. The `/`, `/help`, `/profile/journey`, and `/resume/viewer` staging alias routes returned HTTP 200. The v13 PDF returned 164,726 bytes with the approved SHA-256; the same hash was returned through the alias. Visual, responsive, keyboard, reduced-motion, and native PDF browser/runtime QA remain pending because no browser was available; no screenshot or live-browser verification is claimed.
