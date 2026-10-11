# Sonnet V8 J assembly and identity comparison

**Implementation status:** integrated in the current Pass 03 worktree; owner review remains open. The static mark comparison is review material only and does not promote a permanent site identity.

## Source and implementation

- **Editable identity:** Figma Sonnet V8, `3325:191`, with the layered mark at `3325:335` and component layers `3325:336–343`, `3325:411–412`.
- **Seven-state motion storyboard:** file `9zvk9iSRPKSsJ6llDJrQmA`; authored key poses at `3681:2`, `3681:248`, `3681:503`, `3681:774`, `3681:1065`, and `3681:1383`. The settled V8 pose remains the static endpoint. These are key poses, not sequential full-frame images.
- **Figma motion layers used:** seam light `3681:990`, light exits `3681:1005`, conduit `3681:1014`, pulse glow `3681:1063`, and pulse core `3681:1064`. Their source SVGs are retained under `public/media/opening/j-sonnet-motion-v8/figma-motion/`.
- **Implementation:** `src/Opening.tsx` layers the authentic V8 material with editable crown, shaft, and hook SVGs on a common 468×468 canvas. `src/opening.css` interpolates between the Figma poses with CSS transforms, opacity, SVG mask/gradient effects, and vector dash motion. No state-image swapping, sprite sheet, or animation dependency was introduced.
- **Seam treatment:** the Figma seam-light export includes long light rails beyond the letter. The portfolio applies the original layer through the V8 J-face mask so the rails do not read as stray beams outside the identity. The flowing highlight follows the short authored crown and hook joint paths; the Figma conduit and light-exit layers supply the surrounding energy.

## Motion contract

Normal Opening duration is **5,000ms**. The 180 radial ticks complete one clockwise revolution from **600ms to 3,800ms** while the Opening scene remains visible. The approved scene, Skip control, and Home handoff are unchanged.

| Stage | Time | Treatment |
|---|---:|---|
| Dormant fragments | 0–760ms | Crown, shaft, and hook are visible at the authored Figma dormant opacities: `.30`, `.38`, `.30`. Each keeps its final material detail. |
| Approach | 760–2,240ms | Pieces move independently with staggered starts at 760/860/960ms. Each uses a continuous 1,280ms cubic-bezier transform, passes through its intermediate key pose at 64%, and reaches its exact lock offset. The fragment opacity brightens with the motion instead of hiding the first pose. |
| Mechanical lock | 2,040–2,240ms | The hook is the final piece to seat. The settled V8 layers begin their crossfade only after the hook arrives, avoiding an early complete silhouette under the fragments. |
| Cyan activation | 2,240–2,850ms | The orb illuminates; the masked Figma seam/conduit art comes up; short cyan vector highlights travel along the crown and hook joints, followed by the stem and lower-hook conduit paths. Figma light exits and the central pulse glow/core activate briefly. |
| Fused J | 2,350–3,150ms | The complete layered V8 J resolves under the joined fragments. The seam/light layers fade out while the material silhouette stays aligned. |
| Material sheen | 3,100–4,050ms | A restrained masked highlight crosses the assembled face once. |
| Settled hold | 3,800–5,000ms | The completed J remains clean and centered through the Home handoff. |

The vector highlight uses the original joint coordinates with a short dash that advances from one end of each joint path to the other. The dormant, approach, lock, light, and fused poses are continuous CSS/vector states; there is no seven-image crossfade.

## Browser evidence

All evidence was captured with installed Chrome through Playwright against the current Vite worktree at **1920×1080**, plus a narrow **390×844** activation state:

- [Full Opening browser recording](captures/opening-full-browser-sequence-1920x1080.webm) — includes the complete 5s opening and Home handoff.
- [Dormant fragments](captures/opening-start-dormant-1920x1080.png)
- [Approach pose](captures/opening-quarter-approach-1920x1080.png)
- [Mechanical lock](captures/opening-lock-1920x1080.png)
- [Cyan activation](captures/opening-cyan-joint-activation-1920x1080.png)
- [Pulse flow](captures/opening-pulse-flow-1920x1080.png)
- [Fused-J transition](captures/opening-fused-j-transition-1920x1080.png)
- [Material sheen](captures/opening-material-sheen-1920x1080.png)
- [Settled hold](captures/opening-final-settle-1920x1080.png)
- [Narrow activation](captures/opening-mobile-activation-390x844.png)

The sampled browser frames show the fragments remaining visible at entry, independent approach, completed hook lock, cyan joint activation, crossfade to the fused mark, and final settle. No broken image, failed request, page error, or horizontal overflow appeared in the recorded desktop or narrow checks. Skip navigated directly to `/home`. Under `prefers-reduced-motion: reduce`, the settled J was present at opacity 1 and the pieces were hidden before the short Home handoff.

The current recording and sampled states are implementation evidence, not owner acceptance. The owner should still judge the character of the assembly and select any permanent static logo treatment.

## Permanent-logo comparison — review only

[Open the three-variant comparison board](logo-comparison.html). It uses the V8 artwork and actual portfolio-style backgrounds, with samples at header 82px desktop / 42px narrow, Activity 48px identity / 26px row, 16px compact check, and a large presentation scale. The 16px optical glyph is identified separately as a Figma reference, not substituted into a candidate.

| Placement | Current recommendation | Reason |
|---|---|---|
| Large identity / presentation | **Variant 02 — settled J + orb + subtle joint glow**, as a review candidate | The cyan detail adds a restrained forged finish at a scale where the joins can still be read. Variant 01 remains the calmer fallback if the tint is too active against a particular surface. |
| Header 82px / 42px | **Variant 01 — settled J + V8 orb** | The portal provides the V8 atmosphere while the J remains the primary read. The subtle joint overlay is not needed for navigation-sized branding. |
| Activity identity 48px | **Variant 01 — settled J + V8 orb** | The orb still reads at this size and remains visually consistent with the header. |
| Activity row 26px and 16px compact mark | **Variant 03 — ring-free settled J**, using the existing optical glyph at 16px | Removing the orb protects the J silhouette inside the small rail enclosure. |

These are placement recommendations, not an approval to change the permanent brand. The three static options and all archived J candidates remain preserved for owner comparison.

## Verification

- Focused `src/Opening.test.tsx`: **13 passed**.
- Installed Chrome: desktop full sequence recorded, sampled stages inspected, and Skip/reduced-motion/narrow behavior exercised.
- Asset report: all 16 J/orb/motion images loaded; zero failed requests or page errors; 390px viewport had `scrollWidth === 390`.
- Overall portfolio goal and owner identity approval remain open.
