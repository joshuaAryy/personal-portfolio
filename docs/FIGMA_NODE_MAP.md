# Portfolio Surface Map

This public handoff maps current portfolio surfaces to their website routes. It contains no design-file identifiers or source links. For implementation and release status, see [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).

| Surface | Route | Current handoff |
|---|---|---|
| Opening and identity | `/` to `/projects` | One-shot J reveal with a visible Skip action; reduced motion shows the finished mark and skips its animated build. |
| Projects lobby | `/projects` | Project selection with links to available stories. |
| Food Tracker | `/projects/food-tracker` | Responsive editorial story with product-search evidence and benchmark context. |
| Crest | `/projects/crest` | Responsive story with an owner-cleared sample capture and sample-data context. |
| Cho'Veigo | `/projects/choveigo` | Responsive story with distinct Fit, Eligibility, and Recommendation stages and a static Recommendations capture. |
| Fraymakers | `/projects/fraymakers` | Responsive, asset-free editorial story with a pipeline figure. |
| Experience lobby | `/experience` | Links to available experience stories. |
| Living in Silico | `/experience/living-in-silico` | Responsive text-and-vector story with a Method / Attempt / Outcome structure. |
| Stush Patties | `/experience/stush-patties` | Responsive story with a distributor-normalization diagram. |
| Profile Overview | `/profile` | Overview content with route links to Journey and Demos. |
| Journey | `/profile/journey` | Full 1600 px desktop story, 35% reading-line locator, and content reflow below a 900 px container width. The design state is consistent with Living in Silico. |
| Demos | `/profile/demos` | Selectable Crest and Cho'Veigo stills; Food Tracker is not included in the website demo selector. |
| Help and recovery | `/help`, unknown client routes | Help guide and branded recovery links. A client-side recovery screen does not guarantee an HTTP 404 status. |
| Resume | `/resume`, `/resume/viewer` | Resume Found and PDF viewer use `public/resume/Joshua_Aryeetey_General_Resume_v13.pdf` for display, download, and fullscreen/open. |
| Personal Highlights | not available | Unavailable pending a separate content direction. |

The current integration is deployed to the public staging project at `https://9f96473e.joshuaik2.pages.dev/`. Staging returned HTTP 200 for the root, projects, profile, Journey, Resume Found, and Resume Viewer routes. The served v13 PDF hash matches the owner-supplied asset. Visual, responsive, keyboard, reduced-motion, and native PDF browser/runtime QA remain pending because no browser surface was available; no screenshot or live-browser verification is claimed.
