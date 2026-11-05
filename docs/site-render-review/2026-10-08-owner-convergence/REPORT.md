# Owner convergence review checkpoint — 2026-10-08

## Deployment identity

- **Application source:** `71b40013da3594345ecad97ebf6380ada0572fc5`
- **Remote branch:** `feat/portfolio-integration`
- **Immutable Cloudflare Pages Preview:** https://b11c420b.joshuaik2.pages.dev/
- **Preview deployment ID:** `b11c420b-ac43-43e9-b615-9b41dd3138b4`
- **Environment:** Preview. Production was not targeted.
- Local source HEAD and `origin/feat/portfolio-integration` matched `71b4001` at reconciliation. Global status documentation is being committed separately; it does not change application source.

## Changes in this checkpoint

- **Opening / C06 J:** the complete keyed-forge silhouette remains registered throughout assembly. Cyan joint light and a restrained material sheen reveal the construction without moving cap, shaft, or hook apart. The three-second scene, radial environment, Skip, reduced-motion path, and Home handoff remain. The bounded Sol motion contract and Chrome frame captures are recorded in the task state. No loading label or progress bar is present.
- **Resume Found:** preserved the originating page beneath the inert, dimmed takeover. The C06 mark, title, smaller View Resume control, Close control, and one-shot orb-energy sweep are grouped as one composition. Chrome verified Escape, focus containment/restoration, and both actions. The orb sequence was inspected at early, middle, and settled captures.
- **Full Cho’Veigo demo:** the Demos screen and case-study hero use the full authentic 112.65-second redacted derivative; the 4.94-second Recommendations excerpt remains supporting media and is not presented as the full demo. The derivative retains full-frame composition and targeted masks documented in [the privacy record](../../media/CHOVEIGO_FULL_DEMO_PRIVACY.md). Native playback, pause, and seeking to 23s and 111s were verified in deployed Chrome. The final owner privacy/release review remains open.
- **Food Tracker:** ownership copy now describes Joshua’s product/architecture leadership, hands-on coding/debugging, and directed agentic workflows without implying either passive oversight or sole manual authorship. The early stack names verified technologies. An authentic populated Insights capture was added, and retrieval Top-1/Top-3 plus offline/holdout evaluation are explained in plain language. Food still has no authentic demo video.
- **Fraymakers:** the hero is simplified to one conceptual 16:9 thumbnail composition with concise labels and a separate renderer strip. It is explicitly labeled illustrative rather than a generated artifact; later technical detail and ownership boundaries remain.
- **Category banners / shared Activity identities / Profile / Education / Stush:** existing top-origin banner and fade, canonical identity source, lower Profile signal placement, concise four-card Education page, and Stush transformation/story treatment were preserved and checked in the integrated Preview. Education exposes no internal evidence-status language. Stush retains anonymous source labels and its recurring transformation.
- Home, Journey, Crest, Personal Highlights, Living in Silico’s broad direction, Cho’Veigo’s broad narrative, and Resume Viewer architecture were not reopened.

## Visual and interaction evidence

The screenshots below were captured with installed Chrome against the deployed Preview. They are retained in the local temp review folder rather than committed as large artifacts:

`C:\Users\samue\AppData\Local\Temp\portfolio-review-b11c420b\`

| Surface | Evidence and result | Status |
|---|---|---|
| Opening / C06 | `motion/opening-100ms.png`, `350ms`, `550ms`, `830ms`; prior desktop and 390px capture set: `%TEMP%\portfolio-b32d635-verify-artifacts\opening-c06-convergence-2026-10-08\`. At sampled frames the gold cap/shaft/hook bounds remain aligned; seams illuminate, then settle to the static C06 appearance. | Implemented + visually verified; reduced-motion CSS and tests pass. The separate reduced-motion screenshot capture had already handed off to Home and is not used as proof of the reduced opening frame. |
| Activity identities | `profile.png`, `experience.png`, `experience-living-in-silico.png`, `experience-stush-patties.png`. Activity and Experience use the same Living in Silico and Stush marks at desktop; narrow rail was included in the route sweep. | Implemented + visually verified. |
| Category banners | `experience.png`, `hackathons.png`, `education.png`; Figma/React stack comparison in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\after\banner-stack\`. The upper artwork and downward blend are present. At 1920×1080 the non-Projects category group starts 20px right of Figma because React’s lobby is 40px wider (1600 vs 1560px). A 20px banner-only correction overlapped the heading at 1440×900 and was reverted. | Implemented + visually verified with a documented geometry difference; owner review remains open. |
| Profile | Before: `%TEMP%\profile-before-1920.png`; after: `%TEMP%\portfolio-acceptance-profile-1920-final.png`; deployed state: `profile.png`, plus `narrow-profile.png`. Signal groups move together into the lower band. The deployed Chrome matrix included 1400×900 through 1920×1080; short-wide states use natural scrolling without clipping. | Implemented + visually verified; exact owner annotation attachment was unavailable in this runtime, so owner review remains open. |
| Resume Found | Before: `%TEMP%\portfolio-resume-before.png`; after: `%TEMP%\portfolio-resume-motion.png`, `narrow-resume.png`, and `motion/resume-orb-{150ms,1000ms,2500ms,4700ms}.png`. Deployed Chrome verifies title/action grouping, reduced primary-button scale, one orb sweep, focus containment, Escape, Close, and View Resume. | Implemented + visually verified; exact latest owner screenshot attachment was unavailable in this runtime, so owner review remains open. |
| Education | Before: `%TEMP%\education-before-1440.png`; after: `education-projects.png`, `narrow-education-projects.png`. The route presents the requested four project cards, TMU/Computer Engineering header, and concise tools/learning copy without public provenance labels. | Implemented + visually verified against desktop/narrow Chrome and the historical card layout; owner review remains open. |
| Fraymakers | Before: `%TEMP%\fray-hero-1ec656b-after-desktop.png`; after: `%TEMP%\fray-hero-simplify-1ec656b-after-desktop.png`, with corresponding narrow captures. | Implemented + visually verified. |
| Food / Cho / Stush | `projects-food-tracker.png`, `projects-choveigo.png`, `experience-stush-patties.png`, plus narrow route captures. Product evidence and copy remain legible at representative desktop/narrow states; full Cho media is integrated. | Implemented + visually verified; owner review remains open. |

The exact clean/annotated Profile attachment, latest Resume Found screenshot, and `league opening(1).mp4` were not available in this runtime. The available `half of ready check.mp4`, `league opening.mp4`, deployed Figma references, and current Chrome captures were used where applicable. This limits an exact screenshot-to-screenshot motion comparison; it did not block the bounded correction or Preview.

## Runtime verification

- `npm test -- --run`: **242 tests across 27 files passed**. Happy DOM printed iframe/fetch `AbortError` teardown noise, but Vitest reported zero failures.
- `npm run build`: passed. Vite reports the existing main JS chunk at 501.32 kB (over its 500 kB advisory threshold); no build failure.
- `git diff --check` and `git diff --cached --check`: passed.
- Deployed Chrome checked **20 desktop routes and 9 narrow routes**. No broken images, horizontal overflow, unexpected application console errors, or HTTP failures were found.
- Resume Found: focus stayed inside the modal; Escape returned to the originating route and restored focus. Full media was playable, pausable, and seekable through the end.
- Deployed `index.html`, JS (`assets/index-CxnrCpSW.js`), CSS (`assets/index-BYBTXuHB.css`), and `media/demos/choveigo-full-demo-redacted.webm` matched local `dist` byte-for-byte. The video is 4,388,479 bytes; SHA-256 `27D222CC0ABD62B6F078B1C026717CA5B0DBEAFDC7F10CCDBBE9A6180B3BD9B9`.
- Final live screen-reader interaction was not performed. Keep the Narrator/manual announcement check open; browser accessibility-tree and keyboard verification do not replace it.

## Remaining owner-visible or external items

- Review this immutable Preview, especially the banner group’s 20px Figma alignment difference, Profile lower-band balance, Resume Found geometry/motion, Education cards, and the full redacted Cho’Veigo demo.
- Confirm final public release/privacy treatment of the redacted Cho’Veigo recording. The source recording remains private and outside the repository; the deployed derivative uses the masks listed in the privacy record. This report does not claim the owner has approved every masked frame for release.
- Food Tracker authentic demo video remains pending.
- Complete a live Windows Narrator pass using the manual checklist in the render queue.
- The exact owner Profile/Resume screenshots and `league opening(1).mp4` remain unavailable to this runtime; they can be transferred later if exact-source comparison is still needed.

This is **REVIEW CHECKPOINT READY**, not portfolio completion. The Preview is immutable. No production deployment occurred. Historical Figma candidates, prior Preview deployments, and unrelated worktree material were preserved.