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
  it("surfaces Joshua's bounded backend and data contribution in the opening", () => {
    const markup = renderCrest();
    const heroStart = markup.indexOf('<section class="crest-section crest-hero"');
    const heroEnd = markup.indexOf("</section>", heroStart);
    const hero = markup.slice(heroStart, heroEnd);

    expect(hero).toContain("My backend/data work covered Policy Compliance Engine workflows, deterministic anomaly signals, policy retrieval, and part of preapproval.");
    expect(hero).toContain("Python/FastAPI transaction Q&amp;A over Mongo-backed data with Gemini responses; separate Node.js policy-PDF retrieval scripts.");
  });

  it("maps the workspace, Finance Q&A, and standalone policy-retrieval paths without merging them", () => {
    const markup = renderCrest();
    const start = markup.indexOf('<section class="crest-section crest-architecture"');
    const end = markup.indexOf("</section>", start);
    const architecture = markup.slice(start, end);
    const policyStart = markup.indexOf('<section class="crest-section crest-policy"');
    const policyEnd = markup.indexOf("</section>", policyStart);
    const policy = markup.slice(policyStart, policyEnd);

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
    expect(architecture).toContain("Separate prototype");
    expect(architecture).not.toContain("gemini-embedding-001");
    expect(architecture).not.toContain("policy_chunks");
    expect(policy).toContain("gemini-embedding-001");
    expect(policy).toContain("MongoDB Atlas · policy_chunks");
    expect(architecture).toContain("separate implementations");
    expect(architecture).toContain("does not establish one production topology");
  });

  it("establishes the transaction workflow and decision boundary", () => {
    const markup = renderCrest();

    expect(markup).toContain('id="crest-system"');
    expect(markup).toContain("One transaction. Two sources. Human review.");
    expect(markup).toContain("DETERMINISTIC SIGNALS");
    expect(markup).toContain("Deterministic rules");
    expect(markup).toContain("policy text supplies a second kind of context");
    expect(markup).toContain("a live connection to this review flow was not verified");
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
    expect(markup).toContain("Gemini interprets retrieved passages.");
    expect(markup).toContain("Deterministic finance and policy rules remain authoritative.");
    expect(markup).not.toContain("automated financial outcome");
    expect(policyFigure).toContain('class="crest-policy-evidence"');
    expect(policyFigure).toContain('class="crest-policy-divider"');
    expect(evidenceMarkup.indexOf("Gemini interprets retrieved passages.")).toBeLessThan(evidenceMarkup.indexOf(">+</span>"));
    expect(evidenceMarkup.indexOf(">+</span>")).toBeLessThan(evidenceMarkup.indexOf("DECISION AUTHORITY"));
    expect(evidenceMarkup).not.toContain("preapproval");
  });

  it("keeps anomaly signals rule-based instead of describing a fraud model", () => {
    const markup = renderCrest();

    expect(markup).toContain("anomaly heuristics surfaced review cues");
    expect(markup).not.toContain("ML fraud classifier");
  });

  it("keeps the split cue, Finance Q&A boundary, and close lesson within their scopes", () => {
    const markup = renderCrest();
    const architectureStart = markup.indexOf('<section class="crest-section crest-architecture"');
    const architectureEnd = markup.indexOf("</section>", architectureStart);
    const architecture = markup.slice(architectureStart, architectureEnd);
    const policyStart = markup.indexOf('<section class="crest-section crest-policy"');
    const policyEnd = markup.indexOf("</section>", policyStart);
    const policySection = markup.slice(policyStart, policyEnd);
    const splitStart = markup.indexOf('<figure class="crest-split-cue"');
    const splitEnd = markup.indexOf("</figure>", splitStart);
    const splitCue = markup.slice(splitStart, splitEnd);
    const takeawayStart = markup.indexOf('<section class="crest-section crest-takeaway"');
    const takeawayEnd = markup.indexOf("</section>", takeawayStart);
    const takeaway = markup.slice(takeawayStart, takeawayEnd);

    expect(architecture).toContain("FINANCE Q&amp;A · PARALLEL IMPLEMENTATION");
    expect(architecture).toContain("transactions_clean");
    expect(architecture).toContain("Answer text + chart data");
    expect(architecture).toContain("Finance Q&amp;A answers and reporting views are workspace capabilities");
    expect(architecture).toContain("policy-PDF lane is a standalone script prototype");
    expect(architecture).not.toContain("Joshua built");
    expect(splitCue).toContain("review cue");
    expect(splitCue).not.toContain("fraud detection");
    expect(takeaway).toContain("The challenge presentation ran over its allotted time. I learned to explain the decision path concisely: rules, policy context, then human review.");
  });

  it("shows the split-transaction heuristic as a review cue with no invented values", () => {
    const markup = renderCrest();
    const cueStart = markup.indexOf('class="crest-split-cue"');
    const cueEnd = markup.indexOf("</figure>", cueStart);
    const cue = markup.slice(cueStart, cueEnd);

    expect(cue.toLowerCase()).toContain("same employee + merchant + day");
    expect(cue).toContain("Each charge stays below the configured threshold");
    expect(cue).toContain("the grouped total reaches it");
    expect(cue).toContain("review cue");
    expect(cue).not.toMatch(/\$\s?\d/);
    expect(cue).not.toContain("fraud");
  });

  it("gives the mock preapproval queue its own human-reviewed sequence", () => {
    const markup = renderCrest();
    const start = markup.indexOf('<section class="crest-section crest-preapproval"');
    const end = markup.indexOf("</section>", start);
    const preapproval = markup.slice(start, end);

    expect(markup).toContain('href="#crest-preapproval"');
    expect(preapproval).toContain("Sample request templates");
    expect(preapproval).toContain("Budget + employee history");
    expect(preapproval).toContain("Gemini recommendation or template fallback");
    expect(preapproval).toContain("A person chooses Approve or Deny");
    expect(preapproval).toContain("Recorded locally");
    expect(preapproval).toContain("not live employee requests");
    expect(preapproval).toContain("not a live request feed or external approval service");
  });

  it("names the four-person challenge team and keeps Joshua's ownership bounded", () => {
    const markup = renderCrest();
    const teamStart = markup.indexOf('<section class="crest-section crest-team"');
    const teamEnd = markup.indexOf("</section>", teamStart);
    const team = markup.slice(teamStart, teamEnd);

    expect(team).toContain("four-person team");
    expect(team).toContain("I built Policy Compliance Engine workflows");
    expect(team).toContain("part of preapproval");
    expect(team).not.toContain("I built the frontend");
    expect(team).toContain("3RD PLACE");
    expect(team).toContain("BRIM FINANCIAL CHALLENGE");
  });
});
