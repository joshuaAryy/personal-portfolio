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
    expect(markup).toContain("DETERMINISTIC RULES");
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

    expect(markup).toContain("POLICY PDF");
    expect(markup).toContain("EXTRACT + CHUNK");
    expect(markup).toContain("Gemini embedding-001 · 3,072-D");
    expect(markup).toContain("MongoDB Atlas · policy_chunks");
    expect(markup).toContain("GROUNDED PROMPT");
    expect(markup).toContain("Gemini interpreted retrieved policy passages.");
    expect(markup).toContain("Finance and policy rules stayed deterministic and authoritative.");
    expect(markup).not.toContain("automated financial outcome");
  });

  it("keeps anomaly signals rule-based instead of describing a fraud model", () => {
    const markup = renderCrest();

    expect(markup).toContain("Rule-based heuristics surface patterns");
    expect(markup).not.toContain("ML fraud classifier");
  });
});
