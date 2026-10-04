import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import StushPattiesCase from "./StushPattiesCase";

describe("Stush Patties technical data-pipeline story", () => {
  const markup = () => renderToStaticMarkup(<MemoryRouter><StushPattiesCase /></MemoryRouter>);

  it("shows the file-to-report transformation and reporting destination", () => {
    const html = markup();
    for (const stage of [
      "Different file shapes. One reporting path.",
      "Read each structure",
      "Fields found in each layout",
      "SHARED FIELD CONTRACT",
      "Four stable meanings",
      "NORMALIZE",
      "STANDARDIZED OUTPUT",
      "Unified CSV",
      "Data dictionary",
      "Quality report",
      "Power BI",
    ]) expect(html).toContain(stage);
    for (const field of ["Sales", "Units", "Case pack", "Reporting month"]) {
      expect(html).toContain(field);
    }
    expect(html).toContain("Conceptual pipeline");
  });

  it("keeps the Dimensions content visible without a nested landmark", () => {
    const html = markup();
    const start = html.indexOf('<section class="stush-problem-map"');
    const end = html.indexOf('class="stush-ownership"', start);
    const inputSection = html.slice(start, end);

    expect(inputSection).toContain('class="stush-contract"');
    expect(inputSection).not.toMatch(/<section[^>]*class="stush-contract"/);
    expect(inputSection).toContain("Four business dimensions needed the same meaning across file layouts.");
  });

  it("keeps formats grouped across generic inputs", () => {
    const html = markup();
    const inputSummaryStart = html.indexOf('aria-label="Input set"');
    const inputSummaryEnd = html.indexOf("</aside>", inputSummaryStart);
    const inputSummary = html.slice(inputSummaryStart, inputSummaryEnd);
    expect(inputSummary).toContain("Koyo · UNFI · Dovre");
    expect(html).toContain("CSV · XLSX · XLSB");
    expect(html).toContain("Formats across inputs");
    expect(inputSummary).not.toMatch(/Koyo\s+(CSV|XLSX|XLSB)|UNFI\s+(CSV|XLSX|XLSB)|Dovre\s+(CSV|XLSX|XLSB)/i);
  });

  it("states Joshua's parsing ownership and places the generic edge case later", () => {
    const html = markup();
    const normalized = html.toLowerCase();
    expect(normalized).toContain("i built python parsing and");
    expect(normalized).toContain("temporary koyo position-and-cell parsing exception");
    expect(normalized).toContain("i mapped the position-and-cell data into the shared schema, then returned it to the common normalization path");
    expect(normalized).toContain("in our two-person technical team, shiv and i worked with client stakeholders");
    expect(normalized).not.toContain("i contributed to python parsing and normalization");
    const opening = html.split("</header>")[0];
    expect(opening).not.toMatch(/two-person team|team size/i);
  });
});
