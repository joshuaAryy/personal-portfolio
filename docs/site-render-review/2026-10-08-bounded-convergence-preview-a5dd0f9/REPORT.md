# Bounded owner-correction Preview — 2026-10-08

## Review checkpoint

**REVIEW CHECKPOINT READY.** This immutable feature Preview is for owner review. The persistent portfolio goal remains active.

- **Application source:** `a5dd0f91c0ea9e1335343f814429f4b0e15c7439`
- **Feature branch:** `feat/portfolio-integration`
- **Immutable Preview:** https://3a91576f.joshuaik2.pages.dev/
- **Cloudflare deployment:** `3a91576f-1d39-4607-a3f3-8d7fdb989632` (`Preview`, branch `feat/portfolio-integration`, source `a5dd0f9`)
- **Previous owner-reviewed Preview:** https://288d797e.joshuaik2.pages.dev/ from source `0c692aea7cf71fab588e21f136b8bf774ea7800f`
- **Production:** not targeted

The application source was pushed as a fast-forward to `origin/feat/portfolio-integration`. Wrangler deployed `dist` with the explicit `--branch feat/portfolio-integration` option. Cloudflare identifies the immutable deployment as a Preview on that branch with source `a5dd0f9`.

## Changes since the previous owner-reviewed checkpoint

The seven-file application change in `a5dd0f9` stays within the bounded correction scope:

- **Opening / C06:** kept the complete keyed-forge silhouette legible while the cap and hook seat with small vertical movement over a subdued full-mark backing. Existing duration, radial environment, Skip, reduced-motion behavior, and Home handoff remain. No identity redesign was introduced.
- **Category banners:** aligned the wide-desktop environment and fade layers to the Figma frame geometry at widths from 1800px, without moving the lobby heading or cards. The existing top-origin/fade treatment remains across all four lobbies.
- **Activity identities:** Living in Silico and Stush Patties use their canonical circular identity crops in the shared rail; other identities retain their existing contained fit.
- **Regression contracts:** added focused checks for C06 assembly, wide-desktop banner alignment, and shared Activity image fitting.

Profile, Resume Found, Education, Food, and the remaining bounded case-study work did not require another source change in this correction. The reference comparison showed their current implementations already met this pass's target, so those baselines were retained.

## Owner-reference comparisons

The five transferred owner assets were inspected from `C:\Users\samue\Downloads\portfolio-owner-references`. Both unique League videos were reviewed at their source frame rates. The owner confirmed `league opening(1).mp4` is a duplicate upload name for `league opening.mp4`.

### Profile

The Preview at 1536×1289 was compared directly with the clean and annotated owner screenshots. The complete four-signal group occupies the lower band with a small bottom margin, matching the annotation. The current Preview also keeps all four groups visible at 1440×900 and 1600×760; at 390px the page remains naturally scrollable. No Profile source change was warranted.

Preview captures: `%TEMP%\portfolio-preview-owner-captures-3a91576f\profile-owner-1536x1289.png`, `profile-1440-1440x900.png`, `profile-short-1600x760.png`, and `profile-narrow-390x844.png`.

### Resume Found

The Preview was captured at the owner's 956×757 screenshot size and compared with the supplied alignment image and Figma frame `2407:176`. The current C06 orb/J, `RESUME FOUND`, `VIEW RESUME`, and `CLOSE` stack is compact and in the intended order. The owner screenshot shows the misaligned/oversized state that motivated the correction, rather than a target to reproduce. The current one-shot orb sweep and reduced-motion treatment were retained. No further positional CSS tweak was warranted.

Preview captures: `%TEMP%\portfolio-preview-owner-captures-3a91576f\resume-owner-956x757.png` and `resume-narrow-390x844.png`.

### Category banners

Each Figma frame and current Preview render were compared at 1920×1080:

| Mode | Figma source | Current Preview capture |
|---|---|---|
| Projects | node `511:2` | `%TEMP%\portfolio-preview-owner-captures-3a91576f\banner-projects-1920x1080.png` |
| Experience | node `704:2` | `%TEMP%\portfolio-preview-owner-captures-3a91576f\banner-experience-1920x1080.png` |
| Hackathons | node `730:3316` | `%TEMP%\portfolio-preview-owner-captures-3a91576f\banner-hackathons-1920x1080.png` |
| Education | node `738:3316` | `%TEMP%\portfolio-preview-owner-captures-3a91576f\banner-education-1920x1080.png` |

The matched Figma image captures remain under `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\bottom-shade-fix\figma-*-1920x1080.png`. The Preview renders show the environment starting from the top and blending downward into the lobby without a hard centered image rectangle. The wide-desktop rule aligns the scene layers to the Figma frame while leaving category content in place.

### Education

The current Preview retains the owner-preferred four-card layout and the Toronto Metropolitan University / Computer Engineering / Software Specialization / B.Eng. / Expected 2028 header. Desktop and narrow route checks show no public evidence-management language. Capture: `%TEMP%\portfolio-preview-final-cdp-review-3a91576f\education_projects-1440x900.png`.

### C06 Opening

The deployed mid-assembly frame was inspected in Chrome against the sampled League opening. The radial field moves around the J while the mark remains whole; the cap and hook seat with small translations, and the reduced-motion path shows the settled mark. The opening reference video was sampled at 60fps; the Ready Check clip at 30fps. The clips inform motion study only and are not public site assets.

Preview frame: `%TEMP%\portfolio-preview-owner-captures-3a91576f\opening-c06-350ms-1920x1080.png`.

## Deployed Preview verification

- `npm test -- --run`: **28 files, 252 tests passed**. Happy DOM prints iframe/PDF fetch-abort messages during teardown; Vitest exits successfully with all tests passing.
- `npm run build`: passed (`tsc -b` and Vite production build).
- `git diff --check`: passed before the application source commit; it is rerun after this report/status update.
- Installed Chrome checked **19 direct application routes at 1440×900 and 390×844 (38 route/viewport checks)**. Each remained on its requested route and rendered a `main`; there were no JavaScript exceptions, console errors, failed non-aborted requests, HTTP errors, broken images, or horizontal document overflow.
- Cloudflare's deployment record reports Preview / `feat/portfolio-integration` / source `a5dd0f9`. Preview HTML references `/assets/index--TIQVTWN.js` and `/assets/index-DolBei6W.css`.
- Deployed JavaScript: **499,441 bytes**, SHA-256 `F7C565C98AC4EFCBF6857C4C2E09689F441E386E3F0A29E87815B9A367E75B04`; identical to the local build.
- Deployed CSS: **476,777 bytes**, SHA-256 `DB38F186EB19B9CC557A520C922419395E1E3D8DA8535AAF68768797F18246BD`; identical to the local build.
- The full Cho'Veigo video played in Demos and the case-study hero. Chrome reported 112.65s duration and seekable end; playback advanced, pause worked, and seeking to 80s succeeded in both placements.
- Help opened from Home, included LinkedIn and GitHub guidance, and closed back to Home.
- Resume Found opened as a dialog with an inert underlay; View Resume opened `/resume/viewer` with the PDF frame; Close returned to `/home` and dismissed the dialog.
- Opening Skip navigated to `/home`. With Chrome emulating `prefers-reduced-motion: reduce`, visiting `/` handed off to `/home` without leaving the opening mounted.

## Correction status

| Area | Status | Remaining boundary |
|---|---|---|
| Opening / C06 | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | Existing timing and overall scene were retained; assembly was checked in the deployed Preview. |
| Activity identities | **IMPLEMENTED + VISUALLY VERIFIED** | Living and Stush use their canonical marks in the shared Activity rail. |
| Category banners | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | Figma/current Preview pairs were checked at 1920×1080. |
| Profile | **VISUALLY VERIFIED; NO NEW CODE CHANGE** | Exact owner aspect and annotation match; current placement retained. |
| Resume Found | **VISUALLY VERIFIED; NO NEW CODE CHANGE** | Exact owner aspect/Figma geometry reviewed; View, Close, and underlay behavior verified. |
| Education | **PRESERVED + VISUALLY VERIFIED** | Four-card layout retained without public evidence-status labels. |
| Food Tracker | **PRESERVED** | Authentic product captures, early stack/ownership framing, and retrieval evaluation remain. No authentic demo video is available. |
| Cho'Veigo full demo | **RUNTIME VERIFIED; OWNER RELEASE REVIEW OPEN** | Full masked 112.65s video plays/seeks in both placements; owner privacy/release approval remains open. |
| Fraymakers | **PRESERVED + VISUALLY VERIFIED** | Concise hero and later technical detail retained. |
| Stush Patties | **PRESERVED + VISUALLY VERIFIED** | Recurring animation remains unchanged; lower copy is concise and source labels stay anonymous. |
| Journey, Crest, Personal Highlights, Home structure, Living broad story | **NOT CHANGED — LOCKED ABSENT REGRESSION** | Preserved by owner direction. |

## Remaining owner/manual gates

1. Review this immutable Preview, especially C06 motion, the four banners, Profile signal placement, Resume Found composition, and the preserved case-study directions.
2. Approve the public-release masking treatment for the full Cho'Veigo recording.
3. Perform the live Windows Narrator interaction. Automated browser checks do not replace this manual screen-reader review.
4. Supply authentic Food Tracker demo media if a playable Food demo is desired.

Production was not touched. The unrelated `.wrangler/` directory, historical candidates, and preserved worktrees were not staged or deleted.
