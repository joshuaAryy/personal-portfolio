import "./stush-case-study.css";
import { Link } from "react-router-dom";

const sourceLayouts: { id: string; type: string; widths: number[]; highlights: number[] }[] = [
  { id: "01", type: "rows", widths: [70, 47, 79, 42, 62], highlights: [1] },
  { id: "02", type: "grid", widths: [78, 49, 63, 42, 83, 55, 69, 40, 74, 56, 48, 81], highlights: [4, 9] },
  { id: "03", type: "grouped", widths: [76, 41, 66, 55, 82], highlights: [1, 4] },
];

const extractedLayouts: { id: string; widths: number[]; highlight: number }[] = [
  { id: "01", widths: [27, 49, 22, 38, 25], highlight: 1 },
  { id: "02", widths: [42, 22, 33, 25, 37], highlight: 3 },
  { id: "03", widths: [20, 36, 45, 21, 29], highlight: 2 },
];

const normalizedDimensions = ["Sales + units", "Case pack", "Reporting month"] as const;
const reportArtifacts = ["Unified CSV", "Data dictionary", "Quality report"] as const;

function SystemFlowFigure() {
  return (
    <figure className="stush-system-flow" aria-labelledby="stush-flow-title">
      <header className="stush-system-flow__heading">
        <div>
          <p className="stush-overline">THE DATA PIPELINE</p>
          <h3 id="stush-flow-title">Different file shapes. One reporting path.</h3>
        </div>
        <p>From incoming sales files to a Power BI handoff</p>
      </header>

      <ol className="stush-system-flow__spine" aria-label="Pipeline stages">
        <li><span>01</span> Files</li>
        <li><span>02</span> Parse</li>
        <li><span>03</span> Shared schema</li>
        <li><span>04</span> Normalize</li>
        <li><span>05</span> Handoff</li>
      </ol>

      <div className="stush-system-flow__visual">
        <div className="stush-system-flow__inputs">
          <h4>Sales files</h4>
          <p>Different layouts</p>
          <div className="stush-file-sheets" aria-hidden="true">
            {sourceLayouts.map((layout) => (
              <div className={`stush-file-sheet stush-file-sheet--${layout.type}`} key={layout.id}>
                <strong>FILE {layout.id}</strong>
                <span className="stush-file-sheet__rule" />
                <span className="stush-file-sheet__rows">
                  {layout.widths.map((width, index) => (
                    <b
                      className={layout.highlights.includes(index) ? "is-highlight" : undefined}
                      key={`${layout.id}-${index}`}
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>
          <p className="stush-system-flow__formats">
            <strong>CSV · XLSX · XLSB</strong>
            <span>Formats across inputs</span>
          </p>
        </div>

        <span className="stush-system-flow__arrow stush-system-flow__arrow--inputs stush-system-flow__arrow--cue-1" aria-hidden="true">→</span>

        <div className="stush-system-flow__transformation">
          <div className="stush-flow-parser">
            <p className="stush-flow-kicker">PARSE</p>
            <h4>Read each structure</h4>
            <p className="stush-flow-copy">Field positions vary</p>
            <ol className="stush-parser-rows" aria-hidden="true">
              {extractedLayouts.map((layout) => (
                <li key={layout.id}>
                  <span>{layout.id}</span>
                  <span className="stush-parser-row__fragments">
                    {layout.widths.map((width, index) => (
                      <b
                        className={layout.highlight === index ? "is-highlight" : undefined}
                        key={`${layout.id}-${index}`}
                        style={{ flex: `${width} 1 0%` }}
                      />
                    ))}
                  </span>
                </li>
              ))}
            </ol>
            <p className="stush-parser-caption">Fields found in each layout</p>
          </div>

          <span className="stush-system-flow__arrow stush-system-flow__arrow--inner stush-system-flow__arrow--cue-2" aria-hidden="true">→</span>

          <div className="stush-flow-schema">
            <p className="stush-flow-kicker">SHARED FIELD CONTRACT</p>
            <h4>Four stable meanings</h4>
            <ul className="stush-schema-fields">
              {["Sales", "Units", "Case pack", "Reporting month"].map((field, index) => (
                <li key={field}>
                  <i className={index === 0 ? "is-gold" : undefined} aria-hidden="true" />
                  {field}
                </li>
              ))}
            </ul>
          </div>

          <span className="stush-system-flow__arrow stush-system-flow__arrow--inner stush-system-flow__arrow--cue-3" aria-hidden="true">→</span>

          <div className="stush-flow-normalize">
            <p className="stush-flow-kicker">NORMALIZE</p>
            <h4>Apply shared rules</h4>
            <ul className="stush-normalize-rows">
              {normalizedDimensions.map((dimension, index) => (
                <li key={dimension}>
                  <span>{dimension}</span>
                  <i className={`stush-normalize-rows__source stush-normalize-rows__source--${index + 1}`} aria-hidden="true" />
                  <b aria-hidden="true">→</b>
                  <i className="stush-normalize-rows__target" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stush-system-flow__handoff">
          <p className="stush-flow-kicker">STANDARDIZED OUTPUT</p>
          <div className="stush-handoff-content">
            <ul className="stush-report-artifacts">
              {reportArtifacts.map((artifact) => (
                <li key={artifact}>
                  <i aria-hidden="true"><span /><span /></i>
                  {artifact}
                </li>
              ))}
            </ul>
            <span className="stush-system-flow__arrow stush-system-flow__arrow--cue-4" aria-hidden="true">→</span>
            <div className="stush-powerbi-destination">
              <strong>Power BI</strong>
              <span>Reporting handoff</span>
            </div>
          </div>
        </div>
      </div>

      <figcaption>Conceptual pipeline · no source values shown.</figcaption>
    </figure>
  )
}
export default function StushPattiesCase() {
  return (
    <article className="stush-data-story" aria-labelledby="stush-title">
      <nav className="stush-case-nav" aria-label="Experience breadcrumb">
        <Link to="/experience">‹ EXPERIENCE</Link>
        <span>EXPERIENCE / STUSH PATTIES</span>
      </nav>
      <header className="stush-data-hero" id="stush-opening">
        <h1 id="stush-title">Stush Patties</h1>
        <div className="stush-data-hero__eyebrow">
          <span>SOFTWARE ENGINEERING INTERN · DATA PIPELINES &amp; AUTOMATION</span>
          <span>Sep–Nov 2025</span>
        </div>
        <div className="stush-data-hero__bottom">
          <div className="stush-data-hero__contribution">
            <p className="stush-overline stush-data-hero__contribution-label">
              INCONSISTENT SALES FILES → REPEATABLE REPORTING
            </p>
            <p>
              Sales files arrived in inconsistent layouts, making repeatable reporting difficult. I built Python parsing and
              normalization steps to map them into one shared schema for Power BI reporting.
            </p>
          </div>
          <aside className="stush-input-summary" aria-label="Input set">
            <strong>FILES</strong>
            <div>
              <p>SALES FILES · LAYOUTS VARY</p>
              <span>Koyo · UNFI · Dovre</span>
            </div>
            <p className="stush-input-summary__formats">CSV / XLSX / XLSB · ACROSS INPUTS</p>
            <span className="stush-input-summary__rule" aria-hidden="true" />
          </aside>
        </div>
      </header>

      <section className="stush-problem-map" id="stush-inputs" aria-labelledby="stush-problem-title">
        <div className="stush-section-heading">
          <div>
            <p className="stush-overline">THE INPUTS</p>
            <h2 id="stush-problem-title">The same fields had to line up before reporting.</h2>
          </div>
          <p className="stush-section-heading__aside">
            Source layouts varied across CSV, XLSX, and XLSB. Sales, units, case packs, and reporting months
            needed to share a consistent meaning.
          </p>
        </div>

        <SystemFlowFigure />

        <section className="stush-contract" aria-labelledby="stush-contract-title">
          <div className="stush-contract__heading">
            <p className="stush-overline">WHY A SHARED FIELD CONTRACT</p>
            <h3 id="stush-contract-title">Four business dimensions needed the same meaning across file layouts.</h3>
          </div>
          <div className="stush-contract__mapping">
            <p className="stush-overline">CONCEPTUAL FIELD CONTRACT · NO SOURCE VALUES SHOWN</p>
            <ul className="stush-contract__fields">
              <li>Sales</li><li>Units</li><li>Case pack</li><li>Reporting month</li>
            </ul>
          </div>
        </section>

        <aside className="stush-exception" aria-labelledby="stush-exception-title">
          <div className="stush-exception__label">
            <p className="stush-overline">EDGE CASE</p>
            <h3>ONE OUTLIER</h3>
          </div>
          <div className="stush-exception__detail">
            <h4 id="stush-exception-title">Temporary Koyo position-and-cell parsing exception.</h4>
            <p>
              I mapped the position-and-cell data into the shared schema, then returned it to the common normalization path.
            </p>
          </div>
        </aside>
      </section>

      <section className="stush-ownership" id="stush-role">
        <div className="stush-ownership__title">
          <p className="stush-overline">IMPLEMENTATION + COLLABORATION</p>
          <h2>I built the parsing and normalization steps.</h2>
        </div>
        <div className="stush-ownership__details">
          <p>
            My Python rules mapped inconsistent layouts into the shared schema and aligned sales, units,
            case packs, and reporting months.
          </p>
          <p>
            In our two-person technical team, Shiv and I worked with client stakeholders to translate shared fields into business rules and a repeatable reporting handoff.
          </p>
        </div>
      </section>

      <section className="stush-output" aria-labelledby="stush-output-title">
        <div>
          <p className="stush-overline">OUTPUTS FOR THE NEXT STEP</p>
          <h2 id="stush-output-title">A repeatable path from raw files to Power BI reporting.</h2>
        </div>
        <div className="stush-output__handoff">
          <ul aria-label="Pipeline outputs">
            <li>Unified CSV</li><li>Data dictionary</li><li>Quality report</li>
          </ul>
          <span aria-hidden="true">→</span>
          <strong>Power BI<br /><small>REPORTING HANDOFF</small></strong>
        </div>
      </section>

      <footer className="stush-learning" id="stush-reflection">
        <div><p className="stush-overline">WHAT I LEARNED</p><h2>The work taught me to translate a business question into data rules that make the next reporting step repeatable.</h2></div>
        <p className="stush-learning__close">REPEATABLE TRANSFORMATIONS<br /><span>→</span> REPORTING WITH CONTEXT</p>
      </footer>
    </article>
  );
}
