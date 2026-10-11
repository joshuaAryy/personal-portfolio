# Owner J / Opening fidelity capture

- Source: current local Vite application in `codex/owner-correction-pass-03` at `b65501cc0182bd697ea5ebff57e1757ed8b31705`, with the Opening CSS/test changes in the working tree.
- Browser: installed Google Chrome, normal-motion preference; viewport 1920×1080.
- The 6.80s recording is reconstructed at 25 fps from the real-time Chrome screencast frames. Static display intervals hold their last rendered frame. It starts at the Opening and includes its fade/handoff into `/home`.
- Opening choreography remains 5.0s. The tick field's CSS rotation runs from approximately 0.6–3.8s; the live Chrome capture observed its completed 360° revolution at approximately 3.92s, while the Opening was still visible.
- Sampled positions: dormant 0.00s, approach 0.96s, alignment 1.37s, lock 2.58s, activation 3.10s, sheen 3.72s, settled hold 4.55s, handoff 4.90s, Home 5.80s.
- Skip, reduced motion, 1440×720, and 390×844 were checked by Runtime QA against the same source and Opening working-tree changes. The reduced-motion route hands off quickly; normal mode completes its five-second sequence.
- The V8 portal and gold ring remain with the J in the held final mark. The full video and individual stills are provided for owner review.

## Visual note

A small pale sheen fringe is visible at the lower-right edge of the J around 3.72s and clears in the settled hold. Two source-derived SVG-mask experiments caused dark rectangular artifacts in Chrome and were reverted. This transient sheen edge remains open for owner review; the settled mark and rest of the Opening are intact.

The seven-state Figma comparison and static identity comparison remain in [`docs/j-source-review/pass03/`](../../../j-source-review/pass03/).
