# Shared Rail Footer Render Sync - 2026-10-04

## Result

The shared shell footer passed desktop browser comparison on Preview source `e4e1050` at 1920x1080. The footer border and row align with current Figma `2356:611` within about one pixel. GitHub and LinkedIn expose accurate destinations, announce that they open in a new tab, and open in new tabs on keyboard activation. Email has the accessible name `Email Joshua` and dispatches `mailto:joshuaaryy@gmail.com`; headless Chrome has no registered mail handler, so it reports `ERR_ABORTED`. The X label is an `aria-hidden`, noninteractive span. There were no layout, console, or page errors.

## Narrow viewport finding

At 390x844, the shared rail is `display: none`, so its footer measures 0x0 and GitHub, LinkedIn, and email do not receive focus in 35 Tab stops. No narrow Figma reference or mobile substitute is present on `/home`. This is recorded as a responsive availability gap; no narrow layout was invented without an accepted design direction.

## Evidence

- Preview: [38b1abfa.joshuaik2.pages.dev](https://38b1abfa.joshuaik2.pages.dev/), source `e4e1050`
- Browser: Chrome 153.0.8010.53
- Figma: Home shell `2252:3445`; shared shell/activity art `2356:611`
- Captures, focus states, interaction logs, and Figma exports: [`2026-10-04-rail-footer-preview-e4e1050`](render-sync/2026-10-04-rail-footer-preview-e4e1050/)
- Machine-readable result: [`rail-footer-final-evidence.json`](render-sync/2026-10-04-rail-footer-preview-e4e1050/rail-footer-final-evidence.json)

Desktop spacing, destinations, keyboard focus, and decorative X are verified. Mobile contact availability remains unimplemented and requires a narrow-shell design decision; this finding does not block other portfolio work.
