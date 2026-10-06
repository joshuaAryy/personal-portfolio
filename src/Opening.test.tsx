import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderOpeningRoute(reducedMotion = false) {
  vi.stubGlobal("window", {
    matchMedia: () => ({ matches: reducedMotion }),
  });
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );
}

describe("opening route handoff", () => {
  it("keeps Home / Explore beneath the inaccessible opening treatment", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('class="opening__underlay"');
    expect(markup).toContain('aria-hidden="true" inert=""');
    expect(markup).toContain("Select a portfolio mode");
    expect(markup).toContain('class="opening__skip"');
  });

  it("renders the editable v8 J layers with a fine native ring treatment", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('data-node-id="3580:2"');
    expect(markup).toContain('data-node-id="3581:2"');
    expect(markup).toContain('class="opening__radial-field"');
    expect(markup).toContain('class="opening__peripheral-lines"');
    expect(markup).toContain('class="opening__orbit-turn" aria-hidden="true"');
    expect(markup.match(/class="opening__orbit-tick(?: opening__orbit-tick--major)?"/g)).toHaveLength(180);
    expect(markup.match(/class="opening__peripheral-mark opening__peripheral-mark--/g)).toHaveLength(8);
    expect(markup).toContain('data-j-source="v8-3325:335"');
    expect(markup).toContain('data-node-id="3325:336"');
    expect(markup).toContain('data-node-id="3325:337"');
    expect(markup).toContain('data-node-id="3325:338"');
    expect(markup).toContain('data-node-id="3325:342"');
    expect(markup).toContain('data-node-id="3325:411"');
    expect(markup).toContain('data-node-id="3325:412"');
    expect(markup).toContain('src="/media/opening/j-sonnet-v8/j-extrusion-deep.svg"');
    expect(markup).toContain('src="/media/opening/j-sonnet-v8/j-extrusion-mid.svg"');
    expect(markup).toContain('src="/media/opening/j-sonnet-v8/j-face.svg"');
    expect(markup).toContain('src="/media/opening/j-sonnet-v8/j-detail.svg"');
    expect(markup).toContain('src="/media/opening/j-sonnet-v8/j-detail-mask.svg"');
    expect(markup).toContain('src="/media/opening/j-sonnet-v8/j-bevel.svg"');
    expect(markup).toContain('src="/media/opening/j-sonnet-v8/j-edge-light.svg"');
    expect(markup).toContain('class="opening__ring opening__ring--outer"');
    expect(markup).toContain('class="opening__ring opening__ring--inner"');
    expect(markup).toContain('class="opening__loading" aria-hidden="true"');
    expect(markup).toContain('class="opening__loading-label">LOADING</span>');
    expect(markup).toContain('class="opening__progress-line"');
    expect(markup).not.toContain('class="opening__ring-arc"');
    expect(markup).not.toContain('class="opening__tick opening__tick--');
    expect(markup).not.toContain('class="opening__environment"');
    expect(markup).not.toContain('open-portfolio-energy-lines.svg');
    expect(markup).not.toContain('class="opening__progress"');
    expect(readFileSync("src/Opening.tsx", "utf8")).toContain(
      '"/media/profile/open-portfolio-j-archive-source-700.png"',
    );
    expect(markup).not.toContain('data-node-id="159:2"');
    expect(markup).not.toContain("segmented-outer-bezel");
    expect(markup).toContain('aria-label="Skip to Home"');
  });

  it("selects the reduced-motion state before the opening is rendered", () => {
    const markup = renderOpeningRoute(true);

    expect(markup).toContain('class="opening-route opening-route--reduced"');
    expect(markup).toContain('class="opening opening--reduced"');
  });

  it("keeps the ring thin, enlarges the circular field, and scales the archive J for the center", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const outerRing = css.match(/\.opening__ring--outer\s*\{([^}]*)\}/)?.[1] ?? "";
    const ring = css.match(/\.opening__ring\s*\{([^}]*)\}/)?.[1] ?? "";
    const innerRing = css.match(/\.opening__ring--inner\s*\{([^}]*)\}/)?.[1] ?? "";
    const markRules = [...css.matchAll(/\.opening__archive-mark\s*\{([^}]*)\}/g)].map((match) => match[1]);
    const mark = markRules.find((rule) => /width:\s*20%/.test(rule)) ?? "";
    const mechanism = css.match(/\.opening__mechanism\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(outerRing).toMatch(/width:\s*74%/);
    expect(ring).toMatch(/border:\s*1px solid/);
    expect(innerRing).toMatch(/width:\s*67%/);
    expect(mechanism).toMatch(/width:\s*min\(64vw,\s*100svh\)/);
    expect(css).toMatch(/\.opening__orbit-tick::before\s*\{[^}]*height:\s*3px/s);
    expect(css).toMatch(/\.opening__orbit-tick--major::before\s*\{[^}]*height:\s*7px/s);
    expect(css).toMatch(/@keyframes opening-orbit-turn\s*\{[\s\S]*?rotate\(28deg\)/s);
    expect(css).not.toContain(".opening__peripheral-mark::after");
    expect(css).not.toContain("--mark-angle");
    expect(css).toMatch(/\.opening__peripheral-mark--northwest\s*\{\s*--mark-x:\s*16%;\s*--mark-y:\s*22%;\s*\}/);
    expect(mark).toMatch(/width:\s*20%/);
  });

  it("stages the v8 J from an early field into a layered settle and handoff over 3.5 seconds", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const markRules = [...css.matchAll(/\.opening__mark-motion\s*\{([^}]*)\}/g)].map((match) => match[1]);
    const markMotion = markRules.find((rule) => /animation:\s*opening-mark-sequence/.test(rule)) ?? "";
    const markSequence = css.match(/@keyframes opening-mark-sequence\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
    const fieldMotion = css.match(/\.opening__radial-field\s*\{([^}]*)\}/)?.[1] ?? "";
    const peripheralMotion = [...css.matchAll(/\.opening__peripheral-lines\s*\{([^}]*)\}/g)]
      .map((match) => match[1])
      .find((rule) => /animation:\s*opening-peripheral-drift/.test(rule)) ?? "";
    const fieldSequence = css.match(/@keyframes opening-radial-expansion\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

    expect(markMotion).toMatch(/animation:\s*opening-mark-sequence\s+3\.5s/);
    expect(markSequence).toMatch(/0%\s*\{\s*opacity:\s*\.52;\s*transform:\s*scale\(1\.04\)/);
    expect(markSequence).toMatch(/17%,\s*20%\s*\{\s*opacity:\s*\.16/);
    expect(markSequence).toMatch(/46%,\s*94%\s*\{\s*opacity:\s*1[\s\S]*?scale\(\.76\)/);
    expect(markSequence).not.toContain("clip-path");
    expect(css).toMatch(/\.opening__j-layer--deep\s*\{[^}]*animation-name:\s*opening-j-deep-assemble/s);
    expect(css).toMatch(/\.opening__j-layer--mid\s*\{[^}]*animation-name:\s*opening-j-mid-assemble/s);
    expect(css).toMatch(/\.opening__j-layer--face\s*\{[^}]*animation-name:\s*opening-j-face-assemble/s);
    expect(css).toMatch(/\.opening__j-detail\s*\{[^}]*animation:\s*opening-j-detail-assemble/s);
    expect(css).toMatch(/\.opening__j-layer--bevel\s*\{[^}]*animation-name:\s*opening-j-bevel-assemble/s);
    expect(css).toMatch(/\.opening__j-layer--edge\s*\{[^}]*animation-name:\s*opening-j-edge-assemble/s);
    expect(css).toMatch(/@keyframes opening-j-deep-assemble\s*\{[\s\S]*?36%,\s*94%\s*\{\s*opacity:\s*1/);
    expect(css).toMatch(/@keyframes opening-j-mid-assemble\s*\{[\s\S]*?42%,\s*94%\s*\{\s*opacity:\s*1/);
    expect(css).toMatch(/@keyframes opening-j-face-assemble\s*\{[\s\S]*?48%,\s*94%\s*\{\s*opacity:\s*1/);
    expect(css).toMatch(/@keyframes opening-j-detail-assemble\s*\{[\s\S]*?54%,\s*94%\s*\{\s*opacity:\s*1/);
    expect(css).toMatch(/@keyframes opening-j-bevel-assemble\s*\{[\s\S]*?60%,\s*94%\s*\{\s*opacity:\s*1/);
    expect(css).toMatch(/@keyframes opening-j-edge-assemble\s*\{[\s\S]*?65%,\s*94%\s*\{\s*opacity:\s*1/);
    for (const animation of [
      "opening-j-deep-assemble",
      "opening-j-mid-assemble",
      "opening-j-face-assemble",
      "opening-j-detail-assemble",
      "opening-j-bevel-assemble",
      "opening-j-edge-assemble",
    ]) {
      const sequence = css.match(new RegExp(`@keyframes ${animation}\\s*\\{([\\s\\S]*?)\\n\\}`))?.[1] ?? "";
      expect(sequence).not.toMatch(/transform:\s*(?!none)/);
    }
    expect(fieldMotion).toMatch(/animation:\s*opening-radial-expansion\s+3\.5s/);
    expect(peripheralMotion).toMatch(/animation:\s*opening-peripheral-drift\s+3\.5s/);
    expect(fieldSequence).toMatch(/0%\s*\{\s*opacity:\s*\.1;\s*transform:\s*scale\(\.78\)/);
    expect(fieldSequence).toMatch(/7%\s*\{\s*opacity:\s*\.2/);
    expect(fieldSequence).toMatch(/82%,\s*94%[\s\S]*?scale\(1\)/);
    expect(css).toMatch(/\.opening__ring--outer,\s*\.opening__ring--inner\s*\{[^}]*animation:\s*opening-ring-form\s+3\.5s/s);
    expect(css).toMatch(/\.opening__orbit-ticks\s*\{[^}]*animation:\s*opening-ticks-form\s+3\.5s/s);
    expect(css).toMatch(/\.opening__orbit-turn\s*\{[^}]*animation:\s*opening-orbit-turn\s+3\.5s/s);
    expect(css).not.toContain("opening-loader-copy-reveal");
    expect(css).toMatch(/\.opening__loading\s*\{[^}]*animation:\s*opening-loading-reveal\s+3\.5s/s);
    expect(css).toMatch(/\.opening__progress-fill\s*\{[^}]*animation:\s*opening-progress-fill\s+3\.5s/s);
    expect(css).toMatch(/@keyframes opening-loading-reveal\s*\{[\s\S]*?0%,\s*69%[\s\S]*?77%,\s*91%/);
    expect(css).toMatch(/@keyframes opening-progress-fill\s*\{[\s\S]*?scaleX\(1\)/);
    expect(css).toMatch(/opening-client-reveal\s+3\.5s/);
    expect(css).toMatch(/opening-treatment-out\s+3\.5s/);
  });

  it("keeps the peripheral field sparse, legible, and rotating through the settle", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const peripheralRule = [...css.matchAll(/\.opening__peripheral-lines\s*\{([^}]*)\}/g)]
      .map((match) => match[1])
      .find((rule) => rule.includes("repeating-conic-gradient")) ?? "";
    const peripheralSequence = css.match(/@keyframes opening-peripheral-drift\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

    expect(peripheralRule).toMatch(/repeating-conic-gradient\([\s\S]*?15deg/);
    expect(peripheralRule).toMatch(/rgb\(181 197 207 \/ 29%\)/);
    expect(peripheralSequence).toMatch(/68%\s*\{\s*opacity:\s*\.34;\s*transform:\s*rotate\(13deg\)/);
    expect(peripheralSequence).toMatch(/84%,\s*94%\s*\{\s*opacity:\s*\.28;\s*transform:\s*rotate\(23deg\)/);
  });

  it("keeps the phase choreography static for reduced-motion visitors", () => {
    const css = readFileSync("src/opening.css", "utf8");

    expect(css).toMatch(
      /\.opening--reduced \.opening__archive-mark\s*\{[^}]*animation:\s*none/s,
    );
    expect(css).toMatch(/\.opening--reduced \.opening__radial-field,[\s\S]*?opacity:\s*0/s);
    expect(css).toMatch(/\.opening--reduced \.opening__peripheral-lines(?:,|\s*\{)/);
    expect(css).toMatch(/\.opening--reduced \.opening__peripheral-mark\s*\{/);
    expect(css).toMatch(/\.opening--reduced \.opening__ring--outer[\s\S]*?opacity:\s*1/s);
    expect(css).toMatch(/\.opening--reduced \.opening__orbit-ticks[\s\S]*?opacity:\s*1/s);
    expect(css).toMatch(/\.opening--reduced \.opening__loading\s*\{[^}]*opacity:\s*0;[^}]*animation:\s*none/s);
  });

  it("preserves the authored v8 layer insets and masked detail geometry", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const detailRule = css.match(/\.opening__j-detail\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(css).toMatch(/\.opening__j-layer--deep\s*\{[^}]*inset:\s*10\.68% 25\.64% 12\.99% 25\.61%/s);
    expect(css).toMatch(/\.opening__j-layer--mid\s*\{[^}]*inset:\s*9\.94% 26\.07% 13\.73% 25\.19%/s);
    expect(css).toMatch(/\.opening__j-layer--face\s*\{[^}]*inset:\s*9\.19% 26\.5% 14\.48% 24\.76%/s);
    expect(css).toMatch(/\.opening__j-layer--bevel\s*\{[^}]*inset:\s*9\.19% 26\.5% 14\.48% 24\.76%/s);
    expect(css).toMatch(/\.opening__j-layer--edge\s*\{[^}]*inset:\s*9\.19% 26\.5% 14\.48% 24\.76%/s);
    expect(detailRule).toMatch(/mask-image:\s*url\("\/media\/opening\/j-sonnet-v8\/j-detail-mask\.svg"\)/);
    expect(css).toMatch(/\.opening__j-detail-art\s*\{[^}]*inset:\s*-0\.42% -1\.41% -2\.79% -1%/s);
    expect(css).toMatch(/\.opening__j-edge-light-art\s*\{[^}]*inset:\s*-0\.19% -0\.71% -0\.18% -0\.29%/s);
    expect(css).toMatch(/\.opening__j-edge-light-art\s*>\s*img\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%/s);
  });

  it("centers the archive mark if the editable v8 source falls back", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const fallbackRule = css.match(/\.opening__archive-mark\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(fallbackRule).toMatch(/position:\s*absolute/);
    expect(fallbackRule).toMatch(/left:\s*50%/);
    expect(fallbackRule).toMatch(/top:\s*50%/);
    expect(fallbackRule).toMatch(/transform:\s*translate\(-50%,\s*-50%\)/);
  });

  it("does not keep the inactive segmented construction styles", () => {
    const css = readFileSync("src/opening.css", "utf8");

    expect(css).not.toMatch(/\.opening__(?:environment|layer|asset-frame|bezel|ticks-content|segmented-bezel|cyan|jewels|glint|j-body|motion--)/);
    expect(css).not.toMatch(/opening-segmented-|opening-ticks-(?:content|construction)|opening-cyan|opening-construction|opening-glint-/);
  });
});
