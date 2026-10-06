// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import StushPattiesCase from "./StushPattiesCase";

afterEach(() => vi.unstubAllGlobals());

describe("Stush Patties technical data-engineering story", () => {
  const markup = () => renderToStaticMarkup(<MemoryRouter><StushPattiesCase /></MemoryRouter>);

  it("names the distributor set without assigning file formats to individual sources", () => {
    const html = markup();
    const inputsStart = html.indexOf('class="stush-transform__sources"');
    const inputsEnd = html.indexOf('class="stush-transform__connector"', inputsStart);
    const inputs = html.slice(inputsStart, inputsEnd);
    const concepts = [
      "A business goal came before a clean data specification.",
      "LAYOUT A",
      "LAYOUT B",
      "LAYOUT C",
      "Koyo",
      "UNFI",
      "Dovre",
      "CSV",
      "XLSX",
      "XLSB",
      "Python readers interpret each source layout",
      "CANONICAL SCHEMA",
      "NORMALIZATION RULES",
      "Standardized CSV",
      "Data dictionary",
      "Quality report",
      "Power BI",
    ];

    for (const concept of concepts) expect(html).toContain(concept);
    expect(html.indexOf("Python readers interpret each source layout")).toBeLessThan(html.indexOf("CANONICAL SCHEMA"));
    expect(html.indexOf("CANONICAL SCHEMA")).toBeLessThan(html.indexOf("NORMALIZATION RULES"));
    expect(html.indexOf("NORMALIZATION RULES")).toBeLessThan(html.indexOf("Standardized CSV"));
    for (const source of ["Koyo", "UNFI", "Dovre"]) expect(inputs).toContain(source);
    expect(inputs).toContain("Formats across the input set");
    expect(inputs).not.toMatch(/(?:Koyo|UNFI|Dovre)\s*[:(]\s*(?:CSV|XLSX|XLSB)/i);

    for (const field of ["Sales", "Units", "Case pack", "Reporting month"]) {
      expect(html).toContain(field);
    }
    expect(html).toContain("No client records or source values are reproduced.");
  });

  it("keeps field meaning inside the main flow instead of repeating it in a second ledger", () => {
    const html = markup();
    const flowStart = html.indexOf('class="stush-source-map');
    const flowEnd = html.indexOf("</figure>", flowStart);
    const flow = html.slice(flowStart, flowEnd);

    for (const detail of [
      "Sales",
      "Units",
      "Case pack",
      "Sales + units",
      "Mapped into distinct shared fields",
      "Retained explicitly in the common contract",
      "Reporting month",
      "Aligned to one shared reporting period",
    ]) expect(flow).toContain(detail);

    expect(html).not.toContain("SOURCE PROBLEM");
    expect(html).not.toContain('aria-label="Business dimensions and normalization work"');
    expect(flow).toContain("No client records or source values are reproduced.");
    expect(flow).not.toMatch(/\b\d+(?:\.\d+)?%\b/);
    expect(flow).not.toMatch(/\$\s?\d/);
  });

  it("shows the Koyo position-and-cell parser as a bounded path that rejoins normalization", () => {
    const html = markup();
    const exceptionStart = html.indexOf('id="stush-koyo-exception"');
    const exceptionEnd = html.indexOf("</section>", exceptionStart);
    const exception = html.slice(exceptionStart, exceptionEnd);

    expect(exception).toContain("temporary position-and-cell reader");
    expect(exception).toContain("ONE SOURCE-SPECIFIC EXCEPTION");
    expect(exception).toContain("common normalization then continued");
    expect(exception).toContain("irregular layout");
    expect(exception).toContain("Same reporting fields and output contract");
    expect(exception.match(/Koyo/g)).toHaveLength(1);
    expect(exception).not.toMatch(/cell\s*(?:A|B|C|\d+)/i);
  });

  it("keeps shared ownership, reporting outputs, and factual limits visible", () => {
    const html = markup();
    const text = html.toLowerCase();

    for (const detail of [
      "Shiv",
      "two-person technical team",
      "client stakeholders",
      "Standardized CSV",
      "Data dictionary",
      "Quality report",
      "Power BI",
      "recurring client conversations",
    ]) expect(html).toContain(detail);

    expect(text).toContain("i built python ingestion, parsing, and normalization work");
    expect(text).not.toContain("ibm skillsbuild");
    expect(text).not.toContain("riipen");
    expect(text).not.toMatch(/\b(?:40|50)%\b/);
    expect(text).not.toContain("dashboard results");
  });

  it("animates the input-to-schema transformation and respects reduced motion", () => {
    const css = readFileSync("src/stush-case-study.css", "utf8");
    const html = markup();
    const sourceFigure = html.slice(html.indexOf('class="stush-source-map"'), html.indexOf("</figure>"));

    expect(sourceFigure).toContain("stush-transform__input");
    expect(sourceFigure).toContain("stush-transform__field");
    expect(sourceFigure).toContain("stush-transform__output");
    expect(css).toContain("stush-schema-resolve");
    expect(css).toContain("stush-flow-signal");
    expect(css).toContain("animation-iteration-count: 1");
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
  });

  it("groups the ending kicker with its statement before the reflection", () => {
    const html = markup();
    const closing = html.slice(html.indexOf('class="stush-close"'));
    const headingStart = closing.indexOf('class="stush-close__heading"');
    const titleIndex = closing.indexOf("A messy input problem became a documented, repeatable reporting path.");
    const reflectionIndex = closing.indexOf('class="stush-close__reflection"');

    expect(headingStart).toBeGreaterThan(-1);
    expect(closing.indexOf("WHAT THE WORK ESTABLISHED", headingStart)).toBeLessThan(titleIndex);
    expect(titleIndex).toBeLessThan(reflectionIndex);
  });

  it("starts the source-to-report reveal once when the figure enters view", () => {
    const previousActEnvironment = (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT;
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

    let observeTarget: Element | null = null;
    let notify: IntersectionObserverCallback | null = null;
    let disconnectCalls = 0;

    class TestIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0.2];

      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe(target: Element) { observeTarget = target; }
      unobserve() {}
      disconnect() { disconnectCalls += 1; }
      takeRecords(): IntersectionObserverEntry[] { return []; }
    }

    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
    const host = document.createElement("div");
    document.body.append(host);
    const root = createRoot(host);

    try {
      act(() => root.render(<MemoryRouter><StushPattiesCase /></MemoryRouter>));
      const figure = host.querySelector<HTMLElement>(".stush-source-map");
      expect(figure?.dataset.flowEntered).toBe("false");
      expect(observeTarget).toBe(figure);

      act(() => {
        notify?.([{ isIntersecting: true, target: figure! } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
      });

      expect(host.querySelector<HTMLElement>(".stush-source-map")?.dataset.flowEntered).toBe("true");
      expect(host.querySelector(".stush-source-map")?.classList.contains("is-visible")).toBe(true);
      expect(disconnectCalls).toBeGreaterThan(0);
    } finally {
      act(() => root.unmount());
      host.remove();
      if (previousActEnvironment === undefined) {
        delete (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT;
      } else {
        (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
      }
    }
  });
});
