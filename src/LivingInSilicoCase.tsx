import { Link } from "react-router-dom";
import "./living-in-silico-case.css";

export default function LivingInSilicoCase() {
  return (
    <article className="living-story" aria-labelledby="living-title">
      <nav className="living-back" aria-label="Experience navigation">
        <Link to="/experience">‹ EXPERIENCE</Link>
        <span>FIELD NOTES / GENERATIVE MOLECULAR MODELING</span>
      </nav>

      <header className="living-opening" id="living-opening">
        <div className="living-opening__copy">
          <p className="living-eyebrow">AI / ML RESEARCH INTERNSHIP · 2025</p>
          <h1 id="living-title">Molecules need representation before generation.</h1>
          <p className="living-opening__lead">
            I entered computational chemistry and biomedical research with more
            to learn than I knew. My assignment was to understand molecular data,
            research possible approaches and try methods. I wanted to learn how a
            molecule could be represented for computation, what different routes
            could do, and what each experiment actually let us conclude.
          </p>
          <dl className="living-meta">
            <div><dt>ROLE</dt><dd>AI/ML Research Intern</dd></div>
            <div><dt>FOCUS</dt><dd>Generative Molecular Modeling</dd></div>
            <div><dt>PERIOD</dt><dd>March–June 2025</dd></div>
            <div><dt>SUPERVISOR</dt><dd>Sohail Mahmood</dd></div>
          </dl>
        </div>
        <aside className="living-cohort" aria-label="Internship context">
          <p className="living-eyebrow">A NEW FIELD FOR OUR GROUP</p>
          <strong>04</strong>
          <p>Four first-year interns from different schools were learning a largely unfamiliar research domain.</p>
        </aside>
      </header>

      <section className="living-ramp" aria-labelledby="living-ramp-title">
        <div className="living-section-stamp"><span>01</span><p className="living-eyebrow">LEARN THE LANGUAGE</p></div>
        <div className="living-ramp__copy">
          <h2 id="living-ramp-title">Before I could test a model, I had to understand what it was seeing.</h2>
          <p>
            My first one to two weeks were a fast introduction to SMILES,
            molecular representation, data preparation, papers and unfamiliar
            tools. I moved between DeepMol, RDKit, Fragmenstein and REINVENT4,
            learning enough of the chemistry and the software to ask better
            questions of each approach.
          </p>
          <p className="living-ramp__tools">SMILES <i>·</i> ChemDraw <i>·</i> DeepMol <i>·</i> RDKit <i>·</i> Fragmenstein <i>·</i> REINVENT4</p>
        </div>
        <aside className="living-memory">
          <span className="living-memory__time">3–4<span>AM</span></span>
          <p className="living-eyebrow">A MOMENT I REMEMBER</p>
          <h3>Following the question after hours.</h3>
          <p>I stayed up before school watching and taking notes on a Stanford machine-learning lecture, thinking about how algorithms could connect to the research.</p>
        </aside>
      </section>

      <section className="living-representation" aria-labelledby="living-representation-title">
        <div className="living-section-stamp"><span>02</span><p className="living-eyebrow">A MOLECULE, DIFFERENT REPRESENTATIONS</p></div>
        <div className="living-representation__intro">
          <h2 id="living-representation-title">The representation changes what a method can work with.</h2>
          <p>One route treated SMILES as an ordered string. Another used structural features and spatial relationships. These are different views of molecular information, not one combined model input.</p>
        </div>
        <figure className="living-representation-figure" aria-labelledby="living-representation-caption">
          <div className="living-representation-lane living-representation-lane--sequence">
            <span className="living-representation-lane__label">SEQUENCE VIEW</span>
            <div className="living-representation-node"><small>CHEMICAL STRUCTURE</small><strong>Atoms + bonds</strong><em>molecular organization</em></div>
            <span className="living-representation-arrow" aria-hidden="true">→</span>
            <div className="living-representation-node living-representation-node--smiles"><small>TEXT REPRESENTATION</small><strong>SMILES</strong><em>an ordered molecular string</em></div>
            <span className="living-representation-arrow" aria-hidden="true">→</span>
            <div className="living-representation-node living-representation-node--rnn"><small>SEQUENCE MODEL</small><strong>RNN</strong><em>works across sequence steps</em></div>
          </div>
          <div className="living-representation-lane living-representation-lane--features">
            <span className="living-representation-lane__label">FEATURE VIEW</span>
            <div className="living-feature-origin"><strong>Structure</strong><span>RDKit</span></div>
            <span className="living-representation-arrow" aria-hidden="true">→</span>
            <div className="living-fingerprint" aria-label="Conceptual fingerprint representation, not an experimental bit vector">
              <div className="living-fingerprint__cells" aria-label="128 fingerprint positions; bit values not shown">{Array.from({ length: 128 }, (_, index) => <i key={index} />)}</div>
              <strong>Morgan fingerprint</strong>
              <span>radius 2 <b>·</b> 128 bits</span>
            </div>
            <p className="living-feature-note">A feature representation explored alongside sequence work; not drawn as an input to the RNN.</p>
          </div>
          <figcaption id="living-representation-caption">Representation map · explanatory schematic only. No experimental molecule, SMILES string or fingerprint is reproduced.</figcaption>
        </figure>
      </section>

      <section className="living-data" aria-labelledby="living-data-title">
        <div className="living-section-stamp"><span>03</span><p className="living-eyebrow">DATA CONTEXT</p></div>
        <div className="living-data__intro">
          <h2 id="living-data-title">Two dataset scales. Different jobs.</h2>
          <p>The broad snapshot and the smaller curated experiment subsets describe separate contexts. The roughly 400–600 entries belonged to curated experiments, not a later stage of the April inventory or a single funnel.</p>
        </div>
        <figure className="living-data-figure" aria-labelledby="living-data-caption">
          <div className="living-snapshot">
            <p className="living-eyebrow">APRIL 12 SNAPSHOT <span>· OWNER-REPORTED</span></p>
            <div className="living-snapshot__numbers">
              <div><strong>15,696</strong><span>rows</span></div>
              <div><strong>14,487</strong><span>unique SMILES</span></div>
            </div>
            <div className="living-snapshot__rule" aria-hidden="true"><i /><i /></div>
          </div>
          <div className="living-curated">
            <p className="living-eyebrow">SEPARATE EXPERIMENT SUBSETS</p>
            <strong>~400–600</strong>
            <span>entries in some curated experiments</span>
            <div className="living-curated__marks" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
          <figcaption id="living-data-caption">The 15,696-row snapshot and the roughly 400–600-entry experiment subsets are kept distinct. No subset-to-output relationship is established here.</figcaption>
        </figure>
      </section>

      <section className="living-route living-route--deepmol" aria-labelledby="living-deepmol-title">
        <div className="living-route__header">
          <div className="living-section-stamp"><span>04</span><p className="living-eyebrow">ROUTE ONE · SEQUENCE GENERATION</p></div>
          <h2 id="living-deepmol-title">DeepMol / RNN: explore molecules as sequences.</h2>
          <p>SMILES made molecular information available as an ordered string. I explored whether a recurrent model could learn from those sequences and generate more strings in that representation.</p>
        </div>
        <figure className="living-deepmol-figure" aria-labelledby="living-deepmol-caption">
          <p className="living-method-owner">JOSHUA’S WORK · OWNER-REPORTED</p>
          <div
            className="living-sequence-transformation"
            role="img"
            aria-label="From curated SMILES through sequence preparation and an RNN to generated strings, then interpretation limits"
          >
            <div className="living-flow-stage living-flow-stage--data">
              <p className="living-eyebrow">CURATED EXPERIMENT DATA</p>
              <strong>Curated SMILES data</strong>
              <span>strings prepared for this route</span>
              <div className="living-string-stack" aria-hidden="true"><i /><i /><i /></div>
            </div>
            <div className="living-flow-link" aria-hidden="true"><i /></div>
            <div className="living-flow-stage living-flow-stage--prepare">
              <p className="living-eyebrow">SEQUENCE PREPARATION</p>
              <strong>Sequence representation</strong>
              <span>DeepMol CSVLoader reads the experiment table</span>
              <div className="living-token-ribbon" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
            <div className="living-flow-link" aria-hidden="true"><i /></div>
            <div className="living-flow-stage living-flow-stage--rnn">
              <p className="living-eyebrow">RNN MOLECULARGENERATOR</p>
              <strong>RNN MolecularGenerator</strong>
              <svg className="living-recurrent-loop" viewBox="0 0 180 68" aria-hidden="true">
                <path className="living-recurrent-loop__forward" d="M17 37H163m0 0-9-7m9 7-9 7" />
                <path className="living-recurrent-loop__return" d="M151 20C130 3 50 3 29 20" />
                <path className="living-recurrent-loop__arrow" d="m29 20 1-9m-1 9 9-1" />
                <circle cx="30" cy="37" r="8" /><circle cx="90" cy="37" r="8" /><circle cx="150" cy="37" r="8" />
              </svg>
              <span>Recurrence carries context across sequence steps.</span>
            </div>
            <div className="living-flow-link" aria-hidden="true"><i /></div>
            <div className="living-flow-stage living-flow-stage--output">
              <p className="living-eyebrow">GENERATED OUTPUT</p>
              <strong>Generate SMILES strings</strong>
              <span>string output, with contents not reproduced</span>
              <div className="living-string-stack living-string-stack--output" aria-hidden="true"><i /><i /><i /></div>
            </div>
            <div className="living-flow-link" aria-hidden="true"><i /></div>
            <div className="living-flow-stage living-flow-stage--interpret">
              <p className="living-eyebrow">INTERPRETATION BOUNDARY</p>
              <strong>A string is a starting point</strong>
              <span>Validity? Uniqueness? Novelty? Viability?</span>
              <small>Not established by the count alone.</small>
            </div>
          </div>
          <div className="living-deepmol-figure__details">
            <div className="living-run-note">
              <p className="living-eyebrow">REPORTED RUN SETTINGS</p>
              <div aria-label="Reported settings: 10 epochs and batch size 64"><strong>10</strong><span>epochs</span><strong>64</strong><span>batch size</span></div>
              <p>Available records do not link these settings to the separate 500-sample account.</p>
            </div>
            <div className="living-sample-output">
              <p className="living-eyebrow">SEPARATE OWNER-REPORTED COUNT</p>
              <strong aria-label="500 generated SMILES samples">500</strong>
              <span>generated SMILES samples</span>
              <small>Owner-attributed count only · artifacts do not verify its linkage or sample properties.</small>
            </div>
          </div>
          <figcaption id="living-deepmol-caption">DeepMol route · a conceptual sequence-to-string workflow, not a reproduced run trace. The owner attributes 500 generated SMILES samples to this route; available artifacts do not connect that count to the recorded settings or establish validity, uniqueness, novelty or viability.</figcaption>
        </figure>
        <div className="living-route__learning"><span>WHAT THIS ROUTE TAUGHT ME</span><p>Generating a string and establishing what it represents are separate questions. The output count alone does not answer validity, uniqueness or novelty.</p></div>
        <aside className="living-source-note"><strong>Source note</strong><p>The owner’s later account attributes 500 generated samples to DeepMol/RNN. A May 2025 report attributes the 500-sample account to REINVENT4 and also mentions RDKit checking. No surviving source or run artifact resolves that conflict; this page follows the owner correction.</p></aside>
      </section>

      <section className="living-route living-route--fragments" aria-labelledby="living-fragments-title">
        <div className="living-route__header">
          <div className="living-section-stamp"><span>05</span><p className="living-eyebrow">ROUTE TWO · STRUCTURE-AWARE WORK</p></div>
          <h2 id="living-fragments-title">RDKit / Fragmenstein: work with pieces and their placement.</h2>
          <p>Instead of extending a string, I explored a structure-aware alternative: break structures into reusable substructures, compare compatibility, then investigate fragment linking and spatial workflows.</p>
        </div>
        <figure className="living-fragment-figure" aria-labelledby="living-fragment-caption">
          <p className="living-fragment-figure__label">JOSHUA’S FRAGMENT / SPATIAL WORK · OWNER-REPORTED</p>
          <p className="living-fragment-figure__concept-label">CONCEPTUAL STRUCTURE SCHEMATIC · NOT AN EXPERIMENTAL RESULT</p>
          <svg className="living-fragment-map" viewBox="0 0 1040 270" role="img" aria-labelledby="living-fragment-map-title living-fragment-map-desc">
            <title id="living-fragment-map-title">Conceptual fragment workflow from structures to linking</title>
            <desc id="living-fragment-map-desc">Abstract node-and-line motifs illustrate breaking a structure into substructures, comparing compatible fragments, considering spatial overlap, and trying a link. The motifs are not experimental molecules, placements, or candidates.</desc>
            <path className="living-fragment-map__baseline" d="M70 226H970" />
            <path className="living-fragment-map__flow" d="M190 104H275m169 0h78m190 0h85" />
            <g className="living-fragment-map__whole" transform="translate(70 45)">
              <path d="M18 71 53 43l38 23 39-30 33 29-14 43-42 18-41-14-37 19" />
              <circle cx="18" cy="71" r="8" /><circle cx="53" cy="43" r="8" /><circle cx="91" cy="66" r="8" /><circle cx="130" cy="36" r="8" /><circle cx="163" cy="65" r="8" /><circle cx="149" cy="108" r="8" /><circle cx="107" cy="126" r="8" /><circle cx="66" cy="112" r="8" /><circle cx="29" cy="131" r="8" />
            </g>
            <g className="living-fragment-map__pieces" transform="translate(300 40)">
              <path d="M15 70 48 45l38 23 37-29m-104 31 34 42 42-14 28-30" />
              <circle cx="15" cy="70" r="7" /><circle cx="48" cy="45" r="7" /><circle cx="86" cy="68" r="7" /><circle cx="123" cy="39" r="7" />
              <path d="M174 75 206 49l37 24 29-19m-98 21 31 39 38-16 29-25" />
              <circle cx="174" cy="75" r="7" /><circle cx="206" cy="49" r="7" /><circle cx="243" cy="73" r="7" /><circle cx="272" cy="54" r="7" />
            </g>
            <g className="living-fragment-map__fit" transform="translate(590 40)">
              <path d="M12 70 44 47l37 22 37-28m-106 29 32 41 39-14 35-28" />
              <circle cx="12" cy="70" r="7" /><circle cx="44" cy="47" r="7" /><circle cx="81" cy="69" r="7" /><circle cx="118" cy="41" r="7" />
              <path d="M87 82 119 57l38 23 34-18m-104 20 33 39 38-15 33-26" />
              <circle cx="87" cy="82" r="7" /><circle cx="119" cy="57" r="7" /><circle cx="157" cy="80" r="7" /><circle cx="191" cy="62" r="7" />
              <ellipse cx="99" cy="79" rx="35" ry="48" />
            </g>
            <g className="living-fragment-map__link" transform="translate(825 48)">
              <path d="M8 67 42 42l37 23 35-27m-106 29 31 42 40-15 35-29m-72 2h44m-43 5 43-5" />
              <circle cx="8" cy="67" r="7" /><circle cx="42" cy="42" r="7" /><circle cx="79" cy="65" r="7" /><circle cx="114" cy="38" r="7" /><circle cx="39" cy="109" r="7" /><circle cx="79" cy="94" r="7" />
            </g>
            <text x="70" y="253">STRUCTURE</text><text x="300" y="253">SUBSTRUCTURES</text><text x="590" y="253">COMPATIBILITY + SPACE</text><text x="825" y="253">LINKING</text>
          </svg>
          <div className="living-fragment-stages">
            <div className="living-fragment-stage"><span>01</span><strong>Decompose</strong><p>Move from structures to reusable substructures.</p></div>
            <div className="living-fragment-stage"><span>02</span><strong>Compare</strong><p>Consider similarity and structural compatibility.</p></div>
            <div className="living-fragment-stage"><span>03</span><strong>Place</strong><p>Explore spatial / overlap reasoning.</p></div>
            <div className="living-fragment-stage"><span>04</span><strong>Link</strong><p>Investigate linking or recombination.</p></div>
          </div>
          <p className="living-fragment-tools">I used RDKit and Fragmenstein to explore fragment linking and spatial workflows; the available notes do not assign every operation to one library.</p>
          <div className="living-fragment-outcome"><strong>SOME WORKFLOWS SUCCEEDED</strong></div>
          <figcaption id="living-fragment-caption">Conceptual structure schematic · node-and-line forms are placeholders, not atoms, experimental structures, placements, candidates or results.</figcaption>
        </figure>
        <div className="living-route__learning"><span>WHAT THIS ROUTE TAUGHT ME</span><p>Fragment design shifts attention from sequence behavior to how pieces relate structurally and spatially. Some workflows succeeded, though no specific candidate result is available to show.</p></div>
      </section>

      <section className="living-route living-route--reinvent" aria-labelledby="living-reinvent-title">
        <div className="living-route__header">
          <div className="living-section-stamp"><span>06</span><p className="living-eyebrow">ROUTE THREE · RESEARCH AND ATTEMPT</p></div>
          <h2 id="living-reinvent-title">REINVENT4: an approach I researched, but did not complete in scope.</h2>
          <p>I researched and attempted REINVENT4 as a separate generative route alongside DeepMol/RNN and the fragment work. Successful generation was not achieved within the internship scope.</p>
        </div>
        <figure className="living-reinvent-figure" aria-labelledby="living-reinvent-caption">
          <p className="living-reinvent-figure__label">JOSHUA’S RESEARCH AND ATTEMPT · OWNER-REPORTED</p>
          <div className="living-reinvent-track" role="img" aria-label="Separate generative approach researched and attempted, then stopped at the internship scope boundary before successful generation">
            <div className="living-reinvent-marker"><span>01</span><strong>Researched</strong><small>an alternate generative approach</small></div>
            <i className="living-reinvent-track__line" aria-hidden="true" />
            <div className="living-reinvent-marker living-reinvent-marker--attempt"><span>02</span><strong>Attempted</strong><small>within internship scope</small></div>
            <i className="living-reinvent-track__line" aria-hidden="true" />
            <div className="living-reinvent-boundary"><span>INTERNSHIP SCOPE BOUNDARY</span><strong>No successful generation</strong></div>
          </div>
          <figcaption id="living-reinvent-caption">The stop point is known; inputs, configuration and reason are not established. The figure does not diagnose the attempt.</figcaption>
        </figure>
        <div className="living-route__learning"><span>WHAT THIS ROUTE TAUGHT ME</span><p>An attempted route is still part of the investigation. It needs to be reported at the point the evidence supports, without assigning an undocumented cause.</p></div>
      </section>

      <section className="living-compare" aria-labelledby="living-compare-title">
        <div className="living-section-stamp"><span>07</span><p className="living-eyebrow">WHAT THE COMPARISON CHANGED</p></div>
        <div className="living-compare__intro"><h2 id="living-compare-title">Three routes gave me three different kinds of evidence.</h2><p>I explored three routes because sequence generation, structure-aware fragments and a separate generative platform approached the research question differently. This was not a standardized benchmark between completed systems; I kept the questions and outcomes attached to the route that produced them.</p></div>
        <div className="living-lessons">
          <article><span>01 / DEEPMOL</span><h3>Sequence</h3><p>500 generated SMILES samples were reported. Their count does not establish molecular validity or novelty.</p></article>
          <article><span>02 / FRAGMENTS</span><h3>Structure + space</h3><p>Some fragment workflows succeeded; the surviving evidence does not identify a specific candidate.</p></article>
          <article><span>03 / REINVENT4</span><h3>Unfinished route</h3><p>Research and an attempt happened, but successful generation was not reached in scope.</p></article>
        </div>
      </section>

      <footer className="living-close">
        <div className="living-close__handoff"><p className="living-eyebrow">THE HANDOFF</p><strong>Research code</strong><strong>Generated outputs</strong><strong>Written report</strong></div>
        <div className="living-close__reflection"><p className="living-eyebrow">WHAT I CARRIED FORWARD</p><h2>Learn the domain. Separate a method from its evidence. Keep going when a route is unfinished.</h2><p>This was a formative start to my interest in machine learning: connecting what an algorithm can do with what the research question actually needs.</p></div>
      </footer>
    </article>
  );
}
