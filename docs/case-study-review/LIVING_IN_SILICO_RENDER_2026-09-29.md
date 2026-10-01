# Living in Silico — Figma and site render, pass 05

The public page now follows the complete 1,560 × 2,260 Figma story at desktop size. The dataset callout describes the source collection and curated experiment sets as two useful scopes; it omits the snapshot date. The factual handoff in `CASE_STUDY_CONTENT_SOURCE.md` still preserves the exact dataset context and the uncertainty about how the method settings relate to the 500 generated SMILES samples.

The site opening and all later section anchors match the current Figma page. The experiment routes now include their method paths, explanation, and outcome; the 500-sample result has its own heading and identifies the sequence-generation output; the contribution and close sections use the authored public copy.

## Rendered captures

- [Desktop opening at 1920 × 1080](living-in-silico-pass-05-site-render-2026-09-29.png)
- [Complete desktop page at 1920 × 2400](living-in-silico-pass-05-full-site-render-2026-09-29.png)
- [Updated Figma opening and scope copy](living-in-silico-pass-05-figma-opening-2026-09-29.png)
- Prior full-page Figma render: [pass 04](living-in-silico-pass-04-full-2026-09-29.png)

## Layout comparison

Coordinates below are relative to the 1,560px case-study body. Figma source positions are on `1438:4`; the final site positions were read from the rendered route.

| Section / element | Figma target | Site render |
|---|---:|---:|
| Hero kicker / title / summary | 78 / 110 / 258 | 78 / 110 / 258 |
| Research role card | 78 × 246 | 78 × 246 |
| Structure → SMILES → Morgan figure | 688 × 376, 808 × 231 | 687 × 376, 809 × 231 |
| Model representation section | 377; heading 410; explanation 504 | 376; heading 410; explanation 504 |
| Data scope label / content | 557 / 577 | 557 / 577 |
| Experiment section | 675 | 675 |
| Experiment rows | 790 / 918 / 1,046 | 790 / 918 / 1,046 |
| Output heading / card | 1,243 / 1,345 × 270 | 1,243 / 1,345 × 270 |
| Contribution heading | 1,689 | 1,689 |
| Closing reflection / footer | 2,025 / 2,163 | 2,025 / 2,163 |
| Complete body height | 2,260 | 2,260 |

The single-pixel figure-width/left-edge difference comes from fractional grid sizing and does not change its alignment or scale. The visible opening and complete long-form page were reviewed at 1920px desktop width. `npm run build` passes (76 modules). No tests were run. Responsive, keyboard, and route-interaction review remains open.
