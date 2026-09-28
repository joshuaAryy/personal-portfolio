import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FraymakersCase from "./FraymakersCase";

describe("Fraymakers technical case study", () => {
  const render = () => renderToStaticMarkup(<MemoryRouter><FraymakersCase /></MemoryRouter>);

  it("explains the four-stage match-to-media pipeline", () => {
    const markup = render();
    expect(markup).toContain("Challonge metadata");
    expect(markup).toContain("YAML configuration");
    expect(markup).toContain("Match-to-video mapping");
    expect(markup).toContain("thumbnail.js");
    expect(markup).toContain("node-canvas");
    expect(markup).toContain("1280 × 720");
  });

  it("puts Joshua's bounded subsystem ownership beside the technical opening", () => {
    const markup = render();
    expect(markup).toContain("MY SCOPE / JOINED LATER");
    expect(markup).toContain("My brother owned the project foundation, CLI, and early Challonge groundwork.");
    expect(markup).toContain("thumbnail.js");
    expect(markup).toContain("My brother owned the foundation, CLI, and much of the early Challonge and API groundwork");
  });

  it("makes ownership and incomplete automation explicit", () => {
    const markup = render();
    expect(markup).toContain("I joined later");
    expect(markup).toContain("My brother owned the foundation, CLI, and much of the early Challonge and API groundwork");
    expect(markup).toContain("Automatic upload was not completed");
    expect(markup).not.toContain("automatic upload completed");
    const opening = markup.split("</header>")[0];
    expect(opening).toContain("YouTube Data API / OAuth remained a prototype; automatic upload was not completed.");
  });

  it("shows composition inputs and pipeline edge cases without inventing thumbnail media", () => {
    const markup = render();
    for (const item of ["LOGOS", "STAGE ART", "CHARACTER / SPRITE ART", "COSTUMES", "ASSISTS", "FOREGROUND ART", "TEXT / SET LABELS", "ALIASES", "P2 MIRRORING", "LONG NAMES", "MISSING ASSETS"]) {
      expect(markup).toContain(item);
    }
    expect(markup).toContain("Schematic output preview, 1280 × 720; not original project artwork");
    expect(markup).toContain("SCHEMATIC OUTPUT / LAYOUT ONLY");
    expect(markup).toContain("Not original project artwork");
    expect(markup).toContain("1280 × 720");
    expect(markup).toContain("SCHEMATIC / LAYOUT ONLY");
    expect(markup).toContain("fray-case__schematic-preview");
    expect(markup).not.toContain("No generated VOD artwork shown");
  });
});
