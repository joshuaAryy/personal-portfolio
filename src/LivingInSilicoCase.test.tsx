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
  it("leads with the technical work and separates dataset contexts", () => {
    const markup = renderCase();

    expect(markup).toContain("Molecular generation, through experiments.");
    expect(markup).toContain("AI / ML Research Intern");
    expect(markup).toContain("15,696");
    expect(markup).toContain("14,487");
    expect(markup).toContain("~400–600");
    expect(markup).toContain("The April snapshot was not reduced into the smaller experiment subsets.");
    expect(markup).not.toContain("3–4 AM");
    expect(markup).not.toContain("FIRST MAJOR RESEARCH INTERNSHIP");
  });

  it("shows reported methods and distinguishes generated outputs from run configuration", () => {
    const markup = renderCase();

    expect(markup).toContain("DeepMol");
    expect(markup).toContain("Morgan fingerprints · radius 2 · 128 bits");
    expect(markup).toContain("RNN MolecularGenerator · 10 epochs · batch size 64");
    expect(markup).toContain("500 generated SMILES samples");
    expect(markup).toContain("Available run artifacts do not establish whether this exact configuration produced those samples.");
    expect(markup).toContain("RDKit + Fragmenstein");
    expect(markup).toContain("REINVENT4");
    expect(markup).toContain("No successful generation");
    expect(markup).toContain("do not verify validity, uniqueness, novelty, or research impact");
  });
});
