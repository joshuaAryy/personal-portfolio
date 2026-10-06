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

  it("shows how SMILES input becomes generated strings without turning a count into molecular evidence", () => {
    const markup = renderLivingRoute();
    const figure = markup.match(/<figure class="living-deepmol-figure"[^>]*>(.*?)<\/figure>/)?.[1] ?? "";

    expect(markup).toContain("DeepMol CSVLoader");
    expect(markup).toContain("RNN MolecularGenerator");
    expect(figure).toContain('aria-label="SMILES sequence route from experiment input through DeepMol and an RNN to generated strings"');
    expect(figure).toContain("SMILES sequence input");
    expect(figure).toContain("DeepMol CSVLoader");
    expect(figure).toContain("RNN MolecularGenerator");
    expect(figure).toContain("Generated SMILES output");
    expect(figure).toContain("WHAT THE COUNT CANNOT ESTABLISH");
    expect(figure.indexOf("SMILES sequence input")).toBeLessThan(figure.indexOf("DeepMol CSVLoader"));
    expect(figure.indexOf("DeepMol CSVLoader")).toBeLessThan(figure.indexOf("RNN MolecularGenerator"));
    expect(figure.indexOf("RNN MolecularGenerator")).toBeLessThan(figure.indexOf("Generated SMILES output"));
    expect(figure.indexOf("Generated SMILES output")).toBeLessThan(figure.indexOf("WHAT THE COUNT CANNOT ESTABLISH"));
    expect(markup).toContain('aria-label="Reported DeepMol run settings"');
    expect(markup).toContain("<strong>10</strong><span>epochs</span><strong>64</strong><span>batch size</span>");
    expect(figure).toContain('<strong class="living-sequence-count">500</strong>');
    expect(figure).toContain("Owner-reported samples from the DeepMol / RNN work.");
    expect(markup).toContain("Morgan fingerprint");
    expect(markup).toContain("radius 2");
    expect(markup).toContain("128 bits");
    expect(markup).not.toContain("May 2025 report attributes the 500-sample account to REINVENT4");
    expect(markup).not.toContain("500 valid");
    expect(markup).not.toContain("500 novel");
    expect(markup).not.toContain("500 unique");
    expect(markup).not.toContain("500 viable");
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
    expect(markup).toContain("generation was not achieved within the internship");
    expect(markup).toContain("I researched and attempted REINVENT4 as a separate generative route");
    expect(markup).toContain("inputs, configuration and reason are not established");
    expect(markup).not.toContain("KNN");
    expect(markup).not.toContain("REINVENT4 failed");
  });
});
