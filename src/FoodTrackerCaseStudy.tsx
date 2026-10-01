import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./food-visuals.css";

const foodChapters = [
  { id: "overview", label: "PRODUCT" },
  { id: "search", label: "SYSTEM" },
  { id: "evaluation", label: "RESULTS" },
  { id: "workflow", label: "LEARNING" },
  { id: "reflection", label: "CLOSE" },
] as const;

type FoodChapterId = (typeof foodChapters)[number]["id"];

const foodBenchmarkSets = [
  {
    name: "DEVELOPMENT",
    queries: 80,
    legacy: { top1: 40, top3: 40, top5: 40 },
    hybrid: { top1: 71, top3: 72, top5: 72 },
  },
  {
    name: "HOLDOUT",
    queries: 40,
    legacy: { top1: 25, top3: 25, top5: 25 },
    hybrid: { top1: 27, top3: 28, top5: 28 },
  },
] as const;

function FoodSystemMap() {
  return (
    <figure className="food-system-map food-system-map--flagship" aria-labelledby="food-system-map-title">
      <img
      className="food-system-map__illustration"
      src="/media/case-studies/food-system-pass-07.png"
      width="1432"
      height="380"
      alt="In-app food search gathers exact, fuzzy, and semantic candidates into one deterministic ranking. Trusted food data and serving rules resolve nutrition before an append-only daily log records the result."
      />
      <ol className="food-system-map__mobile-steps" aria-label="Food Tracker system path">
        <li>
          <strong>Search in the app</strong>
          <span>Start with a meal or ingredient.</span>
        </li>
        <li>
          <strong>Find and rank candidates</strong>
          <span>Exact, fuzzy, and semantic paths feed one deterministic ranking.</span>
        </li>
        <li>
          <strong>Resolve nutrition</strong>
          <span>Trusted food data and serving rules independently resolve nutrition.</span>
        </li>
        <li>
          <strong>Record the result</strong>
          <span>The append-only daily log preserves recorded history.</span>
        </li>
      </ol>
      <figcaption id="food-system-map-title" className="food-system-map__sr-only">
        Illustrative system flow, not a product screenshot: the app gathers food candidates, deterministic evaluation chooses their order, trusted catalog data and serving rules resolve nutrition, and the append-only canonical log records the result.
      </figcaption>
    </figure>
  );
}

function FoodProductFlow() {
  return (
    <figure className="food-product-flow" aria-label="Food Tracker product path schematic">
      <div className="food-product-flow__art">
        <img
          src="/media/case-studies/food-product-flow-pass-09-inset.png"
          width="884"
          height="222"
          alt="Schematic, not an app screen: log a meal, search food candidates, resolve nutrition through trusted food data and serving rules, then keep a canonical record."
        />
      </div>
      <ol className="food-product-flow__mobile-steps" aria-label="Product path stages">
        <li><strong>01 · Log a meal</strong><span>Quick entry.</span></li>
        <li><strong>02 · Match the food</strong><span>Search proposes candidates.</span></li>
        <li><strong>03 · Resolve a serving</strong><span>Trusted food data and serving rules set nutrition.</span></li>
        <li><strong>04 · Keep history</strong><span>Record a canonical log entry.</span></li>
      </ol>
    </figure>
  );
}

function FoodBenchmark() {
  return (
    <figure className="food-benchmark food-benchmark--flagship" aria-labelledby="food-benchmark-title">
      <figcaption id="food-benchmark-title" className="food-benchmark__title">
        OFFLINE SEARCH EVALUATION · FIRST RESULT
      </figcaption>
      <div className="food-benchmark__splits">
        {foodBenchmarkSets.map((set) => (
          <section
            className="food-benchmark__split"
            key={set.name}
            aria-label={`${set.name.toLowerCase()} query set`}
          >
            <h3>{set.name} · {set.queries} QUERIES</h3>
            <p className="food-benchmark__definition">Top-1 means the correct food ranked first.</p>
            <div className="food-benchmark__bar-row">
              <span>LEGACY BASELINE</span>
              <div role="img" aria-label={`Legacy baseline: ${set.legacy.top1} of ${set.queries}`}>
                <i style={{ width: `${(set.legacy.top1 / set.queries) * 100}%` }} />
              </div>
              <strong>{set.legacy.top1}/{set.queries}</strong>
            </div>
            <div className="food-benchmark__bar-row food-benchmark__bar-row--hybrid">
              <span>FULL HYBRID</span>
              <div role="img" aria-label={`Full hybrid: ${set.hybrid.top1} of ${set.queries}`}>
                <i style={{ width: `${(set.hybrid.top1 / set.queries) * 100}%` }} />
              </div>
              <strong>
                {set.hybrid.top1}/{set.queries} (+{set.hybrid.top1 - set.legacy.top1})
              </strong>
            </div>
            <p className="food-benchmark__secondary">
              Top-3&nbsp; {set.legacy.top3}/{set.queries} → {set.hybrid.top3}/{set.queries}
              <span>·</span>
              Top-5&nbsp; {set.legacy.top5}/{set.queries} → {set.hybrid.top5}/{set.queries}
            </p>
          </section>
        ))}
      </div>
      <p className="food-benchmark__scope">
        OFFLINE QUERY SETS · TOP-1/3/5 MEASURE SEARCH RELEVANCE, NOT LIVE-USER OUTCOMES
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
        <span>RETRIEVAL FLOW · CANDIDATE SOURCES ONLY</span>
        <strong>Search broadly. Rank deterministically.</strong>
      </figcaption>
      <div className="food-retrieval-flow__diagram" aria-label="Food query flows into deterministic, fuzzy, and semantic candidate sources. Candidates are joined, deterministically evaluated, then ranked.">
        <div className="food-retrieval-flow__query">USER QUERY</div>
        <span className="food-retrieval-flow__arrow" aria-hidden="true">→</span>
        <div className="food-retrieval-flow__sources" aria-label="Candidate generation paths">
          <span><strong>DETERMINISTIC</strong><small>Direct matches</small></span>
          <span><strong>FUZZY</strong><small>Near-text matches</small></span>
          <span><strong>SEMANTIC · PINECONE</strong><small>Candidate supply only</small></span>
        </div>
        <span className="food-retrieval-flow__arrow" aria-hidden="true">→</span>
        <div className="food-retrieval-flow__union">CANDIDATE UNION</div>
        <span className="food-retrieval-flow__arrow" aria-hidden="true">→</span>
        <div className="food-retrieval-flow__rank"><strong>DETERMINISTIC EVALUATION</strong><small>Rules decide rank</small></div>
        <span className="food-retrieval-flow__arrow" aria-hidden="true">→</span>
        <div className="food-retrieval-flow__final">
          <strong>FINAL RANK</strong>
          <span><b>1</b><i /><i className="food-retrieval-flow__final-line--long" /></span>
          <span><b>2</b><i /><i className="food-retrieval-flow__final-line--mid" /></span>
          <span><b>3</b><i /><i className="food-retrieval-flow__final-line--short" /></span>
        </div>
      </div>
      <div className="food-retrieval-flow__notes">
        <p>
          <span>SEARCH TRADE-OFF</span>
          I found semantic retrieval added substantial latency for little benchmark recovery.
        </p>
        <p>
          <span>AUTHORITY BOUNDARY</span>
          Pinecone supplies candidates only. Deterministic evaluation sets final rank; trusted food data supplies nutrition.
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
                <span>PRODUCT INITIATOR · SYSTEM DIRECTION · EVALUATION</span>
              </span>
            </p>
            <h1>
              Simple food logs.
              <br />
              Trusted nutrition.
            </h1>
            <p className="food-hero__intro">
              A mobile-first nutrition tracker for quick logging, reliable food
              search, serving conversion, recommendations, and long-term insight.
            </p>
            <p className="food-hero__principle">
              Quick logging stays simple; trusted food and serving details resolve underneath.
            </p>
            <p className="food-hero__motivation">
              MOTIVATED BY MY OWN GYM + NUTRITION ROUTINE.
            </p>
          </div>

          <div className="food-hero__system">
            <p className="food-eyebrow">THE PRODUCT CHALLENGE</p>
            <h2>A quick log still needs the right food and serving.</h2>
            <p className="food-hero__system-copy">
              Search surfaces candidates; trusted food data and backend serving
              conversion determine nutrition.
            </p>
            <FoodProductFlow />
          </div>
        </section>

        <section className="food-section food-search" id="food-search">
          <p className="food-section-label">WHY FOOD SEARCH IS HARD</p>
          <FoodRetrievalFlow />
        </section>

        <section className="food-section food-system" id="food-system">
          <FoodSystemMap />
        </section>

        <section className="food-section food-evaluation" id="food-evaluation">
          <p className="food-section-label">OFFLINE EVALUATION · DEVELOPMENT + HOLDOUT</p>
          <div className="food-evaluation-heading">
            <h2>Hybrid search put the intended food first more often.</h2>
            <p>
              Development improved sharply, the separate holdout moved up
              modestly. I broadened candidate search while keeping the final
              order deterministic.
            </p>
          </div>
          <FoodBenchmark />
        </section>

        <section className="food-section food-iteration" id="food-iteration">
          <p className="food-section-label">VALIDATION PRACTICE</p>
          <h2>Passing tests did not guarantee useful search.</h2>
          <div className="food-iteration__episodes">
            <article>
              <span className="food-iteration__number">01</span>
              <div>
                <h3>RELEVANCE</h3>
                <p>
                  My tests passed while search still missed foods. I added offline
                  query evaluation to measure relevance beside code correctness.
                </p>
              </div>
            </article>
            <article>
              <span className="food-iteration__number">02</span>
              <div>
                <h3>INDEX COMPLETENESS</h3>
                <p>
                  A pagination bug left the search index partial or stale. I
                  checked index completeness separately from whether the right
                  food was returned.
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
              WHAT SEARCH EVALUATION TAUGHT ME
            </p>
            <h2>Useful search means the right food appears first.</h2>
            <p>
              I measured whether the intended food ranked first, then weighed
              relevance gains against latency and the need to keep nutrition
              authoritative.
            </p>
            <p className="food-workflow__role">
              PRODUCT INITIATION · SEARCH EVALUATION · SYSTEM DESIGN
            </p>
          </div>
          <ol className="food-workflow__steps">
            {[
              "SET RELEVANCE TARGET",
              "WIDEN CANDIDATE SEARCH",
              "COMPARE QUALITY + LATENCY",
              "KEEP NUTRITION TRUSTED",
            ].map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="food-section food-reflection" id="food-reflection">
          <p className="food-section-label">WHAT I LEARNED</p>
          <h2>A useful match must resolve into trusted nutrition.</h2>
          <p>
            Search finds a candidate; trusted reference data and serving
            conversion define what gets logged. An append-only record keeps past
            days stable. Separating those jobs made the product easier to reason
            about and trust.
          </p>
          <small>
            PRODUCT RULE · SIMPLE TO LOG · TRUSTED UNDERNEATH
          </small>
        </section>
      </article>
    </>
  );
}
