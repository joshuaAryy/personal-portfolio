# Journey Void and Locator Render Sync — 2026-10-04

## Source and Figma

- React source: `6ce2d2ec1a633db2785f29e92f27c723fb8f73a9`.
- Feature Preview: https://dec9be75.joshuaik2.pages.dev/; branch alias https://feat-portfolio-integration.joshuaik2.pages.dev/. Production was not targeted.
- Browser: Playwright 1.63.0 with Google Chrome 153.0.8010.53.
- Current Figma page: Journey `1287:7`, rendered at its native 1920×2004 size. The scene layers are upper Void `1287:8`, lower continuation `3492:2`, and full-length fade `1976:45`.
- Current Figma capture: [`1287:7`](render-sync/2026-10-04-journey-preview-51df1fd/figma-journey-1287-7.png).

## Observed gap and correction

The pre-correction Preview capture is preserved in [the baseline evidence](render-sync/2026-10-04-journey-preview-51df1fd/). At 390px, the Journey layout measured 2203px tall while its background field stopped at 1922px. At page bottom the final card extended 133px beyond the field. Selecting Stush also reached the page-end rule before Stush became active. At desktop, integer scroll rounding left an anchor 0.18px beyond the activation line, so the previous chapter could remain selected.

Commit `6ce2d2e` gives the responsive Void field, lower continuation, and fade the full narrow layout height; it adds 72px of trailing space after the cards so Stush can align on selection. The active-waypoint comparison allows a one-pixel rounding tolerance. No card, story, rail, content, or timeline position changed.

## Current Preview evidence

The [machine-readable evidence](render-sync/2026-10-04-journey-preview-6ce2d2e/evidence.json) and screenshots compare the route at 1920×1080, 1920×2004 (the Figma frame size), and 390×844.

- All three routes returned HTTP 200. All 40 images loaded in each run; no console errors, page errors, failed requests, or bad HTTP responses were recorded.
- No horizontal overflow appeared at desktop or narrow widths.
- All five locator links (`Origin`, `TMU`, `Living in Silico`, `Stush Patties`, and `Summer 2026`) updated the hash and active marker at 1920px and 390px, with one matching target each.
- At 1920×2004, the background spans y=82–2004 and the final card ends at y=1884. At 390px, the background extends to the end of the responsive layout and covers the final card.
- The atmospheric fade remains over the continuing scene; the lower Journey no longer separates into an unbacked dark field.

Screenshots: [desktop viewport](render-sync/2026-10-04-journey-preview-6ce2d2e/journey-desktop-viewport.png), [Figma-sized full route](render-sync/2026-10-04-journey-preview-6ce2d2e/journey-desktop-figma-sized-full-page.png), [desktop bottom](render-sync/2026-10-04-journey-preview-6ce2d2e/journey-desktop-bottom.png), [narrow full route](render-sync/2026-10-04-journey-preview-6ce2d2e/journey-narrow-full-page.png), and [narrow bottom](render-sync/2026-10-04-journey-preview-6ce2d2e/journey-narrow-bottom.png).

## Review boundary

The accepted story and identity/right rails were preserved. The current Figma frame and React route still use different common-shell/profile-rail treatments; this background and locator pass does not claim whole-shell pixel parity or owner acceptance. No broader Journey redesign was made.
