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
        <strong>Turn saved daily food data into useful views over time</strong>
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
    steps: [
      { label: "START", text: "Search, recent, or saved food" },
      { label: "CHOOSE", text: "Select a candidate" },
      { label: "CONFIRM", text: "Check the serving" },
    ],
    icon: "search",
    visual: null,
  },
  {
    id: "barcode",
    label: "Barcode",
    eyebrow: "PACKAGED FOOD",
    title: "Use a barcode to reach a packaged-food candidate.",
    detail: "Open Food Facts supplies a lookup candidate. A person still confirms the match and serving.",
    steps: [
      { label: "SCAN", text: "Scan or enter a code" },
      { label: "LOOKUP", text: "Open Food Facts candidate" },
      { label: "HUMAN CHECK", text: "Confirm the match + serving" },
    ],
    icon: "barcode",
    visual: "barcode",
  },
  {
    id: "describe-photo",
    label: "Describe or photo",
    eyebrow: "BOUNDED INTERPRETATION",
    title: "Let AI interpret a request, then review its proposal.",
    detail: "Gemini suggests food and quantity; a person reviews the rows before saving.",
    steps: [
      { label: "TEXT OR PHOTO", text: "Text or photo request" },
      { label: "SUGGEST", text: "Gemini suggests food + quantity" },
      { label: "HUMAN CHECK", text: "Review or edit proposed rows" },
    ],
    icon: "intent",
    visual: null,
  },
  {
    id: "recipes-mixed",
    label: "Recipes & mixed meals",
    eyebrow: "COMBINE FOODS",
    title: "Reuse trusted foods inside a recipe or mixed meal.",
    detail: "Recipes build from saved foods; mixed meals can combine trusted and manual entries in the same logging domain.",
    steps: [
      { label: "REUSE", text: "Choose saved foods" },
      { label: "COMBINE", text: "Build a recipe or mixed meal" },
      { label: "PORTION", text: "Set the amounts" },
    ],
    icon: "combine",
    visual: "recipes",
  },
  {
    id: "manual",
    label: "Manual entry",
    eyebrow: "DIRECT ENTRY",
    title: "Enter a manual food when a catalog match is not right.",
    detail: "Keep missing nutrition unknown instead of filling it with zero; serving resolution still follows the chosen basis.",
    steps: [
      { label: "ENTER", text: "Add a food + known values" },
      { label: "PRESERVE", text: "Missing nutrition stays unknown" },
      { label: "PORTION", text: "Choose the serving basis" },
    ],
    icon: "manual",
    visual: "manual",
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

type FoodLoggingMicrovisualKind = Exclude<(typeof foodLoggingRoutes)[number]["visual"], null>;

const foodLoggingMicrovisualCopy = {
  barcode: {
    accessibleName: "Conceptual barcode lookup path",
    caption: "Conceptual path · not a completed scan; the Phase 24 capture shows entry options only.",
  },
  recipes: {
    accessibleName: "Conceptual recipe and mixed-meal composition path",
    caption: "Conceptual path · not a completed recipe or mixed meal; the Phase 24 capture shows entry options only.",
  },
  manual: {
    accessibleName: "Conceptual manual-entry path",
    caption: "Conceptual path · not a saved manual food; the Phase 24 capture shows entry options only.",
  },
} as const;

function FoodLoggingRouteMicrovisual({ kind }: { kind: FoodLoggingMicrovisualKind }) {
  const copy = foodLoggingMicrovisualCopy[kind];

  return (
    <figure
      className={`food-log-route-visual food-log-route-visual--${kind}`}
      data-conceptual-flow={kind}
      aria-label={copy.accessibleName}
    >
      {kind === "barcode" ? (
        <div className="food-log-route-visual__barcode-flow">
          <div className="food-log-route-visual__barcode-node food-log-route-visual__barcode-input">
            <span>INPUT</span>
            <svg viewBox="0 0 90 28" aria-hidden="true" focusable="false">
              <path d="M4 3v22M9 3v22M15 3v22M22 3v22M28 3v22M32 3v22M41 3v22M47 3v22M54 3v22M59 3v22M68 3v22M73 3v22M81 3v22M86 3v22" />
            </svg>
            <strong>PRODUCT CODE</strong>
          </div>
          <span className="food-log-route-visual__connector" aria-hidden="true">→</span>
          <div className="food-log-route-visual__barcode-node food-log-route-visual__barcode-candidate">
            <span>LOOKUP</span>
            <strong>OPEN FOOD FACTS</strong>
            <small>candidate record</small>
          </div>
          <span className="food-log-route-visual__connector" aria-hidden="true">→</span>
          <div className="food-log-route-visual__barcode-node food-log-route-visual__barcode-review">
            <span className="food-log-route-visual__review-mark" aria-hidden="true">✓</span>
            <span>HUMAN CHECK</span>
            <strong>MATCH + SERVING</strong>
          </div>
        </div>
      ) : kind === "recipes" ? (
        <div className="food-log-route-visual__recipe-flow">
          <div className="food-log-route-visual__recipe-sources">
            <span className="food-log-route-visual__visual-label">SOURCES</span>
            <strong>SAVED FOODS</strong>
            <strong>MANUAL ENTRY</strong>
          </div>
          <span className="food-log-route-visual__connector" aria-hidden="true">→</span>
          <div className="food-log-route-visual__recipe-composition">
            <span className="food-log-route-visual__visual-label">COMPOSE</span>
            <div className="food-log-route-visual__recipe-layers" aria-hidden="true"><i /><i /><i /></div>
            <strong>RECIPE OR MIXED MEAL</strong>
          </div>
          <span className="food-log-route-visual__connector" aria-hidden="true">→</span>
          <div className="food-log-route-visual__recipe-serving">
            <span className="food-log-route-visual__visual-label">PORTION</span>
            <strong>SERVING BASIS</strong>
            <small>resolve the amount</small>
          </div>
        </div>
      ) : (
        <div className="food-log-route-visual__manual-flow">
          <div className="food-log-route-visual__manual-values">
            <span className="food-log-route-visual__visual-label">KNOWN VALUES</span>
            <div><strong>Entered</strong><small>retained</small></div>
            <div className="food-log-route-visual__manual-unknown"><strong>Missing</strong><small>UNKNOWN STAYS UNKNOWN</small></div>
          </div>
          <span className="food-log-route-visual__connector" aria-hidden="true">→</span>
          <div className="food-log-route-visual__manual-serving">
            <span className="food-log-route-visual__visual-label">SERVING BASIS</span>
            <strong>Choose amount + unit</strong>
            <small>shared serving resolution</small>
          </div>
        </div>
      )}
      <figcaption>{copy.caption}</figcaption>
    </figure>
  );
}

function FoodLogTransaction() {
  const [activeRoute, setActiveRoute] = useState<FoodLoggingRouteId>("search-reuse");
  const selectedRoute = foodLoggingRoutes.find((route) => route.id === activeRoute)!;
  const isSearchRoute = activeRoute === "search-reuse";
  const isDescribeRoute = activeRoute === "describe-photo";

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
          <ol className="food-log-transaction__method-steps" aria-label={`${selectedRoute.label} path`}>
            {selectedRoute.steps.map((step, index) => (
              <li key={step.label}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div><small>{step.label}</small><strong>{step.text}</strong></div>
              </li>
            ))}
          </ol>
          {selectedRoute.visual && <FoodLoggingRouteMicrovisual kind={selectedRoute.visual} />}
          <p>{selectedRoute.detail}</p>
        </div>
      </section>

      <div className="food-log-transaction__screens" role="group" aria-label="Phase 24 interaction captures">
        {isSearchRoute ? (
          <>
            <figure className="food-log-transaction__screen" data-screen="search-results">
              <img
                src="/media/case-studies/food-tracker/phase-24/search-banana-results.png"
                alt="Phase 24 search results for banana showing candidate foods and a Save food action. This is a pre-redesign candidate-selection capture, not a saved food log."
              />
              <figcaption>Phase 24 search results · candidate selection only; pre-redesign evidence.</figcaption>
            </figure>
            <figure className="food-log-transaction__screen" data-screen="serving-preview">
              <img
                src="/media/case-studies/food-tracker/phase-24/food-serving-preview-banana.png"
                alt="Phase 24 serving preview for banana with amount and unit choices before saving. This pre-redesign capture is not a completed log."
              />
              <figcaption>Phase 24 serving preview · amount and unit before save; pre-redesign evidence.</figcaption>
            </figure>
          </>
        ) : isDescribeRoute ? (
          <figure className="food-log-transaction__screen" data-screen="review">
            <img
              src="/media/case-studies/food-tracker/phase-24/ai-meal-review.png"
              alt="Phase 24 Describe meal review for eggs and toast with editable serving amounts, a provisional nutrition preview, and Log selected action. The meal is unsaved."
            />
            <figcaption>The Describe-meal review is unsaved interaction evidence, not a populated user outcome.</figcaption>
          </figure>
        ) : (
          <figure className="food-log-transaction__screen" data-screen="entry-options">
            <img
              src="/media/case-studies/food-tracker/phase-24/food-log-complex-clean.png"
              alt="Phase 24 clean logging sheet with a food search field and visible Describe meal, Photo logging, Food Library, Recipes, Mixed meal, and Scan barcode entry options. No food has been saved."
            />
            <figcaption>Phase 24 entry options only · this capture does not show a completed scan, recipe, mixed meal, or manual save.</figcaption>
          </figure>
        )}
      </div>
      <p className="food-log-transaction__source-note">368×800 iOS simulator captures from the pre-redesign baseline. They show interaction states, not saved user history; unsupported route states remain conceptual.</p>

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
        <p className="food-figure__index">IMPLEMENTATION MAP · NOT A RELEASE DIAGRAM</p>
        <h3 id="food-system-map-title">One mobile product, shared data and rules.</h3>
        <p>Follow lookup, interpretation, and analysis through shared rules to the persisted records.</p>
      </header>

      <div className="food-system-map__auth-boundary" aria-label="Authentication and server-owned resource boundary">
        <span>AUTHENTICATED REQUEST · SOURCE IMPLEMENTATION</span>
        <strong>Firebase UID → app-owned UUID → API-derived resource scope</strong>
        <p>The client does not choose whose records it reads or writes; this describes inspected source, not deployment status.</p>
      </div>

      <div className="food-system-map__core" role="group" aria-label="Food Tracker implementation architecture">
        <div className="food-system-map__core-layers">
          <section className="food-system-map__core-layer food-system-map__core-layer--app">
            <span>01 / MOBILE EXPERIENCE</span>
            <strong>React Native + Expo</strong>
            <p>One app for entry, human review, saved history, and Simple or Complex views.</p>
          </section>
          <span className="food-system-map__core-link" aria-hidden="true">→</span>
          <section className="food-system-map__core-layer food-system-map__core-layer--api">
            <span>02 / API + DOMAIN RULES</span>
            <strong>Express + TypeScript API</strong>
            <p>Shared TypeScript + Zod contracts; Prisma access; serving, ranking, analytics, and ownership rules.</p>
          </section>
          <span className="food-system-map__core-link" aria-hidden="true">→</span>
          <section className="food-system-map__core-layer food-system-map__core-layer--store">
            <span>03 / PERSISTED RECORDS</span>
            <strong>Prisma → PostgreSQL</strong>
            <p>Food and nutrient records, serving basis, food and weight logs, and saved snapshots.</p>
          </section>
        </div>
      </div>

      <div className="food-system-map__flows" role="group" aria-label="Connected lookup, interpretation, and Insights paths">
        <section className="food-system-map__flow food-system-map__flow--find">
          <span className="food-figure__index">FIND + RESOLVE</span>
          <strong>Different food sources meet one serving rule.</strong>
          <div className="food-system-map__flow-content">
            <p><b>Lookup candidates</b> Open Food Facts (packaged/barcode) and USDA FoodData Central (generic food).</p>
            <p><b>Versioned imports</b> CNF 2026, Ciqual 2025, and CoFID 2021 feed normalized PostgreSQL records.</p>
            <p><b>Retrieval</b> Pinecone returns semantic candidates only; the API ranks deterministically, then a person confirms food and serving.</p>
          </div>
        </section>
        <section className="food-system-map__flow food-system-map__flow--interpret">
          <span className="food-figure__index">INTERPRET + REVIEW</span>
          <strong>AI proposes; a person decides what enters the log.</strong>
          <div className="food-system-map__flow-chain" aria-label="Text or photo to suggestion to human review to shared serving rules">
            <span>Text or photo</span><b aria-hidden="true">→</b><span>Gemini proposal</span><b aria-hidden="true">→</b><span>Human review</span><b aria-hidden="true">→</b><span>Shared serving rules</span>
          </div>
          <p>Gemini proposes food and quantity; it does not determine trusted nutrition or save without review.</p>
        </section>
        <section className="food-system-map__flow food-system-map__flow--insights">
          <span className="food-figure__index">READ SAVED HISTORY</span>
          <strong>Deterministic analysis returns to the same product.</strong>
          <p>Saved food logs, weight, and goals feed deterministic analytics and recommendations; Simple and Complex change presentation depth, not the backend.</p>
        </section>
      </div>

      <figcaption id="food-system-map-caption">
        System boundary, provider paths, candidate retrieval, human-reviewed interpretation, and saved-record Insights are shown as one source-backed system.
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

      <div className="food-data-contract__normalized-record" role="group" aria-label="Conceptual normalized food record, not an exact database schema">
        <header className="food-data-contract__record-heading">
          <span className="food-figure__index">APP-OWNED CANONICAL FOOD RECORD · CONCEPTUAL MODEL</span>
          <strong id="food-data-contract-title">Normalize the source once; keep identity, nutrients, and serving basis related but distinct.</strong>
          <p>Adapters preserve provider identity and dataset release while aligning nutrient units and serving metadata.</p>
        </header>
        <div className="food-data-contract__record-columns">
          <section className="food-data-contract__record-card food-data-contract__record-card--identity">
            <span>IDENTITY + PROVENANCE</span>
            <strong>Reusable food identity</strong>
            <ul>
              <li>name, brand, or barcode</li>
              <li>provider and dataset release</li>
            </ul>
          </section>
          <section className="food-data-contract__record-card food-data-contract__record-card--nutrition">
            <span>NUTRIENTS + SERVING BASIS</span>
            <strong>Normalized nutrients, units, and serving options</strong>
            <ul>
              <li>nutrient values with aligned units</li>
              <li>serving options and basis quantity</li>
              <li>unknown stays absent, not zero</li>
            </ul>
          </section>
        </div>
      </div>

      <div className="food-data-contract__save-flow" aria-label="Human-confirmed serving becomes a historical nutrition snapshot">
        <section className="food-data-contract__confirmed-serving">
          <span className="food-figure__index">PERSON CONFIRMS</span>
          <strong>Food + amount</strong>
          <p>The shared backend resolver applies the requested serving to the stored basis.</p>
        </section>
        <span className="food-data-contract__save-link" aria-hidden="true">→</span>
        <section className="food-data-contract__snapshot">
          <div className="food-data-contract__snapshot-heading">
            <span>HISTORICAL FOOD LOG SNAPSHOT</span>
            <strong>Keep the nutrition basis used at save.</strong>
          </div>
          <div className="food-data-contract__snapshot-fields" aria-label="Snapshot categories, not an exact database payload">
            <span>food + source provenance</span>
            <span>confirmed amount + unit</span>
            <span>resolved basis + multiplier</span>
            <span>nutrient basis at save</span>
          </div>
          <p>Later catalog changes do not silently rewrite this basis; user-scoped edits and deletion remain possible.</p>
        </section>
      </div>

      <div className="food-data-contract__scale" aria-label="Reference catalog scale, not a user impact metric">
        <div><strong>12,363</strong><span>active foods</span></div>
        <b aria-hidden="true">×</b>
        <div><strong>277,341</strong><span>nutrient rows</span></div>
        <p>Reference data scale, not users or impact.</p>
      </div>

      <figcaption>
        Source examples and field categories are illustrative. Recipes and mixed meals compose foods; they are not a separate nutrition authority.
      </figcaption>
    </figure>
  );
}

function FoodInsightPath() {
  return (
    <figure className="food-insight-path" aria-labelledby="food-insight-path-title">
      <div className="food-insight-path__evidence food-insight-path__evidence--readable">
        <img
          src="/media/case-studies/food-tracker/phase-24/trend-detail-calories-unknown.png"
          alt="Phase 24 calorie trend detail with an Unknown value, no recorded calories for the selected period, and a coverage summary. It is an unsaved pre-redesign QA state."
        />
        <div className="food-insight-path__evidence-copy">
          <span className="food-figure__index">PHASE 24 / PRE-REDESIGN CAPTURE</span>
          <strong>Unknown is shown explicitly; this is not a populated trend or personal result.</strong>
          <p>The selected period has no recorded calorie values. The screen keeps that gap visible instead of presenting a measured zero.</p>
          <p className="food-insight-path__evidence-caption">Observed simulator state · no recorded values in this period · not a user outcome.</p>
        </div>
      </div>

      <div className="food-insight-path__shared-inputs" role="group" aria-label="Saved food logs, weight logs, and goals feed deterministic analysis and recommendations">
        <span className="food-figure__index">SAVED DATA → DETERMINISTIC ANALYSIS</span>
        <div className="food-insight-path__shared-flow">
          <strong>Saved food logs + weight logs + goals</strong>
          <span aria-hidden="true">→</span>
          <strong>Deterministic analysis + recommendations</strong>
        </div>
        <p>Local tracking-day and nutrient-coverage rules show what the records support; range selection changes the analysis view, not the saved log. AI does not fill missing values or decide recommendation facts.</p>
      </div>

      <div className="food-insight-path__analysis">
        <header className="food-insight-path__analysis-heading">
          <span className="food-figure__index">01 / KEEP TWO DATA QUESTIONS SEPARATE</span>
          <strong>Day eligibility and nutrient coverage are separate checks.</strong>
        </header>
        <div className="food-insight-path__states">
          <section className="food-insight-path__day">
            <span>DAY ELIGIBILITY</span>
            <strong>Does this day count in the selected analysis?</strong>
            <ul aria-label="Logging day states"><li>Complete</li><li>Partial</li><li>Unlogged</li></ul>
          </section>
          <section className="food-insight-path__coverage">
            <span>NUTRIENT COVERAGE</span>
            <strong>What nutrient values are actually present?</strong>
            <ul aria-label="Nutrient coverage states"><li>Recorded</li><li>Partial</li><li>Unknown</li></ul>
          </section>
        </div>
        <p className="food-insight-path__separation">A day may count toward analysis while an individual nutrient remains unknown.</p>
      </div>

      <div className="food-insight-path__presentations">
        <header className="food-insight-path__presentations-heading">
          <span className="food-figure__index">02 / CHOOSE A PRESENTATION</span>
          <strong>One product, shared analysis; two levels of detail.</strong>
        </header>
        <section className="food-insight-path__simple food-insight-path__view-daily">
          <span>SIMPLE / CURATED DAILY READ</span>
          <strong>Simple</strong>
          <ul className="food-insight-path__measure-list" aria-label="Simple daily view">
            <li><span>INTAKE</span><strong>Calories + macros</strong></li>
            <li><span>BODY + WATER</span><strong>Weight + hydration</strong></li>
            <li><span>HABIT</span><strong>Logging consistency</strong></li>
          </ul>
          <p>Daily overview and deterministic recommendations use saved records and goals.</p>
        </section>
        <section className="food-insight-path__complex food-insight-path__view-range">
          <span>COMPLEX / DEEPER EXPLORATION</span>
          <strong>Complex</strong>
          <ul className="food-insight-path__tab-list" aria-label="Complex views">
            <li>Overview</li><li>Nutrients</li><li>Recommendations</li>
          </ul>
          <p>Explore nutrient, calorie, macro, weight, hydration, and consistency trends across selected ranges.</p>
          <p className="food-insight-path__range-note">Custom ranges, comparisons, coverage controls, saved views, and deterministic forecasts use recorded data.</p>
          <p className="food-insight-path__forecast">Forecasts are calculations, not promised outcomes.</p>
        </section>
      </div>

      <figcaption id="food-insight-path-title">
        Insights path · one saved data model supports a daily summary and deeper exploration; unknown values remain distinct from zero.
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
          <FoodEvidenceGates />
        </section>
      </article>
    </>
  );
}
