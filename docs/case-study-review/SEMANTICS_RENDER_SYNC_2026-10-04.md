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
