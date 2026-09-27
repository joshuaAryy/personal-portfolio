import "./stush-case-study.css";

const inputs = ["Koyo", "UNFI", "Dovre"];
const formats = ["CSV", "XLSX", "XLSB"];
const stages = [
  {
    index: "01",
    name: "Parse by source",
    detail: "Read each distributor’s layout through parsing suited to its structure.",
    code: "PYTHON / SOURCE ADAPTERS",
  },
  {
    index: "02",
    name: "Canonicalize",
    detail: "Bring unlike records into a shared structure for downstream work.",
    code: "SHARED FIELD CONTRACT",
  },
  {
    index: "03",
    name: "Normalize",
    detail: "Align sales, units, case packs, and reporting months.",
    code: "COMPARABLE REPORTING DATA",
  },
];

function DataGrid() {
  return (
    <div className="stush-data-grid" aria-hidden="true">
      <div className="stush-data-grid__head">
        <i />
        <i />
        <i />
        <i />
      </div>
      {Array.from({ length: 4 }, (_, row) => (
        <div className="stush-data-grid__row" key={row}>
          {Array.from({ length: 4 }, (_, col) => (
            <i className={`stush-data-grid__cell stush-data-grid__cell--${(row + col) % 3}`} key={col} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function StushPattiesCase() {
  return (
    <article className="stush-data-story" aria-labelledby="stush-title">
      <header className="stush-data-hero" id="stush-opening">
        <div className="stush-data-hero__eyebrow">
          <span>EXPERIENCE / DATA PIPELINES &amp; AUTOMATION</span>
          <span>SEP — NOV 2025</span>
        </div>
        <h1 id="stush-title">A reporting pipeline for data that arrived in different shapes.</h1>
        <div className="stush-data-hero__bottom">
          <p>
            I contributed to a Python workflow that parsed and normalized three distributors’ sales files,
            preparing a more repeatable path into reporting.
          </p>
          <dl className="stush-facts" aria-label="Project scope">
            <div><dt>INPUTS</dt><dd>03 distributors</dd></div>
            <div><dt>FORMATS</dt><dd>CSV · XLSX · XLSB</dd></div>
            <div><dt>TEAM</dt><dd>Two technical contributors</dd></div>
          </dl>
        </div>
        <div className="stush-source-band" aria-label="Distributor inputs">
          <span className="stush-source-band__label">DISTRIBUTOR INPUTS</span>
          <ul>{inputs.map((input) => <li key={input}>{input}</li>)}</ul>
          <span className="stush-source-band__divider" aria-hidden="true" />
          <span className="stush-source-band__label">FORMATS ACROSS INPUTS</span>
          <ul className="stush-format-list">{formats.map((format) => <li key={format}>{format}</li>)}</ul>
          <span className="stush-source-band__note">Formats are not assigned to individual distributors.</span>
        </div>
      </header>

      <section className="stush-problem-map" id="stush-inputs" aria-labelledby="stush-problem-title">
        <div className="stush-section-heading">
          <div>
            <p className="stush-overline">THE ENGINEERING PROBLEM</p>
            <h2 id="stush-problem-title">A shared report needed a shared data contract.</h2>
          </div>
          <p className="stush-section-heading__aside">
            Layouts varied across source files. Reporting required the important measures and time periods
            to line up before records could be read together.
          </p>
        </div>

        <figure className="stush-pipeline" aria-labelledby="stush-pipeline-title">
          <div className="stush-pipeline__topline">
            <div>
              <span className="stush-overline">TRANSFORMATION FLOW / 01—04</span>
              <h3 id="stush-pipeline-title">From distributor files to a reporting handoff</h3>
            </div>
            <span className="stush-pipeline__language">PYTHON · DATA NORMALIZATION</span>
          </div>

          <div className="stush-pipeline__inputs">
            <div className="stush-pipeline__stage-label"><span>01</span><b>SOURCE FILES</b></div>
            <div className="stush-file-stack" aria-label="Three distributor inputs with differing structures">
              {inputs.map((input, index) => (
                <div className="stush-file" key={input}>
                  <strong>{input}</strong>
                  <span className="stush-file__fields" aria-hidden="true">
                    {Array.from({ length: index === 1 ? 4 : 5 }, (_, i) => <i key={i} />)}
                  </span>
                  <span className="stush-file__index">INPUT 0{index + 1}</span>
                </div>
              ))}
              <p>Different layouts<br />CSV · XLSX · XLSB across inputs</p>
            </div>
          </div>

          <div className="stush-pipeline__connector" aria-hidden="true"><i /></div>

          <ol className="stush-transform-stages" aria-label="Pipeline transformations">
            {stages.map((stage) => (
              <li className="stush-transform" key={stage.index}>
                <div className="stush-pipeline__stage-label"><span>{stage.index}</span><b>{stage.code}</b></div>
                <h4>{stage.name}</h4>
                {stage.index === "02" ? <DataGrid /> : <div className="stush-transform__signal" aria-hidden="true"><i /><i /><i /></div>}
                <p>{stage.detail}</p>
              </li>
            ))}
          </ol>

          <div className="stush-pipeline__connector stush-pipeline__connector--last" aria-hidden="true"><i /></div>

          <div className="stush-handoff-stage">
            <div className="stush-pipeline__stage-label"><span>04</span><b>REPORTING HANDOFF</b></div>
            <ul>
              <li><span>01</span> Unified CSV</li>
              <li><span>02</span> Data dictionary</li>
              <li><span>03</span> Quality report</li>
            </ul>
            <div className="stush-powerbi"><span>DESTINATION</span><strong>Power BI</strong><i aria-hidden="true" /></div>
          </div>

          <aside className="stush-exception" aria-label="Koyo parser exception">
            <div className="stush-exception__route"><span>KOYO INPUT</span><i aria-hidden="true">→</i><strong>TEMPORARY POSITION-AND-CELL PARSER</strong><i aria-hidden="true">→</i><span>SHARED NORMALIZATION</span></div>
            <p><b>Source-specific exception.</b> Explicit positions and cells were used where needed for the hardest input; this pragmatic parser path was temporary and did not define the other sources.</p>
          </aside>
          <figcaption>Formats are shown across the three inputs. No sample client records or dashboard outputs are reproduced.</figcaption>
        </figure>
      </section>

      <section className="stush-ownership" id="stush-role">
        <div className="stush-ownership__title">
          <p className="stush-overline">TECHNICAL OWNERSHIP</p>
          <h2>Engineering around the reporting question.</h2>
        </div>
        <div className="stush-ownership__details">
          <p>
            I contributed to Python parsing and normalization, helped shape the shared schema, and worked
            through practical data rules with the reporting needs in view.
          </p>
          <p>
            This was a two-person technical team with Shiv. Regular stakeholder conversations helped turn
            the client’s business requirement into a repeatable workflow and a useful handoff.
          </p>
          <div className="stush-project-context">
            <span>PROJECT CONTEXT</span>
            <strong>Software Engineering Intern</strong>
            <small>External client project · Riipen / IBM SkillsBuild</small>
          </div>
        </div>
      </section>

      <footer className="stush-learning" id="stush-reflection">
        <div><p className="stush-overline">WHAT THE WORK TAUGHT ME</p><h2>Good data work begins by understanding what the next person needs to compare.</h2></div>
        <p className="stush-learning__close">REPEATABLE TRANSFORMATIONS<br /><span>→</span> REPORTING WITH CONTEXT</p>
      </footer>
    </article>
  );
}
