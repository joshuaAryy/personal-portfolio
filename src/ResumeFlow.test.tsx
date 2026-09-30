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
  it("links Resume Found to the viewer", () => {
    const markup = renderRoute("/resume");

    expect(markup).toContain("Resume Found");
    expect(markup).toContain('href="/resume/viewer"');
    expect(markup).toContain('class="resume-mechanism"');
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/ready-check-main-frame.png"');
    expect(markup).toContain('class="resume-mechanism__j"');
    expect(markup).toContain('src="/media/profile/open-portfolio-j-archive-source.jpg"');
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/button-accept-default.png"');
    expect(markup).toContain('src="/media/resume/communitydragon/9.22-ready-check/button-accept-hover.png"');
    expect(markup).not.toContain("A concise view of experience");
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
