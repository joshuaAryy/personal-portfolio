# Owner Correction Pass 02 — Review Checkpoint

- Date: 2026-10-09
- Application source: 38e50e44e29eb2334df3be88c393c9e5808b8ed0
- Remote branch: `origin/feat/portfolio-integration`
- Immutable Preview: https://fa9e24d0.joshuaik2.pages.dev/

The Preview was deployed from a clean build of the exact application source commit above. The application changes are a4a831b plus a test-only line-ending normalization in 38e50e4; a later documentation-only commit may advance the branch without changing the deployed application. Production was not targeted. The persistent portfolio goal remains active; this is a review checkpoint, not completion.

## Correction ledger

| Surface | Status | Result |
|---|---|---|
| Opening / J | IMPLEMENTED + VISUALLY VERIFIED | Restored editable Sonnet v8 material layers (Figma 3325:191) rather than the weaker recent C06 animated state. The bounded a4a831b adjustment makes the pieces reform more legibly without replacing the v8 silhouette. Normal duration is 5.0s; installed Chrome sampled 45 points and measured one visible 360° tick-field revolution. Skip and reduced-motion handoff passed. Captures at 0.25s, 1.5s, 1.8s, 2.7s, 3.8s, and 4.2s plus the prior phased sequence are retained for comparison.
| Shared Activity identities | **IMPLEMENTED + VISUALLY VERIFIED** | Living in Silico and Stush Patties use their canonical marks in Home and Experience, consistent with their lobby identities. Food Tracker, Cho'Veigo, Crest, Fraymakers, and the portfolio J continue to resolve through the shared identity system. |
| Category banners | IMPLEMENTED + VISUALLY VERIFIED | Reverted the top-origin experiment to the stronger historical composition. After a 1.9s settle, desktop banner positions match historical references within about 2px; narrow heading-to-banner spacing matches within 1px after normalizing the current sticky mobile navigation offset. Fade animations had completed. Hackathons item order differs from the historical capture (Crest/Joshua/Coming Soon vs Coming Soon/Joshua/Crest), with Crest selected in both; banner composition is unchanged.
| Profile Overview | IMPLEMENTED + VISUALLY VERIFIED | Reduced the unused lower scene area so the four signal groups occupy the lower band with a small lower margin. All four overlays are anchored to their signals: panel-to-icon distance is 46px desktop and 12px narrow, with no sibling collision or overflow. Identity rail, art, icons, counts, content, and interactions remain intact.
| Resume Found | IMPLEMENTED + VISUALLY VERIFIED | Kept the dimmed originating page and fitted the J, title plaque, cyan action plate, and Close into the mechanism's lower geometry. The middle energy ring fills once and remains fully illuminated; reduced motion displays the complete ring without animation. Tab/Shift+Tab wrap in the dialog; Escape and Close restore focus to the exact opener on /profile; View Resume navigates to /resume/viewer.
| Cho'Veigo full demo | **IMPLEMENTED + VISUALLY VERIFIED** | Both Demos and case-study players serve the unchanged original, 112.638333s at 1920×1080 with audio. Play/pause, seek, keyboard controls, and audio decoding passed. Original SHA-256: `1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801`. The owner authorized publication as-is. The earlier redacted file remains preserved but is not the primary demo. |
| Food Tracker | **IMPLEMENTED + VISUALLY VERIFIED** | Removed internal capture/phase/fixture labels from public captions; grouped authentic Insights captures; made the three logging routes distinct while retaining their shared review/save path; clarified the data flow into candidate ranking and the offline Top-1/Top-3 evaluation in plain language. Verified PostgreSQL as nutrition authority and Pinecone as candidate retrieval only. The early stack and hands-on ownership wording remain concise. Desktop and narrow local renders passed. |
| Fraymakers hero | **IMPLEMENTED + VISUALLY VERIFIED** | Added a small amount of character/costume, assist, and logo input context to the illustrative 16:9 hero while preserving its silhouette, renderer/output line, and explicit distinction from generated project output. The candidate was compared against the previous hero at 1440×900 and 390×844 and retained. |
| Help / X utility | **IMPLEMENTED + VISUALLY VERIFIED** | Help alignment and footer centering passed; X links to `https://x.com/Cartizionplane`. |
| Education, Home, Journey, Crest, Highlights, Living, Stush | PRESERVED — OWNER-POSITIVE | Education remains the approved four-card brief layout; no optional TMU crest was added. Home, Journey, Crest, Personal Highlights, Living's broad story, and Stush's approved transformation/presentation were not redesigned. |
| Production | **NOT CHANGED** | No production deployment or production-site modification occurred. Historical candidates and unrelated untracked worktree material were preserved. |

## Verification

- npm test -- --run: 264 tests passed across 30 files. Happy DOM printed aborted PDF/iframe-fetch traces during teardown; the command exited 0 with all tests passing.
- npm run build: passed from a clean archive of 38e50e4. Vite reports a 503.50 kB JavaScript chunk advisory. Build sizes: JS 503,495 bytes; CSS 488,091 bytes.
- git diff --check: passed for the intended commits. Unrelated modified Living-in-Silico work and .wrangler/ remain unstaged and uncommitted.
- Installed Chrome 153: 14 canonical routes at 1920×1080 and 390×844; no route, broken-image, page/console, bad HTTP, or horizontal-overflow failures. Deployed JS index-BNJSHaR1.js SHA-256 E03E2022F325A577539E5A156B4581690D7FA534907C1CAD27EBD19CEB480C62 and CSS index-TekJJ6nS.css SHA-256 7F43CB4C0DF2133EAE66AF94B78401BBAE479F999180FDE826E7BA59DED9257B match the clean build byte-for-byte.
- Opening: 45 browser samples measured one 360° revolution; Skip and reduced-motion handoff reached /home.
- Resume Found: ring samples 0° → 169.261° → 360° and remained at 360°; reduced motion shows 360° with animation disabled. Focus trap, Escape/Close exact focus restoration, and View Resume to /resume/viewer passed.
- Cho'Veigo: both players report 112.638333s at 1920×1080 with audio; play/pause/seek and audio decode passed. Original SHA-256 1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801; endpoint HEAD 200 and Range 206, size 32,915,943 bytes. The focused browser run logged request-failure callbacks after seek/context teardown without callback reasons; playback, audio, seek, and HTTP range succeeded, and route smoke recorded no such failures.
- Profile and settled lobbies: all four overlay captures show panels adjacent to their signals. Desktop lobby first-banner tops match historical screenshots within about 2px. Narrow captures include the current 70px mobile nav; after normalizing the historical captures' scrolled-out nav, heading-to-banner gaps match within 1px.
## Before/after evidence

Captures are intentionally kept outside Git to avoid committing bulky browser images. Owner references and rendered evidence:

- Profile owner baselines: C:\Users\samue\Downloads\portfolio-owner-references\Profile_Overview_Annotated_Red_Yellow.png and Profile_Projects_Overlay_Far_Above_Icon.png. Deployed after: C:\Users\samue\AppData\Local\Temp\portfolio-feature-preview-audit-38e50e4-20261009-01\screenshots\profile-neutral-1920x1080.png, profile-{projects,experience,hackathon,academics}-1920x1080.png, and corresponding 390x844 captures.
- Resume owner baseline: C:\Users\samue\Downloads\portfolio-owner-references\portfolio-new-owner-problem-images\Resume_Found_Current_Composition.png. Deployed after: screenshots\resume-566x653-{empty,mid,full,settled}.png, resume-390x844-{empty,mid,full,settled}.png, and resume-reduced-390x844.png in the same audit folder. Focus interaction: resume-viewer-after-view.png.
- Lobby comparisons: deployed settled screenshots\lobby-settled-{projects,experience,hackathons,education}-{1920x1080,390x844}.png versus historical C:\Users\samue\AppData\Local\Temp\portfolio-pass02-lobby-restore\historical-6dc-{projects,experience,hackathons,education}-{1920x1080,390x844}.png. Normalized geometry is recorded in settled-lobbies-resume-followup.md / .json.
- Opening: deployed captures screenshots\opening-250ms.png, opening-1500ms.png, opening-1800ms.png, opening-2700ms.png, opening-3800ms.png, opening-4200ms.png, and reduced-motion frames in the audit folder. Phased motion source captures are in C:\Users\samue\AppData\Local\Temp\portfolio-pass02-opening-sol-contract; the v8 editable reference is Figma 3325:191.
- Food: deployed desktop/narrow screenshots\food-logging-{1440x900,390x844}.png, food-retrieval-{1440x900,390x844}.png, and food-evaluation-{1440x900,390x844}.png; existing full-page captures remain in C:\Users\samue\AppData\Local\Temp\food-case-study-after.
- Fraymakers before/after, desktop and narrow: C:\Users\samue\AppData\Local\Temp\portfolio-pass02-runtime-qa\fray-1440x900.png / fray-390x844.png and C:\Users\samue\AppData\Local\Temp\fraymakers-hero-candidate-2026-10-09\fray-1440x900-after.png / fray-390x844-after.png. Deployed route captures are under the current audit folder.
- Full-video browser evidence: screenshots\video-demos-{1440x900,390x844}.png, video-case-study-{1440x900,390x844}.png, plus timing/seek/audio diagnostics in fast-metrics.json and settled-lobbies-resume-followup.json under the current audit folder.

## Remaining manual review

Live screen-reader interaction has not been performed. Use Windows Narrator on the Preview to review Home navigation/utilities, contextual Help open/close and focus return, Resume Found/Viewer, Profile signal names/states, and case-study/Demos navigation at desktop and narrow widths. Chrome keyboard and accessibility-tree checks do not replace this interaction.

Food Tracker still has no authentic demo video; the case study uses verified product stills. The remaining known owner gate is review of this immutable Preview. The persistent portfolio goal remains active.
