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

  it("teaches the metadata, recording association, and renderer handoff once", () => {
    const markup = render();
    const workflow = markup.slice(markup.indexOf('id="fraymakers-configuration"'), markup.indexOf('id="fraymakers-composition"'));
    expect(workflow).toContain("Tournament + match information");
    expect(workflow).toContain("Event or match overrides");
    expect(workflow).toContain("paired with its recording");
    expect(workflow).toContain("Selected labels + art");
    expect(workflow).toContain("Background &amp; support");
    expect(workflow).toContain("Names &amp; set labels");
    expect(workflow).toContain("thumbnail.js");
    expect(workflow).toContain("Exact keys and override behavior are not established.");
    expect(workflow).not.toContain("<pre");
    expect(markup.match(/Conceptual relationship: match context and configuration inform/g)).toHaveLength(1);
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
    expect(close).toContain("used on Fraymakers VODs");
    expect(close).toContain("YouTube authentication and integration were prototyped");
    expect(close).toContain("automatic upload was unfinished");
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
