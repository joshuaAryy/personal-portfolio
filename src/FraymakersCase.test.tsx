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
    expect(hero).toContain("a 1280 × 720 frame for its associated VOD.");
    expect(hero).toContain("Ordered conceptual pipeline: match and tournament context, match details and YAML config, video association, asset resolution");
    expect(hero).toContain("thumbnail.js");
    expect(hero).not.toContain("My brother started the broader project");
    expect(hero).not.toContain("CONTEXT</dt>");
    expect(hero).not.toContain("Shared project with my brother");
    expect(markup).not.toContain('class="fray-case__authorship"');
    const heroInputs = ["01 / MATCH + TOURNAMENT", "02 / MATCH DETAILS + YAML", "03 / VIDEO ASSOCIATION", "04 / ASSET RESOLUTION", "NODE-CANVAS", "PNG / VOD FRAME"]
      .map((label) => hero.indexOf(label));
    expect(heroInputs).toEqual([...heroInputs].sort((a, b) => a - b));
    const css = readFileSync("src/fraymakers-case.css", "utf8");
    expect(css).not.toMatch(/\.fray-case__hero-player--two\s*\{[^}]*transform:\s*scaleX\(-1\)/s);
    expect(css).toContain(".fray-case__hero-system-inputs span:not(:last-child)::after");
  });

  it("teaches the match-to-VOD workflow in a concise connected sequence", () => {
    const markup = render();
    const workflow = markup.slice(markup.indexOf('id="fraymakers-pipeline"'), markup.indexOf('id="fraymakers-composition"'));
    const steps = ["MATCH + TOURNAMENT", "MATCH DETAILS", "YAML / CONFIG", "VIDEO ASSOCIATION", "ASSET RESOLUTION", "THUMBNAIL.JS · NODE-CANVAS", "REAL FRAYMAKERS VODS"]
      .map((label) => workflow.indexOf(label));
    expect(steps.every((index) => index >= 0)).toBe(true);
    expect(steps).toEqual([...steps].sort((a, b) => a - b));
    expect(workflow.match(/<li\b/g)).toHaveLength(5);
    expect(workflow).not.toContain("PLAYER METADATA");
    expect(workflow).not.toContain("Conceptual sequence of the supported workflow");
    expect(workflow).toContain('class="fray-case__upload-prototype"');
    expect(workflow).toContain("Automatic upload was not completed");
  });

  it("numbers the visible story sections in sequence", () => {
    const markup = render();
    const sections = [...markup.matchAll(/<p class="fray-case__eyebrow">(0[1-4]) \/[^<]*/g)].map(([, section]) => section);
    expect(sections).toEqual(["01", "02", "03", "04"]);
  });

  it("explains YAML overrides without presenting an invented schema", () => {
    const markup = render();
    const config = markup.slice(markup.indexOf('id="fraymakers-configuration"'), markup.indexOf('id="fraymakers-composition"'));
    expect(config).toContain("YAML / CONFIG");
    expect(config).toContain("Names and aliases");
    expect(config).toContain("Character and costume choices");
    expect(config).toContain("Event and set labels");
    expect(config).toContain("match-specific choices");
    expect(config).toContain("exact YAML keys");
    expect(config).not.toContain("<pre");
  });

  it("gives the fixed-size renderer and its input constraints meaningful explanation", () => {
    const markup = render();
    const composition = markup.slice(markup.indexOf('id="fraymakers-composition"'), markup.indexOf('id="fraymakers-outcome"'));
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

  it("weaves subsystem authorship into the story and preserves the unfinished upload boundary", () => {
    const markup = render();
    expect(markup).toContain("I joined later and built <code>thumbnail.js</code>");
    expect(markup).toContain('class="fray-case__ownership-note"');
    expect(markup).toContain("My brother started the broader project");
    expect(markup).toContain("CLI");
    expect(markup).toContain("Challonge integration");
    expect(markup).toContain("I joined later");
    expect(markup).toContain("used on real Fraymakers VODs");
    expect(markup).toContain("YouTube Data API v3 / OAuth");
    expect(markup).toContain("Automatic upload was not completed");
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
