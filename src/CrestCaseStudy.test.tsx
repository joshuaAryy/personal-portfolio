import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CrestCaseStudy from "./CrestCaseStudy";

const renderCrest = () =>
  renderToStaticMarkup(
    <MemoryRouter>
      <CrestCaseStudy />
    </MemoryRouter>,
  );

describe("Crest technical case study", () => {
  it("establishes the transaction workflow and decision boundary", () => {
    const markup = renderCrest();

    expect(markup).toContain('id="crest-system"');
    expect(markup).toContain("One transaction. Two sources. Human review.");
    expect(markup).toContain("DETERMINISTIC SIGNALS");
    expect(markup).toContain("Deterministic rules");
    expect(markup).toContain("retrieved policy context support review");
    expect(markup).toContain("HUMAN REVIEW");
    expect(markup).toContain("A reviewer weighs the context");
  });

  it("keeps the sample-data cue and challenge placement singular", () => {
    const markup = renderCrest();
    const systemStart = markup.indexOf('id="crest-system"');
    const teamStart = markup.indexOf('id="crest-team"');

    expect(markup).toContain("SAMPLE DATA");
    expect(markup).toContain("3RD PLACE");
    expect(markup.indexOf("3RD PLACE")).toBeGreaterThan(systemStart);
    expect(markup.indexOf("3RD PLACE")).toBeGreaterThan(teamStart);
    expect(markup.match(/3RD PLACE/g)).toHaveLength(1);
  });

  it("shows the owner-reported policy retrieval path and role boundary", () => {
    const markup = renderCrest();
    const policyFigureStart = markup.indexOf('<figure class="crest-policy-figure"');
    const policyFigureEnd = markup.indexOf("</figure>", policyFigureStart);
    const policyFigure = markup.slice(policyFigureStart, policyFigureEnd);
    const evidenceStart = policyFigure.indexOf('class="crest-policy-evidence"');
    const evidenceMarkup = policyFigure.slice(evidenceStart);

    expect(markup).toContain("POLICY PDF");
    expect(markup).toContain("EXTRACT + CHUNK");
    expect(markup).toContain("gemini-embedding-001");
    expect(markup).toContain("3,072 dimensions");
    expect(markup).toContain("MongoDB Atlas · policy_chunks");
    expect(markup).toContain("GROUNDED PROMPT");
    expect(markup).toContain("standalone prototype");
    expect(markup).toContain("a live endpoint or deployed workflow was not verified");
    expect(markup).toContain("Gemini interpreted the top retrieved passages.");
    expect(markup).toContain("Finance and policy rules remained authoritative.");
    expect(markup).toContain("Sample queue uses budget + employee history.");
    expect(markup).toContain("Gemini recommendation or template fallback");
    expect(markup).toContain("human approve/deny is recorded locally in the prototype");
    expect(markup).not.toContain("automated financial outcome");
    expect(policyFigure).toContain('class="crest-policy-evidence"');
    expect(policyFigure).toContain('class="crest-policy-divider"');
    expect(evidenceMarkup.indexOf("Gemini interpreted the top retrieved passages.")).toBeLessThan(evidenceMarkup.indexOf(">+</span>"));
    expect(evidenceMarkup.indexOf(">+</span>")).toBeLessThan(evidenceMarkup.indexOf("DETERMINISTIC RULES + SIGNALS"));
    expect(evidenceMarkup.indexOf("Finance and policy rules remained authoritative.")).toBeLessThan(evidenceMarkup.indexOf(">→</span>"));
    expect(evidenceMarkup.indexOf(">→</span>")).toBeLessThan(evidenceMarkup.indexOf("Sample queue uses budget + employee history."));
  });

  it("keeps anomaly signals rule-based instead of describing a fraud model", () => {
    const markup = renderCrest();

    expect(markup).toContain("anomaly heuristics surfaced review cues");
    expect(markup).not.toContain("ML fraud classifier");
  });
});
