# Shared Rail Footer Render Sync - 2026-10-04

## Result

The shared shell footer passed desktop browser comparison on Preview source `e4e1050` at 1920x1080. The footer border and row align with current Figma `2356:611` within about one pixel. GitHub and LinkedIn expose accurate destinations, announce that they open in a new tab, and open in new tabs on keyboard activation. Email has the accessible name `Email Joshua` and dispatches `mailto:joshuaaryy@gmail.com`; headless Chrome has no registered mail handler, so it reports `ERR_ABORTED`. The X label is an `aria-hidden`, noninteractive span. There were no layout, console, or page errors.

## Earlier narrow viewport finding — superseded

At 390x844 on source `e4e1050`, the shared rail was `display: none`, so its footer measured 0x0 and GitHub, LinkedIn, and email did not receive focus in 35 Tab stops. No narrow Figma reference was available. The gap was subsequently closed with a bounded responsive adaptation; the absence of narrow Figma remains, so no parity claim is made.

## Current responsive adaptation

The app fix is commit `8680eeb`, deployed to immutable feature Preview [723c7b0d.joshuaik2.pages.dev](https://723c7b0d.joshuaik2.pages.dev/). At widths up to 900px, a compact page-end row reuses the existing GitHub, LinkedIn, and email links. Chrome/Playwright verified Home at 390/650/900/901/1920px and Fraymakers at 390px. The row follows `main`, the three expected links are keyboard reachable with visible focus, and no overlap, browser/network errors, or horizontal overflow occurred. It is shown at 900px and hidden at 901px. At 1920×1080, the desktop rail remains x=1601/y=1018/319×62. Home loaded 32/32 images.

This change is a responsive adaptation, not narrow-Figma parity. Owner review remains open.

## Evidence

- Preview: [38b1abfa.joshuaik2.pages.dev](https://38b1abfa.joshuaik2.pages.dev/), source `e4e1050`
- Browser: Chrome 153.0.8010.53
- Figma: Home shell `2252:3445`; shared shell/activity art `2356:611`
- Captures, focus states, interaction logs, and Figma exports: [`2026-10-04-rail-footer-preview-e4e1050`](render-sync/2026-10-04-rail-footer-preview-e4e1050/)
- Machine-readable result: [`rail-footer-final-evidence.json`](render-sync/2026-10-04-rail-footer-preview-e4e1050/rail-footer-final-evidence.json)

Current Preview captures and measurements: [mobile-contact-preview-8680eeb](render-sync/2026-10-04-mobile-contact-preview-8680eeb/), including the [QA report](render-sync/2026-10-04-mobile-contact-preview-8680eeb/REPORT.md).

The earlier desktop rail result remains valid; current Preview evidence now also verifies narrow contact availability and responsive breakpoint behavior. The narrow presentation is not compared to a Figma reference.
