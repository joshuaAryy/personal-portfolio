# Mobile Contact Row Preview QA — 2026-10-04

Target: feature Preview source `8680eeb`, immutable URL `https://723c7b0d.joshuaik2.pages.dev`. Tested with installed Chrome 153.0.8010.53 and Playwright 1.63.0. Served assets: `index-CL_tN48k.js` and `index-CXfw7BD7.css`.

This checks the responsive contact-row adaptation only. It makes no narrow-Figma parity claim.

## Result

- Home `/home` returned HTTP 200 at 390, 650, 900, 901, and 1920px widths; Fraymakers `/projects/fraymakers` returned HTTP 200 at 390px. Home images loaded 32/32 at each width. No console, page, request, or response errors occurred. Document width matched viewport width throughout.
- At 390px on both Home and Fraymakers, the contact row follows the main content at the document end. On Fraymakers, the main ends at document y=3356.08 and the row starts at y=3356.08; the row occupies the final 61px. No overlap was observed.
- The row contains exactly three links: GitHub (`https://github.com/joshuaAryy`, accessible name “GitHub (opens in a new tab)”), LinkedIn (`https://ca.linkedin.com/in/joshua-ary`, “LinkedIn (opens in a new tab)”), and email (`mailto:joshuaaryy@gmail.com`, “Email Joshua”). All three fit within the row.
- Keyboard Tab reached GitHub after seven Tab presses on both 390px routes. `:focus-visible` was true; a 1px gold outline with 2px offset was visible and stayed within the row/viewport. The links remained reachable without a focus trap.
- Breakpoint behavior matched the requested split: through 900px, the mobile row is displayed and the side-rail footer has a zero-sized visible box; at 901px, the mobile row is `display:none` and the rail footer is visible at 682×782, 219×62. At desktop 1920×1080, the mobile row is `display:none`; the rail footer measures exactly x=1601, y=1018, 319×62.

## Evidence

- `mobile-contact-preview-8680eeb-evidence.json` contains route/viewport, link, focus, asset, and error measurements.
- `mobile-contact-preview-8680eeb-breakpoint-end.json` records 650px and 900px page-end states.
- Screenshots: `home-390x844-end.png`, `home-390x844-full.png`, `home-390x844-github-focus.png`, `home-650x844-end.png`, `home-900x844-end.png`, `home-901x844.png`, `home-1920x1080.png`, `fraymakers-390x844-end.png`, `fraymakers-390x844-full.png`, `fraymakers-390x844-github-focus.png`.
