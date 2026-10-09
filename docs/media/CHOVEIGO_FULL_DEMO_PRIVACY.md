# Cho'Veigo full demo media record

## Current owner release decision — 2026-10-09

The owner explicitly authorized publishing the **original recording unchanged**, including the identified third-party profile/resume material. The recovered file at `C:\Users\samue\Downloads\viego_demo_final_with_music.mp4` was verified against the owner's supplied SHA-256: `1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801` (32,915,943 bytes). Two repository chunks concatenate byte-for-byte to the same SHA and size; the Pages media function serves the original without transcoding, cropping, masking, or audio changes. This release decision supersedes the publication hold described in the historical notes below. Deployed playback remains to be verified at the next feature Preview.

- **Purpose:** Full in-page demo on the Demos screen and Cho'Veigo case-study hero.
- **Private source:** Owner-provided `viego_demo_final_with_music.mp4`; SHA-256 `1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801`; 112.638333 seconds, 1920x1080, with audio. The original remains outside the repository.
- **Redacted candidate:** `public/media/demos/choveigo-full-demo-redacted.mp4`; SHA-256 `9C1BDE2F810A4F3173993DE4C03FA5C11A51D413CB94F23D85BF74CA460CABCB`; 6,935,798 bytes, 1280x720, H.264/AAC, 112.65 seconds. It preserves the full sequence, audio, and full-frame composition without cropping.

## Privacy treatment

The derivative retains the established burned masks over the source prompt/upload toast (0-13.5s), profile identifier and imported resume filename (13.5-23s), personal profile/career content (23-42s), profile name during resume selection (58-71s), private editor and resume panes (70-96s), generated letter body (103-105s), and personalized cover-letter card (105-112.65s).

Earlier frame review added targeted masks: the full personal profile content area at 23-32s (output coordinates x=290, y=50, w=990, h=580); an exposed profile/resume strip at 64-96s (x=240, y=40, w=80, h=595) and the right resume preview (x=610, y=40, w=670, h=660); and personalized letter text from 104s to the end (x=288, y=40, w=940, h=620). Existing masks over profile details and center resume/editor content remain in place.

The corrected candidate adds a localized opaque mask over a personal education/career card during its transition into view: output coordinates x=290, y=420, w=990, h=300, from 22.70s through 23.20s. Decoded output frames from PTS 22.700000s through 23.166667s are masked; the existing profile-content mask covers the subsequent screen. Adjacent interface/workflow remains visible outside the card region.

The 1920x1080 source is scaled to a 1280x720 full-frame view; no crop is used. The private original is not copied into the repository. The previous public WebM derivative has been removed from the current working tree; the corrected MP4 is a local candidate and has not been deployed.

## Playback verification

Installed Chrome 153 loaded finite MP4 metadata (112.65s, 1280x720) and a seekable range of [0, 112.65]. Seeking to 0, 56.325, 111.9, and 112.5 seconds succeeded. Playback from 112.5 seconds ended at 112.65 seconds, and the AAC audio track was enabled and live. Decoded-frame checks around the new mask interval confirmed coverage from the first visible transition frame through the last transition frame. Comparison captures are in `%TEMP%\cho-full-demo-release-audit-20261008\final-frame-by-frame-before-after.png` and `final-native-speed-before-after.png`.

The notes above describe the prior redacted candidate and its local playback checks. That derivative is retained as historical material and is not the current primary demo. The 4.94-second Recommendations excerpt remains separate supporting evidence, not the full demo.
