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
    expect(markup).toContain('src="/media/profile/j-candidate-06-m54.svg"');
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/button-accept-default.png"');
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/button-accept-hover.png"');
    expect(markup).not.toContain("A concise view of experience");
  });

  it("separates the scenic ring field from a smaller J medallion and animates entry", () => {
    const markup = renderRoute("/resume");
    const css = readFileSync("src/resume.css", "utf8");

    expect(markup).toContain('class="resume-mechanism__scene"');
    expect(markup).toContain('class="resume-found__title">Resume Found</h1>');
    expect(markup.indexOf('class="resume-found__title"')).toBeGreaterThan(markup.indexOf('class="resume-mechanism"'));
    expect(markup.search(/class="[^"]*resume-found__action"/)).toBeGreaterThan(markup.indexOf('class="resume-found__title"'));
    expect(markup).toContain('src="/media/opening/gameflow-background.jpg"');
    expect(markup).toContain('class="resume-mechanism__j-medallion"');
    expect(css).toMatch(
      /\.resume-mechanism__scene\s*\{[^}]*aspect-ratio:\s*1\s*\/\s*1;[^}]*border-radius:\s*50%/s,
    );
    const exteriorGlow = css.match(/\.resume-found__system::before\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(exteriorGlow).not.toContain("gameflow-background.jpg");
    expect(css).toMatch(
      /\.resume-mechanism__j-medallion\s*\{[^}]*width:\s*46%;[^}]*height:\s*46%/s,
    );
    expect(css).toMatch(/animation:\s*resume-found-entry\s+/);
    expect(css).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.resume-mechanism__scene[\s\S]*animation:\s*none/s,
    );
  });

  it("plays one restrained orb-energy sweep and disables it for reduced motion", () => {
    const markup = renderRoute("/resume");
    const css = readFileSync("src/resume.css", "utf8");
    const energyRule = css.match(/\.resume-mechanism__orb-energy\s*\{([^}]*)\}/)?.[1] ?? "";
    const reducedMotion = css.match(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.resume-mechanism__orb-energy\s*\{[^}]*\}/,
    )?.[0] ?? "";

    expect(markup).toContain('class="resume-mechanism__orb-energy" aria-hidden="true"');
    expect(markup.indexOf('class="resume-mechanism__frame"')).toBeLessThan(
      markup.indexOf('class="resume-mechanism__orb-energy"'),
    );
    expect(energyRule).toMatch(/animation:\s*resume-orb-energy-sweep\s+5000ms\s+cubic-bezier\(\.25,\s*\.1,\s*\.25,\s*1\)\s+1\s+both/);
    expect(energyRule).toMatch(/z-index:\s*3/);
    expect(energyRule).toMatch(/top:\s*50%;[^}]*left:\s*50%;[^}]*width:\s*46%;[^}]*height:\s*46%/s);
    expect(energyRule).toMatch(/translate:\s*-50%\s+-50%/);
    expect(energyRule).toMatch(/conic-gradient\(\s*from 0deg/);
    expect(energyRule).toMatch(/mask:\s*radial-gradient\(circle closest-side,\s*transparent 76%,\s*#000 80%,\s*#000 88%,\s*transparent 94%\)/);
    expect(energyRule).toMatch(/mix-blend-mode:\s*screen/);
    expect(energyRule).toMatch(/pointer-events:\s*none/);
    expect(css).toMatch(/@keyframes\s+resume-orb-energy-sweep[\s\S]*?100%\s*\{[^}]*opacity:\s*0;[^}]*transform:\s*rotate\(240deg\)/);
    expect(reducedMotion).toMatch(/\.resume-mechanism__orb-energy\s*\{[^}]*animation:\s*none/s);
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

    expect(takeoverFound).toMatch(/justify-content:\s*flex-start/);
    expect(takeoverFound).toMatch(/padding-top:\s*max\(24px,\s*18\.9vh\)/);
    expect(takeoverFound).toMatch(/padding-right:\s*calc\(24px \+ clamp\(220px, 16\.67vw, 320px\)\)/);
    expect(css).toMatch(/@media\s*\(max-width:\s*900px\)[\s\S]*?\.resume-takeover \.resume-found\s*\{[^}]*padding-right:\s*24px/s);
    expect(css).toMatch(/@media\s*\(max-width:\s*650px\)[\s\S]*?\.resume-takeover \.resume-found\s*\{[^}]*padding-right:\s*16px/s);
  });

  it("fits the Resume Found title, accept plate, and Close into one lower-ring composition", () => {
    const markup = renderRoute("/resume");
    const css = readFileSync("src/resume.css", "utf8");
    const compositionRule = css.match(/\.resume-found__composition\s*\{([^}]*)\}/)?.[1] ?? "";
    const titleRule = css.match(/\.resume-found__title\s*\{([^}]*)\}/)?.[1] ?? "";
    const actionRule = css.match(/\.resume-found__action\s*\{([^}]*)\}/)?.[1] ?? "";
    const closeRule = css.match(/\.resume-found__close\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(markup).toMatch(/class="resume-found__composition"[\s\S]*class="resume-found__system"[\s\S]*class="resume-found__title"[\s\S]*resume-found__action[\s\S]*class="resume-found__close"/);
    expect(compositionRule).toMatch(/position:\s*relative/);
    expect(compositionRule).toMatch(/width:\s*min\(530px,\s*49vh,\s*calc\(100vw - 32px\)\)/);
    expect(titleRule).toMatch(/top:\s*84%/);
    expect(titleRule).toMatch(/height:\s*clamp\(18px,\s*4\.53cqw,\s*24px\)/);
    expect(titleRule).toMatch(/font-size:\s*clamp\(13px,\s*2\.83cqw,\s*15px\)/);
    expect(titleRule).toMatch(/line-height:\s*clamp\(18px,\s*3\.77cqw,\s*20px\)/);
    expect(titleRule).toMatch(/color:\s*#f0e6d2/i);
    expect(actionRule).toMatch(/top:\s*89%/);
    expect(actionRule).toMatch(/width:\s*min\(190px,\s*36cqw\)/);
    expect(actionRule).toMatch(/aspect-ratio:\s*212\s*\/\s*70/);
    expect(closeRule).toMatch(/top:\s*109\.2%/);
    expect(closeRule).toMatch(/width:\s*112px/);
    expect(closeRule).toMatch(/height:\s*38px/);
    expect(closeRule).toMatch(/font-size:\s*11px/);
  });

  it("keeps the Resume Found mechanism and actions in a compact vertical order", () => {
    const markup = renderRoute("/resume");
    const css = readFileSync("src/resume.css", "utf8");
    const stackRule = css.match(/(?:^|\n)\.resume-found\s*\{([^}]*)\}/)?.[1] ?? "";

    const order = [
      markup.indexOf("resume-found__system"),
      markup.indexOf("resume-found__title"),
      markup.indexOf("resume-found__action"),
      markup.indexOf("resume-found__close"),
    ];

    expect(order.every((index) => index >= 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(stackRule).toMatch(/display:\s*flex/);
    expect(stackRule).toMatch(/flex-direction:\s*column/);
    expect(stackRule).toMatch(/align-items:\s*center/);
    expect(markup).toContain('class="resume-found__composition"');
  });

  it("positions the fitted title, primary plate, and Close in their authored ring slots", () => {
    const css = readFileSync("src/resume.css", "utf8");
    const titleRule = css.match(/\.resume-found__title\s*\{([^}]*)\}/)?.[1] ?? "";
    const actionRule = css.match(/\.resume-found__action\s*\{([^}]*)\}/)?.[1] ?? "";
    const closeRule = css.match(/\.resume-found__close\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(titleRule).toMatch(/top:\s*84%/);
    expect(actionRule).toMatch(/top:\s*89%/);
    expect(actionRule).toMatch(/width:\s*min\(190px,\s*36cqw\)/);
    expect(closeRule).toMatch(/top:\s*109\.2%/);
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
