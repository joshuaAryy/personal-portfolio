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

describe("Living in Silico public research story", () => {
  it("explains molecular representation and the experiment data scope", () => {
    const markup = renderCase();
    expect(markup).toContain("Molecules need representation before generation.");
    expect(markup).toContain("AI / ML Research Intern");
    expect(markup).toContain("SMILES");
    expect(markup).toContain("RDKit");
    expect(markup).toContain("15,696 records");
    expect(markup).toContain("14,487 unique SMILES");
    expect(markup).toContain("400");
    expect(markup).not.toContain("April snapshot");
    expect(markup).not.toContain("3–4 AM");
  });

  it("shows the methods, outcomes, and sequence-generation output honestly", () => {
    const markup = renderCase();
    for (const detail of [
      "CSVLoader",
      "Morgan fingerprints (radius 2 / 128 bits)",
      "RNN MolecularGenerator",
      "RDKit + Fragmenstein",
      "Explored in some workflows",
      "500",
      "generated SMILES samples",
      "SEQUENCE-GENERATION OUTPUT",
      "REINVENT4",
      "No successful generation",
      "I researched and attempted REINVENT4, but did not reach successful molecule generation.",
    ]) expect(markup).toContain(detail);
    expect(markup).not.toContain("available run record");
    expect(markup).not.toContain("validity, uniqueness, or novelty");
  });
});