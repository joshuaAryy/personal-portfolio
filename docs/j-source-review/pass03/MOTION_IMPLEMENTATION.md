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
- **Variant 03 — seamless standalone J:** accepted for compact portfolio identity and very small J placements, with the authored optical variants. Activity project/experience rows continue using their own project identity assets.
- **Variant 02 — settled J with a painted seam overlay:** rejected. It remains excluded from permanent identity usage.
- Resume Found uses the standalone J inside its existing mechanism and does not add another orb ring.

The comparison board at `logo-comparison.html` presents only the two accepted permanent treatments at their implemented header and Activity sizes/backgrounds. State 05 is shown separately using its genuine segmented storyboard artwork as a transient motion pose, not as a static-logo candidate. The current desktop and narrow site captures are [`home-1440x900.png`](captures/owner-identity-audit-2026-10-11/home-1440x900.png) and [`home-390x844.png`](captures/owner-identity-audit-2026-10-11/home-390x844.png). The 54px Portfolio header uses Variant 01 on desktop; the 48px Activity identity is visible at desktop, while the compact mobile header uses the 32px Variant 03 optical glyph. The comparison board does not change app code or production identity.

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

The rejected settled-J-plus-painted-seam overlay has been removed from the comparison board. The board now juxtaposes only the accepted settled lockup and standalone J at actual display sizes, while the genuine segmented State 05 image remains an Opening-only pose. The [1440×1500 placement capture](captures/identity-variants-1440x1500.png) includes prominent and compact identity samples on the actual header and Activity backgrounds. No permanent identity source or feature placement changed in this correction. The 48px Activity lockup remains reviewable in the live feature Preview; the production archive remains unchanged.

## State 06 sheen fidelity correction — 2026-10-11

Chrome comparison exposed a dark vertical backing in the previous State 06 sheen export that was absent from Figma. The runtime no longer loads that PNG. The replacement is a transparent CSS band, clipped to the authored Figma polygon (`M228 30 L276 30 L244 420 L196 420 Z`) and carrying only the moving white/gold highlight. This changes the sheen surface only; it preserves the five-second timeline, piece assembly, orb/ring, tick revolution, reduced-motion behavior, Skip, and Home handoff.

The corrected controlled State 06 frame at 3.720s shows the highlight at opacity `.84`, without the former dark stripe. A [before frame](../../site-render-review/2026-10-11-opening-fidelity/final-j-fidelity-pass/center-crops/s6-sheen-3720ms.png) and [corrected frame](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/center-3720ms-720x640.png) show the difference. The sheen clears by the 4.100s settled pose; the blue portal and gold ring are fully visible and remain paired with the fused J. The [seven-state Figma/Chrome comparison](opening-seven-state-comparison.html) uses seven controlled frames from this same current implementation. Its [1440px full-page capture](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/seven-state-comparison-1440x-full.png) shows each pose beside its original Figma state.

The [uninterrupted Chrome recording](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/opening-full-1920x1080-through-home.webm) runs through `/home`. Controlled frame/state, viewport, and resource checks are recorded in [`owner-review-capture-report.json`](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/owner-review-capture-report.json). The [tick-revolution gallery](../../site-render-review/2026-10-11-opening-fidelity/sonnet-v8-sheen-fix-final/tick-revolution/index.html) shows the visible field at 0°, 90°, 180°, 270°, and 360° while the Opening remains visible; the accompanying report records the live CSS animation and actual browser matrix at each pose. Chrome shows all opening images loaded with no console, page, request, or HTTP errors. The 1920×1080 and 390×844 reduced-motion stills hold the settled J+orb for 1.5s only in the screenshot context so the static appearance can be inspected; a separate unmodified reduced-motion session verified the actual quick `/home` handoff. Skip also lands on `/home` without retaining the opening route. The 1440×720 and 390×844 motion-placement captures remain linked in that evidence directory.

These comparisons verify source and browser rendering; final visual acceptance remains with the owner in the feature Preview.

## Final J / Opening fidelity capture — 2026-10-11

The latest exact-time comparison is [`opening-seven-state-comparison.html`](opening-seven-state-comparison.html). It pairs all seven Figma storyboard frames with installed-Chrome screenshots captured by pausing the live CSS/Web Animations at 650, 960, 1,370, 2,580, 3,100, 3,720, and 4,100ms. The capture directory includes a machine-readable report and adjacent 4,090/4,100ms handoff frames. A separate real-time 1920×1080 Chrome recording runs from the Opening through Home: [`opening-full-chrome-1920x1080.webm`](../../site-render-review/2026-10-11-opening-fidelity/final-current-source-r2/opening-full-chrome-1920x1080.webm).

The five-second Opening retains the approved dark scene, radial tick field, Skip, reduced-motion behavior, and Home handoff. The tick field rotates clockwise through 360° from 0.6 to 3.8s, and the real-time Chrome run observes the complete turn before the Opening exits. The final animation now steps from the assembled fragment composition to the exact canonical Figma J + V8 orb at 4.1s; matched 4.09s/4.10s frames show no visible silhouette or texture jump. The owner-accepted static variants are implemented provisionally: Variant 01 for prominent portfolio identity, Variant 03 for compact placements. Variant 02 (the painted seam overlay) is rejected and excluded. The comparison board records those placements and keeps the genuine segmented State 05 solely as motion artwork. Production archive `159:2` remains unchanged.

Current synchronized CSS/SVG frames show a brief transparent sheen over the fused J; the settled lockup holds the blue portal/plasma and gold orb ring behind the J. The synchronized State 07 capture has no residual pulse spark. The [`final-browser-check.json`](captures/opening-final-chrome-2026-10-11/final-browser-check.json) and its screenshots record short desktop, narrow, reduced-motion, and Skip checks in installed Chrome; all observed image loads succeeded and there were no console, page, or request failures. A previously observed subtle pale fringe at the lower-right edge during the 3.72s sheen pose remains an owner-review note; two source-derived SVG mask experiments caused visible rectangles and were reverted rather than shipping an unverified mask. Final visual acceptance remains open in the immutable feature Preview.

## Owner addendum: cyan activation continuity — 2026-10-11

This bounded follow-up keeps the five-second Opening, J fragment transforms, radial field, V8 orb, and Home handoff unchanged. It adjusts only the joining light choreography: the seam and conduit now begin fading after their activation peak instead of holding at full brightness through the end of the scene, and the seam/conduit travel paths span the Figma activation interval. The authored pulse spark follows the joint path for 800ms and remains visible for most of its travel before fading at the endpoint, rather than flashing near the start and disappearing while still moving.

The fresh [seven-state Figma / Chrome comparison](opening-seven-state-owner-addendum.html) points to current captures; installed Chrome reports no missing images. The uninterrupted [1920×1080 opening recording through Home](captures/owner-addendum-2026-10-11-r4/opening-chrome-full-1920x1080-through-home.webm) is 7.04s including the handoff. [Capture metadata](captures/owner-addendum-2026-10-11-r4/capture-report.json) records the five-second scene, 600–3,800ms 360° clockwise tick rotation, each Figma key-pose sample, responsive states, reduced-motion state, Skip route, and zero browser/request errors. The [actual recording frame review](captures/owner-addendum-2026-10-11-r4/recorded-video-review.json) samples the joint lock, cyan activation, sheen, settle, and Home transition from the captured browser video.

The [identity placement board](logo-comparison.html) shows the two accepted static treatments at the Portfolio header and Activity sizes: settled J + V8 orb, and standalone settled J. The genuine segmented State 05 art remains below as a transient Opening pose. The comparison recommends the settled orb lockup for prominent identity and the standalone optical J for compact placements. The placement captures are in [`owner-addendum-2026-10-11-r4`](captures/owner-addendum-2026-10-11-r4/).

## Current source reconciliation — owner identity and orb persistence

The current owner direction supersedes the exploratory comparison described immediately above: Variant 01 (settled J + V8 orb) and Variant 03 (seamless standalone J) are the only permanent choices. Variant 02, the settled lockup with a seam-light overlay, is rejected and has been removed from the static comparison board. The board retains the authentic, segmented Figma State 05 frame only as a transient Opening pose. It does not present a painted or overlaid J as a permanent option.

The live callsites are in `src/data.ts` and `src/PortfolioLayout.tsx`. `portfolioIdentity.mark` resolves to `public/media/identity/sonnet-v8/figma-export/canonical-lockup.png` (Variant 01); the desktop Portfolio header displays it at 54px, and the larger Activity identity displays it at 48px (40px in the opportunity rail). At widths up to 760px, the header `<picture>` switches to `portfolioIdentity.mark32`, the authored Variant 03 optical glyph at `public/media/identity/sonnet-v8/figma-export/optical-32.png`. Activity project/experience rows use their project-specific canonical marks rather than a portfolio J. `mark16` is defined for future tiny placements but has no live application callsite. The app does not promote the exploratory seam-overlay comparison.

At HEAD `4daee35`, the owner attachment's report that `.opening__j-orb` fades to zero by 68% does not describe the current source: that selector is absent. The current `src/Opening.tsx` keeps the portal/plasma, orb ring, and contact shadow as separate layers inside `.opening__j-assembly`. In `src/opening.css`, portal and ring reach opacity 1 by 60% (3,000ms) and hold through 100%; contact shadow reaches 1 by 51.6% and holds. The activation bloom and seam/conduit effects are temporary. At 82% (4,100ms), the exact canonical J + V8 lockup takes over as the assembled layers hand off together. Current installed-Chrome timeline measurements record portal/ring opacity 1 at 3,100ms, 3,720ms, and 4,100ms, with the final lockup visible at 4,100ms. The matching seven-state board and the uninterrupted 1920×1080 run show no visible silhouette pop at the settled handoff; the orb remains present through the Home transition.

Current site captures at desktop and narrow sizes are in [`owner-identity-audit-2026-10-11`](captures/owner-identity-audit-2026-10-11/). The [seven-state Figma/Chrome comparison](opening-seven-state-owner-addendum.html), [identity placement board](logo-comparison.html), and [`owner-addendum-2026-10-11-r4` browser record](captures/owner-addendum-2026-10-11-r4/) retain the detailed motion evidence. No Opening/CSS or static identity source change was warranted in this reconciliation; `Opening.test.tsx` now guards the two accepted permanent variants, exact live callsites, and motion-only State 05 treatment.

## Owner-directed motion fidelity update — 2026-10-11

This update supersedes the earlier two-option identity-board text above. The owner requested a three-way review of settled J + V8 orb, that same lockup with restrained authored cyan joint detail, and the settled standalone J. The new Variant 02 uses the Figma-authored `seam-light.svg` over the canonical J with the same mask and placement geometry used by the Opening. It appears only in `logo-comparison.html`; it has no live identity callsite. Variant 01 remains the current prominent identity, and Variant 03 remains the compact optical family. This is a review comparison, not a permanent identity approval.

The latest owner direction confirms that the seven Figma frames are key poses, not seven images to swap. The editable rig has no native motion tracks, so the code derives continuous piece motion from its three editable source layers and the authored Figma seam/conduit assets. No static frame swapping or new motion dependency is used.

The targeted correction brings crown, shaft, and hook to the authored alignment pose at approximately 1,370ms: each retains only a small residual transform there, then settles continuously to the exact shared silhouette by approximately 2,580ms. The fragments remain fully visible through the join and cyan activation. They begin crossfading to the seamless fused J at 3,200ms and finish by 3,600ms; the authored seam light continues fading through 3,700ms. The existing 5,000ms scene, single 360-degree clockwise tick revolution from 600–3,800ms, orb/background, sheen, reduced-motion treatment, Skip, and Home handoff are unchanged.

Focused coverage: `src/Opening.test.tsx` checks the alignment pose, crossfade overlap, seam/conduit timing, and unchanged scene/tick behavior. `src/JIdentityReview.test.ts` checks the three review treatments and the review-only boundary. The focused tests pass (16 tests across both files); `npm run build` and `git diff --check` pass. The comparison board references the original Figma State 05 capture and renders the three static treatments at 54px header, 48px Activity, 40px opportunity rail, and compact-size checks.

Visual acceptance remains owner-review open. Existing Chrome recordings and prior captures remain preserved; they predate this latest timing adjustment and must not be cited as recordings of the new code. The current runtime environment blocks local-address navigation in its computer-use browser, so the changed render still requires verification on the authorized immutable feature Preview before this update can be called browser-verified. The candidate identity board is deliberately marked review-only.
## Deployed feature Preview verification — 2026-10-11

The build at source commit `ea349e0f44d30933983f71d13faf4574ca819a06` is live at [immutable feature Preview](https://6d0708b5.joshuaik2.pages.dev/). It was inspected in the Codex in-app Chromium browser at 430×1252. The requested desktop override did not change this browser context's viewport, so this pass has no new desktop-size browser capture; earlier 1920×1080 Chrome artifacts are retained as historical context, not evidence of the latest timing edit.

The live CSS transform for the radial tick field was sampled at 600, 1,400, 2,200, 3,000, and 3,800ms. The corresponding clockwise angles were approximately 3.8°, 105.1°, 204.6°, 304.1°, and 0° (the completed 360° turn). Browser frames showed the separated fragments at entry, near-alignment at the 1.4s pose, cyan seam activation, the fused J after the crossfade, and the final lockup. The fused-J opacity and fragment opacity were complementary through the transition; the final lockup is settled before the end of the five-second scene. Portal, ring, contact shadow, fragment, and authored seam/conduit images all reported `complete` with nonzero natural dimensions; the browser error log was empty.

Skip navigated directly to `/home`; natural playback navigated to `/home` after the five-second Opening. Reduced-motion code and focused assertions are unchanged by this correction and pass in the test suite, but reduced motion was not separately emulated in the browser during this pass. The viewport limitation also means narrow behavior is visually checked while desktop motion remains owner-review open.

The browser-control interface used here exposed still screenshots and DOM inspection, but not a downloadable screen-recording capability. Therefore no new full-run video file was saved. Existing video recordings remain preserved, but they predate this final alignment/crossfade adjustment and are not represented as recordings of commit `ea349e0`.

## Latest owner addendum: fuse timing and permanent-mark comparison — 2026-10-11

This addendum supersedes the immediately preceding two-option board status. The owner has explicitly requested a fresh three-way static comparison: (1) settled State 07 J + V8 orb, (2) settled J + V8 orb with restrained cyan joint detailing sourced from the State 05 seam-light layer, and (3) seamless standalone J. Variant 02 is a comparison-only candidate, has no live callsite, and is not a permanent identity decision. The older Variant 02 overlay that the owner rejected is not treated as accepted; this new comparison is provided for fresh review using the authored Figma seam art. The canonical live identity sources remain unchanged.

The opening remains a five-second continuous assembly using the authored crown, shaft, and hook pieces. The fused-J handoff is aligned to the Figma join: fragments stay fully visible through 2.58s, crossfade through 2.66s, and clear when the canonical J reaches full opacity at 2.74s. The authored seam light peaks at 2.58s, fades to 0.7 at 3.0s and 0.1 at 3.6s, and clears by 3.9s. The conduit rises from 0.15 at 2.58s to full intensity at 3.05s, then fades to 0.35 at 3.6s and clears by 3.9s. The V8 portal, plasma, gold ring, and contact shadow remain integrated with the final J. The 360-degree clockwise tick turn from 0.6–3.8s, reduced motion, Skip, and Home handoff remain unchanged.

Focused regression tests pass for the authored join interval, persistent orb layers, accepted live identity callsites, and the three review treatments. Fresh installed-Chrome comparison and recording of this exact source revision are still required before calling the changed visuals verified. Existing recordings and screenshots are retained as historical evidence and are not claimed as captures of the new timing.

## Owner-directed State 05 continuity correction — 2026-10-11

The owner clarified that the seven storyboard frames are key poses in one continuous animation and that the J's segmented mechanical character must remain perceptible through the active lock/pulse moment. The source file has a timing conflict: the pose table places State 05 around 3.00–3.20s with the crown, shaft, and hook still at full opacity, while the separate `LOCK + FUSE` paragraph says to finish the fused-J reveal by 2.74s. That earlier fusion makes the runtime already seamless during the State 05 pose, contrary to both the storyboard image and the owner's explicit continuity direction.

The current implementation follows the State 05 pose and owner direction: fragments remain fully visible through 3.20s; the exact same canonical J asset fades in underneath them from 3.20–3.36s to fill the authored joint gaps; only after the fused artwork is fully present do the clipped fragments fade out from 3.36–3.60s. The J is therefore fully seamless before the 3.72s sheen pose. No piece artwork, masks, transforms, orb layers, tick timing, overall five-second opening, reduced-motion behavior, Skip, or Home handoff changed. This is a source-faithful continuity adjustment, not a new identity design.

The regression test `holds the physical fragments through activation, then fills their joints before hiding them` was observed failing against the previous early-fuse timing, then passed after the change. A local installed-Chrome capture confirms full fragment opacity at 3.10s and a settled fused J by 3.72s. Its evidence is a worktree candidate until the same checks are repeated against the immutable feature Preview. Final visual acceptance remains owner-review open.
