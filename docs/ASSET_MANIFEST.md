# Asset Manifest

This manifest records the media and visual assets currently used by the public portfolio. Project media, portfolio-authored graphics, and third-party material have different reuse boundaries.

## Bundled media

| File | Use | Provenance and display status |
|---|---|---|
| `public/media/crest-sample.png` | Crest case study and Demos | Selected sample interface capture, cleared for portfolio display. It is labeled `SAMPLE DATA`; its values are not presented as customer outcomes or production volume. |
| `public/media/choveigo-recommendations.png` | Cho'Veigo case study and Demos | Selected Recommendations interface capture, cleared for portfolio display. Presented as a static image without a play control; the case-study caption states that strength labels are unvalidated because no role-specific evaluation record is available. |
| `public/media/profile-owner-portrait.png` | Profile Overview identity rail | Exact 2× crop export of the owner portrait in approved Figma node `960:4515` (312 × 312 px; SHA-256 `E1DDDD6647B3BA7B20265BF01C46444310BE43FDBCF64B2902FD2A4D3DF52499`), displayed at 156 × 156 px. Used only on `/profile`, not as Personal Highlights imagery. |
| `public/resume/Joshua_Aryeetey_General_Resume_v13.pdf` | Resume viewer and download | The canonical general resume, version 13, supplied and authorized for public portfolio use from `Production Portfolio/Resume/Joshua_Aryeetey_General_Resume_v13.pdf`. Source, bundle, built copy, and deployed bytes are 164,726 bytes with SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`; the 2026-09-27 deployment at `https://ce8b0f14.joshuaik2.pages.dev/` returned HTTP 200 with `application/pdf`. The viewer, download, and fullscreen link use this same PDF. |

## Portfolio-authored and licensed visuals

- The site identity mark is implemented as editable inline SVG from the accepted first-party J design. It is not a raster image asset.
- Case-study diagrams, Journey graphics, and interface framing are authored with site markup, CSS, and vector shapes. They are explanatory portfolio graphics, not product screenshots or third-party artwork.
- League Spartan and Cinzel are loaded from Google Fonts. League Spartan is distributed under the [SIL Open Font License 1.1](https://github.com/google/fonts/blob/main/ofl/leaguespartan/OFL.txt); family source: [Google Fonts League Spartan](https://github.com/google/fonts/tree/main/ofl/leaguespartan). Cinzel is also served by Google Fonts.

## Use boundaries

- Food Tracker has no bundled project logo or product capture. Its page uses editorial copy, a portfolio-authored product-anatomy figure, and a search decision plate that describes candidate generation and deterministic ranking; it does not depict a fabricated app screen. Add genuine product media only when available and confirm the mark's public embedding rights before using it.
- Crest's selected sample capture and Cho'Veigo's selected Recommendations capture are cleared for portfolio display. Those clearances apply to the selected images, not automatically to separate project marks or future media.
- Profile Overview uses the owner portrait already present in the approved Profile composition. This does not supply the separate photo set required for Personal Highlights.
- No Riot or CommunityDragon artwork or marks are bundled. Do not add third-party game art or marks without an applicable public-use basis; use original portfolio graphics where suitable.
- Review the provenance and reuse terms of any additional project mark, photograph, recording, or externally sourced image before bundling it.

## Small-size identity asset (2026-09-27)

public/favicon.svg uses the exact ring-free 16 px monochrome J path from Figma node 1950:40, with its approved #E7E1D5 fill on a transparent background. index.html links the standalone SVG; the header and opening continue to use the canonical inline SVG component.
