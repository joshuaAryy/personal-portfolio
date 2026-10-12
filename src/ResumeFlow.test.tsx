import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

const approvedResumeUrl = "/resume/Joshua_Aryeetey_General_Resume_v13.pdf";
const approvedResumeFilename = "Joshua_Aryeetey_General_Resume_v13.pdf";

function renderRoute(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("approved resume flow", () => {
  it("keeps the Resume Help focus ring inside the nav through tablet widths", () => {
    const css = readFileSync("src/resume.css", "utf8");
    const tabletRules = css.slice(
      css.lastIndexOf("@media (max-width: 900px)"),
      css.lastIndexOf("@media (max-width: 650px)"),
    );

    expect(tabletRules).toMatch(
      /\.client--resume-shell \.top-nav \.header-help:focus-visible\s*\{[^}]*outline-offset:\s*-3px/s,
    );
  });

  it("keeps Resume Found scenery in its circular field instead of a large exterior glow", () => {
    const css = readFileSync("src/resume.css", "utf8");
    const glowRule = css.match(/\.resume-found__system::before\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(glowRule).toMatch(/width:\s*100%/);
    expect(glowRule).not.toContain("gameflow-background.jpg");
    expect(css).not.toMatch(
      /\.resume-found__system::before\s*\{[^}]*width:\s*min\(218\.87%,\s*calc\(100vw - 32px\)\)/s,
    );
  });

  it("links Resume Found to the viewer", () => {
    const markup = renderRoute("/resume");

    expect(markup).toContain("Resume Found");
    expect(markup).toContain('href="/resume/viewer"');
    expect(markup).toContain('class="resume-mechanism"');
    expect(markup).not.toContain("PORTFOLIO UTILITY");
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/ready-check-main-frame.png"');
    expect(markup).toContain('class="resume-mechanism__j"');
    expect(markup).toContain('data-node-id="3735:516"');
    expect(markup).toContain('src="/media/identity/sonnet-v8/figma/canonical-j.png"');
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/button-accept-default.png"');
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/button-accept-hover.png"');
    expect(markup).not.toContain("A concise view of experience");
  });

  it("uses the canonical standalone J directly in the scenic field and animates entry", () => {
    const markup = renderRoute("/resume");
    const css = readFileSync("src/resume.css", "utf8");
    const sceneRule = css.match(/\.resume-mechanism__scene\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(markup).toContain('class="resume-mechanism__scene"');
    expect(markup).toContain('class="resume-found__title">Resume Found</h1>');
    expect(markup.indexOf('class="resume-found__title"')).toBeGreaterThan(markup.indexOf('class="resume-mechanism"'));
    expect(markup.search(/class="[^"]*resume-found__action"/)).toBeGreaterThan(markup.indexOf('class="resume-found__title"'));
    expect(markup).toContain('src="/media/opening/gameflow-background.jpg"');
    expect(markup).not.toContain('class="resume-mechanism__j-medallion"');
    expect(css).toMatch(
      /\.resume-mechanism__scene\s*\{[^}]*aspect-ratio:\s*1\s*\/\s*1;[^}]*border-radius:\s*50%/s,
    );
    expect(sceneRule).not.toMatch(/border:\s*1px\s+solid/);
    const exteriorGlow = css.match(/\.resume-found__system::before\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(exteriorGlow).not.toContain("gameflow-background.jpg");
    expect(css).toMatch(/\.resume-mechanism__j\s*\{[^}]*width:\s*min\(54%,\s*300px\)/s);
    expect(css).toMatch(/animation:\s*resume-found-entry\s+/);
    expect(css).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.resume-mechanism__scene[\s\S]*animation:\s*none/s,
    );
  });

  it("fills only the bounded middle annular channel and leaves it illuminated", () => {
    const markup = renderRoute("/resume");
    const css = readFileSync("src/resume.css", "utf8");
    const energyRule = css.match(/\.resume-mechanism__orb-energy\s*\{([^}]*)\}/)?.[1] ?? "";
    const reducedMotion = css.match(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.resume-mechanism__orb-energy\s*\{[^}]*\}/,
    )?.[0] ?? "";
    const trackRule = css.match(/\.resume-mechanism__orb-track\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(markup).toContain('class="resume-mechanism__orb-energy" aria-hidden="true"');
    expect(markup).toContain('class="resume-mechanism__orb-track" aria-hidden="true"');
    expect(markup.indexOf('class="resume-mechanism__orb-track"')).toBeLessThan(
      markup.indexOf('class="resume-mechanism__orb-energy"'),
    );
    expect(markup.indexOf('class="resume-mechanism__frame"')).toBeLessThan(
      markup.indexOf('class="resume-mechanism__orb-energy"'),
    );
    expect(energyRule).toMatch(/animation:\s*resume-orb-energy-fill\s+1150ms\s+linear\s+260ms\s+1\s+both/);
    expect(energyRule).toMatch(/z-index:\s*1/);
    // Figma node 2407:343 is a 464px cyan measuring circuit inside the 530px mechanism.
    // Node 2407:344 defines the 424px inner gold race, so fill only that bounded annular channel.
    expect(energyRule).toMatch(/top:\s*50%;[^}]*left:\s*50%;[^}]*width:\s*87\.55%;[^}]*height:\s*87\.55%/s);
    expect(energyRule).toMatch(/translate:\s*-50%\s+-50%/);
    expect(energyRule).toMatch(/background:[\s\S]*?conic-gradient\([\s\S]*?from\s+207deg/s);
    expect(energyRule).toMatch(/opacity:\s*0/);
    expect(energyRule).toMatch(/--resume-orb-fill:\s*0deg/);
    expect(energyRule).toMatch(/calc\(var\(--resume-orb-fill\)\s*-\s*8deg\)/);
    expect(energyRule).toMatch(/#bafffb\s+calc\(var\(--resume-orb-fill\)\s*-\s*2deg\)\s+var\(--resume-orb-fill\)/i);
    expect(css).toMatch(/@property\s+--resume-orb-fill\s*\{[^}]*syntax:\s*"<angle>";[^}]*inherits:\s*false;[^}]*initial-value:\s*0deg/s);
    // Keep a ~12px opaque core and ~21px feathered band at the 530px Figma scale.
    expect(energyRule).toMatch(/rgba\(28,\s*184,\s*214,\s*\.62\) 0deg/);
    expect(energyRule).not.toMatch(/rgba\(28,\s*184,\s*214,\s*\.18\) var\(--resume-orb-fill\) var\(--resume-orb-max-fill\)/);
    expect(energyRule).not.toContain("repeating-linear-gradient");
    expect(energyRule).toMatch(/radial-gradient\(\s*ellipse 35% 18% at 27% 25%/);
    expect(energyRule).toMatch(/rgb\(229 255 255 \/ 52%\)/);
    expect(energyRule).toMatch(/linear-gradient\(\s*108deg/);
    expect(energyRule).toMatch(/mask-image:[\s\S]*?conic-gradient\(from 207deg,\s*#000 0deg var\(--resume-orb-fill\),\s*transparent var\(--resume-orb-fill\) 360deg\)/);
    expect(energyRule).toMatch(/background:[\s\S]*?conic-gradient\([\s\S]*?transparent var\(--resume-orb-fill\) 360deg/s);
    expect(energyRule).toMatch(/mask-image:[\s\S]*?conic-gradient\(from 0deg,\s*#000 0deg 153deg,\s*transparent 153deg 207deg,\s*#000 207deg 360deg\),\s*conic-gradient\(from 207deg,\s*#000 0deg var\(--resume-orb-fill\),\s*transparent var\(--resume-orb-fill\) 360deg\)/);
    expect(trackRule).toMatch(/background:\s*rgb\(2 18 28 \/ 42%\)/);
    expect(trackRule).toMatch(/mask-image:[\s\S]*?87\.8%[^}]*94\.6%[^}]*153deg[^}]*207deg/s);
    expect(energyRule).toMatch(/mask-image:\s*radial-gradient\(circle closest-side,\s*transparent 87\.8%,\s*#000 88\.4%,\s*#000 94%,\s*transparent 94\.6%\),\s*conic-gradient\(from 0deg,\s*#000 0deg 153deg,\s*transparent 153deg 207deg,\s*#000 207deg 360deg\)/);
    expect(energyRule).toMatch(/mask-composite:\s*intersect/);
    expect(energyRule).toMatch(/--resume-orb-max-fill:\s*306deg/);
    expect(energyRule).toMatch(/filter:\s*none/);
    expect(energyRule).not.toContain("blur(");
    expect(energyRule).toMatch(/pointer-events:\s*none/);
    expect(css).toMatch(/@keyframes\s+resume-orb-energy-fill\s*\{[^}]*0%\s*\{[^}]*--resume-orb-fill:\s*0deg;[^}]*opacity:\s*0/s);
    expect(css).toMatch(/@keyframes\s+resume-orb-energy-fill[\s\S]*?100%\s*\{[^}]*--resume-orb-fill:\s*306deg;[^}]*opacity:\s*\.86/s);
    expect(css.match(/@keyframes\s+resume-orb-energy-fill\s*\{([\s\S]*?)\n\}/)?.[1] ?? "").not.toContain("background:");
    expect(reducedMotion).toMatch(/\.resume-mechanism__orb-energy\s*\{[^}]*--resume-orb-fill:\s*306deg;[^}]*opacity:\s*\.86;[^}]*animation:\s*none/s);
  });

  it("assembles only the contextual takeover with a short reduced-motion-safe entrance", () => {
    const css = readFileSync("src/resume.css", "utf8");
    const takeoverRule = css.match(/(?:^|\n)\.resume-takeover\s*\{([^}]*)\}/)?.[1] ?? "";
    const dialogRule = css.match(/(?:^|\n)\.resume-takeover__dialog\s*\{([^}]*)\}/)?.[1] ?? "";
    const takeoverMotion = css.match(/@keyframes\s+resume-takeover-enter\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(takeoverRule).toMatch(/animation:\s*resume-takeover-backdrop-enter\s+260ms/);
    expect(dialogRule).toMatch(/animation:\s*resume-takeover-enter\s+360ms/);
    expect(css).toMatch(/@keyframes\s+resume-takeover-backdrop-enter\s*\{[^}]*opacity:\s*0/s);
    expect(takeoverMotion).toMatch(/translateY\(6px\)/);
    expect(takeoverMotion).toMatch(/scale\(\.99\)/);
    expect(css).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.resume-takeover,\s*\.resume-takeover__dialog\s*\{[^}]*animation:\s*none/s,
    );
  });

  it("centers the takeover within the shell content and restores a full-width center on narrow screens", () => {
    const css = readFileSync("src/resume.css", "utf8");
    const takeoverFound = css.match(/\.resume-takeover \.resume-found\s*\{([^}]*)\}/)?.[1] ?? "";
    const narrowFound = css.match(/@media\s*\(max-width:\s*650px\)[\s\S]*?\.resume-found\s*\{([^}]*)\}/)?.[1] ?? "";
    const narrowTakeover = css.match(/@media\s*\(max-width:\s*650px\)[\s\S]*?\.resume-takeover \.resume-found\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(takeoverFound).toMatch(/justify-content:\s*flex-start/);
    expect(takeoverFound).toMatch(/padding-top:\s*max\(24px,\s*min\(18\.9vh,\s*calc\(100vh - var\(--resume-found-composition-size\) - 100px\)\)\)/);
    expect(takeoverFound).toMatch(/padding-right:\s*calc\(24px \+ clamp\(220px, 16\.67vw, 320px\)\)/);
    expect(css).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*?\.resume-takeover \.resume-found\s*\{[^}]*padding-right:\s*24px/s);
    expect(narrowFound).toMatch(/justify-content:\s*center/);
    expect(narrowFound).toMatch(/padding-block:\s*0/);
    expect(narrowTakeover).toMatch(/padding:\s*0 16px/);
    expect(narrowTakeover).toMatch(/justify-content:\s*center/);
  });

  it("scales the mechanism and fits the controls into their concentric slots", () => {
    const markup = renderRoute("/resume");
    const css = readFileSync("src/resume.css", "utf8");
    const compositionRule = css.match(/\.resume-found__composition\s*\{([^}]*)\}/)?.[1] ?? "";
    const titleRule = css.match(/\.resume-found__title\s*\{([^}]*)\}/)?.[1] ?? "";
    const actionRule = css.match(/\.resume-found__action\s*\{([^}]*)\}/)?.[1] ?? "";
    const closeRule = css.match(/\.resume-found__close\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(markup).toMatch(/class="resume-found__composition"[\s\S]*class="resume-found__system"[\s\S]*class="resume-found__title"[\s\S]*resume-found__action[\s\S]*class="resume-found__close"/);
    expect(compositionRule).toMatch(/position:\s*relative/);
    expect(compositionRule).toMatch(/width:\s*var\(--resume-found-composition-size\)/);
    expect(css).toMatch(/--resume-found-composition-size:\s*min\(640px,\s*max\(0px,\s*calc\(100vw - 32px\)\),\s*max\(0px,\s*calc\(100vh - 123px\)\)\)/);
    expect(titleRule).toMatch(/top:\s*73%/);
    expect(titleRule).toMatch(/width:\s*min\(320px,\s*56\.6cqw\)/);
    expect(titleRule).toMatch(/height:\s*min\(40px,\s*6\.2cqw\)/);
    expect(titleRule).toMatch(/font-size:\s*clamp\(18px,\s*3\.6cqw,\s*23px\)/);
    expect(titleRule).toMatch(/line-height:\s*min\(30px,\s*5\.2cqw\)/);
    expect(titleRule).toMatch(/color:\s*#f0e6d2/i);
    expect(actionRule).toMatch(/top:\s*84\.5%/);
    expect(actionRule).toMatch(/width:\s*min\(245px,\s*43\.4cqw\)/);
    expect(actionRule).toMatch(/aspect-ratio:\s*212\s*\/\s*70/);
    expect(closeRule).toMatch(/top:\s*97\.8%/);
    expect(closeRule).toMatch(/width:\s*min\(112px,\s*max\(92px,\s*17\.5cqw\)\)/);
    expect(closeRule).toMatch(/height:\s*clamp\(22px,\s*4\.2cqw,\s*30px\)/);
    expect(closeRule).toMatch(/font-size:\s*clamp\(12px,\s*2\.4cqw,\s*16px\)/);
  });

  it("keeps the complete mechanism visible on short desktop viewports", () => {
    const css = readFileSync("src/resume.css", "utf8");
    const shortDesktop = css.match(
      /@media\s*\(max-height:\s*760px\)\s*and\s*\(min-width:\s*651px\)\s*\{([\s\S]*?)\n\}/,
    )?.[1] ?? "";

    expect(shortDesktop).toMatch(
      /\.resume-found\s*\{[^}]*--resume-found-composition-size:\s*min\(600px,[^}]*calc\(100vh - var\(--client-header-height\) - 64px\)/s,
    );
    expect(shortDesktop).toMatch(/\.resume-found\s*\{[^}]*padding-top:\s*24px/s);
  });

  it("keeps all Resume Found layers inside one concentric mechanism composition", () => {
    const markup = renderRoute("/resume");
    const css = readFileSync("src/resume.css", "utf8");
    const composition = markup.match(/<div class="resume-found__composition">([\s\S]*?)<\/section>/)?.[1] ?? "";
    for (const layer of ["resume-found__system", "resume-found__title", "resume-found__action", "resume-found__close"]) {
      expect(composition, `${layer} belongs to the composition`).toContain(layer);
    }
    for (const selector of [".resume-found__composition", ".resume-found__title", ".resume-found__action", ".resume-found__close"]) {
      const rule = css.match(new RegExp(`${selector.replaceAll(".", "\\.")}\\s*\\{([^}]*)\\}`))?.[1] ?? "";
      expect(rule, `${selector} geometry`).toMatch(/position:\s*(?:relative|absolute)/);
    }
  });

  it("positions the fitted title, primary plate, and Close in their authored ring slots", () => {
    const css = readFileSync("src/resume.css", "utf8");
    const titleRule = css.match(/\.resume-found__title\s*\{([^}]*)\}/)?.[1] ?? "";
    const actionRule = css.match(/\.resume-found__action\s*\{([^}]*)\}/)?.[1] ?? "";
    const closeRule = css.match(/\.resume-found__close\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(titleRule).toMatch(/top:\s*73%/);
    expect(actionRule).toMatch(/top:\s*84\.5%/);
    expect(actionRule).toMatch(/width:\s*min\(245px,\s*43\.4cqw\)/);
    expect(closeRule).toMatch(/top:\s*97\.8%/);
    expect(closeRule).toMatch(/width:\s*min\(112px,\s*max\(92px,\s*17\.5cqw\)\)/);
  });

  it("centers Resume Found controls independently of the route-entry transform", () => {
    const css = readFileSync("src/resume.css", "utf8");
    const titleRule = css.match(/\.resume-found__title\s*\{([^}]*)\}/)?.[1] ?? "";
    const actionRule = css.match(/\.resume-found__action\s*\{([^}]*)\}/)?.[1] ?? "";
    const closeRule = css.match(/\.resume-found__close\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(titleRule).toMatch(/translate:\s*-50%\s+0/);
    expect(actionRule).toMatch(/translate:\s*-50%\s+0/);
    expect(closeRule).toMatch(/translate:\s*-50%\s+0/);
  });

  it("uses only the approved v13 PDF for display, download, and fullscreen", () => {
    const markup = renderRoute("/resume/viewer");

    expect(markup).not.toContain("APPROVED GENERAL RESUME");
    expect(markup).not.toContain("VERSION 13");
    expect(markup).toContain(`download="${approvedResumeFilename}"`);
    expect(markup.match(new RegExp(`href="${approvedResumeUrl}"`, "g"))).toHaveLength(2);
    expect(markup).toContain(`src="${approvedResumeUrl}"`);
    expect(markup.match(/Joshua_Aryeetey_General_Resume_v\d+\.pdf/g)).toEqual([
      approvedResumeFilename,
      approvedResumeFilename,
      approvedResumeFilename,
      approvedResumeFilename,
    ]);
  });
});
