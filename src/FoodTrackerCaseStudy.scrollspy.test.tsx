// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import FoodTrackerCaseStudy from "./FoodTrackerCaseStudy";

const sectionTops: Record<string, number> = {
  "food-overview": -500,
  "food-logging": -400,
  "food-insights": -300,
  "food-search": -200,
  "food-interface": -100,
  "food-system": -50,
  "food-evaluation": 0,
  "food-workflow": 100,
  "food-reflection": 200,
};

function restoreProperty(target: object, name: string, descriptor: PropertyDescriptor | undefined) {
  if (descriptor) Object.defineProperty(target, name, descriptor);
  else Reflect.deleteProperty(target, name);
}

describe("Food Tracker chapter scrollspy at story end", () => {
  it.each([
    { name: "internal main scroller", mainScrolls: true },
    { name: "window scroller", mainScrolls: false },
  ])("selects CLOSE after a passive scroll at the bottom with the $name", ({ mainScrolls }) => {
    const previousActEnvironment = (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT;
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

    const main = document.createElement("main");
    main.id = "main";
    main.style.overflowY = mainScrolls ? "auto" : "visible";
    document.body.append(main);

    const originalInnerHeight = Object.getOwnPropertyDescriptor(window, "innerHeight");
    const originalScrollY = Object.getOwnPropertyDescriptor(window, "scrollY");
    const originalDocumentScrollHeight = Object.getOwnPropertyDescriptor(document.documentElement, "scrollHeight");

    Object.defineProperties(main, {
      clientHeight: { configurable: true, value: 100 },
      scrollHeight: { configurable: true, value: 1000 },
      scrollTop: { configurable: true, value: 897, writable: true },
    });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 100 });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 897 });
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, value: 1000 });

    const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
      const top = this.id === "main" ? 0 : sectionTops[this.id] ?? 0;
      return new DOMRect(0, top, 100, 100);
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
            <FoodTrackerCaseStudy />
          </MemoryRouter>,
        );
      });
      act(() => {
        flushFrames();
      });

      const resultsLink = [...main.querySelectorAll("a")].find((link) => link.textContent === "RESULTS");
      const learningLink = [...main.querySelectorAll("a")].find((link) => link.textContent === "LEARNING");
      const closeLink = [...main.querySelectorAll("a")].find((link) => link.textContent === "CLOSE");
      expect(learningLink?.getAttribute("href")).toBe("#food-workflow");
      expect(resultsLink?.getAttribute("aria-current")).toBe("location");

      act(() => {
        learningLink?.click();
      });
      expect(learningLink?.getAttribute("aria-current")).toBe("location");

      act(() => {
        if (mainScrolls) main.scrollTop = 900;
        else Object.defineProperty(window, "scrollY", { configurable: true, value: 900 });
        (mainScrolls ? main : window).dispatchEvent(new Event("scroll"));
        flushFrames();
      });

      expect(closeLink?.getAttribute("aria-current")).toBe("location");
      expect(learningLink?.getAttribute("aria-current")).toBeNull();
      expect(resultsLink?.getAttribute("aria-current")).toBeNull();
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
    }
  });
});
