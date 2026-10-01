# Case Study Design Handoff

Figma file: `9zvk9iSRPKSsJ6llDJrQmA` · case-study page `510:21`.

This handoff preserves implementation-relevant history. Current status and decisions live in [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md), [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md), and [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md). All six stories have 1920×1080 scrolling production frames and separate unclipped full-page review clones sourced from the same authored bodies. Source-body screenshot exports crop at 938px, but the review clones expose the entire designed page. Keep clones synchronized after source changes; page inspectability, owner review, and rendered-site acceptance are distinct.

Food Tracker Pass 10 remains the owner-positive product-first and retrieval direction; preserve it. Its authored body `1813:42` contains the complete eight-section story. Use authentic product/demo media for the next major visual uplift when available. Current React rendering, responsive behavior, interaction, and page-wide site parity remain open; no portfolio-wide website acceptance is claimed.

Cho'Veigo remains product-first: product → authentic Recommendations UI → whole-product architecture → Joshua's strongest work → evaluation. Its authentic Recommendations asset is 864×486 and displays uncropped at 820×461.25 beside the introduction; architecture begins at body y=858. Full-page frame `3286:603` was reviewed on 2026-09-30 and no material demo/architecture imbalance was found. Preserve current scale/crop until rendered-site comparison identifies a concrete gap. Earlier reports that the demo dominates the page or that full-page review was blocked by the 938px export crop are superseded.

### Public-copy source sync · 2026-09-29

- **Living in Silico:** `src/LivingInSilicoCase.tsx` no longer claims a research-code and written-report handoff, which is not verified in the current content source. The remaining contribution copy describes work across data loading, SMILES processing, molecular features, sequence generation, and fragment workflows. No CSS/layout change. Active Figma contribution node 2294:79 now matches React and removes the unsupported research-code/written-report handoff; REINVENT4 explanation node 2294:61 already matches React. No internal run-record caveat or validity/novelty claim appears in the active public copy. Persistent critic: CLEAR for content only; visual fit and full-page review remain OPEN because the node export was 1x1 and the body crop ends above the contribution. Screenshot of text node 2294:79 returned 1x1, and the 998px body crop ends above the contribution section, so current lower-page visual fit and whole-page review remain open.
- **Stush Patties:** source-only review found the current React narrative aligned with the source. The main figure proceeds from generic varied files through parsing, shared schema, normalization, and standardized outputs to Power BI; formats remain grouped across inputs, with no source values or client vocabulary in the architecture. Joshua’s parsing/normalization work leads; team and stakeholder context and the generic one-file exception appear later. No code or CSS changes.
- No code, tests, or build were changed or run for this Figma copy sync. Site rendering and responsive/route review remain open.

## Owner review update · 2026-09-29

The latest owner-directed work replaces earlier first-fold-only framing for these stories. These are complete long-form Figma pages and scoped design reviews, not website or route acceptance.

- **Food Tracker - flagship Pass 09 first-fold delta (superseded by Pass 10):** Figma body 1813:42 is 1,560x2,528.137; the hero/product-use group is 1821:9, the expanded product path is 2995:2 (884x222), retrieval is 1821:49, and the unchanged downstream story continues through system, evaluation, validation, data trust, learning, and close. The first-fold sequence puts the product promise and use path before retrieval/architecture/metrics. The persistent critic cleared that sequence and the separate 8px inset only; the owner has since approved Pass 10 as the current first-fold and retrieval direction; preserve it rather than restart the first fold. Pass09 is a baseline, not page acceptance. Figma caption node 2995:3 was moved down 8px (y=0 to y=8) inside product path 2995:2; the frame stays 884x222. The updated detail capture shows the full heading. React now points to /media/case-studies/food-product-flow-pass-09-inset.png with a schematic/non-screen alt description and a narrow-screen text fallback; src/food-visuals.css contains the scoped fallback rules. Current captures: [body viewport crop](case-study-review/food-tracker-pass09-1813-42-inset.png), [opening](case-study-review/food-tracker-pass09-1821-9.png), [product path](case-study-review/food-tracker-pass09-2995-2-inset.png), [retrieval](case-study-review/food-tracker-pass09-1821-49.png). The body capture is 1,560x938, not full height. Figma full-height export hit the Education-plan MCP limit; whole-page review remains OPEN. Rendered route, responsive, and interaction review remain OPEN; no site acceptance is claimed.

- **Food Tracker · flagship Pass 07 (superseded by owner review):** Figma body `1813:42` is 1,560×2,480; system figure `2850:2` is 1,432×380. Pass 07 names the product and food/serving challenge, then places the full system diagram at body y=401, early in the opening viewport. Its site copy/figure sync and prior desktop CLEAR are historical evidence only. The owner said the product and search problem needed stronger visual establishment before architecture/evaluation; Pass 09 revised the opening hierarchy, but no current full-page pass is accepted (see the latest owner review above). See [the Pass 07 Figma capture](case-study-review/food-tracker-flagship-pass-07-rev-01-full-2026-09-29.png), [site opening](case-study-review/food-tracker-pass-07-site-1920x1080.png), and [historical site render](case-study-review/food-tracker-pass-07-site-full-1920x2800-rev01.png). Do not sync or accept Pass 07 as the final design.
- **Crest · product-first pass 02:** the full-page body `1817:39` keeps the owner-cleared sample capture and decision boundary, but now introduces Crest as an expense-intelligence workspace and says what the workflow helps a finance team do. The intact “One transaction. Two sources. Human review.” story and policy retrieval precede Joshua’s backend/data ownership; the team roster is removed from the hero, and the four-person context plus third-place recognition move below the system story. [Opening and transaction flow](case-study-review/crest-pass-02-opening.png), [ownership and close](case-study-review/crest-pass-02-ownership.png). `CrestCaseStudy.tsx` and scoped styles are synced. Website rendering and full-route comparison remain open.
- **Cho'Veigo - product-first pass 04 follow-up:** the Figma story `1813:419` was 1,560×3,586 at that historical review; its current live body is 1,560×2,967, as recorded in the active node map. The authentic Recommendations view is unchanged; a compact illustrative evidence-gap note now sits directly below it. Review copy reflects shared behavior review with Shiv, regression fixtures derived from agreed behavior, and an owner-reported label on the discovery anecdote. `ChoViegoCase.tsx` and `cho-evidence-worksheet.css` are source-synced. [Figma opening](case-study-review/choveigo-pass-04-figma-opening-2026-09-29.png), [full Figma page](case-study-review/choveigo-pass-04-figma-full-2026-09-29.png), [Figma/source review](case-study-review/CHOVEIGO_FIGMA_REVIEW_2026-09-29.md). This follow-up has no new full-page capture; website rendering and Figma comparison remain open.
- **Food Tracker - flagship pass 06:** full page `1813:42` remains 2,427 px; the opening system figure is `2850:2` in section `2032:2`. The new diagram traces an in-app query through exact, fuzzy, and semantic candidate retrieval, deterministic ranking, two independent nutrition authorities (trusted catalog data and serving conversion), and one append-only log entry. It is marked illustrative, not a product screenshot. The previous serial-arrow figure stays hidden as history. [Current system figure](case-study-review/food-tracker-system-pass-06.png); the full-page lower story remains the unchanged pass 05 sequence: retrieval, denominated Top-1 evaluation, validation history, authority boundaries, workflow learning, and close.
- **Food Tracker · flagship pass 05:** full page `1813:42` (2,427 px); system schematic `2811:2`; retrieval figure `2813:2`; proportional Top-1 cards `2813:66`. The narrative leads with the product tension, then the logging-to-recording system, candidate retrieval, evaluation, validation history, authority boundaries, and close. Top-1 includes its 80-query development and 40-query holdout denominators; Top-3/5 remain secondary, and catalog size is labeled as scale. [Full page](case-study-review/food-tracker-flagship-pass-05-full-2026-09-29.png), [system figure](case-study-review/food-tracker-flagship-pass-05-system-2026-09-29.png), [retrieval and evaluation](case-study-review/food-tracker-flagship-pass-05-search-eval-2026-09-29.png). Critic: CLEAR for this full-page Figma pass.
- **Living in Silico · pass 05 scope copy and site sync:** full page `1438:4` (2,260 px); representation schematic `2820:195`; public data scope `2820:257–258`; DeepMol output card `2820:259`. The public page distinguishes the source collection from curated experiment sets without foregrounding the snapshot date or run-record caveat. The full site implementation now matches the Figma’s section positions and 2,260px body at 1920px. [Updated Figma opening](case-study-review/living-in-silico-pass-05-figma-opening-2026-09-29.png), [full desktop site render](case-study-review/living-in-silico-pass-05-full-site-render-2026-09-29.png), [render comparison](case-study-review/LIVING_IN_SILICO_RENDER_2026-09-29.md). Responsive, keyboard, and route-interaction review remain open.
- **Stush Patties · full-page system-story pass 05 (historical figure):** Figma body `1438:278` is 1,560×2,442 px. This capture preserves the prior five-card diagram and is superseded by Pass 06 below. Its public story and page order remain useful context: the hero focuses on inconsistent sales files and Joshua’s Python parsing/normalization work; the public edge case uses generic copy; collaboration follows the system; the outputs and learning close complete the story. Copy nodes `1833:77/78/81/82` were updated in Pass 06 with no layout changes. [Pass 05 Figma full page](case-study-review/stush-pass-05-figma-full-2026-09-29.png), [first fold](case-study-review/stush-pass-05-site-firstfold-2026-09-29.png), and [full site render](case-study-review/stush-pass-05-site-full-2026-09-29.png) are historical and do not show the latest system figure.
- **Stush Patties · Pass 06 system figure:** Figma body `1438:278` remains 1,560×2,442 px; the active 1,432×360 figure is `3051:2`. Three visually distinct areas now show generic varied file layouts → layout-aware parsing → one prominent Sales/Units/Case pack/Reporting month contract → a separate normalization rail → Unified CSV, Data dictionary, and Quality report → Power BI. CSV/XLSX/XLSB are grouped across inputs; the figure is conceptual and shows no source values. The copy-sync edits at `1833:77/78/81/82` remain, including a generic one-file parsing branch later in the story. React JSX/CSS now follow the diagram. The Figma figure was visually checked at full size; no independent critic verdict is claimed. A current website render is pending because the supported Browser returned no session. No tests or build were run.

### Copy sync follow-up · 2026-09-29

#### Pass 05 Stush figure critique (historical; superseded by Pass 06)

The persistent visual critic returned **NOT CLEAR** for the former Pass 05 five-card figure: equal small panels read as text cards, the arrows did not show the transformation, and output artifacts and Power BI were secondary. Pass 06 replaces that figure; the verdict applies only to the superseded design.

Pass 06 implements that three-zone direction in Figma node `3051:2`: varied generic file sheets feed a layout-aware parse, fields converge into a prominent four-field contract, a distinct Normalize rail applies shared rules, and standardized outputs lead to Power BI. A compact process spine names FILES → PARSE → SHARED SCHEMA → NORMALIZE → HANDOFF. Formats stay grouped across inputs and the diagram states that no source values are shown. The full-size Figma figure was reviewed in context; current website render comparison remains open.

Figma and React use the visitor-facing LiS REINVENT4 outcome and generic Stush edge-case copy. The case-study owner confirmed the copy mutations at `2294:61` and `1833:77/78/81/82`. Pass 06 replaces the Stush five-card figure in Figma and React/CSS; Pass 05 full-page captures are historical. The current site render comparison is pending because no supported Browser session is available.

Historical implementation sync note (2026-09-29; superseded by the current status above and in `IMPLEMENTATION_STATUS.md`): later passes have updated Food Tracker through Pass 07 and Cho’Veigo through Pass 05. The prior build/test statement and comparison-pending list are not current acceptance evidence. No tests or build were run for the latest visual comparison passes.

## Inspection baseline

Reviewed each current root screenshot and the linked technical evidence against `CASE_STUDY_CONTENT_SOURCE.md`, `DESIGN_DECISIONS.md`, `FIGMA_NODE_MAP.md`, and `IMPLEMENTATION_STATUS.md`. Existing authored layouts, case-specific diagrams, and owner-cleared Crest/Cho’Veigo captures remain the source media. The initial critique targets are recorded in `IMPLEMENTATION_STATUS.md`; no website code or tests were touched.

## Food Tracker · pass 01

- Moved the existing retrieval pipeline `2084:2` up 55 px inside Search (`y: 320 → 265`), directly after the benchmark panel. The 1432 × 148 figure now exposes deterministic, fuzzy, and semantic candidates → candidate union → deterministic evaluator → final rank in the first viewport. The heading and semantic source label retain Pinecone’s candidate-only role.
- Preserved the mobile/backend product strip `2032:2`, benchmark results, and the original retrieval/authority notes.
- Screenshot: [food-tracker-pass-01.png](case-study-review/food-tracker-pass-01.png).
- Critic review: cleared for the first-fold blocker. The whole retrieval path and Pinecone candidate-only boundary are legible; the small authority-boundary note below the flow is clipped at 900 px, but it is not needed to understand candidate supply versus ranking.

## Crest · pass 01

- Added a compact annotation directly under the owner-cleared sample capture, assigning finance/policy authority to deterministic rules, retrieved-policy interpretation to Gemini, and workflow decisions to human review. The screenshot and sample-data caption remain untouched.
- Preserved the larger transaction → policy/rules → human-review story and separate Finance Q&A/reporting block.
- Screenshot: [crest-pass-01.png](case-study-review/crest-pass-01.png).
- Critic review: cleared. Keep the annotation attached to the capture in responsive layouts.

## Cho’Veigo · pass 02

- Reworked the examples into a high-contrast callout directly below the unchanged owner-cleared Recommendations capture, with a right-edge tether to its Skills panel. It is labeled “representative evidence-gap examples” and “Illustrative · not model-scored”; three distinct evidence gaps counterbalance the repeated Skills bullets without implying validated outcomes.
- Preserved the Fit → Eligibility → structured Gemini → Recommendation → separate resume-tailoring flow.
- Screenshot: [choveigo-pass-02.png](case-study-review/choveigo-pass-02.png).
- Critic review: cleared. The callout is readable, visually connected, source-safe, and does not alter the capture or decision flow.

## Fraymakers · pass 02

- Historical first-fold ownership treatment, superseded by pass 03 below. The factual scope and unfinished upload boundary remain represented later in the story.
- Screenshot: [fraymakers-pass-02.png](case-study-review/fraymakers-pass-02.png).

## Fraymakers · system-first pass 03

- Replaced the hero ownership split and upload caveat with a product-level match → VOD → rendered-frame summary; the title and four-step media pipeline remain.
- Refined the layout-only schematic to distinguish background/stage art, character one, character two, set/player text, logos, and other overlays. The figure remains explicitly labeled as explanatory rather than original project art.
- Added a complete YAML/configuration section after the composition story. Its diagram shows match-specific values and overrides plus the layered inputs flowing through `thumbnail.js` and node-canvas into a 1280×720 PNG.
- Moved Joshua’s direct `thumbnail.js` ownership and shared project context after the system explanation. The YouTube Data API/OAuth prototype and unfinished automatic upload now appear at the close.
- Full story: `2296:3474` (1,560×1,721). [Opening and pipeline](case-study-review/fraymakers-pass-03-opening.png), [YAML, ownership, and close](case-study-review/fraymakers-pass-03-yaml-ownership.png). `FraymakersCase.tsx` and `fraymakers-case.css` are synced; website render comparison remains open.
- Screenshot: [fraymakers-pass-02.png](case-study-review/fraymakers-pass-02.png).
- Critic review: cleared. The split ownership, incomplete upload boundary, and schematic status are legible and source-accurate.

## Living in Silico · pass 02

- Kept “500 generated SMILES samples” unchanged and placed the provenance limit in a high-contrast band directly beneath it: “Run records do not tie settings to this exact 500-sample set.”
- Preserved separate April snapshot and curated experiment contexts, separately labeled reported CSVLoader/Morgan/RNN settings, and made no validity, uniqueness, or novelty claims.
- Screenshot: [living-in-silico-pass-02.png](case-study-review/living-in-silico-pass-02.png).
- Critic review: cleared. The count and limitation now read together; the qualifier no longer allows the reported settings to appear tied to that exact sample set.

## Stush Patties · pass 01 (revision requested)

- The current opening retains the mixed-format parsing/normalization pipeline and Koyo parser exception.
- Screenshot: [stush-patties-pass-01.png](case-study-review/stush-patties-pass-01.png).
- Critic review: not cleared at that pass. The missing team and stakeholder-translation details prompted pass 02 below; no claim of sole ownership was added, and distributor brands were not elevated.

## Stush Patties · pass 02

- Added a compact strip directly below the contribution lead: “TWO-PERSON TEAM · Joshua + Shiv” and “Stakeholder conversations translated sales, units, case packs, and reporting months into one schema.”
- Preserved Joshua’s contribution language, three generic feeds, mixed file formats, shared normalization pipeline, and Koyo parser exception.
- Current screenshot: [stush-patties-pass-02.png](case-study-review/stush-patties-pass-02.png); nodes `2480:2–7`, divider `1833:52`.
- Critic review: cleared. The ownership and requirement-translation story is legible and source-accurate without implying sole ownership.

## Website sync and visual review

All six first-fold passes are source-synced, and the integrated production build passes. Direct rendered website/Figma comparison remains pending for every route, and no site is accepted based on the Figma pass, code sync, or build alone.

## Food Tracker � validation pass 01

- Split the combined validation band into three chronological rows: **Relevance** (unit tests passed while missed food matches remained; offline query evaluation exposed the gap and justified broader candidate retrieval before deterministic ranking); **Index completeness** (an earlier Pinecone pagination issue left partial or stale index state, checked separately from relevance); and **Staging reindex** (a separate staging rebuild stopped after a partial load when the integrated-inference token quota was reached; bounded 429 retries later completed the 12,363-document rebuild). The copy keeps the two index episodes separate and does not attribute the quota interruption to 429s or rate limits.
- Retained the existing gold ordinals, uppercase titles, muted body text, and full-width page alignment. Section height is 208 px, up from 157 px; later sections reflow in the existing vertical layout.
- Changed nodes: section `1821:89`; event container `1821:92`; rows `1821:93` and `1821:98` with copy `1821:96�97` and `1821:101�102`; new third row `2519:2` with number/story/title/copy `2519:3�6`.
- Captures: [food-tracker-validation-pass-01-root.png](case-study-review/food-tracker-validation-pass-01-root.png) (full root context) and [food-tracker-validation-pass-01.png](case-study-review/food-tracker-validation-pass-01.png) (second-fold section crop). The crop was exported with the viewport clip temporarily disabled; the live clip state was restored immediately after export.
- Critic review: CLEAR for this delta. The critic confirmed the three source-backed events and chronology, readable row hierarchy and spacing, visual continuity with the dark client palette and gold accents, and no 429-cause implication. After review, metadata names for row 03 nodes 2519:3-6 were aligned to ordinal 03; no visual change.
- Website sync, 2026-09-28: `FoodTrackerCaseStudy.tsx` and `food-visuals.css` now use the exact three stacked validation rows, titles, and copy from the cleared frame. The section remains at a 208px minimum height. No tests/build or rendered site review were run; the route remains open.

## Crest | policy retrieval attribution | pass 01

**Superseded on 2026-10-01:** the public “Deployment details are owner-reported” caption was removed from Figma source `1962:33`, duplicate review-clone node `3286:851`, and React. Keep the deployment qualification in `CASE_STUDY_CONTENT_SOURCE.md`; it is source truth, not visitor-facing copy. Existing renders remain valid for their original map geometry/accessibility scope, but Crest is queued for a post-change render comparison of the policy figure and full page.

- Revealed the existing caption node `1962:33` directly below the unchanged five-stage retrieval path with the copy: `Deployment details are owner-reported.` This scopes the detailed deployment path to owner-reported information without claiming live-service verification.
- Auto-layout path group `1962:7` grew from 50 px to 75 px. Divider `1962:34` and decision-authority row `1962:35` reflowed down 25 px with the existing 24 px gaps preserved; parent plate `1962:2` remains 370 px tall. The documented PDF-to-chunking-to-Gemini-embedding-to-Atlas-vector-search-to-grounded-prompt stages remain intact.
- Left the first-fold sample capture and adjacent role annotation (`2304:2`) unchanged. The separate Finance Q&A/reporting workflow (`2367:2`) remains separate.
- Captures: [root viewport](case-study-review/crest-policy-attribution-pass-01-root.png), [full story context](case-study-review/crest-policy-attribution-pass-01-story.png), and [detail crop](case-study-review/crest-policy-attribution-pass-01-detail.png). The viewport clip on `1817:6` was temporarily disabled only for export and restored to `true`.
- Critic review: CLEAR for this delta only. The critic confirmed the qualifier spans the complete 1,342 px retrieval row, reads clearly below all five stages, and preserves the 24 px gaps without clipping or collision. The role/sample context and separate Finance Q&A remain intact. No website code sync or tests/build were run; the Crest route remains open pending rendered website comparison, and no whole-case acceptance is claimed.
- Website sync, 2026-09-28: Added `Deployment details are owner-reported.` directly below the unchanged five-stage policy path in `CrestCaseStudy.tsx`, with a muted compact style in `crest-case-study.css`. The existing trace and separate Finance Q&A remain. This is source sync only; no tests/build or rendered comparison were run.

## Stush Patties · canonical field mapping · pass 01

- Filled the otherwise empty second-fold section between the existing heading `1833:62` and transition rule `1833:76` with the source-safe conceptual map `2554:2`. The section label and heading (`1833:61–62`) and downstream section order remain intact.
- New mapping nodes `2554:3–18`: “Conceptual mapping · no source values shown”; sales, units, case packs, and reporting month → one canonical field contract → sales + units, case-pack logic, and month alignment → unified CSV, data dictionary, quality report, and Power BI reporting handoff. The unsupported Product field was removed during fit/source review; no literal source headers or sample values are shown.
- Kept the Koyo position-and-cell exception and its transition downstream unchanged (`1833:76–82`). The experience viewport clip (`1438:277`) is restored to `true` after full-story capture.
- Captures: [corrected full-story context](case-study-review/stush-field-contract-pass-01-corrected-context.png) and [corrected detail crop](case-study-review/stush-field-contract-pass-01-corrected-detail.png).
- Critic review: CLEAR for this delta only. The critic confirmed the flow is legible, the conceptual qualifier is clear, card hierarchy is balanced, and the Koyo transition remains intact. This clears the crosswalk pass only; the route remains open pending rendered website comparison. No website code sync, tests, or build were run.

- Website sync, 2026-09-28: `StushPattiesCase.tsx` now presents the four-step conceptual map in the cleared order and follows it with a standalone Koyo exception callout. The prior three-step reconciliation block was replaced to avoid repeating the same field-contract explanation. `stush-case-study.css` styles the flow as responsive cards with directional connectors and a compact stacked layout on small screens. This is implementation sync only; Browser comparison and whole-route acceptance remain pending. No tests or build were run.

## Stush Patties · schema field source correction · pass 01

- Source audit found that the active upstream canonical grid (`1992:2`) still displayed `PRODUCT` and `SALES / UNIT`. The source handoff supports sales, units, case packs, and reporting months; it does not confirm a product field or a literal sales/unit field.
- Updated only the two active schema label nodes: `2296:3567` now reads `SALES` and `2296:3568` reads `UNITS`; layer names were aligned. Existing `CASE PACK` (`2296:3569`) and `REPORT MONTH` (`2296:3570`) remain. Grid geometry and downstream normalization are unchanged.
- Preserved the cleared conceptual crosswalk (`2554:2–18`), Koyo-specific position-and-cell exception (`1833:76–82`), and viewport clip (`1438:277=true`).
- Captures: [root viewport](case-study-review/stush-schema-labels-pass-01-root.png) and [workflow detail](case-study-review/stush-schema-labels-pass-01-detail.png).
- Critic review: CLEAR for this delta only. The critic confirmed labels fit, read clearly, remain subordinate to the canonical-schema heading, and preserve the input-to-parse-to-schema-to-normalize/report order; the Koyo exception remains clear. The route remains open pending rendered website comparison; no whole-case acceptance is claimed. No website code sync, tests, or build were run.
- Website sync, 2026-09-28: Updated the upstream schema labels in `StushPattiesCase.tsx` to SALES / UNITS / CASE PACK / REPORT MONTH and corrected the stage description to omit the unsupported Product field. Also repaired the <=740px lead-copy selector after the contribution paragraph was wrapped in its team/stakeholder container. This is implementation sync only; browser comparison and route acceptance remain pending. No tests/build were run.

Frontend owner source-only review, 2026-09-28: no blocker found across Food Tracker validation rows, Crest's owner-reported qualifier, or the Stush crosswalk/schema labels and mobile selector. No files were changed during review; no tests, build, browser check, or render was run. Rendered route acceptance remains pending.

## Full-story source audit — 2026-09-29

Historical audit note: the 2026-09-28 review called for placing the run-settings limitation beside the 500-sample result. Direct owner steering on 2026-09-29 supersedes that public-copy placement. The factual handoff retains the uncertainty, while Living in Silico pass 05 presents the generated-sample count with its sequence-generation context. Stush's supported field crosswalk and later Koyo exception remain in its engineering story. Full-page render comparison was open at the time of this audit; subsequent pass 05 desktop reviews now match Living in Silico and Stush Patties to Figma. Responsive and route-interaction review remain open, and full-page comparison remains open for the other four case studies. No files, tests, or builds were changed/run for that historical audit.


## Owner-directed Food Tracker full-page redesign — 2026-09-29

The owner reopened the flagship page after Pass09. Keep its product/problem-first opening as a useful baseline, but do not treat its first-fold clearance as whole-page approval. The complete story must establish what the mobile product does and why food/serving resolution matters before technical architecture, then explain why search is difficult, how the end-to-end system works, how evaluation changed the design, what the measurements show, and what Joshua learned.

Current Figma metadata confirms eight authored sections in body `1813:42` (1,560×2,528). The latest whole-body image is still a 1,560×938 viewport crop; see [the current crop](case-study-review/food-tracker-pass09-viewport-crop-20260929.png). The screenshot endpoint returned only the visible canvas area, direct exports of lower off-viewport frames returned blank images, and further Figma calls reached the Education-plan limit. No current full-page visual review or full-page website render is available.

The review identified two specific design tasks. The retrieval figure shows candidate generation and deterministic ranking; the next end-to-end diagram repeats candidate/ranking mechanics while adding nutrition resolution and the canonical log. Make their scopes immediately distinct (search detail → complete product path), or remove duplicated mechanics. The evaluation visualization already gives useful query-set denominators and labels catalog size as scale, but it does not isolate the semantic-only latency trade-off. The source supports only a qualitative owner-interview observation, with no measured timing or value; keep that comparison qualitative and do not invent units or numbers. Full metrics are 40/80→71/80 Top-1 for development and 25/40→27/40 for holdout, with Top-3/5 secondary.

Pass09 is a first-fold baseline only. Rebuild and review the complete long page before using it as implementation authority; no tests, build, or website acceptance are claimed here.
