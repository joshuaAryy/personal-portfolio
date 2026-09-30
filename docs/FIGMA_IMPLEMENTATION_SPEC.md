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
| Food Tracker | Flagship order: product/problem → search challenge → whole system → retrieval/evaluation decisions → contextualized benchmark → learning/close. Preserve denominators and meaning; do not lead with raw benchmark tables or catalog scale. |
| Living in Silico | Explain the modeling problem, representation/SMILES/Morgan fingerprints/RDKit, DeepMol + RNN and fragment-based workflows, distinct outcomes, technical learning, and current state. Keep experiment-record uncertainty out of the hero; do not claim successful REINVENT4 generation or validated/novel DeepMol molecules. |
| Stush Patties | Lead with mixed file inputs → parser → canonical/shared schema → normalization → repeatable output → Power BI handoff. “I built” is preferred where supported by source. Put source-specific exceptions later as an engineering decision; no distributor/client jargon in the main schematic. |
| Cho’Veigo | Product → authentic Recommendations UI → whole-product architecture → Joshua’s strongest work → matching/retrieval and evaluation lessons. Improve image scale/crop/framing and give architecture sufficient weight; do not title around “Job Discovery.” |
| Crest | Define the expense-intelligence product and show its workflow before ownership. Preserve “One transaction. Two sources. Human review.” and keep policy retrieval separate from Finance Q&A. |
| Fraymakers | Lead with one match flowing through configuration, video mapping, compositor layers, and a 1280×720 frame. Show background/stage, two characters, labels, logos, and overlays. Add a later YAML configuration section. Keep ownership context later. |
| Resume Found | Reconstruct from authentic Riot/CommunityDragon Match Found / Ready Check frame, ring, plate, and action assets. Adapt the portfolio J and “VIEW RESUME”; retain `RESUME FOUND`, close/origin behavior, and the exact v13 document. Custom ring approximation is not accepted authority. |
| Help and errors | Preserve reusable contextual Help. Keep recovery states route/item-specific and bounded; do not invent offline/retry conditions or expand low-priority states excessively. |

Implementation should not introduce explanatory owner notes, internal terminology, or interaction behavior that is absent from approved direction. When Figma has no authored reaction, mark implementation behavior separately as owner-directed rather than claiming it is a Figma prototype.
