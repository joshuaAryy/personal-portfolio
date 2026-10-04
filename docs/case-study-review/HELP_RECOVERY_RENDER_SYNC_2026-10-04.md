# Help and Recovery Render Sync - 2026-10-04

## Result

Help and recovery were checked in Chrome 153.0.8010.53 on the branch Preview at source `e4e1050`: [immutable Preview](https://38b1abfa.joshuaik2.pages.dev/). The first pass found that a fresh 390px Home entry scrolled the header out of view. That defect was corrected and the post-fix Preview rerender passed. Production was not targeted.

## Narrow Home entry correction

Before the fix, a fresh Chrome context at 390x844 on Preview source `9fd23f9` loaded `/home` at `scrollY=70`; the Help trigger was at `y=-63.5..-7.5`, above the viewport. The route-focus effect focused `<main>`, which caused the browser to scroll.

Commit `e4e1050` now resets the document to the top and focuses `<main>` with `preventScroll` on narrow Home routes only. A fresh Preview context now starts at `scrollY=0`, with Help visible at x=302.1, y=6.5, size 84x56. Tab reaches Help at stop 14 while the page is at scrollY 0. Intermediate Home controls briefly scroll to 126px before focus returns to the top navigation.

The fix preserves the Help interaction: it opens, contains Tab and Shift+Tab, and Escape closes it and restores focus to Help. At 390px the dialog measures 366x182 and fits within the viewport. At desktop 1920x1080, its geometry remains x=1119.9, y=478.4, 410x423.

## Recovery route

`/route-recovery-check-404` displays the in-app 404 UI at desktop and narrow sizes. It returns HTTP 200 because the route is served by the SPA fallback. Enter on **Go to Projects** reaches `/projects` at both viewports. Checked routes had no browser errors or horizontal overflow.

## Figma comparison and limits

Figma Help `2298:3474` shows the desktop four-card guidance structure and cyan-highlighted background treatment, which match the rendered Help direction. The narrow dialog omits the rail-only card and fits. Exported focus state `2298:3560` is a blank black 360x430 frame with a gold border, so it does not establish close-control focus-ring parity.

The 404 recovery frame `2014:94` predates the current shared shell: the rendered header is taller and the activity rail starts farther right. Recovery content and action remain clear and unclipped; no shared-shell change was made during this bounded pass.

## Evidence

- Before: [`2026-10-04-help-recovery-preview-9fd23f9`](render-sync/2026-10-04-help-recovery-preview-9fd23f9/)
- After: [`2026-10-04-help-recovery-preview-e4e1050`](render-sync/2026-10-04-help-recovery-preview-e4e1050/)

The post-fix folder includes 390px and desktop Home/Help screenshots, 404 screenshots, Figma references, and machine-readable route/focus evidence.
