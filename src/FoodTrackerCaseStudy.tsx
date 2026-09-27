import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./food-visuals.css";

const foodChapters = [
  { id: "overview", label: "SYSTEM" },
  { id: "search", label: "RETRIEVAL" },
  { id: "iteration", label: "VALIDATION" },
  { id: "workflow", label: "OWNERSHIP" },
  { id: "reflection", label: "TAKEAWAY" },
] as const;

type FoodChapterId = (typeof foodChapters)[number]["id"];

const foodSystemStages = [
  {
    number: "01",
    title: "MOBILE EXPERIENCE",
    detail: "Simple + Complex presentations share one food domain.",
  },
  {
    number: "02",
    title: "BACKEND SERVICES",
    detail: "Search, serving conversion, and logging.",
  },
  {
    number: "03",
    title: "REFERENCE CATALOG",
    detail: "12,363 active foods / 277,341 nutrient rows.",
  },
  {
    number: "04",
    title: "SERVING + NUTRIENTS",
    detail: "Backend resolves servings; catalog supplies nutrients.",
  },
  {
    number: "05",
    title: "CANONICAL LOG",
    detail: "The canonical food log stays immutable; unknown stays unknown.",
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

function FoodSystemMap() {
  return (
    <figure className="food-system-map" aria-labelledby="food-system-map-title">
      <figcaption id="food-system-map-title">
        MOBILE PRODUCT SYSTEM <span>·</span> TWO PRESENTATION LEVELS
      </figcaption>
      <ol className="food-system-map__stages">
        {foodSystemStages.map((stage) => (
          <li key={stage.number}>
            <span className="food-system-map__number">{stage.number}</span>
            <strong>{stage.title}</strong>
            <p>{stage.detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function FoodBenchmark() {
  return (
    <figure className="food-benchmark" aria-labelledby="food-benchmark-title">
      <figcaption id="food-benchmark-title" className="food-benchmark__title">
        OFFLINE RETRIEVAL BENCHMARK <span>·</span> RANKED RESULTS
      </figcaption>
      <div className="food-benchmark__splits">
        {foodBenchmarkSets.map((set) => (
          <section
            className="food-benchmark__split"
            key={set.name}
            aria-label={set.name.toLowerCase().includes("development") ? "Development query set" : "Holdout query set"}
          >
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
        REFERENCE CATALOG · 12,363 ACTIVE FOODS · 277,341 NUTRIENT ROWS · SCALE,
        NOT PRODUCT IMPACT
      </p>
    </figure>
  );
}

function FoodRetrievalFlow() {
  return (
    <figure
      className="food-retrieval-flow"
      aria-labelledby="food-retrieval-flow-title"
    >
      <figcaption id="food-retrieval-flow-title">
        <span>SEARCH DECISION</span>
        <strong>
          Union candidates before deterministic evaluation; Pinecone is one source.
        </strong>
      </figcaption>
      <ol aria-label="Candidate retrieval and final ranking stages">
        <li>USER QUERY</li>
        <li className="food-retrieval-flow__sources">
          <span>DETERMINISTIC CANDIDATES</span>
          <i className="food-retrieval-flow__join" aria-hidden="true">+</i>
          <span>FUZZY CANDIDATES</span>
          <i className="food-retrieval-flow__join" aria-hidden="true">+</i>
          <span>SEMANTIC CANDIDATES · PINECONE</span>
        </li>
        <li>CANDIDATE UNION</li>
        <li>DETERMINISTIC EVALUATOR</li>
        <li>FINAL RANK</li>
      </ol>
      <div className="food-retrieval-flow__notes">
        <p>
          <span>SEMANTIC PATH · OWNER INTERVIEW</span>
          Added substantial latency for little recovery in that benchmark.
        </p>
        <p>
          <span>AUTHORITY BOUNDARY</span>
          Pinecone supplies candidates only. Deterministic evaluation sets final
          rank; trusted food data sets nutrition values.
        </p>
      </div>
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

      <article className="food-story-content food-story-content--technical">
        <section className="food-section food-hero" id="food-overview">
          <div className="food-hero__opening">
            <p className="food-project-label">
              <img src="/media/profile/food-tracker-mark.svg" alt="" />
              <span>
                <strong>FOOD TRACKER</strong>
                <span>FLAGSHIP · MOBILE PRODUCT</span>
              </span>
            </p>
            <h1>
              Mobile food logging,
              <br />
              with search measured.
            </h1>
            <p className="food-hero__intro">
              I initiated the product, then led requirements, priorities,
              architecture direction, workflow, and evaluation.
            </p>
            <p className="food-hero__principle">
              Simple + Complex are presentations over one product and backend.
            </p>
          </div>

          <div className="food-hero__system">
            <p className="food-eyebrow">MOBILE PRODUCT · DATA + RETRIEVAL SYSTEM</p>
            <h2>Search supports a trusted food log.</h2>
            <p className="food-hero__system-copy">
              Search finds candidates; backend serving conversion and trusted
              food data determine nutrition values.
            </p>
            <p className="food-hero__catalog-scale">
              <strong>12,363</strong> active foods
              <span>/</span>
              <strong>277,341</strong> nutrient rows
              <small>CATALOG SCALE</small>
            </p>
          </div>
        </section>

        <FoodSystemMap />

        <section className="food-section food-search" id="food-search">
          <p className="food-section-label">SEARCH / EVALUATION</p>
          <div className="food-search__grid">
            <div className="food-search__story">
              <h2>Evaluation changed search architecture.</h2>
              <p>
                Development Top-1 rose from 40/80 to 71/80. Holdout moved from
                25/40 to 27/40; Top-3 and Top-5 reached 28/40. The smaller
                holdout gain kept the split visible.
              </p>
            </div>
            <FoodBenchmark />
          </div>
          <FoodRetrievalFlow />
        </section>

        <section className="food-section food-iteration" id="food-iteration">
          <p className="food-section-label">VALIDATION PRACTICE</p>
          <h2>Search quality and index state are separate correctness checks.</h2>
          <div className="food-iteration__episodes">
            <article>
              <span className="food-iteration__number">01</span>
              <div>
                <h3>TESTS DID NOT MEASURE RELEVANCE</h3>
                <p>
                  Automated tests passed while food search still missed intended
                  matches. Development and holdout queries made relevance visible
                  and informed broader candidate retrieval.
                </p>
              </div>
            </article>
            <article>
              <span className="food-iteration__number">02</span>
              <div>
                <h3>INDEX COMPLETENESS IS A SEPARATE CHECK</h3>
                <p>
                  One Pinecone pagination issue left partial or stale index
                  state. In a separate staging reindex, an inference-token quota
                  stopped a partial load; bounded 429 retries later completed
                  the 12,363-document rebuild.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="food-section food-boundaries" id="food-boundaries">
          <p className="food-section-label">DATA + SYSTEM AUTHORITIES</p>
          <h2>Keep intent, nutrition, and recorded history distinct.</h2>
          <div className="food-boundaries__rules">
            <article>
              <h3>INTENT INTERPRETATION</h3>
              <p>
                AI can interpret the food request; it does not decide nutrition
                values.
              </p>
            </article>
            <article>
              <h3>NUTRITION AUTHORITY</h3>
              <p>
                Trusted normalized food data and backend serving conversion set
                the numbers.
              </p>
            </article>
            <article>
              <h3>HISTORICAL INTEGRITY</h3>
              <p>
                The log is canonical. History stays immutable; unknown nutrition
                stays unknown.
              </p>
            </article>
          </div>
        </section>

        <section className="food-section food-workflow" id="food-workflow">
          <div className="food-workflow__story">
            <p className="food-section-label">
              PRODUCT OWNERSHIP + AI-ASSISTED IMPLEMENTATION
            </p>
            <h2>I kept product and architecture decisions owner-led.</h2>
            <p>
              Codex and AI agents provided substantial implementation
              assistance. I directed requirements, priorities, workflow,
              evaluation, debugging, and acceptance; generated changes still
              needed my architectural judgment.
            </p>
          </div>
          <ol className="food-workflow__steps">
            {[
              "BOUND THE TASK",
              "WRITE ACCEPTANCE",
              "EVALUATE BEHAVIOR",
              "REVIEW + ACCEPT",
            ].map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="food-section food-reflection" id="food-reflection">
          <p className="food-section-label">TECHNICAL TAKEAWAY</p>
          <h2>Reliability came from separating evidence, authority, and history.</h2>
          <p>
            Retrieval widened the candidate set. Deterministic evaluation
            ranked it. Trusted food data and backend serving conversion
            determined nutrition; the canonical log preserved what was
            recorded.
          </p>
          <small>
            Offline retrieval was evaluated on 80 development and 40 holdout
            queries.
          </small>
        </section>
      </article>
    </>
  );
}
