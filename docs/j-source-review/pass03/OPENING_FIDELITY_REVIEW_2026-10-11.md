# Sonnet V8 Opening and Identity — visual fidelity review

**Status:** implementation visually reviewed in installed Chrome; current immutable Preview and owner review are still required. This is not production approval or portfolio completion.

## Controlling source and identity use

The existing editable Sonnet V8 rig and storyboard are authoritative for the feature implementation: Figma `3712:2`, storyboard `3713:4`, poses `3714:2`, `3714:530`, `3714:1058`, `3714:1575`, `3714:2092`, `3714:2609`, and `3714:3126`.

- **Variant 01 — settled J + V8 orb:** owner-accepted provisionally for the top-left portfolio identity and larger Activity identity. The shared portfolio identity uses the canonical Figma export.
- **Variant 03 — seamless ring-free J:** owner-accepted for compact Activity and small identity placements, with authored optical-size assets. Resume Found uses the canonical standalone J inside its existing Ready Check mechanism; the existing concentric ring system remains unchanged.
- **Variant 02 — settled J with a painted seam overlay:** rejected. It is excluded from permanent placements.
- **Production:** archive `159:2` remains untouched.

The [identity comparison board](logo-comparison.html) presents the two accepted usage variants at the actual header, Activity, and compact sizes. The board separates permanent logo usage from the transient State 05 motion pose.

## Opening choreography

The seven authored states are continuous key poses, not a sequence of swapped frames. The React implementation moves crown, shaft, and hook over the shared canonical J artwork; authored joint, conduit, plasma, contact shadow, orbital ring, pulse, and sheen layers resolve into the settled lockup.

| Motion | Browser observation |
|---|---|
| Scene | 5,000ms; Home appears about 5.64 seconds after the first Opening frame. |
| Radial field | One clockwise 360° revolution is scheduled from 600–3,800ms. Chrome observed 358.5° at 3,904ms and 360° at 3,921ms while the Opening was still visible. |
| Mechanical sequence | Dormant/approach/alignment/lock/activation/sheen/settled captures were recorded at approximately 651, 1,001, 1,418, 2,586, 3,103, 3,803, and 4,154ms. Actual sample times are in the QA JSON. |
| Final identity | Settled seamless gold J, dark portal/plasma, gold orb ring, and contact shadow remain together through the Home handoff. |
| Reduced motion | Settled identity appears without tick rotation or transient bloom. |
| Responsive | 1440×720 and 390×844 captures show the mark in bounds, Skip available, and no horizontal overflow. |

The [seven-state comparison board](opening-seven-state-comparison.html) places each Figma pose beside a matched central crop from the runtime capture. It records the capture timestamps and points to the [uninterrupted browser recording through Home](../../site-render-review/2026-10-11-opening-fidelity/qa-orb-joint-fixed/rerun-final/opening-final-uninterrupted-1920x1080.webm). Figma originals are in `captures/figma-storyboard-2026-10-11/`; paired runtime crops are in `captures/opening-seven-state-comparison-2026-10-11/`.

Installed Chrome inspection found the joint channels activate over the seated pieces, the portal and ring persist, and the fused J settles without an observed placement or texture jump. No page/console errors, failed requests, broken opening assets, or viewport clipping were recorded. Browser data is in `docs/site-render-review/2026-10-11-opening-fidelity/qa-orb-joint-fixed/rerun-final/`.

The evidence establishes implementation and render fidelity only. Owner review of the new immutable feature Preview remains open. Production and prior J candidate history remain preserved.

## Resume Found geometry clarification

The owner’s latest layer mapping confirms the existing Ready Check composition: the canonical standalone J is centered in the inner scenic zone; `RESUME FOUND` stays within the lower part of that central area; the persistent cyan fill is clipped to the middle annular channel; `VIEW RESUME` is centered inside the lower plate attached to that channel; and `CLOSE` overlaps the base of the outer ring. The mechanism geometry was preserved while switching the inner mark to the canonical ring-free J. The current desktop comparison is `docs/site-render-review/2026-10-11-resume-found-concentric-check/canonical-v8-j-identity/resume-found-1440x900.png`; the valid narrow render and ring-state evidence are in `docs/site-render-review/2026-10-11-resume-found-concentric-check/owner-geometry-refresh/`. The separate `canonical-v8-j-identity/resume-found-390x844.png` is an invalid earlier headless capture and is excluded from review evidence.
