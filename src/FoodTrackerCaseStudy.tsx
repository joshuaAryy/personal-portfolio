import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectIdentities } from "./data";
import "./food-visuals.css";

const foodChapters = [
  { id: "overview", label: "PRODUCT" },
  { id: "logging", label: "LOGGING" },
  { id: "architecture", label: "DATA" },
  { id: "insights", label: "INSIGHTS" },
  { id: "search", label: "SEARCH + EVAL" },
  { id: "validation", label: "RELEASE" },
] as const;

type FoodChapterId = (typeof foodChapters)[number]["id"];

const evaluationSets = [
  {
    name: "DEVELOPMENT",
    queries: 80,
    legacy: [40, 40, 40],
    hybrid: [71, 72, 72],
  },
  {
    name: "HOLDOUT",
    queries: 40,
    legacy: [25, 25, 25],
    hybrid: [27, 28, 28],
  },
] as const;

function FoodProductPath() {
  return (
    <figure className="food-product-path" aria-labelledby="food-product-path-title">
      <div className="food-product-path__stage">
        <span>01 / START</span>
        <strong>Make logging easy to repeat</strong>
        <p>Find, reuse, scan, describe, photograph, or combine food.</p>
      </div>
      <span className="food-product-path__arrow" aria-hidden="true">→</span>
      <div className="food-product-path__stage food-product-path__stage--resolve">
        <span>02 / RESOLVE</span>
        <strong>Keep the meaning dependable</strong>
        <p>A person reviews the food and portion; shared backend rules resolve it.</p>
      </div>
      <span className="food-product-path__arrow" aria-hidden="true">→</span>
      <div className="food-product-path__stage food-product-path__stage--history">
        <span>03 / RETURN</span>
        <strong>Make a longer view possible</strong>
        <p>Snapshot-backed logs support progress, analysis, and recommendations.</p>
      </div>
      <figcaption id="food-product-path-title">
        Product contract · lower-friction entry, a trustworthy record, and useful insight.
      </figcaption>
    </figure>
  );
}

function FoodLogTransaction() {
  return (
    <figure className="food-log-transaction" aria-labelledby="food-log-transaction-title">
      <div className="food-log-transaction__capture">
        <p className="food-figure__index">PRODUCT EVIDENCE / COMPLEX MODE</p>
        <img
          src="/media/case-studies/food-tracker/phase-24/ai-meal-review.png"
          alt="A Food Tracker meal-review screen with proposed food rows, editable servings, a provisional nutrition preview, and a Log selected action."
        />
        <p className="food-log-transaction__capture-note">
          368×800 iPhone QA capture from the pre-redesign baseline. The meal was reviewed but not saved; this is interaction evidence, not a populated user outcome.
        </p>
      </div>

      <div className="food-log-transaction__flow">
        <div className="food-log-transaction__entries">
          <div>
            <span>DIRECT</span>
            <strong>SEARCH + REUSE</strong>
            <p>Manual, catalog, recent, saved, and reusable foods.</p>
          </div>
          <div>
            <span>IDENTITY</span>
            <strong>BARCODE</strong>
            <p>Packaged-food lookup through Open Food Facts.</p>
          </div>
          <div className="food-log-transaction__entry--suggested">
            <span>INTERPRET</span>
            <strong>DESCRIBE OR PHOTOGRAPH</strong>
            <p>AI suggests food and quantity; it does not set trusted nutrition.</p>
          </div>
          <div>
            <span>COMBINE</span>
            <strong>RECIPES + MIXED MEALS</strong>
            <p>Reusable ingredients enter the same logging domain.</p>
          </div>
        </div>

        <div className="food-log-transaction__checkpoint">
          <span className="food-figure__index">HUMAN CHECKPOINT</span>
          <strong>Review, edit, or remove proposed rows before saving.</strong>
          <p>Choose the food and serving that belong in the log; uncertain rows do not bypass review.</p>
        </div>

        <ol className="food-log-transaction__commit" aria-label="Shared save path">
          <li>
            <span>01 / APPLY</span>
            <strong>Serving resolver</strong>
            <p>Shared backend serving resolution applies the chosen amount and unit.</p>
          </li>
          <li>
            <span>02 / KEEP</span>
            <strong>Nutrition snapshot</strong>
            <p>The saved log keeps a nutrition snapshot for its historical meaning.</p>
          </li>
          <li className="food-log-transaction__unknown">
            <span>03 / PRESERVE</span>
            <strong>Known stays known</strong>
            <p>Unknown remains unknown; it is not filled with zero.</p>
          </li>
        </ol>

        <p className="food-log-transaction__editable">
          <strong>The log can still be edited or deleted.</strong> Snapshot-backed serving changes recalculate from the stored basis; recipe and mixed-meal edits have different constraints.
        </p>

        <p className="food-log-transaction__fallback">
          <span>BOUNDED FALLBACK</span>
          A labeled, editable low-trust estimate can be requested for an unresolved text row; it does not become trusted catalog food.
        </p>
      </div>

      <figcaption id="food-log-transaction-title">
        Many entry routes converge on review, authoritative serving resolution, and a snapshot-backed log.
      </figcaption>
    </figure>
  );
}

function FoodDataContract() {
  return (
    <figure className="food-data-contract" aria-labelledby="food-data-contract-title">
      <div className="food-data-contract__sources">
        <section className="food-data-contract__source-group">
          <p className="food-figure__index">LOOKUP CANDIDATES</p>
          <div>
            <strong>Open Food Facts</strong>
            <span>packaged foods and barcode lookup</span>
          </div>
          <div>
            <strong>USDA FoodData Central</strong>
            <span>generic-food candidates</span>
          </div>
        </section>
        <section className="food-data-contract__source-group food-data-contract__source-group--datasets">
          <p className="food-figure__index">PINNED COMPOSITION DATA</p>
          <div className="food-data-contract__dataset-names">
            <strong>CNF 2026</strong>
            <strong>Ciqual 2025</strong>
            <strong>CoFID 2021</strong>
          </div>
          <span>versioned bulk datasets · normalized on import</span>
        </section>
      </div>

      <div className="food-data-contract__down" aria-hidden="true">↓</div>

      <div className="food-data-contract__normalization">
        <span className="food-figure__index">ADAPTER + NORMALIZE</span>
        <strong>Map names, nutrient keys, units, servings, and provenance into one domain model.</strong>
        <p>Source identity and release stay attached to normalized records; missing nutrient values stay absent.</p>
      </div>

      <div className="food-data-contract__down" aria-hidden="true">↓</div>

      <div className="food-data-contract__runtime">
        <div className="food-data-contract__client">
          <span className="food-figure__index">PRESENTATION</span>
          <strong>React Native + Expo</strong>
          <span>Simple and Complex</span>
        </div>
        <div className="food-data-contract__api">
          <span className="food-figure__index">SHARED RULES</span>
          <strong>Express + TypeScript API</strong>
          <span>shared TypeScript + Zod contracts · Prisma data access · serving resolver</span>
        </div>
        <div className="food-data-contract__database">
          <span className="food-figure__index">CANONICAL CATALOG</span>
          <strong>PostgreSQL food and nutrient catalog</strong>
          <span>normalized records · serving options · source provenance</span>
        </div>
      </div>

      <div className="food-data-contract__down food-data-contract__down--snapshot" aria-hidden="true">↓</div>

      <div className="food-data-contract__snapshot">
        <div className="food-data-contract__snapshot-heading">
          <span className="food-figure__index">ON SAVE / FOODLOGSERVINGSNAPSHOT</span>
          <strong>A choice becomes a historical basis.</strong>
        </div>
        <div className="food-data-contract__snapshot-fields" aria-label="Snapshot fields shown as categories, not an exact API payload">
          <span>food + source provenance</span>
          <span>basis quantity + unit</span>
          <span>requested serving</span>
          <span>resolution + multiplier</span>
          <span>nutrient basis + overrides</span>
        </div>
        <p>Later catalog changes do not silently rewrite what an earlier serving meant. Users may still edit or remove a log.</p>
      </div>

      <div className="food-data-contract__scale" aria-label="Reference catalog scale, not a user impact metric">
        <div><strong>12,363</strong><span>active foods</span></div>
        <b aria-hidden="true">×</b>
        <div><strong>277,341</strong><span>nutrient rows</span></div>
        <p>Reference catalog scale, not users or impact.</p>
      </div>

      <figcaption id="food-data-contract-title">
        Trusted-data architecture · adapters feed a normalized catalog; the API resolves servings before snapshot-backed history is saved.
      </figcaption>
    </figure>
  );
}

function FoodInsightPath() {
  return (
    <figure className="food-insight-path" aria-labelledby="food-insight-path-title">
      <div className="food-insight-path__inputs">
        <span className="food-figure__index">FACTS IN SCOPE</span>
        <strong>Food logs · weight logs · goals · local tracking day</strong>
        <p>Reports start from persisted records and a date range, not model-filled gaps.</p>
      </div>

      <div className="food-insight-path__question">
        <span className="food-figure__index">TWO DIFFERENT QUESTIONS</span>
        <div className="food-insight-path__states">
          <section>
            <span>LOGGING-DAY ELIGIBILITY</span>
            <strong>COMPLETE · PARTIAL · UNLOGGED</strong>
            <p>Was this day eligible for the selected analysis?</p>
          </section>
          <section className="food-insight-path__coverage">
            <span>METRIC COVERAGE</span>
            <strong>RECORDED · PARTIAL · UNKNOWN</strong>
            <p>Which values are actually present in the saved nutrition basis?</p>
          </section>
        </div>
        <p className="food-insight-path__separation">A logged day can still have an unknown nutrient.</p>
      </div>

      <div className="food-insight-path__rule">
        <span className="food-figure__index">DETERMINISTIC DOMAIN</span>
        <strong>Calculate metrics + recommendations from logs, goals, and coverage rules.</strong>
        <p>Analytics and recommendation facts are deterministic backend facts. AI does not fill missing values or decide recommendations.</p>
      </div>

      <div className="food-insight-path__presentations">
        <section className="food-insight-path__simple">
          <span>SIMPLE / CURATED DAILY READ</span>
          <strong>Calories · macros · weight · hydration · logging consistency</strong>
          <p>Quick progress, a focused set of views, and deterministic recommendations.</p>
        </section>
        <section className="food-insight-path__complex">
          <span>COMPLEX / DEEPER EXPLORATION</span>
          <strong>More nutrients · comparisons · coverage controls · custom ranges · saved views</strong>
          <p>Deeper reporting on the same app, history, API, and data model.</p>
        </section>
      </div>

      <figcaption id="food-insight-path-title">
        Insights model · one backend, multiple presentation depths, and missingness visible at both day and nutrient level.
      </figcaption>
    </figure>
  );
}

function FoodRetrievalEvidence() {
  return (
    <figure className="food-retrieval-evidence" aria-labelledby="food-retrieval-evidence-title">
      <div className="food-retrieval-evidence__querytypes">
        <div className="food-retrieval-evidence__query">
          <span className="food-figure__index">ILLUSTRATIVE QUERY TYPE</span>
          <strong>Exact / structured</strong>
          <p>Direct identity and provider-backed matches.</p>
        </div>
        <div className="food-retrieval-evidence__query food-retrieval-evidence__query--fuzzy">
          <span className="food-figure__index">MISSPELLING / NEAR NAME</span>
          <strong>Fuzzy retrieval</strong>
          <p>Recover close text when the typed name is imperfect.</p>
        </div>
        <div className="food-retrieval-evidence__query food-retrieval-evidence__query--semantic">
          <span className="food-figure__index">INTENT / DESCRIPTION</span>
          <strong>Semantic candidates</strong>
          <p>Pinecone expands the candidate set; it is a derived index.</p>
        </div>
      </div>

      <div className="food-retrieval-evidence__merge">
        <span aria-hidden="true">↓</span>
        <div>
          <span className="food-figure__index">MERGE CANDIDATES</span>
          <strong>Deterministic, domain-aware ranking</strong>
          <p>Evaluate identity, form, source, nutrition, and serving usability. A person selects the food before shared serving resolution.</p>
        </div>
        <aside>PostgreSQL remains the source of food and nutrition truth.</aside>
      </div>

      <div className="food-retrieval-evidence__results">
        <div className="food-retrieval-evidence__result-heading">
          <div>
            <span className="food-figure__index">OFFLINE SEARCH EVALUATION</span>
            <h3>Did the intended food reach the top?</h3>
          </div>
          <p>Top-1 · Top-3 · Top-5 = correct food within the first 1, 3, or 5 results.</p>
        </div>

        <div className="food-retrieval-evidence__sets">
          {evaluationSets.map((set) => (
            <section className="food-retrieval-evidence__set" key={set.name} aria-label={`${set.name} query results`}>
              <header>
                <strong>{set.name}</strong>
                <span>{set.queries} queries</span>
              </header>
              <div className="food-retrieval-evidence__column-headings" aria-hidden="true">
                <span>METHOD</span><span>TOP-1</span><span>TOP-3</span><span>TOP-5</span>
              </div>
              {[{ label: "Legacy", values: set.legacy }, { label: "Full hybrid", values: set.hybrid }].map((row) => (
                <div className="food-retrieval-evidence__metric-row" key={row.label}>
                  <strong>{row.label}</strong>
                  {row.values.map((value, index) => (
                    <span className={row.label === "Full hybrid" ? "food-retrieval-evidence__gain" : undefined} key={`${row.label}-${index}`}>
                      {value}/{set.queries}
                    </span>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>

        <div className="food-retrieval-evidence__finding">
          <strong>Evaluation changed the design.</strong>
          <p>Fuzzy retrieval drove most of the measured gain. Semantic retrieval added substantial latency for little benchmark recovery, so the richer model path stayed bounded.</p>
        </div>
      </div>

      <figcaption id="food-retrieval-evidence-title">
        Hybrid retrieval · candidate breadth feeds a deterministic ranker. Offline ranking evidence, not live-user outcomes; the fuzzy-only miss-recovery count is omitted because the records conflict.
      </figcaption>
    </figure>
  );
}

function FoodEvidenceGates() {
  return (
    <div className="food-evidence-gates">
      <div className="food-evidence-gates__checks">
        <article>
          <span>01 / RELEVANCE</span>
          <h3>Correct code can still rank the wrong food.</h3>
          <p>Search tests passed while retrieval quality was poor; offline query evidence became a separate gate.</p>
        </article>
        <article>
          <span>02 / COMPLETENESS</span>
          <h3>A relevant rank can still come from a partial index.</h3>
          <p>A pagination bug once left the derived search index partial or stale. Index completeness needed its own check.</p>
        </article>
        <article>
          <span>03 / RUNTIME + OWNERSHIP</span>
          <h3>Validate the running product and its data boundary.</h3>
          <p>Firebase identifies the caller; the API derives the app-owned UUID and scopes data server-side.</p>
        </article>
      </div>

      <div className="food-evidence-gates__release">
        <div className="food-evidence-gates__runtime">
          <span className="food-figure__index">PINNED PROJECT RECORD</span>
          <strong>Railway staging and a standalone iOS installation were validated.</strong>
          <p>This is not evidence of a public launch. Paid Apple distribution and Android standalone validation remain incomplete.</p>
        </div>
        <div className="food-evidence-gates__limit">
          <span className="food-figure__index">EVIDENCE LIMIT</span>
          <strong>Some photo checks remain open.</strong>
          <p>Photo candidate adjudication and some manual checks remain untested; no claim of exhaustive image-path validation.</p>
        </div>
      </div>

      <blockquote className="food-evidence-gates__lesson">
        <span>WHAT CHANGED IN MY PRACTICE</span>
        <p>I learned to ask what the evidence proves, then validate the ranking, index, and actual runtime separately.</p>
        <footer>A passing test, a complete index, and a useful product are three different claims.</footer>
      </blockquote>
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
        <section className="food-section food-rewrite__hero" id="food-overview" aria-labelledby="food-overview-title">
          <div className="food-rewrite__hero-copy">
            <p className="food-rewrite__brand">
              <img src={projectIdentities["food-tracker"].mark} alt="" />
              <span>
                <strong>FOOD TRACKER</strong>
                <span>PRODUCT · SYSTEM · EVALUATION</span>
              </span>
            </p>
            <h1 id="food-overview-title">Simple tracking.<br />Serious insight.</h1>
            <p className="food-rewrite__lead">
              I started Food Tracker for my own gym and nutrition routine: make daily logging easy to repeat, then keep the record dependable enough to support a longer view.
            </p>
            <p className="food-rewrite__ownership">
              I owned product direction, architecture, workflows, evaluation, and acceptance. I also coded and debugged parts of the product; Codex and AI agents implemented substantial product slices under my direction and review.
            </p>
          </div>
          <aside className="food-rewrite__promise" aria-label="The Food Tracker product path">
            <p className="food-figure__index">THE PRODUCT PATH</p>
            <FoodProductPath />
            <p className="food-rewrite__shared-product">
              <strong>Simple and Complex share one app, backend, and data model.</strong>
              <span>One product, with room to choose how much detail to see.</span>
            </p>
          </aside>
        </section>

        <section className="food-section food-rewrite__chapter" id="food-logging" aria-labelledby="food-logging-title">
          <header className="food-rewrite__section-heading">
            <p className="food-section-label">01 / THE DAILY LOG</p>
            <h2 id="food-logging-title">Many ways to begin. One reviewed record.</h2>
            <p>Manual entry, catalog search, reuse, barcode, text and photo suggestions, recipes, and mixed meals are different starts. Their serving math should converge on the same backend rules.</p>
          </header>
          <FoodLogTransaction />
        </section>

        <section className="food-section food-rewrite__chapter food-rewrite__data" id="food-architecture" aria-labelledby="food-architecture-title">
          <header className="food-rewrite__section-heading food-rewrite__section-heading--wide">
            <p className="food-section-label">02 / THE DATA CONTRACT</p>
            <h2 id="food-architecture-title">The chosen amount is part of the nutrition.</h2>
            <p>Provider values, serving conversions, and logged history cannot be treated as interchangeable. I shaped the data path so provenance survives normalization and the serving calculation is stored with the event.</p>
          </header>
          <FoodDataContract />
        </section>

        <section className="food-section food-rewrite__chapter food-rewrite__insights" id="food-insights" aria-labelledby="food-insights-title">
          <header className="food-rewrite__section-heading">
            <p className="food-section-label">03 / FROM LOG TO INSIGHT</p>
            <h2 id="food-insights-title">Show useful patterns without inventing completeness.</h2>
            <p>The same product supports a focused everyday read and deeper exploration. The difficult part was deciding when a day or a nutrient contains enough evidence to say something.</p>
          </header>
          <FoodInsightPath />
        </section>

        <section className="food-section food-rewrite__chapter food-rewrite__retrieval" id="food-search" aria-labelledby="food-search-title">
          <header className="food-rewrite__section-heading food-rewrite__section-heading--wide">
            <p className="food-section-label">04 / SEARCH AS A PRODUCT DECISION</p>
            <h2 id="food-search-title">Use more than one path to find food; keep the decision explainable.</h2>
            <p>Deterministic matching, typo recovery, and semantic candidates address different gaps. The evaluation showed that the most sophisticated route was not automatically the most useful.</p>
          </header>
          <FoodRetrievalEvidence />
        </section>

        <section className="food-section food-rewrite__chapter food-rewrite__ending" id="food-validation" aria-labelledby="food-validation-title">
          <header className="food-rewrite__section-heading">
            <p className="food-section-label">05 / VALIDATION + RELEASE BOUNDARY</p>
            <h2 id="food-validation-title">A passing test, a complete index, and a useful product are different claims.</h2>
            <p>Search correctness, index completeness, account isolation, and real runtime behavior needed separate evidence. A green check in one layer could not stand in for the rest.</p>
          </header>
          <FoodEvidenceGates />
        </section>
      </article>
    </>
  );
}
