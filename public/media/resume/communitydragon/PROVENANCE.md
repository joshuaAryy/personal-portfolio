# League Ready Check asset provenance

These are authentic League client Ready Check assets collected from CommunityDragon's archived patch 9.22 asset bundle. They are used as the visual foundation for the portfolio's Resume Found utility.

The runtime package includes only the main frame plus default and hover action plates. Other static states and videos below are research-only source references and are not shipped.

Source directory: <https://raw.communitydragon.org/9.22/plugins/rcp-fe-lol-ready-check/global/default/>

| Local asset | Source file | Bytes | SHA-256 | Use |
|---|---|---:|---|---|
| `ready-check-main-frame.png` | [`ready-check-main-frame.png`](https://raw.communitydragon.org/9.22/plugins/rcp-fe-lol-ready-check/global/default/ready-check-main-frame.png) | 54,732 | `DD6531F26F80F2E873465CA2BB7F3A048F59228773DB0A8775F2B11FAA54E5EA` | Authentic bronze Ready Check ring and integrated lower plaque from the archived client bundle. |
| Not packaged (comparison only) | [`ready-check-main-frame.png`](https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ready-check-main-frame.png) | 54,732 | `DD6531F26F80F2E873465CA2BB7F3A048F59228773DB0A8775F2B11FAA54E5EA` | Current `latest` CommunityDragon copy, byte-identical to the archived frame. |
| `button-accept-default.png` | [`button-accept-default.png`](https://raw.communitydragon.org/9.22/plugins/rcp-fe-lol-ready-check/global/default/button-accept-default.png) | 2,521 | `D9539F5BEAF50125FE1A134D56E02BB27332DB8C96659BA630E7DD66C8F0CC29` | Default `VIEW RESUME` action plate. |
| `button-accept-hover.png` | [`button-accept-hover.png`](https://raw.communitydragon.org/9.22/plugins/rcp-fe-lol-ready-check/global/default/button-accept-hover.png) | 2,670 | `97D88E6752CE4DCE4D9BBB301C0AF5C8BE74BF974F1CDF1F0E04537858D8A540` | Hover and keyboard-focus action plate. |
| Not packaged (source-only) | [`button-accept-disabled.png`](https://raw.communitydragon.org/9.22/plugins/rcp-fe-lol-ready-check/global/default/button-accept-disabled.png) | 3,165 | `955DFE7EB9F60881E72D8F63D5246012A878838EE41637D3CF1884F171EFE13C` | Disabled state; unused because the portfolio action is always available. |
| Not packaged (source-only) | [`default-background.png`](https://raw.communitydragon.org/9.22/plugins/rcp-fe-lol-ready-check/global/default/default-background.png) | 90,382 | `230FE830AF2689D60723589AC74EAE3BF20B4F9EE539767ABC64A39E5EF1EF99` | Riot's client uses this as a visual mask, so it is not a page background. |
| Not packaged (source-only) | [`timer-countdown.webm`](https://raw.communitydragon.org/9.22/plugins/rcp-fe-lol-ready-check/global/default/timer-countdown.webm) | 2,683,123 | `49427BE446B2C93051034BEF1FBD02855929A94A7BD3A7BCB70A4D2F17EBEF0F` | Countdown motion; Resume Found has no countdown state. |
| Not packaged (source-only) | [`timer-accepted-intro.webm`](https://raw.communitydragon.org/9.22/plugins/rcp-fe-lol-ready-check/global/default/timer-accepted-intro.webm) | 580,026 | `B9211329956373DB90AD525332C1946AE94D484AEE1E448A679DA200D97367F3` | Accepted-state transition; this utility opens the resume directly. |
| Not packaged (source-only) | [`timer-accepted-idle.webm`](https://raw.communitydragon.org/9.22/plugins/rcp-fe-lol-ready-check/global/default/timer-accepted-idle.webm) | 983,040 | `BF374FE796CD871D69427282CE25440F63FEF841DD6B5264671601410FAA7C7A` | Accepted-state loop; Resume Found has no accepted-idle state. |

The main frame and button placement follow the Ready Check client relationship: the J sits inside the central aperture, `RESUME FOUND` occupies the lower plaque, and the accept plate overlaps the frame's bottom edge. The action retains the authentic default and hover art while replacing the client label with the portfolio action.

On 2026-09-29, the current [latest](https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/) and [PBE](https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/) static-assets directories were compared with the collected 9.22 Ready Check set. The 530×530 main frame and 212×70 accept default/hover plates match the 9.22 files byte-for-byte. The disabled plate has the same decoded pixels, though the PBE PNG bytes differ. No better static frame or action art was found, so the authentic composition remains the runtime base.

The current [latest videos directory](https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/videos/) and PBE retain Ready Check countdown and accepted-state clips. `timer-countdown.webm` and `timer-accepted-intro.webm` match the collected 9.22 files byte-for-byte. The latest/PBE `timer-accepted-idle.webm` differs: 1,559,091 bytes (SHA-256 `CD946B85FF38F9D9A6B6D5656C083FA19D90F417449F217F420950F52D161064`) versus 983,040 bytes for the 9.22 source. These are source references only; do not add countdown, declined, or accepted-idle animations to the direct “VIEW RESUME” flow. CommunityDragon identifies these as Riot-owned, without endorsement or sponsorship; this research does not grant publication rights. Research comparison files remain local under `docs/utility-state-review/cd-pbe-compare-2026-09-29/`.

The earlier Pass 16 J vector (Figma `1950:46`) is superseded. The active large identity uses selected archive mark `159:2`; small client contexts use the separate optical glyphs documented in [`ASSET_MANIFEST.md`](../../../../docs/ASSET_MANIFEST.md).

These files retain Riot Games' original visual assets and provenance. Their use does not assert a separate license grant; publication decisions remain in the final release review.
