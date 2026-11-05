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

## Fraymakers chapter navigation follow-up — 2026-10-04

A later render of Preview source `be5a89b` exposed the desktop chapter rail clipping the final `OUTCOME` label to `OU` at 1920×1080. The wide-screen first grid track was 410px while the five labels needed 445px. Commit `ff23eed` raises that track to 446px and adds a focused regression check; the 410px version failed the check and the 446px version passed.

The immutable Preview at [4684a5d6.joshuaik2.pages.dev](https://4684a5d6.joshuaik2.pages.dev/) serves source `ff23eed`. Chrome 153 / Playwright 1.63 confirmed the deployed CSS rule, HTTP 200, 14/14 images, and no console, page, request, response, or document-width errors at 1920×1080 and 390×844. On desktop the rail is 446/446px and all five links fit; `OUTCOME` ends at x=509.25 inside the rail ending at x=510. At 390px the rail remains horizontally scrollable (405px content / 346px viewport), wheel input advances it, and Tab reaches `OUTCOME` with visible focus. The measured final text edge is 0.25px beyond the rail edge after scrolling; the capture shows no visible clipping. This is a narrow fractional geometry measurement, not document overflow.

Post-fix Preview captures and measurements: [desktop viewport](render-sync/2026-10-04-fraymakers-nav-fix-preview-ff23eed/fraymakers-nav-preview-1920x1080-viewport.png), [narrow viewport](render-sync/2026-10-04-fraymakers-nav-fix-preview-ff23eed/fraymakers-nav-preview-390x844-viewport.png), [narrow keyboard focus](render-sync/2026-10-04-fraymakers-nav-fix-preview-ff23eed/fraymakers-nav-preview-390x844-outcome-focused.png), and [evidence JSON](render-sync/2026-10-04-fraymakers-nav-fix-preview-ff23eed/fraymakers-nav-fix-preview-evidence.json). The earlier `8a82e9a` screenshots remain historical. Owner review remains open.

### Anchor position and active chapter state

A subsequent 390×844 Chrome check on Preview source `ff23eed` clicked all five chapter links. Each link set the expected fragment and scrolled to its target, but none exposed `aria-current`, an active class, or an active visual marker. The live Figma root `1831:2` shows the selected chapter in gold with a gold underline (Pipeline layers `1831:8/10/11/12`).

The mobile sticky chapter nav is 86px tall. After clicking PIPELINE, its heading occupied y=60.5–112.3, leaving the first 25.5px behind the nav; COMPOSITION and YAML CONFIG headings also began above the nav's lower edge. On desktop the Pipeline heading began at y=141.75 while the nav ended at y=142, a 0.25px overlap. The browser and network logs had no errors. These measurements are recorded in [the chapter navigation evidence](render-sync/2026-10-04-fraymakers-chapters-ff23eed/fraymakers-chapter-nav-evidence.json), with the [narrow Pipeline capture](render-sync/2026-10-04-fraymakers-chapters-ff23eed/fraymakers-narrow-pipeline-anchor.png). Active-state styling and anchor spacing remain open for correction and rerender.


## Fraymakers chapter navigation correction — Preview app commit `835b1a5`

The committed correction was published to the feature Pages Preview at [immutable build `8bb22597`](https://8bb22597.joshuaik2.pages.dev/projects/fraymakers); the branch alias points to the same feature Preview. Production was not targeted. Chrome 153 / Playwright 1.63 served the expected CSS/JS bundle (`index-DbzHfMfR.css` / `index-hHaZnOMc.js`) at 1920×1080 and 390×844.

All five chapter links set their matching fragment and `aria-current="location"`; the active text is gold with a 2px gold underline, matching Figma root `1831:2`'s active-chapter treatment. Each target heading clears the sticky rail. The closest measured gaps are 7.75px on desktop (Pipeline: y=149.75 vs rail bottom 142) and 6.36px narrow (Composition: y=92.36 vs rail bottom 86). A real narrow wheel sequence moved the active chapter COMPOSITION → YAML CONFIG → COMPOSITION at scroll positions 1345 → 2045 → 1345.

Both sizes returned HTTP 200, loaded 14/14 images, had no console/page/request/response errors, and had no document-width overflow. At 390px the chapter rail remains horizontally scrollable (405px content / 346px viewport), and OUTCOME remains keyboard reachable. After horizontal scrolling, its measured right edge extends 0.25px past the rail's computed edge; the browser capture shows no visible clipping. Owner review remains open.

Evidence: [desktop Pipeline](render-sync/2026-10-04-fraymakers-nav-fix-preview-835b1a5/fray-postdeploy-1920x1080-pipeline.png), [narrow Pipeline](render-sync/2026-10-04-fraymakers-nav-fix-preview-835b1a5/fray-postdeploy-390x844-pipeline.png), [narrow full page](render-sync/2026-10-04-fraymakers-nav-fix-preview-835b1a5/fray-postdeploy-390x844-full.png), [anchor and viewport measurements](render-sync/2026-10-04-fraymakers-nav-fix-preview-835b1a5/fraymakers-nav-fix-preview-8bb22597-evidence.json), and [real passive-wheel states](render-sync/2026-10-04-fraymakers-nav-fix-preview-835b1a5/fraymakers-nav-fix-preview-8bb22597-passive-wheel-final.json).
