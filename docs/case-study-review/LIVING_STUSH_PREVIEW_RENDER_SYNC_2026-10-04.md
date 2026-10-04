# Living in Silico + Stush Patties Preview Render Sync — 2026-10-04

## Source, Figma, and Preview

- React source commit: 8a82e9abc45a13b5dd83dda15b48e6b2854f979f.
- Cloudflare Pages Preview deployment: 8bfcb118-f120-4ba0-b1ab-d760c70c9041.
- Preview: https://8bfcb118.joshuaik2.pages.dev/; production was not targeted.
- Browser: Playwright 1.63.0 with Google Chrome 153.0.8010.53.
- Current Figma review frames: Living in Silico 3287:2 (1920×2576); Stush Patties 3287:288 (1920×2562).

## Route checks

Both routes were rendered at 1920×1080 and 390×844. All four route/viewport runs returned HTTP 200. Each route loaded 14/14 images at both sizes. No console errors, page errors, failed requests, or bad HTTP responses were recorded. Document, main, and article widths matched their viewport; no horizontal overflow was found.

On desktop, the portfolio shell keeps each story inside the main scroll region; full-story captures expand that region only for capture. At 390px, each page naturally expands vertically and the full-page captures use normal document scrolling. Route geometry and browser measurements are in evidence.json.

## Living in Silico

The current Figma review frame and Preview show three distinct approaches: DeepMol/RNN sequence generation, RDKit/Fragmenstein fragment work, and the unsuccessful REINVENT4 attempt. The separate project-output section reports 500 generated SMILES samples without labeling them valid, unique, or novel. Representation and dataset context remain distinct from curated experiment subsets; Joshua’s work, route outcomes, and learning are present. REINVENT4 does not claim successful generation.

The narrow render keeps the approach cards, output, contribution, and close legible in sequence without horizontal overflow. No concrete macro or responsive mismatch was found.

Figma capture: living-current-3287-2.png. Preview captures: living-desktop-full-page.png, living-narrow-full-page.png, and viewport captures.

## Stush Patties

The current Figma review frame and Preview show the full path from Koyo, UNFI, and Dovre inputs across CSV/XLSX/XLSB formats through parsing, the shared field contract, normalization, standardized outputs, and Power BI handoff. Sales, units, case pack, and reporting month remain the shared dimensions. The temporary Koyo position-and-cell exception returns to the common normalization path. Joshua’s parsing/normalization ownership, the two-person technical team with Shiv, client collaboration, deliverables, and learning are visible.

The narrow layout stacks the pipeline stages and the ownership section without overflow. No distributor-specific file-format assignment or measured business-impact claim was introduced. No concrete macro or responsive mismatch was found.

Figma capture: stush-current-3287-288.png. Preview captures: stush-desktop-full-page.png, stush-narrow-full-page.png, and viewport captures.

## Review status

No React or Figma design changes were made in this pass. The render evidence supports the current accepted breadth direction; owner review remains open. This is visual/runtime evidence, not screen-reader acceptance or a claim of pixel-identical Figma parity.
