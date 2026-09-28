import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CrestCaseStudy from "./CrestCaseStudy";

describe("Crest technical case study", () => {
  it("makes the transaction decision path legible in the opening", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <CrestCaseStudy />
      </MemoryRouter>,
    );

    expect(markup).toContain('class="crest-hero__workflow"');
    expect(markup).toContain("TRANSACTION");
    expect(markup).toContain("DETERMINISTIC SIGNALS");
    expect(markup).toContain("POLICY CONTEXT");
    expect(markup).toContain("REVIEW + PREAPPROVAL");
  });

  it("keeps sample-data context and the single challenge placement in the opening", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <CrestCaseStudy />
      </MemoryRouter>,
    );
    const heroEnd = markup.indexOf("</section>", markup.indexOf('id="crest-overview"'));

    expect(markup).toContain("SAMPLE DATA");
    expect(markup).not.toContain("Sample values only; no customer or outcome data.");
    expect(markup).toContain("3RD PLACE");
    expect(markup.indexOf("3RD PLACE")).toBeLessThan(heroEnd);
    expect(markup.match(/3RD PLACE/g)).toHaveLength(1);
  });

  it("shows the distinct decision roles and owner-reported retrieval path", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <CrestCaseStudy />
      </MemoryRouter>,
    );

    expect(markup).toContain("DETERMINISTIC FINANCE + POLICY RULES");
    expect(markup).toContain("RETRIEVED POLICY + GEMINI");
    expect(markup).toContain("HUMAN REVIEW");
    expect(markup).toContain("REVIEW + PREAPPROVAL");
    expect(markup).toContain("GEMINI EMBEDDING-001");
    expect(markup).toContain("3,072-dimensional vectors");
    expect(markup).toContain("ATLAS VECTOR SEARCH");
    expect(markup).toContain("MongoDB Atlas · policy_chunks");
    expect(markup).toContain("SAMPLE DATA");
    expect(markup).toContain("FOUR-PERSON TEAM");
  });

  it("states the challenge placement once and keeps anomaly signals heuristic", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <CrestCaseStudy />
      </MemoryRouter>,
    );

    expect(markup.match(/3RD PLACE/g)).toHaveLength(1);
    expect(markup).toContain("not an ML fraud classifier");
  });
});
