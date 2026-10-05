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
    expect(markup).toContain("Representation set the terms of each experiment.");
    expect(markup).toContain("AI / ML Research Intern");
    expect(markup).toContain("SMILES");
    expect(markup).toContain("RDKit");
    expect(markup).toContain("15,696");
    expect(markup).toContain("14,487 unique SMILES.");
    expect(markup).toContain("~400–600");
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
      "Curated experimental SMILES loaded through DeepMol CSVLoader.",
      "RNN MolecularGenerator.",
      "My work covered data loading, SMILES processing, and sequence-generation work.",
      "Learning: molecular representation shaped this route.",
    ]) expect(deepMolRoute).toContain(detail);
    expect(deepMolRoute).toContain("OWNER-REPORTED OUTPUT · DEEPMOL");
    expect(deepMolRoute).toContain("500");
    expect(deepMolRoute).toContain("generated SMILES samples");
    expect(deepMolRoute).toContain("No validity, uniqueness, or novelty claim is made for these samples.");

    for (const detail of [
      "RDKit + Fragmenstein",
      "Why: explore structure-based design alongside sequence generation.",
      "Molecular structures and compatible fragments.",
      "Select, link, and recombine with RDKit / Fragmenstein",
      "Some fragment workflows succeeded",
      "My work covered fragment selection, linking, and spatial workflows with RDKit / Fragmenstein.",
      "Learning: this route depends on structural fit and spatial context.",
    ]) expect(rdkitRoute).toContain(detail);

    for (const detail of [
      "REINVENT4",
      "Did not reach a completed generation within the available internship scope",
      "Why: test another generative approach alongside sequence and fragment work.",
      "I researched REINVENT4 and attempted generation.",
      "Learning: this remained an exploratory attempt, not a demonstrated generation workflow.",
    ]) expect(reinventRoute).toContain(detail);
    expect(reinventRoute).not.toContain("available notes do not record");
    expect(reinventRoute).not.toContain("why generation did not succeed");

    expect(deepMolStart).toBeLessThan(rdkitStart);
    expect(rdkitStart).toBeLessThan(reinventStart);
    expect(markup.indexOf("500")).toBeGreaterThan(deepMolStart);
    expect(markup.indexOf("500")).toBeLessThan(rdkitStart);
    expect(markup).toContain("generated SMILES samples");
    expect(markup).not.toContain("available run record");
    expect(markup).not.toContain("valid, unique, or novel molecules");
    expect(markup).not.toContain("SEQUENCE-GENERATION OUTPUT");
  });

  it("gives each investigation its own accessible teaching figure", () => {
    const markup = renderCase();

    for (const [route, figureTitle] of [
      ["deepmol", "SMILES sequence-generation workflow"],
      ["fragmenstein", "Structure-based fragment workflow"],
      ["reinvent4", "REINVENT4 research attempt"],
    ]) {
      const start = markup.indexOf(`data-investigation="${route}"`);
      const end = markup.indexOf("</section>", start);
      const investigation = markup.slice(start, end);

      expect(start, `${route} has a distinct investigation section`).toBeGreaterThan(-1);
      expect(investigation).toContain("<figure");
      expect(investigation).toContain(`aria-label="${figureTitle}"`);
      expect(investigation).toContain("<figcaption>");
    }

    expect(markup).toContain('aria-label="Separate dataset counts and molecular representation"');
    expect(markup).toContain("15,696");
    expect(markup).toContain("rows in snapshot");
    expect(markup).toContain("14,487 unique SMILES");
    expect(markup).toContain("entries across curated experimental subsets");
  });

  it("uses distinct visual sequences for the three research routes", () => {
    const markup = renderCase();
    const route = (tone: string) => {
      const start = markup.indexOf(`class="lis-public-route lis-public-route--${tone}"`);
      const end = markup.indexOf("</article>", start);
      return markup.slice(start, end);
    };
    const deepMol = route("amber");
    const fragment = route("teal");
    const reinvent = route("coral");

    expect(deepMol.indexOf("<figure")).toBeLessThan(deepMol.indexOf("<dl"));
    expect(fragment.indexOf("<dl")).toBeLessThan(fragment.indexOf("<figure"));
    expect(reinvent.indexOf("<figure")).toBeLessThan(reinvent.indexOf("<dl"));
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

  it("keeps the owner-reported DeepMol sample count inside its route", () => {
    const markup = renderCase();
    const routeStart = markup.indexOf('data-investigation="deepmol"');
    const routeEnd = markup.indexOf("</section>", routeStart);
    const deepMolRoute = markup.slice(routeStart, routeEnd);

    expect(deepMolRoute).toContain("OWNER-REPORTED OUTPUT · DEEPMOL");
    expect(deepMolRoute).toContain("<strong>500</strong>");
    expect(deepMolRoute).toContain("generated SMILES samples");
    expect(deepMolRoute).not.toContain("REINVENT4");
  });
});
