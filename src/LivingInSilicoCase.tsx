import { Link } from "react-router-dom";
import "./lis-research-record.css";

function RepresentationFigure() {
  return (
    <figure
      className="lis-public-representation"
      aria-label="Separate dataset counts and molecular representation"
    >
      <figcaption>
        <span>DATA CONTEXT + REPRESENTATION</span>
        <span className="lis-public-representation__note">
          Snapshot and experimental subsets describe different scopes.
        </span>
      </figcaption>

      <div className="lis-public-data-scopes">
        <div className="lis-public-data-scope lis-public-data-scope--snapshot">
          <p className="lis-kicker">APRIL 12 DATASET SNAPSHOT</p>
          <strong>15,696</strong>
          <span>rows in snapshot</span>
          <p>14,487 unique SMILES.</p>
        </div>
        <div className="lis-public-data-scopes__divider" aria-hidden="true">
          <span>SEPARATE SCOPES</span>
        </div>
        <div className="lis-public-data-scope lis-public-data-scope--subsets">
          <p className="lis-kicker">EXPERIMENTAL WORKING SETS</p>
          <strong>~400–600</strong>
          <span>entries across curated experimental subsets</span>
          <p>Used as smaller experiment inputs.</p>
        </div>
      </div>

      <div className="lis-public-representation__source">
        <span>MOLECULAR STRUCTURE</span>
        <svg viewBox="0 0 136 76" aria-hidden="true">
          <g stroke="#a9bdc0" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M24 21h36l20 21H43v21h40M60 21v42M80 42h30" />
          </g>
          <g fill="#eee7d8" stroke="#07141d" strokeWidth="2">
            <circle cx="24" cy="21" r="7" /><circle cx="60" cy="21" r="7" />
            <circle cx="80" cy="42" r="7" /><circle cx="43" cy="42" r="7" />
            <circle cx="60" cy="63" r="7" /><circle cx="83" cy="63" r="7" />
            <circle cx="110" cy="42" r="7" />
          </g>
        </svg>
        <small>Illustrative representation, not a project sample</small>
      </div>

      <div className="lis-public-representation__lanes">
        <div className="lis-public-representation__lane lis-public-representation__lane--sequence">
          <span className="lis-public-representation__lane-index">SEQUENCE</span>
          <div>
            <strong>SMILES sequence</strong>
            <span>Input representation for DeepMol / RNN work</span>
          </div>
        </div>
        <div className="lis-public-representation__lane lis-public-representation__lane--fingerprint">
          <span className="lis-public-representation__lane-index">FEATURES</span>
          <div>
            <strong>Morgan fingerprint</strong>
            <span>Separate RDKit feature lane · radius 2 · 128 bits</span>
          </div>
          <div className="lis-public-representation__bits" aria-hidden="true">
            {Array.from({ length: 32 }, (_, index) => (
              <i className={(index * 7 + index % 5) % 4 === 0 ? "is-on" : undefined} key={index} />
            ))}
          </div>
        </div>
      </div>
      <p className="lis-public-representation__footnote">
        Two representations explored for different modeling work; Morgan fingerprints are not shown as RNN input.
      </p>
    </figure>
  );
}

function DeepMolFigure() {
  return (
    <figure className="lis-investigation__figure lis-investigation__figure--amber">
      <ol className="lis-method-flow lis-method-flow--amber" aria-label="SMILES sequence-generation workflow">
        <li><span>INPUT</span><strong>Curated experimental SMILES</strong></li>
        <li><span>LOAD</span><strong>DeepMol CSVLoader</strong></li>
        <li><span>REPRESENT</span><strong>SMILES sequences</strong></li>
        <li><span>GENERATE</span><strong>RNN MolecularGenerator</strong></li>
      </ol>
      <div className="lis-investigation__run-note">
        <span>RECORDED RUN SETTINGS</span>
        <strong>Recorded RNN run settings: 10 epochs; batch size 64.</strong>
        <small>Settings evidence, separate from the reported sample count.</small>
      </div>
      <figcaption>Method schematic · no project-generated molecular output is shown.</figcaption>
    </figure>
  );
}

function FragmentFigure() {
  return (
    <figure className="lis-investigation__figure lis-investigation__figure--teal">
      <ol className="lis-method-flow lis-method-flow--teal" aria-label="Structure-based fragment workflow">
        <li><span>STRUCTURE</span><strong>Molecular structures and compatible fragments</strong></li>
        <li><span>SELECT</span><strong>Choose compatible fragments</strong></li>
        <li><span>REASON</span><strong>Consider spatial fit and overlap</strong></li>
        <li><span>LINK</span><strong>RDKit / Fragmenstein linking and recombination</strong></li>
      </ol>
      <p className="lis-investigation__result lis-investigation__result--teal">
        <span>OBSERVED RESULT</span>
        <strong>Some fragment workflows succeeded</strong>
      </p>
      <figcaption>Conceptual method diagram · no molecular output is depicted.</figcaption>
    </figure>
  );
}

function ReinventFigure() {
  return (
    <figure className="lis-investigation__figure lis-investigation__figure--coral">
      <ol className="lis-method-flow lis-method-flow--coral" aria-label="REINVENT4 research attempt">
        <li><span>WHY EXPLORE IT</span><strong>Another generative approach</strong></li>
        <li><span>JOSHUA'S WORK</span><strong>Research and generation attempt with REINVENT4</strong></li>
        <li><span>OUTCOME IN SCOPE</span><strong>Did not reach a completed generation within the available internship scope</strong></li>
      </ol>
      <figcaption>Research path and its recorded limit · no model output is shown.</figcaption>
    </figure>
  );
}

export default function LivingInSilicoCase() {
  return (
    <article className="living-story lis-record lis-record--public" aria-labelledby="lis-title">
      <nav className="lis-record__crumbs" aria-label="Breadcrumb">
        <Link to="/experience">‹ EXPERIENCE</Link>
        <span>GENERATIVE MOLECULAR MODELING</span>
      </nav>

      <header className="lis-public-hero">
        <div>
          <p className="lis-kicker lis-kicker--teal">GENERATIVE MOLECULAR MODELING / EXPERIENCE · 2025</p>
          <h1 id="lis-title">A research internship in molecular generation.</h1>
          <p className="lis-public-hero__lead">
            I explored how molecular representation shaped different modeling approaches: sequence generation from SMILES, structure-aware fragment linking, and a separate generative-method attempt.
          </p>
        </div>
        <aside className="lis-public-role" aria-label="Research role">
          <p>RESEARCH ROLE</p>
          <h2>AI / ML Research Intern</h2>
          <span>Generative Molecular Modeling</span>
          <hr />
          <p>PERIOD</p>
          <strong>March – June 2025</strong>
          <small>Computational chemistry · Biomedical research</small>
        </aside>
      </header>

      <section className="lis-public-section lis-public-context" aria-labelledby="lis-context-title">
        <div className="lis-public-section__heading">
          <p className="lis-kicker">01 / RESEARCH CONTEXT</p>
          <h2 id="lis-context-title">Representation set the terms of each experiment.</h2>
          <p>
            Before comparing methods, I worked with molecular structures, SMILES, RDKit parsing, and model-ready representations. The project used a broad dataset snapshot alongside smaller curated experimental subsets.
          </p>
        </div>
        <RepresentationFigure />
      </section>

      <section className="lis-public-section lis-public-experiments" aria-labelledby="lis-experiments-title">
        <header className="lis-public-section__heading">
          <p className="lis-kicker">02 / INVESTIGATION ROUTES</p>
          <h2 id="lis-experiments-title">Three approaches, examined on their own terms.</h2>
          <p>Each route asked a different question about representing or generating molecular structures.</p>
        </header>

        <section className="lis-investigation" data-investigation="deepmol" aria-labelledby="deepmol-title">
          <article className="lis-public-route lis-public-route--amber">
            <header className="lis-investigation__heading">
              <div>
                <p className="lis-kicker">INVESTIGATION 01 / SEQUENCE GENERATION</p>
                <h3 id="deepmol-title">DeepMol and the SMILES sequence route</h3>
              </div>
              <p className="lis-investigation__question">Why: generate from molecules represented as SMILES sequences.</p>
            </header>
            <div className="lis-investigation__body lis-investigation__body--feature">
              <DeepMolFigure />
              <div className="lis-investigation__evidence">
                <dl className="lis-investigation__facts lis-investigation__facts--two-up">
                  <div><dt>Input</dt><dd>Curated experimental SMILES loaded through DeepMol CSVLoader.</dd></div>
                  <div><dt>Method</dt><dd>RNN MolecularGenerator.</dd></div>
                  <div><dt>My work</dt><dd>My work covered data loading, SMILES processing, and sequence-generation work.</dd></div>
                  <div><dt>Learning</dt><dd>Learning: molecular representation shaped this route.</dd></div>
                </dl>
              </div>
            </div>
            <aside className="lis-public-output" aria-label="DeepMol reported output">
              <div>
                <p className="lis-kicker">OWNER-REPORTED OUTPUT · DEEPMOL</p>
                <strong>500</strong>
                <span>generated SMILES samples</span>
              </div>
              <p>
                Reported for the DeepMol / RNN work. No validity, uniqueness, or novelty claim is made for these samples.
              </p>
            </aside>
          </article>
        </section>

        <section className="lis-investigation" data-investigation="fragmenstein" aria-labelledby="fragment-title">
          <article className="lis-public-route lis-public-route--teal">
            <header className="lis-investigation__heading">
              <div>
                <p className="lis-kicker">INVESTIGATION 02 / FRAGMENT-BASED DESIGN</p>
                <h3 id="fragment-title">RDKit + Fragmenstein: linking in spatial context</h3>
              </div>
              <p className="lis-investigation__question">Why: explore structure-based design alongside sequence generation.</p>
            </header>
            <div className="lis-investigation__body">
              <div className="lis-investigation__evidence">
                <dl className="lis-investigation__facts">
                  <div><dt>Input</dt><dd>Molecular structures and compatible fragments.</dd></div>
                  <div><dt>Method</dt><dd>Select, link, and recombine with RDKit / Fragmenstein, considering spatial fit.</dd></div>
                  <div><dt>My work</dt><dd>My work covered fragment selection, linking, and spatial workflows with RDKit / Fragmenstein.</dd></div>
                  <div><dt>Learning</dt><dd>Learning: this route depends on structural fit and spatial context.</dd></div>
                </dl>
              </div>
              <FragmentFigure />
            </div>
          </article>
        </section>

        <section className="lis-investigation" data-investigation="reinvent4" aria-labelledby="reinvent-title">
          <article className="lis-public-route lis-public-route--coral">
            <header className="lis-investigation__heading">
              <div>
                <p className="lis-kicker">INVESTIGATION 03 / ANOTHER GENERATIVE APPROACH</p>
                <h3 id="reinvent-title">Researching and attempting REINVENT4</h3>
              </div>
              <p className="lis-investigation__question">Why: test another generative approach alongside sequence and fragment work.</p>
            </header>
            <div className="lis-investigation__body lis-investigation__body--attempt">
              <ReinventFigure />
              <div className="lis-investigation__evidence">
                <dl className="lis-investigation__facts">
                  <div><dt>My work</dt><dd>I researched REINVENT4 and attempted generation.</dd></div>
                  <div><dt>Learning</dt><dd>Learning: this remained an exploratory attempt, not a demonstrated generation workflow.</dd></div>
                </dl>
              </div>
            </div>
          </article>
        </section>
      </section>

      <section className="lis-public-section lis-public-contribution" aria-labelledby="lis-contribution-title">
        <div>
          <p className="lis-kicker">03 / RESEARCH CONTRIBUTION</p>
          <h2 id="lis-contribution-title">Comparing methods made representation a practical modeling choice.</h2>
          <p>
            My DeepMol contribution covered data loading, SMILES processing, molecular features and sequence generation; I also worked on fragment workflows.
          </p>
        </div>
        <aside className="lis-public-learning">
          <p className="lis-kicker lis-kicker--teal">WHAT I CARRIED FORWARD</p>
          <h3>Separate method from evidence</h3>
          <p>
            DeepMol's SMILES sequence path differed from fragment selection and recombination; comparing the two made molecular representation a core modeling choice. REINVENT4 remained an attempt, so I learned to state what each experiment showed and where the record stopped.
          </p>
        </aside>
      </section>

      <footer className="lis-public-close">
        <p className="lis-kicker">RESEARCH ENDING</p>
        <h2>The work established distinct methods, a limited set of observed outcomes, and a clear boundary around what had not been demonstrated.</h2>
        <p className="lis-public-footer">LIVING IN SILICO / GENERATIVE MOLECULAR MODELING</p>
      </footer>
    </article>
  );
}
