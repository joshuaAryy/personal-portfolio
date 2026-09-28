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
    expect(markup).toContain("TRANSACTION → RULES + RETRIEVED POLICY → HUMAN REVIEW");
    expect(markup).toContain("DETERMINISTIC FINANCE + POLICY RULES");
    expect(markup).toContain("RETRIEVED POLICY + GEMINI");
    expect(markup).toContain("A reviewer can move the request toward preapproval.");
    expect(markup).toContain("Anomaly signals are deterministic heuristics");
  });

  it("keeps the sample-data cue and challenge placement singular", () => {
    const markup = renderCrest();
    const heroEnd = markup.indexOf("</section>", markup.indexOf('id="crest-overview"'));

    expect(markup).toContain("SAMPLE DATA");
    expect(markup).toContain("3RD PLACE");
    expect(markup.indexOf("3RD PLACE")).toBeLessThan(heroEnd);
    expect(markup.match(/3RD PLACE/g)).toHaveLength(1);
  });

  it("shows the owner-reported policy retrieval path and role boundary", () => {
    const markup = renderCrest();

    expect(markup).toContain("POLICY PDF");
    expect(markup).toContain("EXTRACT + CHUNK");
    expect(markup).toContain("Gemini embedding-001 · 3,072-D");
    expect(markup).toContain("MongoDB Atlas · policy_chunks");
    expect(markup).toContain("GROUNDED PROMPT");
    expect(markup).toContain("Policy Compliance Engine");
    expect(markup).toContain("outside my ownership");
    expect(markup).not.toContain("automated financial outcome");
  });

  it("keeps anomaly signals rule-based instead of describing a fraud model", () => {
    const markup = renderCrest();

    expect(markup).toContain("Rule-based heuristics surface patterns");
    expect(markup).not.toContain("ML fraud classifier");
  });
});
