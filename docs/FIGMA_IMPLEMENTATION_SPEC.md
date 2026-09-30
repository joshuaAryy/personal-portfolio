# Figma-to-Implementation Specification

Figma defines appearance and page composition. This spec maps accepted direction into implementation; it does not declare any route visually accepted. Use [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) as the current status source, [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md) for node identity, and [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md) for factual claims.

## Controls

1. Inspect the live node and its relevant reference/archive before implementation. Record the current Figma URL/key and inspection date in the node map.
2. Owner decisions override older reviews. Critic CLEAR applies only to the reviewed change.
3. A durable Figma/owner change updates this spec and the relevant decision/status/asset/interaction docs, marks superseded direction, and is committed/pushed to `feat/portfolio-integration` before unrelated React work waits. Do not commit every micro-adjustment.
4. Case studies are complete top-to-bottom pages. A first viewport is not a substitute for full page design or review.
5. Source notes are not public-copy requirements. Design the clearest truthful visitor story; keep internal uncertainty in the source record unless it changes the public claim.
6. Site completion requires implementation, rendered comparison, correction, and second review. Tests/builds alone do not prove visual parity.

## Surface requirements

| Surface | Implementation direction |
|---|---|
| Opening and J | The unresolved J is a redesign task. Use archive `159:2` as macro standard; Pass30 clearance is superseded and Pass31/32 on `3089:2` remain review candidates. Keep the coordinated opposing segmented rings, about 2s, Skip and near-instant reduced-motion path. Update site identity placements only after a J clears owner review at hero and 54/32/16px. |
| Home | Keep the approved architecture in `2252:3445`. Build the final four icons, exact backgrounds/materials, spacing, selection/hover/focus states, and no-overflow/no-scrollbar behavior from the finished Figma. |
| Profile | Preserve `960:2` base composition. Four static lower counts own four separate hover/focus overlays and never change the main Profile panel. Projects uses four equal sectors. Keep the rejected feature-left/three-stacked-right layout out of design and implementation. |
| Projects / Experience lobbies | Preserve approved lobbies and asset-backed destinations. Keep selection separate from the explicit open action. |
| Case studies | Match each complete long-form Figma page, including lower sections and close. Show only curated visitor-facing copy; do not paste factual-source notes verbatim. Figures must explain their point within seconds and remain technically accurate. |
| Food Tracker | Flagship order: product/problem → search challenge → whole system → retrieval/evaluation decisions → contextualized benchmark → learning/close. Pass 10 is a full-page review candidate; use its contextualized Top-1 comparisons, plain-language validation, and technical learning. No visual acceptance is recorded while the Figma screenshot endpoint crops the long page. |
| Living in Silico | Explain the modeling problem, representation/SMILES/Morgan fingerprints/RDKit, DeepMol + RNN and fragment-based workflows, distinct outcomes, technical learning, and current state. Keep experiment-record uncertainty out of the hero; do not claim successful REINVENT4 generation or validated/novel DeepMol molecules. |
| Stush Patties | Lead with mixed file inputs → parser → canonical/shared schema → normalization → repeatable output → Power BI handoff. “I built” is preferred where supported by source. Put source-specific exceptions later as an engineering decision; no distributor/client jargon in the main schematic. |
| Cho’Veigo | Product → authentic Recommendations UI → whole-product architecture → Joshua’s strongest work → matching/retrieval and evaluation lessons. Improve image scale/crop/framing and give architecture sufficient weight; do not title around “Job Discovery.” |
| Crest | Define the expense-intelligence product and show its workflow before ownership. Preserve “One transaction. Two sources. Human review.” and keep policy retrieval separate from Finance Q&A. |
| Fraymakers | Lead with one match flowing through configuration, video mapping, compositor layers, and a 1280×720 frame. Show background/stage, two characters, labels, logos, and overlays. Add a later YAML configuration section. Keep ownership context later. |
| Resume Found | Reconstruct from authentic Riot/CommunityDragon Match Found / Ready Check frame, ring, plate, and action assets. Adapt the portfolio J and “VIEW RESUME”; retain `RESUME FOUND`, close/origin behavior, and the exact v13 document. Custom ring approximation is not accepted authority. |
| Help and errors | Preserve reusable contextual Help. Keep recovery states route/item-specific and bounded; do not invent offline/retry conditions or expand low-priority states excessively. |

Implementation should not introduce explanatory owner notes, internal terminology, or interaction behavior that is absent from approved direction. When Figma has no authored reaction, mark implementation behavior separately as owner-directed rather than claiming it is a Figma prototype.

### Food Tracker full-page review candidate — 2026-09-29

Live file `9zvk9iSRPKSsJ6llDJrQmA`, page `510:14`. The active body `1813:42` is 1,560 × 2,528 px and contains eight authored sections: product/use `1821:9`; retrieval challenge `1821:49`; system architecture `2032:2` with diagram `2850:2`; evaluation `1821:51`; validation `1821:89`; data authority `1821:103`; technical learning `1821:119`; and close `1821:146`. The page is a complete long-form design, not a 1,080 px implementation target.

Pass 10 keeps the product-first opening and retrieval/system figures. Evaluation frame `1821:55` / figure `2813:66` compares legacy baseline and full-hybrid Top-1 results in separate development and holdout cards. The larger result values preserve their denominators and show the additional correct first results: development 40/80 → 71/80 (+31), holdout 25/40 → 27/40 (+2). Top-3/Top-5 remain supporting context. The footer defines these as offline search-relevance checks, not live-user outcomes. Remove catalog row counts from public design; their source truth stays in `CASE_STUDY_CONTENT_SOURCE.md`.

Validation `1821:89` explains that passing tests did not guarantee useful search and that index completeness must be checked separately from result relevance. Learning `1821:119` now teaches retrieval relevance, latency, and nutrition authority rather than AI-agent task workflow. Closing `1821:146` reinforces trusted reference data, serving conversion, and stable history. **Status: REVIEW CANDIDATE; full-page visual review and owner acceptance remain open.** The screenshot endpoint still returns only the first 938 px of the tall body, so do not call visual parity or implementation readiness from metadata alone.
