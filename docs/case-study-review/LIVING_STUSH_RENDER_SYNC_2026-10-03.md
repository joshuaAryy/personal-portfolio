# Living in Silico + Stush Patties render sync — 2026-10-03

**Source checkpoint:** 7b2449beaabb3079efbcc1bbf7e547922404142b on feat/portfolio-integration. This checkpoint contains the React copy/data-flow sync, focused tests, and the Stush narrow ownership layout correction.

**Browser:** local Vite source, Playwright 1.63.0, installed Chrome 153.0.8010.53. Both stories were checked at 1920×1080 and 390×844 against their current Figma review frames. The full-page capture expands the app’s internal story scroller only during capture; product CSS is unchanged by the capture.

## Figma references

- Living in Silico: body 1438:4, review frame 3287:2 (1920×2380).
- Stush Patties: body 1438:278, review frame 3287:288 (1920×2562).

## Living in Silico

The representation introduction now keeps the April 12 snapshot (15,696 rows; 14,487 unique SMILES) separate from the curated experimental subsets (~400–600 entries). Morgan fingerprints remain in the structure/representation schematic; the DeepMol route now reads CSVLoader → SMILES sequences → RNN MolecularGenerator. The recorded 10-epoch, batch-size-64 method is separate from the output card for 500 generated SMILES samples. No validity, uniqueness, or novelty claim is made.

The page also names Joshua’s DeepMol contribution and the sequence-versus-fragment learning. The REINVENT4 row identifies it as another generative approach alongside sequence and fragment work, retains the unsuccessful outcome, and does not claim a setup or failure cause.

The dataset paragraph measured 579×76px on desktop and 350×94px at 390px. All three approach rows and the separate output fit without clipping or overflow. Full-page captures are [Figma](render-sync/2026-10-03-living-stush/living-in-silico-figma.png), [desktop](render-sync/2026-10-03-living-stush/living-in-silico-desktop-full.png), and [390px](render-sync/2026-10-03-living-stush/living-in-silico-390px-full.png).

## Stush Patties

The story names Koyo, UNFI, and Dovre collectively while retaining CSV/XLSX/XLSB as formats across inputs. The later edge-case section identifies the temporary Koyo position-and-cell parsing exception and its return to common normalization. The collaboration copy identifies Joshua and Shiv as a two-person technical team working with client stakeholders. The five-stage pipeline, field contract, output artifacts, and Power BI handoff remain intact.

At 390px, the ownership title now precedes full-width details: the section spans 346px at x=22, with details beginning at y=400 after the title. At 1920px the existing two-column relationship remains (title x=64–611; details x=675–1496). This corrected a narrow layout where the team paragraph had only 169px of width. Full-page captures are [Figma](render-sync/2026-10-03-living-stush/stush-patties-figma.png), [desktop](render-sync/2026-10-03-living-stush/stush-patties-desktop-full.png), and [390px](render-sync/2026-10-03-living-stush/stush-patties-390px-full.png); the mobile ownership detail is [captured separately](render-sync/2026-10-03-living-stush/stush-ownership-390px.png).

## Runtime checks and limits

- Both routes returned HTTP 200; all 14 images loaded with alt text at each tested viewport.
- No console, page, or request errors; no horizontal document overflow at either viewport.
- Section IDs are present. The EXPERIENCE breadcrumb navigates to /experience, and browser back restores the story.
- Rendered full-page captures: Living 1920×2325 desktop / 390×3983 narrow; Stush 1920×2481 desktop / 390×3357 narrow. Figma frames contain the story body; browser captures include the portfolio shell, so these total heights are context rather than a pixel-height acceptance target.
- npm test -- --run: 21 files / 90 tests passed. npm run build passed. git diff --check passed.

The case-study direction and browser comparison are ready for owner review; they are not owner-approved or frozen. Preview remains at source 86d5d89 and does not contain this checkpoint. No deployment or production change was made.
