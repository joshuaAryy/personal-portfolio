# Crest + Fraymakers Render Sync — 2026-10-04

## Source, Figma, and Preview

- Application source commit: 8a82e9abc45a13b5dd83dda15b48e6b2854f979f.
- Cloudflare Pages Preview deployment: 8bfcb118-f120-4ba0-b1ab-d760c70c9041.
- Preview URL: https://8bfcb118.joshuaik2.pages.dev/; production was not targeted.
- Browser: Playwright 1.63.0 with installed Chrome 153.0.8010.53.
- Current Crest review frame 3286:813; current Fraymakers review frame 3286:1031.

## Route checks

Both /projects/crest and /projects/fraymakers were opened at 1920×1080 and 390×844. All four runs returned HTTP 200. Crest loaded 16/16 images at each size; Fraymakers loaded 14/14 at each size. No console, page, failed-request, or HTTP error events appeared. Document and main-content widths matched each viewport.

Crest’s five chapter links each resolved to one target and updated the matching active state. Fraymakers’ five links each resolved to a unique target and set the expected URL fragment.

## Story coverage and visual comparison

Current Figma and the Preview show Crest’s expense-review product, deterministic finance signals and retrieved-policy path into human review, separate Finance Q&A/reporting, the standalone policy-PDF retrieval sequence, Joshua’s bounded ownership, the Brim Financial Challenge placement, and the presentation lesson. At 390px the policy stages and evidence cards stack without horizontal overflow.

Fraymakers shows the full path from match context through YAML overrides and match-to-video mapping into thumbnail.js/node-canvas output. The seven compositor inputs, aliases/P2 mirroring/long names/missing assets, match-specific YAML, Joshua’s later contribution versus his brother’s foundation, real-VOD use, and unfinished YouTube upload prototype remain visible. Its four pipeline stages stay ordered on narrow screens and all seven input tiles wrap without horizontal overflow.

Figma exports: [Crest 3286:813](render-sync/2026-10-04-crest-fray-preview-8a82e9a/crest-current-3286-813.png) and [Fraymakers 3286:1031](render-sync/2026-10-04-crest-fray-preview-8a82e9a/fray-current-3286-1031.png).

Desktop viewport/full-story and 390px viewport/full-page captures: [Crest](render-sync/2026-10-04-crest-fray-preview-8a82e9a/crest-desktop-full-page.png) and [Fraymakers](render-sync/2026-10-04-crest-fray-preview-8a82e9a/fraymakers-desktop-full-page.png). Desktop full-story captures temporarily expand the internal #main scroller with capture-only CSS. Narrow full-page captures use natural document scrolling. Browser measurements and checks are in [evidence.json](render-sync/2026-10-04-crest-fray-preview-8a82e9a/evidence.json).

One bounded UI difference remains visible: the current React Crest caption includes an existing WATCH DEMO link that is not shown in the Figma review-frame export. It was left unchanged in this render check; owner review remains open. No story or layout redesign was made.
