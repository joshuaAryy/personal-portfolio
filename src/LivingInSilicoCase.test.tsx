import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import LivingInSilicoCase from "./LivingInSilicoCase";

function renderCase() {
  return renderToStaticMarkup(
    <MemoryRouter>
      <LivingInSilicoCase />
    </MemoryRouter>,
  );
}

describe("Living in Silico research record", () => {
  it("leads with technical work and keeps dataset contexts separate", () => {
    const markup = renderCase();

    expect(markup).toContain("Molecular generation, through experiments.");
    expect(markup).toContain("AI / ML Research Intern");
    expect(markup).toContain("15,696");
    expect(markup).toContain("14,487");
    expect(markup).toContain("~400–600");
    expect(markup).toContain("The larger April snapshot was not the source of the smaller experiment subsets.");
    expect(markup).not.toContain("3–4 AM");
    expect(markup).not.toContain("FIRST MAJOR RESEARCH INTERNSHIP");
  });

  it("shows method paths, reported settings, and evidence boundaries", () => {
    const markup = renderCase();

    expect(markup).toContain("CSVLoader");
    expect(markup).toContain("Morgan fingerprints · r2 / 128 bits");
    expect(markup).toContain("Morgan fingerprints represented structures with radius 2 and 128 bits.");
    expect(markup).toContain("RNN MolecularGenerator");
    expect(markup).toContain("Reported run: 10 epochs / batch size 64");
    expect(markup).toContain("500 generated SMILES samples");
    expect(markup).toContain("The available run record does not connect these settings to that exact sample set.");
    expect(markup).toContain("RDKit + Fragmenstein");
    expect(markup).toContain("Worked in some workflows");
    expect(markup).toContain("REINVENT4");
    expect(markup).toContain("No successful generation");
    expect(markup).toContain("does not establish validity, uniqueness, or novelty");
  });
});
