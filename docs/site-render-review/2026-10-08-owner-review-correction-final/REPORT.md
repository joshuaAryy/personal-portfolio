# Owner review correction checkpoint — 2026-10-08

## Review status

**REVIEW CHECKPOINT READY.** This is an immutable feature Preview for owner review, not portfolio completion.

- **Remote branch:** `feat/portfolio-integration`
- **Application source deployed:** `ba9cb23c92875e35b1b3ae730917d41a14e3d6de`
- **Immutable Preview:** https://cea50a37.joshuaik2.pages.dev/
- **Preview deployment ID:** `cea50a37-740b-4b73-9c11-5c1795cbf2f4`
- **Production:** not targeted

The Preview is a Cloudflare **Preview** deployment on `feat/portfolio-integration`, not production. At deploy time the source commit and remote branch HEAD both resolved to `ba9cb23`. A later documentation-only checkpoint may advance the branch HEAD without changing the deployed application source.

## What changed since the prior owner-reviewed checkpoint

The accumulated visual/content corrections through `796fd52` remain in the candidate. `7ba58ad` adds path-scoped byte-range support for the full Cho'Veigo WebM, fixing Chrome seeking. This checkpoint adds `ba9cb23`: a tall-desktop-only Profile signal-row position adjustment, bounded to 1500–1858px widths and 1080px+ heights. No other page was redesigned.

The Preview retains the C06 keyed-forge Opening, canonical shared activity identities, layered lobby banner treatment, lower Profile signal row, Resume Found takeover and orb sweep, Food ownership/stack/evaluation copy, simplified Fraymakers hero, concise Stush story, and Education's four-card layout. Home composition, Journey, Personal Highlights, Crest, Living in Silico's broad story, and Cho'Veigo's broad story were preserved.

## Correction ledger

| Surface | Status | Verified result / remaining boundary |
|---|---|---|
| Opening / C06 | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | The C06 J remains a continuous assembled silhouette; the Sol motion contract keeps the mark's pieces fixed and animates seam light and a restrained sheen. Captures at 100, 350, 550, and 830 ms are in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\opening-contract-after\`. Skip, reduced-motion handoff, and the three-second opening remain. A fresh installed-Chrome reduced-motion launch of the Preview landed on Home within 1.8 seconds; screenshot: `deployed-94f63e76\opening-reduced-motion.png`. The exact requested upload name `league opening(1).mp4` is the same recording as the available `C:\Users\samue\Videos\league opening.mp4`, confirmed by the owner. It is 4.800 s, 1920×1080, 286 video frames at 60 fps. It was sampled at 0.2–4.6 s. The opening clip shows a central League mark and ring first, then a radial tick field with a loading label/progress bar around 2.4–3.4 s; the portfolio intentionally does not copy that fake loading UI. |
| Ready-check reference | **INSPECTED; PORTFOLIO OWNER REVIEW OPEN** | `C:\Users\samue\Videos\half of ready check.mp4` is 12.971 s, 1920×1080, 388 frames at 30 fps. Samples from 0.5–11.5 s show the scenic orb, a clockwise advancing cyan ring highlight, the large found title, and the accept/decline controls; later frames hold the ready state. Reference captures remain local in `%TEMP%\portfolio-video-review-2026-10-08\`; they are not portfolio media. |
| Activity identities | **IMPLEMENTED + VISUALLY VERIFIED** | Experience-lobby and Activity entries use the same Living in Silico and Stush Patties marks, with the shared identity data also used by the other project entries. Desktop comparison: `deployed-94f63e76\surface-experience.png`; the desktop/narrow route smoke also covered Home and the shared rail. |
| Category banners | **IMPLEMENTED + VISUALLY VERIFIED** | Figma inspection found three relevant layers, not a separate glow asset: full-scene veil `rgba(0,5,7,.34)`, bottom shade `rgba(1,4,6,.36)`, and a 1500×210 downward banner fade with stops `.99 / .82 / .36 / 0`. Experience `704:2`, Hackathons `730:3316`, and Education `738:3316` now render this layered transition. Projects retains its stronger existing treatment. Same-size Figma/Preview captures are in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\bottom-shade-fix\` and `%TEMP%\portfolio-b32d635-verify-artifacts\deployed-94f63e76\surface-{projects,experience,hackathons,education}.png`; each also has a before/after desktop and narrow capture. The latest Preview retains top anchoring and fade without a hard image rectangle. |
| Profile signal placement | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | The owner’s clean and annotated screenshots were inspected at 1536×1289. The complete four-signal grid moved from y=796.5–991.9 to y=945.3–1140.7 (about 149px lower), reducing the visible tail beneath the row from about 297px to 148px. This matches the annotation’s lower-band target while retaining a small bottom margin. The change is height-bounded; 1440×900, 1920×1080, 1600×760, 1400×720, and 390×844 remain at their previous placement. Before/after captures and geometry are in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-reference-comparison-2026-10-08\` and `%TEMP%\portfolio-b32d635-verify-artifacts\deployed-cea50a37\`. |
| Resume Found | **NO CHANGE IN THIS PASS — CURRENT PREVIEW VISUALLY MATCHES FIGMA; OWNER REVIEW OPEN** | The owner’s 956×757 screenshot was compared with the deployed 956×757 Chrome render and Figma `2407:176`. The current orb/title/action/Close stack follows the Figma proportions: system 371px, title y=455, primary plate 148×49 at y=473, Close y=548. The submitted owner frame shows the oversized plate/displaced composition under review; the latest Preview’s action is smaller and the stack sits in the Figma’s lower ring geometry, so no additional CSS nudge was justified. Desktop and 390×844 captures are in `%TEMP%\portfolio-b32d635-verify-artifacts\deployed-cea50a37\resume-owner.png`, `resume-mobile.png`, and `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\resume-figma-2407-176.png`. |
| Cho'Veigo full demo | **IMPLEMENTED + RUNTIME VERIFIED; OWNER RELEASE REVIEW OPEN** | The full 112.65-second masked derivative is used in Demos and the case-study hero. On Preview `cea50a37`, a Range request returns `206 Partial Content`, `Content-Range: bytes 0-1023/4388479`, and `Accept-Ranges: bytes`. The prior installed-Chrome check confirmed seeking to 80 seconds in both placements. The original recording remains private; Joshua’s final masked-frame/public-release review remains open. |
| Food Tracker | **IMPLEMENTED + VISUALLY VERIFIED; DEMO VIDEO PENDING** | Existing breadth and product path are preserved. Opening copy gives balanced product/technical ownership, hands-on coding/debugging, and agentic workflow credit; the early stack is source-verified. Top-1/Top-3 and development/holdout evaluation are explained beside the existing chart. An authentic populated Insights capture is included. No authentic demo video is available. |
| Fraymakers | **IMPLEMENTED + VISUALLY VERIFIED** | Opening uses one concise conceptual 16:9 thumbnail composition; later sections retain source-bounded rendering detail and ownership boundaries. The illustration is identified as conceptual rather than a generated project output. |
| Stush Patties | **IMPLEMENTED + VISUALLY VERIFIED** | The recurring source-normalization animation remains. The downstream story is shorter, keeps anonymous source labels, preserves collaborator privacy, and does not foreground distributor names. |
| Education | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | `/education/projects` returns to the preferred four-card, two-column layout under the TMU / Computer Engineering / Software Specialization / B.Eng. / Expected 2028 header. Public evidence-status language is absent. The internal-scroll after capture shows all four cards: `%TEMP%\portfolio-b32d635-verify-artifacts\deployed-94f63e76\education-projects-lower.png`. Historical layout comparison: `https://9b005252.joshuaik2.pages.dev/education/projects` and `https://c67a89da.joshuaik2.pages.dev/education/projects`. |
| Locked surfaces | **NOT CHANGED — PRESERVED BY DIRECTION** | Home composition, Journey, Personal Highlights structure, Crest composition, Living in Silico broad story, and Cho'Veigo broad narrative were not materially redesigned. |

## Visual evidence locations

Screenshots and short-lived comparison captures were kept outside the repository to avoid committing large browser artifacts:

- Current Preview captures: `C:\Users\samue\AppData\Local\Temp\portfolio-b32d635-verify-artifacts\deployed-cea50a37\`
- Profile owner-reference before/after renders: `C:\Users\samue\AppData\Local\Temp\portfolio-b32d635-verify-artifacts\owner-reference-comparison-2026-10-08\before\` and `...\after\`; original owner images are preserved at `C:\Users\samue\Downloads\portfolio-owner-references\` and were not copied into the repo.
- Banner before/after and Figma frames: `C:\Users\samue\AppData\Local\Temp\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\bottom-shade-fix\`
- Opening frame captures: `C:\Users\samue\AppData\Local\Temp\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\opening-contract-after\`
- Resume Figma frame: `C:\Users\samue\AppData\Local\Temp\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\resume-figma-2407-176.png`
- Owner video samples: `C:\Users\samue\AppData\Local\Temp\portfolio-video-review-2026-10-08\`

Owner-supplied references inspected: `Profile_Overview_Clean.png`, `Profile_Overview_Annotated_Red_Yellow.png`, and `Resume_Found_Alignment.png` in `C:\Users\samue\Downloads\portfolio-owner-references\`. The ZIP and both identical source ZIP copies remain preserved. The two League videos were also inspected at source frame rate; their motion observations are recorded above. These are references, not portfolio media.

## Verification

- `npm test -- --run`: **28 files, 248 tests passed**. Happy DOM prints iframe/PDF fetch aborts during teardown; Vitest exits 0 with no failed tests.
- `npm run build`: passed. Vite's existing JS chunk advisory reports 501.73 kB against the 500 kB threshold.
- `git diff --check` and `git diff --cached --check`: passed after the final documentation updates; no whitespace errors.
- Installed Chrome checked **20 routes at 1920×1080 and 390×844 (40 route/viewport checks)** with no broken images, page errors, failed requests, or horizontal document overflow. Additional Chrome captures cover Profile at 1536×1289, 1440×900, 1920×1080, 1600×760, 1400×720, and 390×844, plus Resume Found at the owner’s 956×757 screenshot size and 390×844. The `cea50a37` route/viewport report is `deployed-cea50a37\smoke.json`.
- Education's final route was internally scrolled to verify all four cards, not inferred from the initial viewport alone.
- The deployed JS and CSS match the local build: JS `2e13805208a25a7401df7d2f58283e865a482f5cd094282c456655c2b4f56bd7`, CSS `b30b74dcada31b8481308d9773d8ae0ffd99b9ce3e81588fab066276cdfb654b`. The full demo returns byte ranges; its local SHA-256 remains `27d222cc0abd62b6f078b1c026717ca5b0dbeafdc7f10ccdbbe9a6180b3bd9b9`.
- Reduced-motion Chrome launch of the deployed Preview reached Home at 1440×900; `opening-reduced-motion.png` is in the final Preview capture folder. C06 intermediate frames were inspected at the bounded contract times.

## Remaining owner/manual gates

1. Owner review of the Profile lower-band placement and Resume Found alignment against the supplied screenshots.
2. Owner review and public-release approval of the masked full Cho'Veigo demo.
3. Live Windows Narrator interaction; automation and browser accessibility checks do not replace this manual pass.
4. Food Tracker authentic demo media remains unavailable. This does not block the current Preview.

The previous Preview and historical Figma/candidate artifacts remain preserved. Both owner ZIP files and the extracted reference images remain in Downloads; temporary comparison captures are outside the repo. Other worktrees and unrelated modified/untracked material were not cleaned, reset, or staged. The local `.wrangler/` directory remains untracked and was not included. Production was not touched.
