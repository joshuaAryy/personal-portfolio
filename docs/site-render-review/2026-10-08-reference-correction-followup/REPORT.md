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
| Profile Overview | **Already implemented in the starting branch; visually rechecked, no new code change** | The complete signal groups occupy the lower band at the owner's 1536×1289 reference size. The prior branch correction moved the group about 149px down and left about 148px below it. The annotated comparison and matched render are in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-reference-comparison-2026-10-08\`. Desktop aspect ratios and 390px narrow captures are retained there. Profile structure and identity rail were left intact. |
| Resume Found | **Implemented + visually verified; owner review open** | The matched 956×757 owner frame and Figma `2407:176` informed one cohesive upward correction to the lower stack: title 81%, View Resume 86%, Close 105.5%. The primary plate remains 212×70px at desktop and scales to about 143×47px on narrow. A one-shot 2.1s clockwise cyan sweep uses the outer orb; reduced motion suppresses it. Focus trap, Escape, originating page, View Resume, and Close remain. Captures are in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\resume-contract-after\` and `opening-resume-owner-correction-2026-10-08\`. |
| Category banners | **Implemented + visually compared** | Figma environments use the original party-background source and a 1.1px blur (`704:3`). React now applies `blur(1.1px)` to that environment layer while retaining the already-present top anchoring, banner fade, full-scene veil, and bottom shade. Projects keeps its stronger existing treatment. Same-size Figma/current renders and before/after captures are under `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\bottom-shade-fix\`. The React foreground layout differs from older Figma compositions; the environment treatment and no-hard-rectangle transition were compared without changing accepted lobby geometry. |
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
- Local integrated source SHA and deployed Preview are recorded in the owner handoff after the immutable feature Preview is published.

## Remaining gates

- New Preview deployment and browser verification against its exact source revision.
- Owner review of Profile, Resume Found, C06, and banner appearance at the new Preview.
- Owner’s final privacy/release review of the full masked Cho’Veigo recording.
- Live Windows Narrator interaction remains a manual accessibility follow-up.
- Food Tracker has no authentic demo video yet.

Production was not touched. No historical design candidates or other worktrees were modified.
