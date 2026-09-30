# Profile Signals Review — 2026-09-30

The owner-selected behavior is static with respect to main-page navigation: the signal counts do not navigate or pin another panel. Projects, Experience, Hackathon, and Academics each preview their own hover/focus overlay, returning to the default Projects state when pointer or focus leaves the Profile overview.

The approved layout still has four equal Projects sectors. In the live Figma frame `998:3`, the Food Tracker mark (`1096:2`), Crest mark (`1237:2`), and official Fraymakers wordmark (`3115:45`) now sit with their respective titles. Cho’Veigo remains a typographic project name because its public repository has no standalone logo; generic initials are not used. The lower signal counts remain static, with distinct transient hover/focus overlays supplied by implementation.

## Visual evidence

- Current Figma Projects-state capture: [`profile-projects-overlay-2026-09-30.png`](profile-projects-overlay-2026-09-30.png), 1106×642, SHA-256 `C95168B5869466F9E3CE3D314D8573DE28C478240B89EA4E9C5A524D5FDCC07E`. It shows the preserved four equal sectors, three authentic identity marks, the Cho’Veigo typographic name, and the fixed signal counts.
- Prior site Projects capture: [`profile-projects-overlay-2026-09-29.png`](../site-render-review/profile-projects-overlay-2026-09-29.png), 1106×642, SHA-256 `46F79A42D8623E58405C405695B26EB2AB5D6A8E32A7BCBB9DB0EE6B0044A8F4`. This predates the Figma logo update and is not current website visual proof.
- The former `projects-overlay-current-2026-09-29.png` capture showed an empty Projects panel despite its later timestamp. It has been renamed [`projects-overlay-empty-panel-stale-2026-09-29.png`](projects-overlay-empty-panel-stale-2026-09-29.png) so it cannot be mistaken for a current state.

The live Figma update has been directly inspected. Website render synchronization, responsive acceptance, and browser interaction review remain open. The base Profile composition stays anchored to Figma `960:2`.
