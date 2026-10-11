# Sonnet V8 J identity and Opening implementation

**Status:** implemented and browser-visual-reviewed on the feature branch; owner acceptance remains open.

## Source of truth

Figma file `9zvk9iSRPKSsJ6llDJrQmA` supplies the editable artwork and motion references:

- Seven-state storyboard: `3713:4`, with key poses `3714:2`, `3714:530`, `3714:1058`, `3714:1575`, `3714:2092`, `3714:2609`, and `3714:3126`.
- Layered 468×468 rig: `3712:2`.
- Canonical J + orb: `3735:2`; canonical standalone J: `3735:516`.
- Motion specification: `3737:2`; export and no-jump notes: `3737:37`.

The seven states are key poses for one continuous animation. Runtime pieces are clipped views of the same transparent canonical J artwork; they are not seven swapped images.

## Figma timing source and runtime decisions

The editable rig (`3712:2`) and written notes (`3737:2`, `3737:37`) were checked directly. Recursive Figma motion-context lookup returned no native animation tracks; the seven frames are visual key poses and the written per-piece/FX timing is a design recommendation, not a wired Figma prototype. Figma explicitly marks the 5-second runtime, 360° tick turn and exact handoff time as unverified assumptions. The owner separately approved the five-second website Opening and visible full tick revolution, so those remain runtime requirements rather than claims about Figma prototype timing.

The website maps the written key poses to continuous CSS motion: S1 0.65s; S2 about 0.96s; S3 about 1.37s; lock 2.58s; fused J crossfade 2.58–2.74s; activation/pulse around 3.0–3.4s; sheen around 3.45–4.0s; settled hold from 4.1s. The full ring rotation runs from 0.6–3.8s as the owner-approved environment motion. Chrome evidence records actual render timestamps and the complete Home handoff. Any timing outside these approved runtime constraints should be judged against the authored state artwork and owner review, not attributed to an unwired Figma timeline.
## Owner decisions for static use

- **Variant 01 — settled J + V8 orb:** accepted provisionally for the portfolio header and larger identity placements.
- **Variant 03 — seamless standalone J:** accepted for compact Activity row and very small identity use, with the authored optical variants.
- **Variant 02 — settled J with a painted seam overlay:** rejected. It remains excluded from permanent identity usage.
- Resume Found uses the standalone J inside its existing mechanism and does not add another orb ring.

The comparison board at `logo-comparison.html` presents the two accepted permanent treatments at their implemented header and Activity sizes/backgrounds. State 05 is shown separately using its genuine segmented storyboard artwork as a transient motion pose, not as a static-logo candidate. Current desktop and narrow Chrome captures are [`identity-comparison-2-approved-1440x-full.png`](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/identity-comparison-2-approved-1440x-full.png) and [`identity-comparison-2-approved-390x-full.png`](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/identity-comparison-2-approved-390x-full.png). The practical recommendation remains Variant 01 for the 54px header and larger Activity identity, and Variant 03 with the optical glyphs for compact placements. The 48px Activity lockup still needs owner confirmation in the actual site because its orb detail is more prominent than the compact row marks. The comparison board does not change app code or production identity.

## Runtime implementation

`src/Opening.tsx` composes the initial lockup, shared-source crown/shaft/hook fragments, V8 portal, gold orb ring, contact shadow, Figma seam/conduit layers, activation bloom, travelling spark, and sheen. `src/opening.css` animates their individual transforms and appearances without a motion dependency or frame-swapped sprite sequence.

The former `orb-ring-2x.png` and `j-contact-shadow-2x.png` exports were opaque white-backed images, which caused rectangular plates over the mark in Chrome. The original Figma SVG layers are preserved. Their matching transparent runtime PNGs were rasterized from those SVGs in installed Chrome at 3× to preserve the authored vector geometry, gradients, noise, and blur while retaining alpha:

- `public/media/identity/sonnet-v8/figma-export/orb-ring-alpha-3x.png` (1057×1057)
- `public/media/identity/sonnet-v8/figma-export/j-contact-shadow-alpha-3x.png` (792×1180)

The portal remains the original Figma export clipped to its circular boundary. The activation bloom is additive and sits beneath the J; it is separate from the persistent portal, ring, and contact shadow.

## Motion timeline

Normal scene duration is **5,000ms**. The opening background, outer mechanism, Skip behavior, reduced-motion behavior, and Home handoff are preserved. The radial ticks complete one visible clockwise revolution from **600ms to 3,800ms**.

| Stage | Time | Runtime treatment |
|---|---:|---|
| Initial lockup / dormant formation | 0–675ms | The canonical J+orb appears first. Its lockup fades as the same-material fragments emerge in their separated poses. |
| Approach | 650–2,580ms | Crown, shaft, and hook begin at 650/700/720ms, pass through the Figma approach and alignment key poses near 960ms and 1,370ms, and reach exact identity at 2,550/2,520/2,580ms. Easing is `cubic-bezier(.22,.70,.20,1)` with no bounce. |
| Mechanical lock | 2,450–2,580ms | Authored joint seams brighten as the final hook seats. The three pieces remain fully visible through the lock. |
| Cyan activation / orb emergence | 2,580–3,900ms | Seam, conduit, light-exit, pulse, and modest bloom effects activate over the joined geometry. The blue portal becomes fully visible by about 3,350ms and remains behind the J and gold ring. |
| Fused-J transition | 2,580–2,760ms | The canonical fused J crossfades beneath the fragments. Fragments disappear only after the fused artwork reaches full opacity. |
| Material sheen | 3,450–4,000ms | A single restrained highlight sweeps across the fused J. |
| Settled hold / Home handoff | 4,100–5,000ms | The complete canonical J+orb stays together through the scene’s fade to Home. |

## Verification record

Installed-Chrome captures and the uninterrupted recording are under `docs/site-render-review/2026-10-11-opening-fidelity/qa-orb-joint-fixed/rerun-final/`. The corrected orb ring and contact shadow use alpha-preserving PNG exports; the earlier opaque-backed assets and their failed capture remain preserved as historical evidence and are not used by the runtime.

The seven authored Figma key poses are paired with matching runtime captures in [`opening-seven-state-comparison.html`](opening-seven-state-comparison.html). The comparison uses original storyboard exports at 700×620 and centered runtime crops at 720×640. Actual runtime timestamps were 650.5ms, 1000.8ms, 1417.9ms, 2585.5ms, 3102.6ms, 3803.2ms, and 4153.6ms; the small offsets from requested times are recorded in `viewport-keypose-report.json`.

Visual inspection confirms:

- The dormant pose shows the three original gold pieces separated around the orb, and the approach/alignment poses keep those pieces visually distinct.
- The cyan joint outline appears at the seated crown and hook seams; the moving conduit effects follow those authored joints rather than washing over the whole mark.
- The V8 portal/plasma and gold ring become fully visible by the settled phase and remain behind the fused J through the Home handoff. The fixed Chrome capture shows no opaque rectangular backing.
- The sheen reads as a short vertical material highlight across the joined J, then clears before the settled hold. The final shape and portal/ring relationship are consistent with the canonical lockup.

Runtime evidence:

- Full 1920×1080 sequence through Home: `opening-final-uninterrupted-1920x1080.webm`; Home appeared about 5.64s after the opening frame. `rerun-report.json` records the final `/home` route, loaded images, and no page, console, failed-request, or HTTP errors.
- The tick field completed its one clockwise turn at 3800ms, with the capture observing 358.5° at 3904ms and 360° at 3921ms while the Opening remained visible.
- 1440×720 settled capture: `viewport-1440x720-settled-4p1s.png`; the mark remained in bounds and Skip remained visible.
- 390×844 dormant, approach, and settled captures: `viewport-390x844-*.png`; no overflow or browser/request errors were reported.
- Reduced-motion capture: `opening-reduced-settled-1920x1080.png`; the final J+orb appears immediately, the transient bloom is absent, and the tick animation is disabled.

The comparison and browser checks establish implementation/render fidelity only. The owner still needs to review the real feature Preview before any permanent identity choice; production archive `159:2` remains unchanged.

## Opacity-layer fidelity follow-up — 2026-10-11

The full natural Chrome recording exposed a seam-animation opacity issue that was not obvious in the older sampled captures: an animated opacity on the shared `.opening__j-lock` wrapper multiplied the authored seam-light and conduit child opacities. The wrapper now remains at opacity 1; each authored child retains its own keyframed opacity. This keeps the joint activation visible without changing the five-second scene, 360° tick turn, J transforms, or handoff. A focused regression test covers this opacity ownership.

The updated [seven-state comparison](opening-seven-state-comparison.html) uses seven new centered crops from Chrome samples at the authored runtime times 650, 960, 1,370, 2,580, 3,100, 3,800, and 4,100ms. [`qa-opening-corrected-keyposes/report.json`](../../site-render-review/2026-10-11-opening-fidelity/qa-opening-corrected-keyposes/report.json) records sampled transforms/opacities, loaded assets, and errors. The [current full Chrome recording](../../site-render-review/2026-10-11-opening-fidelity/qa-opacity-layer-fix/opening-opacity-fix-full-handoff-1920x1080.webm) runs through the Home handoff; adjacent natural frames were inspected across activation, sheen, and settle. The short vertical material sheen also appears in Figma State 06 and clears to the seamless State 07 lockup.

Desktop samples show no structural silhouette jump. A later full-sequence inspection identified a small transient pale fringe at the lower-right J edge during the 3.72s sheen pose; it clears in the settled pose and is documented below. The 1440×720 and 390×844 placement captures remain in the preceding Chrome run; this source patch changes only seam-layer opacity, not mark sizing or responsive positioning. Skip and reduced-motion logic are unchanged; reduced motion still hides transient join effects and exposes the final lockup immediately. Static identity variants remain owner-directed as above, with final Preview acceptance open.

## Activation bloom backing correction — 2026-10-11

The owner-correction-pass-04 real-time Chrome run exposed a square dark backing around the activation bloom at approximately 3.1s. The source was `orb-activation-bloom-2x.png`: despite its appearance as a glow export, it had an opaque black backing. `src/Opening.tsx` now renders the bloom as a non-interactive span and `src/opening.css` supplies a clipped circular radial gradient using the existing cyan palette. This keeps the bloom's existing timing and layer position while removing the opaque bitmap and its square dimming. A focused regression test prevents reintroducing the bitmap.

The matched before/after frames are `../../site-render-review/2026-10-11-opening-fidelity/qa-orb-joint-fixed/actual-app-3100ms.png` and `../../site-render-review/2026-10-11-opening-fidelity/owner-correction-pass-04/activation-checkpoint-3p1s-1920x1080.png`. Visual inspection shows the prior dark tile is gone; the replacement reads as a round, restrained glow with no hard backing edge. The complete real-time browser capture, including the Home handoff, is `../../site-render-review/2026-10-11-opening-fidelity/owner-correction-pass-04/opening-full-1920x1080-through-home.webm`; the QA report records motion timing, responsive, Skip, reduced-motion, and asset/error checks. This is an Opening rendering correction only; the approved identity variants, motion choreography, five-second duration, tick revolution, Resume Found, and other portfolio surfaces are unchanged.

## Figma-authored portal arrival correction — 2026-10-11

The editable motion specification at Figma `3737:2` sets portal/ring arrival milestones to opacity `.28` at `0.40s`, `.50` at State 02 (`0.96s`), `.70` at State 03 (`1.37s`), `.85` at lock (`2.58s`), and `1.0` by `3.0s`. The prior CSS delayed the same layer to `.05`, `.18`, `.35`, and full opacity only near `3.35s`, so the portal was substantially less visible than the authored poses. The bounded correction changes only `opening-v8-portal-arrive`; the ring, fragment movement, seam activation, sheen, five-second scene, full tick revolution, reduced-motion behavior, and Home handoff are unchanged.

`Opening.test.tsx` was updated first and failed against the previous curve; it passes with the Figma milestones. The Frontend Owner verified the CSS curve at `.40`, `.96`, `1.37`, `2.58`, `3.0`, `3.1`, `3.8`, `4.1`, and `4.55s`. Runtime QA recorded a fresh real-time Chrome run through Home in [`final-j-fidelity-pass`](../../site-render-review/2026-10-11-opening-fidelity/final-j-fidelity-pass/QA-REPORT.md). It observed portal opacity `.378` at 650ms, `.702` at 1,384ms, `.852` at 2,586ms, and `1.0` by 3,103ms; the portal and ring remain visible through the settled hold. The radial field reached 360° around 3,917ms while Opening remained visible. The fresh recording and seven natural-time frames are linked from the [seven-state comparison](opening-seven-state-comparison.html); a precise controlled State 02 still at 960ms supplements the natural run.

## Permanent-mark comparison and owner review

The rejected settled-J-plus-painted-seam overlay has been removed from the comparison board. The board now juxtaposes only the accepted settled lockup and standalone J at actual display sizes, while the genuine segmented State 05 image remains an Opening-only pose. No permanent identity source or feature placement changed in this correction. The 48px Activity lockup remains reviewable in the live feature Preview; the production archive remains unchanged.

## State 06 sheen fidelity correction — 2026-10-11

Chrome comparison exposed a dark vertical backing in the previous State 06 sheen export that was absent from Figma. The runtime no longer loads that PNG. The replacement is a transparent CSS band, clipped to the authored Figma polygon (`M228 30 L276 30 L244 420 L196 420 Z`) and carrying only the moving white/gold highlight. This changes the sheen surface only; it preserves the five-second timeline, piece assembly, orb/ring, tick revolution, reduced-motion behavior, Skip, and Home handoff.

The corrected controlled State 06 frame at 3.720s shows the highlight at opacity `.84`, without the former dark stripe. A [before frame](../../site-render-review/2026-10-11-opening-fidelity/final-j-fidelity-pass/center-crops/s6-sheen-3720ms.png) and [corrected frame](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/center-3720ms-720x640.png) show the difference. The sheen clears by the 4.100s settled pose; the blue portal and gold ring are fully visible and remain paired with the fused J. The [seven-state Figma/Chrome comparison](opening-seven-state-comparison.html) uses seven controlled frames from this same current implementation. Its [1440px full-page capture](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/seven-state-comparison-1440x-full.png) shows each pose beside its original Figma state.

The [uninterrupted Chrome recording](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/opening-full-1920x1080-through-home.webm) runs through `/home`. Controlled frame/state, viewport, and resource checks are recorded in [`owner-review-capture-report.json`](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/owner-review-capture-report.json). The [tick-revolution gallery](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/tick-revolution/index.html) shows the visible field at 0°, 90°, 180°, 270°, and 360° while the Opening remains visible; the accompanying report records the live CSS animation and actual browser matrix at each pose. Chrome shows all opening images loaded with no console, page, request, or HTTP errors. The 1920×1080 and 390×844 reduced-motion stills hold the settled J+orb for 1.5s only in the screenshot context so the static appearance can be inspected; a separate unmodified reduced-motion session verified the actual quick `/home` handoff. Skip also lands on `/home` without retaining the opening route. The 1440×720 and 390×844 motion-placement captures remain linked in that evidence directory.

These comparisons verify source and browser rendering; final visual acceptance remains with the owner in the feature Preview.

## Final J / Opening fidelity capture — 2026-10-11

The installed-Chrome screencast was reconstructed at 25fps into [`opening-full-chrome-1920x1080.mp4`](../../site-render-review/2026-10-11-opening-fidelity/final-owner-j-opening-pass/opening-full-chrome-1920x1080.mp4). The matched natural-time samples and capture notes are in [`final-owner-j-opening-pass`](../../site-render-review/2026-10-11-opening-fidelity/final-owner-j-opening-pass/README.md). The sequence covers separated fragments, crown/shaft/hook approach, mechanical lock, cyan activation, material sheen, the settled J+orb hold, and the fade to Home. This is reconstructed from actual browser screencast output; static intervals hold the last displayed browser frame.

The five-second Opening remains unchanged. The tick field completes one clockwise 360° turn from about 0.6s to 3.8s while the Opening is visible. Chrome and focused tests confirm Skip, reduced-motion, desktop/narrow placement, required assets, and Home handoff. No permanent mark was selected: the comparison keeps Variant 01 (settled J + V8 orb) for prominent identity, Variant 03 (ring-free optical J) for compact identity, and Variant 02 as review-only because its joint light largely disappears at actual small sizes.

The 3.72s sheen frame still has a small pale fringe near the lower-right J edge that is absent from the settled 4.55s pose. Two source-derived SVG mask experiments caused visible rectangular artifacts in Chrome and were reverted. The fringe is recorded as an owner-review limitation rather than hidden by an unverified fix. The final capture preserves it for evaluation. Production archive `159:2` remains unchanged.
