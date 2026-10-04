import { readFileSync } from "node:fs";
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

  it("links every rendered chapter fragment to one unique section target", () => {
    const markup = render();
    const chapterLinks = [...markup.matchAll(/<a href="#(fraymakers-[^"]+)"/g)];
    const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);

    expect(chapterLinks.length).toBeGreaterThan(0);
    for (const [, targetId] of chapterLinks) {
      expect(ids.filter((id) => id === targetId)).toHaveLength(1);
    }
  });

  it("gives the desktop chapter rail enough width to show all five labels", () => {
    const css = readFileSync("src/styles.css", "utf8");
    const activeDesktopRules = css.slice(
      css.lastIndexOf("@media (min-width:1800px) and (min-height:1000px)"),
    );

    expect(activeDesktopRules).toMatch(
      /\.fraymakers-nav\s*\{\s*grid-template-columns:\s*minmax\(0,\s*446px\)/,
    );
  });

  it("clears every chapter target from below the sticky chapter navigation", () => {
    const css = readFileSync("src/fraymakers-case.css", "utf8");

    expect(css).toMatch(
      /\.fray-case > section\[id\],\s*\.fray-case > footer\[id\]\s*\{[^}]*scroll-margin-top:\s*8px/s,
    );
    const mobileRules = css.slice(css.lastIndexOf("@media (max-width: 700px)"));
    expect(mobileRules).toMatch(/\.fray-case > section\[id\],\s*\.fray-case > footer\[id\]\s*\{[^}]*scroll-margin-top:\s*36px/s);

    const shellCss = readFileSync("src/styles.css", "utf8");
    expect(shellCss).toMatch(/\.fraymakers-nav__chapters a\[aria-current="location"\]\s*\{[^}]*color:\s*#e3c57e/s);
    expect(shellCss).toMatch(/\.fraymakers-nav__chapters a\[aria-current="location"\]::after\s*\{[^}]*height:\s*2px;[^}]*background:\s*#d6b76b/s);
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
    const compositionStart = markup.indexOf('id="fraymakers-composition"');
    const configurationStart = markup.indexOf('id="fraymakers-configuration"');
    const composition = markup.slice(compositionStart, configurationStart);
    const compositorInputs = markup.slice(
      composition.indexOf('class="fray-case__layer-list"'),
      composition.indexOf('class="fray-case__edge-list"'),
    );
    const pipeline = markup.slice(
      markup.indexOf('class="fray-case__stages"'),
      markup.indexOf("A connected route from match context"),
    );

    for (const item of ["LOGOS", "BACKGROUND / STAGE", "PLAYER 1 CHARACTER", "PLAYER 2 CHARACTER", "SET / PLAYER TEXT", "OTHER OVERLAYS", "ALIASES", "P2 MIRRORING", "LONG NAMES", "MISSING ASSETS"]) {
      expect(markup).toContain(item);
    }
    expect(composition).toContain("Layered game art meets match context.");
    expect(composition).toContain("Composition inputs include logos, stage and character art, costumes, assists, foreground, and set text.");
    expect(compositorInputs).not.toContain("fray-case__layer-index");
    expect([...pipeline.matchAll(/fray-case__stage-number">(\d{2})/g)].map(([, number]) => number)).toEqual(["01", "02", "03", "04"]);
    expect(markup).toContain("SCHEMATIC OUTPUT / LAYOUT ONLY");
    expect(markup).toContain("1280 × 720");
  });
});
