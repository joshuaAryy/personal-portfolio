import { Link } from "react-router-dom";
import "./fraymakers-case.css";

const chapters = [
  { id: "pipeline", label: "PIPELINE" },
  { id: "composition", label: "COMPOSITION" },
  { id: "configuration", label: "YAML CONFIG" },
  { id: "ownership", label: "OWNERSHIP" },
  { id: "outcome", label: "OUTCOME" },
] as const;

const stages = [
  {
    number: "01",
    title: "Tournament match data",
    system: "MATCH DATA",
    detail: "Tournament results establish match context.",
  },
  {
    number: "02",
    title: "YAML configuration",
    system: "MATCH OVERRIDES",
    detail: "Match-specific values and overrides configure the render.",
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
  "BACKGROUND / STAGE",
  "PLAYER 1 CHARACTER",
  "PLAYER 2 CHARACTER",
  "SET / PLAYER TEXT",
  "COSTUMES + ASSISTS",
  "OTHER OVERLAYS",
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
            <p className="fray-case__eyebrow">FRAYMAKERS / MATCH-TO-THUMBNAIL SYSTEM</p>
            <h1 id="fraymakers-title">MATCH DATA TO VOD THUMBNAILS</h1>
            <p className="fray-case__dek">
              A tournament media workflow connected match context to the right
              video, then composed a consistent thumbnail for the VOD.
            </p>
          </div>
          <div className="fray-case__product-path" role="group" aria-label="Match to rendered thumbnail">
            <div className="fray-case__product-path-grid">
              <section className="fray-case__product-path-point">
                <span className="fray-case__spec-label">MATCH CONTEXT</span>
                <strong>One match → one VOD</strong>
                <p>Tournament results stay linked to the right recording.</p>
              </section>
              <section className="fray-case__product-path-point">
                <span className="fray-case__spec-label">FRAME OUTPUT</span>
                <strong>Layered 1280 × 720 PNG</strong>
                <p>Node-canvas composes the thumbnail for the VOD.</p>
              </section>
            </div>
          </div>
          <div
            className="fray-case__spec"
            role="img"
            aria-label="Explanatory layout schematic: stage background, two characters, player and set text, logos, and overlays; not original project art"
          >
            <span className="fray-case__spec-label">SCHEMATIC OUTPUT / LAYOUT ONLY</span>
            <div className="fray-case__schematic-preview" aria-hidden="true">
              <span className="fray-case__schematic-stamp">SCHEMATIC / LAYOUT ONLY</span>
              <span className="fray-case__schematic-dimension">1280 × 720</span>
              <span className="fray-case__schematic-stage" aria-hidden="true" />
              <span className="fray-case__schematic-label fray-case__schematic-label--background">
                BACKGROUND / STAGE ART
              </span>
              <span className="fray-case__schematic-label fray-case__schematic-label--players">
                SET / PLAYER TEXT
              </span>
              <span className="fray-case__schematic-label fray-case__schematic-label--player-one">
                PLAYER 1 · CHARACTER
              </span>
              <span className="fray-case__schematic-label fray-case__schematic-label--player-two">
                PLAYER 2 · CHARACTER
              </span>
              <span className="fray-case__schematic-label fray-case__schematic-label--logos">LOGOS</span>
              <span className="fray-case__schematic-label fray-case__schematic-label--layers">
                OTHER OVERLAY LAYERS
              </span>
            </div>
            <span className="fray-case__spec-meta">PNG <i /> NODE-CANVAS <i /> 16:9</span>
            <span className="fray-case__spec-caption">Schematic layout, not project art</span>
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

        <section className="fray-case__configuration" id="fraymakers-configuration" aria-labelledby="fraymakers-configuration-title">
          <div className="fray-case__section-head fray-case__section-head--compact">
            <div>
              <p className="fray-case__eyebrow">YAML / MATCH-SPECIFIC OVERRIDES</p>
              <h2 id="fraymakers-configuration-title">One render path; values change by match.</h2>
            </div>
            <p className="fray-case__configuration-intro">
              YAML carried match-specific values and overrides. <code>thumbnail.js</code> and node-canvas
              combined them with the selected game art and labels.
            </p>
          </div>
          <figure className="fray-case__config-flow" aria-label="YAML values and composition layers feed thumbnail.js and node-canvas to produce a 1280 by 720 PNG">
            <section className="fray-case__config-card fray-case__config-card--yaml">
              <span className="fray-case__config-kicker">MATCH-SPECIFIC INPUT</span>
              <h3>YAML</h3>
              <p>Values + overrides</p>
            </section>
            <span className="fray-case__config-arrow" aria-hidden="true">→</span>
            <section className="fray-case__config-card fray-case__config-card--render">
              <span className="fray-case__config-kicker">COMPOSITION</span>
              <h3><code>thumbnail.js</code> + node-canvas</h3>
              <ul aria-label="Layer inputs">
                <li>Stage / background</li>
                <li>Character 1</li>
                <li>Character 2</li>
                <li>Set / player text</li>
                <li>Logos</li>
                <li>Other overlays</li>
              </ul>
            </section>
            <span className="fray-case__config-arrow" aria-hidden="true">→</span>
            <section className="fray-case__config-card fray-case__config-card--output">
              <span className="fray-case__config-kicker">VOD THUMBNAIL</span>
              <h3>1280 × 720</h3>
              <p>One composed PNG</p>
            </section>
            <figcaption>Match-specific configuration meets a layered, repeatable render.</figcaption>
          </figure>
        </section>

        <section className="fray-case__ownership" id="fraymakers-ownership" aria-labelledby="fraymakers-ownership-title">
          <div className="fray-case__section-head fray-case__section-head--compact">
            <div>
              <p className="fray-case__eyebrow">TECHNICAL OWNERSHIP</p>
              <h2 id="fraymakers-ownership-title">I built the thumbnail-generation path.</h2>
            </div>
          </div>
          <div className="fray-case__ownership-grid">
            <section className="fray-case__ownership-card fray-case__ownership-card--joshua" aria-labelledby="fraymakers-joshua-title">
              <p className="fray-case__eyebrow">THUMBNAIL WORKFLOW</p>
              <h3 id="fraymakers-joshua-title"><code>thumbnail.js</code></h3>
              <p>I built <code>thumbnail.js</code>. I also helped with the match-specific YAML configuration, thumbnail generation, and integration, and prototyped part of the YouTube API work.</p>
            </section>
            <section className="fray-case__ownership-card" aria-labelledby="fraymakers-brother-title">
              <p className="fray-case__eyebrow">SHARED PROJECT FOUNDATION</p>
              <h3 id="fraymakers-brother-title">Foundation, CLI, Challonge</h3>
              <p>My brother started the broader project and built its foundation, CLI, and much of the early Challonge and API groundwork.</p>
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
