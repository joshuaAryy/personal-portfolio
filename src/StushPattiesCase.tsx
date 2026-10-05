import { Link } from "react-router-dom";
import "./stush-case-study.css";

const distributors = ["Koyo", "UNFI", "Dovre"] as const;
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

const deliverables = [
  { name: "Standardized CSV", note: "One shared output structure", mark: "csv" },
  { name: "Data dictionary", note: "A reference for the shared fields", mark: "dictionary" },
  { name: "Quality report", note: "A companion handoff artifact", mark: "quality" },
] as const;

function SourceParsingFigure() {
  return (
    <figure className="stush-source-map" aria-labelledby="stush-source-map-title">
      <header className="stush-figure-heading">
        <div>
          <p className="stush-kicker">SOURCE-AWARE INGESTION</p>
          <h3 id="stush-source-map-title">Keep each report’s structure at the edge.</h3>
        </div>
        <p>Read the incoming layout, then give downstream reporting one stable contract.</p>
      </header>

      <div className="stush-source-map__flow">
        <section className="stush-origin" aria-labelledby="stush-origin-title">
          <p className="stush-step-label"><span>01</span> DISTRIBUTOR REPORTS</p>
          <h4 id="stush-origin-title">Separate files</h4>
          <ul className="stush-origin__sources" aria-label="Named distributor sources">
            {distributors.map((source, index) => (
              <li className={`stush-origin__source stush-origin__source--${index + 1}`} key={source}>
                <span>{source}</span>
                <i aria-hidden="true" />
              </li>
            ))}
          </ul>
          <div className="stush-origin__formats">
            <span>FORMATS ACROSS THE SET</span>
            <ul aria-label="File formats across inputs">
              {formats.map((format) => <li key={format}>{format}</li>)}
            </ul>
          </div>
        </section>

        <span className="stush-flow-link" aria-hidden="true" />

        <section className="stush-layouts" aria-labelledby="stush-layouts-title">
          <p className="stush-step-label"><span>02</span> DIFFERENT STRUCTURES</p>
          <h4 id="stush-layouts-title">A layout could move the same idea.</h4>
          <div className="stush-layouts__samples" aria-hidden="true">
            <div className="stush-layout-sample stush-layout-sample--rows">
              <i /><i /><i /><i /><i />
            </div>
            <div className="stush-layout-sample stush-layout-sample--grid">
              <i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="stush-layout-sample stush-layout-sample--groups">
              <i /><i /><i /><i /><i />
            </div>
          </div>
          <p>Illustrative shapes only; they are not assigned to a specific distributor.</p>
        </section>

        <span className="stush-flow-link" aria-hidden="true" />

        <section className="stush-readers" aria-labelledby="stush-readers-title">
          <p className="stush-step-label"><span>03</span> PYTHON PARSING</p>
          <h4 id="stush-readers-title">Source-aware Python parsers</h4>
          <ol aria-label="Parsing paths">
            {distributors.map((source, index) => (
              <li key={source}>
                <span>{source}</span>
                <i className={`stush-reader-line stush-reader-line--${index + 1}`} aria-hidden="true" />
                <b>parse</b>
              </li>
            ))}
          </ol>
          <p>Different upstream layouts, handled before the shared model.</p>
        </section>

        <span className="stush-flow-link" aria-hidden="true" />

        <section className="stush-schema" aria-labelledby="stush-schema-title">
          <p className="stush-step-label"><span>04</span> SHARED CONTRACT</p>
          <h4 id="stush-schema-title">Shared reporting schema</h4>
          <ol aria-label="Shared business dimensions">
            {businessRules.map(({ field }) => <li key={field}>{field}</li>)}
          </ol>
        </section>
      </div>

      <figcaption>
        Formats are shown across the complete input set, not mapped one-to-one to suppliers. No client records or source values are reproduced.
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
          A generic parser was not reliable for the Koyo workbook layout, so a temporary position-and-cell path handled that irregularity.
        </p>
      </div>

      <figure className="stush-koyo__route" aria-label="Koyo position-and-cell parser returns to shared normalization">
        <div className="stush-koyo__stage">
          <span>GENERAL PIPELINE</span>
          <strong>Source-aware parsing</strong>
        </div>
        <div className="stush-koyo__branch">
          <span className="stush-koyo__branch-label">One source-specific exception · Koyo</span>
          <span className="stush-koyo__branch-line" aria-hidden="true" />
          <div className="stush-koyo__stage stush-koyo__stage--exception">
            <span>TEMPORARY PATH</span>
            <strong>Koyo position-and-cell parser</strong>
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
        <div className="stush-engagement-strip" aria-label="Project context">
          <div><span>CLIENT</span><strong>External Stush project</strong></div>
          <div><span>TECHNICAL TEAM</span><strong>Joshua + Shiv</strong></div>
          <div><span>PROGRAM CONTEXT</span><strong>Riipen · IBM SkillsBuild</strong></div>
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

      <section className="stush-handoff" aria-labelledby="stush-handoff-title">
        <div className="stush-handoff__heading">
          <p className="stush-kicker">THE HANDOFF</p>
          <h2 id="stush-handoff-title">Structured outputs ready for the next reporting step.</h2>
          <p>The work produced a repeatable route from distributor files to a Power BI reporting handoff.</p>
        </div>
        <figure className="stush-handoff-figure" aria-labelledby="stush-handoff-figure-title">
          <figcaption id="stush-handoff-figure-title">THREE DELIVERABLES · ONE REPORTING DESTINATION</figcaption>
          <div className="stush-handoff-figure__flow">
            <ol aria-label="Produced handoff artifacts">
              {deliverables.map(({ name, note, mark }, index) => (
                <li key={name}>
                  <span className={`stush-artifact-mark stush-artifact-mark--${mark}`} aria-hidden="true"><i /><i /><i /></span>
                  <span className="stush-artifact-order">0{index + 1}</span>
                  <strong>{name}</strong>
                  <small>{note}</small>
                </li>
              ))}
            </ol>
            <span className="stush-handoff-figure__connector" aria-hidden="true" />
            <div className="stush-report-destination">
              <span>REPORTING HANDOFF</span>
              <strong>Power BI</strong>
              <i aria-hidden="true" />
            </div>
          </div>
          <p className="stush-handoff-figure__note">The page describes the handoff structure; it does not reproduce client data or imply a dashboard outcome.</p>
        </figure>
      </section>

      <footer className="stush-close" id="stush-reflection">
        <p className="stush-kicker">WHAT THE WORK ESTABLISHED</p>
        <h2>A messy input problem became a documented, repeatable reporting path.</h2>
        <div className="stush-close__reflection">
          <span>THE ENGINEERING LESSON</span>
          <p>Normalize the business meaning. Keep the irregular source exception bounded.</p>
        </div>
      </footer>
    </article>
  );
}
