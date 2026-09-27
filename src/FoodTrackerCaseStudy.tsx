import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./food-visuals.css";
const foodChapters = [
  { id: "overview", label: "OVERVIEW" },
  { id: "search", label: "SEARCH" },
  { id: "iteration", label: "ITERATION" },
  { id: "workflow", label: "WORKFLOW" },
  { id: "reflection", label: "REFLECTION" },
] as const;
type FoodChapterId = (typeof foodChapters)[number]["id"];

const foodProductAnatomyStages = [
  { title: "USER INTENT", detail: "A food or meal to record" },
  { title: "SEARCH", detail: "Ranked candidates surface" },
  {
    title: "TRUSTED FOOD DATA",
    detail: "Normalized nutrients stay authoritative",
  },
  { title: "SERVING CHOICE", detail: "Backend resolves amount + unit" },
  {
    title: "LOG",
    detail: "Canonical log; historical nutrition stays immutable",
  },
] as const;

const foodBenchmarkSets = [
  {
    name: "DEVELOPMENT · 80 QUERIES",
    legacy: ["40/80", "40/80", "40/80"],
    hybrid: ["71/80", "72/80", "72/80"],
  },
  {
    name: "HOLDOUT · 40 QUERIES",
    legacy: ["25/40", "25/40", "25/40"],
    hybrid: ["27/40", "28/40", "28/40"],
  },
] as const;

function FoodBenchmarkPlate() {
  return (
    <figure className="food-benchmark" aria-labelledby="food-benchmark-title">
      <figcaption id="food-benchmark-title" className="food-benchmark__title">
        OFFLINE RETRIEVAL BENCHMARK
      </figcaption>
      <div className="food-benchmark__splits">
        {foodBenchmarkSets.map((set) => (
          <section className="food-benchmark__split" key={set.name}>
            <h3>{set.name}</h3>
            <table>
              <thead>
                <tr>
                  <th scope="col">RETRIEVER</th>
                  <th scope="col">TOP-1</th>
                  <th scope="col">TOP-3</th>
                  <th scope="col">TOP-5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">LEGACY</th>
                  {set.legacy.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
                <tr className="food-benchmark__hybrid">
                  <th scope="row">FULL HYBRID</th>
                  {set.hybrid.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </section>
        ))}
      </div>
      <p className="food-benchmark__scale">
        REFERENCE CATALOG · 12,363 active foods · 277,341 nutrient rows · SCALE
        ONLY, NOT PRODUCT IMPACT
      </p>
    </figure>
  );
}

function FoodProductAnatomyPlate() {
  return (
    <figure
      className="food-product-anatomy"
      aria-labelledby="food-product-anatomy-title"
    >
      <figcaption
        className="food-product-anatomy__title"
        id="food-product-anatomy-title"
      >
        PRODUCT ANATOMY
      </figcaption>
      <ol className="food-product-anatomy__stages">
        {foodProductAnatomyStages.map((stage, index) => (
          <li key={stage.title}>
            <span className="food-product-anatomy__number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{stage.title}</span>
            <p>{stage.detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export default function FoodTrackerCaseStudy() {
  const [activeChapter, setActiveChapter] = useState<FoodChapterId>("overview");

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;

    let frame = 0;
    const updateChapter = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const overflowY = window.getComputedStyle(main).overflowY;
        const mainIsScroller = overflowY === "auto" || overflowY === "scroll";
        const rootTop = mainIsScroller ? main.getBoundingClientRect().top : 0;
        const activationLine = rootTop + 78;
        let nextChapter: FoodChapterId = "overview";

        for (const chapter of foodChapters) {
          const section = document.getElementById(`food-${chapter.id}`);
          if (section && section.getBoundingClientRect().top <= activationLine) {
            nextChapter = chapter.id;
          }
        }
        setActiveChapter(nextChapter);
      });
    };

    main.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("resize", updateChapter);
    updateChapter();

    return () => {
      main.removeEventListener("scroll", updateChapter);
      window.removeEventListener("scroll", updateChapter);
      window.removeEventListener("resize", updateChapter);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <nav className="food-case-nav" aria-label="Food Tracker case study">
        <div className="food-case-nav__chapters">
          {foodChapters.map((chapter) => (
            <a
              href={`#food-${chapter.id}`}
              aria-current={activeChapter === chapter.id ? "location" : undefined}
              key={chapter.id}
              onClick={() => setActiveChapter(chapter.id)}
            >
              {chapter.label}
            </a>
          ))}
        </div>
        <Link className="food-case-nav__back" to="/projects">
          ‹ PROJECTS
        </Link>
        <span className="food-case-nav__breadcrumb">CASE STUDY / FOOD TRACKER</span>
      </nav>

      <article className="food-story-content">
        <section className="food-section food-hero" id="food-overview">
          <div className="food-hero__opening">
            <p className="food-project-label">
              <strong>FOOD TRACKER</strong>
              <span>FLAGSHIP PROJECT</span>
            </p>
            <h1>Simple tracking,<br />serious insight.</h1>
            <p className="food-hero__intro">
              I started with my own gym nutrition: logging needed to feel quick,
              while search, serving, recommendations, and long-term insight had
              to earn my trust.
            </p>
            <p className="food-hero__principle">
              Simple and Complex are two presentation levels over the same
              backend.
            </p>
          </div>

          <div className="food-trust-summary">
            <p className="food-eyebrow">A SHORT PATH TO A TRUSTWORTHY LOG</p>
            <h2>Quick to enter. Careful underneath.</h2>
            <p className="food-trust-summary__principle">
              AI can help interpret intent; trusted food data and backend
              serving conversion define nutrition values.
            </p>
            <p className="food-trust-summary__sources">
              Canadian Nutrient File · Ciqual · CoFID · USDA FoodData Central ·
              Open Food Facts
            </p>
          </div>
        </section>

        <section className="food-section food-search" id="food-search">
          <p className="food-section-label">SEARCH / EVALUATION</p>
          <div className="food-search__grid">
            <div className="food-search__story">
              <h2>Benchmarking changed the architecture.</h2>
              <p>
                I measured retrieval on development and holdout queries before
                deciding where semantic search belonged. The benchmark made
                evaluation the authority.
              </p>
            </div>
            <FoodBenchmarkPlate />
          </div>
          <figure
            className="food-search__decision-figure"
            aria-labelledby="food-search__decision-title"
          >
            <figcaption
              className="food-search__decision-title"
              id="food-search__decision-title"
            >
              Candidate breadth first; ranking stays deterministic.
            </figcaption>
            <ol
              className="food-search__decision-flow"
              aria-label="Search retrieval and ranking stages"
            >
              <li>USER QUERY</li>
              <li className="food-search__decision-sources">
                <span>CANDIDATE SOURCES</span>
                <ul aria-label="Parallel candidate sources">
                  <li>DETERMINISTIC</li>
                  <li>FUZZY</li>
                  <li>SEMANTIC</li>
                </ul>
              </li>
              <li>CANDIDATE UNION</li>
              <li>DETERMINISTIC EVALUATOR</li>
              <li>FINAL RANK</li>
            </ol>
            <div className="food-search__decision-notes">
              <p>
                <span>SEMANTIC RETRIEVAL · OWNER INTERVIEW</span>
                Added substantial latency for little recovery in that benchmark.
              </p>
              <p>
                Pinecone supplies candidates only. Deterministic evaluation
                assigns final rank; trusted food data sets nutrition values.
              </p>
            </div>
          </figure>
          <FoodProductAnatomyPlate />
        </section>

        <section className="food-section food-iteration" id="food-iteration">
          <p className="food-section-label">ITERATION</p>
          <h2>A passing test suite wasn't the same as a useful search.</h2>
          <div className="food-iteration__episodes">
            <article>
              <span className="food-iteration__number">01</span>
              <div>
                <h3>GREEN TESTS, POOR RELEVANCE</h3>
                <p>
                  Automated tests passed while real food search still felt
                  wrong. I judged retrieval against development and holdout
                  queries instead of treating a passing suite as proof of
                  relevance.
                </p>
              </div>
            </article>
            <article>
              <span className="food-iteration__number">02</span>
              <div>
                <h3>INDEX STATE IS PART OF CORRECTNESS</h3>
                <p>
                  A Pinecone pagination issue once left partial or stale index
                  state. In a separate staging run, quota and rate-limit
                  behavior interrupted indexing.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="food-section food-boundaries" id="food-boundaries">
          <p className="food-section-label">ENGINEERING BOUNDARIES</p>
          <h2>Three rules keep the numbers honest.</h2>
          <div className="food-boundaries__rules">
            <article>
              <h3>NUTRITION AUTHORITY</h3>
              <p>
                AI may interpret food intent. Trusted normalized data and
                backend serving resolution determine nutrition values.
              </p>
            </article>
            <article>
              <h3>HISTORICAL INTEGRITY</h3>
              <p>
                A log is canonical. Historical nutrition stays immutable;
                unknown nutrition stays unknown.
              </p>
            </article>
            <article>
              <h3>SEARCH RANKING</h3>
              <p>
                Pinecone is a candidate source, not the final ranker. A
                deterministic evaluator sets the final order.
              </p>
            </article>
          </div>
        </section>

        <section className="food-section food-workflow" id="food-workflow">
          <div className="food-workflow__story">
            <p className="food-section-label">HOW MY WORKFLOW EVOLVED</p>
            <h2>I made implementation more deliberate.</h2>
            <p>
              Later, I gave Codex and AI agents bounded tasks with written
              specs, then set acceptance and regression checks and used
              independent review before integration.
            </p>
            <p>
              I retained product decisions, architecture direction, evaluation,
              debugging direction, and acceptance.
            </p>
          </div>
          <ol className="food-workflow__steps">
            {[
              "BOUND A TASK",
              "WRITE THE SPEC",
              "EVALUATE",
              "REVIEW INDEPENDENTLY",
            ].map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="food-section food-reflection" id="food-reflection">
          <p className="food-section-label">WHAT I TOOK FORWARD</p>
          <h2>Trust is what makes simple tracking possible.</h2>
          <p>
            I learned that the work behind a simple log is what lets me make the
            experience feel simple: nutrition stays explicit, history stays
            trustworthy, and the next step feels clear.
          </p>
          <small>
            I’m continuing frontend refinement and closing remaining product
            issues.
          </small>
        </section>
      </article>
    </>
  );
}
