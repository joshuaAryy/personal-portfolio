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

  it("keeps formats grouped across generic inputs", () => {
    const html = markup();
    expect(html).toContain("CSV · XLSX · XLSB");
    expect(html).toContain("Formats across inputs");
    expect(html).not.toMatch(/Koyo|Riipen|IBM SkillsBuild/i);
  });

  it("states Joshua's parsing ownership and places the generic edge case later", () => {
    const html = markup();
    const normalized = html.toLowerCase();
    expect(normalized).toContain("i built python parsing and");
    expect(normalized).toContain("one distributor file needed a separate parsing branch");
    expect(normalized).toContain("two-person technical team with shiv");
    expect(normalized).not.toContain("i contributed to python parsing and normalization");
    const opening = html.split("</header>")[0];
    expect(opening).not.toMatch(/Koyo|two-person team|team size/i);
  });
});
