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
  it("explains the objective, representation, and separate dataset scopes", () => {
    const markup = renderLivingRoute();

    expect(markup).toContain("Molecules need representation before generation.");
    expect(markup).toContain("15,696");
    expect(markup).toContain("14,487");
    expect(markup).toContain("400–600");
    expect(markup).toContain("curated experiment subsets");
    expect(markup).not.toContain("15,696 records → 500");
  });

  it("presents DeepMol as sequence work and preserves the output provenance limit", () => {
    const markup = renderLivingRoute();
    const figure = markup.match(/<figure class="living-deepmol-figure"[^>]*>(.*?)<\/figure>/)?.[1] ?? "";

    expect(markup).toContain("DeepMol CSVLoader");
    expect(markup).toContain("RNN MolecularGenerator");
    expect(figure).toContain("SMILES");
    expect(figure).toContain("RDKit parse and validity checks");
    expect(figure).toContain("reviewed duplicate strings");
    expect(figure).not.toContain("Morgan fingerprint");
    expect(markup).toContain("10 epochs");
    expect(markup).toContain("batch size 64");
    expect(markup).toContain("do not link these settings to the 500-sample account");
    expect(markup).toContain("500 generated SMILES samples");
    expect(markup).toContain("May 2025 report attributes the 500-sample account to REINVENT4");
    expect(markup).not.toContain("500 valid");
    expect(markup).not.toContain("500 novel");
  });

  it("gives fragment and REINVENT4 routes distinct purpose, outcome, and learning", () => {
    const markup = renderLivingRoute();
    const figure = markup.match(/<figure class="living-fragment-figure"[^>]*>(.*?)<\/figure>/)?.[1] ?? "";

    expect(markup).toContain("fragment linking and spatial workflows");
    expect(figure).toContain("CONCEPTUAL STRUCTURE SCHEMATIC");
    expect(figure).toContain("similarity");
    expect(figure).toContain("spatial / overlap reasoning");
    expect(markup).toContain("Some fragment workflows succeeded");
    expect(markup).toContain("I researched and attempted REINVENT4");
    expect(markup).toContain("did not reach a completed generation within the available internship scope");
    expect(markup).toContain("I researched and attempted REINVENT4 as a separate generative route");
    expect(markup).toContain("This remained an exploratory route, not a demonstrated generation workflow.");
    expect(markup).not.toContain("inputs, configuration and reason are not established");
    expect(markup).not.toContain("The figure does not diagnose the attempt");
    expect(markup).not.toContain("KNN");
    expect(markup).not.toContain("REINVENT4 failed");
  });
});
