// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import FraymakersCase from "./FraymakersCase";

const sectionTops: Record<string, number> = {
  "fraymakers-pipeline": 0,
  "fraymakers-composition": 300,
  "fraymakers-configuration": 500,
  "fraymakers-ownership": 700,
  "fraymakers-outcome": 900,
};

function restoreProperty(target: object, name: string, descriptor: PropertyDescriptor | undefined) {
  if (descriptor) Object.defineProperty(target, name, descriptor);
  else Reflect.deleteProperty(target, name);
}

describe("Fraymakers chapter scrollspy", () => {
  it.each([
    { name: "internal main scroller", mainScrolls: true },
    { name: "window scroller", mainScrolls: false },
  ])("marks visible and clicked chapters, then resumes passive tracking at the end with the $name", ({ mainScrolls }) => {
    const previousActEnvironment = (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT;
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

    const main = document.createElement("main");
    main.id = "main";
    main.className = "main--fraymakers-case";
    main.style.overflowY = mainScrolls ? "auto" : "visible";
    document.body.append(main);

    const originalInnerHeight = Object.getOwnPropertyDescriptor(window, "innerHeight");
    const originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");
    const originalDocumentScrollHeight = Object.getOwnPropertyDescriptor(document.documentElement, "scrollHeight");
    Object.defineProperties(main, {
      clientHeight: { configurable: true, value: 100 },
      scrollHeight: { configurable: true, value: 1000 },
      scrollTop: { configurable: true, value: 0, writable: true },
    });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 100 });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 1000 });

    const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
      if (this === main) return new DOMRect(0, 0, 100, 100);
      if (this.classList.contains("fraymakers-nav")) {
        return new DOMRect(0, 0, 100, mainScrolls ? 60 : 86);
      }
      return new DOMRect(0, sectionTops[this.id] ?? 0, 100, 100);
    };

    const originalRequestAnimationFrame = window.requestAnimationFrame;
    const originalCancelAnimationFrame = window.cancelAnimationFrame;
    let nextFrameId = 0;
    const pendingFrames = new Map<number, FrameRequestCallback>();
    window.requestAnimationFrame = (callback) => {
      const id = ++nextFrameId;
      pendingFrames.set(id, callback);
      return id;
    };
    window.cancelAnimationFrame = (id) => {
      pendingFrames.delete(id);
    };
    const flushFrames = () => {
      const callbacks = [...pendingFrames.values()];
      pendingFrames.clear();
      callbacks.forEach((callback) => callback(0));
    };

    const root = createRoot(main);
    try {
      act(() => {
        root.render(
          <MemoryRouter>
            <FraymakersCase />
          </MemoryRouter>,
        );
      });
      act(() => flushFrames());

      const activeLabels = () => [...main.querySelectorAll(".fraymakers-nav__chapters a[aria-current='location']")]
        .map((link) => link.textContent?.trim());
      expect(activeLabels()).toEqual(["PIPELINE"]);

      sectionTops["fraymakers-pipeline"] = -100;
      sectionTops["fraymakers-composition"] = mainScrolls ? 69 : 95;
      act(() => {
        (mainScrolls ? main : window).dispatchEvent(new Event("scroll"));
        flushFrames();
      });
      expect(activeLabels()).toEqual(["COMPOSITION"]);

      const yamlLink = [...main.querySelectorAll(".fraymakers-nav__chapters a")]
        .find((link) => link.textContent?.trim() === "CONFIG");
      expect(yamlLink?.getAttribute("href")).toBe("#fraymakers-configuration");
      act(() => yamlLink?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
      expect(activeLabels()).toEqual(["CONFIG"]);

      act(() => {
        if (mainScrolls) main.scrollTop = 900;
        else Object.defineProperty(window, "scrollY", { configurable: true, value: 900 });
        (mainScrolls ? main : window).dispatchEvent(new Event("scroll"));
        flushFrames();
      });
      expect(activeLabels()).toEqual(["CONFIG"]);

      act(() => {
        window.dispatchEvent(new WheelEvent("wheel"));
        flushFrames();
      });
      expect(activeLabels()).toEqual(["OUTCOME"]);
    } finally {
      act(() => root.unmount());
      main.remove();
      HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
      window.requestAnimationFrame = originalRequestAnimationFrame;
      window.cancelAnimationFrame = originalCancelAnimationFrame;
      restoreProperty(window, "innerHeight", originalInnerHeight);
      restoreProperty(window, "scrollY", originalScrollY);
      restoreProperty(document.documentElement, "scrollHeight", originalDocumentScrollHeight);
      if (previousActEnvironment === undefined) {
        delete (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT;
      } else {
        (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
      }
      sectionTops["fraymakers-pipeline"] = 0;
      sectionTops["fraymakers-composition"] = 300;
    }
  });
});
