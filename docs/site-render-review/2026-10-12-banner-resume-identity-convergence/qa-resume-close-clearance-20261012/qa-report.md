# Resume Found Close clearance — Chrome follow-up

Source: `C:\oc03`, Git HEAD at capture `f22c68cf84d57fb00a899ded45a74f0fca43f9db`; the working tree included the Resume correction later committed as `42069c0`. Local Vite `http://127.0.0.1:5182`. Browser: installed Google Chrome via Playwright. Read-only QA, no source edits or deployment. The exact clean-source Preview audit is in `../qa-deployed-95fca4c1/qa-report.md`.

## Result

**PASS.** At 1440×900, 390×844, and 1280×720, the outer frame ends at the composition bottom and Close now begins at or just below that edge (measured gap 0–1.89 CSS px across starting/partial/completed captures). Thus the outer ring visibly ends above the Close rectangle with a small clearance. Close stays fully inside the viewport: bottom margin is 62.71–63.05px at 1440×900, 184.9–186px at 390×844, and 14.01–15.91px at 1280×720. No horizontal overflow at any size.

The real `/resume` route returned HTTP 200. Plasma asset loaded. Static 36°, 153°, and 306° renders show the bounded channel and lower plate gap; reduced-motion emulation gives a full 306° ring with no active animation. Visual captures show the Close box centered at the bottom of the outer ring, not disconnected below it.

Modal keyboard Escape and the Close button both return to `/home` and restore focus to the Home Resume link. Direct route Close returns to `/home`; View Resume reaches `/resume/viewer`. The modal opens as a dialog with an inert and `aria-hidden=true` underlay. Chrome reported zero console/page errors, failed requests, or HTTP errors.

## Evidence

- Detailed measurements/actions/runtime: `qa-report.json`.
- Renders: the review report links matched 1440×900 before/after and selected 1440×900, 1280×720, and 390×844 Resume states. Additional local render captures are retained outside the review commit.
- Key geometry: `closeGapFromCompositionBottom`, `closeFullyVisible`, `closeBottomViewportGap`, and `overflow` in the JSON.
