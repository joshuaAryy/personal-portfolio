# Feature Preview QA — Food system paths — 2026-10-07

## Deployment

- URL: https://c67a89da.joshuaik2.pages.dev
- Cloudflare deployment: `c67a89da-9b6c-43e3-b675-cfa6e1a015af`
- Environment: Preview
- Branch/source: `feat/portfolio-integration` / `fe4a4fd9783324ccf8d09ab92173cfd964c09a96`
- Production was not targeted.

The deployed HTML does not expose a revision tag. Source attribution comes from Cloudflare deployment metadata. The deployment was built from the clean detached worktree at the recorded commit, avoiding unrelated untracked files in the main worktree.

## Runtime verification

Playwright 1.62.1 with Chromium 149.0.7827.55 checked 13 direct routes at `1440×900` and `390×844`. Every route returned HTTP 200. There were no document-width mismatches, broken images, same-origin HTTP failures, console errors, or page exceptions.

The entry Confirm action and Projects → Food Tracker navigation worked. All ten Food Tracker path selectors were visible and activated; selecting a path updated its `aria-pressed` state.

This is route, asset, and interaction smoke evidence for the review build. It does not establish visual parity or owner acceptance.

## Food Tracker change in this source

The case study introduces five distinct logging paths and a selectable native system figure tracing retrieval, saved nutrition snapshots, AI-assisted review, Insights, and auth/resource scope. Focused and full tests, production build, and `git diff --check` passed before deployment. Local Chrome review checked the path selector at desktop and narrow sizes.

## QA artifacts

Local artifacts are in `C:\Users\samue\AppData\Local\Temp\feature-preview-qa-c67a89da`:

- `smoke-check.cjs`
- `report.json`
- `desktop-entry.png`
- `narrow-entry.png`
- `desktop-food-tracker.png`
- `narrow-food-tracker.png`

Food Tracker still has no authentic demo video. Cho'Veigo uses the existing short privacy-cropped Recommendations excerpt; its longer source remains private.
