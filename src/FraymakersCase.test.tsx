import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FraymakersCase from "./FraymakersCase";

const render = () => renderToStaticMarkup(<MemoryRouter><FraymakersCase /></MemoryRouter>);

describe("Fraymakers technical case study", () => {
  it("opens with a visual payoff and omits the context metadata register", () => {
    const markup = render();
    const hero = markup.slice(markup.indexOf('id="fraymakers-intro"'), markup.indexOf('id="fraymakers-pipeline"'));
    expect(hero).toContain("A tournament match,");
    expect(hero).toContain("aria-label=\"Conceptual 1280 by 720 Fraymakers thumbnail preview\"");
    expect(hero).toContain("thumbnail.js");
    expect(hero).not.toContain("CONTEXT</dt>");
    expect(hero).not.toContain("Shared project with my brother");
  });

  it("teaches the project-specific media path in one accessible schematic", () => {
    const markup = render();
    const workflow = markup.slice(markup.indexOf('id="fraymakers-pipeline"'), markup.indexOf('id="fraymakers-composition"'));
    expect(workflow).toContain('aria-label="Fraymakers media workflow schematic"');
    const steps = ["MATCH METADATA", "YAML / CONFIG OVERRIDES", "VIDEO / MATCH ASSOCIATION", "ASSET RESOLUTION", "THUMBNAIL.JS + NODE-CANVAS", "1280 × 720 PNG", "REAL FRAYMAKERS VODS", "YouTube Data API v3 / OAuth", "Automatic upload was not completed"]
      .map((label) => workflow.toUpperCase().indexOf(label.toUpperCase()));
    expect(steps.every((index) => index >= 0)).toBe(true);
    expect(steps).toEqual([...steps].sort((a, b) => a - b));
    expect(workflow.match(/<ol\b/g)).toHaveLength(1);
    expect(workflow).not.toContain("fray-case__stage");
    expect(workflow).toContain("Conceptual path; the exact video lookup, YAML keys, values, and defaults are not established.");
  });

  it("explains what changes per match without presenting an invented YAML schema", () => {
    const markup = render();
    const workflow = markup.slice(markup.indexOf('id="fraymakers-pipeline"'), markup.indexOf('id="fraymakers-composition"'));
    const config = workflow.slice(workflow.indexOf('id="fraymakers-configuration"'));
    expect(config).toContain("Event + match overrides");
    expect(workflow).toContain("YAML / CONFIG OVERRIDES");
    expect(workflow.toLowerCase()).toContain("thumbnail.js");
    expect(config.toLowerCase()).toContain("yaml keys, values, and defaults are not established");
    expect(config).not.toContain("<pre");
  });

  it("gives the fixed-size renderer and its input constraints meaningful explanation", () => {
    const markup = render();
    const composition = markup.slice(markup.indexOf('id="fraymakers-composition"'), markup.indexOf('id="fraymakers-outcome"'));
    expect(composition).toContain('viewBox="0 0 1280 720"');
    expect(composition).toContain("COMPOSITION SCHEMATIC");
    expect(composition).toContain("node-canvas");
    expect(composition).toContain("P2 art was mirrored toward the matchup");
    expect(composition).toContain("long names");
    expect(composition).toContain("alias and missing-asset fallback details are not established");
    expect(composition).not.toContain("fray-case__constraint-list");
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

  it("weaves subsystem authorship into the story and preserves the unfinished upload boundary", () => {
    const markup = render();
    const opening = markup.slice(markup.indexOf('id="fraymakers-intro"'), markup.indexOf('id="fraymakers-pipeline"'));
    expect(opening).toContain("renderer I built for Fraymakers tournament videos");
    expect(opening).toContain("My brother started the broader project");
    expect(opening).toContain("CLI");
    expect(opening).toContain("Challonge integration");
    expect(opening).toContain("I joined later");
    expect(opening).toContain("thumbnail.js");
    expect(markup).not.toContain('id="fraymakers-ownership"');
    expect(markup).not.toContain("fray-case__ownership-note");
    expect(markup).toContain("used on real Fraymakers VODs");
    expect(markup).toContain("YouTube Data API v3 / OAuth");
    expect(markup).toContain("automatic upload was not completed");
    expect(markup).not.toContain("DISTINCT CONTRIBUTIONS");
    expect(markup).not.toContain("MY FOCUS</dt>");
    expect(markup).not.toMatch(/time saved|hours saved|automatically uploaded/i);
  });

  it("provides one unique destination for each chapter link in story order", () => {
    const markup = render();
    const links = [...markup.matchAll(/<a href="#(fraymakers-[^"]+)"/g)].map(([, id]) => id);
    expect(links).toEqual(["fraymakers-pipeline", "fraymakers-configuration", "fraymakers-composition", "fraymakers-outcome"]);
    const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
    for (const id of links) expect(ids.filter((target) => target === id)).toHaveLength(1);
  });

  it("positions chapter targets below the desktop and mobile sticky rails", () => {
    const css = readFileSync("src/fraymakers-case.css", "utf8");
    expect(css).toMatch(/\.fray-case > section\[id\],\s*\.fray-case > footer\[id\]\s*\{\s*scroll-margin-top:\s*68px/s);
    expect(css).toMatch(/@media \(max-width: 700px\)[\s\S]*?\.fray-case > section\[id\],\s*\.fray-case > footer\[id\]\s*\{\s*scroll-margin-top:\s*94px/s);
  });
});
