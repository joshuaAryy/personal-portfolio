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

  it("makes ownership and incomplete automation explicit", () => {
    const markup = render();
    expect(markup).toContain("I joined later");
    expect(markup).toContain("My brother owned the foundation, CLI, and much of the early Challonge and API groundwork");
    expect(markup).toContain("Automatic upload was not completed");
    expect(markup).not.toContain("automatic upload completed");
  });

  it("shows composition inputs and pipeline edge cases without inventing thumbnail media", () => {
    const markup = render();
    for (const item of ["LOGOS", "STAGE ART", "CHARACTER / SPRITE ART", "COSTUMES", "ASSISTS", "FOREGROUND ART", "TEXT / SET LABELS", "ALIASES", "P2 MIRRORING", "LONG NAMES", "MISSING ASSETS"]) {
      expect(markup).toContain(item);
    }
    expect(markup).toContain("Output specification, not a thumbnail preview");
    expect(markup).not.toContain("thumbnail-preview");
  });
});
