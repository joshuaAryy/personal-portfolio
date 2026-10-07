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

const foodLoggingRoutes = [
  {
    id: "search-reuse",
    label: "Search & reuse",
    eyebrow: "CATALOG + HISTORY",
    title: "Find a catalog food or return to one you have saved.",
    detail: "Search the catalog, or choose a recent or reusable food; confirm its serving before it enters the log.",
    icon: "search",
  },
  {
    id: "barcode",
    label: "Barcode",
    eyebrow: "PACKAGED FOOD",
    title: "Use a barcode to reach a packaged-food candidate.",
    detail: "Open Food Facts supplies a lookup candidate. A person still confirms the match and serving.",
    icon: "barcode",
  },
  {
    id: "describe-photo",
    label: "Describe or photo",
    eyebrow: "BOUNDED INTERPRETATION",
    title: "Let AI interpret a request, then review its proposal.",
    detail: "Gemini suggests food and quantity; a person reviews the rows before saving.",
    icon: "intent",
  },
  {
    id: "recipes-mixed",
    label: "Recipes & mixed meals",
    eyebrow: "COMBINE FOODS",
    title: "Reuse trusted foods inside a recipe or mixed meal.",
    detail: "Recipes build from saved foods; mixed meals can combine trusted and manual entries in the same logging domain.",
    icon: "combine",
  },
  {
    id: "manual",
    label: "Manual entry",
    eyebrow: "DIRECT ENTRY",
    title: "Enter a manual food when a catalog match is not right.",
    detail: "Keep missing nutrition unknown instead of filling it with zero; serving resolution still follows the chosen basis.",
    icon: "manual",
  },
] as const;

type FoodLoggingRouteId = (typeof foodLoggingRoutes)[number]["id"];

function FoodLoggingGlyph({ kind }: { kind: (typeof foodLoggingRoutes)[number]["icon"] }) {
  if (kind === "search") {
    return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><circle cx="13" cy="13" r="7" /><path d="m18 18 8 8" /></svg>;
  }
  if (kind === "barcode") {
    return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M5 7v18M9 7v18M13 7v18M18 7v18M22 7v18M27 7v18" /><path d="M4 5h24M4 27h24" /></svg>;
  }
  if (kind === "intent") {
    return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="m16 3 2.3 8.7L27 14l-8.7 2.3L16 25l-2.3-8.7L5 14l8.7-2.3L16 3Z" /><path d="m25 22 .8 3.2L29 26l-3.2.8L25 30l-.8-3.2L21 26l3.2-.8L25 22Z" /></svg>;
  }
  if (kind === "combine") {
    return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M6 7h20M6 13h20M6 19h14M6 25h14" /><path d="M24 19v8m-4-4h8" /></svg>;
  }
  return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="m7 22 12-12 5 5-12 12H7v-5Z" /><path d="m17 12 5 5M6 27h20" /></svg>;
}

function FoodLogTransaction() {
  const [activeRoute, setActiveRoute] = useState<FoodLoggingRouteId>("search-reuse");
  const selectedRoute = foodLoggingRoutes.find((route) => route.id === activeRoute)!;

  return (
    <div className="food-log-transaction food-log-transaction--editorial" data-active-method={activeRoute}>
      <section className="food-log-transaction__route-panel" aria-labelledby="food-log-routes-title">
        <p className="food-figure__index">CHOOSE A WAY TO START</p>
        <h3 id="food-log-routes-title">Different inputs. The same reviewed log.</h3>
        <div className="food-log-transaction__route-grid" role="group" aria-label="Food logging routes">
          {foodLoggingRoutes.map((route) => (
            <button
              className="food-log-transaction__route"
              type="button"
              aria-pressed={activeRoute === route.id}
              key={route.id}
              onClick={() => setActiveRoute(route.id)}
            >
              <FoodLoggingGlyph kind={route.icon} />
              <span>{route.label}</span>
            </button>
          ))}
        </div>
        <div className="food-log-transaction__method-detail" aria-live="polite" aria-atomic="true">
          <span>{selectedRoute.eyebrow}</span>
          <strong>{selectedRoute.title}</strong>
          <p>{selectedRoute.detail}</p>
        </div>
      </section>

      <div className="food-log-transaction__screens" role="group" aria-label="Phase 24 interaction captures">
        <figure className="food-log-transaction__screen" data-screen="entry">
          <img
            src="/media/case-studies/food-tracker/phase-24/food-log-complex-clean.png"
            alt="Phase 24 clean logging sheet with a food search field and visible Describe meal, Photo logging, Food Library, Recipes, Mixed meal, and Scan barcode entry options. No food has been saved."
          />
          <figcaption>Entry sheet · direct ways to find, reuse, combine, or describe food.</figcaption>
        </figure>
        <figure className="food-log-transaction__screen" data-screen="review">
          <img
            src="/media/case-studies/food-tracker/phase-24/ai-meal-review.png"
            alt="Phase 24 Describe meal review for eggs and toast with editable serving amounts, a provisional nutrition preview, and Log selected action. The meal is unsaved."
          />
          <figcaption>The Describe-meal review is unsaved; it is interaction evidence, not a populated user outcome.</figcaption>
        </figure>
      </div>
      <p className="food-log-transaction__source-note">368×800 iOS simulator captures from the pre-redesign baseline. Both show interaction states, not saved user history.</p>

      <div className="food-log-transaction__checkpoint">
        <span className="food-figure__index">HUMAN CHECKPOINT</span>
        <strong>Review, edit, or remove proposed rows before saving.</strong>
        <p>Choose the food and serving that belong in the log; uncertain suggestions do not bypass review.</p>
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
  );
}

function FoodSystemMap() {
  return (
    <figure className="food-system-map" aria-labelledby="food-system-map-title">
      <header className="food-system-map__heading">
        <p className="food-figure__index">ONE PRODUCT · THREE CONNECTED LAYERS</p>
        <h3 id="food-system-map-title">The mobile app, shared API rules, and nutrition record work as one system.</h3>
        <p>Simple and Complex share one mobile app, API, catalog, serving rules, and saved history; they change how much a person sees.</p>
      </header>

      <div className="food-system-map__columns">
        <section className="food-system-map__node food-system-map__node--client" aria-labelledby="food-system-map-client">
          <p className="food-figure__index">01 / MOBILE CLIENT</p>
          <h4 id="food-system-map-client">React Native + Expo</h4>
          <p>Simple for a quick daily read; Complex for deeper exploration.</p>
          <div className="food-system-map__node-detail">
            <span>ENTRY + REVIEW</span>
            <strong>Food requests and serving choices</strong>
          </div>
        </section>

        <span className="food-system-map__connector" aria-hidden="true">→</span>

        <section className="food-system-map__node food-system-map__node--api" aria-labelledby="food-system-map-api">
          <p className="food-figure__index">02 / API + DOMAIN RULES</p>
          <h4 id="food-system-map-api">Express + TypeScript API</h4>
          <p>Shared Zod contracts · Prisma access · server-owned decisions.</p>
          <ul className="food-system-map__rule-list">
            <li><strong>Find</strong><span>Deterministic retrieval + fuzzy retrieval; Pinecone supplies semantic candidates for deterministic final ranking.</span></li>
            <li><strong>Resolve</strong><span>Backend serving conversion and nutrition snapshots define the saved basis.</span></li>
            <li><strong>Analyze</strong><span>Persisted logs, weight, and goals feed deterministic analytics and recommendations.</span></li>
          </ul>
        </section>

        <span className="food-system-map__connector" aria-hidden="true">→</span>

        <section className="food-system-map__node food-system-map__node--store" aria-labelledby="food-system-map-store">
          <p className="food-figure__index">03 / PERSISTED SOURCE OF TRUTH</p>
          <h4 id="food-system-map-store">PostgreSQL</h4>
          <p>Normalized food and nutrient records, user logs, weight entries, and serving snapshots.</p>
          <div className="food-system-map__node-detail">
            <span>DERIVED SEARCH INDEX</span>
            <strong>Pinecone supplies candidates; it is not nutrition truth or the final ranker.</strong>
          </div>
        </section>
      </div>

      <div className="food-system-map__boundaries">
        <section className="food-system-map__boundary food-system-map__boundary--providers">
          <p className="food-figure__index">FOOD SOURCES</p>
          <strong>Open Food Facts + USDA FoodData Central</strong>
          <span>Lookup candidates; CNF 2026, Ciqual 2025, and CoFID 2021 are versioned imports.</span>
        </section>
        <section className="food-system-map__boundary food-system-map__boundary--intent">
          <p className="food-figure__index">BOUNDED AI INTERPRETATION</p>
          <strong>Gemini interprets food intent and suggests food and quantity from text or photo.</strong>
          <span>A person reviews suggestions; AI does not set trusted nutrition.</span>
        </section>
        <section className="food-system-map__boundary food-system-map__boundary--identity">
          <p className="food-figure__index">AUTH + RESOURCE SCOPE</p>
          <strong>Verify the caller, then derive a server-owned resource scope.</strong>
          <span>The client cannot choose the owner identity for saved records.</span>
        </section>
      </div>

      <figcaption id="food-system-map-caption">
        System map · entry routes and bounded interpretation pass through shared API rules; saved records ground both history and analysis.
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
        <strong>One canonical food and nutrient model.</strong>
        <p>Adapters map names, nutrient keys, units, and servings while keeping source identity and release attached. Missing nutrient values stay absent.</p>
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
          <strong>Each saved serving keeps its source and resolved basis.</strong>
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
        <span className="food-figure__index">START WITH PERSISTED RECORDS</span>
        <strong>One saved history supports both a daily read and longer analysis.</strong>
        <ul aria-label="Persisted inputs to Insights">
          <li>Food logs</li>
          <li>Weight logs</li>
          <li>Goals</li>
          <li>Local tracking day</li>
        </ul>
        <p>A selected range changes the analysis; the underlying food log stays unchanged.</p>
      </div>

      <div className="food-insight-path__analysis">
        <header className="food-insight-path__analysis-heading">
          <span className="food-figure__index">01 / CHECK THE DATA</span>
          <strong>Day eligibility and nutrient coverage are separate checks.</strong>
        </header>
        <div className="food-insight-path__states">
          <section className="food-insight-path__day">
            <span>DAY ELIGIBILITY</span>
            <strong>COMPLETE · PARTIAL · UNLOGGED</strong>
            <p>Does this day count toward the selected analysis?</p>
          </section>
          <section className="food-insight-path__coverage">
            <span>NUTRIENT COVERAGE</span>
            <strong>RECORDED · PARTIAL · UNKNOWN</strong>
            <p>Are nutrient values present in the saved food basis?</p>
          </section>
        </div>
        <p className="food-insight-path__separation">A logged day can still have an unknown nutrient.</p>
        <div className="food-insight-path__rule">
          <span className="food-figure__index">DETERMINISTIC DOMAIN</span>
          <strong>Saved foods, weight, and goals feed daily calculations and recommendations.</strong>
          <p>Analytics and recommendation facts are deterministic backend facts. AI does not fill missing values or decide recommendations.</p>
        </div>
      </div>

      <div className="food-insight-path__presentations">
        <header className="food-insight-path__presentations-heading">
          <span className="food-figure__index">02 / CHOOSE A VIEW</span>
          <strong>One saved record. Two levels of detail.</strong>
        </header>
        <section className="food-insight-path__simple food-insight-path__view-daily">
          <span>SIMPLE / CURATED DAILY READ</span>
          <strong>Simple overview and recommendations</strong>
          <ul className="food-insight-path__measure-list" aria-label="Simple daily view">
            <li><span>INTAKE</span><strong>Calories + macros</strong></li>
            <li><span>BODY + WATER</span><strong>Weight + hydration</strong></li>
            <li><span>HABIT</span><strong>Logging consistency</strong></li>
          </ul>
          <p>Recommendations use saved logs and goals.</p>
        </section>
        <section className="food-insight-path__complex food-insight-path__view-range">
          <span>COMPLEX / DEEPER EXPLORATION</span>
          <strong>Complex tabs: Overview, Nutrients, and Recommendations</strong>
          <ul className="food-insight-path__tab-list" aria-label="Complex views">
            <li>Overview</li><li>Nutrients</li><li>Recommendations</li>
          </ul>
          <p>Trend views include calories, macros, weight, hydration, and logging consistency.</p>
          <p className="food-insight-path__range-note">More nutrients, custom ranges, comparisons, coverage controls, saved views, and deterministic forecasts from recorded data.</p>
          <p className="food-insight-path__forecast">Forecasts are calculations, not promised outcomes.</p>
        </section>
      </div>

      <div className="food-insight-path__evidence">
        <img
          src="/media/case-studies/food-tracker/phase-24/trend-detail-calories-unknown.png"
          alt="Phase 24 calorie trend detail with an Unknown value, no recorded calories for the selected period, and a coverage summary. It is an unsaved pre-redesign QA state."
        />
        <div className="food-insight-path__evidence-copy">
          <span className="food-figure__index">PHASE 24 / OBSERVED STATE</span>
          <strong>Unknown is shown explicitly; this is not a populated trend or personal result.</strong>
          <p>The selected period has no recorded calorie values. The screen keeps that gap visible instead of presenting a measured zero.</p>
          <p className="food-insight-path__evidence-caption">Pre-redesign simulator capture · no recorded values in this period · not a user outcome.</p>
        </div>
      </div>

      <figcaption id="food-insight-path-title">
        Insights path · saved records become a daily view, then a range-based analysis; day eligibility and nutrient coverage remain separate.
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
            <h3>How does the app find the intended food reliably?</h3>
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
              <div
                className="food-retrieval-evidence__top-one"
                role="img"
                aria-label={`Top-1 offline ranking comparison for ${set.name.toLowerCase()} (${set.queries} queries): legacy ${set.legacy[0]}/${set.queries}; full hybrid ${set.hybrid[0]}/${set.queries}.`}
              >
                <span className="food-retrieval-evidence__top-one-label">TOP-1 / CORRECT FOOD IN THE FIRST RESULT</span>
                <div className="food-retrieval-evidence__bar-row">
                  <span>Legacy</span>
                  <svg viewBox="0 0 100 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                    <rect className="food-retrieval-evidence__bar-track" x="0" y="1" width="100" height="6" rx="3" />
                    <rect className="food-retrieval-evidence__bar-legacy" x="0" y="1" width={`${(set.legacy[0] / set.queries) * 100}`} height="6" rx="3" />
                    <rect className="food-retrieval-evidence__bar-track" x="0" y="11" width="100" height="6" rx="3" />
                    <rect className="food-retrieval-evidence__bar-hybrid" x="0" y="11" width={`${(set.hybrid[0] / set.queries) * 100}`} height="6" rx="3" />
                  </svg>
                  <div><span>{set.legacy[0]}/{set.queries}</span><span>{set.hybrid[0]}/{set.queries}</span></div>
                  <div className="food-retrieval-evidence__bar-labels"><span>LEGACY</span><span>FULL HYBRID</span></div>
                </div>
              </div>
              <dl className="food-retrieval-evidence__rank-depths" aria-label="Top-3 and Top-5 results">
                {[1, 2].map((index) => (
                  <div key={index}>
                    <dt>TOP-{index === 1 ? 3 : 5}</dt>
                    <dd><span>Legacy</span><strong>{set.legacy[index]}/{set.queries}</strong></dd>
                    <dd><span>Full hybrid</span><strong>{set.hybrid[index]}/{set.queries}</strong></dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="food-retrieval-evidence__finding">
          <strong>Evaluation changed the design.</strong>
          <p>Fuzzy retrieval drove most of the measured gain. Project notes report: Semantic retrieval added substantial latency for little benchmark recovery; no latency number is asserted here, so the richer model path stayed bounded.</p>
        </div>
      </div>

      <figcaption id="food-retrieval-evidence-title">
        Hybrid retrieval · candidate breadth feeds a deterministic ranker. Offline ranking evidence, not live-user outcomes; the fuzzy-only miss-recovery count is omitted because the records conflict.
      </figcaption>
    </figure>
  );
}

function FoodSecurityBoundary() {
  return (
    <figure
      className="food-security-boundary"
      aria-label="Verified identity becomes a server-owned data scope"
    >
      <header className="food-security-boundary__header">
        <span className="food-figure__index">ACCOUNT / RESOURCE BOUNDARY</span>
        <h3>Verify the caller. Derive the data scope.</h3>
        <p>Authentication identifies the caller; authorization scopes each resource.</p>
      </header>

      <ol className="food-security-boundary__path">
        <li>
          <span>01 / IDENTITY</span>
          <strong>Firebase ID token</strong>
          <p>The signed-in client presents its identity to the API.</p>
        </li>
        <li>
          <span>02 / VERIFY + MAP</span>
          <strong>Map UID to app-owned UUID</strong>
          <p>The API verifies the token, then resolves the application identity.</p>
        </li>
        <li>
          <span>03 / AUTHORIZE</span>
          <strong>Scope each resource query</strong>
          <p>Ownership comes from verified identity; the client does not choose the owner ID.</p>
        </li>
      </ol>

      <div className="food-security-boundary__signout">
        <span className="food-figure__index">SIGN OUT</span>
        <strong>Clear user-specific local state.</strong>
      </div>

      <figcaption>
        Source boundary · the inspected Phase 24 code verifies the caller and derives an app-owned scope. This is implementation evidence, not a claim that every provider or native path was released.
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
            <p className="food-section-label">02 / THE SYSTEM + DATA CONTRACT</p>
            <h2 id="food-architecture-title">The chosen amount is part of the nutrition.</h2>
            <p>First, the system boundary: a mobile experience, shared API rules, and persisted food/history data. Then the data contract that keeps provider values, serving conversions, and logged history distinct.</p>
          </header>
          <FoodSystemMap />
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
          <FoodSecurityBoundary />
          <FoodEvidenceGates />
        </section>
      </article>
    </>
  );
}
