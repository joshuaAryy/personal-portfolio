# Lobby historical composition restore

This pass restores the pre-top-origin non-Projects banner geometry from `f943348`, matching the preserved `6dc` browser captures. It keeps the shared environment artwork, Projects layout, and mobile flow unchanged.

## Change

Experience, Hackathons, and Education use `left: 12%`, `right: 12%`, three equal columns, and a `clamp(18px, 3vw, 46px)` gap. The plus slots use the historical `left`/`right: 4.5%` outer gutters and `top: 25.5%` vertical position. The stale desktop override based on the old centered group was removed; it had placed the controls over the first/third cards and too high. The uncommitted top-fade and tall-screen top/medallion overrides were removed. Their exact pre-change patch remains preserved locally as a separate historical artifact.

## Visual comparison

The historical 6dc renders and current post-change captures use matching viewport dimensions:

| Mode | Historical desktop | Current desktop | Historical narrow | Current narrow |
| --- | --- | --- | --- | --- |
| Experience | [6dc, 1920×1080](./reference-6dc-experience-1920x1080.png) | [after, 1920×1080](./after-experience-1920x1080.png) | [6dc, 390×844](./reference-6dc-experience-390x844.png) | [after, 390×844](./after-experience-390x844.png) |
| Hackathons | [6dc, 1920×1080](./reference-6dc-hackathons-1920x1080.png) | [after, 1920×1080](./after-hackathons-1920x1080.png) | [6dc, 390×844](./reference-6dc-hackathons-390x844.png) | [after, 390×844](./after-hackathons-390x844.png) |
| Education | [6dc, 1920×1080](./reference-6dc-education-1920x1080.png) | [after, 1920×1080](./after-education-1920x1080.png) | [6dc, 390×844](./reference-6dc-education-390x844.png) | [after, 390×844](./after-education-390x844.png) |

Projects were captured after as a preservation check: [desktop](./after-projects-1920x1080.png), [narrow](./after-projects-390x844.png).

At 1920×1080 the lobby main area is 1600px wide. The restored non-Projects group spans x=192–1408 (1216px); each banner is about 374.7px wide with 46px gaps. Balance-slot centers land at x=107 and x=1493, around y=392, outside the card group at the historical lower band. At 390×844 the existing mobile layout remains one centered 246px banner at x=72 inside the 364px group; document width remains 390px. Desktop document dimensions remain 1920×1080. All banner images loaded and the browser reported no page or console errors.

The follow-up comparison is preserved in [before-balance-slot-fix-experience-1920x1080.png](./before-balance-slot-fix-experience-1920x1080.png) and [after-experience-1920x1080.png](./after-experience-1920x1080.png), with matching Education captures. Before the final correction, slot centers were x≈336/1264, y≈276; after, x=107/1493, y≈392. The 390×844 captures confirm the slots remain in the outer mobile gutters and do not cover the centered card.

The historical renders show cards spanning the category scene, whereas the prior local source constrained them to a centered 810px group (x=395–1205 at 1920px). The restored source follows the older left/right distribution without reintroducing the top-edge alignment or the local fade experiment.

## Verification

- `npm exec vitest -- src/Lobby.test.tsx --run`: 14 tests passed. The banner test first failed against the centered candidate; the balance-slot coupling assertion then caught the stale desktop override; both pass after the corrections.
- `npm run build`: passed. Vite reports the existing 500kB chunk-size advisory.
- `git diff --check`: passed; Git only emitted existing LF-to-CRLF notices for unrelated modified docs.
- Local Chrome captures were taken from the current worktree after waiting for network idle, font readiness, and image decoding, with reduced motion enabled for stable screenshots.

No deployment or commit was made.
