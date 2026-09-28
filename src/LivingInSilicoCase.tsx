import { Link } from "react-router-dom";
import "./lis-research-record.css";

const experiments = [
  {
    id: "01",
    label: "MOLECULAR GENERATION",
    title: "DeepMol",
    tone: "amber",
    methods: [
      "CSVLoader",
      "Morgan fingerprints · r2 / 128 bits",
      "RNN MolecularGenerator",
    ],
    setup: "Reported run: 10 epochs / batch size 64",
    result: "500 generated SMILES samples",
    evidence:
      "The available run record does not connect these settings to that exact sample set.",
  },
  {
    id: "02",
    label: "FRAGMENT-BASED DESIGN",
    title: "RDKit + Fragmenstein",
    tone: "teal",
    methods: ["Structure", "Fragment selection", "Recombination"],
    setup: "Fragment-based molecular design",
    result: "Worked in some workflows",
    evidence:
      "A workflow outcome, not a claim that a molecule was validated or novel.",
  },
  {
    id: "03",
    label: "ATTEMPTED GENERATION",
    title: "REINVENT4",
    tone: "coral",
    methods: ["Researched", "Generation workflow attempted"],
    setup: "The generation path did not complete successfully.",
    result: "No successful generation",
    evidence: "Attempted does not mean the workflow produced an output.",
  },
] as const;

export default function LivingInSilicoCase() {
  return (
    <article className="living-story lis-record" aria-labelledby="lis-title">
      <nav className="lis-record__crumbs" aria-label="Breadcrumb">
        <Link to="/experience">‹ EXPERIENCE</Link>
        <span>RESEARCH RECORD / GENERATIVE MOLECULAR MODELING</span>
      </nav>

      <header className="lis-hero">
        <div className="lis-hero__main">
          <p className="lis-kicker">GENERATIVE MOLECULAR MODELING / EXPERIENCE · 2025</p>
          <h1 id="lis-title">Molecular generation, through experiments.</h1>
          <p className="lis-hero__lead">
            I explored Morgan fingerprints and RNN generation with DeepMol,
            alongside RDKit / Fragmenstein fragment workflows. The April
            snapshot and curated experiment sets stayed separate.
          </p>
        </div>
        <aside className="lis-dossier" aria-label="Research role">
          <p className="lis-kicker">RESEARCH ROLE</p>
          <h2>AI / ML Research Intern</h2>
          <p className="lis-dossier__domain">Generative Molecular Modeling</p>
          <div className="lis-dossier__rule" />
          <p className="lis-kicker lis-kicker--teal">PERIOD</p>
          <p className="lis-dossier__date">March – June 2025</p>
          <p className="lis-dossier__context">
            Computational chemistry <span>·</span> Biomedical research
          </p>
        </aside>
      </header>

      <section className="lis-section lis-scope" aria-labelledby="lis-scope-title">
        <div className="lis-section__intro">
          <p className="lis-kicker">01 / DATA SCOPE</p>
          <h2 id="lis-scope-title">Two data contexts. Kept separate.</h2>
          <p>
            The larger April snapshot was not the source of the smaller
            experiment subsets.
          </p>
        </div>

        <div className="lis-scope__panels">
          <article className="lis-data-panel">
            <p className="lis-kicker lis-kicker--teal">APR 12 DATASET SNAPSHOT</p>
            <p className="lis-data-panel__metric">15,696</p>
            <p className="lis-data-panel__unit">rows</p>
            <div className="lis-data-panel__rule" />
            <p className="lis-data-panel__secondary">
              <strong>14,487</strong> unique SMILES
            </p>
          </article>
          <article className="lis-data-panel lis-data-panel--subsets">
            <p className="lis-kicker lis-kicker--teal">SEPARATE EXPERIMENTS</p>
            <p className="lis-data-panel__metric">~400–600</p>
            <p className="lis-data-panel__unit">curated entries</p>
            <div className="lis-data-panel__rule" />
            <p className="lis-data-panel__note">
              Working sets used in other experiment contexts.
            </p>
          </article>
        </div>
      </section>

      <section className="lis-section lis-workflows" aria-labelledby="lis-workflows-title">
        <div className="lis-section__heading">
          <p className="lis-kicker">02 / EXPERIMENT REGISTER</p>
          <h2 id="lis-workflows-title">Three paths. Distinct evidence.</h2>
          <p>
            Read each method and outcome independently; the records do not
            establish one end-to-end data funnel.
          </p>
        </div>

        <div className="lis-register" role="list" aria-label="Research experiment records">
          {experiments.map((experiment) => (
            <article
              className={`lis-register__row lis-register__row--${experiment.tone}`}
              key={experiment.id}
              role="listitem"
            >
              <div className="lis-register__approach">
                <p className="lis-kicker lis-register__label">
                  {experiment.id} / {experiment.label}
                </p>
                <h3>{experiment.title}</h3>
              </div>
              <div className="lis-register__method">
                <p className="lis-register__column-label">METHOD PATH</p>
                <div className="lis-method-path" role="list" aria-label={`${experiment.title} method path`}>
                  {experiment.methods.map((method, index) => (
                    <span className="lis-method-path__segment" key={method} role="listitem">
                      <span className="lis-method-path__step">{method}</span>
                      {index < experiment.methods.length - 1 && (
                        <span className="lis-method-path__arrow" aria-hidden="true">→</span>
                      )}
                    </span>
                  ))}
                </div>
                <p className="lis-register__setup">{experiment.setup}</p>
              </div>
              <div className="lis-register__result">
                <p className="lis-register__column-label">RECORDED OUTCOME</p>
                <p className="lis-register__result-value">{experiment.result}</p>
                <p className="lis-register__evidence">{experiment.evidence}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lis-section lis-evidence" aria-labelledby="lis-evidence-title">
        <div className="lis-section__heading">
          <p className="lis-kicker">03 / REPRESENTATION &amp; EVALUATION</p>
          <h2 id="lis-evidence-title">What the experiment record can support.</h2>
        </div>
        <div className="lis-evidence__grid">
          <article className="lis-evidence-panel">
            <p className="lis-kicker lis-kicker--teal">MOLECULAR REPRESENTATION</p>
            <h3>SMILES to molecular features</h3>
            <p>
              DeepMol CSVLoader handled tabular input. Morgan fingerprints
              represented structures with radius 2 and 128 bits.
            </p>
            <p className="lis-evidence-panel__note">
              A reported RNN MolecularGenerator run used 10 epochs and batch
              size 64.
            </p>
          </article>
          <article className="lis-evidence-panel lis-evidence-panel--limits">
            <p className="lis-kicker">OUTPUT / EVALUATION BOUNDARY</p>
            <h3>500 samples is a count, not a quality result.</h3>
            <p>
              The DeepMol work produced 500 generated SMILES samples. The
              available record does not establish validity, uniqueness, or
              novelty.
            </p>
            <p className="lis-evidence-panel__note">
              No quality metric is claimed without supporting evaluation data.
            </p>
          </article>
        </div>
      </section>

      <section className="lis-section lis-contribution" aria-labelledby="lis-contribution-title">
        <div className="lis-contribution__main">
          <p className="lis-kicker">04 / TECHNICAL CONTRIBUTION</p>
          <h2 id="lis-contribution-title">Research engineering across methods and evidence.</h2>
          <p>
            I worked across data loading, molecular representation, sequence
            generation, and fragment-based design. I kept experiment scope,
            reported settings, and observed outcomes distinct when the run
            record did not establish a single trace from input to result.
          </p>
        </div>
        <aside className="lis-record-stamp" aria-label="Experiment record boundaries">
          <p className="lis-kicker lis-kicker--teal">RESEARCH RECORD</p>
          <h3>Read the boundaries with the results.</h3>
          <p>April snapshot <span>≠</span> curated subsets</p>
          <p>Attempted method <span>≠</span> successful generation</p>
        </aside>
      </section>

      <footer className="lis-close">
        <p className="lis-kicker">TECHNICAL TAKEAWAY</p>
        <p>
          Data scope, representation, method, and outcome need separate
          evidence before they can be read as one experiment.
        </p>
      </footer>
    </article>
  );
}
