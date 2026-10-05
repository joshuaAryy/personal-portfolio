import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectIdentities } from "./data";
import "./food-visuals.css";

const foodChapters = [
  { id: "overview", label: "PRODUCT" },
  { id: "logging", label: "LOGGING" },
  { id: "insights", label: "INSIGHTS" },
  { id: "search", label: "RETRIEVAL" },
  { id: "interface", label: "IN PRODUCT" },
  { id: "system", label: "ARCHITECTURE" },
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
    <figure className="food-system-map food-system-map--flagship" aria-labelledby="food-system-map-title" aria-describedby="food-system-map-description">
      <header className="food-system-map__heading">
        <p>FOOD TRACKER · ONE SEARCH TO ONE TRUSTWORTHY DAILY LOG</p>
        <strong>Find the food. Resolve nutrition. Keep the log.</strong>
        <span>Illustrative system flow · not a product screenshot</span>
      </header>
      <div className="food-system-map__layer food-system-map__layer--product">
        <h3>SEARCH, RETRIEVAL + LOGGING</h3>
        <ol className="food-system-map__upper-flow" aria-label="Food search and logging flow">
          <li>
            <span className="food-system-map__step" aria-hidden="true">01</span>
            <strong>Search in the app</strong>
            <span>Start with a meal or ingredient.</span>
          </li>
          <li>
            <span className="food-system-map__step" aria-hidden="true">02</span>
            <strong>Find and rank candidates · three paths, one ranked set</strong>
            <span>Exact / fuzzy / semantic → candidate pool → deterministic final order → select match</span>
          </li>
          <li>
            <span className="food-system-map__step" aria-hidden="true">03</span>
            <strong>Resolve nutrition · two authorities, one result</strong>
            <span>Selected food match → trusted food data (catalog nutrient values) + serving rules (amount + unit conversion).</span>
            <strong className="food-system-map__resolved-title">RESOLVED NUTRITION VALUES</strong>
          </li>
          <li>
            <span className="food-system-map__step" aria-hidden="true">04</span>
            <strong>Record the result · save to the daily log</strong>
            <span className="food-system-map__log-title">TODAY · CANONICAL FOOD LOG</span>
            <div className="food-system-map__log-status" aria-label="Daily canonical food log status">
              <span><b>Selected food</b><strong>MATCHED</strong></span>
              <span><b>Serving</b><strong>RESOLVED</strong></span>
              <span><b>Nutrition</b><strong>SAVED</strong></span>
            </div>
            <span>Serving basis retained · entries can be edited.</span>
          </li>
        </ol>
      </div>
      <div className="food-system-map__layer food-system-map__layer--foundation">
        <h3>DATA FOUNDATION · MOBILE TO INSIGHT</h3>
        <p className="food-system-map__foundation-summary">A saved serving basis connects the app to the nutrition people revisit.</p>
        <ol className="food-system-map__foundation-flow" aria-label="Food Tracker data foundation">
          <li><span className="food-system-map__step" aria-hidden="true">01</span><strong>MOBILE APP · React Native / Expo</strong><span>Records the chosen food and serving.</span></li>
          <li><span className="food-system-map__step" aria-hidden="true">02</span><strong>API + DATA · Express / Prisma</strong><span>Receives the entry and shared domain rules.</span></li>
          <li><span className="food-system-map__step" aria-hidden="true">03</span><strong>FOOD AUTHORITY</strong><span>Normalized food catalog + backend serving resolution.</span></li>
          <li><span className="food-system-map__step" aria-hidden="true">04</span><strong>PERSISTED LOG · PostgreSQL food log</strong><span>Stores the food entry and serving snapshot.</span></li>
          <li><span className="food-system-map__step" aria-hidden="true">05</span><strong>HISTORY + INSIGHTS</strong><span>Saved entries; portion edits use the retained basis.</span></li>
        </ol>
        <p className="food-system-map__authority-footer">Pinecone supplies semantic candidates; deterministic evaluation ranks the union; catalog + serving rules set nutrition; unknown nutrition is not zero.</p>
        <p className="food-system-map__foundation-footer">NORMALIZED FOOD AUTHORITY · STORED SERVING BASIS · EDITABLE HISTORY</p>
      </div>
      <figcaption className="food-system-map__sr-only">
        <span id="food-system-map-title">Food Tracker system map.</span>
        <span id="food-system-map-description">Illustrative composite system figure, not a product screenshot. Search gathers exact, fuzzy, and semantic candidates into a pool; deterministic evaluation orders the union and selects the match. Two authorities resolve nutrition: trusted food data supplies catalog nutrient values, while serving rules convert the amount and unit into resolved values. The daily canonical food log records matched food, resolved serving, and saved nutrition; the serving basis is retained and entries remain editable. The data foundation runs from the mobile app through Express and Prisma shared domain rules to normalized catalog and backend serving resolution, PostgreSQL food entry and serving snapshot, and saved History and Insights entries whose portion edits use the retained basis.</span>
      </figcaption>
    </figure>
  );
}

function FoodProductFlow() {
  return (
    <figure className="food-product-flow" aria-labelledby="food-product-flow-title">
      <ol className="food-product-flow__stages" aria-label="Product path stages">
        <li><span className="food-product-flow__step" aria-hidden="true">01</span><strong>Log a meal</strong><span>Quick entry.</span></li>
        <li><span className="food-product-flow__step" aria-hidden="true">02</span><strong>Match the food</strong><span>Search proposes candidates.</span></li>
        <li><span className="food-product-flow__step" aria-hidden="true">03</span><strong>Resolve a serving</strong><span>Trusted food data and serving rules set nutrition.</span></li>
        <li><span className="food-product-flow__step" aria-hidden="true">04</span><strong>Keep history</strong><span>Record a canonical log entry.</span></li>
      </ol>
      <figcaption id="food-product-flow-title" className="food-product-flow__caption">Food Tracker product path. Schematic, not an app screen.</figcaption>
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
          <div
            className="food-benchmark__split"
            key={set.name}
          >
            <h3>{set.name} · {set.queries} QUERIES</h3>
            <p className="food-benchmark__definition">Top-1 means the correct food ranked first. Bars show share.</p>
            <div className="food-benchmark__bar-row">
              <span>LEGACY BASELINE</span>
              <div aria-hidden="true">
                <i style={{ width: `${(set.legacy.top1 / set.queries) * 100}%` }} />
              </div>
              <strong>{set.legacy.top1}/{set.queries}</strong>
            </div>
            <div className="food-benchmark__bar-row food-benchmark__bar-row--hybrid">
              <span>FULL HYBRID</span>
              <div aria-hidden="true">
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
          </div>
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
      <div
        className="food-retrieval-flow__diagram"
        role="img"
        aria-label="Food retrieval flow: a query branches into deterministic, fuzzy, and semantic candidates. The candidates are combined, deterministically evaluated, then ranked. Pinecone supplies candidates only."
      >
        <div className="food-retrieval-flow__query">USER QUERY</div>
        <span className="food-retrieval-flow__arrow" aria-hidden="true">→</span>
        <div className="food-retrieval-flow__sources">
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

function FoodLoggingPaths() {
  return (
    <section className="food-section food-logging" id="food-logging" aria-labelledby="food-logging-title">
      <div className="food-logging__intro">
        <p className="food-section-label">LOGGING PATHS</p>
        <h2 id="food-logging-title">One meal, several ways to get started.</h2>
        <p>Each route moves toward the same useful check: confirm the food and portion before the entry is saved.</p>
      </div>
      <ol className="food-logging__paths">
        {[
          ["MANUAL", "Find a food and choose the serving that matches the meal."],
          ["SAVED / RECENT", "Reuse a food and serving already in the log."],
          ["BARCODE", "Scan packaged food to find a catalog match."],
          ["TEXT", "Describe an item, then review the returned suggestion."],
          ["PHOTO", "Review visible-food suggestions; any estimate stays low-trust and editable."],
        ].map(([label, detail]) => (
          <li key={label}><strong>{label}</strong><span>{detail}</span></li>
        ))}
      </ol>
      <div className="food-logging__connectors" aria-hidden="true" />
      <div className="food-logging__review">
        <span>REVIEW BEFORE SAVE</span>
        <strong>Check the food and portion. A supplied catalog match uses backend food and serving rules; a photo estimate is an editable, low-trust starting point that can be changed or excluded.</strong>
      </div>
    </section>
  );
}

function FoodInsights() {
  return (
    <section className="food-section food-insights" id="food-insights" aria-labelledby="food-insights-title">
      <div className="food-insights__intro">
        <p className="food-section-label">INSIGHTS</p>
        <h2 id="food-insights-title">Turn saved logs into a view of patterns over time.</h2>
        <p>The product aggregates logged nutrients and keeps data coverage visible before people choose how much detail to explore.</p>
      </div>
      <ol className="food-insights__flow" aria-label="Insights data flow">
        <li><strong>Logged Items</strong><span>Foods and serving choices</span></li>
        <li><strong>Nutrient Aggregation</strong><span>Totals from saved logs</span></li>
        <li><strong>Coverage</strong><span>Missing data stays visible</span></li>
      </ol>
      <div className="food-insights__levels">
        <article>
          <h3>Simple / Focused Overview</h3>
          <p>A clear daily view over the same logged foods and nutrition.</p>
        </article>
        <article>
          <h3>Complex / Range Comparison</h3>
          <p>Open nutrient detail and compare selected time ranges.</p>
        </article>
        <article>
          <h3>Saved Views</h3>
          <p>Return to a chosen analysis without changing the underlying log.</p>
        </article>
      </div>
      <p className="food-insights__coverage"><strong>Unknown nutrition stays unknown.</strong></p>
      <p className="food-insights__footer">ONE PRODUCT · ONE BACKEND · DIFFERENT LEVELS OF DETAIL</p>
    </section>
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
        const activationOffset = window.innerWidth <= 520 ? 100 : 78;
        const activationLine = rootTop + activationOffset;
        let nextChapter: FoodChapterId = "overview";
        const atStoryEnd = mainIsScroller
          ? main.scrollTop + main.clientHeight >= main.scrollHeight - 2
          : window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 2;

        if (atStoryEnd) {
          nextChapter = foodChapters[foodChapters.length - 1].id;
        } else {
          for (const chapter of foodChapters) {
            const section = document.getElementById(`food-${chapter.id}`);
            if (section && section.getBoundingClientRect().top <= activationLine + 1) {
              nextChapter = chapter.id;
            }
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
              <img src={projectIdentities["food-tracker"].mark} alt="" />
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

        <FoodLoggingPaths />

        <FoodInsights />

        <section className="food-section food-search" id="food-search">
          <p className="food-section-label">WHY FOOD SEARCH IS HARD</p>
          <FoodRetrievalFlow />
        </section>

        <section
          className="food-section food-interface"
          id="food-interface"
          aria-labelledby="food-interface-title"
        >
          <div className="food-interface__story">
            <p className="food-section-label">IN THE PRODUCT · MOBILE SEARCH</p>
            <h2 id="food-interface-title">
              One query can surface
              <br />
              several plausible foods.
            </h2>
            <p>
              The intended food needs to rank near the top before its serving
              and nutrition can be trusted. This earlier simulator capture
              shows that decision in the product.
            </p>
          </div>
          <figure className="food-interface__capture">
            <img
              src="/media/case-studies/food-tracker-search-banana-earlier-ui.png"
              alt="Earlier Food Tracker mobile interface showing a banana query and candidate food results."
              width="368"
              height="800"
            />
            <figcaption>
              EARLIER QA SIMULATOR CAPTURE · BANANA SEARCH
            </figcaption>
          </figure>
        </section>

        <section className="food-section food-system" id="food-system">
          <p className="food-section-label">ARCHITECTURE + DATA FOUNDATION</p>
          <FoodSystemMap />
          <p className="food-system__architecture-note">
            <strong>React Native / Expo</strong> sends the chosen food and serving to
            <strong> Express / Prisma</strong>. Food records are normalized into one
            trusted catalog; backend serving resolution writes a
            <strong> PostgreSQL</strong> food log with a serving snapshot that supports
            later portion edits in History and Insights.
          </p>
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
                The serving basis is retained so a later portion edit can be
                recalculated. Unknown nutrition stays unknown.
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
            Search finds a candidate; trusted reference data and backend serving
            conversion define what gets logged. The saved serving snapshot
            supports later portion edits. Separating those jobs made the product
            easier to reason about and trust.
          </p>
          <small>
            Simple and Complex are presentation levels over one product and backend.
          </small>
        </section>
      </article>
    </>
  );
}
