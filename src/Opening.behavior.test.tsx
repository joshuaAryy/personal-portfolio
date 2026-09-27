// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import Opening from "./Opening";

let host: HTMLDivElement;
let root: Root;
let windowDescriptors: Map<string, PropertyDescriptor | undefined>;

function restoreWindowProperty(name: string) {
  const descriptor = windowDescriptors.get(name);
  if (descriptor) {
    Object.defineProperty(window, name, descriptor);
  } else {
    Reflect.deleteProperty(window, name);
  }
}

function renderOpeningRoute(reducedMotion = false) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: () => ({ matches: reducedMotion }),
  });

  act(() => {
    root.render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
  });
}

function LocationProbe() {
  const { pathname } = useLocation();
  return <output aria-label="Current route">{pathname}</output>;
}

function renderPersistentOpeningRoute() {
  act(() => {
    root.render(
      <MemoryRouter initialEntries={["/"]}>
        <LocationProbe />
        <Routes>
          <Route path="*" element={<Opening underlay={<div />} />} />
        </Routes>
      </MemoryRouter>,
    );
  });
}

beforeEach(() => {
  windowDescriptors = new Map(
    ["matchMedia", "setTimeout", "clearTimeout"].map((name) => [
      name,
      Object.getOwnPropertyDescriptor(window, name),
    ]),
  );
  vi.useFakeTimers();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  Object.defineProperty(window, "setTimeout", {
    configurable: true,
    value: globalThis.setTimeout,
  });
  Object.defineProperty(window, "clearTimeout", {
    configurable: true,
    value: globalThis.clearTimeout,
  });

  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  for (const name of windowDescriptors.keys()) restoreWindowProperty(name);
});

describe("opening route behavior", () => {
  it("Skip enters Projects and moves focus to main", () => {
    renderOpeningRoute();
    const skip = host.querySelector<HTMLButtonElement>(".opening__skip");
    expect(skip).not.toBeNull();

    act(() => skip!.click());

    const main = host.querySelector<HTMLElement>("#main");
    expect(host.querySelector(".opening-route")).toBeNull();
    expect(main?.querySelector("h1")?.textContent).toBe("PROJECTS · FEATURED");
    expect(document.activeElement).toBe(main);
  });

  it("does not begin a delayed handoff after Skip", () => {
    renderPersistentOpeningRoute();
    const skip = host.querySelector<HTMLButtonElement>(".opening__skip");
    expect(skip).not.toBeNull();

    act(() => skip!.click());
    expect(host.querySelector('[aria-label="Current route"]')?.textContent).toBe("/projects");

    act(() => vi.advanceTimersByTime(2500));
    expect(host.querySelector(".opening--leaving")).toBeNull();
    expect(host.querySelector('[aria-label="Current route"]')?.textContent).toBe("/projects");
  });

  it("completes the normal handoff at two seconds and focuses Projects", () => {
    renderOpeningRoute();

    act(() => vi.advanceTimersByTime(1819));
    expect(host.querySelector(".opening--leaving")).toBeNull();
    expect(host.querySelector(".opening__underlay #main")).not.toBeNull();
    expect(host.querySelector(".opening__underlay")?.getAttribute("aria-hidden")).toBe("true");
    expect(host.querySelector(".opening__underlay")?.hasAttribute("inert")).toBe(true);

    act(() => vi.advanceTimersByTime(1));
    expect(host.querySelector(".opening--leaving")).not.toBeNull();
    expect(host.querySelector(".opening__underlay #main")).not.toBeNull();

    act(() => vi.advanceTimersByTime(179));
    expect(host.querySelector(".opening__underlay #main")).not.toBeNull();

    act(() => vi.advanceTimersByTime(1));
    expect(host.querySelector(".opening-route")).toBeNull();
    const main = host.querySelector<HTMLElement>("#main");
    expect(main?.querySelector("h1")?.textContent).toBe("PROJECTS · FEATURED");
    expect(document.activeElement).toBe(main);
  });

  it("uses the 120 ms reduced-motion handoff", () => {
    renderOpeningRoute(true);

    act(() => vi.advanceTimersByTime(0));
    expect(host.querySelector(".opening--leaving")).not.toBeNull();
    expect(host.querySelector(".opening__underlay #main")).not.toBeNull();

    act(() => vi.advanceTimersByTime(119));
    expect(host.querySelector(".opening__underlay #main")).not.toBeNull();

    act(() => vi.advanceTimersByTime(1));
    expect(host.querySelector(".opening-route")).toBeNull();
    const main = host.querySelector<HTMLElement>("#main");
    expect(main?.querySelector("h1")?.textContent).toBe("PROJECTS · FEATURED");
    expect(document.activeElement).toBe(main);
  });
});
