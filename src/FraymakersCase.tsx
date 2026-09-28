import { Link } from "react-router-dom";
import "./fraymakers-case.css";

const chapters = [
  { id: "pipeline", label: "PIPELINE" },
  { id: "composition", label: "COMPOSITION" },
  { id: "ownership", label: "OWNERSHIP" },
  { id: "outcome", label: "OUTCOME" },
] as const;

const stages = [
  {
    number: "01",
    title: "Challonge metadata",
    system: "CHALLONGE DATA",
    detail: "Tournament and match metadata provide the workflow context.",
  },
  {
    number: "02",
    title: "YAML configuration",
    system: "MATCH OVERRIDES",
    detail: "YAML config holds match-specific values and overrides.",
  },
  {
    number: "03",
    title: "Match-to-video mapping",
    system: "VIDEO MAPPING",
    detail: "Match context is connected to its associated tournament VOD.",
  },
  {
    number: "04",
    title: "thumbnail.js",
    system: "RENDER / NODE-CANVAS",
    detail: "thumbnail.js and node-canvas compose the layers into a 1280 × 720 PNG.",
  },
] as const;

const compositionInputs = [
  "LOGOS",
  "STAGE ART",
  "CHARACTER / SPRITE ART",
  "COSTUMES",
  "ASSISTS",
  "FOREGROUND ART",
  "TEXT / SET LABELS",
] as const;

const edgeCases = [
  ["ALIASES", "Alternate names across match and art inputs"],
  ["P2 MIRRORING", "Player-two character orientation"],
  ["LONG NAMES", "Text must fit variable name lengths"],
  ["MISSING ASSETS", "Some art inputs may be absent"],
] as const;

export default function FraymakersCase() {
  return (
    <>
      <nav className="fraymakers-nav" aria-label="Fraymakers case study">
        <div className="fraymakers-nav__chapters">
          {chapters.map((chapter) => (
            <a href={`#fraymakers-${chapter.id}`} key={chapter.id}>
              {chapter.label}
            </a>
          ))}
        </div>
        <Link className="fraymakers-nav__back" to="/projects">
          ‹ PROJECTS
        </Link>
        <span className="fraymakers-nav__breadcrumb">CASE STUDY / FRAYMAKERS</span>
      </nav>

      <article className="fray-case" aria-labelledby="fraymakers-title">
        <header className="fray-case__intro" id="fraymakers-intro">
          <div className="fray-case__intro-copy">
            <p className="fray-case__eyebrow">FRAYMAKERS / UPLOADASSISTANT</p>
            <h1 id="fraymakers-title">Match data to VOD thumbnails</h1>
            <p className="fray-case__dek">
              A tournament media workflow connected match context to the right
              video, then composed a consistent thumbnail for the VOD.
            </p>
          </div>
          <div className="fray-case__scope">
            <span className="fray-case__spec-label">MY SCOPE / JOINED LATER</span>
            <strong><code>thumbnail.js</code> + YAML/configuration</strong>
            <p>Thumbnail generation and integration, plus some YouTube API work.</p>
            <span className="fray-case__scope-boundary">
              My brother owned the project foundation, CLI, and early Challonge groundwork.
              YouTube Data API / OAuth remained a prototype; automatic upload was not completed.
            </span>
          </div>
          <div
            className="fray-case__spec"
            role="img"
            aria-label="Schematic output preview, 1280 × 720; not original project artwork"
          >
            <span className="fray-case__spec-label">SCHEMATIC OUTPUT / LAYOUT ONLY</span>
            <div className="fray-case__schematic-preview" aria-hidden="true">
              <span className="fray-case__schematic-stamp">SCHEMATIC / LAYOUT ONLY</span>
              <span className="fray-case__schematic-dimension">1280 × 720</span>
              <span className="fray-case__schematic-label fray-case__schematic-label--players">
                SET / PLAYER LABELS
              </span>
              <span className="fray-case__schematic-label fray-case__schematic-label--art">
                CHARACTER + STAGE ART
              </span>
              <span className="fray-case__schematic-label fray-case__schematic-label--layers">
                LOGO / FOREGROUND LAYERS
              </span>
            </div>
            <span className="fray-case__spec-meta">PNG <i /> NODE-CANVAS</span>
            <span className="fray-case__spec-caption">Not original project artwork</span>
          </div>
        </header>

        <section className="fray-case__pipeline" aria-labelledby="fraymakers-pipeline-title">
          <div className="fray-case__section-head">
            <div>
              <p className="fray-case__eyebrow">SYSTEM / MEDIA PREPARATION</p>
              <h2 id="fraymakers-pipeline-title">One match, a connected path to frame output.</h2>
            </div>
            <p className="fray-case__section-note">METADATA → CONFIG → VIDEO MAP → RENDER</p>
          </div>

          <ol className="fray-case__stages">
            {stages.map((stage) => (
              <li className="fray-case__stage" key={stage.number}>
                <div className="fray-case__stage-top">
                  <span className="fray-case__stage-number">{stage.number}</span>
                  <span className="fray-case__stage-system">{stage.system}</span>
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
              </li>
            ))}
          </ol>

          <p className="fray-case__pipeline-caption">A connected route from match context to a 1280 × 720 output canvas.</p>
        </section>

        <section className="fray-case__composition" id="fraymakers-composition" aria-labelledby="fraymakers-composition-title">
          <div className="fray-case__section-head fray-case__section-head--compact">
            <div>
              <p className="fray-case__eyebrow">COMPOSITOR INPUTS</p>
              <h2 id="fraymakers-composition-title">A frame assembled from separate layers.</h2>
            </div>
            <p className="fray-case__composition-note">
              Repeatability depended on how game art and match context met in the output.
            </p>
          </div>
          <ul className="fray-case__layer-list" aria-label="Thumbnail composition inputs">
            {compositionInputs.map((input, index) => (
              <li key={input}>
                <span className="fray-case__layer-index">L{String(index + 1).padStart(2, "0")}</span>
                <span>{input}</span>
              </li>
            ))}
          </ul>
          <dl className="fray-case__edge-list">
            {edgeCases.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fray-case__ownership" id="fraymakers-ownership" aria-labelledby="fraymakers-ownership-title">
          <div className="fray-case__section-head fray-case__section-head--compact">
            <div>
              <p className="fray-case__eyebrow">CONTRIBUTION / OWNERSHIP</p>
              <h2 id="fraymakers-ownership-title">A focused subsystem inside a shared build.</h2>
            </div>
            <p className="fray-case__ownership-lead">I joined later, after the foundation was underway.</p>
          </div>
          <div className="fray-case__ownership-grid">
            <section className="fray-case__ownership-card fray-case__ownership-card--joshua" aria-labelledby="fraymakers-joshua-title">
              <p className="fray-case__eyebrow">JOSHUA / JOINED LATER</p>
              <h3 id="fraymakers-joshua-title"><code>thumbnail.js</code></h3>
              <p>I wrote <code>thumbnail.js</code> and contributed YAML/configuration, thumbnail generation and integration, and some YouTube API work.</p>
            </section>
            <section className="fray-case__ownership-card" aria-labelledby="fraymakers-brother-title">
              <p className="fray-case__eyebrow">BROTHER / PROJECT FOUNDATION</p>
              <h3 id="fraymakers-brother-title">Foundation, CLI, Challonge</h3>
              <p>My brother owned the foundation, CLI, and much of the early Challonge and API groundwork.</p>
            </section>
          </div>
        </section>

        <footer className="fray-case__outcome" id="fraymakers-outcome">
          <div>
            <p className="fray-case__eyebrow">IN PRACTICE</p>
            <h2>Generated thumbnails were used on real Fraymakers VODs.</h2>
          </div>
          <p className="fray-case__boundary">
            YouTube Data API / OAuth remained a prototype. Automatic upload was not completed.
          </p>
        </footer>
      </article>
    </>
  );
}
