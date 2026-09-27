# Portfolio Surface Map

Node IDs below are handoff references, not a claim that the page is loaded, current, approved, or implementation-ready. Figma pages are lazy-loaded: explicitly call `setCurrentPageAsync` for each relevant page before inspecting children. Page 11 / node `510:2` is active design history and must be inspected before replacing an established surface or interaction. See [FIGMA_IMPLEMENTATION_SPEC.md](FIGMA_IMPLEMENTATION_SPEC.md) for the required compare/correct/review loop and [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) for current state.

| Surface | Known Figma reference | Website route / current direction | Status |
|---|---|---|---|
| Archive | Page 11, `510:2` | Home/Explore, Help, Resume Found/viewer, shell, identity and prior concepts | Active history; inspect first |
| Home / Explore | Archive page 11, `69:37` “Home · Mode Selection”; overlay `69:207` “Home · First Visit Help” | `/` → Home/Explore → user chooses Projects, Experience, Hackathons, Education | DESIGNING from archive structure; `2252:3445` explicitly rejected/history only |
| Shell / Projects / Experience | `524:4`, `524:145`, `511:2`, `704:2` | `/projects`, `/experience` | Needs asset and hierarchy fidelity review |
| Hackathons / Education | `730:3316`, `738:3316` | Home destinations; standalone route need not be assumed | Inspect current Figma and source claims |
| Profile Overview | `960:2`; portrait `960:4515` | `/profile` | NEEDS REDESIGN toward approved frame |
| Demos | Food `1316:35`, Crest `1316:4534`, Cho’Veigo `1298:2` | `/profile/demos` | NEEDS REDESIGN; three entries, in-client media browser |
| Help | Archive page 11, `69:207`; rejected current standalone `2014:11` | Reusable overlay over current client screen; `/help` may remain as deep link | NEEDS REDESIGN; standalone guide rejected |
| Error/empty/offline | Archive page 11; current `2014:94`, `2014:151` | Contextual client state family | NEEDS REDESIGN |
| Food Tracker | `1813:2`, body `1813:42`; figures `2032:2`, `2084:2` | `/projects/food-tracker` | NEEDS REDESIGN; flagship technical case study |
| Crest | `1817:4`, body `1817:39`; policy `1962:2` | `/projects/crest` | NEEDS REDESIGN; expense-intelligence workflow |
| Cho’Veigo | `1813:379`, body `1813:419`; worksheet `2043:2` | `/projects/choveigo` | NEEDS REDESIGN; evidence-based job matching |
| Fraymakers | `1831:2`, body `1831:32`; workflow `2118:2` | `/projects/fraymakers` | NEEDS REDESIGN; thumbnail-generation system |
| Living in Silico | `1438:2`, body `1438:4` | `/experience/living-in-silico` | NEEDS REDESIGN; technical research-engineering lead |
| Stush Patties | `1438:276`, body `1438:278`; workflow `1992:2` | `/experience/stush-patties` | NEEDS REDESIGN; robust data pipeline lead |
| Journey | `1287:7` | `/profile/journey` | Keep environmental structure; rewrite emotional/learning arc |
| Canonical J | Archive page 11, `147:2` (left approved target `159:2`, vector reconstruction history at right); prior pass `1950:2` | Shared shell/opening | RECONSTRUCTION / REFINEMENT against `159:2`; `2280:3474` greenfield exploration discarded; no candidate promoted |
| Opening / motion | `2025:2`, notes `2025:84` | `/` to Home/Explore | DESIGNING; compare with real League loading references |
| Resume Found / viewer | Archive work; current `69:304`, `69:439` | `/resume`, `/resume/viewer` | Found NEEDS REDESIGN; exact v13 PDF viewer infrastructure retained |

Older dimensions, labels, reaction audits, prototype timings, and ready decisions are historical unless rechecked against a freshly loaded current frame. Keep useful evidence, but do not use it to override reopened owner direction. Current content facts remain in [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md).

The six case-study production roots are explicitly reopened as `DESIGNING / NEEDS REDESIGN`: Food Tracker `1813:2`, Crest `1817:4`, Cho’Veigo `1813:379`, Fraymakers `1831:2`, Living in Silico `1438:2`, and Stush Patties `1438:276`. A worker handoff is not acceptance; compare each updated story against its loaded Figma root and source handoff before changing status. Updated 2026-09-27.
