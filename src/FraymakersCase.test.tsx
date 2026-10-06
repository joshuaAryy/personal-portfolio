import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FraymakersCase from "./FraymakersCase";

const render = () => renderToStaticMarkup(<MemoryRouter><FraymakersCase /></MemoryRouter>);

describe("Fraymakers technical case study", () => {
  it("follows the full workflow before opening the renderer subsystem", () => {
    const markup = render();
    const targets = ["pipeline", "configuration", "composition", "ownership", "outcome"]
      .map((id) => markup.indexOf(`id="fraymakers-${id}"`));
    expect(targets.every((index) => index >= 0)).toBe(true);
    expect(targets).toEqual([...targets].sort((a, b) => a - b));
    const stages = ["TOURNAMENT CONTEXT", "PLAYER METADATA", "YAML / CONFIG", "VIDEO ASSOCIATION", "ASSET COMPOSITION", "PNG OUTPUT", "VOD USE"]
      .map((label) => markup.indexOf(`>${label}<`));
    expect(stages.every((index) => index >= 0)).toBe(true);
    expect(stages).toEqual([...stages].sort((a, b) => a - b));
  });

  it("explains what changes per match without presenting an invented YAML schema", () => {
    const markup = render();
    const config = markup.slice(markup.indexOf('id="fraymakers-configuration"'), markup.indexOf('id="fraymakers-composition"'));
    expect(config).toContain("Match-specific inputs");
    expect(config).toContain("Names and aliases");
    expect(config).toContain("Character and costume choices");
    expect(config).toContain("Event and set labels");
    expect(config).toContain("Conceptual input categories");
    expect(config).toContain("exact YAML keys");
    expect(config).not.toContain("<pre");
  });

  it("gives the fixed-size renderer and its input constraints meaningful explanation", () => {
    const markup = render();
    const composition = markup.slice(markup.indexOf('id="fraymakers-composition"'), markup.indexOf('id="fraymakers-ownership"'));
    expect(composition).toContain('viewBox="0 0 1280 720"');
    expect(composition).toContain("COMPOSITION SCHEMATIC");
    expect(composition).toContain("node-canvas");
    for (const constraint of ["P2 mirroring", "Aliases", "Long names", "Missing assets and configuration"]) {
      expect(composition).toContain(constraint);
    }
    expect(composition).toContain("Both players face the matchup");
    expect(composition).toContain("Variable text, fixed frame");
    expect(composition).toContain("exact fallback behavior");
    expect(composition).not.toContain("<img");
  });

  it("retains the renderer's art relationships in a readable narrow composition view", () => {
    const markup = render();
    const narrow = markup.slice(markup.indexOf('aria-label="Simplified composition for narrow screens"'), markup.indexOf('id="fraymakers-composition-caption"'));
    expect(narrow).toContain("P1 art");
    expect(narrow).toContain("P2 art");
    expect(narrow).toContain("mirrored");
    expect(narrow).toContain("Stage / background + logos");
    expect(narrow).toContain("Names / set labels / foreground");
  });

  it("keeps subsystem authorship and the unfinished upload boundary explicit", () => {
    const markup = render();
    expect(markup).toContain("I built <code>thumbnail.js</code>");
    expect(markup).toContain("My brother started the broader project");
    expect(markup).toContain("CLI");
    expect(markup).toContain("Challonge integration");
    expect(markup).toContain("I joined later");
    expect(markup).toContain("used on real Fraymakers VODs");
    expect(markup).toContain("YouTube Data API v3 / OAuth");
    expect(markup).toContain("Automatic upload was not completed");
    expect(markup).not.toMatch(/time saved|hours saved|automatically uploaded/i);
  });

  it("provides one unique destination for each chapter link in story order", () => {
    const markup = render();
    const links = [...markup.matchAll(/<a href="#(fraymakers-[^"]+)"/g)].map(([, id]) => id);
    expect(links).toEqual(["fraymakers-pipeline", "fraymakers-configuration", "fraymakers-composition", "fraymakers-ownership", "fraymakers-outcome"]);
    const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
    for (const id of links) expect(ids.filter((target) => target === id)).toHaveLength(1);
  });

  it("positions chapter targets below the desktop and mobile sticky rails", () => {
    const css = readFileSync("src/fraymakers-case.css", "utf8");
    expect(css).toMatch(/\.fray-case > section\[id\],\s*\.fray-case > footer\[id\]\s*\{\s*scroll-margin-top:\s*68px/s);
    expect(css).toMatch(/@media \(max-width: 700px\)[\s\S]*?\.fray-case > section\[id\],\s*\.fray-case > footer\[id\]\s*\{\s*scroll-margin-top:\s*94px/s);
  });
});
