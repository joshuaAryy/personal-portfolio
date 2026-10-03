// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

let host: HTMLDivElement;
let root: Root;

function LocationProbe() {
  const { pathname } = useLocation();
  return <output aria-label="Current route">{pathname}</output>;
}

function renderAppAtResume(from?: string) {
  const entry = from
    ? { pathname: "/resume", state: { from } }
    : "/resume";
  act(() => {
    root.render(
      <MemoryRouter initialEntries={[entry]}>
        <LocationProbe />
        <App />
      </MemoryRouter>,
    );
  });
}

function currentRoute() {
  return host.querySelector('[aria-label="Current route"]')?.textContent;
}

function expectDestinationMainFocused(path: string) {
  expect(currentRoute()).toBe(path);
  const main = host.querySelector<HTMLElement>("#main");
  expect(main).not.toBeNull();
  expect(document.activeElement).toBe(main);
}

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});

describe("Resume Found return behavior", () => {
  it("Escape returns to the originating route and focuses its main region", () => {
    renderAppAtResume("/experience");

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });

    expectDestinationMainFocused("/experience");
  });

  it("Close returns to the originating route and focuses its main region", () => {
    renderAppAtResume("/profile/demos");
    const close = host.querySelector<HTMLButtonElement>(".resume-found__close");
    expect(close).not.toBeNull();

    act(() => close!.click());

    expectDestinationMainFocused("/profile/demos");
  });

  it("Close falls back to Home for a resume route as the saved origin", () => {
    renderAppAtResume("/resume/viewer");
    const close = host.querySelector<HTMLButtonElement>(".resume-found__close");
    expect(close).not.toBeNull();

    act(() => close!.click());

    expectDestinationMainFocused("/home");
  });
});
