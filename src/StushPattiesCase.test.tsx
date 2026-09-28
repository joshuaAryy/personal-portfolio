import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import StushPattiesCase from "./StushPattiesCase";

describe("Stush Patties technical data-pipeline story", () => {
  const markup = () => renderToStaticMarkup(<StushPattiesCase />);

  it("shows the file-to-reporting architecture and the alignment contract", () => {
    const html = markup();
    for (const stage of [
      "Read &amp; parse",
      "Canonicalize fields",
      "Normalize for reporting",
      "Unified CSV",
      "Data dictionary",
      "Quality report",
      "Power BI",
    ]) expect(html).toContain(stage);
    expect(html).toContain("case packs and reporting months");
    expect(html).toContain("client’s reporting question");
  });

  it("keeps file formats across inputs without assigning them to a distributor", () => {
    const html = markup();
    expect(html).toContain("CSV · XLSX · XLSB across inputs");
    expect(html).toContain("not mapped one-to-one");
    expect(html).not.toMatch(/Koyo[^<]{0,50}(CSV|XLSX|XLSB)/i);
  });

  it("describes the temporary Koyo exception and bounded two-person contribution", () => {
    const html = markup();
    const normalized = html.toLowerCase();
    expect(normalized).toContain("temporary position-and-cell parser");
    expect(normalized).toContain("two-person technical team with shiv");
    expect(normalized).toContain("i contributed to python parsing and normalization");
    expect(html).not.toContain("40–50%");
    expect(html).not.toContain("I owned the whole pipeline");
  });
});
