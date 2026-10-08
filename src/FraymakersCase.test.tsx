import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FraymakersCase from "./FraymakersCase";

const render = () => renderToStaticMarkup(<MemoryRouter><FraymakersCase /></MemoryRouter>);

describe("Fraymakers technical case study", () => {
  it("opens with the 16:9 output, Joshua's renderer, and a simple composition map", () => {
    const markup = render();
    const hero = markup.slice(markup.indexOf('id="fraymakers-pipeline"'), markup.indexOf('id="fraymakers-configuration"'));
    expect(hero).toContain("I built <code>thumbnail.js</code>");
    expect(hero).toContain("thumbnail.js");
    expect(hero).toContain("node-canvas");
    expect(hero).toContain("1280 × 720 PNG");
    expect(hero).toContain('class="fray-case__hero-frame"');
    expect(hero).toContain("STAGE + BACKGROUND ART");
    expect(hero).toContain("PLAYER 1");
    expect(hero).toContain("PLAYER 2");
    expect(hero).toContain("CHARACTER + COSTUME");
    expect(hero).toContain("LOGOS + ASSISTS + FOREGROUND ART");
    expect(hero).toContain("PLAYER NAMES + SET LABELS");
    expect(hero).toContain("Illustrative content zones only; not a real thumbnail or fixed render order.");
    expect(hero).toContain("My brother built the broader foundation, CLI, Challonge integration");
    expect(hero).toContain("I joined later to build <code>thumbnail.js</code>");
    expect(hero.indexOf("<figure")).toBeLessThan(hero.indexOf("class=\"fray-case__intro-detail\""));
    expect(hero).not.toContain("<svg");
    expect(hero).not.toContain("fray-case__hero-key");
    expect(hero).not.toContain("fray-case__hero-tools");
    expect(hero).not.toContain("Ordered conceptual pipeline");
    expect(hero).not.toContain("MATCH + TOURNAMENT");
  });

  it("connects match context to the thumbnail renderer and output without inventing schema or layer order", () => {
    const markup = render();
    const workflow = markup.slice(markup.indexOf('id="fraymakers-configuration"'), markup.indexOf('id="fraymakers-composition"'));
    expect(workflow).toContain('class="fray-case__workflow-path"');
    expect(workflow).toContain('class="fray-case__workflow-context"');
    expect(workflow).toContain('class="fray-case__workflow-render"');
    expect(workflow).toContain('class="fray-case__workflow-renderer"');
    expect(workflow).toContain('class="fray-case__workflow-output"');
    expect(workflow.indexOf("Tournament + match metadata")).toBeLessThan(workflow.indexOf("Event / match YAML overrides"));
    expect(workflow.indexOf("Event / match YAML overrides")).toBeLessThan(workflow.indexOf("Match ↔ recording association"));
    expect(workflow.indexOf("Match ↔ recording association")).toBeLessThan(workflow.indexOf("Selected media assets"));


    expect(workflow.indexOf('class="fray-case__workflow-renderer"')).toBeLessThan(workflow.indexOf('class="fray-case__workflow-renderer-library"'));
    expect(workflow.indexOf('class="fray-case__workflow-renderer-library"')).toBeLessThan(workflow.indexOf('class="fray-case__workflow-output"'));
    expect(workflow).toContain("Tournament + match metadata");
    expect(workflow).toContain("Event / match YAML overrides");
    expect(workflow).toContain("Match ↔ recording association");
    expect(workflow).toContain("Selected media assets");
    expect(workflow).toContain("Character / sprite art");
    expect(workflow).toContain("Player + tournament logos");
    expect(workflow).toContain("Foreground art");
    expect(workflow).toContain("thumbnail.js");
    expect(workflow).toContain("node-canvas");
    expect(workflow).toContain("1280 × 720 PNG");
    expect(workflow).not.toContain("<pre");
    expect(workflow).toContain("YAML keys and override behavior are not established");
    expect(workflow).toContain("Asset categories are inputs; composition order is unverified.");
    expect(markup).not.toContain("REAL FRAYMAKERS VODS");
  });

  it("keeps a small schematic mirroring comparison and concise unknown constraints", () => {
    const markup = render();
    const implementation = markup.slice(markup.indexOf('id="fraymakers-composition"'), markup.indexOf('id="fraymakers-outcome"'));
    expect(implementation).toContain("Mirrored toward P1");
    expect(implementation).toContain("Alternate player and character names");
    expect(implementation).toContain("specific text-fit strategy is unknown");
    expect(implementation).toContain("exact fallback behavior is unknown");
    expect(implementation).toContain("does not depict a real character or output");
    expect(implementation).not.toContain("alias mapping");
    const css = readFileSync("src/fraymakers-case.css", "utf8");
    expect(css).toContain(".fray-case__mirror-side--p2 svg { transform: scaleX(-1); }");
  });

  it("closes once on real VOD use and states the unfinished YouTube boundary", () => {
    const markup = render();
    const close = markup.slice(markup.indexOf('id="fraymakers-outcome"'));
    expect(close).toContain('class="fray-case__handoff-path"');
    expect(close).toContain("Generated 1280 × 720 PNG");
    expect(close).toContain("used on Fraymakers VODs");
    expect(close).toContain("YouTube Data API / OAuth");
    expect(close).toContain("Prototype only");
    expect(close).toContain("Automatic upload unfinished");
    expect(close).toContain("solid: VOD use");
    expect(close).toContain("dashed: prototype path");
    expect(close).not.toContain("<img");
    expect(markup.match(/Fraymakers VODs/g)).toHaveLength(1);
    expect(markup).not.toMatch(/automatically uploaded|hours saved|time saved/i);
  });

  it("preserves ownership boundaries and the existing navigation anchors", () => {
    const markup = render();
    expect(markup).toContain("My brother");
    expect(markup).toContain("built the broader foundation, CLI, Challonge integration");
    expect(markup).toContain("I joined later to build <code>thumbnail.js</code>");
    expect(markup).toContain("part of the YouTube API path");
    const links = [...markup.matchAll(/<a href="#(fraymakers-[^"]+)"/g)].map(([, id]) => id);
    expect(links).toEqual(["fraymakers-pipeline", "fraymakers-configuration", "fraymakers-composition", "fraymakers-outcome"]);
    const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
    for (const id of links) expect(ids.filter((target) => target === id)).toHaveLength(1);
  });

  it("positions chapter targets below the desktop and mobile sticky rails", () => {
    const css = readFileSync("src/fraymakers-case.css", "utf8");
    expect(css).toMatch(/\.fray-case > header\[id\], \.fray-case > section\[id\], \.fray-case > footer\[id\] \{ scroll-margin-top: 68px; \}/s);
    expect(css).toMatch(/@media \(max-width: 760px\)[\s\S]*?\.fray-case > header\[id\], \.fray-case > section\[id\], \.fray-case > footer\[id\] \{ scroll-margin-top: 94px; \}/s);
    expect(css).toContain("@media (max-width: 390px)");
  });

  it("keeps the simplified 16:9 composition labels readable at 390px", () => {
    const css = readFileSync("src/fraymakers-case.css", "utf8");
    const narrow = css.match(/@media \(max-width: 390px\) \{([\s\S]*?)\n\}/)?.[1] ?? "";

    expect(css).toContain(".fray-case__hero-frame");
    expect(narrow).toMatch(/\.fray-case__hero-zone[^}]*font-size:\s*10px/s);
    expect(narrow).toMatch(/\.fray-case__hero-matchup\s*\{[\s\S]*?grid-template-columns:/);
  });
});
