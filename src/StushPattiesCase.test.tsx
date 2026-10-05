import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import StushPattiesCase from "./StushPattiesCase";

describe("Stush Patties technical data-engineering story", () => {
  const markup = () => renderToStaticMarkup(<MemoryRouter><StushPattiesCase /></MemoryRouter>);

  it("teaches the source-aware path from distributor reports to a shared schema", () => {
    const html = markup();
    const concepts = [
      "A business goal came before a clean data specification.",
      "Koyo",
      "UNFI",
      "Dovre",
      "CSV",
      "XLSX",
      "XLSB",
      "Source-aware Python parsers",
      "Shared reporting schema",
      "Normalize business dimensions",
    ];

    for (const concept of concepts) expect(html).toContain(concept);
    expect(html.indexOf("Koyo")).toBeLessThan(html.indexOf("Source-aware Python parsers"));
    expect(html.indexOf("Source-aware Python parsers")).toBeLessThan(html.indexOf("Shared reporting schema"));
    expect(html.indexOf("Shared reporting schema")).toBeLessThan(html.indexOf("Normalize business dimensions"));

    for (const field of ["Sales", "Units", "Case pack", "Reporting month"]) {
      expect(html).toContain(field);
    }
    expect(html).toContain("No client records or source values are reproduced.");
  });

  it("shows the Koyo position-and-cell parser as a bounded path that rejoins normalization", () => {
    const html = markup();
    const exceptionStart = html.indexOf('id="stush-koyo-exception"');
    const exceptionEnd = html.indexOf("</section>", exceptionStart);
    const exception = html.slice(exceptionStart, exceptionEnd);

    expect(exception).toContain("Koyo position-and-cell parser");
    expect(exception).toContain("One source-specific exception");
    expect(exception).toContain("Rejoins the shared normalization path");
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
      "Riipen · IBM SkillsBuild",
      "recurring client conversations",
    ]) expect(html).toContain(detail);

    expect(text).toContain("i built python ingestion, parsing, and normalization work");
    expect(text).not.toMatch(/\b(?:40|50)%\b/);
    expect(text).not.toContain("dashboard results");
  });
});
