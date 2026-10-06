import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./stush-case-study.css";

const formats = ["CSV", "XLSX", "XLSB"] as const;

const businessRules = [
  {
    field: "Sales",
    rule: "Map equivalent fields and normalize the numeric representation.",
  },
  {
    field: "Units",
    rule: "Bring unit measures into a consistent downstream meaning.",
  },
  {
    field: "Case pack",
    rule: "Interpret pack context before creating the shared record.",
  },
  {
    field: "Reporting month",
    rule: "Align periods so the same reporting window is comparable.",
  },
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
          <p className="stush-kicker">ONE REPORTING CONTRACT</p>
          <h3 id="stush-source-map-title">Different file shapes resolve into the same fields.</h3>
        </div>
        <p>Illustrative structure only. No client records, exact source headers, or measured values are shown.</p>
      </header>

      <div className="stush-transform" role="group" aria-label="Heterogeneous report layouts are parsed into shared fields and reporting outputs">
        <section className="stush-transform__sources" aria-labelledby="stush-transform-inputs-title">
          <p className="stush-transform__eyebrow">INCOMING FILES</p>
          <h4 id="stush-transform-inputs-title">Different structures</h4>
          <div className="stush-transform__file-set">
            <div className="stush-transform__input stush-transform__input--rows" aria-label="Illustrative file A with uneven row layout">
              <span>FILE A</span><i /><i /><i />
            </div>
            <div className="stush-transform__input stush-transform__input--grid" aria-label="Illustrative file B with a grid layout">
              <span>FILE B</span><i /><i /><i /><i /><i /><i />
            </div>
            <div className="stush-transform__input stush-transform__input--groups" aria-label="Illustrative file C with grouped fields">
              <span>FILE C</span><i /><i /><i /><i />
            </div>
          </div>
          <p className="stush-transform__formats">{formats.join(" · ")} across the input set</p>
        </section>

        <span className="stush-transform__connector" aria-hidden="true">›</span>

        <section className="stush-transform__reader" aria-labelledby="stush-transform-reader-title">
          <p className="stush-transform__eyebrow">PYTHON PARSING</p>
          <h4 id="stush-transform-reader-title">Read each layout</h4>
          <p>Source-aware readers interpret structure before fields enter the shared model.</p>
          <div className="stush-transform__reader-lines" aria-hidden="true"><i /><i /><i /></div>
        </section>

        <span className="stush-transform__connector" aria-hidden="true">›</span>

        <section className="stush-transform__schema" aria-labelledby="stush-transform-schema-title">
          <p className="stush-transform__eyebrow">CANONICAL SCHEMA</p>
          <h4 id="stush-transform-schema-title">Shared reporting schema</h4>
          <ol aria-label="Shared business dimensions">
            {businessRules.map(({ field }, index) => (
              <li className={`stush-transform__field stush-transform__field--${index + 1}`} key={field}>
                <span>{field}</span><i />
              </li>
            ))}
          </ol>
        </section>

        <span className="stush-transform__connector" aria-hidden="true">›</span>

        <section className="stush-transform__outputs" aria-labelledby="stush-transform-output-title">
          <p className="stush-transform__eyebrow">REPORTING HANDOFF</p>
          <h4 id="stush-transform-output-title">Useful artifacts</h4>
          <ul>
            <li className="stush-transform__output"><i aria-hidden="true" />Standardized CSV</li>
            <li className="stush-transform__output"><i aria-hidden="true" />Data dictionary</li>
            <li className="stush-transform__output"><i aria-hidden="true" />Quality report</li>
          </ul>
          <strong className="stush-transform__powerbi">Power BI handoff</strong>
        </section>
      </div>

      <figcaption>
        The input illustrations are deliberately generic: CSV, XLSX, and XLSB appeared across sources, but the formats are not assigned to individual distributors. No client records or source values are reproduced.
      </figcaption>
    </figure>
  );
}

function BusinessRuleLedger() {
  return (
    <figure className="stush-rule-ledger" aria-labelledby="stush-rules-title">
      <header className="stush-figure-heading stush-figure-heading--ledger">
        <div>
          <p className="stush-kicker">NORMALIZATION DECISIONS</p>
          <h3 id="stush-rules-title">The schema only helped if the business meanings lined up.</h3>
        </div>
        <p>Four dimensions carried through the shared reporting path.</p>
      </header>

      <div className="stush-rule-table" role="table" aria-label="Business dimensions and normalization work">
        <div className="stush-rule-table__head" role="row">
          <span role="columnheader">DIMENSION</span>
          <span role="columnheader">RULE WORK</span>
          <span role="columnheader">SHARED RESULT</span>
        </div>
        {businessRules.map(({ field, rule }, index) => (
          <div className="stush-rule-row" role="row" key={field}>
            <span className="stush-rule-row__index" aria-hidden="true">0{index + 1}</span>
            <h4 role="rowheader">{field}</h4>
            <p role="cell">{rule}</p>
            <span className="stush-rule-row__mapping" role="cell" aria-label={`${field} mapped to shared schema`}>
              <i aria-hidden="true" />
              <span aria-hidden="true" />
              <b>{field}</b>
            </span>
          </div>
        ))}
      </div>

      <figcaption>
        Lines indicate field mapping only; their lengths do not encode values. The figure does not invent formulas, source headers, or client records.
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
          The Koyo workbook was the bounded exception: a temporary position-and-cell path handled its irregular layout before returning to the shared normalization path.
        </p>
      </div>

      <figure className="stush-koyo__route" aria-label="A source-specific position-and-cell path returns to shared normalization">
        <div className="stush-koyo__stage">
          <span>GENERAL PIPELINE</span>
          <strong>Source-aware parsing</strong>
        </div>
        <div className="stush-koyo__branch">
          <span className="stush-koyo__branch-label">One source-specific exception</span>
          <span className="stush-koyo__branch-line" aria-hidden="true" />
          <div className="stush-koyo__stage stush-koyo__stage--exception">
            <span>TEMPORARY PATH</span>
            <strong>Temporary position-and-cell path</strong>
          </div>
        </div>
        <span className="stush-koyo__rejoin" aria-hidden="true">↘</span>
        <div className="stush-koyo__stage stush-koyo__stage--rejoin">
          <span>REJOIN</span>
          <strong>Rejoins the shared normalization path</strong>
        </div>
        <figcaption>One source-specific branch; the broader pipeline stayed shared.</figcaption>
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
          <h2 id="stush-ingestion-title">Handle variation before it reaches reporting.</h2>
          <p>Each source was read on its own terms; the downstream schema stayed consistent.</p>
        </div>
        <SourceParsingFigure />
      </section>

      <section className="stush-normalization" aria-labelledby="stush-normalization-title">
        <div className="stush-section-intro stush-section-intro--split">
          <div>
            <p className="stush-kicker">BUSINESS RULES</p>
            <h2 id="stush-normalization-title">Normalize business dimensions for shared reporting.</h2>
          </div>
          <p>Aligning fields was not just renaming columns. Sales, units, pack logic, and calendar periods all needed practical treatment.</p>
        </div>
        <BusinessRuleLedger />
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
