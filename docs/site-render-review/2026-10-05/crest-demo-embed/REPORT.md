# Crest embedded demo review

**Result: embedded playback confirmed at desktop and narrow widths.**

The deployed feature Preview at `https://2321d13e.joshuaik2.pages.dev/` returned HTTP 200 on `/profile/demos`. It is the earlier review Preview from branch snapshot `7b4fc3a5198d8b848f9920c25e346c4439c51fba`, before the current owner-correction work was deployed.

In installed Chrome controlled by Playwright, I selected **Crest** in the Demos selector and activated **Play Crest demo in player**. The top-level URL remained `/profile/demos`; a visible `youtube-nocookie.com/embed/kiq6XjNi9J8?autoplay=1` iframe mounted in the player. The embed, player assets, player API response, and video stream returned successfully. The captured player showed active playback controls inside the portfolio page.

At 390×844, the player remained embedded at a 350×196 rectangle; document width was 390px, and page/console errors were absent. The narrow capture also shows that the video scales to the page width without document overflow.

The case-study **WATCH DEMO** link is a separate external YouTube link. It was not the interaction path tested here. The owner concern that playback in the Demos surface leaves the site was not reproduced. Recheck both widths on the final feature Preview after current work is deployed.

## Captures

- `crest-demo-desktop.png` — 1440×960 after in-page playback started.
- `crest-demo-narrow.png` — 390×844 after in-page playback started.
