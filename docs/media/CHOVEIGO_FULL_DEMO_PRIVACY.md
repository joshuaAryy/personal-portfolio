# Cho’Veigo full demo media record

- **Purpose:** Full authentic in-page demo on the Demos screen and Cho’Veigo case-study hero.
- **Private source:** Owner-provided `viego_demo_final_with_music.mp4`; SHA-256 `1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801`; 112.638333 seconds, 1920×1080, with audio. The original remains outside the repository.
- **Redacted derivative:** `public/media/demos/choveigo-full-demo-redacted.webm`; SHA-256 `27D222CC0ABD62B6F078B1C026717CA5B0DBEAFDC7F10CCDBBE9A6180B3BD9B9`; 4,388,479 bytes, 1280×720, VP9/Opus, 112.65 seconds. It preserves the full sequence, audio, and full-frame composition without cropping.

## Privacy treatment

The published derivative retains the established burned masks over the source prompt/upload toast (0–13.5s), profile identifier and imported résumé filename (13.5–23s), personal profile/career content (23–42s), profile name during résumé selection (58–71s), private editor and résumé panes (70–96s), generated letter body (103–105s), and personalized cover-letter card (105–112.65s).

A further frame-by-frame review found exposed profile and résumé details at 23–32s and narrow content strips around the résumé preview. The current derivative adds these targeted masks:

- At 23–32s, an opaque mask over the full personal profile content area (1280×720 output coordinates: x=290, y=50, w=990, h=580). The application navigation and surrounding workflow remain visible.
- From 64–96s, an opaque mask over the exposed profile/resume strip at x=240, y=40, w=80, h=595, plus a labeled mask over the right résumé-preview region at x=610, y=40, w=670, h=660. Existing masks over the profile details and center résumé/editor content remain in place.
- From 104s through the end, an opaque mask over the personalized letter body (x=288, y=40, w=940, h=620). The surrounding Resume Studio interface remains visible.

The mask labels identify obscured document areas without replacing the underlying product workflow. The 1920×1080 source is scaled to a 1280×720 full-frame view; no crop was used. The original MP4 is not copied into the repository or Preview. The final derivative was decoded through its full 112.65-second duration and sampled at the mask boundaries; deployed-browser playback of this exact derivative remains part of final integration verification.

## Playback verification

A prior local installed-Chrome check on the earlier derivative confirmed full-duration play, pause, and seek through 112.65s. The current derivative was decoded end-to-end and visually inspected at 22, 23, 26, 30, 32, 33, 63, 64, 72, 82, 88, 94, 96, 97, and 112.4 seconds. The final local and deployed-Preview checks passed for this exact derivative: Chrome loaded its 112.65-second metadata, played, paused, and sought successfully to 23 seconds and 111 seconds. The deployed server supports byte-range responses, and the deployed asset hash matches the local derivative. This verifies playback, not final owner release/privacy approval.

The 4.94-second Recommendations clip remains intact as optional supporting evidence; it is not presented as the complete demo.
