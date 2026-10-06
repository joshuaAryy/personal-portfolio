import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FraymakersCase from "./FraymakersCase";

describe("Fraymakers technical case study", () => {
  const render = () => renderToStaticMarkup(<MemoryRouter><FraymakersCase /></MemoryRouter>);

  it("leads with the native composition figure and keeps match context to one sequence", () => {
    const markup = render();
    const introIndex = markup.indexOf('id="fraymakers-intro"');
    const compositionIndex = markup.indexOf('id="fraymakers-composition"');
    const pipelineIndex = markup.indexOf('id="fraymakers-pipeline"');
    const configurationIndex = markup.indexOf('id="fraymakers-configuration"');

    expect(introIndex).toBeGreaterThan(-1);
    expect(compositionIndex).toBeGreaterThan(introIndex);
    expect(pipelineIndex).toBeGreaterThan(compositionIndex);
    expect(configurationIndex).toBeGreaterThan(pipelineIndex);
    expect(markup.indexOf("SCHEMATIC OUTPUT")).toBeLessThan(markup.indexOf("TOURNAMENT CONTEXT"));
    expect(markup).not.toContain("fray-case__opening-route");
    expect(markup).not.toContain("fray-case__config-figure");
    expect(markup).toContain("Categories carried by match-specific YAML overrides");
    expect(markup).toContain("ART");
    expect(markup).toContain("PRESENTATION");
  });

  it("teaches the full match-to-render sequence without inventing lookup details", () => {
    const markup = render();
    const orderedStages = [
      "TOURNAMENT CONTEXT",
      "METADATA",
      "YAML / CONFIG",
      "VIDEO ASSOCIATION",
      "RENDERED THUMBNAIL",
    ].map((stage) => markup.indexOf(stage));

    expect(orderedStages.every((index) => index >= 0)).toBe(true);
    expect(orderedStages).toEqual([...orderedStages].sort((a, b) => a - b));
    expect(markup).toContain("1280");
    expect(markup).toContain("exact lookup details are not represented here");
    expect(markup.match(/thumbnail\.js/g)).toHaveLength(1);
    expect(markup).toContain("node-canvas");
  });

  it("links every rendered chapter fragment to one unique section target", () => {
    const markup = render();
    const chapterLinks = [...markup.matchAll(/<a href="#(fraymakers-[^"]+)"/g)];
    const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);

    expect(chapterLinks.length).toBeGreaterThan(0);
    for (const [, targetId] of chapterLinks) {
      expect(ids.filter((id) => id === targetId)).toHaveLength(1);
    }
  });

  it("keeps the broader foundation and Joshua's later subsystem ownership distinct", () => {
    const markup = render();
    const opening = markup.split("</header>")[0];
    expect(opening).toContain("FROM MATCH CONTEXT TO VOD-READY FRAME");
    expect(opening).toContain("I built");
    expect(markup).toContain("I built <code>thumbnail.js</code>");
    expect(markup).toContain("I joined later");
    expect(markup).toContain("My brother started the broader project");
    expect(markup).toContain("earlier CLI/workflow");
    expect(markup).toContain("much of the Challonge integration and early API groundwork");
    expect(markup).toContain("Automatic upload");
    expect(markup).toContain("Not completed");
  });

  it("uses native explanatory figures and describes supported composition cases", () => {
    const markup = render();
    const compositionStart = markup.indexOf('id="fraymakers-composition"');
    const ownershipStart = markup.indexOf('id="fraymakers-ownership"');
    const composition = markup.slice(compositionStart, ownershipStart);

    for (const item of ["stage/background art", "character sprites", "alternate costumes", "assists", "foreground elements", "logos", "P2 MIRRORING", "ALIASES", "LONG NAMES", "MISSING ASSETS"]) {
      expect(markup).toContain(item);
    }
    expect(composition).toContain("SCHEMATIC OUTPUT");
    expect(composition).toContain("STAGE / BACKGROUND ART");
    expect(composition).toContain("P2 · MIRRORED SPRITE");
    expect(composition).toContain("TOURNAMENT LOGO");
    expect(composition).toContain("exact layer ordering is not established");
    expect(markup.match(/<figure/g)?.length).toBeGreaterThanOrEqual(4);
    expect(markup).not.toContain("<img");
    expect(markup).toContain("exact YAML keys and sample values are not shown");
    expect(markup).toContain("used on real Fraymakers VODs");
  });

  it("positions chapter targets below the desktop and mobile sticky rails", () => {
    const css = readFileSync("src/fraymakers-case.css", "utf8");

    expect(css).toMatch(
      /\.fray-case > section\[id\],\s*\.fray-case > footer\[id\]\s*\{\s*scroll-margin-top:\s*68px/s,
    );
    expect(css).toMatch(
      /@media \(max-width: 700px\)[\s\S]*?\.fray-case > section\[id\],\s*\.fray-case > footer\[id\]\s*\{\s*scroll-margin-top:\s*94px/s,
    );
  });

  it("keeps the Fraymakers chapter rail sized and styled in the shared shell", () => {
    const shellCss = readFileSync("src/styles.css", "utf8");
    const activeDesktopRules = shellCss.slice(
      shellCss.lastIndexOf("@media (min-width:1800px) and (min-height:1000px)"),
    );

    expect(activeDesktopRules).toMatch(
      /\.fraymakers-nav\s*\{\s*grid-template-columns:\s*minmax\(0,\s*446px\)/,
    );
    expect(shellCss).toMatch(/\.fraymakers-nav__chapters a\[aria-current="location"\]\s*\{[^}]*color:\s*#e3c57e/s);
    expect(shellCss).toMatch(/\.fraymakers-nav__chapters a\[aria-current="location"\]::after\s*\{[^}]*height:\s*2px;[^}]*background:\s*#d6b76b/s);
  });

  it("keeps the render boundary separate from the unfinished YouTube path", () => {
    const markup = render();
    const outputIndex = markup.indexOf("used on real Fraymakers VODs");
    const uploadIndex = markup.indexOf("YouTube Data API v3 / OAuth");

    expect(outputIndex).toBeGreaterThan(-1);
    expect(uploadIndex).toBeGreaterThan(outputIndex);
    expect(markup).toContain("full automatic upload did not ship");
  });
});
