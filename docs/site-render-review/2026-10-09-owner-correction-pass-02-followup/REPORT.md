# Owner Correction Pass 02 - Review Checkpoint Follow-up

- Date: 2026-10-09
- Branch: `origin/feat/portfolio-integration`
- Application source: `f94334872f3d849c60ec670eca4512f3cb69739d`
- Immutable feature Preview: https://21b9ff43.joshuaik2.pages.dev/
- Supersedes the temporary top-origin Preview at source `6e77dc5` / https://68cca15c.joshuaik2.pages.dev/.

This follow-up restores the historical lobby composition requested by the latest owner direction. It preserves the other Owner Correction Pass 02 work recorded in [the main report](../2026-10-09-owner-correction-pass-02/REPORT.md). The deployed Preview was built from a clean worktree at `f943348`. Production was not targeted.

## Correction ledger

| Surface | Status | Result |
|---|---|---|
| Projects / Experience / Hackathons / Education banners | **IMPLEMENTED + VISUALLY VERIFIED** | Restored the pre-top-origin geometry from `6dcaf8e:src/lobby.css`. The banner group uses the earlier top 9%, bottom 29%, and side spacing; Experience/Hackathons/Education use 12% side insets and the established three-column gap. Projects retains its own unchanged geometry. The preserved top-to-bottom environment mask and later portrait fitting remain. |
| Home, Activity identities, projects entry interaction | **PRESERVED + DEPLOYED-VERIFIED** | Home composition remains unchanged. After Skip, desktop Activity shows the canonical Living in Silico and Stush Patties marks and routes. Projects -> Fraymakers -> Open Case Study reaches the expected route. Narrow Activity visibility follows the responsive layout. |
| Original Cho'Veigo demo | **PRESERVED + DEPLOYED-SOURCE-VERIFIED** | Owner authorized the exact original unchanged. Local source SHA-256 is `1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801`. Deployed endpoint reports that exact SHA in its ETag, has size 32,915,943 bytes, supports HEAD 200, and Range 206. Full-duration playback, seeking, and audio were exercised in both player placements on the preceding app Preview; the current correction only changes lobby CSS/test. |
| Other Owner Correction Pass 02 surfaces | **PRESERVED - SEE PRIOR REPORT** | Opening/J, Profile, Resume Found, Food Tracker, Fraymakers, Stush, Education, Help/X and owner-approved Home/Journey/Crest/Highlights/Living are unchanged by this follow-up. Their implementation and verification ledger remains in the main report. |
| Production and historical artifacts | **NOT CHANGED** | No production deploy occurred. The prior Preview and historical screenshots/candidates remain preserved. Unrelated dirty/untracked worktree material was not staged. |

## Visual comparison

The exact historical `6dcaf8e` captures, the superseded top-origin capture, and corrected local captures are stored outside Git:

- Historical reference: `C:\Users\samue\AppData\Local\Temp\portfolio-pass02-lobby-restore\historical-6dc-{projects,experience,hackathons,education}-{1920x1080,390x844}.png`
- Rejected top-origin state: `C:\Users\samue\AppData\Local\Temp\portfolio-pass02-lobby-restore\after-{projects,experience,hackathons,education}-{1920x1080,390x844}.png`
- Corrected local render: `C:\Users\samue\AppData\Local\Temp\portfolio-pass02-lobby-restore\historical-restore-after\restored-{projects,experience,hackathons,education}-{1920x1080,390x844}.png`
- Corrected deployed Chrome render: `C:\Users\samue\AppData\Local\Temp\portfolio-preview-21b9ff43-audit-20261009\screenshots\{projects,experience,hackathons,education}-{1920x1080,390x844}.png`

At 1920x1080, corrected Projects geometry is x=107,y=84,w=1346. The other three groups are x=192,y=197,w=1216, matching the historical captures. At 390x844, all banner groups fit x=13,w=364; their narrow composition matches local corrected renders exactly. Historical narrow captures begin after the global navigation was scrolled away; compare the heading-to-banner relationship after normalizing that roughly 70px offset.

## Verification

- `npm test -- --run`: 264 passed across 30 files. Happy DOM emitted AbortError teardown traces for PDF/iframe fetches, but the test command exited 0 with all tests passing.
- `npm run build`: passed. Existing Vite advisory: JavaScript chunk is 503.50 kB after minification.
- `git diff --check`: passed.
- Deployed JS SHA-256: `E03E2022F325A577539E5A156B4581690D7FA534907C1CAD27EBD19CEB480C62`.
- Deployed CSS SHA-256: `FFD1BDF770A920029D2B50CB56855C70970B32CD1DFDCF01AFF0E1E618EE3405`.
- All 17 direct routes returned HTTP 200. Installed Chrome checked Home and the four lobbies at 1920x1080 and 390x844: zero browser/console errors, request failures, bad responses, broken images, or horizontal overflow. Skip reached `/home`; the Fraymakers case-study interaction rendered correctly. Deployed audit report: `C:\Users\samue\AppData\Local\Temp\portfolio-preview-21b9ff43-audit-20261009\deployed-preview-audit.md`.
- Deployed video HEAD returned 200; a byte range returned 206 with the original source SHA in the ETag.

## Remaining follow-up

Food Tracker still has no authentic demo video. Live screen-reader interaction remains a manual Windows Narrator review; automated route, keyboard, and accessibility-tree checks are not a substitute. Owner review of this immutable Preview is open. The persistent portfolio goal remains active and is not declared complete.
