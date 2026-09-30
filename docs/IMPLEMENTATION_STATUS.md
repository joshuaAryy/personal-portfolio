# Implementation Status

Updated 2026-09-29. This is the active status ledger, not a pass archive. Live reconciliation of Figma file key `9zvk9iSRPKSsJ6llDJrQmA`, page `510:14` (00 Foundations), was completed on 2026-09-29. Case-study body screenshot endpoints still return 938px viewport crops despite taller Figma frames; record that limit rather than claiming full-page acceptance.

## Status and sync rules

- Owner rejection or reopening immediately supersedes prior pass clearance. A critic’s scoped “CLEAR” is not owner approval or whole-surface acceptance.
- Use explicit statuses: DESIGNING, NEEDS REDESIGN, REVIEW CANDIDATE, IMPLEMENT READY, IMPLEMENTED, NEEDS SYNC. Do not infer acceptance from pass count.
- After any durable owner-direction or Figma change, update this ledger and the relevant decision/spec/source docs, mark the old direction superseded, then make and push a documentation-only commit to `feat/portfolio-integration`. Do this before waiting for React work. Skip transient spacing experiments.
- Full-page case studies require the complete long-form Figma page. A first-fold capture is not page acceptance. Site acceptance additionally needs rendered comparison and correction.

## Current control table

| Surface | Authoritative Figma reference | Current status and implementation direction |
|---|---|---|
| Canonical J | Archive target `159:2`; current reconstruction `1950:6`; Pass30 comparison `3079:2`; archive-first candidates Pass31/32 `3089:2` | **ACTIVE RECONSTRUCTION / NEEDS REDESIGN.** The archive is the quality standard and temporary production fallback. The current reconstruction remains below it. Pass30 clearance is superseded. Pass31/32 test archive-like vertical proportion, crown/hook contour, and an open orbit integrated at both ends; both are reversible review candidates, not owner-approved. Continue macro review and 54/32/16px recognition before promotion. See [J review](j-source-review/REVIEW.md). |
| Opening | Active frame `2025:2`; motion notes `2025:84/88/125` | **DESIGNING / NEEDS SYNC.** Preserve the liked segmented Hextech direction: coordinated opposing ring rotations, centered J, restrained two-second opening, Skip, and near-instant reduced motion. The J is the critical gate. Website implementation must catch up to the reviewed Figma mechanism; avoid extra spins/effects. |
| Home / Explore | Archive structure `69:37`; active root `2252:3445`; environment `2356:514` | **REFINEMENT / IMPLEMENTATION CLARITY OPEN.** Keep the existing architecture. Replace/refine all four final icons, use the intended background, finish shell/material/state/spacing detail, remove accidental artifacts, and show no irrelevant scrollbar when the page does not overflow. Pass 04 icon clearance is superseded by owner review. |
| Profile Overview | Base `960:2`; states Projects `998:3`, Experience `998:46`, Hackathon `998:63`, Academics `998:79` | **APPROVED BASE / INTERACTION REVIEW OPEN.** Preserve the base composition. Counts stay static. Each signal has a separate hover/focus overlay and never switches the main Profile panel. Projects uses four equal sectors. The rejected featured-left/three-stacked-right layout is not a target. |
| Food Tracker | Root `1813:2`; full body `1813:42` (eight sections; 1,560×2,528); Pass 10 sections `1821:9/49`, `2032:2`, `1821:51/89/103/119/146` | **REVIEW CANDIDATE / FULL-PAGE VISUAL CHECK OPEN.** Pass 10 carries the product-first story through all eight sections. Top-1 bars show 40/80 → 71/80 (+31) on development and 25/40 → 27/40 (+2) on holdout; denominators, Top-3/Top-5 context, and offline relevance scope are explicit. Catalog scale is removed from public design. Validation separates search quality from index completeness; lower-page learning and close focus on technical trade-offs and trusted logging. Do not mark implement-ready until the complete page can be visually reviewed. |
| Living in Silico | Root `1438:2`; body `1438:4` | **DESIGNING / NEEDS SYNC.** Complete the long page as a comprehensible ML/research experiment: representation → SMILES/fingerprints → generation methods → outcomes/learning. Keep uncertainty in source truth; do not make research bookkeeping the public hero. |
| Stush Patties | Root `1438:276`; body `1438:278`; system figure `3051:2` | **DESIGNING / FULL-PAGE REVIEW OPEN.** Lead with inconsistent files → parsing → shared schema → normalization → repeatable artifacts → Power BI. Keep distributor names, Koyo, program logistics, and specific exceptions out of the hero; use an edge case later only if it teaches an engineering decision. Say “I built” where ownership supports it. |
| Cho’Veigo | Root `1813:379`; body `1813:419`; demo `1817:424`; whole system `2858:2` | **PRODUCT-FIRST DIRECTION / VISUAL REVIEW OPEN.** Order: product → authentic Recommendations demo → whole-system architecture → Joshua’s strongest matching/evaluation work → decisions and regression lessons. The current demo framing and architecture weight remain open; do not lead with “job-side contribution.” |
| Crest | Root `1817:4`; body `1817:39` | **PRODUCT-FIRST DIRECTION / REVIEW OPEN.** Explain Crest and its expense-intelligence workflow before ownership. Preserve “One transaction. Two sources. Human review.” |
| Fraymakers | Root `1831:2`; body `2296:3474`; output schematic `2296:3479`; pipeline `2296:3489–3515` | **POSITIVE REFERENCE / EXTENSION OPEN.** Preserve the clear match-to-frame schematic, layered compositor story, node-canvas context, and later YAML configuration explanation. Remove ownership disclaimers from hero space. Use its clarity as a quality bar, not a repeated template. |
| Resume Found | Active frame `2407:176`; authentic Ready Check source `2888:164/165` and local provenance | **DESIGNING / AUTHENTIC ASSET ALIGNMENT OPEN.** Use Riot/CommunityDragon Match Found / Ready Check art and language as the visual foundation, adapted for the portfolio action. Current custom ring approximation is not accepted as the authority. Keep the exact v13 resume action and portfolio labels. |
| Help and recovery | Reusable Help overlay `2298:3474`; 404 state `2014:94` | **DIRECTION PRESERVED; POLISH BOUNDED.** Keep reusable contextual Help. Error states need coherent client treatment but are not flagship work; do not enumerate every hypothetical state. |

## Story truth versus public design

`CASE_STUDY_CONTENT_SOURCE.md` is the factual record, including uncertainty and ownership boundaries. `DESIGN_DECISIONS.md` and `FIGMA_IMPLEMENTATION_SPEC.md` govern public story order and visual communication. Source detail is not automatically public copy. Keep complete long-form pages, but include only the context a first-time visitor needs to understand the product and Joshua’s truthful technical work.

## Live Figma reconciliation — 2026-09-29

- J comparison boards `3079:2` and `3089:2` place the archive, current reconstruction, upper-serif studies, Pass30, and Pass31/32 candidates in direct comparison. The archive remains the stronger finished identity; Pass31/32 are exploratory, unapproved candidates.
- Home `2252:3445` retains the four-destination architecture, mountain environment, queue, Confirm/Back, and shell. Its four icons are visible but remain reopened for final quality; the screenshot has no page scrollbar.
- Profile `960:2` retains the four equal Projects sectors and static lower counts. The separate overlay frames remain the implementation references; no main-panel navigation is specified by those counts.
- Food Tracker live metadata confirms `1813:42` is 1,560×2,528.14 with eight authored sections. Pass 10 updates the evaluation presentation and all lower-page narrative; the development gain is +31/80 and holdout gain +2/40. The screenshot endpoint still returns only 1,560×938, so the complete page is designed but its full-length visual review remains open.
- Opening `2025:2` shows the centered archive J and segmented chassis with Skip; this static capture does not verify motion timing. Resume Found `2407:176` still shows an archive J inside a custom ring composition; the authentic Ready Check art is the target foundation, so this current composition is not accepted.
- Current first-fold captures confirm Cho’Veigo’s product heading and authentic but soft/cursor-bearing demo; Stush’s “I built” file-to-schema pipeline; Crest’s product and “One transaction. Two sources. Human review.”; Fraymakers’ match-to-frame/YAML story; and Living in Silico’s representation-first ML story. These 938px crops do not establish full-page design acceptance.

## Explicitly superseded directions

- Profile Projects feature-left plus three stacked right entries: rejected; use four equal sectors and separate signal overlays.
- Pass 04 Home icon clearance: superseded; all four icons need final review while Home structure stays.
- Pass30 J macro clearance: superseded by direct owner review; Pass31/32 remain review candidates and owner status remains NEEDS REDESIGN.
- Food Tracker Pass 09 first-fold-only direction is superseded by the Pass 10 full-page review candidate. Pass 10 remains unaccepted until full-length visual review and owner assessment.
- Ownership-first / internal-logistics-first case-study openings: superseded by each product/system-first order above.
- Custom Resume Found ring treatment as canonical: rejected as final authority; use authentic asset-led reconstruction.

See [the Figma node map](FIGMA_NODE_MAP.md), [design decisions](DESIGN_DECISIONS.md), and [case-study source truth](CASE_STUDY_CONTENT_SOURCE.md) for implementation-ready direction.
