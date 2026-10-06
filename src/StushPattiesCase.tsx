import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./stush-case-study.css";

const formats = ["CSV", "XLSX", "XLSB"] as const;
const distributorSources = ["Koyo", "UNFI", "Dovre"] as const;

const reportingFields = ["Sales", "Units", "Case pack", "Reporting month"] as const;
const normalizationRules = [
  { field: "Sales + units", detail: "Mapped into distinct shared fields" },
  { field: "Case pack", detail: "Retained explicitly in the common contract" },
  { field: "Reporting month", detail: "Aligned to one shared reporting period" },
] as const;

function SourceParsingFigure() {
  const figureRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure || hasEntered) return;

    if (typeof IntersectionObserver === "undefined") {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setHasEntered(true);
      observer.disconnect();
    }, { threshold: 0.2 });

    observer.observe(figure);
    return () => observer.disconnect();
  }, [hasEntered]);

  return (
    <figure
      ref={figureRef}
      className={`stush-source-map${hasEntered ? " is-visible" : ""}`}
      data-flow-entered={hasEntered ? "true" : "false"}
      aria-labelledby="stush-source-map-title"
    >
      <header className="stush-figure-heading">
        <div>
          <p className="stush-kicker">REPORTING PIPELINE</p>
          <h3 id="stush-source-map-title">Different layouts. A shared field contract.</h3>
        </div>
        <p>Each layout had its own reader. The shared rules carried the business meaning forward.</p>
      </header>

      <div className="stush-transform" role="group" aria-label="Koyo, UNFI, and Dovre report layouts flow through Python parsing, a canonical schema, normalization rules, and reporting outputs">
        <section className="stush-transform__sources" aria-labelledby="stush-transform-inputs-title">
          <p className="stush-transform__eyebrow">DISTRIBUTOR INPUTS</p>
          <h4 id="stush-transform-inputs-title">Three report sources</h4>
          <ul className="stush-transform__source-set" aria-label="Named distributor sources">
            {distributorSources.map((source) => <li key={source}>{source}</li>)}
          </ul>
          <p className="stush-transform__layout-label">Different layout shapes</p>
          <div className="stush-transform__file-set">
            <div className="stush-transform__input stush-transform__input--rows" aria-label="Illustrative layout A with uneven row structure, not assigned to a named distributor">
              <span>LAYOUT A</span><i /><i /><i />
            </div>
            <div className="stush-transform__input stush-transform__input--grid" aria-label="Illustrative layout B with a grid structure, not assigned to a named distributor">
              <span>LAYOUT B</span><i /><i /><i /><i /><i /><i />
            </div>
            <div className="stush-transform__input stush-transform__input--groups" aria-label="Illustrative layout C with grouped fields, not assigned to a named distributor">
              <span>LAYOUT C</span><i /><i /><i /><i />
            </div>
          </div>
          <p className="stush-transform__formats">Formats across the input set: {formats.join(" · ")}</p>
        </section>

        <span className="stush-transform__connector" aria-hidden="true">›</span>

        <section className="stush-transform__reader" aria-labelledby="stush-transform-reader-title">
          <p className="stush-transform__eyebrow">PYTHON PARSING</p>
          <h4 id="stush-transform-reader-title">Parse before mapping</h4>
          <p>Python readers interpret each source layout before fields enter the shared model.</p>
          <div className="stush-transform__reader-lines" aria-hidden="true"><i /><i /><i /></div>
        </section>

        <span className="stush-transform__connector" aria-hidden="true">›</span>

        <section className="stush-transform__schema" aria-labelledby="stush-transform-schema-title">
          <p className="stush-transform__eyebrow">CANONICAL SCHEMA</p>
          <h4 id="stush-transform-schema-title">Shared fields</h4>
          <ol aria-label="Shared business fields">
            {reportingFields.map((field) => (
              <li className="stush-transform__field" key={field}>{field}</li>
            ))}
          </ol>
        </section>

        <span className="stush-transform__connector" aria-hidden="true">›</span>

        <section className="stush-transform__normalization" aria-labelledby="stush-transform-rules-title">
          <p className="stush-transform__eyebrow">NORMALIZATION RULES</p>
          <h4 id="stush-transform-rules-title">Apply common rules</h4>
          <ol aria-label="Business dimensions aligned for reporting">
            {normalizationRules.map(({ field, detail }, index) => (
              <li className={`stush-transform__rule stush-transform__rule--${index + 1}`} key={field}>
                <span>{field}</span><small>{detail}</small>
              </li>
            ))}
          </ol>
        </section>

        <span className="stush-transform__connector" aria-hidden="true">›</span>

        <section className="stush-transform__outputs" aria-labelledby="stush-transform-output-title">
          <p className="stush-transform__eyebrow">REPORTING HANDOFF</p>
          <h4 id="stush-transform-output-title">Reporting handoff</h4>
          <ul>
            <li className="stush-transform__output"><i aria-hidden="true" />Standardized CSV</li>
            <li className="stush-transform__output"><i aria-hidden="true" />Data dictionary</li>
            <li className="stush-transform__output"><i aria-hidden="true" />Quality report</li>
          </ul>
          <strong className="stush-transform__powerbi">Power BI handoff</strong>
        </section>
      </div>

      <figcaption>
        Koyo, UNFI, and Dovre are named as a source set; the generic layout sketches are not assigned to individual distributors. CSV, XLSX, and XLSB appeared across inputs. No client records or source values are reproduced.
      </figcaption>
    </figure>
  );
}

function KoyoException() {
  return (
    <section className="stush-koyo" id="stush-koyo-exception" aria-labelledby="stush-koyo-title">
      <div className="stush-koyo__intro">
        <p className="stush-kicker">A BOUNDED EXCEPTION</p>
        <h2 id="stush-koyo-title">One report needed a more explicit reader.</h2>
        <p>
          The Koyo workbook had an irregular layout that required a temporary position-and-cell reader. That reader mapped the input into the shared schema; common normalization then continued. The exception contained one source-specific reading problem without creating a different reporting contract.
        </p>
      </div>

      <figure className="stush-koyo__route" aria-label="A source-specific position-and-cell path returns to shared normalization">
        <div className="stush-koyo__stage">
          <span>SHARED FIELD CONTRACT</span>
          <strong>Sales · Units · Case pack · Reporting month</strong>
        </div>
        <div className="stush-koyo__branch">
          <span className="stush-koyo__branch-label">ONE SOURCE-SPECIFIC EXCEPTION · IRREGULAR LAYOUT</span>
          <span className="stush-koyo__branch-line" aria-hidden="true" />
          <div className="stush-koyo__stage stush-koyo__stage--exception">
            <span>TEMPORARY POSITION + CELL PARSER</span>
            <strong>Map this input back to the shared schema</strong>
          </div>
        </div>
        <span className="stush-koyo__rejoin" aria-hidden="true">↘</span>
        <div className="stush-koyo__stage stush-koyo__stage--rejoin">
          <span>REJOIN THE COMMON PATH</span>
          <strong>Continue shared normalization rules</strong>
          <small>Same reporting fields and output contract</small>
        </div>
        <figcaption>One temporary source-specific reader; the input rejoins shared normalization. No client cell positions or records are shown.</figcaption>
      </figure>
    </section>
  );
}

export default function StushPattiesCase() {
  return (
    <article className="stush-data-story" aria-labelledby="stush-title">
      <nav className="stush-case-nav" aria-label="Experience breadcrumb">
        <Link to="/experience">‹ EXPERIENCE</Link>
        <span>EXPERIENCE / STUSH PATTIES</span>
      </nav>

      <header className="stush-data-hero" id="stush-opening">
        <p className="stush-kicker">SOFTWARE ENGINEERING INTERN · DATA PIPELINES &amp; AUTOMATION</p>
        <div className="stush-data-hero__title-row">
          <h1 id="stush-title">Stush Patties</h1>
          <span className="stush-data-hero__period">SEP–NOV 2025</span>
        </div>
        <div className="stush-data-hero__summary">
          <p className="stush-data-hero__thesis">Separate distributor reports. One repeatable path to Power BI.</p>
          <p>
            I built Python ingestion, parsing, and normalization work for an external client project, helping turn uneven sales files into a shared reporting structure.
          </p>
        </div>
      </header>

      <section className="stush-brief" aria-labelledby="stush-brief-title">
        <div className="stush-brief__heading">
          <p className="stush-kicker">THE CLIENT PROBLEM</p>
          <h2 id="stush-brief-title">A business goal came before a clean data specification.</h2>
        </div>
        <div className="stush-brief__body">
          <p>
            The client received distributor reports separately and needed a more consistent view of sales information. The files did not arrive with one shared layout, field vocabulary, or reporting convention.
          </p>
          <p>
            With Shiv, I worked through stakeholder requirements in recurring client conversations and translated that reporting need into practical data rules and a repeatable handoff.
          </p>
        </div>
      </section>

      <section className="stush-ingestion" aria-labelledby="stush-ingestion-title">
        <div className="stush-section-intro">
          <p className="stush-kicker">FROM MESSY SOURCES TO A CONTRACT</p>
          <h2 id="stush-ingestion-title">Parse each layout before applying the shared rules.</h2>
          <p>Source-aware Python parsing fed a canonical schema, a normalization step, and a documented reporting handoff.</p>
        </div>
        <SourceParsingFigure />
      </section>

      <KoyoException />

      <section className="stush-ownership" id="stush-role" aria-labelledby="stush-ownership-title">
        <div className="stush-ownership__title">
          <p className="stush-kicker">JOSHUA’S ROLE · SHARED DELIVERY</p>
          <h2 id="stush-ownership-title">Requirements translation sat beside the Python work.</h2>
        </div>
        <div className="stush-ownership__details">
          <p>
            In the two-person technical team, Shiv and I worked with client stakeholders. My work included Python parsing and normalization, shaping shared field rules, and validating the repeatable reporting path.
          </p>
          <p>
            The project taught me to keep the general transformation understandable while isolating a source-specific exception when the real file called for it.
          </p>
        </div>
      </section>

      <footer className="stush-close" id="stush-reflection">
        <div className="stush-close__heading">
          <p className="stush-kicker">WHAT THE WORK ESTABLISHED</p>
          <h2>A messy input problem became a documented, repeatable reporting path.</h2>
        </div>
        <div className="stush-close__reflection">
          <span>THE ENGINEERING LESSON</span>
          <p>Normalize the business meaning. Keep the irregular source exception bounded.</p>
        </div>
      </footer>
    </article>
  );
}
