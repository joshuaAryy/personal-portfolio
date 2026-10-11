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

The comparison board at `logo-comparison.html` remains review material. The placements are still subject to the owner’s final visual review in the site.

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
