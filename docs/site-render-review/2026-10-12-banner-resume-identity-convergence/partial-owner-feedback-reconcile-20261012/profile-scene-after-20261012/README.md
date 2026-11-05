# Profile lower-scene continuation — 2026-10-12

## Current-state issue

The 1b614940 Preview had the Profile signals aligned with the owner-annotated yellow band (grid y≈763–958 at 1536×1360), but its scenic pseudo-element stopped at 1,036px while the main client panel continued to the viewport bottom. A second gradient faded the remaining 236px to flat black. That left the owner-marked lower area looking empty.

## Correction

In the existing tall-desktop breakpoint only (1500–1858px wide, 1280px+ high), let the existing League environment fill the entire main panel and remove the hard black fade layer. The signal row, banner, traits, navigation, shell, and artwork source remain unchanged. The existing atmospheric overlay stays in place.

## Render verification

Installed Chrome, same owner-like 1536×1360 viewport:

- Before: environment 1,036px high; lower 236px of the main panel became flat black.
- After: environment 1,272px high, matching the main panel; signal grid remains y=763–958.
- No image stretch was introduced; the same authentic background uses `cover` and its existing centered crop.

Responsive check at 1920×1080, 1440×720, 1280×720, and 390×844 confirms the tall-only override does not change other viewport regimes. All five Profile routes return 200, document width matches the viewport, the four signal SVGs load, and Chrome reported no page errors or failed requests. Narrow layout remains naturally scrollable.

## Evidence

- Before, immutable Preview 1b614940: [profile-before-1536x1360.png](profile-before-1536x1360.png)
- After, local current source: [profile-1536x1360.png](profile-1536x1360.png)
- Additional after captures: `profile-1920x1080.png`, `profile-1440x720.png`, `profile-1280x720.png`, `profile-390x844.png`
- Machine-readable measurements and errors: [results.json](results.json)
- CSS-only visual prototype: `profile-prototype-full-scene-1536x1360.png` (same treatment, tested before editing app source)

## Verification

- Red test first reproduced the old 1,036px cap and black-fade layer.
- Focused Profile tests: 35 passed.
- Full suite: 317 tests across 31 files passed. Happy DOM logs its existing PDF iframe teardown AbortErrors; test exit code is 0.
- `npm run build`: passed; Vite reports the existing >500kB JS chunk advisory.
- `git diff --check`: passed.

This fixes the visible flat-black lower band; it does not imply owner acceptance of the broader Profile design. Journey and other owner-positive surfaces were not changed.
