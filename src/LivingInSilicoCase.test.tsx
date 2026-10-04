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

  it("explains each modeling route, Joshua's contribution, and route-specific learning", () => {
    const markup = renderCase();
    const deepMolStart = markup.indexOf('class="lis-public-route lis-public-route--amber"');
    const deepMolEnd = markup.indexOf("</article>", deepMolStart);
    const deepMolRoute = markup.slice(deepMolStart, deepMolEnd);
    const rdkitStart = markup.indexOf('class="lis-public-route lis-public-route--teal"');
    const rdkitEnd = markup.indexOf("</article>", rdkitStart);
    const rdkitRoute = markup.slice(rdkitStart, rdkitEnd);
    const reinventStart = markup.indexOf('class="lis-public-route lis-public-route--coral"');
    const reinventEnd = markup.indexOf("</article>", reinventStart);
    const reinventRoute = markup.slice(reinventStart, reinventEnd);

    for (const detail of [
      "CSVLoader",
      "SMILES sequences",
      "RNN MolecularGenerator",
      "Recorded RNN run settings: 10 epochs; batch size 64.",
      "Why: generate from molecules represented as SMILES sequences.",
      "Input: curated experimental SMILES loaded through DeepMol CSVLoader.",
      "Method: RNN MolecularGenerator.",
      "My work covered data loading, SMILES processing, and sequence-generation work.",
      "Learning: molecular representation shaped this route.",
    ]) expect(deepMolRoute).toContain(detail);
    expect(deepMolRoute).not.toContain("500");

    for (const detail of [
      "RDKit + Fragmenstein",
      "Why: explore structure-based design alongside sequence generation.",
      "Input: molecular structures and compatible fragments.",
      "Method: select, link, and recombine with RDKit / Fragmenstein.",
      "Some fragment workflows succeeded",
      "My work covered fragment selection, linking, and spatial workflows with RDKit / Fragmenstein.",
      "Learning: this route depends on structural fit and spatial context.",
    ]) expect(rdkitRoute).toContain(detail);

    for (const detail of [
      "REINVENT4",
      "No successful generation",
      "Generation attempt did not succeed.",
      "Why: test another generative approach alongside sequence and fragment work.",
      "I researched REINVENT4 and attempted generation.",
      "The available notes do not record its input, configuration, or why generation did not succeed.",
      "Learning: this remained an exploratory attempt, not a demonstrated generation workflow.",
    ]) expect(reinventRoute).toContain(detail);

    expect(deepMolStart).toBeLessThan(rdkitStart);
    expect(rdkitStart).toBeLessThan(reinventStart);
    expect(markup.indexOf("500")).toBeGreaterThan(reinventEnd);
    expect(markup).toContain("generated SMILES samples");
    expect(markup).not.toContain("available run record");
    expect(markup).not.toContain("validity, uniqueness, or novelty");
    expect(markup).not.toContain("SEQUENCE-GENERATION OUTPUT");
  });

  it("keeps Morgan representation separate from DeepMol's sequence input", () => {
    const markup = renderCase();
    const representationStart = markup.indexOf('class="lis-public-representation"');
    const representationEnd = markup.indexOf("</figure>", representationStart);
    const deepMolStart = markup.indexOf('class="lis-public-route lis-public-route--amber"');
    const deepMolEnd = markup.indexOf("</article>", deepMolStart);
    const representation = markup.slice(representationStart, representationEnd);
    const deepMolRoute = markup.slice(deepMolStart, deepMolEnd);

    expect(representation).toContain("Morgan fingerprint");
    expect(representation).toContain("radius 2");
    expect(representation).toContain("128 bits");
    expect(deepMolRoute).not.toContain("Morgan fingerprint");
    expect(deepMolRoute).not.toContain("radius 2");
  });

  it("describes Joshua's DeepMol contribution and sequence-versus-fragment learning", () => {
    const markup = renderCase();

    expect(markup).toContain("My DeepMol contribution covered data loading, SMILES processing, molecular features and sequence generation; I also worked on fragment workflows.");
    expect(markup).toContain("DeepMol&#x27;s SMILES sequence path differed from fragment selection and recombination; comparing the two made molecular representation a core modeling choice.");
  });
});
