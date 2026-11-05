# Fraymakers output-first candidate

**Base:** `feat/portfolio-integration` at `520519632eb2da27e37f58601228fb03b631a1d1`  
**Scope:** Fraymakers case study, its focused tests, and this report.

## Narrative and figure changes

- Opens on Joshua's `thumbnail.js` renderer and a large native SVG titled “Thumbnail composition schematic.” Abstract opposing art shapes and clearly separated label/supporting-art regions explain the output without resembling recovered project media. The adjacent caption states that it is not an authentic generated thumbnail.
- Removes a standalone output chapter that repeated the opening's format and dimensions; the OUTPUT chapter link now returns to the opening. The narrative moves from opening to workflow, engineering, and outcome.
- States in one compact sentence that the brother built the broader foundation, CLI, Challonge integration, and much of the early API groundwork while Joshua joined later to build `thumbnail.js` and work on YAML/configuration, generation/integration, and part of the YouTube API path. At narrow widths, this attribution follows the schematic so the visual appears earlier.
- Uses one conceptual workflow figure to show tournament/match information and event/match overrides informing choices associated with a recording, followed by selected labels and art reaching the renderer. It has no fabricated YAML example or implied override precedence.
- Keeps the composition handoff connected to the opening schematic; adds a compact P1/P2 mirroring comparison and concise alias, long-name, and missing-asset constraints.
- Closes once on 1280 × 720 generation used on real Fraymakers VODs and states that YouTube integration was prototyped while automatic upload remained unfinished.

## Verification

- Focused Fray tests: **8 passed** (`FraymakersCase.test.tsx`, `FraymakersCase.scrollspy.test.tsx`).
- `npm run build`: passed (TypeScript and Vite production build).
- `git diff --check`: passed.
- Installed Chrome 149 at 1440 × 900 and 390 × 844: route returned HTTP 200 at both sizes, document width matched the viewport, no page/console/request/HTTP errors, and chapter links reached their anchored sections.
- At 390px, the workflow stacks from context to recording association to render inputs; the P2 mirroring comparison and constraints remain within the viewport width.

## Browser evidence

Evidence directory: `%TEMP%\fraymakers-output-first-candidate-20261007\`

- `fraymakers-desktop-first-fold.png`
- `fraymakers-desktop-pipeline.png`
- `fraymakers-desktop-match-config.png`
- `fraymakers-desktop-compositor.png`
- `fraymakers-desktop-vod-outcome.png`
- `fraymakers-desktop-output-anchor.png`
- `fraymakers-narrow-first-fold.png`
- `fraymakers-narrow-pipeline.png`
- `fraymakers-narrow-match-config.png`
- `fraymakers-narrow-compositor.png`
- `fraymakers-narrow-vod-outcome.png`
- `fraymakers-narrow-output-anchor.png`
- `report.json` (viewport dimensions, figure captions, chapter navigation, and runtime errors)

The figures are explanatory drawings. They do not document exact YAML keys, alias mappings, text-fit techniques, fallback behavior, or authentic generated output.

## Opening pacing follow-up

The compact ownership sentence now follows the schematic in narrow reading order. On desktop it remains in the left column beside the figure. The figure remains explicitly schematic; no authentic generated thumbnail or VOD capture was introduced.

Chrome 149 was rerun at 1440 × 900 and 390 × 844. Both routes returned HTTP 200 with matching document/viewport widths and no page, console, request, or HTTP errors. The OUTPUT anchor lands below the sticky chapter rail at both sizes. Evidence directory: `%TEMP%\fraymakers-opening-pacing-20261007\` (`fraymakers-desktop-first-fold.png`, `fraymakers-narrow-first-fold.png`, `fraymakers-desktop-output-anchor.png`, `fraymakers-narrow-output-anchor.png`, section captures, and `report.json`).
