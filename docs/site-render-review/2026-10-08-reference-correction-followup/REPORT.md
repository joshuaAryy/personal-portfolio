# Owner reference correction follow-up — 2026-10-08

This follow-up records the bounded corrections and visual checks made after the owner transferred the Profile and Resume screenshots and League motion references. It supplements the earlier immutable Preview report at `2026-10-08-owner-review-correction-final/REPORT.md`; it does not rewrite that older Preview's record.

## Starting state

- Remote application branch at start: `feat/portfolio-integration` at `6ff9c036f3735090a1cecbe2a51a043a9d5fd912`.
- Changes were made in the safe validation worktree `C:\Users\samue\AppData\Local\Temp\portfolio-b32d635-verify`.
- The main worktree and its dirty/untracked material were not cleaned or reset. `.wrangler/` in the validation worktree remains untracked and was not staged.

## Owner references inspected

The screenshots in `C:\Users\samue\Downloads\portfolio-owner-references` were inspected directly:

- `Profile_Overview_Clean.png`
- `Profile_Overview_Annotated_Red_Yellow.png`
- `Resume_Found_Alignment.png`

The source videos were inspected at their original rates: `C:\Users\samue\Videos\league opening.mp4` (4.80s, 1920×1080, about 60fps) and `C:\Users\samue\Videos\half of ready check.mp4` (12.97s, 1920×1080, about 30fps). Per owner clarification, `league opening(1).mp4` is the same opening recording, not a separate clip. The Ready Check review informed only the restrained clockwise orb sweep; its warning/decline state was not copied.

## Correction ledger

| Area | Result | Evidence / remaining state |
|---|---|---|
| Profile Overview | **Already implemented in the starting branch; visually rechecked, no new code change** | The complete signal groups occupy the lower band at the owner's 1536×1289 reference size. The prior branch correction moved the group about 149px down and left about 148px below it. The owner annotation is `C:\Users\samue\Downloads\portfolio-owner-references\Profile_Overview_Annotated_Red_Yellow.png`; matched before/after renders are `...\owner-reference-comparison-2026-10-08\before\profile-owner.png` and `...\after\profile-owner.png`. Desktop aspect ratios and 390px narrow captures are retained in that folder. Profile structure and identity rail were left intact. |
| Resume Found | **Implemented + visually verified; owner review open** | The matched 956×757 owner frame and Figma `2407:176` informed one cohesive upward correction to the lower stack: title 81%, View Resume 86%, Close 105.5%. The primary plate remains 212×70px at desktop and scales to about 143×47px on narrow. A one-shot 2.1s clockwise cyan sweep uses the outer orb; reduced motion suppresses it. Focus trap, Escape, originating page, View Resume, and Close remain. Captures are in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\resume-contract-after\` and `opening-resume-owner-correction-2026-10-08\`. |
| Category banners | **Implemented + visually compared** | Figma environments use the original party-background source and a 1.1px blur (`704:3`). React now applies `blur(1.1px)` to that environment layer while retaining the already-present top anchoring, banner fade, full-scene veil, and bottom shade. Projects keeps its stronger existing treatment. The three-way comparison set for each mode is in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\bottom-shade-fix\`: Figma `figma-{projects-511-2,experience-704-2,hackathons-730-3316,education-738-3316}-1920x1080.png`, plus `before\current-{mode}-1920x1080.png` and `after\current-{mode}-1920x1080.png`. Narrow before/after captures are alongside them. The React foreground layout differs from older Figma compositions; the environment treatment and no-hard-rectangle transition were compared without changing accepted lobby geometry. |
| Activity identities | **Implemented + visually verified** | Home and interior Activity surfaces now use the same shared rail and canonical identity records. Living in Silico and Stush Patties use the same marks as Experience, alongside Food Tracker, Cho’Veigo, Crest, Fraymakers, and the portfolio identity. Home composition itself was preserved. Desktop/narrow captures are in `%TEMP%\portfolio-b32d635-verify-artifacts\home-activity-canonical-2026-10-08\`. |
| Opening / C06 | **No new source change; motion visually verified** | The existing 3s timing, C06 identity, Skip, and reduced-motion path were preserved. Sol’s bounded motion contract keeps the full J silhouette stationary and uses seam illumination/highlight, not separated moving pieces. Frames at 100, 350, 550, and 830ms show a continuous J; reduced motion shows the settled state. Captures are in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\opening-contract-after\`. |
| Cho’Veigo full demo | **Full-length corrected MP4 integrated locally; deployed/owner release review open** | The 112.638s owner recording is delivered as a 112.65s, 1280×720 H.264/AAC full-frame derivative at `public/media/demos/choveigo-full-demo-redacted.mp4` (6,935,798 bytes; SHA-256 `9C1BDE2F810A4F3173993DE4C03FA5C11A51D413CB94F23D85BF74CA460CABCB`). A localized mask covers the education/career transition card at output coordinates x=290, y=420, w=990, h=300 from 22.70–23.20s; decoded frames from 22.700–23.166s were checked. Existing masks remain over other profile/resume/editor/letter details. The full runtime and workflow remain; no crop was applied. Both Demos and the case-study hero use this MP4. Chrome 153 confirmed duration and seekable range `[0,112.65]`, seeks at 0/56.325/111.9/112.5, and playback to end. The original recording remains outside the repository. Public-release privacy review remains an owner gate. Evidence: `%TEMP%\cho-full-demo-release-audit-20261008\final-frame-by-frame-before-after.png` and `final-native-speed-before-after.png`. |
| Food Tracker, Education | **Not changed in this pass** | Existing branch content already includes the richer Food ownership/stack/evaluation treatment and Education’s owner-preferred four-card structure. This pass avoided reopening those owner-positive surfaces. |
| Locked surfaces | **Preserved** | Journey, Crest, Personal Highlights structure, Living in Silico broad direction, Cho’Veigo story structure, and Home composition were not materially redesigned. |

## Verification

- Full suite after integration: `npm test -- --run` — **28 test files, 248 tests passed**. Happy DOM logs iframe/PDF fetch aborts during test teardown; Vitest exits successfully.
- `npm run build` — passed (`tsc -b` and Vite production build).
- `git diff --check` — passed; Git emitted only working-tree LF→CRLF advisories.
- Installed Chrome 153 checked the integrated local MP4 in both the Demos player and narrow Cho’Veigo case-study hero. Both loaded 112.65s metadata and sought to start/middle/end. The Demos player played to `ended` at 112.65s. Rapid seeks cancelled superseded media range requests (`ERR_ABORTED`); duration, seek, and playback succeeded.
- Focused media tests reported 17/17 passing before the full suite.
- Full suite after integration: `npm test -- --run` — **28 test files, 248 tests passed**. The Preview is built from application commit `ca73cc5e087b6b84b7952e703139eebc109dfad2` at `https://cd8a0b39.joshuaik2.pages.dev`. The deployed JavaScript and CSS SHA-256 values match the local build; the deployed MP4 SHA-256 matches the audited local derivative.

## Immutable Preview verification

- **Application source:** `ca73cc5e087b6b84b7952e703139eebc109dfad2` on `feat/portfolio-integration`. This review-report update is documentation-only and does not alter the deployed application artifact.
- **Immutable feature Preview:** `https://cd8a0b39.joshuaik2.pages.dev` (Cloudflare Pages deployment on the feature branch; production was not targeted).
- The deployed JavaScript (`index-BzJgQef5.js`, SHA-256 `45674CE3D3C33DE8C97E47328D2EB7AFE04F2DEC00C1FB33D6BF1BE128E3BD5E`) and CSS (`index-ZF1NYEyu.css`, SHA-256 `8EB4A4723AE6172B024BF8ED052FC26D10C08ACDD9BBF1760E31706C71E86173`) match the local build. The deployed full-demo SHA-256 matches `9C1BDE2F810A4F3173993DE4C03FA5C11A51D413CB94F23D85BF74CA460CABCB`.
- Installed Chrome 153 checked the shell, four lobbies, Education, Profile, Resume, Demos, and all six long-form case-study routes at 1440×900 and 390×844. Pages returned 200, with no broken images, page errors, HTTP errors, or horizontal document overflow.
- At matched owner sizes, the deployed Profile render was checked at 1536×1289, Resume Found at 956×757, and Profile narrow at 390×844. Captures are under `%TEMP%\portfolio-b32d635-verify-artifacts\deployed-ca73cc5\` (`profile-owner-1536x1289.png`, `resume-owner-956x757.png`, `profile-narrow-390x844.png`). Lobby desktop/narrow captures are in the same folder.
- The deployed MP4 responds `206 Partial Content` with `Content-Range: bytes 0-1023/6935798`, `Content-Type: video/mp4`, and `Accept-Ranges: bytes`. Chrome loaded 112.65s metadata in Demos and the case-study hero, sought to 0/56.325/22.866667/111.9/112.4s, and played the Demos video through `ended` at 112.65s. The critical masked transition was visually inspected on the deployed Preview at desktop and narrow sizes; captures are `privacy-mask-1440x900.png` and `privacy-mask-390x844.png`. Rapid seeks canceled superseded range requests; no page/runtime or HTTP errors occurred.
- Route matrix results and additional deployed captures remain outside the repository in `%TEMP%\portfolio-b32d635-verify-artifacts\deployed-ca73cc5\`. The earlier Preview remains immutable and available for comparison.
## Remaining gates

- Owner review of this immutable Preview, including the matched Profile and Resume compositions.
- Owner review of Profile, Resume Found, C06, and banner appearance at the new Preview.
- Owner’s final privacy/release review of the full masked Cho’Veigo recording.
- Live Windows Narrator interaction remains a manual accessibility follow-up.
- Food Tracker has no authentic demo video yet.

Production was not touched. No historical design candidates or other worktrees were modified.
