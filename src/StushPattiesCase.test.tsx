// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import StushPattiesCase from "./StushPattiesCase";

afterEach(() => vi.unstubAllGlobals());

describe("Stush Patties experience story", () => {
  const markup = () => renderToStaticMarkup(<MemoryRouter><StushPattiesCase /></MemoryRouter>);

  it("opens with concise role and client context before the full transformation figure", () => {
    const html = markup();
    const opening = html.slice(0, html.indexOf('class="stush-ingestion"'));

    for (const detail of ["Software Engineering Intern", "Data Pipelines &amp; Automation", "Sep–Nov 2025", "External client", "two-person technical team"]) {
      expect(opening).toContain(detail);
    }
    expect(opening.match(/<dt>/g)).toHaveLength(4);
    expect(opening).toContain("CLIENT / TEAM");
    expect(opening).toContain("I built Python parsing and normalization");
    expect(opening).not.toContain("stush-hero-path");
    expect(opening).not.toContain("Illustrative steps only");
    expect(html).toContain('<section class="stush-ingestion" data-route-entry="evidence" aria-label="From messy source to a contract">');
    expect(html).toContain('<h2 id="stush-source-map-title">Different layouts. A shared field contract.</h2>');
    expect(html).toContain("Different layouts. A shared field contract.");
    expect(html.match(/class="stush-source-map/g)).toHaveLength(1);
    expect(opening).not.toContain("THE CLIENT PROBLEM");
    expect(html.indexOf("FROM MESSY SOURCE TO A CONTRACT")).toBeLessThan(html.indexOf("THE CLIENT PROBLEM"));
    expect(html.indexOf("THE CLIENT PROBLEM")).toBeLessThan(html.indexOf("WHAT THE WORK ESTABLISHED"));
    expect(html.indexOf('id="stush-role"')).toBe(-1);
  });

  it("connects the reporting need to the shared rules without another text block", () => {
    const html = markup();
    const clientProblem = html.slice(html.indexOf('class="stush-brief"'), html.indexOf('class="stush-close"'));
    const translation = clientProblem.slice(clientProblem.indexOf('class="stush-brief__translation"'));

    expect(translation).toContain('role="group" aria-label="Stakeholder need translated into reporting rules"');
    expect(translation).toContain("Comparable monthly reporting");
    expect(translation).toContain("Sales + units");
    expect(translation).toContain("Case pack");
    expect(translation).toContain("Reporting month");
    expect(html).not.toMatch(/Koyo|UNFI|Dovre/i);
  });

  it("shows source A/B/C and formats across the input set without client data", () => {
    const html = markup();
    const sourceMap = html.slice(html.indexOf('class="stush-source-map"'), html.indexOf("</figure>", html.indexOf('class="stush-source-map"')));

    for (const item of ["DISTRIBUTOR EXPORT A", "DISTRIBUTOR EXPORT B", "DISTRIBUTOR EXPORT C", "LAYOUT 01", "LAYOUT 02", "LAYOUT 03", "CSV", "XLSX", "XLSB", "Python readers interpret each source layout", "CANONICAL SCHEMA", "NORMALIZATION RULES", "Standardized CSV", "Data dictionary", "Quality report", "Power BI"]) {
      expect(sourceMap).toContain(item);
    }
    expect(sourceMap).toContain("Formats across the input set");
    expect(sourceMap).toContain("No client records or source values are reproduced.");
    expect(sourceMap).not.toMatch(/(?:Koyo|UNFI|Dovre|Shiv)/i);
    expect(sourceMap).not.toMatch(/\b\d+(?:\.\d+)?%\b|\$\s?\d/);

    for (const field of ["Sales", "Units", "Case pack", "Reporting month"]) expect(sourceMap).toContain(field);
  });

  it("contextualizes one bounded temporary parser that rejoins normalization", () => {
    const html = markup();
    const exceptionStart = html.indexOf('id="stush-source-exception"');
    const exception = html.slice(exceptionStart, html.indexOf("</section>", exceptionStart));

    expect(exception).toContain("temporary position-and-cell parser");
    expect(exception).toContain("irregular workbook required a temporary");
    expect(exception).toContain("ONE SOURCE-SPECIFIC EXCEPTION");
    expect(exception).toContain("common normalization then continued");
    expect(exception).toContain("Same reporting fields and output contract");
    expect(exception).not.toMatch(/cell\s*(?:A|B|C|\d+)/i);
    expect(exception).not.toMatch(/Koyo|UNFI|Dovre|Shiv/i);
  });

  it("keeps team ownership and supported reporting outputs without personal names", () => {
    const html = markup();
    const text = html.toLowerCase();

    for (const detail of ["two-person technical team", "stakeholder conversations", "python parsing and normalization", "standardized csv", "data dictionary", "quality report", "power bi"]) {
      expect(text).toContain(detail);
    }
    expect(text).not.toMatch(/\b(?:koyo|unfi|dovre|shiv|arora)\b/i);
    expect(text).not.toMatch(/\b(?:40|50)%\b/);
    expect(text).not.toContain("dashboard results");
  });

  it("keeps the final close centered on what the work established", () => {
    const html = markup();
    const close = html.slice(html.indexOf('class="stush-close"'));

    expect(close).toContain("WHAT THE WORK ESTABLISHED");
    expect(close).toContain("A messy input problem became a documented, repeatable reporting path.");
    expect(close).toContain("THE ENGINEERING LESSON");
  });

  it("starts the flow on entry, pauses on exit, and lets the replay button restart it", () => {
    const previousActEnvironment = (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT;
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    let notify: IntersectionObserverCallback | null = null;
    let replayFrame: FrameRequestCallback | null = null;

    class TestIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0.1];
      constructor(callback: IntersectionObserverCallback) { notify = callback; }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] { return []; }
    }

    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { replayFrame = callback; return 1; });
    vi.stubGlobal("cancelAnimationFrame", () => {});
    const host = document.createElement("div");
    document.body.append(host);
    const root = createRoot(host);
    const signal = (isIntersecting: boolean) => act(() => {
      notify?.([{ isIntersecting, target: host.querySelector(".stush-source-map")! } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    try {
      act(() => root.render(<MemoryRouter><StushPattiesCase /></MemoryRouter>));
      const figure = host.querySelector<HTMLElement>(".stush-source-map");
      expect(figure?.dataset.flowEntered).toBe("false");
      signal(true);
      expect(figure?.dataset.flowEntered).toBe("true");
      act(() => host.querySelector<HTMLButtonElement>(".stush-figure-heading button")?.click());
      expect(figure?.dataset.flowEntered).toBe("false");
      act(() => replayFrame?.(0));
      expect(figure?.dataset.flowEntered).toBe("true");
      replayFrame = null;
      signal(false);
      expect(figure?.dataset.flowEntered).toBe("false");
      signal(true);
      expect(figure?.dataset.flowEntered).toBe("true");

      signal(false);
      const replay = host.querySelector<HTMLButtonElement>(".stush-figure-heading button");
      replay?.blur();
      act(() => replay?.focus());
      expect(figure?.dataset.flowEntered).toBe("false");
      expect(replayFrame).not.toBeNull();
      act(() => replayFrame?.(0));
      expect(figure?.dataset.flowEntered).toBe("true");
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

  it("offers a keyboard-accessible replay control without hiding pipeline content", () => {
    const host = document.createElement("div");
    host.innerHTML = markup();
    const replay = host.querySelector<HTMLButtonElement>('button[aria-controls="stush-reporting-flow"]');
    expect(replay?.textContent).toContain("Replay the path");
    expect(replay?.type).toBe("button");
    expect(host.querySelector("#stush-reporting-flow")?.textContent).toContain("Sales");
    expect(host.querySelector("#stush-reporting-flow")?.textContent).toContain("Power BI handoff");
  });
});
