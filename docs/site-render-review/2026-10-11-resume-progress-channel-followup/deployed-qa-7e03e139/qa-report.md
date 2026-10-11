# Deployed QA — Resume progress channel (`7e03e139`)

Preview: https://7e03e139.joshuaik2.pages.dev/
Cloudflare Pages deployment ID: `7e03e139-f5e5-49e4-a44a-781aaff576f2`; Environment `Preview`; Branch `feat/portfolio-integration`. Wrangler's deployment listing has an empty `Source` field for this deployment, so it did not independently provide a source prefix. Local application HEAD is `a757ade8dd306c893976f35f71e6e96d247f792a` on the working integration branch; deployed asset hashes below match the supplied clean export for that source.

## Deployed bundle verification

The deployed HTML references `assets/index-BqIsdlMs.js` and `assets/index-S2AwvkKz.css`. Both served resources returned 200 and match `C:\Users\samue\AppData\Local\Temp\portfolio-feature-preview-a757ade\dist` exactly:

- JS: 519,121 bytes; SHA-256 `E5C576FEC09126EDA6C80C6C9F906D0591F08CF8D1AA10A80BADD366F91F8506`
- CSS: 501,936 bytes; SHA-256 `62E0C6A1AFDE34D061A2F9A5CEFFDDAA4C07583CD17A206133E3AC9007A01266`

## Chrome checks

Installed Chrome opened `/home` and direct `/resume` at 1440×900 and 390×844; all returned 200, headings rendered, document width equaled viewport width, images were complete, and no page/console/request errors were observed. The direct `/resume` route renders the Resume Found takeover composition as a page; when opened from Home it is a semantic modal (`role=dialog`, `aria-modal=true`) over an inert, `aria-hidden` `.app-route-underlay`.

The settled desktop and narrow captures show the cyan progress channel fully illuminated and bounded between the gold ring edges, with no visible spill or control overrun. On desktop and narrow, View Resume and Close remain inside the mechanism. The narrow modal was opened via the visible Resume action in the scrolled Home footer; document width remained 390px.

Desktop modal keyboard flow: Tab cycles `View Resume` → `CLOSE` → `View Resume`; Escape and Close restore `/home` and focus to the invoking Resume link; View Resume navigates to `/resume/viewer`. No runtime errors during these actions.

Evidence in this folder:

- `desktop-home.png`, `desktop-resume-direct.png`, `desktop-resume-modal.png`
- `narrow-home.png`, `narrow-resume-direct.png`, `narrow-resume-modal.png`
- `deployed-check.json`

Classification: deployed bundle, routes, completed bounded channel, responsive bounds, and modal keyboard/actions verified in Chrome. Cloudflare's source field is blank, so deployment metadata alone does not attest the full source SHA; the exact bundle match to the clean export is the source verification evidence. This is runtime QA, not owner approval.

### Underlay selector correction

The initial `deployed-check.json` queried `main`, which is the modal route content and correctly is not inert. A follow-up deployed Chrome inspection queried the actual `.app-route-underlay`: it has the `inert` attribute (`inert=true`) and `aria-hidden="true"`; the modal has `role="dialog"` and `aria-modal="true"`. The JSON now records both nodes separately. This corrects the evidence selector, not the application result.
