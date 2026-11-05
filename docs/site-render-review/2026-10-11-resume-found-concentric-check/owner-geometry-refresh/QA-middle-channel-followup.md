# Resume Found middle-channel QA (read-only)

Local app: `http://127.0.0.1:5174` (Pass 03 shared worktree), tested 2026-10-11 in installed Chrome via Playwright.

## Reference and geometry

Figma `2407:340` is a 530×530 mechanism. Its `2407:343` measuring circuit is 464×464 and `2407:344` inner gold race is 424×424. In the rendered mechanism, `.resume-mechanism__orb-energy` is 464×464 and uses a radial mask from 90.5% to 98%, so the visible cyan channel remains bounded between the neighboring rings. The image capture confirms the cyan does not fill the central scenic disc or escape into the exterior ornament.

At 1440×900 the composition is 530×530 at x≈335; title is 240×24 at x≈480/y≈557, action plate/action is 170×56 at x≈515/y≈623, and Close is 94×15 at x≈553/y≈688. Visually, J and title occupy the inner zone; the View Resume label is centered inside the lower trapezoid; Close is centered on and attached to the outer gold ring’s bottom. The title is below the J with a small readable gap. No obvious collision or detached control remains. Relative to the Figma frame, the principal rings align; the title/action/Close are HTML overlays and are not part of the Figma base-frame screenshot.

At 390×844 the mechanism is 358×358 at x=16..374, y≈160..518. Title is 162×16 at y≈421, action/plate 115×38 at y≈466, and Close 64×12 at y≈510. All are visible and proportionally reduced; no horizontal overflow. Document scroll height is 905px, so the narrow page has about 61px of natural vertical scroll, but all controls are initially visible and usable.

## Ring states

Captured deterministic browser frames by pausing the actual CSS animation at Web Animations API currentTime 0ms, 800ms, and 1600ms (includes the 260ms CSS delay):

- Desktop empty / partial / full: `ring-desktop-empty.png`, `ring-desktop-partial.png`, `ring-desktop-full.png`.
- Narrow full: `ring-narrow-full.png`.
- Reduced-motion desktop: `resume-reduced-1440x900-beginning.png` (same complete state in all three samples).

Observed computed fill: 0deg / 169.043deg / 360deg. At 360deg opacity is 0.86 and the completed cyan channel remains visible. The full screenshot has a small bright leading glint at the left side of the ring, but the rest of the channel remains continuously illuminated; it reads as a subtle seam/highlight rather than an empty arc. With `prefers-reduced-motion: reduce`, animation is `none`, fill is immediately 360deg, opacity 0.86.

## Functional checks

- Dialog opens with `aria-modal=true`; originating route is inert.
- Tab from the dialog target reaches View Resume; Shift+Tab wraps to Close.
- Escape returns to `/home`, restores focus to the originating Resume link, and removes inert from the underlay.
- Close returns to `/home` and restores focus to the Resume link.
- View Resume navigates to `/resume/viewer`.
- No browser console/page errors or failed network requests during these checks; all mechanism and action images loaded (ready-check frame 530×530, J SVG layers, accept control assets).

## Visual evidence

- Figma base frame: `figma-2407-340.png`
- Owner problem screenshot: `C:\Users\samue\Downloads\portfolio-owner-references\portfolio-new-owner-problem-images\Resume_Found_Current_Composition.png`
- Desktop complete composition: `resume-1440x900-full.png`
- Narrow complete composition: `resume-390x844-full.png`
- Keyboard/action results: `resume-ring-interaction-qa.json`, `resume-keyboard.cjs` output recorded in parent thread
