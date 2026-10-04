// @vitest-environment happy-dom

import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { projects } from "./data";
import ProfileOverview from "./ProfileOverview";
import { projectCasePaths } from "./project-route-paths";

function renderProfile() {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/profile"]}>
      <ProfileOverview projects={projects} projectCasePaths={projectCasePaths} />
    </MemoryRouter>,
  );
}

describe("Profile Overview", () => {
  it("opens each project from its identity and keeps verified source links icon-sized", () => {
    const markup = renderProfile();

    expect(markup).toContain('href="/projects/food-tracker"');
    expect(markup).toContain('href="/projects/choveigo"');
    expect(markup).toContain('href="/projects/crest"');
    expect(markup).toContain('href="/projects/fraymakers"');
    expect(markup).toContain('href="https://github.com/joshuaAryy/food-tracker"');
    expect(markup).toContain('aria-label="Open Food Tracker source repository"');
    expect(markup).toContain('aria-label="Joshua Aryeetey profile"');
    expect(markup).toContain('alt="Joshua Aryeetey"');
    expect(markup).toContain("/media/profile/food-tracker-mark.svg");
    expect(markup).toContain("/media/profile/profile-crest-emblem.png");
    expect(markup).not.toContain("CASE STUDY");
    expect(markup).not.toContain("VIEW SOURCE");
  });

  it("uses the approved profile portrait and Figma signal emblems", () => {
    const markup = renderProfile();

    expect(markup).toContain("/media/profile/owner-portrait.png");
    expect(markup).toContain("/media/profile/portrait-medallion.png");
    expect(markup).toContain("/media/profile/project-signal.svg");
    expect(markup).toContain("/media/profile/experience-signal.svg");
    expect(markup).toContain("/media/profile/hackathon-signal.svg");
    expect(markup).toContain("/media/profile/academics-signal.svg");
  });

  it("keeps the four lower Figma signals as static summaries with Projects selected", () => {
    const markup = renderProfile();

    expect(markup).toContain('role="group" aria-label="Profile summary details"');
    expect(markup.match(/class="profile-signal(?:\s[^"]*)?"/g)).toHaveLength(4);
    expect(markup).toContain('<h2 id="profile-panel-heading">PROJECTS</h2>');
    expect(markup).toContain('<span class="profile-signal__label">PROJECTS</span>');
    expect(markup).toContain('<span class="profile-signal__value">2028</span>');
    expect(markup).not.toContain("profile-tab-");
    expect(markup).not.toContain('role="tablist"');
    expect(markup).not.toContain('role="tabpanel"');
  });

  it("keeps the smoky Profile field and circular Experience badges from the current Figma treatment", () => {
    const shellCss = readFileSync("src/styles.css", "utf8");
    const profileCss = readFileSync("src/profile-overview.css", "utf8");
    const shellRule = shellCss.match(/\.main--profile\s*\{([^}]*)\}/)?.[1] ?? "";
    const badgeRule = profileCss.match(/\.profile-experience__mark\s*\{([^}]*)\}/)?.[1] ?? "";

    expect.soft(shellRule).toContain('url("/media/profile/the-void-background.jpg")');
    expect.soft(badgeRule).toMatch(/border-radius:\s*50%/);
  });
});
