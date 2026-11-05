import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

function renderLivingRoute() {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/experience/living-in-silico"]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Living in Silico research story", () => {
  it("shows the three researched method routes beside the opening metadata", () => {
    const markup = renderLivingRoute();
    const metadata = markup.match(/<aside class="living-hero__meta"[\s\S]*?<\/aside>/)?.[0] ?? "";

    expect(metadata).toContain('class="living-hero-methods"');
    expect(metadata).toContain("DeepMol/RNN sequence work · RDKit/Fragmenstein fragment work · REINVENT4 research/attempt");
  });

  it("makes preparation scope and representation choices legible without implying one data funnel", () => {
    const markup = renderLivingRoute();
    const data = markup.match(/<section class="living-data"[\s\S]*?<\/section>/)?.[0] ?? "";
    const bridge = markup.match(/<figure class="living-representation-figure"[\s\S]*?<\/figure>/)?.[0] ?? "";

    expect(data).toContain("15,696");
    expect(data).toContain("14,487");
    expect(data).toContain("400\u2013600");
    expect(data).not.toContain("1,209");
    expect(data).toContain("living-prep-logic");
    expect(data).toContain("Can a string be interpreted as intended?");
    expect(data).toContain("What do rows and unique strings each describe?");
    expect(data).toContain("Which separate input would this test need?");
    expect(data).toContain("no project row-level path");
    expect(bridge).toContain("living-representation-bridge");
    expect(bridge).toContain("An illustrative structure, three separate questions");
    expect(bridge).toContain("Ordered SMILES sequence");
    expect(bridge).toContain("Morgan features · separate view");
    expect(bridge).toContain("Fragment and spatial exploration");
    expect(bridge).toContain("Morgan features do not feed the RNN");
  });

  it("teaches sequence generation and spatial fragment work with distinct, readable figures", () => {
    const markup = renderLivingRoute();
    const deepmol = markup.match(/<figure class="living-deepmol-figure"[\s\S]*?<\/figure>/)?.[0] ?? "";
    const fragments = markup.match(/<section class="living-fragment-study"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(deepmol).toContain("living-deepmol-sequence-map");
    expect(deepmol).toContain("Ordered positions, not a project string");
    expect(deepmol).toContain("RNN MolecularGenerator");
    expect(deepmol).toContain("Generated strings need separate chemical inspection");
    expect(deepmol).toContain("RECORDED RUN SETTINGS");
    expect(deepmol).toContain("OWNER-REPORTED COUNT");
    expect(deepmol).not.toContain("A dated May 2025 report");
    expect(fragments).toContain("These workflows began with molecular structures");
    expect(fragments).toContain("fragment decomposition, spatial compatibility and linking workflows");
    expect(fragments).toContain("Some fragment-based workflows succeeded");
    expect(fragments).toContain("Conceptual mechanism, reported separately from workflow success");
  });

  it("closes with a concise route synthesis and future comparison reflection", () => {
    const markup = renderLivingRoute();
    const reinvent = markup.match(/<section class="living-reinvent-study"[\s\S]*?<\/section>/)?.[0] ?? "";
    const reflection = markup.match(/<section class="living-research-reflection"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(reinvent).toContain("compare a specialized generative platform with the DeepMol/RNN sequence route");
    expect(reinvent).toContain("did not reach successful generation before the internship ended");
    expect(reinvent).toContain("could not compare REINVENT4 outputs with the separate sequence route");
    expect(reinvent).not.toContain("available evidence does not establish");
    expect(reflection).toContain("living-route-synthesis");
    const conclusion = markup.match(/<footer class="living-conclusion"[\s\S]*?<\/footer>/)?.[0] ?? "";

    expect(reflection.toLowerCase()).toContain("evidence-type comparison");
    expect(reflection).toContain("OWNER-REPORTED OUTPUT COUNT");
    expect(reflection).toContain("<strong>500</strong>");
    expect(reflection).toContain("generated SMILES samples");
    expect(reflection).toContain("Some fragment workflows succeeded");
    expect(reflection).toContain("No completed generation");
    expect(reflection).toContain("not scores from a standardized benchmark");
    expect(conclusion).toContain("I would connect each route’s inputs, settings, and outputs in one inspectable record");
    expect(conclusion).not.toContain("Research code");
    expect(conclusion).not.toContain("generated outputs");
    expect(markup).not.toContain("3\u20134");
    expect(markup).not.toContain("living-field__tools");
  });

  it("opens with the research question and Joshua's actual contribution", () => {
    const markup = renderLivingRoute();
    const heroLead = markup.match(/<p class="living-hero__lead"(?:\s[^>]*)?>[\s\S]*?<\/p>/)?.[0] ?? "";
    const reflection = markup.match(/<section class="living-research-reflection"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(markup).toContain("A research question before a model choice.");
    expect(markup).toContain("ROLE");
    expect(markup).toContain("FOCUS");
    expect(markup).toContain("PERIOD");
    expect(markup).toContain("SUPERVISOR");
    expect(markup).toContain("AI/ML Research Intern");
    expect(markup).toContain("Generative Molecular Modeling");
    expect(markup).toContain("March–June 2025");
    expect(markup).toContain("Sohail Mahmood");
    expect(heroLead).toContain("computational chemistry and biomedical research");
    expect(heroLead).toContain("molecular representations");
    expect(heroLead).not.toContain("learned the molecular data first");
    expect(reflection).toContain("Learning what SMILES, fingerprints, and fragments represent");
    expect(markup).not.toContain("A new field for our group");
    expect(markup).toContain("MY WORK IN THE INTERNSHIP");
    expect(markup).toContain("prepare molecular strings");
    expect(markup).toContain("Research sequence, fragment, and generative modeling approaches");
    expect(markup).toContain("Document the methods, outputs, and limits");
    expect(markup).not.toContain("first-year interns from different schools");
    expect(markup).not.toContain("living-cohort-fact");
  });

  it("places the route reflection after the research investigations", () => {
    const markup = renderLivingRoute();
    const data = markup.indexOf('class="living-data"');
    const representation = markup.indexOf('class="living-representation"');
    const deepmol = markup.indexOf('class="living-deepmol-study"');
    const fragments = markup.indexOf('class="living-fragment-study"');
    const reinvent = markup.indexOf('class="living-reinvent-study"');
    const reflection = markup.indexOf('class="living-research-reflection"');
    const conclusion = markup.indexOf('class="living-conclusion"');

    expect(data).toBeGreaterThan(-1);
    expect(data).toBeLessThan(representation);
    expect(representation).toBeLessThan(deepmol);
    expect(deepmol).toBeLessThan(fragments);
    expect(fragments).toBeLessThan(reinvent);
    expect(reinvent).toBeLessThan(reflection);
    expect(reflection).toBeLessThan(conclusion);
    expect(markup).toContain("Different routes left different kinds of evidence.");
    expect(markup).not.toContain("Before a model, learn the language of the data.");
  });

  it("explains data cleaning and scope without treating counts as a result", () => {
    const markup = renderLivingRoute();
    const data = markup.match(/<section class="living-data"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(data).toContain("15,696");
    expect(data).toContain("14,487");
    expect(data).toContain("400–600");
    expect(data).toContain("PARSEABILITY");
    expect(data).toContain("DISTINCTNESS");
    expect(data).toContain("does not document row-level parsing or duplicate-review outcomes");
    expect(data).toContain("What do rows and unique strings each describe?");
    expect(data).toContain("separate contexts, not one numerical funnel");
    expect(data).toContain("Research-scope questions");
    expect(data).not.toContain("measured data-quality or model-performance gain");
    expect(data).not.toContain("15,696 → 500");
    expect(data).not.toContain("15,696 rows became 500");
  });

  it("teaches preparation decisions separately from the snapshot and experiment counts", () => {
    const markup = renderLivingRoute();
    const data = markup.match(/<section class="living-data"[\s\S]*?<\/section>/)?.[0] ?? "";
    const preparation = data.match(/<figure class="living-prep-logic"[\s\S]*?<\/figure>/)?.[0] ?? "";
    const css = readFileSync("src/living-in-silico-case.css", "utf8");

    expect(preparation).toContain("01");
    expect(preparation).toContain("PARSEABILITY");
    expect(preparation).not.toContain("RDKit");
    expect(preparation).toContain("02");
    expect(preparation).toContain("DISTINCTNESS");
    expect(preparation).toContain("03");
    expect(preparation).toContain("EXPERIMENT SCOPE");
    expect(preparation).toContain("Can a string be interpreted as intended?");
    expect(preparation).toContain("What do rows and unique strings each describe?");
    expect(preparation).toContain("Which separate input would this test need?");
    expect(preparation).toContain("no project row-level path");
    expect(preparation).not.toContain("15,696");
    expect(preparation).not.toContain("400");
    expect(css).toMatch(/\.living-prep-logic__questions strong\s*\{[^}]*font-size:\s*19px/s);
    expect(css).toMatch(/\.living-prep-logic__index\s*\{[^}]*font-size:\s*38px/s);
    expect(css).toMatch(/\.living-prep-logic__questions small\s*\{[^}]*font-size:\s*14px/s);
    expect(css).toMatch(/@media \(max-width: 700px\)[\s\S]*?\.living-prep-logic__questions strong\s*\{[^}]*font-size:\s*17px/s);
  });

  it("shows Morgan as a feature view beside, not inside, the RNN sequence path", () => {
    const markup = renderLivingRoute();
    const representation = markup.match(/<figure class="living-representation-figure"[\s\S]*?<\/figure>/)?.[0] ?? "";
    const deepmol = markup.match(/<figure class="living-deepmol-figure"[\s\S]*?<\/figure>/)?.[0] ?? "";

    expect(representation).toContain("Morgan fingerprints");
    expect(representation).toContain("radius 2");
    expect(representation).toContain("128 bits");
    expect(representation).toContain("FEATURE LENS · SEPARATE");
    expect(representation).toContain("Morgan features do not feed the RNN");
    expect(representation).toContain("No experimental molecule or project output is shown");
    expect(representation).toContain("STRUCTURE / SPACE · SEPARATE");
    expect(representation).toContain("not a project molecule or a unified pipeline");
    expect(deepmol).toContain("DeepMol CSVLoader");
    expect(deepmol).toContain("RNN MolecularGenerator");
    expect(deepmol).toContain("SMILES sequence");
    expect(deepmol).not.toContain("Morgan fingerprint");
  });

  it("presents DeepMol settings and owner-reported sample count as separate evidence", () => {
    const markup = renderLivingRoute();
    const deepmol = markup.match(/<figure class="living-deepmol-figure"[\s\S]*?<\/figure>/)?.[0] ?? "";

    expect(deepmol).toContain("10");
    expect(deepmol).toContain("batch size 64");
    expect(deepmol).toContain("500 generated SMILES samples");
    expect(deepmol).toContain("OWNER-REPORTED COUNT");
    expect(deepmol).toContain("no validity, uniqueness, or novelty claim");
    expect(deepmol).toContain("separate from the owner-reported sample count");
    expect(deepmol).toContain("Kept separate from the sample count");
    expect(deepmol).not.toContain("A dated May 2025 report");
    expect(deepmol).toContain("I prepared and loaded experiment inputs");
    expect(deepmol).not.toContain("Clean strings; use RDKit to parse and validate structures");
    expect(deepmol).not.toContain("Handle invalid strings, review duplicates, and prepare experiment data");
    expect(deepmol).not.toContain("500 valid");
    expect(deepmol).not.toContain("500 unique");
    expect(deepmol).not.toContain("500 novel");
    expect(deepmol).not.toContain("500 viable");
  });

  it("explains fragment work as a separate spatial question with only supported outcomes", () => {
    const markup = renderLivingRoute();
    const fragments = markup.match(/<section class="living-fragment-study"[\s\S]*?<\/section>/)?.[0] ?? "";
    const fragmentFigure = fragments.match(/<figure class="living-fragment-figure"[\s\S]*?<\/figure>/)?.[0] ?? "";

    expect(fragments).toContain("with RDKit and Fragmenstein");
    expect(fragments).toContain("Fragment compatibility, spatial reasoning, and linking");
    expect(fragments).toContain("spatial compatibility");
    expect(fragments).toContain("fragment linking");
    expect(fragments).toContain("Some fragment-based workflows succeeded");
    expect(fragments).toContain("No specific candidate result is identified here");
    expect(fragmentFigure).toContain("Fragment compatibility, spatial reasoning, and linking");
    expect(fragmentFigure).toContain("Conceptual mechanism, reported separately from workflow success");
    expect(fragmentFigure).toContain("shapes are not experimental structures or outputs");
    expect(fragments).not.toContain("KNN");
  });

  it("keeps REINVENT4 exploratory without inventing a cause or configuration", () => {
    const markup = renderLivingRoute();
    const reinvent = markup.match(/<section class="living-reinvent-study"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(reinvent).toContain("compare a specialized generative platform with the DeepMol/RNN sequence route");
    expect(reinvent).toContain("REINVENT4");
    expect(reinvent).toContain("did not reach successful generation before the internship ended");
    expect(reinvent).toContain("WHAT THIS ATTEMPT ESTABLISHED");
    expect(reinvent).not.toContain("living-reinvent-track");
    expect(reinvent).not.toContain("does not show the setup, explain why the work stopped, or represent a molecular output");
    expect(reinvent).not.toContain("failed");
    expect(reinvent).not.toContain("May 2025 report");
  });

  it("closes with research-specific learning and handoff rather than repeating route cards", () => {
    const markup = renderLivingRoute();

    expect(markup).toContain("WHAT I CARRIED FORWARD");
    expect(markup).toContain("FOR A FUTURE COMPARISON");
    expect(markup).toContain("I would connect each route’s inputs, settings, and outputs");
    expect(markup).not.toContain("Research code</strong>");
    expect(markup).toContain("Different routes left different kinds of evidence.");
    expect(markup).toContain("keeping a conclusion inside the method and evidence that produced it");
    expect(markup).not.toContain("Three routes gave me three different kinds of evidence.");
    expect(markup).not.toContain("ROUTE ONE");
    expect(markup).not.toContain("ROUTE TWO");
    expect(markup).not.toContain("ROUTE THREE");
  });
});
