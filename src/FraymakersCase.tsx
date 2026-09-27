import { Link } from "react-router-dom";

const chapters = [
  { id: "tool", label: "THE TOOL" },
  { id: "flow", label: "THE FLOW" },
  { id: "part", label: "MY PART" },
  { id: "finish", label: "THE FINISH" },
] as const;

const flowSteps = [
  {
    number: "01",
    title: "Challonge",
    detail: "Tournament results provide the match metadata.",
  },
  {
    number: "02",
    title: "YAML overrides",
    detail: "Configuration fills in match-specific details.",
  },
  {
    number: "03",
    title: "Find the match",
    detail: "Match data is joined to the right video.",
  },
  {
    number: "04",
    title: "Compose a frame",
    detail: "node-canvas produces a 1280 × 720 PNG.",
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
  ["ALT. NAMES", "Account for alternate names across sources."],
  ["P2 MIRRORING", "Keep player-two composition oriented correctly."],
  ["LONG NAMES", "Handle labels that need more room."],
  ["MISSING ASSETS", "Account for missing art as an input edge case."],
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
        <span className="fraymakers-nav__breadcrumb">
          CASE STUDY / FRAYMAKERS
        </span>
      </nav>

      <article className="fraymakers-story">
        <section
          className="fraymakers-opening"
          id="fraymakers-tool"
          aria-labelledby="fraymakers-title"
        >
          <div className="fraymakers-opening__copy">
            <p className="fraymakers-eyebrow">FRAYMAKERS / MEDIA TOOLING</p>
            <h1 id="fraymakers-title">
              From match data
              <br />
              to a finished thumbnail
            </h1>
            <p className="fraymakers-opening__summary">
              I built the thumbnail-generation part of a shared Node.js tool
              for preparing tournament VODs.
            </p>
          </div>
          <figure className="fraymakers-format">
            <p className="fraymakers-eyebrow">OUTPUT FORMAT</p>
            <div
              className="fraymakers-format__frame"
              role="img"
              aria-label="A 16 by 9 format outline representing a 1280 by 720 PNG canvas"
            >
              <span>1280 × 720</span>
              <small>PNG · NODE-CANVAS</small>
            </div>
            <figcaption>
              A canvas size cue, not a thumbnail preview.
            </figcaption>
          </figure>
        </section>

        <section
          className="fraymakers-flow"
          id="fraymakers-flow"
          aria-labelledby="fraymakers-flow-title"
        >
          <div className="fraymakers-section-heading">
            <p className="fraymakers-eyebrow">THE FLOW</p>
            <h2 id="fraymakers-flow-title">
              Give each match a repeatable path to a frame.
            </h2>
          </div>
          <div className="fraymakers-editorial-plate">
            <ol className="fraymakers-flow__steps">
              {flowSteps.map((step) => (
                <li key={step.number}>
                  <span className="fraymakers-step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>

          <section
            className="fraymakers-contribution"
            id="fraymakers-part"
            aria-labelledby="fraymakers-part-title"
          >
            <div className="fraymakers-section-heading">
              <p className="fraymakers-eyebrow">MY PART</p>
              <h2 id="fraymakers-part-title">
                One subsystem, inside a larger shared project.
              </h2>
            </div>
            <div className="fraymakers-contribution__grid">
              <div className="fraymakers-owned">
                <p className="fraymakers-eyebrow fraymakers-eyebrow--accent">
                  MY OWNERSHIP
                </p>
                <h3>thumbnail.js</h3>
                <p>
                  I joined after my brother had started the tool. I wrote
                  <code> thumbnail.js</code> and contributed YAML configuration,
                  thumbnail generation and integration, plus some YouTube API
                  work.
                </p>
              </div>
              <div className="fraymakers-shared">
                <p className="fraymakers-eyebrow">SHARED FOUNDATION</p>
                <p>
                  The broader foundation and much of the Challonge and API
                  groundwork belonged to my brother. My part extended that shared
                  tool with the thumbnail workflow.
                </p>
                <p className="fraymakers-api-note">
                  YouTube Data API v3 / OAuth was a prototype. Automatic upload
                  was not completed.
                </p>
              </div>
            </div>
          </section>

          <section className="fraymakers-composer" aria-labelledby="fraymakers-composer-title">
            <div className="fraymakers-composer__heading">
              <p className="fraymakers-eyebrow">COMPOSITION + EDGE CASES</p>
              <h2 id="fraymakers-composer-title">The details live in the frame logic.</h2>
            </div>
            <div className="fraymakers-composition">
              <div>
                <p className="fraymakers-eyebrow">WHAT THE COMPOSER HANDLES</p>
                <p className="fraymakers-composition__note">
                  The frame combines game-specific layers and match context. The
                  page explains those inputs in text; it does not reproduce game
                  artwork or a generated thumbnail.
                </p>
              </div>
              <ul aria-label="Thumbnail composition inputs">
                {compositionInputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
            </div>
            <dl className="fraymakers-edge-cases">
              {edgeCases.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </section>
          </div>
        </section>

        <section
          className="fraymakers-finish"
          id="fraymakers-finish"
          aria-labelledby="fraymakers-finish-title"
        >
          <div className="fraymakers-finish__lead">
            <p className="fraymakers-eyebrow">THE FINISH</p>
            <h2 id="fraymakers-finish-title">
              Generated thumbnails made it onto real Fraymakers VODs.
            </h2>
            <p>
              Building around aliases, mirroring, long names, and missing art
              taught me to make the unusual cases part of the workflow—not an
              afterthought.
            </p>
          </div>
          <p className="fraymakers-credit">
            NODE.JS · NODE-CANVAS · CHALLONGE DATA · YAML CONFIGURATION
          </p>
        </section>
      </article>
    </>
  );
}
