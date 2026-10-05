import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectIdentities } from "./data";
import "./food-visuals.css";

const foodChapters = [
  { id: "overview", label: "PRODUCT" },
  { id: "logging", label: "LOGGING" },
  { id: "architecture", label: "SYSTEM" },
  { id: "insights", label: "INSIGHTS" },
  { id: "search", label: "RETRIEVAL" },
  { id: "evaluation", label: "EVALUATION" },
  { id: "validation", label: "VALIDATION" },
] as const;

type FoodChapterId = (typeof foodChapters)[number]["id"];

const evaluationSets = [
  {
    name: "DEVELOPMENT",
    queries: 80,
    baseline: { top1: 40, top3: 40, top5: 40 },
    hybrid: { top1: 71, top3: 72, top5: 72 },
  },
  {
    name: "HOLDOUT",
    queries: 40,
    baseline: { top1: 25, top3: 25, top5: 25 },
    hybrid: { top1: 27, top3: 28, top5: 28 },
  },
] as const;

function FoodLogLifecycle() {
  return (
    <figure className="food-log-lifecycle" aria-labelledby="food-log-lifecycle-title">
      <div className="food-log-lifecycle__sources" aria-label="Ways to start a food log">
        <article>
          <span className="food-figure__index">01 / INPUT</span>
          <h3>FIND OR REUSE</h3>
          <p>Manual entry, catalog search, recent or reusable foods, and barcode lookup.</p>
        </article>
        <article className="food-log-lifecycle__source--suggested">
          <span className="food-figure__index">02 / SUGGESTION</span>
          <h3>DESCRIBE OR PHOTOGRAPH</h3>
          <p>AI proposes foods and portions; it does not set trusted nutrition.</p>
        </article>
        <article>
          <span className="food-figure__index">03 / COMBINE</span>
          <h3>RECIPES + MIXED MEALS</h3>
          <p>Bundle ingredients while retaining a saved basis for the meal.</p>
        </article>
      </div>

      <div className="food-log-lifecycle__join" aria-hidden="true">
        <span>DIFFERENT STARTS · SHARED RULES</span>
      </div>

      <ol className="food-log-lifecycle__stages" aria-label="Shared food logging lifecycle">
        <li>
          <span className="food-figure__index">REVIEW</span>
          <strong>REVIEW THE FOOD + PORTION</strong>
          <p>Select, adjust, or exclude uncertain rows before saving.</p>
        </li>
        <li>
          <span className="food-figure__index">RESOLVE</span>
          <strong>BACKEND SERVING RESOLUTION</strong>
          <p>Shared rules apply the chosen amount and unit to trusted food data.</p>
        </li>
        <li className="food-log-lifecycle__stage--saved">
          <span className="food-figure__index">PERSIST</span>
          <strong>SAVED SERVING + NUTRITION SNAPSHOT</strong>
          <p>History keeps the serving basis; unknown nutrition stays unknown.</p>
        </li>
      </ol>

      <p className="food-log-lifecycle__history">
        <strong>History remains editable.</strong> Entries can be edited or removed. A snapshot-backed serving edit recalculates from its stored basis; recipe and mixed-meal edits have different constraints.
      </p>
      <figcaption id="food-log-lifecycle-title">
        Food logging lifecycle · an explanatory system figure, not a product screenshot.
      </figcaption>
    </figure>
  );
}

function FoodLoggingEvidence() {
  return (
    <figure className="food-app-evidence" aria-labelledby="food-logging-evidence-title">
      <div className="food-app-evidence__screens">
        <article className="food-app-evidence__screen">
          <span className="food-figure__index">PHASE 24 · CANONICAL CAPTURE</span>
          <img
            src="/media/case-studies/food-tracker/phase-24/ai-meal-review.png"
            alt="Food Tracker meal-review screen with proposed foods, serving controls, a provisional nutrition preview, and a Log selected action."
            loading="lazy"
          />
          <p>Review before saving: choose the foods and portions that belong in the log. This example meal was not saved during capture.</p>
        </article>
        <div className="food-app-evidence__context">
          <p className="food-section-label">THE HUMAN CHECKPOINT</p>
          <h3>An interpretation stays a proposal until the person reviews it.</h3>
          <p>
            Text or photo assistance can help identify likely foods and quantities. It does not silently write trusted nutrition into the log: the selected food and serving still pass through shared backend rules.
          </p>
          <p className="food-app-evidence__source-note">Authentic Phase 24 simulator capture · pre-redesign interface baseline</p>
        </div>
      </div>
      <figcaption id="food-logging-evidence-title">
        Product evidence · a review-before-save screen, not a claim that this example meal was logged.
      </figcaption>
    </figure>
  );
}

function FoodSystemMap() {
  return (
    <figure className="food-system-map" aria-labelledby="food-system-map-title">
      <div className="food-system-map__heading">
        <span className="food-figure__index">ONE PRODUCT · THREE TRUST BOUNDARIES</span>
        <p>Food sources enter through adapters. The API owns the rules. The database keeps the record used later.</p>
      </div>

      <div className="food-system-map__catalogs" aria-label="Food-data source families">
        <article>
          <span className="food-figure__index">LOOKUP SOURCES</span>
          <h3>Packaged + generic foods</h3>
          <p><strong>Open Food Facts</strong> supports packaged/barcode lookup; <strong>USDA FoodData Central</strong> supplies generic-food candidates.</p>
        </article>
        <article>
          <span className="food-figure__index">VERSIONED REFERENCE DATA</span>
          <h3>CNF · Ciqual · CoFID</h3>
          <p>Canadian Nutrient File 2026, Ciqual 2025, and CoFID 2021 are imported through pinned dataset definitions.</p>
        </article>
      </div>

      <div className="food-system-map__normalization" aria-label="Provider records are normalized before storage">
        <span className="food-system-map__connector" aria-hidden="true">↓</span>
        <div>
          <span className="food-figure__index">NORMALIZE + KEEP PROVENANCE</span>
          <strong>Provider-specific names, nutrient labels, and units map into one canonical food model.</strong>
          <p>Source provenance and dataset release stay attached to imported records; unavailable nutrients remain unknown.</p>
        </div>
        <span className="food-system-map__connector" aria-hidden="true">↓</span>
      </div>

      <div className="food-system-map__runtime" aria-label="Mobile app, API, and persisted data relationship">
        <article className="food-system-map__mobile">
          <span className="food-figure__index">PRESENTATION</span>
          <h3>React Native + Expo</h3>
          <p>Meal entry, review, History, and Simple/Complex Insights.</p>
        </article>
        <div className="food-system-map__link">
          <span>reviewed requests</span>
          <strong aria-hidden="true">↔</strong>
          <span>resolved logs + insight facts</span>
        </div>
        <article className="food-system-map__api">
          <span className="food-figure__index">RULES + AUTHORITY</span>
          <h3>Express + TypeScript API</h3>
          <p>Zod validates shared contracts; Prisma access applies user scope, serving resolution, deterministic nutrition, analytics, and recommendations.</p>
        </article>
        <div className="food-system-map__link food-system-map__link--data">
          <span>persist</span>
          <strong aria-hidden="true">↔</strong>
          <span>trusted records</span>
        </div>
        <article className="food-system-map__database">
          <span className="food-figure__index">CANONICAL RECORD</span>
          <h3>PostgreSQL</h3>
          <p>Food and nutrient data, source provenance, recipes, and user logs with serving and nutrition snapshots.</p>
        </article>
      </div>

      <p className="food-system-map__ai-boundary">
        <strong>AI suggests intent or portions; trusted food data and backend rules govern nutrition.</strong>
        <span>Search indexes can return candidates, but neither a model nor Pinecone becomes nutrition authority. Unknown is not zero.</span>
      </p>
      <figcaption id="food-system-map-title">
        Food system map · mobile presentation, API authority, and app-owned nutrition/history records.
      </figcaption>
    </figure>
  );
}

function FoodInsightsModel() {
  return (
    <figure className="food-insights-model" aria-labelledby="food-insights-model-title">
      <div className="food-insights-model__pipeline" aria-label="Shared data used by both presentation modes">
        <article>
          <span className="food-figure__index">SOURCE</span>
          <strong>SAVED FOOD LOGS</strong>
          <p>Food and serving/nutrition snapshots</p>
        </article>
        <article>
          <span className="food-figure__index">CALCULATE</span>
          <strong>DETERMINISTIC ANALYTICS + RECOMMENDATIONS</strong>
          <p>Progress, trends, and reviewable recommendations</p>
        </article>
        <article className="food-insights-model__coverage">
          <span className="food-figure__index">INTERPRET</span>
          <strong>COVERAGE STAYS VISIBLE</strong>
          <p>Recorded, partial, and unknown data stay distinct.</p>
        </article>
      </div>

      <p className="food-insights-model__split-label">ONE PRODUCT · DIFFERENT LEVELS OF DETAIL</p>
      <div className="food-insights-model__modes">
        <article className="food-insights-model__simple">
          <span className="food-figure__index">SIMPLE</span>
          <h3>Focused daily overview</h3>
          <p>Core progress, selected trends, and curated recommendations keep routine use quick.</p>
        </article>
        <article className="food-insights-model__complex">
          <span className="food-figure__index">COMPLEX</span>
          <h3>Deeper exploration</h3>
          <p>More nutrients, comparisons, custom ranges, coverage controls, and saved views.</p>
        </article>
      </div>

      <p className="food-insights-model__authority">
        The two modes share one app, backend, and data model. AI does not calculate analytics or decide recommendations.
      </p>
      <figcaption id="food-insights-model-title">
        Insights model · shared saved data and deterministic facts, presented at two depths.
      </figcaption>
    </figure>
  );
}

function FoodInsightsEvidence() {
  return (
    <figure className="food-insights-evidence" aria-labelledby="food-insights-evidence-title">
      <img
        src="/media/case-studies/food-tracker/phase-24/trend-configuration.png"
        alt="Food Tracker trend configuration with primary and comparison metrics, date range, data coverage, aggregation, visualization, target, and forecast controls."
        loading="lazy"
      />
      <div>
        <span className="food-figure__index">COMPLEX INSIGHTS · PHASE 24 CAPTURE</span>
        <h3>Make the question explicit before drawing the trend.</h3>
        <p>The configuration exposes the chosen metric, comparison, range, and data coverage. This is a setup capture, not a populated analytics result.</p>
        <p className="food-app-evidence__source-note">Authentic simulator evidence · pre-redesign interface baseline</p>
      </div>
      <figcaption id="food-insights-evidence-title">
        Insights evidence · configuration controls are real; this image does not show logged values or a generated report.
      </figcaption>
    </figure>
  );
}

function FoodRetrievalFlow() {
  return (
    <figure className="food-retrieval-flow" aria-labelledby="food-retrieval-title">
      <div className="food-retrieval-flow__query">
        <span className="food-figure__index">START</span>
        <strong>ONE FOOD QUERY</strong>
      </div>
      <div className="food-retrieval-flow__sources" aria-label="Candidate generation paths">
        <article>
          <span className="food-figure__index">MATCH</span>
          <strong>DETERMINISTIC</strong>
          <p>Direct and structured matches</p>
        </article>
        <article>
          <span className="food-figure__index">RECOVER</span>
          <strong>FUZZY</strong>
          <p>Near-text candidates</p>
        </article>
        <article className="food-retrieval-flow__semantic">
          <span className="food-figure__index">EXPAND</span>
          <strong>SEMANTIC CANDIDATES</strong>
          <p>Pinecone supplies candidates only.</p>
        </article>
      </div>
      <div className="food-retrieval-flow__rank">
        <span className="food-figure__index">COMBINE + ORDER</span>
        <strong>CANDIDATE UNION</strong>
        <span className="food-retrieval-flow__arrow" aria-hidden="true">→</span>
        <strong>DETERMINISTIC RANK</strong>
        <p>Rules decide final rank; a person selects the food before serving resolution.</p>
      </div>
      <div className="food-retrieval-flow__tradeoff">
        <span>SEARCH TRADE-OFF</span>
        <p>In my evaluation notes, semantic retrieval added substantial latency for little benchmark recovery.</p>
      </div>
      <figcaption id="food-retrieval-title">
        Retrieval flow · broad candidate generation, deterministic final ordering.
      </figcaption>
    </figure>
  );
}

function FoodBenchmark() {
  return (
    <figure className="food-benchmark" aria-labelledby="food-benchmark-title">
      <div className="food-benchmark__heading">
        <div>
          <span className="food-figure__index">OFFLINE SEARCH EVALUATION</span>
          <h3 id="food-benchmark-title">Did the intended food reach the top?</h3>
        </div>
        <p>Top-1 / Top-3 / Top-5 · correct food within the first 1, 3, or 5 results.</p>
      </div>
      <div className="food-benchmark__sets">
        {evaluationSets.map((set) => (
          <section className="food-benchmark__set" key={set.name} aria-label={`${set.name} query set`}>
            <h4>{set.name} · {set.queries} QUERIES</h4>
            <div className="food-benchmark__row">
              <span>LEGACY</span>
              <div className="food-benchmark__track" aria-hidden="true">
                <i style={{ width: `${(set.baseline.top1 / set.queries) * 100}%` }} />
              </div>
              <strong>{set.baseline.top1}/{set.queries}</strong>
            </div>
            <div className="food-benchmark__row food-benchmark__row--hybrid">
              <span>FULL HYBRID</span>
              <div className="food-benchmark__track" aria-hidden="true">
                <i style={{ width: `${(set.hybrid.top1 / set.queries) * 100}%` }} />
              </div>
              <strong>{set.hybrid.top1}/{set.queries}</strong>
            </div>
            <p className="food-benchmark__secondary">
              <span>TOP-3</span>{set.baseline.top3}/{set.queries} → {set.hybrid.top3}/{set.queries}
              <span>TOP-5</span>{set.baseline.top5}/{set.queries} → {set.hybrid.top5}/{set.queries}
            </p>
          </section>
        ))}
      </div>
      <figcaption>
        Offline search relevance, not live-user outcomes. Development improved sharply; the separate holdout moved modestly.
      </figcaption>
    </figure>
  );
}

function FoodValidationBoundary() {
  return (
    <div className="food-validation-boundary">
      <article>
        <span className="food-figure__index">01 / QUALITY</span>
        <h3>RELEVANCE</h3>
        <p>Code tests passed while search relevance was still poor. I made offline query evaluation a separate gate from code correctness.</p>
      </article>
      <article>
        <span className="food-figure__index">02 / INDEX</span>
        <h3>INDEX COMPLETENESS</h3>
        <p>A pagination bug left the search index partial or stale. I checked completeness separately from ranking quality.</p>
      </article>
      <article>
        <span className="food-figure__index">03 / RUNTIME</span>
        <h3>DATA SCOPE + RELEASE</h3>
        <p>Firebase identities map to app-owned user IDs; protected API routes derive record ownership on the server. The repository records validated Railway staging and a standalone iOS install. Paid Apple distribution remains deferred, and Android standalone validation is incomplete.</p>
      </article>
    </div>
  );
}

function FoodBuildLoop() {
  return (
    <div className="food-build-loop" aria-label="Joshua's recurring product and implementation workflow">
      <p className="food-section-label">HOW I STEERED THE WORK</p>
      <ol>
        <li><span>01</span><strong>Frame a product decision</strong><p>Turn a broad need into one bounded behavior and its constraints.</p></li>
        <li><span>02</span><strong>Set acceptance evidence</strong><p>Specify what tests, comparisons, or runtime states can prove it.</p></li>
        <li><span>03</span><strong>Delegate + integrate</strong><p>Use Codex/agents for substantial implementation, then inspect the actual output.</p></li>
        <li><span>04</span><strong>Revise from results</strong><p>Change direction when evaluation or a real failure contradicts the assumption.</p></li>
      </ol>
    </div>
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
        const activationOffset = window.innerWidth <= 520 ? 100 : 90;
        const activationLine = rootTop + activationOffset;
        const atStoryEnd = mainIsScroller
          ? main.scrollTop + main.clientHeight >= main.scrollHeight - 2
          : window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

        let nextChapter: FoodChapterId = "overview";
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
        <Link className="food-case-nav__back" to="/projects">‹ PROJECTS</Link>
        <span className="food-case-nav__breadcrumb">CASE STUDY / FOOD TRACKER</span>
      </nav>

      <article className="food-story-content food-story-content--rewrite">
        <section className="food-section food-rewrite__hero" id="food-overview">
          <div className="food-rewrite__hero-copy">
            <p className="food-rewrite__brand">
              <img src={projectIdentities["food-tracker"].mark} alt="" />
              <span>
                <strong>FOOD TRACKER</strong>
                <span>PRODUCT DIRECTION · SYSTEM ARCHITECTURE · EVALUATION</span>
              </span>
            </p>
            <h1>Simple food logs.<br />Trusted nutrition.</h1>
            <p className="food-rewrite__lead">
              I started Food Tracker for my own gym and nutrition routine: logging had to stay easy to repeat while the record still supported serious insight.
            </p>
            <p className="food-rewrite__ownership">
              I set product direction, architecture, workflows, and evaluation; Codex and AI agents supported substantial implementation.
            </p>
          </div>

          <aside className="food-rewrite__product-promise" aria-label="Product direction">
            <span className="food-figure__index">THE PRODUCT CHALLENGE</span>
            <h2>Make the daily log quick. Make its meaning dependable.</h2>
            <p>
              A match is only useful when its serving and nutrition resolve into a record people can revisit.
            </p>
            <div className="food-rewrite__shared-product">
              <strong>Simple and Complex share one app, backend, and data model.</strong>
              <span>One product, with room to choose how much detail to see.</span>
            </div>
          </aside>
        </section>

        <section className="food-section food-rewrite__chapter" id="food-logging" aria-labelledby="food-logging-title">
          <header className="food-rewrite__section-heading">
            <p className="food-section-label">01 / DAILY USE</p>
            <h2 id="food-logging-title">Several entry routes. One trustworthy log.</h2>
            <p>
              I shaped the workflow so different ways to start a meal converge on shared review and serving rules instead of duplicating nutrition math in each screen.
            </p>
          </header>
          <FoodLoggingEvidence />
          <FoodLogLifecycle />
        </section>

        <section className="food-section food-rewrite__chapter" id="food-architecture" aria-labelledby="food-architecture-title">
          <header className="food-rewrite__section-heading food-rewrite__section-heading--wide">
            <p className="food-section-label">02 / TRUSTED DATA + SYSTEM</p>
            <h2 id="food-architecture-title">Let one data foundation serve every way of logging.</h2>
            <p>
              Food Tracker brings packaged, generic, and versioned composition data into a shared model. The mobile app handles the interaction; the API resolves trusted nutrition and keeps history tied to what was logged.
            </p>
          </header>
          <FoodSystemMap />
        </section>

        <section className="food-section food-rewrite__chapter" id="food-insights" aria-labelledby="food-insights-title">
          <header className="food-rewrite__section-heading">
            <p className="food-section-label">03 / AFTER THE LOG</p>
            <h2 id="food-insights-title">Make the everyday view quick; keep the analytical question inspectable.</h2>
            <p>
              The same saved log supports daily progress, reports, comparison and deterministic recommendations. Simple and Complex change how much detail is presented, not which facts are authoritative.
            </p>
          </header>
          <FoodInsightsModel />
          <FoodInsightsEvidence />
        </section>

        <section className="food-section food-rewrite__chapter food-rewrite__retrieval" id="food-search" aria-labelledby="food-search-title">
          <header className="food-rewrite__section-heading food-rewrite__section-heading--wide">
            <p className="food-section-label">04 / FOOD RETRIEVAL</p>
            <h2 id="food-search-title">Search broadly. Keep the final ranking explainable.</h2>
            <p>
              An everyday log depends on finding the intended food, but “more AI” was not a ranking strategy. Deterministic, fuzzy, and semantic paths each addressed different candidate gaps.
            </p>
          </header>
          <FoodRetrievalFlow />
        </section>

        <section className="food-section food-rewrite__chapter food-rewrite__evaluation" id="food-evaluation" aria-labelledby="food-evaluation-title">
          <header className="food-rewrite__section-heading food-rewrite__section-heading--wide">
            <p className="food-section-label">05 / EVALUATION CHANGED THE DESIGN</p>
            <h2 id="food-evaluation-title">The development gain was real; the holdout stayed modest.</h2>
            <p>
              I defined a 120-query offline benchmark after correctness tests passed while relevance was still poor. Keeping 80 development queries separate from 40 holdout queries made the improvement and its limits visible.
            </p>
          </header>
          <FoodBenchmark />
          <p className="food-rewrite__evaluation-note">
            Most of the measured development improvement came from fuzzy retrieval. Semantic retrieval added substantial latency for little benchmark recovery, so I did not treat a more complex retrieval stack as automatically better.
          </p>
        </section>

        <section className="food-section food-rewrite__chapter food-rewrite__ending" id="food-validation" aria-labelledby="food-validation-title">
          <header className="food-rewrite__section-heading">
            <p className="food-section-label">06 / VALIDATION + OWNERSHIP</p>
            <h2 id="food-validation-title">Test the ranking, the index, and the release boundary as different problems.</h2>
            <p>
              A working endpoint could still return a stale index, and a passing test suite could still miss the food someone meant. Each failure needed its own evidence and correction.
            </p>
          </header>
          <FoodValidationBoundary />
          <FoodBuildLoop />
          <p className="food-rewrite__closing">
            The product is the complete path: interpret an entry, find a trusted food, resolve its serving, preserve the saved basis, and make the resulting history useful later.
          </p>
          <p className="food-rewrite__release-note">
            The pinned repository records validated Railway staging and a free-Xcode standalone iOS install, not a public launch. Paid Apple distribution and Android standalone validation remain outside that completed boundary.
          </p>
        </section>
      </article>
    </>
  );
}
