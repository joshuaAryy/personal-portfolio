import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FraymakersCase from "./FraymakersCase";

const render = () => renderToStaticMarkup(<MemoryRouter><FraymakersCase /></MemoryRouter>);

describe("Fraymakers technical case study", () => {
  it("opens on Joshua's renderer and a visibly conceptual composition", () => {
    const markup = render();
    const hero = markup.slice(markup.indexOf('id="fraymakers-pipeline"'), markup.indexOf('id="fraymakers-configuration"'));
    expect(hero).toContain("I built <code>thumbnail.js</code>");
    expect(hero).toContain("<span>RENDERER</span><code>thumbnail.js</code><span>CANVAS</span><strong>node-canvas</strong>");
    expect(hero).toContain("1280 × 720 PNG");
    expect(hero).toContain("Thumbnail composition schematic");
    expect(hero).toContain("Schematic only; this is not an authentic generated thumbnail.");
    expect(hero).toContain("Background &amp; stage art");
    expect(hero).toContain("Player character &amp; costume art");
    expect(hero).toContain("Supporting assets");
    expect(hero).toContain("Player names &amp; set labels");
    expect(hero).toContain("My brother built the broader foundation, CLI, Challonge integration");
    expect(hero).toContain("I joined later to build <code>thumbnail.js</code>");
    expect(hero.indexOf("<figure")).toBeLessThan(hero.indexOf("class=\"fray-case__intro-detail\""));
    expect(hero).toContain('viewBox="0 0 1280 720"');
    expect(hero).not.toContain("Ordered conceptual pipeline");
    expect(hero).not.toContain("MATCH + TOURNAMENT");
  });

  it("shows one conceptual metadata-to-output path without inventing a YAML schema", () => {
    const markup = render();
    const workflow = markup.slice(markup.indexOf('id="fraymakers-configuration"'), markup.indexOf('id="fraymakers-composition"'));
    expect(workflow).toContain('class="fray-case__workflow-path"');
    expect(workflow.match(/fray-case__workflow-stage--configuration/g)).toHaveLength(1);
    expect(workflow.match(/fray-case__workflow-stage--metadata/g)).toHaveLength(1);
    expect(workflow.match(/fray-case__workflow-stage--association/g)).toHaveLength(1);
    expect(workflow.indexOf('fray-case__workflow-stage--metadata')).toBeLessThan(workflow.indexOf('fray-case__workflow-stage--configuration'));
    expect(workflow.indexOf('fray-case__workflow-stage--configuration')).toBeLessThan(workflow.indexOf('fray-case__workflow-stage--association'));
    expect(workflow).toContain("Tournament + match metadata");
    expect(workflow).toContain("Event / match YAML overrides");
    expect(workflow).toContain("Match ↔ recording association");
    expect(workflow).toContain("Selected media assets");
    expect(workflow).toContain("Character / sprite art");
    expect(workflow).toContain("Foreground + logos");
    expect(workflow).toContain("thumbnail.js");
    expect(workflow).toContain("node-canvas");
    expect(workflow).toContain("1280 × 720 PNG");
    expect(workflow).toContain("exact YAML keys and override behavior are not established");
    expect(workflow.indexOf("Tournament + match metadata")).toBeLessThan(workflow.indexOf("Event / match YAML overrides"));
    expect(workflow.indexOf("Event / match YAML overrides")).toBeLessThan(workflow.indexOf("Match ↔ recording association"));
    expect(workflow.indexOf("Match ↔ recording association")).toBeLessThan(workflow.indexOf("Selected media assets"));
    expect(workflow.indexOf("Selected media assets")).toBeLessThan(workflow.indexOf("thumbnail.js"));
    expect(workflow.indexOf("thumbnail.js")).toBeLessThan(workflow.indexOf("1280 × 720 PNG"));
    expect(workflow).not.toContain("<pre");
    expect(workflow).toContain("Conceptual sequence; exact YAML keys and override behavior are not established, and no fixed composition order is shown.");
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
});
