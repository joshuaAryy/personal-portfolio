# Profile Overview lower-band correction — 2026-10-12

## Change

The annotated owner reference marks a lower placement for the four Overview signals and identifies the lower scene as excess composition space. The previous local render at 1536×1360 placed the first signal cell at y=763.7 and its value at y=963.8. The updated tall-desktop rule moves the complete group to y=957.6–1157.7 and extends the scenic layer to end about 62px below the group values. The left identity rail, artwork, signals, icons, labels, counts, traits, and interactions are unchanged.

This applies only to 1500–1858px desktop widths at 1280px and taller. The 1440×900, 1440×720, and 390×844 layouts retain their existing responsive rules; narrow Profile keeps natural scrolling.

## Visual evidence

- `before-1536x1360.jpg` is the immediately preceding local render.
- `after-1536x1360.jpg` shows the full desktop composition after the change.
- `overlay-projects-1536x1360.jpg`, `overlay-experience-1536x1360.jpg`, `overlay-hackathon-1536x1360.jpg`, and `overlay-academics-1536x1360.jpg` show each panel with its corresponding relocated signal.
- `after-390x844.jpg` shows that narrow layout remains in its existing stacked, naturally scrollable form.
- `metrics.json` records signal and panel bounds, viewport widths, interaction state, HTTP status, and browser errors.
- `viewport-metrics.json` records the full scene and signal bounds for the desktop matrix.
- Owner reference inspected: `C:\Users\samue\Downloads\portfolio-owner-references\Profile_Overview_Annotated_Red_Yellow.png`.

At 1536×1360, each open panel ends 12px above its signal cell and 38.5px above the visible signal emblem. Moving the pointer from the signal into the panel leaves it open. All four panels returned HTTP 200 without browser errors, failed requests, or horizontal overflow. The narrow Projects panel opens on keyboard focus and stays within the 390px document width.

## Verification

Test-first change: the updated signal-band and scenic-fade assertions failed against the previous CSS; the focused Profile tests then passed **35/35** after implementation.

The captured desktop matrix is 1536×1289, 1536×1360, 1536×1500, 1440×900, and 1440×720; narrow is 390×844. Every route returned HTTP 200, document width matched viewport width, and no page errors or failed asset requests were observed.

This is a local implementation and review record. It has not been deployed or treated as owner acceptance.
