# Education Route + Responsive Lobby Render — 2026-10-04

## Preview source and Figma

- Source commit: db3a305f331f367693641b59ada5f689b9074b98.
- Cloudflare Pages Preview: https://82b1c0f8.joshuaik2.pages.dev/
- Branch alias: https://feat-portfolio-integration.joshuaik2.pages.dev/
- Browser: Playwright 1.63.0 with Google Chrome 153.0.8010.53.
- Figma node 738:3316 is the Education lobby shell. No dedicated Figma detail body exists for /education/projects; this render checks route behavior and responsive fit, not exact body parity.

## Education route

At 1920×1080 and 390×844, /education and the academic-project route returned HTTP 200. The visible VIEW EDUCATION action navigated to /education/projects. Both detail-page runs loaded 19/19 images and reported no console, page, request, or HTTP errors; document and main widths matched the viewport.

The route shows four project headings, Dental marked CURRENT · IN PROGRESS and EVIDENCE PENDING, and Bookstore and CMOS marked EVIDENCE PENDING. The ALU and FSM notes match the verified source audit: 8-bit unsigned inputs, clocked operations, separate magnitude and Neg sign flag, two 4-bit result outputs, and a nine-state Moore machine. They state that the configured top-level is a decoder and keep the ALU/FSM as separate source components. No Dean's List, scholarship, or unverified Java/Swing claim appears.

At 390px, Help is reached by keyboard at Tab 10. Enter opens one dialog; Escape closes it without changing the route. This is runtime/keyboard evidence, not a screen-reader acceptance claim.

## Responsive lobby correction

The first 390px Preview probe found document/main width 421px for Experience, Hackathons, and Education; Projects remained 390px. The non-Projects banner grid retained its desktop 12% side offset after entering relative mobile flow. The source correction in src/lobby.css sets zero left/right offsets at the responsive breakpoint.

After the fix, all four lobby routes passed width checks at 390, 520, 760, 900, and 901px (20 route/viewport combinations). No document or main horizontal overflow remained. The same fix is in the Preview source commit above.

## Evidence

- Current Education lobby Figma capture: education-current-738-3316.png.
- Education lobby captures: education-lobby-desktop-viewport.png and education-lobby-narrow-viewport.png.
- Academic route captures: education-projects-desktop-full-page.png and education-projects-narrow-full-page.png, plus viewport captures.
- Machine-readable route, keyboard, image, error, and overflow checks: evidence.json.

Production was not targeted. Dental, Bookstore, and CMOS remain evidence-pending and may gain supported detail when originals or owner-supplied context are reconciled; this is not a permanent sparse-content decision.
