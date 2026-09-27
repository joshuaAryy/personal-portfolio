export default function StushPattiesCase() {
  return (
    <article className="stush-story" aria-labelledby="stush-title">
      <header className="stush-hero" id="stush-opening">
        <p className="stush-kicker">EXPERIENCE / DATA PIPELINES &amp; AUTOMATION</p>
        <div className="stush-hero__heading">
          <h1 id="stush-title">Making distributor data easier to use.</h1>
          <p className="stush-hero__date">SEPTEMBER — NOVEMBER 2025</p>
        </div>
        <div className="stush-hero__summary">
          <p>
            Distributor sales files arrived in inconsistent formats and
            structures. The work turned those inputs into a more repeatable
            path to structured reporting.
          </p>
          <p className="stush-hero__credit">
            Software Engineering Intern · Two-person team with Shiv
          </p>
        </div>
      </header>

      <section className="stush-section stush-problem" id="stush-inputs">
        <div className="stush-section__label">
          <span>01</span>
          <p>THE INPUTS</p>
        </div>
        <div className="stush-problem__copy">
          <h2>One reporting need. Three different starting points.</h2>
          <p>
            Koyo, UNFI, and Dovre supplied sales data with differing layouts.
            CSV, XLSX, and XLSB files were present across the inputs; no single
            file shape could be assumed.
          </p>
        </div>
        <ul className="stush-source-list" aria-label="Distributor inputs">
          <li>
            <span aria-hidden="true">01</span>
            <strong>Koyo</strong>
            <small>DISTRIBUTOR INPUT</small>
          </li>
          <li>
            <span aria-hidden="true">02</span>
            <strong>UNFI</strong>
            <small>DISTRIBUTOR INPUT</small>
          </li>
          <li>
            <span aria-hidden="true">03</span>
            <strong>Dovre</strong>
            <small>DISTRIBUTOR INPUT</small>
          </li>
        </ul>
        <div className="stush-format-note">
          <span>FORMATS ACROSS INPUTS</span>
          <p><b>CSV</b><b>XLSX</b><b>XLSB</b></p>
        </div>
      </section>

      <figure className="stush-map" aria-labelledby="stush-map-title">
        <div className="stush-map__heading">
          <div>
            <p className="stush-map__eyebrow">FROM SOURCE FILES TO REPORTING</p>
            <h2 id="stush-map-title">A path toward a consistent handoff</h2>
          </div>
          <span className="stush-map__index" aria-hidden="true">01 — 04</span>
        </div>
        <div className="stush-map__source">
          <span className="stush-map__source-label">DISTRIBUTOR FILES</span>
          <ul className="stush-map__source-names" aria-label="Distributor sources">
            <li>Koyo</li>
            <li>UNFI</li>
            <li>Dovre</li>
          </ul>
          <p>Different structures and file formats</p>
        </div>
        <ol className="stush-flow">
          <li className="stush-flow__stage stush-flow__stage--parse">
            <span className="stush-flow__number" aria-hidden="true">01</span>
            <h3>Parse by source</h3>
            <p>Read each distributor’s structure with source-specific parsing.</p>
            <aside className="stush-koyo-note" aria-label="Koyo parsing exception">
              <span>KOYO / EDGE CASE</span>
              <p>A temporary position-and-cell parser was used pragmatically for its hardest input.</p>
            </aside>
          </li>
          <li className="stush-flow__stage">
            <span className="stush-flow__number" aria-hidden="true">02</span>
            <h3>Shape a shared schema</h3>
            <p>Bring parsed records into a consistent canonical structure.</p>
          </li>
          <li className="stush-flow__stage">
            <span className="stush-flow__number" aria-hidden="true">03</span>
            <h3>Normalize for comparison</h3>
            <p>Align units, sales, case packs, and reporting months.</p>
          </li>
          <li className="stush-flow__stage stush-flow__stage--handoff">
            <span className="stush-flow__number" aria-hidden="true">04</span>
            <h3>Prepare the handoff</h3>
            <p>Unified CSV, data dictionary, and quality report for Power BI.</p>
          </li>
        </ol>
        <figcaption>
          A source-safe reconstruction of the workflow; distributor formats are
          shown across the inputs, not mapped to individual sources.
        </figcaption>
      </figure>

      <section className="stush-section stush-role" id="stush-role">
        <div className="stush-section__label">
          <span>02</span>
          <p>MY CONTRIBUTION</p>
        </div>
        <div className="stush-role__main">
          <h2>Practical parsing, shaped around how reporting needed to work.</h2>
          <p>
            I contributed to Python parsing and normalization, helped translate
            reporting needs into workable data rules, and took part in regular
            stakeholder conversations. I worked alongside Shiv on the shared
            pipeline effort.
          </p>
        </div>
        <aside className="stush-role__context">
          <span>PROJECT CONTEXT</span>
          <p>External client project through Riipen / IBM SkillsBuild</p>
          <p>Software Engineering Intern<br />Data Pipelines &amp; Automation</p>
        </aside>
      </section>

      <section className="stush-outcome" id="stush-outcome">
        <p className="stush-kicker">THE HANDOFF</p>
        <h2>A more repeatable path from raw files to reporting.</h2>
        <div
          className="stush-outcome__artifacts"
          role="group"
          aria-label="Reporting handoff sequence"
        >
          <span>Unified CSV</span><i aria-hidden="true" />
          <span>Data dictionary</span><i aria-hidden="true" />
          <span>Quality report</span><i aria-hidden="true" />
          <strong>Power BI</strong>
        </div>
        <p className="stush-outcome__note">
          The reported outcome is a reusable structured handoff. No client
          records or dashboard results are reproduced here.
        </p>
      </section>

      <footer className="stush-reflection" id="stush-reflection">
        <span>LOOKING BACK</span>
        <p>
          The hardest parts were in the exceptions: understanding what each
          source meant, then choosing a practical rule that made the next
          reporting step more repeatable.
        </p>
      </footer>
    </article>
  );
}
