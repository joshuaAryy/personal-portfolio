# Case-study figure semantics render check — 2026-10-04

**Preview:** [source `92d3c26`](https://965f0e82.joshuaik2.pages.dev/), feature branch `feat/portfolio-integration`. Production was not targeted.

**Browser and method:** Chrome `153.0.8010.53`, Playwright accessibility snapshots, DOM checks, and Tab traversal at `1920×1080` and `390×844`. This verifies browser-exposed names, descriptions, landmarks, link reachability, layout width, and load state; it is not a live screen-reader test.

| Route | Figure result | Runtime result |
|---|---|---|
| `/projects/food-tracker` | System figure name is “Food Tracker system map.”; its full description appears once, and the child image has empty alt text. Figure containers are not keyboard stops. | Both viewports returned 200; 18/18 images loaded; no overflow or browser/network errors. |
| `/projects/crest` | Demo figure name is “Expense review / policy context / preapproval”; “WATCH DEMO” is a separate link reached by Tab. | Both viewports returned 200; 16/16 images loaded; no overflow or browser/network errors. |
| `/projects/stush-patties` | The Dimensions heading and list remain visible; no nested `region` landmark is exposed for the Dimensions block. | Both viewports returned 200; 14/14 images loaded; no overflow or browser/network errors. |

No visual regression was apparent in the targeted desktop/narrow captures. This is a scoped semantics check, not a full-page parity claim. Screen-reader announcement order remains unverified because no assistive technology was run.

Machine-readable results, accessibility snapshots, targeted snapshots, and captures are in [the evidence directory](render-sync/2026-10-04-preview-semantics-92d3c26/): [revalidation.json](render-sync/2026-10-04-preview-semantics-92d3c26/revalidation.json) and [targeted-figure-evidence.json](render-sync/2026-10-04-preview-semantics-92d3c26/targeted-figure-evidence.json) are the summary records.


## Current Preview follow-up: Crest and Stush

The immutable Feature Preview at source `ff23eed082f9d9b5048c1955fdaf2e2521286812` was checked in Chrome `153.0.8010.53` with Playwright `1.63.0` at `1920x1080` and `390x844`. Both routes returned HTTP 200, loaded all expected images (Crest 16/16; Stush 14/14), and had no browser/request errors or horizontal overflow.

Crest exposes the figure name `Expense review / policy context / preapproval`; `WATCH DEMO` is excluded from that name and appears as its own link. Tab reaches it after the chapter links and Projects link at both viewports. Stush exposes the five pipeline stages in order. Its Dimensions statement remains visible within the existing section landmark, with no Dimensions-specific nested region. Accessibility snapshots and Tab traversal were checked; no live screen reader was run.

This is a scoped accessibility-tree and interaction check, not a new detailed Figma comparison or full-page parity claim. Production was not targeted. Current evidence is in [the Preview capture folder](render-sync/2026-10-04-preview-semantics-ff23eed/): [machine-readable snapshot](render-sync/2026-10-04-preview-semantics-ff23eed/figure-semantics-preview-ff23eed.json), [Crest desktop](render-sync/2026-10-04-preview-semantics-ff23eed/crest-1920x1080-viewport.png), [Crest narrow](render-sync/2026-10-04-preview-semantics-ff23eed/crest-390x844-viewport.png), [Stush desktop](render-sync/2026-10-04-preview-semantics-ff23eed/stush-1920x1080-viewport.png), and [Stush narrow](render-sync/2026-10-04-preview-semantics-ff23eed/stush-390x844-viewport.png). Owner review remains open.
