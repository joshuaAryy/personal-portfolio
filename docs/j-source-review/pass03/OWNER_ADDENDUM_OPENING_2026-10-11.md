# J identity and Opening — owner addendum review

**Status:** implementation and browser evidence prepared; permanent-mark choice remains open for owner review. Production archive `159:2` and live shared identity placements were not changed.

## Bounded implementation change

The five-second Opening, fragment transforms, radial tick revolution, V8 orb, reduced-motion path, Skip control, and Home handoff remain unchanged. The join-light timing was tuned to better follow the editable Sonnet V8 motion layers: cyan seam and conduit effects peak during activation and then fade before the sheen/settled hold. The authored spark now travels the joint path for 800ms and stays legible for most of that traversal before fading at the endpoint. This was implemented with the existing SVG/CSS motion layers; no sprite sheets, frame swapping, or new runtime dependency were added.

The State 05/06/07 visual checks show joined seams and traveling cyan energy during activation, the V8 portal behind the fused J, a short transparent highlight at State 06, and the seamless canonical lockup at State 07. The source capture did not reveal a visible silhouette jump in the sampled lock-to-fused transition. Owner visual acceptance remains open.

## Permanent identity comparison

[`logo-comparison.html`](logo-comparison.html) compares:

1. Settled J + V8 orb — current recommendation for the 54px header and larger Activity placement.
2. Settled J + the authored seam-light layer at restrained opacity — isolated review candidate only; not installed as a permanent identity.
3. Settled standalone J — current recommendation for compact identity sizes, using authored optical glyphs at 32px and 16px.

The comparison includes the actual Portfolio header and Activity backgrounds at desktop and narrow viewports. Screenshots: [1440×1200](captures/owner-addendum-2026-10-11-r4/identity-comparison-1440x1200-full.png) and [390×844](captures/owner-addendum-2026-10-11-r4/identity-comparison-390x844-full.png).

## Opening evidence

- [Seven-state Figma / Chrome comparison](opening-seven-state-owner-addendum.html)
- [Uninterrupted installed-Chrome recording through Home](captures/owner-addendum-2026-10-11-r4/opening-chrome-full-1920x1080-through-home.webm)
- [Rendered seven-state comparison capture](captures/owner-addendum-2026-10-11-r4/seven-state-comparison-1440-full.png)
- [Capture report](captures/owner-addendum-2026-10-11-r4/capture-report.json)
- [Recorded-video samples and playback metadata](captures/owner-addendum-2026-10-11-r4/recorded-video-review.json)

The report records the 5,000ms Opening and clockwise tick rotation from 600ms to 3,800ms, with visible samples at 0°, 90°, 180°, 270°, and 360° while the scene is still present. It records successful `/home` handoff, Skip navigation, the immediate reduced-motion lockup, 1440×720 and 390×844 responsive checks, loaded comparison-board imagery, and no browser errors, failed requests, or bad responses. The full recording is 7.04s including the Home handoff. Sampled playback frames across mechanical lock, activation, sheen, and settle are available in the `frames` subfolder.

## Verification and limits

Focused tests: `npm test -- --run src/Opening.test.tsx src/JIdentityReview.test.ts` (15 passed). Full suite: `npm test -- --run` (31 files / 300 tests passed; happy-dom logged teardown AbortErrors from its asynchronous iframe/PDF fetch tests despite a successful exit). Production build: `npm run build` succeeded; Vite emitted its existing >500kB chunk advisory. `git diff --check` passed. The comparison demonstrates current implementation/rendering and supplies the requested visual alternatives; it does not constitute owner approval of a changed permanent J treatment.
