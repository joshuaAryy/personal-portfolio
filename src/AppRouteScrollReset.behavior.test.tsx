// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Link, MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

let host: HTMLDivElement;
let root: Root;

function LocationProbe() {
  const { pathname } = useLocation();
  return <output aria-label="Current route">{pathname}</output>;
}

function renderApp(
  initialEntries: Array<string | { pathname: string; state?: unknown }> = ["/projects"],
  initialIndex?: number,
) {
  act(() => {
    root.render(
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        <LocationProbe />
        <App />
        <Link to="/projects?filter=food">Change lobby state</Link>
      </MemoryRouter>,
    );
  });
}

function click(element: Element) {
  act(() =>
    element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true })),
  );
}

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("route scroll reset", () => {
  it("starts a newly navigated case study at the top", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    renderApp();
    host.querySelector<HTMLElement>("#main")!.scrollTop = 2682;

    click(host.querySelector('a[href="/projects/food-tracker"].league-selected__story')!);

    expect(host.querySelector('[aria-label="Current route"]')?.textContent).toBe(
      "/projects/food-tracker",
    );
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    expect(host.querySelector<HTMLElement>("#main")?.scrollTop).toBe(0);
  });

  it("leaves scroll untouched for same-path state changes", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    renderApp();
    const main = host.querySelector<HTMLElement>("#main")!;
    main.scrollTop = 2682;

    click(host.querySelector('a[href="/projects?filter=food"]')!);

    expect(host.querySelector('[aria-label="Current route"]')?.textContent).toBe("/projects");
    expect(scrollTo).not.toHaveBeenCalled();
    expect(main.scrollTop).toBe(2682);
  });

  it("preserves the originating scroll position through the Resume Found takeover", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    renderApp(["/projects/food-tracker"]);
    const main = host.querySelector<HTMLElement>("#main")!;
    vi.clearAllMocks();
    main.scrollTop = 2682;

    click(host.querySelector(".header-client-tool--resume")!);

    expect(host.querySelector('[aria-label="Current route"]')?.textContent).toBe("/resume");
    expect(host.querySelector("[role='dialog']")).not.toBeNull();
    expect(host.querySelector<HTMLElement>(".app-route-underlay #main")?.scrollTop).toBe(
      2682,
    );
    expect(scrollTo).not.toHaveBeenCalled();

    click(host.querySelector(".resume-found__close")!);

    expect(host.querySelector('[aria-label="Current route"]')?.textContent).toBe(
      "/projects/food-tracker",
    );
    expect(scrollTo).not.toHaveBeenCalled();
    expect(host.querySelector<HTMLElement>("#main")?.scrollTop).toBe(2682);
  });
});
