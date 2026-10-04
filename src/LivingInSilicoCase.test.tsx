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
  it("records the source snapshot and curated subset separately from representation", () => {
    const markup = renderCase();
    expect(markup).toContain("Molecules need representation before generation.");
    expect(markup).toContain("AI / ML Research Intern");
    expect(markup).toContain("SMILES");
    expect(markup).toContain("RDKit");
    expect(markup).toContain("April 12 snapshot: 15,696 rows · 14,487 unique SMILES.");
    expect(markup).toContain("Curated experimental subsets: ~400–600 entries.");
    expect(markup).toContain("Morgan fingerprint");
    expect(markup).toContain("radius 2");
    expect(markup).toContain("128 bits");
    expect(markup).not.toContain("3–4 AM");
  });

  it("shows the methods and outcomes without linking run settings to the sample count", () => {
    const markup = renderCase();
    const deepMolStart = markup.indexOf('class="lis-public-route lis-public-route--amber"');
    const deepMolEnd = markup.indexOf("</article>", deepMolStart);
    const deepMolRoute = markup.slice(deepMolStart, deepMolEnd);
    for (const detail of [
      "CSVLoader",
      "SMILES sequences",
      "radius 2",
      "128 bits",
      "RNN MolecularGenerator",
      "Recorded run · 10 epochs · batch size 64",
      "RDKit + Fragmenstein",
      "Some fragment workflows succeeded",
      "I explored fragment linking and spatial workflows with RDKit / Fragmenstein.",
      "500",
      "generated SMILES samples",
      "REINVENT4",
      "No successful generation",
      "I tried it as another generative approach alongside sequence and fragment work.",
    ]) expect(markup).toContain(detail);
    expect(deepMolRoute.indexOf("CSVLoader")).toBeLessThan(deepMolRoute.indexOf("SMILES sequences"));
    expect(deepMolRoute.indexOf("SMILES sequences")).toBeLessThan(deepMolRoute.indexOf("RNN MolecularGenerator"));
    expect(markup).not.toContain("available run record");
    expect(markup).not.toContain("validity, uniqueness, or novelty");
    expect(markup).not.toContain("SEQUENCE-GENERATION OUTPUT");
  });

  it("describes Joshua's DeepMol contribution and sequence-versus-fragment learning", () => {
    const markup = renderCase();

    expect(markup).toContain("My DeepMol contribution covered data loading, SMILES processing, molecular features and sequence generation; I also worked on fragment workflows.");
    expect(markup).toContain("DeepMol&#x27;s SMILES sequence path differed from fragment selection and recombination; comparing the two made molecular representation a core modeling choice.");
  });
});
