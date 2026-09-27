// @vitest-environment happy-dom

import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
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

  it("uses the four lower Figma signals as section tabs for the connected detail panel", () => {
    const markup = renderProfile();

    expect(markup).toContain('role="tablist" aria-label="Profile overview sections"');
    expect(markup.match(/role="tab"/g)).toHaveLength(4);
    expect(markup).toContain('aria-controls="profile-section-panel"');
    expect(markup).toContain('role="tabpanel"');
    expect(markup).toContain('aria-selected="true"');
    expect(markup).toContain('aria-selected="false"');
  });

  it("switches the connected panel when a lower signal is selected", async () => {
    const host = document.createElement("div");
    document.body.append(host);
    const root = createRoot(host);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/profile"]}>
          <ProfileOverview projects={projects} projectCasePaths={projectCasePaths} />
        </MemoryRouter>,
      );
    });

    await act(async () => {
      host.querySelector<HTMLButtonElement>("#profile-tab-experience")?.click();
    });
    expect(host.querySelector("#profile-panel-heading")?.textContent).toBe("EXPERIENCE");
    expect(host.querySelectorAll(".profile-experience")).toHaveLength(2);
    expect(host.querySelector<HTMLButtonElement>("#profile-tab-experience")?.getAttribute("aria-selected")).toBe("true");

    await act(async () => {
      host.querySelector<HTMLButtonElement>("#profile-tab-hackathon")?.click();
    });
    expect(host.querySelector(".profile-hackathon-feature__placement")?.textContent).toBe("3RD PLACE");

    await act(async () => {
      host.querySelector<HTMLButtonElement>("#profile-tab-academics")?.click();
    });
    expect(host.querySelector(".profile-academics-feature__program")?.textContent).toBe("COMPUTER ENGINEERING");

    await act(async () => root.unmount());
    host.remove();
  });
});
