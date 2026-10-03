# CLI browser capability proof

Actual Chrome 153.0.8010.53, launched using existing Playwright 1.63.0 `channel: chrome`, headless, isolated browser context, 1920×1080, DPR 1. No installation or owner-profile access. Source and interaction metadata: [evidence.json](evidence.json).

Preview source `6accc709a5dea97a22a8b0dfaf0755d11ba8884c` at `https://d7164429.joshuaik2.pages.dev/`. Captured Resume Found, clicked View Resume, observed the iframe, returned to Resume Found, closed to Home. No page errors. Both PNGs visually inspected by Mingo.

These are actual rendered browser screenshots. This proves CLI render/interaction/capture availability; it does not establish Figma parity, motion acceptance, accessibility acceptance, or owner approval. The viewer capture has a blank PDF region and requires further document-loading investigation. Do not mark PDF rendering passed from iframe existence.

- [Resume Found](resume-found-1920x1080.png)
- [Viewer initial capture](resume-viewer-1920x1080.png)

Desktop built-in Browser discovery was inappropriate for the CLI client and is no longer a validation prerequisite. Installed enabled browser, chrome, and computer-use plugins were enumerated; Chrome extension control itself was unavailable. The existing standalone Playwright/installed Chrome path provides the working real-browser lane.
