// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import JourneyCase from "./JourneyCase";

let host: HTMLDivElement;
let root: Root;
let previousUrl: string;
let previousScrollHeight: PropertyDescriptor | undefined;

function renderJourney() {
  act(() => {
    root.render(
      <MemoryRouter initialEntries={["/profile/journey"]}>
        <JourneyCase />
      </MemoryRouter>,
    );
  });
}

function waypoint(label: string) {
  return host.querySelector<HTMLAnchorElement>(
    `.journey-locator__stop[aria-label="${label}"]`,
  );
}

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  previousUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  previousScrollHeight = Object.getOwnPropertyDescriptor(
    document.documentElement,
    "scrollHeight",
  );
  window.history.replaceState(null, "", "/profile/journey");
  Object.defineProperty(document.documentElement, "scrollHeight", {
    configurable: true,
    value: 100_000,
  });
  vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 1);
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
  vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", previousUrl || "/");
  if (previousScrollHeight) {
    Object.defineProperty(
      document.documentElement,
      "scrollHeight",
      previousScrollHeight,
    );
  } else {
    Reflect.deleteProperty(document.documentElement, "scrollHeight");
  }
});

describe("Journey waypoint behavior", () => {
  it("restores a valid initial fragment as the current waypoint", () => {
    window.history.replaceState(null, "", "/profile/journey#journey-tmu");
    renderJourney();

    expect(waypoint("TMU")?.getAttribute("aria-current")).toBe("location");
    expect(waypoint("Origin")?.hasAttribute("aria-current")).toBe(false);
  });

  it("primary activation updates the URL hash and current waypoint", () => {
    renderJourney();
    const waypointLink = waypoint("Living in Silico");
    expect(waypointLink).not.toBeNull();

    act(() => waypointLink!.click());

    expect(window.location.hash).toBe("#journey-living-in-silico");
    expect(waypointLink?.getAttribute("aria-current")).toBe("location");
  });

  it("updates the current waypoint on a valid popstate fragment", () => {
    renderJourney();
    const tmu = waypoint("TMU");
    expect(tmu).not.toBeNull();
    expect(waypoint("Origin")?.getAttribute("aria-current")).toBe("location");

    act(() => {
      window.history.replaceState(null, "", "/profile/journey#journey-tmu");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(window.location.hash).toBe("#journey-tmu");
    expect(tmu?.getAttribute("aria-current")).toBe("location");
    expect(waypoint("Origin")?.hasAttribute("aria-current")).toBe(false);
  });

  it("does not cancel the browser default for a modified waypoint click", () => {
    renderJourney();
    const waypointLink = waypoint("TMU");
    expect(waypointLink).not.toBeNull();
    const modifiedClick = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      button: 0,
      ctrlKey: true,
    });

    act(() => waypointLink!.dispatchEvent(modifiedClick));

    expect(modifiedClick.defaultPrevented).toBe(false);
  });
});
