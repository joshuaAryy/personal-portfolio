# Food Tracker Insights Gallery — Readability Follow-up

## Change

Kept the approved four-image order and card system. Replaced the small Macro Composition image with two focused crops from one authentic Phase 24 app capture: the 30-day nutrient balance graphic and weekday macro bars. Replaced the Forecast and Fiber images with tighter, aspect-preserving crops around their meaningful chart areas. Daily Completeness is unchanged.

The Forecast remains an owner-provided design reference, and Fiber and Daily Completeness remain Figma design studies. They are identified as such in accessible descriptions and are not presented as verified runtime captures. Macro values are sample data, not user outcomes.

## Rendered-size check

Captured in installed Google Chrome on `/projects/food-tracker` at 1440×900 and 390×844. Crops use `object-fit: contain`; no source image is stretched or distorted.

| Visual | Source crop | Displayed at 1440 viewport | Displayed at 390 viewport |
|---|---:|---:|---:|
| Macro nutrient balance | 322×176 | 472×258 | 342×187 |
| Daily macro comparison | 340×226 | 472×314 | 342×227 |
| Calorie Forecast | 254×330 | 472×613 | 342×444 |
| Fiber Trend | 330×316 | 472×452 | 342×327 |
| Daily Completeness | existing 350×258 | 296×218 | 330×243 |

## Evidence

- Desktop gallery row 1: `desktop-gallery-first-row.png`
- Desktop gallery row 2: `desktop-gallery-second-row.png`
- Desktop individual cards: `desktop-macro.png`, `desktop-forecast.png`, `desktop-fiber.png`, `desktop-completeness.png`
- Narrow individual cards: `narrow-macro.png`, `narrow-forecast.png`, `narrow-fiber.png`, `narrow-completeness.png`
- Browser measurements and load/error checks: `metrics.json`
- Repeatable Chrome capture: `capture-gallery.cjs`

At both viewport sizes Chrome reported no page errors, failed requests, or document-width overflow. The Forecast history, Today marker, dotted continuation, and uncertainty band are visible at the displayed size; Macro Composition exposes both charts; Fiber shows its plotted line, daily values, and chart axes.
