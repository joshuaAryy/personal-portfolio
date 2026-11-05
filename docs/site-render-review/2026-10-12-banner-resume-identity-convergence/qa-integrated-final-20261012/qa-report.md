# Integrated Chrome QA — bounded current candidate

Worktree: `C:\oc03`
Source HEAD at capture: see `qa-report.json`
Local target: `http://127.0.0.1:5182`
Browser: installed Google Chrome controlled with Playwright. Read-only application verification; no source edits or deployment.

The local capture run recorded Git HEAD `f22c68c`; the working tree contained the lobby/Profile/Resume changes later committed as `42069c0`. The exact clean-source Preview audit is in `../qa-deployed-95fca4c1/qa-report.md`.

## Results

- **Lobbies — PASS:** Projects, Experience, Hackathons, and Education were opened at 1920×1080, 1440×900, 1440×720, 1280×720, 2560×1080, and 390×844 (24 renders). All routes returned 200, had zero horizontal overflow, and loaded all page images. The banner group stayed centered in the main scene (measured center delta 0). Projects renders five banners and hides its balance-slot `+` group (`display:none`). The other three desktop routes render three banners and their two `+` controls are centered on the banner group's vertical midpoint at 1920×1080, 1440×720, 1280×720, and 2560×1080; controls are hidden on narrow layouts. Scenic background uses `50% 60%` in taller desktop and `50% 68%` at short desktop; renders preserve the forest/environment without apparent hard crop or missing artwork. At 1440×720 and 1280×720 the main area scrolls to the lower View action (122px for Projects; about 242–243px for the three category lobbies); bottom captures show the action within the viewport. Mobile cards stack and scroll vertically with no horizontal overflow.
- **Profile — PASS:** The 1280×720, 1920×1080, and 390×844 scenes were visually inspected. Portrait, identity banner, and three trait groups load and remain visually separated. At 1280×720 the signal grid ends at y=704 with 16px bottom room; at 1920×1080 it occupies y=778–1058. Narrow profile scrolls vertically (document height 1639px) with no horizontal overflow. I saw no trait collision or obvious clipped identity/trait content in these renders.
- **Resume — PASS:** Direct `/resume` loaded at 1440×900 and 390×844. The `portal-plasma-2x.png` resource loaded, the energy layer has an annular mask, and the fill remains bounded between the gold rails while leaving the lower plate gap clear. Captures cover 36°, 153°, 306°, and reduced-motion completed state at both sizes. Desktop composition is 640×640 at x=280,y=170; narrow composition is 358×358 at x=16,y=278. Action plate remains within the composition; Close sits centered on and overlaps the lower outer-ring base by design (its bottom extends about 13–14px below the composition box), without clipping or horizontal overflow. From Home, Escape and Close return to `/home` and restore focus to the Resume link; View Resume reaches `/resume/viewer`. Direct `/resume` Close returns Home and View opens the viewer.
- **Food Tracker gallery — PASS:** `/projects/food-tracker` returned 200 at 1440×900 and 390×844. All four images loaded: Macro Composition (app capture), Calorie forecast (owner design reference), Fiber trend and Daily completeness (Figma studies). Desktop uses a 2×2 gallery; narrow layout stacks the cards. Visible copy describes the feature/content; no internal provenance sentence appears in the gallery, and there is no horizontal overflow.
- **Runtime — PASS:** Across the captured matrix, zero console/page errors, failed requests, HTTP errors, or broken images.

## Evidence

The JSON report contains measurements for the full route/viewport matrix. This checkpoint commits the matched before/after views and a curated set of additional route captures; other raw matrix screenshots remain local rather than being copied into the review commit.

- Lobbies: the owner correction report links matched 1440×900 Projects/Experience before-and-after views and selected Hackathons/Education results.
- Profile: the owner correction report links the matched 1280×720 before-and-after views.
- Resume: selected progression and reduced-motion captures are linked in the owner correction report; the full state/viewport measurements remain in `qa-report.json`.
- Food: `food-gallery-1440x900.png`, `food-gallery-390x844.png`.
- Existing matched before/after closeups: `../qa-958b4cd/energy-material-followup-20261012/{before,after}/`.
- Actual settled direct-route Chrome renders: `%TEMP%\resume-energy-live-1440x900.png` and `%TEMP%\resume-energy-live-390x844.png`.

The animation pose screenshots are controlled static states, not claims of a timed video capture. Reduced-motion was separately checked with Chrome emulation and reported a full 306° ring with no active animation.
