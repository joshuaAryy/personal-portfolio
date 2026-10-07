import { useEffect, useRef, useState } from "react";
import "./stush-case-study.css";

const formats = ["CSV", "XLSX", "XLSB"] as const;
const distributorSources = ["A", "B", "C"] as const;

const reportingFields = ["Sales", "Units", "Case pack", "Reporting month"] as const;
const normalizationRules = [
  { field: "Sales + units", detail: "Mapped into distinct shared fields" },
  { field: "Case pack", detail: "Retained explicitly in the common contract" },
  { field: "Reporting month", detail: "Aligned to one shared reporting period" },
] as const;

function SourceParsingFigure() {
  const figureRef = useRef<HTMLElement | null>(null);
  const replayFrame = useRef<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;

    if (typeof IntersectionObserver === "undefined") {
      setHasEntered(true);
      return () => {
        if (replayFrame.current !== null) cancelAnimationFrame(replayFrame.current);
      };
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setHasEntered(entry.isIntersecting);
    }, { threshold: 0.1 });

    observer.observe(figure);
    return () => {
      observer.disconnect();
      if (replayFrame.current !== null) cancelAnimationFrame(replayFrame.current);
    };
  }, []);

  const replayFlow = () => {
    if (replayFrame.current !== null) cancelAnimationFrame(replayFrame.current);
    setHasEntered(false);
    replayFrame.current = requestAnimationFrame(() => {
      replayFrame.current = null;
      setHasEntered(true);
    });
  };

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
        <div className="stush-figure-heading__support">
          <p>Read the layout first. Carry the business meaning through one common path.</p>
          <button type="button" aria-controls="stush-reporting-flow" onClick={replayFlow}>Replay the path <span aria-hidden="true">↻</span></button>
        </div>
      </header>

      <div className="stush-transform" id="stush-reporting-flow" role="group" aria-label="Distributor exports flow through Python parsing, a canonical schema, normalization rules, and reporting outputs">
        <section className="stush-transform__sources" aria-labelledby="stush-transform-inputs-title">
          <p className="stush-transform__eyebrow"><b>01</b> DISTRIBUTOR INPUTS</p>
          <h4 id="stush-transform-inputs-title">Three report sources</h4>
          <ul className="stush-transform__source-set" aria-label="Conceptual labels for three distributor sources">
            {distributorSources.map((source) => <li key={source}>DISTRIBUTOR EXPORT {source}</li>)}
          </ul>
          <p className="stush-transform__layout-label">Different layout shapes</p>
          <div className="stush-transform__file-set">
            <div className="stush-transform__input stush-transform__input--rows" aria-label="Illustrative layout 01 with uneven row structure, not assigned to a named distributor">
              <span>LAYOUT 01</span><i /><i /><i />
            </div>
            <div className="stush-transform__input stush-transform__input--grid" aria-label="Illustrative layout 02 with a grid structure, not assigned to a named distributor">
              <span>LAYOUT 02</span><i /><i /><i /><i /><i /><i />
            </div>
            <div className="stush-transform__input stush-transform__input--groups" aria-label="Illustrative layout 03 with grouped fields, not assigned to a named distributor">
              <span>LAYOUT 03</span><i /><i /><i /><i />
            </div>
          </div>
          <p className="stush-transform__formats">Formats across the input set: {formats.join(" · ")}</p>
        </section>

        <section className="stush-transform__reader" aria-labelledby="stush-transform-reader-title">
          <p className="stush-transform__eyebrow"><b>02</b> PYTHON PARSING</p>
          <h4 id="stush-transform-reader-title">Parse before mapping</h4>
          <p>Python readers interpret each source layout before fields enter the shared model.</p>
          <div className="stush-transform__reader-lines" aria-hidden="true"><span>[</span><div><i /><i /><i /></div><span>]</span></div>
          <p className="stush-transform__reader-note">Layout-specific readers,<br />one destination.</p>
        </section>

        <section className="stush-transform__schema" aria-labelledby="stush-transform-schema-title">
          <p className="stush-transform__eyebrow"><b>03</b> CANONICAL SCHEMA</p>
          <h4 id="stush-transform-schema-title">Shared fields</h4>
          <ol aria-label="Shared business fields">
            {reportingFields.map((field) => (
              <li className="stush-transform__field" key={field}>{field}</li>
            ))}
          </ol>
        </section>

        <div className="stush-transform__bridge"><span aria-hidden="true" /><p>The field contract gives the shared rules a common starting point.</p></div>

        <section className="stush-transform__normalization" aria-labelledby="stush-transform-rules-title">
          <p className="stush-transform__eyebrow"><b>04</b> NORMALIZATION RULES</p>
          <h4 id="stush-transform-rules-title">Apply common rules</h4>
          <ol aria-label="Business dimensions aligned for reporting">
            {normalizationRules.map(({ field, detail }, index) => (
              <li className={`stush-transform__rule stush-transform__rule--${index + 1}`} key={field}>
                <span>{field}</span><small>{detail}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="stush-transform__outputs" aria-labelledby="stush-transform-output-title">
          <p className="stush-transform__eyebrow"><b>05</b> REPORTING HANDOFF</p>
          <h4 id="stush-transform-output-title">Data with its documentation</h4>
          <ul>
            <li className="stush-transform__output"><i aria-hidden="true" />Standardized CSV</li>
            <li className="stush-transform__output"><i aria-hidden="true" />Data dictionary</li>
            <li className="stush-transform__output"><i aria-hidden="true" />Quality report</li>
          </ul>
          <div className="stush-transform__destination"><span aria-hidden="true">→</span><strong className="stush-transform__powerbi">Power BI handoff</strong></div>
        </section>
      </div>

      <figcaption>
        Source A, B, and C label the distributor exports. The layout sketches are generic and are not mapped to named distributors. CSV, XLSX, and XLSB appeared across inputs. No client records or source values are reproduced.
      </figcaption>
    </figure>
  );
}

function SourceException() {
  return (
    <section className="stush-source-exception" id="stush-source-exception" aria-labelledby="stush-source-exception-title">
      <div className="stush-source-exception__intro">
        <p className="stush-kicker">A BOUNDED EXCEPTION</p>
        <h2 id="stush-source-exception-title">Keep the layout exception inside the reader.</h2>
        <p>
          The Koyo export had an irregular layout that required a temporary position-and-cell reader. That reader mapped the input into the shared schema; common normalization then continued. The exception addressed how to read one source while preserving the common reporting contract.
        </p>
      </div>

      <figure className="stush-source-exception__route" aria-label="A source-specific position-and-cell path returns to shared normalization">
        <div className="stush-source-exception__stage">
          <span>ONE INPUT</span>
          <strong>An irregular report layout</strong>
        </div>
        <div className="stush-source-exception__branch">
          <span className="stush-source-exception__branch-label">ONE SOURCE-SPECIFIC EXCEPTION · IRREGULAR LAYOUT</span>
          <span className="stush-source-exception__branch-line" aria-hidden="true" />
          <div className="stush-source-exception__stage stush-source-exception__stage--exception">
            <span>TEMPORARY POSITION + CELL PARSER</span>
            <strong>Read this layout into the shared schema</strong>
          </div>
        </div>
        <span className="stush-source-exception__rejoin" aria-hidden="true">↘</span>
        <div className="stush-source-exception__stage stush-source-exception__stage--rejoin">
          <span>REJOIN THE COMMON PATH</span>
          <strong>Continue shared normalization rules</strong>
          <p>Sales · Units · Case pack · Reporting month</p>
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
      <header className="stush-data-hero" id="stush-opening">
        <p className="stush-kicker">EXPERIENCE DETAIL</p>
        <div className="stush-data-hero__title-row">
          <h1 id="stush-title">Stush Patties</h1>
        </div>
        <div className="stush-data-hero__summary">
          <p className="stush-data-hero__thesis">Turning distributor exports into a repeatable reporting handoff.</p>
          <div className="stush-data-hero__support"><p>Different source files. One shared reporting path.</p><p>I contributed Python parsing and normalization, connecting irregular sales exports to shared business fields and a documented Power BI handoff.</p></div>
        </div>
        <dl className="stush-engagement-strip" aria-label="Role and project details">
          <div><dt>ROLE</dt><dd>Software Engineering Intern</dd></div>
          <div><dt>FOCUS</dt><dd>Data Pipelines &amp; Automation</dd></div>
          <div><dt>PERIOD</dt><dd>Sep–Nov 2025</dd></div>
          <div><dt>PROJECT</dt><dd>External client engagement</dd></div>
          <div><dt>TEAM</dt><dd>Two-person technical team</dd></div>
        </dl>
      </header>

      <section className="stush-ingestion" aria-labelledby="stush-ingestion-title">
        <div className="stush-section-intro">
          <p className="stush-kicker">FROM MESSY SOURCE TO A CONTRACT</p>
          <h2 id="stush-ingestion-title">From source layout to reporting language.</h2>
        </div>
        <SourceParsingFigure />
      </section>

      <SourceException />

      <section className="stush-ownership" id="stush-role" aria-labelledby="stush-ownership-title">
        <div className="stush-ownership__title">
          <p className="stush-kicker">MY ROLE · SHARED DELIVERY</p>
          <h2 id="stush-ownership-title">Parsing and requirements translation.</h2>
        </div>
        <div className="stush-ownership__details">
          <p>
            On a two-person technical team, I contributed Python parsing and normalization, shaped shared field rules with my partner, and took part in regular stakeholder conversations.
          </p>
          <p>
            The work connected practical data rules to a documented handoff: a unified CSV, data dictionary, and quality report prepared for Power BI reporting.
          </p>
        </div>
      </section>

      <section className="stush-brief" aria-labelledby="stush-brief-title">
        <div className="stush-brief__heading">
          <p className="stush-kicker">THE CLIENT PROBLEM</p>
          <h2 id="stush-brief-title">Separate sales files made repeatable reporting difficult.</h2>
        </div>
        <div className="stush-brief__body">
          <p>
            Koyo, UNFI, and Dovre were the three distributor sources. CSV, XLSX, and XLSB appeared across their inputs, with different structures. There was no single file shape or field vocabulary to assume.
          </p>
          <p>
            Through recurring stakeholder conversations, my partner and I translated the reporting need into practical data rules: align sales and units, retain case packs, and make reporting months consistent across the shared structure.
          </p>
        </div>
      </section>

      <footer className="stush-close" id="stush-reflection">
        <div className="stush-close__heading">
          <p className="stush-kicker">WHAT THE WORK ESTABLISHED</p>
          <h2>A messy input problem became a documented, repeatable reporting path.</h2>
          <p>The handoff included standardized CSV output, a data dictionary, and a quality report for Power BI reporting.</p>
        </div>
        <div className="stush-close__reflection">
          <span>THE ENGINEERING LESSON</span>
          <p>Normalize the business meaning. Keep the irregular source exception bounded.</p>
        </div>
      </footer>
    </article>
  );
}
