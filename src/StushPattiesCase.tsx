import "./stush-case-study.css";

const inputs = ["FEED A", "FEED B", "FEED C"];
const contributors = ["Koyo", "UNFI", "Dovre"];
const formats = ["CSV", "XLSX", "XLSB"];
const stages = [
  {
    index: "01",
    name: "Read & parse",
    detail: "CSV, XLSX, and XLSB occurred across the inputs. Parsing followed each file’s structure before records entered the shared model.",
    code: "FORMAT + LAYOUT",
  },
  {
    index: "02",
    name: "Canonicalize fields",
    detail: "Translate differing columns and layouts into shared product, sales/unit, case-pack, and reporting-month fields.",
    code: "SHARED FIELD CONTRACT",
  },
  {
    index: "03",
    name: "Normalize for reporting",
    detail: "Align sales and units with case packs and reporting months before records move into the reporting handoff.",
    code: "COMPARABLE REPORTING DATA",
  },
];

function DataGrid() {
  return (
    <div className="stush-data-grid" aria-hidden="true">
      <div className="stush-data-grid__head" aria-hidden="true">
        <span>PRODUCT</span>
        <span>SALES / UNIT</span>
        <span>CASE PACK</span>
        <span>REPORT MONTH</span>
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
            I contributed Python parsing and normalization to bring incompatible distributor files into a
            shared schema, align sales, units, case packs, and reporting months, and prepare a repeatable
            Power BI handoff.
          </p>
          <dl className="stush-facts" aria-label="Project scope">
            <div><dt>SOURCE SET</dt><dd>Three distributor feeds</dd></div>
            <div><dt>INPUT TYPES</dt><dd>CSV · XLSX · XLSB</dd></div>
            <div><dt>TEAM</dt><dd>Two technical contributors</dd></div>
          </dl>
        </div>
        <div className="stush-source-band" aria-label="Distributor inputs">
          <span className="stush-source-band__label">FORMATS ACROSS INPUTS</span>
          <ul className="stush-format-list">{formats.map((format) => <li key={format}>{format}</li>)}</ul>
          <span className="stush-source-band__divider" aria-hidden="true" />
          <span className="stush-source-band__label">CLIENT FEEDS</span>
          <ul className="stush-source-band__clients">{contributors.map((input) => <li key={input}>{input}</li>)}</ul>
          <span className="stush-source-band__note">Formats describe the input set; none is assigned to one distributor.</span>
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
              <h3 id="stush-pipeline-title">Read each input, then reconcile it to one reporting contract</h3>
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
              <p>Different containers and layouts<br />CSV · XLSX · XLSB across inputs</p>
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
            <p><b>Source-specific exception.</b> Koyo was the hardest input. Explicit positions and cells handled the layout pragmatically; this temporary parser branch then fed the shared normalization path.</p>
          </aside>
          <figcaption>Format labels describe the input set; they are not mapped one-to-one to distributors.</figcaption>
        </figure>

        <section className="stush-contract" aria-labelledby="stush-contract-title">
          <div className="stush-contract__heading">
            <p className="stush-overline">THE RECONCILIATION CONTRACT</p>
            <h3 id="stush-contract-title">A file could be read correctly and still be hard to compare.</h3>
          </div>
          <ol className="stush-contract__steps">
            <li>
              <span>01 / INPUT</span>
              <h4>Separate container from source</h4>
              <p>CSV, XLSX, and XLSB describe how an input is packaged. They occurred across the distributors and are not mapped one-to-one.</p>
            </li>
            <li>
              <span>02 / SHARED FIELDS</span>
              <h4>Decouple reporting from layout</h4>
              <p>Different column labels and layouts needed to resolve into one schema before sales and units could be considered together.</p>
            </li>
            <li>
              <span>03 / REPORTING GRAIN</span>
              <h4>Align the comparison basis</h4>
              <p>Case packs and reporting months had to line up with sales and units so the handoff reflected the client’s reporting question.</p>
            </li>
          </ol>
        </section>
      </section>

      <section className="stush-ownership" id="stush-role">
        <div className="stush-ownership__title">
          <p className="stush-overline">TECHNICAL OWNERSHIP</p>
          <h2>Engineering around the reporting question.</h2>
        </div>
        <div className="stush-ownership__details">
          <p>
            I contributed to Python parsing and normalization and helped shape the shared schema and
            practical data rules around the reporting need. That meant treating the files as inputs to a
            repeatable transformation, rather than treating each workbook as the report itself.
          </p>
          <p>
            This was a two-person technical team with Shiv. Regular stakeholder conversations helped turn
            the client’s business requirement into a repeatable workflow and a handoff that included the
            unified CSV, data dictionary, and quality report for Power BI use.
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
