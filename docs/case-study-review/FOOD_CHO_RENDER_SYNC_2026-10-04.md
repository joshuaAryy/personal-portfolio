# Food Tracker + Cho’Veigo Render Sync — 2026-10-04

## Source and Preview

- React and test source: commit 8a82e9abc45a13b5dd83dda15b48e6b2854f979f.
- Clean Cloudflare Pages Preview deployment: 8bfcb118-f120-4ba0-b1ab-d760c70c9041.
- Immutable URL: [8bfcb118.joshuaik2.pages.dev](https://8bfcb118.joshuaik2.pages.dev/).
- Branch alias: [feat-portfolio-integration.joshuaik2.pages.dev](https://feat-portfolio-integration.joshuaik2.pages.dev/).
- Browser: Playwright 1.63.0 with installed Chrome 153.0.8010.53.
- Food Figma review: 3286:2; Logging/Insights references 3502:3–55.
- Cho’Veigo Figma review: 3286:603; “Inputs That Stay Distinct” row 3503:38–51.
- The deployment is a Preview. Production was not targeted.

## Render and interaction checks

Both /projects/food-tracker and /projects/choveigo were opened at 1920×1080 and 390×844. All four runs returned HTTP 200. Food loaded 18/18 images at each size; Cho’Veigo loaded 15/15 at each size. No console, page, failed-request, or HTTP error events were recorded. Document width and main content width matched the viewport at both sizes.

Food’s rendered Logging title is “One meal, several ways to get started.” and its Insights eyebrow is “INSIGHTS.” At desktop width, five logging paths connect into the shared Review Before Save card. At 390px, individual branches and the list trunk are hidden and one centered vertical connector leads into that card. All nine chapter links were activated. CLOSE was active at the bottom; RESULTS was active three pixels before the end threshold.

Cho’Veigo’s “INPUTS THAT STAY DISTINCT” row appears after the architecture diagram and before the deterministic/model boundaries at both widths. Its role-record and profile/resume-evidence cards sit side by side on desktop and stack at 390px.

## Visual evidence

The desktop viewport captures show the page in its normal shell. Desktop full-story captures temporarily expand the app’s internal #main scroller with injected capture-only CSS; this override is not part of the deployed site. Narrow full-page captures use the document’s natural page scrolling.

- Food: [desktop viewport](render-sync/2026-10-04-food-cho-preview-8a82e9a/food-desktop-viewport.png), [full story](render-sync/2026-10-04-food-cho-preview-8a82e9a/food-desktop-full-page.png), [390px full page](render-sync/2026-10-04-food-cho-preview-8a82e9a/food-narrow-full-page.png).
- Cho’Veigo: [desktop viewport](render-sync/2026-10-04-food-cho-preview-8a82e9a/cho-desktop-viewport.png), [full story](render-sync/2026-10-04-food-cho-preview-8a82e9a/cho-desktop-full-page.png), [390px full page](render-sync/2026-10-04-food-cho-preview-8a82e9a/cho-narrow-full-page.png).
- Route, image, overflow, interaction, and viewport measurements: [Preview evidence JSON](render-sync/2026-10-04-food-cho-preview-8a82e9a/evidence.json).
- Final local-source captures and evidence: [local render set](render-sync/2026-10-04-food-cho-local-final/).

## Disposition

The concrete Food logging/Insights copy and connector differences and the missing Cho’Veigo input row have been synced. These checks do not close owner review. Cho’Veigo’s separate Figma role-source wording follow-up remains open. Accessibility-tree/screen-reader review remains a separate check. No claim of owner approval or production deployment is made.

## Current Preview follow-up — app source `be5a89b`

After the Education update was deployed to the feature Pages Preview, `/projects/food-tracker` and `/projects/choveigo` were rechecked at 1920×1080 and 390×844 on immutable source `be5a89b`, using Playwright 1.63.0 and Chrome 153.0.8010. Both routes returned HTTP 200; Food loaded 18/18 images and Cho’Veigo 15/15 at each viewport. No browser/request errors, horizontal overflow, clipping, or overlap were observed. All Food hashes resolved; Cho’Veigo’s five anchors settled to their own active states. Figure accessibility snapshots exposed named diagrams and ordered content. No live screen-reader test was run. A detailed comparison of the current Figma frames and Preview is recorded below.

At the Food story limit, `CLOSE` is the active chapter; `RESULTS` is active three pixels before the end threshold. Clicking `LEARNING` reaches its `#food-workflow` target, then `CLOSE` becomes active at the shared scroll limit. This matches the previously recorded end behavior. Cho’Veigo selects `WHAT CHANGED` at the end with ordinary 500px wheel steps or a single 800px/1200px wheel input. An artificial 20,000px wheel delta briefly retained the preceding `HUMAN REVIEW` marker; this did not persist with normal input and is recorded as a synthetic overshoot.

Current Preview captures and machine-readable evidence: [be5a89b evidence folder](render-sync/2026-10-04-food-cho-preview-be5a89b/). The prior Figma/render set remains at source `8a82e9a` above.

## Current Figma/Preview comparison — app source `8680eeb`

The live full-page review frames were inspected alongside immutable feature Preview `https://723c7b0d.joshuaik2.pages.dev`: Food `3286:2` (1920×4760; screenshot export 1614×4000) and Cho’Veigo `3286:603` (1920×3535). Chrome 153 captured `/projects/food-tracker` and `/projects/choveigo` at 1920×1080 and 390×844. The desktop `main` uses internal scrolling, so the evidence includes sequential desktop folds; narrow evidence captures each full route. Route and geometry details are in [`evidence.json`](render-sync/2026-10-04-food-cho-preview-8680eeb/evidence.json), with Figma and Preview screenshots beside it.

**Observation:** Food preserves the current product-first sequence through logging, Insights, retrieval, in-product evidence, architecture, evaluation, data trust, learning, and close. The five logging paths and shared Review Before Save destination remain visible. Cho’Veigo preserves product, role discovery and candidate evidence, distinct Fit/Eligibility/Recommendation concepts, bounded Gemini interpretation, the Resume Studio handoff, evaluation, and close. The principal figures, selected authentic captures, and story ordering align with the live review frames. No concrete story or figure mismatch was found. No source edit was needed.

**Food photo-flow fact check:** The displayed copy stays within the pinned application source at [`4674e78`](https://github.com/joshuaAryy/food-tracker/tree/4674e78b2ddcd705be323f9bfafb23b95b7848ea): Gemini proposes visible foods and quantities; candidate retrieval and serving rules ground trusted rows; uncertain nutrition estimates are bounded, labeled low-trust, editable, and reviewed before confirmation. The case study makes no accuracy, release, or Joshua-specific authorship claim for this feature. The source README marks some photo-adjudication and failure-path checks as not tested, so no such validation is implied.

At 390px, both routes fit the viewport width and retain their story order. Their chapter rails scroll horizontally; part of the final tab is visible until the rail is scrolled. This is a narrow interaction observation, not a story-content mismatch or a Figma parity claim. Complete narrow captures and current Figma exports are in [the `8680eeb` evidence folder](render-sync/2026-10-04-food-cho-preview-8680eeb/). Owner review remains open; no exact whole-shell pixel-parity claim is made.
