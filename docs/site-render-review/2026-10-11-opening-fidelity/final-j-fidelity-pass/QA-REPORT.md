# Portal Arrival Opacity — Opening QA

Read-only real-time Chrome verification against `http://127.0.0.1:5176/`.

**Candidate source:** HEAD `476b4358f729a467715a28c51e3105ff2b448cbc`, with uncommitted changes to `src/opening.css` and `src/Opening.test.tsx` present before QA. No source edits, commits, or deployments were made by QA.

## Evidence

- `portal-correction-uninterrupted-1920x1080.webm` — fresh native Chrome recording from navigation through `/home`.
- Seven runtime frames: `phase-0p65s-1920x1080.png`, `phase-1p37s-1920x1080.png`, `phase-2p58s-1920x1080.png`, `phase-3p10s-1920x1080.png`, `phase-3p72s-1920x1080.png`, `phase-4p10s-1920x1080.png`, `phase-4p55s-1920x1080.png`.
- A precise browser-controlled State 02 sample at 960ms: `phase-0p96s-controlled-1920x1080.png`. This supplements the natural-time recording; the browser timeline was paused at the requested CSS animation time for this still.
- Measurements, loaded image records, and browser error arrays: `report.json`.

## Observations

The portal now arrives behind the assembling J instead of waiting until late in the sequence. Measured portal opacity was 0.378 at 650ms, 0.702 at 1,384ms, 0.852 at 2,586ms, and 1.0 by 3,103ms; it stays fully visible through the settled frames. The portal and gold ring remain behind the J.

The previous dark rectangular bloom backing is absent in the 3.1s frame. The bloom is a circular (50% radius), screen-blended effect; no rectangular spark tile is visible. The join is still assembling at 2.586s, with the fused layer at 0.034 opacity; the fused J is fully visible by 3.103s. Sampled activation, sheen, and hold frames show no obvious silhouette pop or clipping. The final J/orb holds through the Home handoff.

The full run reached `/home`: first detected Opening to Home was 5,247ms; navigation-commit to Home was 5,844ms including startup. The radial tick field reached 360° at about 3,917ms after first visible Opening and remained complete until handoff.

At 390×844, approach and settled J/orb are in bounds, Skip remains visible, and document dimensions match the viewport (390×844). Skip navigates directly to `/home`. Reduced motion shows the settled J, portal, and ring with tick animation disabled. The reduced-motion handoff timer was held only in the QA harness to capture the static state.

All 12 Opening images loaded. Normal, sampled-frame, narrow, Skip, and reduced-motion runs report zero console errors, page errors, failed requests, or bad HTTP responses.

## Timing note

Screenshots are tied to the measured browser animation timeline. Captures requested at 650, 1,370, 2,580, 3,100, and 3,720ms landed within 17ms. The 4,100 and 4,550ms requests landed at 4,354 and 4,837ms due to browser screenshot/polling delay; their measured times are preserved in `report.json`.
