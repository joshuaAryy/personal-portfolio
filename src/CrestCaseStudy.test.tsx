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
  it("maps the workspace, Finance Q&A, and standalone policy-retrieval paths without merging them", () => {
    const markup = renderCrest();
    const start = markup.indexOf('<section class="crest-section crest-architecture"');
    const end = markup.indexOf("</section>", start);
    const architecture = markup.slice(start, end);

    expect(markup).toContain('href="#crest-architecture"');
    expect(markup).toContain('id="crest-architecture"');
    expect(architecture).toContain('aria-label="Crest system architecture"');
    expect(architecture).toContain("Vercel frontend");
    expect(architecture).toContain("FastAPI /api/ask");
    expect(architecture).toContain("MongoDB Atlas");
    expect(architecture).toContain("transactions_clean");
    expect(architecture).toContain("Gemini");
    expect(architecture).toContain("Vultr");
    expect(architecture).toContain("STANDALONE NODE.JS SCRIPTS");
    expect(architecture).toContain("policy_chunks");
    expect(architecture).toContain("separate implementation paths");
    expect(architecture).toContain("does not establish one production deployment topology");
  });

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

  it("keeps the sample-data cue with an in-page demo action", () => {
    const markup = renderCrest();
    const start = markup.indexOf('<figure class="crest-demo-figure"');
    const end = markup.indexOf("</figure>", start) + "</figure>".length;
    const figure = markup.slice(start, end);

    expect.soft(figure).toContain('aria-labelledby="crest-demo-caption"');
    expect.soft(figure).toContain('<span id="crest-demo-caption">Expense review / policy context / preapproval</span>');
    expect(figure).toContain('aria-label="Play Crest demo in page"');
    expect(figure).not.toContain('href="https://www.youtube.com/watch?v=kiq6XjNi9J8"');
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

  it("keeps the split cue, Finance Q&A boundary, and close lesson within their scopes", () => {
    const markup = renderCrest();
    const financeStart = markup.indexOf('<figure class="crest-finance-workflow"');
    const financeEnd = markup.indexOf("</figure>", financeStart);
    const financeWorkflow = markup.slice(financeStart, financeEnd);
    const policyStart = markup.indexOf('<section class="crest-section crest-policy"');
    const policyEnd = markup.indexOf("</section>", policyStart);
    const policySection = markup.slice(policyStart, policyEnd);
    const ruleCardStart = policySection.indexOf('class="crest-policy-evidence__card crest-policy-evidence__card--rules"');
    const ruleCardEnd = policySection.indexOf("</article>", ruleCardStart);
    const ruleCard = policySection.slice(ruleCardStart, ruleCardEnd);
    const takeawayStart = markup.indexOf('<section class="crest-section crest-takeaway"');
    const takeawayEnd = markup.indexOf("</section>", takeawayStart);
    const takeaway = markup.slice(takeawayStart, takeawayEnd);

    expect(financeWorkflow).toContain("Finance questions → transaction-backed answers; reporting needs → report views. Separate from the standalone policy-PDF retrieval prototype.");
    expect(financeWorkflow).not.toContain("Joshua built");
    expect(ruleCard).toContain("Heuristic split cue: group by employee, merchant, day. Each charge is below threshold; combined total reaches it. Review only.");
    expect(ruleCard).not.toContain("fraud detection");
    expect(takeaway).toContain("The challenge presentation ran over its allotted time. I learned to explain the decision path concisely: rules, policy context, then human review.");
  });
});
