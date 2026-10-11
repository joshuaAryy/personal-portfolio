# Owner Correction Pass 04 — Opening runtime QA

Read-only Chrome run against `http://127.0.0.1:5176/` from worktree HEAD `9fa09b0a104ff66de949840f0a893c53f251700c`. `src/Opening.tsx` and `src/opening.css` were already modified in the shared worktree; QA made no source changes. Captures were taken in real time using the browser animation timeline, without virtual-time seeking.

The implementation correction replaces an opaque black-backed bloom bitmap with a CSS radial bloom. For a matched visual comparison, the prior render is `../qa-orb-joint-fixed/actual-app-3100ms.png` and the corrected render is `activation-checkpoint-3p1s-1920x1080.png`. The prior frame shows the dark rectangular backing; the corrected frame has no hard square edge.

## Captures

- Full uninterrupted 1920×1080 run through Home: `opening-full-1920x1080-through-home.webm`
- Seven 1920×1080 runtime keyposes: `keypose-0p65s-1920x1080.png`, `keypose-0p96s-1920x1080.png`, `keypose-1p37s-1920x1080.png`, `keypose-2p58s-1920x1080.png`, `keypose-3p10s-1920x1080.png`, `keypose-3p80s-1920x1080.png`, `keypose-4p10s-1920x1080.png`
- Separate activation checkpoint: `activation-checkpoint-3p1s-1920x1080.png`
- 1440×720 settled: `viewport-1440x720-settled.png`
- 390×844 dormant/approach/settled: `viewport-390x844-dormant.png`, `viewport-390x844-approach.png`, `viewport-390x844-settled.png`
- Reduced-motion settled state before route handoff: `reduced-motion-static-before-handoff.png`
- Full measurements, assets, and browser errors: `report.json`

## Runtime measurements

- Opening first detected to Home route: **5,092.8ms**; commit-to-Home wall time: **5,883ms** including startup.
- Opening remained visible through all keypose captures. The CSS tick animation reached progress 1 / **360°** at about **3,900ms** after the first visible Opening sample, then held through the final pose and handoff.
- Requested vs measured keypose animation times: 650→650.6ms; 960→1,051ms; 1,370→1,451.3ms; 2,580→2,585.5ms; 3,100→3,102.7ms; 3,800→3,803.2ms; 4,100→4,153.6ms. The browser polling/screenshot handoff overshot the 960 and 1,370ms targets by about 80–90ms; actual times are recorded rather than presented as exact matches.
- At 1440×720, settled mark bounds were x=557.5, y=197.5, 325×325; viewport/document were both 1440×720.
- At 390×844, settled mark bounds were x=80.3, y=307.3, 229.4×229.4; Skip was fully in bounds; viewport/document were both 390×844.

## Visual inspection

The patched radial activation bloom has a round boundary and screen blend. In the 3.1s frame, I see no dark square behind the bloom and no square backing tile around the moving spark. The cyan effect reads as a restrained circular glow with localized joint light. The portal is partial at 3.1s and fully visible in the 3.8–4.1s frames; it stays behind the J/ring. At 2.58s the seam begins to light on the crown and hook joins; by 3.1s the fused J is coherent. The 3.1, 3.8, and 4.1 samples show no obvious silhouette pop; the 4.1s settled J/orb remains clean. No visible clipping at the checked sizes.

Skip navigated to `/home` and removed the Opening. Reduced motion displayed the settled J, portal, and ring immediately, with the bloom hidden and tick animation disabled. The 120ms reduced-motion handoff was held only in the test harness long enough to capture the actual static reduced state.

All observed console, page, failed-request, and HTTP error arrays were empty. Opening image assets loaded successfully. Desktop and narrow document dimensions matched their viewport dimensions.
