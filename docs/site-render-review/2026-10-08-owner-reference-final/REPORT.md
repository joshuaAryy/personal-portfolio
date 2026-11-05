# Owner reference correction Preview — 2026-10-08

## Review checkpoint

**REVIEW CHECKPOINT READY.** This immutable feature Preview is for owner review. The persistent portfolio goal remains active.

- **Remote branch:** `feat/portfolio-integration`
- **Application source:** `0c692aea7cf71fab588e21f136b8bf774ea7800f`
- **Immutable Preview:** https://288d797e.joshuaik2.pages.dev/
- **Cloudflare deployment:** `288d797e-1a58-486f-861f-7b5646ced510`
- **Previous Preview:** https://cd8a0b39.joshuaik2.pages.dev/ from `ca73cc5`
- **Production:** not targeted

Cloudflare identifies the deployment as a Preview on `feat/portfolio-integration` with source `0c692ae`. Local `HEAD` and the remote feature-branch head both resolve to `0c692aea7cf71fab588e21f136b8bf774ea7800f`.

## Material changes in this review build

Since the prior Preview, `ca73cc5` integrated the full-length redacted Cho'Veigo MP4, byte-range support for seeking, the Figma-referenced environment blur refinement, and related integration corrections. `0c692ae` adds:

- **Profile:** places the complete four-signal group in the lower band at the owner's 1536×1289 reference size, with a 34px bottom margin. The row ends at y=1254.6. At 1440×900, 1920×1080, 1600×900, and 390×844 it stays within the viewport or normal document scroll without horizontal overflow.
- **Resume Found:** replaces the diffuse orb treatment with a crisp one-shot cyan arc that sweeps clockwise over 2.1 seconds. The position/size contract remains unchanged; the arc is decorative and disappears for reduced-motion users.
- **Food Tracker:** swaps the sparse Goal Plan screenshot for an authentic populated Macro Composition Insights capture. The caption identifies its Phase 24 QA-A fixture values. The early stack explicitly includes Expo alongside React Native, Expo Router, and TypeScript.
- **Preserved work:** C06 Opening, shared Activity identities, category fades, the owner-positive Home/Journey/Crest/Highlights directions, full Cho'Veigo story/media, Fraymakers hero, Stush story, and Education's four-card layout remain in the build.

The added Food image is the Phase 24 source file `current-state-populated/03-analytics/trend-detail-macro-composition-populated.png`, copied into the portfolio's own media path. It is not fetched from GitHub at runtime.

## Supplied references inspected

The three owner screenshots were opened directly from `C:\Users\samue\Downloads\portfolio-owner-references`:

- `Profile_Overview_Clean.png`
- `Profile_Overview_Annotated_Red_Yellow.png`
- `Resume_Found_Alignment.png`

The current Profile render at the exact 1536×1289 reference size shows all four signal groups lower in the scene, in the annotated band, with only a small bottom margin. The clean owner image and deployed render side-by-side are in `%TEMP%\portfolio-owner-reference-inspection-2026-10-08\profile-owner-clean-vs-current.png`; current multi-viewport renders and geometry are in `%TEMP%\owner-correction-render-2026-10-08-final\`.

The Resume screenshot was compared at its exact 956×757 size and against Figma frame `2407:176`. The supplied screenshot is the misaligned/oversized state to correct, not a target to reproduce. In the current render the orb system is 371×371 at x=182.5/y=143.1; the title sits at y=443.5; View Resume is 148×49 at y=462.0; Close is 112×38 at y=534.4. The matched owner/current comparison is `%TEMP%\portfolio-owner-reference-inspection-2026-10-08\resume-owner-vs-current.png`; the fresh deployed capture is `%TEMP%\portfolio-preview-smoke-0c692ae\resume-956x757-settled.png`.

Both owner videos were inspected from the original MP4s and sampled through their timelines:

- `C:\Users\samue\Videos\half of ready check.mp4`: 1920×1080, 30fps, 388 video frames, 12.933s video track (12.971s overall container). The cyan highlight moves clockwise around the orb while the ready-check controls stay beneath it. The motion uses that restrained arc language; the portfolio does not copy the warning/decline state.
- `C:\Users\samue\Videos\league opening.mp4`: 1920×1080, 60fps, 286 frames, 4.767s video track (4.800s container). The source moves from a large central League emblem through a brief clear/fade into a smaller emblem with a radial tick field, then reveals the client. The owner confirmed `league opening(1).mp4` is the same file, not another clip. The portfolio retains its own C06 sequence and does not add fake loading status.

Original-rate review contact sheets are kept outside the repository under `%TEMP%\portfolio-owner-reference-inspection-2026-10-08\`. No owner reference image or League video was copied into public portfolio media.

## Correction ledger

| Area | Status | Verification / remaining boundary |
|---|---|---|
| Opening / C06 | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | Existing C06 geometry remains whole during assembly; seam light and material highlight carry the motion. Timing, Skip, reduced-motion behavior, and handoff were preserved. The supplied Opening clip was inspected at 60fps; no broad redesign was needed. |
| Activity identities | **IMPLEMENTED + VISUALLY VERIFIED** | Shared identity records keep Living in Silico and Stush Patties consistent across Activity and Experience, alongside Food Tracker, Cho'Veigo, Crest, Fraymakers, and the portfolio J. Desktop/narrow route checks found no broken marks. |
| Category banners | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | Figma layer comparison, top anchoring, downward fade, veil, shade, and the environment blur were already implemented in `ca73cc5` and retained. The prior same-size Figma/Preview comparisons remain in `2026-10-08-reference-correction-followup/REPORT.md` and its temporary capture folders. |
| Profile signals | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | Direct comparison against the clean and annotated owner references at 1536×1289; lower-band row geometry and narrow/short-wide behavior were checked in Chrome. |
| Resume Found | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | Matched 956×757 owner/current render and Figma geometry inspected. Escape returns to the origin and restores focus; the underlay is inert and `aria-hidden`; View Resume reaches `/resume/viewer`; Close returns to `/home`. Tab remains inside the takeover. Reduced motion hides the ornament and leaves controls visible. |
| Cho'Veigo full demo | **IMPLEMENTED + RUNTIME VERIFIED; OWNER RELEASE REVIEW OPEN** | The full 112.65s redacted MP4 plays in Demos and the case-study hero, pauses, seeks to 80s and near the end, and exposes the full seekable range. The transition-card and profile/resume masks remain. Owner review of the masked recording is still required before final public release. |
| Food Tracker | **IMPLEMENTED + VISUALLY VERIFIED; DEMO VIDEO PENDING** | Added authentic populated Macro Composition evidence with fixture-specific caption; refreshed the early stack wording. No authentic Food Tracker demo video is available. |
| Fraymakers | **IMPLEMENTED + VISUALLY VERIFIED** | The simpler conceptual 16:9 hero remains; technical detail and ownership boundaries stay later in the story. |
| Stush Patties | **IMPLEMENTED + VISUALLY VERIFIED** | The owner-positive recurring normalization animation and anonymous source labels remain; lower copy is concise. |
| Education | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | Four concise project cards remain under the TMU / Computer Engineering / Software Specialization / B.Eng. / Expected 2028 header; public provenance/evidence-pending labels are absent. |
| Locked surfaces | **NOT CHANGED — PRESERVED BY DIRECTION** | Home composition, Journey, Personal Highlights structure, Crest composition, Living in Silico broad direction, and Cho'Veigo broad story structure were not materially redesigned. |

## Verification

- `npm test -- --run`: **28 test files, 250 tests passed**. Happy DOM logs iframe/PDF fetch aborts during teardown; Vitest exits successfully.
- `npm run build`: passed. Output: JavaScript 499.62 kB, CSS 475.71 kB.
- `git diff --check`: passed for the implementation commit; this report and status updates were added after deployment.
- Installed Chrome checked **20 direct routes at 1920×1080 and 390×844 (40 route/viewport checks)**. All returned 200, all loaded images decoded, and there were no page errors, failed requests, broken images, or horizontal document overflow.
- Deployed JS SHA-256 `97deca6e2532fc621fb7e0c9b9b9aa1354daa01587168a916d7b904527ca3564` and CSS SHA-256 `513ef9f611dc0c8ec44aff01c4b6859ae0e013a161d15e041570deffb85e76f` match the local build byte-for-byte. The new Food image returns 200 with 103,417 bytes.
- Chrome played the full Cho'Veigo recording in both placements, paused, sought to 80s, and sought to 111.65s of 112.65s. A few `ERR_ABORTED` events came from intentionally superseded video range requests/navigation; playback and seeking succeeded without page errors.
- Resume takeover checks passed: Escape and Close return to the origin, focus restores, the underlay is inert/hidden from assistive technology while open, View Resume navigates correctly, and Tab stays within the dialog. Reduced motion shows controls without the arc. Reduced-motion entry from `/` reaches `/home` in under two seconds.
- Route and owner-reference captures are stored outside the repository in `%TEMP%\portfolio-preview-smoke-0c692ae\` and `%TEMP%\owner-correction-render-2026-10-08-final\`.

## Remaining owner/manual gates

1. Review the immutable Preview, especially Profile's lower-band signal position, Resume Found's ring/title/action alignment and orb sweep, and the four category banners.
2. Review the full masked Cho'Veigo demo and approve its public-release treatment.
3. Perform the live Windows Narrator interaction; browser automation does not replace this manual test.
4. Supply authentic Food Tracker demo media if it is to have a playable demo.

Production was not touched. The original owner screenshots/videos, historical J candidates, and other worktrees remain preserved. The unrelated `.wrangler/` directory remains untracked and was not staged.
