// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { projects } from "./data";
import ProfileOverview from "./ProfileOverview";
import { projectCasePaths } from "./project-route-paths";

let host: HTMLDivElement;
let root: Root;

function renderProfile() {
  act(() => {
    root.render(
      <MemoryRouter initialEntries={["/profile"]}>
        <ProfileOverview projects={projects} projectCasePaths={projectCasePaths} />
      </MemoryRouter>,
    );
  });
}

function heading() {
  return host.querySelector("#profile-panel-heading");
}

beforeEach(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

describe("Profile signal previews", () => {
  it("shows details only while a signal is hovered and clears to a neutral panel", () => {
    renderProfile();
    const projectsSignal = host.querySelector<HTMLElement>(".profile-signal");
    const overview = host.querySelector<HTMLElement>(".profile-overview");

    expect(heading()).toBeNull();
    expect(host.querySelector(".profile-project-grid")).toBeNull();
    expect(projectsSignal?.getAttribute("aria-label")).toContain("4");
    expect(projectsSignal?.getAttribute("href")).toBeNull();

    act(() => projectsSignal?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })));
    expect(heading()?.textContent).toBe("PROJECTS");
    expect(host.querySelectorAll(".profile-project")).toHaveLength(4);
    expect(host.querySelector('a[href="/projects/food-tracker"]')).not.toBeNull();
    expect(host.querySelector('a[href="https://github.com/joshuaAryy/food-tracker"]')).not.toBeNull();

    act(() => overview?.dispatchEvent(new MouseEvent("mouseout", { bubbles: true, relatedTarget: document.body })));
    expect(heading()).toBeNull();
    expect(host.querySelector(".profile-project-grid")).toBeNull();
  });

  it("keeps details open while focus moves from a signal into its preview links", () => {
    renderProfile();
    const projectsSignal = host.querySelectorAll<HTMLElement>(".profile-signal")[0];

    act(() => projectsSignal?.focus());
    expect(heading()?.textContent).toBe("PROJECTS");
    expect(host.querySelectorAll(".profile-project")).toHaveLength(4);

    const projectLink = host.querySelector<HTMLAnchorElement>('.profile-project a[href="/projects/food-tracker"]');
    act(() => projectLink?.focus());
    expect(document.activeElement).toBe(projectLink);
    expect(heading()?.textContent).toBe("PROJECTS");
    expect(host.querySelectorAll(".profile-project")).toHaveLength(4);

    const outside = document.createElement("button");
    outside.textContent = "Outside Profile";
    host.append(outside);
    act(() => outside.focus());
    expect(heading()).toBeNull();
    expect(host.querySelector(".profile-project-grid")).toBeNull();
  });
});
