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
  it("opens with the research question and Joshua's actual contribution", () => {
    const markup = renderLivingRoute();

    expect(markup).toContain("A research question before a model choice.");
    expect(markup).toContain("ROLE");
    expect(markup).toContain("FOCUS");
    expect(markup).toContain("PERIOD");
    expect(markup).toContain("SUPERVISOR");
    expect(markup).toContain("AI/ML Research Intern");
    expect(markup).toContain("Generative Molecular Modeling");
    expect(markup).toContain("March–June 2025");
    expect(markup).toContain("Sohail Mahmood");
    expect(markup).toContain("MY WORK IN THE INTERNSHIP");
    expect(markup).toContain("prepare molecular strings");
    expect(markup).toContain("Research sequence, fragment, and generative modeling approaches");
    expect(markup).toContain("Document the methods, outputs, and limits");
    expect(markup).not.toContain("first-year interns from different schools");
    expect(markup).not.toContain("living-cohort-fact");
  });

  it("moves the language-learning section after the research routes", () => {
    const markup = renderLivingRoute();
    const data = markup.indexOf('class="living-data"');
    const representation = markup.indexOf('class="living-representation"');
    const deepmol = markup.indexOf('class="living-deepmol-study"');
    const fragments = markup.indexOf('class="living-fragment-study"');
    const reinvent = markup.indexOf('class="living-reinvent-study"');
    const language = markup.indexOf('class="living-field living-field--late"');
    const conclusion = markup.indexOf('class="living-conclusion"');

    expect(data).toBeGreaterThan(-1);
    expect(data).toBeLessThan(representation);
    expect(representation).toBeLessThan(deepmol);
    expect(deepmol).toBeLessThan(fragments);
    expect(fragments).toBeLessThan(reinvent);
    expect(reinvent).toBeLessThan(language);
    expect(language).toBeLessThan(conclusion);
    expect(markup).toContain("Before a model, learn the language of the data.");
  });

  it("explains data cleaning and scope without treating counts as a result", () => {
    const markup = renderLivingRoute();
    const data = markup.match(/<section class="living-data"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(data).toContain("15,696");
    expect(data).toContain("14,487");
    expect(data).toContain("400–600");
    expect(data).toContain("1,209");
    expect(data).toContain("VALIDATE");
    expect(data).toContain("DEDUPLICATE");
    expect(data).toContain("invalid strings");
    expect(data).toContain("which distinct, parseable inputs will this experiment examine?");
    expect(data).toContain("not a removal tally");
    expect(data).toContain("separate experiments");
    expect(data).toContain("does not quantify a quality or performance lift");
    expect(data).not.toContain("15,696 → 500");
    expect(data).not.toContain("15,696 rows became 500");
  });

  it("shows Morgan as a feature view beside, not inside, the RNN sequence path", () => {
    const markup = renderLivingRoute();
    const representation = markup.match(/<figure class="living-representation-figure"[\s\S]*?<\/figure>/)?.[0] ?? "";
    const deepmol = markup.match(/<figure class="living-deepmol-figure"[\s\S]*?<\/figure>/)?.[0] ?? "";

    expect(representation).toContain("Morgan fingerprint");
    expect(representation).toContain("radius 2");
    expect(representation).toContain("128 bits");
    expect(representation).toContain("FEATURE VIEW · SEPARATE");
    expect(representation).toContain("does not feed the RNN");
    expect(representation).toContain("does not show Morgan features feeding the RNN");
    expect(representation).toContain("no experimental molecule");
    expect(deepmol).toContain("DeepMol CSVLoader");
    expect(deepmol).toContain("RNN MolecularGenerator");
    expect(deepmol).toContain("SMILES sequence");
    expect(deepmol).not.toContain("Morgan fingerprint");
  });

  it("presents DeepMol settings and owner-reported sample count as separate evidence", () => {
    const markup = renderLivingRoute();
    const deepmol = markup.match(/<figure class="living-deepmol-figure"[\s\S]*?<\/figure>/)?.[0] ?? "";

    expect(deepmol).toContain("10 epochs");
    expect(deepmol).toContain("batch size 64");
    expect(deepmol).toContain("500 generated SMILES samples");
    expect(deepmol).toContain("SEPARATE OWNER-REPORTED OUTPUT");
    expect(deepmol).toContain("no validity, uniqueness, or novelty claim");
    expect(deepmol).toContain("cannot establish that those settings produced the samples");
    expect(deepmol).not.toContain("500 valid");
    expect(deepmol).not.toContain("500 unique");
    expect(deepmol).not.toContain("500 novel");
    expect(deepmol).not.toContain("500 viable");
  });

  it("explains fragment work as a separate spatial question with only supported outcomes", () => {
    const markup = renderLivingRoute();
    const fragments = markup.match(/<section class="living-fragment-study"[\s\S]*?<\/section>/)?.[0] ?? "";
    const fragmentFigure = fragments.match(/<svg class="living-fragment-map"[\s\S]*?<\/svg>/)?.[0] ?? "";

    expect(fragments).toContain("with RDKit and Fragmenstein");
    expect(fragments).toContain("compatible fragments");
    expect(fragments).toContain("spatial or overlap reasoning");
    expect(fragments).toContain("fragment linking");
    expect(fragments).toContain("Some fragment-based workflows succeeded");
    expect(fragments).toContain("does not identify a particular candidate result");
    expect(fragments).toContain("cannot identify a candidate molecule or a particular successful result");
    expect(fragmentFigure).toContain("Fragment compatibility, spatial reasoning, and linking");
    expect(fragmentFigure).toContain("shapes are not molecular data or an experimental result");
    expect(fragments).not.toContain("KNN");
  });

  it("keeps REINVENT4 exploratory without inventing a cause or configuration", () => {
    const markup = renderLivingRoute();
    const reinvent = markup.match(/<section class="living-reinvent-study"[\s\S]*?<\/section>/)?.[0] ?? "";

    expect(reinvent).toContain("researched and attempted REINVENT4 as another generative approach");
    expect(reinvent).toContain("did not reach a completed generation within the available internship scope");
    expect(reinvent).toContain("REINVENT4 stayed exploratory.");
    expect(reinvent).toContain("does not show the setup, explain why the work stopped, or represent a molecular output");
    expect(reinvent).not.toContain("failed");
    expect(reinvent).not.toContain("configuration");
    expect(reinvent).not.toContain("May 2025 report");
  });

  it("closes with research-specific learning and handoff rather than repeating route cards", () => {
    const markup = renderLivingRoute();

    expect(markup).toContain("WHAT RESEARCH LEFT ME WITH");
    expect(markup).toContain("Research code");
    expect(markup).toContain("Experiment results and generated outputs");
    expect(markup).toContain("Written report and documentation");
    expect(markup).not.toContain("Three routes gave me three different kinds of evidence.");
    expect(markup).not.toContain("ROUTE ONE");
    expect(markup).not.toContain("ROUTE TWO");
    expect(markup).not.toContain("ROUTE THREE");
    expect(markup).not.toContain("May 2025 report");
  });
});
