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
          <h2 id="living-data-title">Experimental scope starts with the records.</h2>
          <p>I inspected molecular strings, checked which structures parsed, reviewed repeated rows, and prepared separate inputs for experiments. These choices defined what each test could examine; they do not show a measured performance gain.</p>
        </div>
        <figure className="living-data-figure" aria-labelledby="living-data-caption">
          <div className="living-snapshot">
            <p className="living-eyebrow">APRIL 12 SNAPSHOT <span>· OWNER-REPORTED</span></p>
            <div className="living-snapshot__numbers">
              <div><strong>15,696</strong><span>rows</span></div>
              <div><strong>14,487</strong><span>unique SMILES</span></div>
            </div>
          </div>
          <div className="living-curated">
            <p className="living-eyebrow">SEPARATE EXPERIMENT SETS</p>
            <strong>~400–600</strong>
            <span>curated entries in some experiments</span>
            <p>Narrower working scopes; not a step-down count from the April snapshot.</p>
          </div>
          <figcaption id="living-data-caption">The April 12 snapshot and the 400–600-entry sets for some experiments are different contexts, not steps in one numerical funnel. The counts do not establish a measured data-quality or model-performance gain.</figcaption>
        </figure>
        <figure className="living-prep-logic" aria-labelledby="living-prep-logic-title living-prep-logic-caption">
          <div className="living-prep-logic__heading">
            <p className="living-eyebrow">PREPARATION DECISIONS · CONCEPTUAL LOGIC</p>
            <h3 id="living-prep-logic-title">Choose inputs that fit the experiment.</h3>
            <p>Before a method could answer a question, I had to understand what its input represented.</p>
          </div>
          <div className="living-prep-logic__questions">
            <div><span>01 / PARSEABILITY</span><strong>Check whether structures parse</strong><small>RDKit helped identify strings that did not parse as intended.</small></div>
            <div><span>02 / DISTINCTNESS</span><strong>Review repeated rows against distinct strings</strong><small>More rows do not necessarily mean more distinct examples.</small></div>
            <div><span>03 / EXPERIMENT SCOPE</span><strong>Choose a scope for a separate experiment</strong><small>Curated inputs shaped what that test could examine.</small></div>
          </div>
          <figcaption id="living-prep-logic-caption">No project rows or counts are mapped between these steps. The figure explains preparation decisions, not a numerical funnel or a measured improvement.</figcaption>
        </figure>
      </section>

      <section className="living-representation" aria-labelledby="living-representation-title">
        <div className="living-section-heading">
          <p className="living-eyebrow">REPRESENTATION</p>
          <h2 id="living-representation-title">A string, a feature view, and a spatial question.</h2>
          <p>The research explored distinct ways to examine molecular data: ordered SMILES for sequence generation, Morgan fingerprints as a separate feature view, and structure-aware fragment work. Each representation posed a different question.</p>
        </div>
        <figure className="living-representation-figure" aria-labelledby="living-representation-caption">
          <div className="living-representation-bridge">
            <div className="living-representation-origin">
              <p className="living-eyebrow">ILLUSTRATIVE STRUCTURE</p>
              <svg viewBox="0 0 180 112" role="img" aria-label="Abstract molecular structure symbol, not a project molecule">
                <path d="M22 58 55 31l35 22 32-33 35 27m-102-16 6 43 40 18 23-42 33 27" />
                <circle cx="22" cy="58" r="6" /><circle cx="55" cy="31" r="6" /><circle cx="90" cy="53" r="6" /><circle cx="122" cy="20" r="6" /><circle cx="157" cy="47" r="6" /><circle cx="61" cy="74" r="6" /><circle cx="101" cy="92" r="6" /><circle cx="124" cy="50" r="6" /><circle cx="157" cy="77" r="6" />
              </svg>
              <strong>An illustrative structure, three separate questions</strong>
              <small>No experimental molecule or project output is shown.</small>
            </div>
            <div className="living-representation-views">
              <article className="living-representation-view living-representation-view--sequence">
                <span>SEQUENCE LENS</span>
                <strong>Ordered SMILES sequence</strong>
                <p>DeepMol/RNN explored generation from molecular strings.</p>
                <small>Question: can a sequence model work across string positions?</small>
              </article>
              <article className="living-representation-view living-representation-view--features">
                <span>FEATURE LENS · SEPARATE</span>
                <strong>Morgan features · separate view</strong>
                <p>RDKit Morgan fingerprints, radius 2 and 128 bits.</p>
                <small>Question: how is structure represented as a feature vector?</small>
              </article>
              <article className="living-representation-view living-representation-view--fragments">
                <span>STRUCTURE / SPACE · SEPARATE</span>
                <strong>Fragment and spatial exploration</strong>
                <p>RDKit/Fragmenstein work considered selection, placement and linking.</p>
                <small>Question: can compatible pieces fit and connect?</small>
              </article>
            </div>
          </div>
          <figcaption id="living-representation-caption">This is a conceptual bridge, not a project molecule or a unified pipeline. Morgan features do not feed the RNN; fragment/spatial work was a separate investigation.</figcaption>
        </figure>
      </section>

      <section className="living-deepmol-study" aria-labelledby="living-deepmol-title">
        <header className="living-study-heading">
          <p className="living-eyebrow">METHOD INVESTIGATION · SEQUENCE MODELING</p>
          <h2 id="living-deepmol-title">Could a recurrent model learn from molecular strings?</h2>
          <p>Because SMILES represents molecular information as an ordered string, I explored a sequence-generation route with DeepMol’s RNN MolecularGenerator.</p>
        </header>
        <figure className="living-deepmol-figure" aria-labelledby="living-deepmol-caption">
          <div className="living-deepmol-sequence-map" role="group" aria-label="Conceptual SMILES sequence through DeepMol CSVLoader and RNN MolecularGenerator to generated strings">
            <div className="living-deepmol-sequence-input">
              <span className="living-eyebrow">SEQUENCE INPUT · ILLUSTRATIVE</span>
              <strong>SMILES strings</strong>
              <div className="living-sequence-positions" role="img" aria-label="Ordered string positions; no project SMILES shown">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
              <small>Ordered positions, not a project string</small>
            </div>
            <span className="living-deepmol-arrow" aria-hidden="true">→</span>
            <div className="living-deepmol-loader"><span>LOAD TABLE</span><strong>DeepMol CSVLoader</strong><small>prepared experiment input</small></div>
            <span className="living-deepmol-arrow" aria-hidden="true">→</span>
            <div className="living-deepmol-model"><span>SEQUENCE GENERATION</span><strong>RNN MolecularGenerator</strong><small>work across an ordered string</small></div>
            <span className="living-deepmol-arrow" aria-hidden="true">→</span>
            <div className="living-deepmol-string-output"><span>OUTPUT TYPE</span><strong>Generated SMILES</strong><small>strings need separate chemical inspection</small></div>
            <p className="living-deepmol-inspection">Generated strings need separate chemical inspection; a string count alone does not establish molecular validity.</p>
          </div>
          <div className="living-deepmol-evidence">
            <div className="living-deepmol-contribution">
              <p className="living-eyebrow">JOSHUA’S EXPERIMENT WORK</p>
              <p>I prepared and loaded experiment inputs for DeepMol/RNN sequence work. ChemDraw and manual views helped me inspect molecular structures.</p>
              <div className="living-deepmol-learning"><span>WHAT THIS ROUTE TAUGHT</span><p>Generated strings still need separate chemical inspection; an output count does not establish what those strings represent.</p></div>
            </div>
            <div className="living-run-note">
              <p className="living-eyebrow">RECORDED RUN SETTINGS · SEPARATE NOTE</p>
              <div aria-label="Reported run settings: 10 epochs and batch size 64"><strong>10</strong><span>epochs</span><strong>64</strong><span>batch size</span></div>
              <small>Not linked to the owner-reported sample count.</small>
            </div>
            <div className="living-sample-output">
              <p className="living-eyebrow">OWNER-REPORTED COUNT</p>
              <p><strong aria-label="500 generated SMILES samples">500</strong><span>generated SMILES samples</span></p>
              <small>Count only; no validity, uniqueness, or novelty claim.</small>
            </div>
          </div>
          <figcaption id="living-deepmol-caption">The sequence map is conceptual and shows no project SMILES. Run settings and the owner-reported sample count are separate evidence; the count does not establish that those settings produced the samples or that a string was valid, distinct, or novel.</figcaption>
        </figure>
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
            <ol className="living-fragment-stages" aria-label="Conceptual fragment mechanism">
              <li><span>01 / DECOMPOSITION</span><strong>Decompose structures</strong><small>Identify substructures that could be explored as fragments.</small></li>
              <li><span>02 / SELECTION</span><strong>Select compatible fragments</strong><small>Consider which pieces might be useful to place together.</small></li>
              <li><span>03 / SPATIAL FIT</span><strong>Explore spatial fit</strong><small>Reason about placement, compatibility and overlap.</small></li>
              <li><span>04 / LINKING</span><strong>Investigate linking</strong><small>Explore fragment linking or recombination.</small></li>
            </ol>
            <figcaption id="living-fragment-caption">Conceptual mechanism, reported separately from workflow success: the shapes are not experimental structures or outputs. This figure explains the questions involved, not a particular successful result.</figcaption>
          </figure>
          <aside className="living-fragment-notes">
            <div><p className="living-eyebrow">WHY THIS ROUTE</p><p>Fragment work asks whether selected structural pieces can fit in space and be linked, a different question from generating across a SMILES sequence.</p></div>
            <div><p className="living-eyebrow">JOSHUA’S EXPERIMENTS</p><p>I explored fragment selection, spatial compatibility and linking workflows with RDKit and Fragmenstein.</p></div>
            <div className="living-fragment-outcome"><p className="living-eyebrow">REPORTED OUTCOME</p><strong>Some fragment-based workflows succeeded.</strong><p>No specific candidate result is identified here.</p></div>
            <div><p className="living-eyebrow">WHAT THIS ROUTE TAUGHT</p><p>Spatial placement and compatibility made structural questions explicit; they were distinct from the sequence model’s string-generation question.</p></div>
          </aside>
        </div>
      </section>

      <section className="living-reinvent-study" aria-labelledby="living-reinvent-title">
        <div className="living-reinvent-study__intro">
          <p className="living-eyebrow">ANOTHER GENERATIVE APPROACH · RESEARCHED + ATTEMPTED</p>
          <h2 id="living-reinvent-title">REINVENT4</h2>
          <p>I researched and attempted REINVENT4 as another generative approach.</p>
        </div>
        <p className="living-reinvent-outcome">It did not reach a completed generation within the available internship scope.</p>
      </section>

      <section className="living-research-reflection" aria-labelledby="living-reflection-title">
        <div className="living-research-reflection__intro">
          <p className="living-eyebrow">LATE REFLECTION · WHAT THE METHODS ESTABLISHED</p>
          <h2 id="living-reflection-title">Different routes left different kinds of evidence.</h2>
          <p>The work did not establish one validated molecular-generation workflow. It taught me to keep input preparation, representation, method and result in view together.</p>
        </div>
        <div className="living-route-synthesis" aria-label="Research route outcomes">
          <div><span>DEEPMOL / RNN</span><strong>Reported string count</strong><small>A count does not establish molecular validity.</small></div>
          <div><span>RDKit / FRAGMENSTEIN</span><strong>Some workflows succeeded</strong><small>No specific candidate result is identified here.</small></div>
          <div><span>REINVENT4</span><strong>REINVENT4 remained exploratory</strong><small>No completed generation was reached.</small></div>
        </div>
      </section>

      <footer className="living-conclusion">
        <div className="living-conclusion__lesson">
          <p className="living-eyebrow">WHAT I CARRIED FORWARD</p>
          <h2>Start with what the data represents. End with what the evidence can support.</h2>
          <p>Preparing inputs shaped the question; choosing a representation shaped the method; and each route left a different result. I carried forward the habit of keeping a conclusion inside the method and evidence that produced it.</p>
        </div>
        <div className="living-conclusion__handoff">
          <p className="living-eyebrow">RESEARCH HANDOFF</p>
          <p className="living-conclusion__handoff-note">The documented materials leave a next researcher something to examine and continue:</p>
          <strong>Research code</strong>
          <strong>Experiment results and generated outputs</strong>
          <strong>Written report and documentation</strong>
        </div>
      </footer>
    </article>
  );
}
