# Owner correction follow-up — 2026-10-08

This report records the bounded work after the immutable `288d797e` Preview. It supplements that checkpoint; it does not rewrite its historical state. The portfolio goal remains active, and production was not targeted.

## Reconciled state

- The working copy is based on the current feature source checkpoint `0c692aea7cf71fab588e21f136b8bf774ea7800f`.
- The immutable baseline Preview is [288d797e](https://288d797e.joshuaik2.pages.dev/).
- Supplied screenshots were inspected from `C:\Users\samue\Downloads\portfolio-owner-references`.
- `C:\Users\samue\Videos\league opening.mp4` and `half of ready check.mp4` were inspected at their original frame rates. The owner confirmed that the separately named `league opening(1).mp4` is the same opening clip.
- Existing modified/untracked work was preserved; `.wrangler/` remains untracked and was not included.

## Bounded corrections and visual evidence

### Resume Found — implemented and visually verified locally

The orb, overlay, action size, focus behavior, Escape behavior, and routing were preserved. Only the title, primary action, and Close offsets moved to align with Figma `2407:176`:

| Element | Figma at 1920×1080 | Local after render | Result |
|---|---:|---:|---|
| Title | `(680, 649)` | `(680, 649.1)` | within 0.1 px |
| View Resume | `(694, 675)`, `212×70` | `(694.2, 674.5)`, `211.7×69.9` | subpixel rounding |
| Close | `(744, 783)`, `112×38` | `(744, 783)`, `112×38` | exact |

The `956×757` owner screenshot and Figma frame were compared with the local render. Desktop and `390×844` Chrome captures show the complete lower stack; reduced motion presents controls without the energy sweep. Escape returns to the origin, and View Resume opens `/resume/viewer`.

Before/after captures and measurements are outside the repository at `%TEMP%\portfolio-current-opening-resume-2026-10-08\before-preview\` and `%TEMP%\portfolio-current-opening-resume-2026-10-08\after-source\`. The after captures use the modified local Vite source (`127.0.0.1:5175`), not the older Preview.

### Opening / C06 — preserved and visually verified

The opening video is 1920×1080, 60 fps, with 286 video frames (4.767 s video track; 4.800 s container). At 100, 350, 550, and 830 ms, the existing C06 gold silhouette stays whole; the visible assembly is carried by cyan seam illumination and material highlights. Reduced motion shows the settled mark. No opening source change or retiming was warranted.

Local desktop/narrow phase captures are in `%TEMP%\portfolio-current-opening-resume-2026-10-08\after-source\`. The ready-check clip is 1920×1080, 30 fps, 388 frames (12.933 s video track; 12.971 s container); its restrained cyan orb sweep remains the motion reference for the existing one-shot Resume ornament.

### Category banners — preserved; no additional CSS change warranted

Figma nodes compared: Projects `511:2`, Experience `704:2`, Hackathons `730:3316`, and Education `738:3316`. Experience includes the smoothed Party Background, a `rgba(2,5,8,.34)` veil, and the explicit `704:358` downward fade layer (210 px tall, starting 82 px below the global top edge). Current React uses the same fade geometry and gradient, and Chrome captures retain the top-origin banner and blend into the lobby surface. The four-row Figma/Preview comparison is `%TEMP%\portfolio-banner-fidelity-20261008\banner-fidelity-side-by-side.png`.

### Profile — preserved; owner annotation already satisfied

The clean and yellow/red annotated 1536×1289 owner references were compared with the current render. The four groups remain together in the lower band with a small bottom margin; the excessive lower dead space is gone. No Profile source change was made. Comparison: `%TEMP%\portfolio-owner-reference-inspection-2026-10-08\profile-owner-clean-vs-current.png`.

### Activity identities — preserved

Activity rows continue to use canonical identity metadata. Living in Silico and Stush Patties match their Experience identities; the shared identities for the projects and portfolio J were left unchanged.

### Stush Patties — concise copy correction

Removed two paragraphs whose meaning was already carried by the source-exception figure and reporting-rule translation. The recurring transformation, anonymous source labels, privacy boundaries, and ending remain unchanged. Desktop/narrow after captures are in `%TEMP%\fray-stush-audit-ee0c23e-20261008\`; the animation was not reopened.

### Other owner-positive work — preserved

No changes were made to Journey, Crest, Personal Highlights structure, Home composition, Living in Silico's broad direction, Cho'Veigo's broad narrative, Education's four-card layout, or Food Tracker's current story and authentic media treatment.

## Verification

- Focused Opening/Resume suites: 29/29 tests passed across four files.
- Focused Stush suite: 9/9 tests passed.
- Full suite: 28 files, 250 tests passed. Happy DOM reported iframe/PDF fetch aborts during teardown; Vitest exited successfully.
- Production build passed: JavaScript 499.37 kB; CSS 475.71 kB.
- `git diff --check` passed.
- Chrome inspected the local-source Resume takeover at 1920×1080 and 390×844, including the reduced-motion view, title/action/Close geometry, Escape, and View Resume. C06 intermediate frames were inspected at the four recorded times.

## Still open

- The latest immutable Preview remains the previous `288d797e` source until a new feature Preview is published and checked against its exact commit.
- The full 112.65 s redacted Cho'Veigo demo is present and seekable; owner release review of the masks remains open before final public release.
- Food Tracker still has no authentic demo video.
- Live Windows Narrator interaction remains a manual accessibility check.

This is a review checkpoint record, not portfolio completion or owner acceptance.
