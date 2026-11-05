# Cho’Veigo · product-first pass 04 · Figma/source review · 2026-09-29

## Current design

Cho’Veigo now opens with the product name and purpose, followed by the owner-cleared static Recommendations view at full content width. A six-stage matching path connects role evidence to the next action, then the page explains the whole product architecture before Joshua’s matching-model work, human-reviewed regression process, and learning close.

The full Figma body `1813:419` is 1,560×3,586 px. The opening `1817:425` is 1,560×1,319 px. The Recommendations image `1817:424` is 1,432×806 px, using the existing authentic capture without edits. The matching path is grouped in the opening frame. The architecture frame `2858:2` is 1,432×320 px; its input evidence, deterministic Fit and Eligibility checks, bounded Gemini interpretation, recommendation, and separate resume-tailoring action remain visible together.

The product and system copy describes the workflow directly. Early contribution framing is removed from the hero; Joshua’s matching-model and evaluation work follows the product explanation.

## Captures

- [Figma opening](choveigo-pass-04-figma-opening-2026-09-29.png)
- [Complete Figma page](choveigo-pass-04-figma-full-2026-09-29.png)

## Source sync and review state

`ChoViegoCase.tsx` and `cho-evidence-worksheet.css` implement the same public sequence and expanded architecture. `npm run build` passes (76 modules transformed). No tests were run.

The Browser service reported no available browser in this session, so no live site screenshot or site-to-Figma comparison was captured. Website rendering, responsive review, and route acceptance remain open; this record covers the Figma revision and source sync only.


## Follow-up: curated evidence note and attribution, 2026-09-29

Owner review identified a need for one compact, visitor-facing example of an evidence gap and tighter attribution around regression fixtures. The authentic Recommendations capture `1817:424` is unchanged. A separate note now sits immediately below it: "A listed skill may have no reviewed resume evidence, so its gap stays visible," labeled "Illustrative - not a model score." This keeps the example clear without implying measured model output.

The review section now says Joshua and Shiv reviewed mismatches and agreed expected behavior; human review informed deterministic regression fixtures for later changes. The learning copy no longer assigns fixture implementation or maintenance solely to Joshua. The discovery anecdote is labeled "Owner-reported example." The full body remains `1813:419` at 1,560x3,586; node positions and copy were confirmed in Figma. The pass-04 full-page capture predates this follow-up, and no new full-page capture was available for this small delta. Website render comparison and responsive review remain open.


## Pass 05: product-name opening and desktop site review — 2026-09-29

The opening now labels the surface `PRODUCT`, names the product `Cho’Veigo`, and says what it does in one sentence before the Recommendations view. This replaces the generic “Job discovery” hero title and keeps the existing full-width authentic UI, evidence-gap note, six-stage path, and architecture. The current body remains `1813:419` at 1,560×3,586; the opening is `1817:425`, the Recommendations view is `1817:424` at 1,432×806, and the whole-product diagram is `2858:2` at 1,432×320.

The site was rendered at 1920×3950 to [the complete desktop capture](choveigo-site-full-2026-09-29-pass05.png). The product name and purpose lead; the Recommendations view is large and framed at full content width; the matching path and product architecture precede Joshua’s implementation and evaluation work. The rest of the story is present through the learning close. The Recommendations capture is the same authentic, slightly soft source image in Figma and site. A static desktop structure review is clear. The Figma screenshot endpoint returned a 938px crop even when asked for the 3,586px body, so the cropped probe is not treated as full-page parity evidence.

Responsive sizing, live focus/keyboard behavior, and route acceptance remain open. No tests or build were run for this pass.

## Owner steering follow-up: demo image finish

The story sequence, matching path, and architecture remain clear in the available static desktop evidence. The Recommendations layout is full-width and uncropped, but the authentic source file is only 864×486 and is displayed at 1,432×806. Small interface text is soft at that enlargement, and the source cursor is visible over the role list. The matching-path strip has appropriate secondary weight beneath the demo; the full-width 1,432×320 architecture figure communicates the system quickly after it. The local Demos copy is byte-identical, and no higher-resolution authentic image exists in the workspace. Keep the existing product capture only if no sharper authentic source is supplied; image-finish clearance remains open.
