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

  it("positions the active details panel beside the signal that opened it", () => {
    renderProfile();
    const overview = host.querySelector<HTMLElement>(".profile-overview")!;
    const content = host.querySelector<HTMLElement>(".profile-content")!;
    const panel = host.querySelector<HTMLElement>(".profile-project-panel")!;
    const signal = host.querySelector<HTMLElement>('[data-profile-signal="projects"]')!;

    Object.defineProperty(overview, "offsetWidth", { configurable: true, value: 1000 });
    Object.defineProperty(panel, "offsetWidth", { configurable: true, value: 1000 });
    Object.defineProperty(panel, "offsetHeight", { configurable: true, value: 330 });
    overview.getBoundingClientRect = () => ({ left: 100, top: 150, right: 800, bottom: 780, width: 700, height: 630, x: 100, y: 150, toJSON: () => ({}) } as DOMRect);
    content.getBoundingClientRect = () => ({ left: 100, top: 180, right: 800, bottom: 780, width: 700, height: 600, x: 100, y: 180, toJSON: () => ({}) } as DOMRect);
    signal.getBoundingClientRect = () => ({ left: 250, top: 720, right: 400, bottom: 780, width: 150, height: 60, x: 250, y: 720, toJSON: () => ({}) } as DOMRect);

    act(() => signal.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })));

    expect(heading()?.textContent).toBe("PROJECTS");
    expect(Number.parseFloat(panel.style.top)).toBeGreaterThan(0);
    expect(panel.style.position).toBe("absolute");
    expect(panel.style.top).not.toBe("0px");
  });

  it("keeps a narrow overlay below its signal and within the collapsed-rail viewport", () => {
    renderProfile();
    const overview = host.querySelector<HTMLElement>(".profile-overview")!;
    const content = host.querySelector<HTMLElement>(".profile-content")!;
    const panel = host.querySelector<HTMLElement>(".profile-project-panel")!;
    const signal = host.querySelector<HTMLElement>('[data-profile-signal="projects"]')!;
    const collapsedRail = document.createElement("aside");
    collapsedRail.className = "rail";
    collapsedRail.getBoundingClientRect = () => ({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({}) } as DOMRect);
    host.append(collapsedRail);

    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 844 });
    Object.defineProperty(overview, "offsetWidth", { configurable: true, value: 354 });
    Object.defineProperty(panel, "offsetWidth", { configurable: true, value: 354 });
    Object.defineProperty(panel, "offsetHeight", { configurable: true, value: 500 });
    overview.getBoundingClientRect = () => ({ left: 18, top: 303, right: 372, bottom: 774, width: 354, height: 471, x: 18, y: 303, toJSON: () => ({}) } as DOMRect);
    content.getBoundingClientRect = () => ({ left: 14, top: 227, right: 376, bottom: 967, width: 362, height: 740, x: 14, y: 227, toJSON: () => ({}) } as DOMRect);
    signal.getBoundingClientRect = () => ({ left: 18, top: 304, right: 195, bottom: 539, width: 177, height: 235, x: 18, y: 304, toJSON: () => ({}) } as DOMRect);

    act(() => signal.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })));

    expect(panel.style.position).toBe("absolute");
    expect(panel.style.top).toBe("248px");
    expect(panel.style.width).toBe("350px");
    expect(overview.style.height).toBe("760px");
    Object.defineProperty(window, "innerWidth", { configurable: true, value: originalInnerWidth });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: originalInnerHeight });
  });
});
