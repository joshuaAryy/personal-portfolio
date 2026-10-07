import { Link } from "react-router-dom";
import "./living-in-silico-case.css";

export default function LivingInSilicoCase() {
  return (
    <article className="living-story" aria-labelledby="living-title">
      <nav className="living-nav" aria-label="Experience navigation">
        <Link to="/experience">‹ EXPERIENCE</Link>
        <span>RESEARCH NOTES / GENERATIVE MOLECULAR MODELING</span>
      </nav>

      <header className="living-hero" id="living-hero">
        <div className="living-hero__main">
          <p className="living-eyebrow">LIVING IN SILICO · AI / ML RESEARCH INTERN · MARCH–JUNE 2025</p>
          <h1 id="living-title">A research question before a model choice.</h1>
          <p className="living-hero__lead">
            In an unfamiliar computational chemistry and biomedical research
            domain, I learned the molecular data first, then investigated
            different ways to represent and explore it. The work was research:
            prepare experiments, try distinct methods, and keep each conclusion
            tied to what that method actually showed.
          </p>
          <div className="living-question">
            <p className="living-eyebrow">THE RESEARCH QUESTION</p>
            <p>How might molecular data be represented and explored through generative modeling?</p>
          </div>
        </div>
        <aside className="living-hero__meta" aria-label="Internship details">
          <dl className="living-hero-meta">
            <div><dt>ROLE</dt><dd>AI/ML Research Intern</dd></div>
            <div><dt>FOCUS</dt><dd>Generative Molecular Modeling</dd></div>
            <div><dt>PERIOD</dt><dd>March–June 2025</dd></div>
            <div><dt>SUPERVISOR</dt><dd>Sohail Mahmood</dd></div>
          </dl>
        </aside>
        <section className="living-remit" aria-labelledby="living-remit-title">
          <p className="living-eyebrow" id="living-remit-title">MY WORK IN THE INTERNSHIP</p>
          <div className="living-remit__items">
            <div><span>01</span><p>Inspect, clean, and prepare molecular strings for experiments.</p></div>
            <div><span>02</span><p>Research sequence, fragment, and generative modeling approaches.</p></div>
            <div><span>03</span><p>Document the methods, outputs, and limits for a research handoff.</p></div>
          </div>
        </section>
      </header>

      <section className="living-data" aria-labelledby="living-data-title">
        <div className="living-section-heading">
          <p className="living-eyebrow">DATA PREPARATION</p>
          <h2 id="living-data-title">A row count is only the start of the data story.</h2>
          <p>I inspected molecular strings, parsed and validated structures, handled invalid records and duplicates, then prepared narrower inputs for separate experiments. That work made the scope of each test clearer.</p>
        </div>
        <figure className="living-data-figure" aria-labelledby="living-data-caption">
          <div className="living-snapshot">
            <p className="living-eyebrow">APRIL 12 SNAPSHOT <span>· OWNER-REPORTED</span></p>
            <div className="living-snapshot__numbers">
              <div><strong>15,696</strong><span>rows</span></div>
              <div><strong>14,487</strong><span>unique SMILES</span></div>
            </div>
            <p className="living-snapshot__difference"><strong>1,209</strong><span>rows beyond the unique-string count · arithmetic difference, not a removal tally</span></p>
          </div>
          <div className="living-curated">
            <p className="living-eyebrow">SEPARATE EXPERIMENT SETS</p>
            <strong>~400–600</strong>
            <span>curated entries in some experiments</span>
            <p>Narrower working scopes; not a step-down count from the April snapshot.</p>
          </div>
          <figcaption id="living-data-caption">The April 12 counts are owner-reported; the 1,209 gap is arithmetic, not a logged number of removed rows. The 400–600-entry sets belong to separate experiments. These are different contexts, not linked counts or a measured data-quality or model-performance gain.</figcaption>
        </figure>
        <figure className="living-data-prep" aria-labelledby="living-data-prep-title living-data-prep-caption">
          <div className="living-data-prep__heading">
            <p className="living-eyebrow">PREPARATION WORK · ACROSS EXPERIMENTS</p>
            <h3 id="living-data-prep-title">Define what an experiment can examine.</h3>
            <p>I reviewed molecular strings, checked structures, handled duplicates, and prepared inputs for separate experiments.</p>
          </div>
          <ol className="living-data-prep__steps">
            <li><span>01 / INSPECT</span><strong>Review molecular strings</strong><small>Understand the records before modeling.</small></li>
            <li><span>02 / VALIDATE</span><strong>Parse structures with RDKit</strong><small>Identify strings that do not parse as intended.</small></li>
            <li><span>03 / REVIEW DUPLICATES</span><strong>Compare rows and unique SMILES</strong><small>Repeated rows are not additional distinct inputs.</small></li>
            <li><span>04 / CURATE</span><strong>Select experiment inputs</strong><small>Set the distinct, parseable scope each experiment can examine.</small></li>
          </ol>
          <figcaption id="living-data-prep-caption">Preparation changed which distinct, parseable inputs an experiment could examine. The available evidence does not quantify a data-quality or model-performance lift.</figcaption>
        </figure>
        <aside className="living-data-reading">
          <span>WHY THE PREPARATION MATTERED</span>
          <p>Repeated rows are not additional distinct strings, and invalid strings cannot answer a molecular-model question as intended. Preparation shifted the test from “how many rows?” to “which distinct, parseable inputs will this experiment examine?” A narrower curated scope changed what I could examine; the available evidence does not quantify a quality or performance lift.</p>
        </aside>
      </section>

      <section className="living-representation" aria-labelledby="living-representation-title">
        <div className="living-section-heading">
          <p className="living-eyebrow">REPRESENTATION</p>
          <h2 id="living-representation-title">A sequence view and a feature view ask different things of a molecule.</h2>
          <p>SMILES made molecular structure available as an ordered string. Morgan fingerprints described local structural features. I keep the feature lane separate from the RNN sequence path.</p>
        </div>
        <figure className="living-representation-figure" aria-labelledby="living-representation-caption">
          <div className="living-representation-lane living-representation-lane--sequence">
            <span className="living-representation-lane__label">SEQUENCE VIEW</span>
            <div className="living-representation-node"><small>MOLECULAR STRUCTURE</small><strong>Atoms + bonds</strong><em>connected chemical structure</em></div>
            <span className="living-representation-arrow" aria-hidden="true">→</span>
            <div className="living-representation-node living-representation-node--smiles"><small>TEXT REPRESENTATION</small><strong>SMILES</strong><em>ordered molecular string</em></div>
            <span className="living-representation-arrow" aria-hidden="true">→</span>
            <div className="living-representation-node living-representation-node--rnn"><small>SEQUENCE METHOD</small><strong>RNN</strong><em>works across string positions</em></div>
          </div>
          <div className="living-representation-lane living-representation-lane--features">
            <span className="living-representation-lane__label">FEATURE VIEW · SEPARATE</span>
            <div className="living-feature-origin"><strong>Structure</strong><span>RDKit representation work</span></div>
            <span className="living-representation-arrow" aria-hidden="true">→</span>
            <div className="living-fingerprint" role="img" aria-label="Conceptual 128-bit Morgan fingerprint layout; no project bit values shown">
              <div className="living-fingerprint__cells" aria-hidden="true">{Array.from({ length: 128 }, (_, index) => <i key={index} />)}</div>
              <strong>Morgan fingerprint</strong>
              <span>radius 2 <b>·</b> 128 bits</span>
            </div>
            <p className="living-feature-note">A structural feature representation; this lane does not feed the RNN diagram above.</p>
          </div>
          <div className="living-representation-lane living-representation-lane--fragments">
            <span className="living-representation-lane__label">FRAGMENT / SPATIAL VIEW / SEPARATE</span>
            <div className="living-fragment-origin"><strong>Molecular structures</strong><span>Conceptual structure view</span></div>
            <span className="living-representation-arrow" aria-hidden="true">&rarr;</span>
            <div className="living-representation-node living-representation-node--fragment"><small>RDKit / FRAGMENSTEIN</small><strong>Fragments + spatial questions</strong><em>selection, compatibility, placement, linking</em></div>
            <p className="living-feature-note">A separate structure-aware exploration, not an extension of either representation lane.</p>
          </div>
          <figcaption id="living-representation-caption">Three conceptual branches show separate questions: an SMILES sequence for the RNN, Morgan features (radius 2 / 128 bits), and fragment/spatial exploration. Morgan features do not feed the RNN. They are not one pipeline and do not describe one shared project molecule; no experimental molecule, string, or project bit values are shown.</figcaption>
        </figure>
      </section>

      <section className="living-deepmol-study" aria-labelledby="living-deepmol-title">
        <header className="living-study-heading">
          <p className="living-eyebrow">METHOD INVESTIGATION · SEQUENCE MODELING</p>
          <h2 id="living-deepmol-title">Could a recurrent model learn from molecular strings?</h2>
          <p>Because SMILES represents molecular information as an ordered string, I explored a sequence-generation route with DeepMol’s RNN MolecularGenerator.</p>
        </header>
        <figure className="living-deepmol-figure" aria-labelledby="living-deepmol-caption">
          <div className="living-deepmol-flow" role="group" aria-label="DeepMol sequence-generation method">
            <div className="living-deepmol-step living-deepmol-step--input"><span>EXPERIMENT DATA</span><strong>Curated SMILES</strong><small>prepared strings from a separate experiment subset</small></div>
            <span className="living-deepmol-arrow" aria-hidden="true">→</span>
            <div className="living-deepmol-step"><span>LOAD</span><strong>DeepMol CSVLoader</strong><small>read the prepared experiment table</small></div>
            <span className="living-deepmol-arrow" aria-hidden="true">→</span>
            <div className="living-deepmol-step living-deepmol-step--model"><span>SEQUENCE GENERATION</span><strong>RNN MolecularGenerator</strong><small>learn across ordered SMILES sequences</small></div>
          </div>
          <div className="living-deepmol-lab">
            <div className="living-deepmol-contribution">
              <p className="living-eyebrow">JOSHUA’S DATA AND EXPERIMENT WORK</p>
              <p>I loaded and used the prepared experiment inputs for DeepMol/RNN sequence work. ChemDraw and manual views helped me inspect molecular structures.</p>
            </div>
            <div className="living-deepmol-evidence">
              <div className="living-run-note">
                <p className="living-eyebrow">RECORDED RUN SETTINGS</p>
                <div aria-label="Reported run settings: 10 epochs and batch size 64"><strong>10</strong><span>epochs</span><strong>64</strong><span>batch size</span></div>
              </div>
              <div className="living-sample-output">
                <p className="living-eyebrow">SEPARATE OWNER-REPORTED OUTPUT</p>
                <strong aria-label="500 generated SMILES samples">500</strong>
                <span>generated SMILES samples</span>
                <p className="living-sample-attribution">Attribution note: the owner account assigns the 500 samples to DeepMol/RNN. A dated May 2025 report attributes 500 samples and RDKit checking to REINVENT4; no surviving run or source resolves this conflict.</p>
                <small>Count only · no validity, uniqueness, or novelty claim.</small>
              </div>
            </div>
          </div>
          <figcaption id="living-deepmol-caption">The method path, recorded settings, and owner-reported 500-sample count are separate notes. This figure cannot establish that those settings produced the samples or that any sample was valid, distinct, novel, or viable.</figcaption>
        </figure>
        <aside className="living-study-learning"><span>WHAT THIS ROUTE MADE VISIBLE</span><p>Generation produced strings. Whether a string represents a valid or useful molecule is a separate question from the output count.</p></aside>
      </section>

      <section className="living-fragment-study" aria-labelledby="living-fragment-title">
        <header className="living-study-heading living-study-heading--fragment">
          <p className="living-eyebrow">METHOD INVESTIGATION · FRAGMENT AND SPATIAL WORK</p>
          <h2 id="living-fragment-title">Could compatible pieces be placed and linked?</h2>
          <p>This structure-aware route asked a different question from sequence generation: decompose structures, consider compatibility and spatial relationships, then explore fragment linking or recombination.</p>
        </header>
        <div className="living-fragment-layout">
          <figure className="living-fragment-figure" aria-labelledby="living-fragment-caption">
            <p className="living-fragment-figure__label">CONCEPTUAL FRAGMENT WORKFLOW · NOT AN EXPERIMENTAL STRUCTURE</p>
            <svg className="living-fragment-map" viewBox="0 0 1120 370" role="img" aria-labelledby="living-fragment-map-title living-fragment-map-desc">
              <title id="living-fragment-map-title">Fragment compatibility, spatial reasoning, and linking</title>
              <desc id="living-fragment-map-desc">Four conceptual stages show a connected structure, two selected fragments, an overlap or spatial compatibility question, and a possible linking step. The shapes are not molecular data or an experimental result.</desc>
              <path className="living-fragment-map__rule" d="M76 284H1044" />
              <path className="living-fragment-map__connector" d="M248 142H317m210 0h70m214 0h61" />
              <g className="living-fragment-map__stage living-fragment-map__whole" transform="translate(70 66)">
                <path d="M14 92 51 62l44 25 42-41 43 27 36-18" />
                <circle cx="14" cy="92" r="8" /><circle cx="51" cy="62" r="8" /><circle cx="95" cy="87" r="8" /><circle cx="137" cy="46" r="8" /><circle cx="180" cy="73" r="8" /><circle cx="216" cy="55" r="8" />
                <path d="M95 87 114 129l44-16 22-40" /><circle cx="114" cy="129" r="8" /><circle cx="158" cy="113" r="8" />
              </g>
              <g className="living-fragment-map__stage living-fragment-map__pieces" transform="translate(340 71)">
                <path d="M7 85 43 57l42 25 39-37m-117 41 31 44 43-15 25-33" />
                <circle cx="7" cy="85" r="8" /><circle cx="43" cy="57" r="8" /><circle cx="85" cy="82" r="8" /><circle cx="124" cy="45" r="8" />
                <path d="M169 86 204 59l42 25 38-34m-115 37 32 42 42-15 28-30" />
                <circle cx="169" cy="86" r="8" /><circle cx="204" cy="59" r="8" /><circle cx="246" cy="84" r="8" /><circle cx="284" cy="50" r="8" />
              </g>
              <g className="living-fragment-map__stage living-fragment-map__spatial" transform="translate(622 55)">
                <rect x="0" y="0" width="210" height="188" rx="18" />
                <path d="M31 102 64 77l42 24 37-35m-112 38 29 41 43-16 40-27" />
                <circle cx="31" cy="102" r="7" /><circle cx="64" cy="77" r="7" /><circle cx="106" cy="101" r="7" /><circle cx="143" cy="66" r="7" />
                <path d="M79 119 111 93l42 24 33-31m-107 33 30 39 43-14 34-27" />
                <circle cx="79" cy="119" r="7" /><circle cx="111" cy="93" r="7" /><circle cx="153" cy="117" r="7" /><circle cx="186" cy="86" r="7" />
                <ellipse cx="106" cy="108" rx="37" ry="50" />
              </g>
              <g className="living-fragment-map__stage living-fragment-map__link" transform="translate(884 71)">
                <path d="M5 85 41 58l42 24 39-37m-117 41 31 44 43-15 25-33" />
                <circle cx="5" cy="85" r="8" /><circle cx="41" cy="58" r="8" /><circle cx="83" cy="82" r="8" /><circle cx="122" cy="45" r="8" />
                <path d="M122 45 159 73l38-31m-75 32 31 42 44-17" />
                <circle cx="159" cy="73" r="8" /><circle cx="197" cy="42" r="8" /><circle cx="175" cy="116" r="8" />
                <path className="living-fragment-map__bridge" d="M83 82 122 77" />
              </g>
              <text x="70" y="324">STRUCTURE</text><text x="340" y="324">SELECT FRAGMENTS</text><text x="622" y="324">ASK ABOUT FIT + SPACE</text><text x="884" y="324">EXPLORE A LINK</text>
            </svg>
            <ol className="living-fragment-stages">
              <li><span>01</span><strong>Decompose</strong><small>Structures into substructures.</small></li>
              <li><span>02</span><strong>Select</strong><small>Consider compatible fragments.</small></li>
              <li><span>03</span><strong>Place</strong><small>Explore spatial and overlap questions.</small></li>
              <li><span>04</span><strong>Link</strong><small>Investigate linking or recombination.</small></li>
            </ol>
            <div className="living-fragment-result"><p className="living-eyebrow">REPORTED OUTCOME</p><strong>Some fragment-based workflows succeeded.</strong><p>The available public evidence does not identify a particular candidate result to reproduce.</p></div>
            <figcaption id="living-fragment-caption">Conceptual map of the reported work: decomposition, fragment selection, spatial reasoning, and linking. The shapes are not experimental structures or outputs, so this figure cannot identify a candidate molecule or a particular successful result.</figcaption>
          </figure>
          <aside className="living-fragment-notes">
            <div><p className="living-eyebrow">JOSHUA’S WORK</p><p>I explored fragment selection, structural compatibility, spatial or overlap reasoning, and linking workflows with RDKit and Fragmenstein.</p></div>
            <div><p className="living-eyebrow">WHAT I LEARNED</p><p>Working with structural pieces made placement and compatibility questions explicit; that is a different investigation from learning patterns in a SMILES sequence.</p></div>
          </aside>
        </div>
      </section>

      <section className="living-reinvent-study" aria-labelledby="living-reinvent-title">
        <div className="living-reinvent-study__intro">
          <p className="living-eyebrow">ANOTHER GENERATIVE APPROACH</p>
          <h2 id="living-reinvent-title">REINVENT4 stayed exploratory.</h2>
          <p>I researched and attempted REINVENT4 as another generative approach.</p>
        </div>
        <aside className="living-reinvent-status" aria-label="REINVENT4 researched and attempted, with no completed generation within internship scope">
          <p className="living-eyebrow">SCOPE OUTCOME</p>
          <strong>No completed generation within internship scope.</strong>
          <p>The available evidence does not establish the input, configuration, or reason this route stopped.</p>
        </aside>
      </section>

      <section className="living-field living-field--late" aria-labelledby="living-field-title">
        <div className="living-field__copy">
          <p className="living-eyebrow">LOOKING BACK · FIRST 1–2 WEEKS</p>
          <h2 id="living-field-title">Before a model, learn the language of the data.</h2>
          <p>
            My first one to two weeks were a fast introduction to SMILES,
            molecular representation, data preparation, papers, repositories,
            and technical documentation. I moved between DeepMol, RDKit,
            Fragmenstein, REINVENT4, and ChemDraw to understand enough of the
            chemistry and software to ask better questions.
          </p>
          <p className="living-field__tools">SMILES <i>·</i> DeepMol <i>·</i> RDKit <i>·</i> Fragmenstein <i>·</i> REINVENT4 <i>·</i> ChemDraw</p>
        </div>
        <aside className="living-learning-memory" aria-label="Personal learning memory">
          <span className="living-learning-memory__time">3–4<small>AM</small></span>
          <div><p className="living-eyebrow">A MOMENT I REMEMBER</p><h3>Following the question after hours.</h3></div>
          <p>I stayed up before school watching and taking notes on a Stanford machine-learning lecture, thinking about how the ideas could connect to the research.</p>
        </aside>
      </section>

      <footer className="living-conclusion">
        <div className="living-conclusion__lesson">
          <p className="living-eyebrow">WHAT RESEARCH LEFT ME WITH</p>
          <h2>Start with what the data represents. End with what the evidence can support.</h2>
          <p>A reported string count, some successful fragment workflows, and one unfinished route left different kinds of evidence. I carried forward the habit of keeping each conclusion inside the method and evidence that produced it.</p>
        </div>
        <div className="living-conclusion__handoff">
          <p className="living-eyebrow">RESEARCH HANDOFF</p>
          <p className="living-conclusion__handoff-note">A mix of research materials carried the work forward:</p>
          <strong>Research code</strong>
          <strong>Experiment results and generated outputs</strong>
          <strong>Written report and documentation</strong>
        </div>
      </footer>
    </article>
  );
}
