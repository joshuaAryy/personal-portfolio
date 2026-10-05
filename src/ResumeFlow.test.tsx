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
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/ready-check-main-frame.png"');
    expect(markup).toContain('class="resume-mechanism__j"');
    expect(markup).toContain('src="/media/profile/open-portfolio-j-archive-source-700.png"');
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/button-accept-default.png"');
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/button-accept-hover.png"');
    expect(markup).not.toContain("A concise view of experience");
  });

  it("separates the scenic ring field from a smaller J medallion and animates entry", () => {
    const markup = renderRoute("/resume");
    const css = readFileSync("src/resume.css", "utf8");

    expect(markup).toContain('class="resume-mechanism__scene"');
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

  it("uses only the approved v13 PDF for display, download, and fullscreen", () => {
    const markup = renderRoute("/resume/viewer");

    expect(markup).toContain("APPROVED GENERAL RESUME");
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
