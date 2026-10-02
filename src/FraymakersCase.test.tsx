import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FraymakersCase from "./FraymakersCase";

describe("Fraymakers technical case study", () => {
  const render = () => renderToStaticMarkup(<MemoryRouter><FraymakersCase /></MemoryRouter>);

  it("explains the match-to-thumbnail system and later YAML configuration", () => {
    const markup = render();
    for (const stage of [
      "Tournament match data",
      "YAML configuration",
      "Match-to-video mapping",
      "thumbnail.js",
      "node-canvas",
      "1280 × 720",
      "One render path; values change by match.",
    ]) expect(markup).toContain(stage);
  });

  it("leads with the system before ownership context", () => {
    const markup = render();
    const opening = markup.split("</header>")[0];
    expect(opening).toContain("MATCH DATA TO VOD THUMBNAILS");
    expect(opening).toContain("One match");
    expect(opening).not.toMatch(/joined later|brother project|my scope/i);
    expect(markup).toContain("I built <code>thumbnail.js</code>");
    expect(markup).toContain("worked on match-specific YAML configuration, thumbnail generation, and integration.");
    expect(markup).not.toContain("I joined later");
    expect(markup).toContain("Automatic upload was not completed");
  });

  it("explains the rendered frame's layers and technical edge cases", () => {
    const markup = render();
    for (const item of ["LOGOS", "BACKGROUND / STAGE", "PLAYER 1 CHARACTER", "PLAYER 2 CHARACTER", "SET / PLAYER TEXT", "OTHER OVERLAYS", "ALIASES", "P2 MIRRORING", "LONG NAMES", "MISSING ASSETS"]) {
      expect(markup).toContain(item);
    }
    expect(markup).toContain("SCHEMATIC OUTPUT / LAYOUT ONLY");
    expect(markup).toContain("1280 × 720");
  });
});
