// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CrestCaseStudy from "./CrestCaseStudy";

let host: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  host = document.createElement("div");
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});

describe("Crest in-page demo", () => {
  it("starts the authentic demo in the case-study player without leaving the route", () => {
    act(() => {
      root.render(
        <MemoryRouter initialEntries={["/projects/crest"]}>
          <CrestCaseStudy />
        </MemoryRouter>,
      );
    });

    const play = host.querySelector<HTMLButtonElement>(
      'button[aria-label="Play Crest demo in page"]',
    );
    expect(play).not.toBeNull();

    act(() => play!.click());

    const iframe = host.querySelector<HTMLIFrameElement>("iframe.crest-demo-frame");
    expect(iframe?.getAttribute("src")).toBe(
      "https://www.youtube-nocookie.com/embed/kiq6XjNi9J8?autoplay=1",
    );
    expect(iframe?.getAttribute("title")).toBe("Crest expense intelligence demo video");
    expect(host.querySelector(".crest-demo-launch")).toBeNull();
  });
});
