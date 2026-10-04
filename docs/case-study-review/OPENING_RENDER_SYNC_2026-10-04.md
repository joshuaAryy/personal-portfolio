# Opening render sync — 2026-10-04

**Preview:** source `92d3c26` at [the immutable feature Preview](https://965f0e82.joshuaik2.pages.dev/), branch `feat/portfolio-integration`. The served JS/CSS SHA-256 values match the current worktree build; committed `src` and `public` are unchanged since `92d3c26`.

**Figma:** live node `2025:2`, exported as a 1440×900, 2.033-second video. The full video and selected matching frames are in [the evidence folder](render-sync/2026-10-04-opening-preview-92d3c26/).

**Browser:** Chrome 153 with CLI Playwright, at 1920×1080 and 390×844. The route and all assets loaded; 44/44 images were complete at both sizes, document width matched the viewport, and there were no browser, request, or HTTP errors.

| Check | Result |
|---|---|
| Opening composition | At matched 1440×900, the centered mechanism, archive J, forest background, and top-right Skip placement align with the live Figma video. At 1920×1080 the mechanism scales to about 696px; the J displays at 456px. |
| Normal playback | Preview animations run for 2,000ms and hand off to `/home`. Figma's exported clip is 2.033 seconds. The segmented bezel and tick track move in opposite directions. At 252ms the measured offsets were +0.737° and −0.595°; both were at identity by the approximately 630ms browser sample. Figma settles around 460ms; CSS keyframes target 460ms. |
| Skip and reduced motion | Skip activated at about 215ms routes directly to `/home`. Initial `prefers-reduced-motion: reduce` displays the shell without opening animations. Switching to reduce during playback starts the handoff transition and reaches the shell without browser errors. |
| Live preference reversal | While Opening was active, switching to reduce and restoring no-preference 78.2ms later canceled the leaving transition before its 120ms handoff. The route remained `/`, Opening resumed within 75ms, was still active at 225ms, then completed normally to `/home`. No browser errors occurred. |
| Central J | Visible during the opening and visibly soft at presentation size in both Figma and Preview, consistent with the known resolution limit of archive `159:2`. Preserve the archive; this render check does not approve a replacement. |
| Handoff underlay | The live Figma clip fades over a minimalist Joshua Aryeetey hero/header. The current Preview fades over the League mode-picker/lobby shell before routing to `/home`. This is an observed cross-surface difference. It remains open for owner review; the current route and mature Home shell were preserved. |

The Figma/Preview comparison is render evidence, not owner acceptance. It does not establish approval of the J identity or resolve the handoff-underlay difference.

Evidence: [runtime summary](render-sync/2026-10-04-opening-preview-92d3c26/qa-summary.json), [runtime evidence](render-sync/2026-10-04-opening-preview-92d3c26/evidence.json), [live preference-reversal evidence](render-sync/2026-10-04-opening-preview-92d3c26/reduce-reversal-evidence.json) and screenshots, [timing evidence](render-sync/2026-10-04-opening-preview-92d3c26/timing-evidence.json), and [matched viewport evidence](render-sync/2026-10-04-opening-preview-92d3c26/preview-evidence-1440.json).
