# Resume Found progress channel follow-up

Compared the owner’s beginning and completed progress references with the current-source local Chrome render. The existing 306° arc and 54° lower opening already terminate at the plate endpoints; the previous channel was too thin and dim, with a more noticeable diagonal texture than the owner’s completed example.

The scoped correction widens the radial mask inward while preserving its outer edge and lower opening, raises the completed cyan fill, and softens the diagonal texture. The unfilled remainder stays subdued while the leading edge advances; after the 306° endpoint the band remains illuminated. Gold rails remain visible at both channel edges, and no cyan enters the trapezoid plate. The one-shot fill/reduced-motion behavior is unchanged.

## Evidence

- Browser: Chrome 154.0.8037.98, local Vite worktree at `http://127.0.0.1:5176/resume`.
- Mechanism box at 1440×900: 600×600 CSS px; energy layer: 525.3×525.3px. For owner-image comparison, mechanism crops are also provided at 530×530px.
- `before-*` images render the current source with the prior mask/material declarations restored inline. `after-*` images render the changed source. These are matched viewport/source geometry captures, not the older saved 530px composition captures.
- Full desktop, 390×844 narrow, and 320×740 captures include beginning (36°), partial (153°), and completed (306°) states. `manifest.json` records element bounds, computed fill/mask, and viewport overflow.
- Reduced-motion capture shows the complete 306° band immediately with the fill animation disabled.

Desktop mechanism crops:

| Before | After |
| --- | --- |
| `before-desktop-full-1440x900-mechanism.png` | `after-desktop-full-1440x900-mechanism.png` |

Other captures use the same filename pattern. The older `docs/site-render-review/2026-10-11-resume-found-concentric-check/resume-ring-*-1440x900.png` set has a 530px composition and is retained as historical evidence; it is not used as current-source geometry evidence for this comparison.

## Verification

- TDD RED/GREEN: the focused test failed first on the old mask/material assertions, then on the missing distinction between active fill and dim remainder; after the CSS updates, `npm test -- --run src/ResumeFlow.test.tsx` passed (12 passed).
- `git diff --check`: passed.
- Narrow geometry: the 390×844 mechanism is fully inside the 390px viewport; document width remains 390px. The 320×740 view remains naturally vertically scrollable and has no horizontal overflow.
