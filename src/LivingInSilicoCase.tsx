import { Link } from "react-router-dom";
import "./lis-research-record.css";

const workflows = [
  {
    id: "01",
    label: "GENERATION",
    title: "DeepMol",
    tone: "amber",
    methods: ["CSVLoader", "Morgan fingerprints · radius 2 · 128 bits"],
    configuration: "RNN MolecularGenerator · 10 epochs · batch size 64",
    outcome: "500 generated SMILES samples",
    caveat:
      "Available run artifacts do not establish whether this exact configuration produced those samples.",
  },
  {
    id: "02",
    label: "FRAGMENT-BASED DESIGN",
    title: "RDKit + Fragmenstein",
    tone: "teal",
    methods: ["Fragment-based molecular design", "Explored in some workflows"],
    configuration:
      "Existing structures → fragment selection → recombination",
    outcome: "Worked in some workflows",
    caveat:
      "This records workflow progress, not a claim of validated or novel molecules.",
  },
  {
    id: "03",
    label: "ATTEMPTED GENERATION",
    title: "REINVENT4",
    tone: "coral",
    methods: ["Researched", "Generation workflow attempted"],
    configuration: "The generation path did not complete successfully.",
    outcome: "No successful generation",
    caveat:
      "An attempted workflow is kept distinct from a generated output.",
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
            I explored machine-learning and fragment-based approaches to
            molecular design, working across data representation, generation
            workflows, and research code.
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
          <h2 id="lis-scope-title">
            Different working sets. Separate experiment contexts.
          </h2>
          <p>
            The April snapshot was not reduced into the smaller experiment
            subsets.
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
            <p className="lis-kicker lis-kicker--teal">OTHER EXPERIMENTS</p>
            <p className="lis-data-panel__metric">~400–600</p>
            <p className="lis-data-panel__unit">curated entries</p>
            <div className="lis-data-panel__rule" />
            <p className="lis-data-panel__note">
              Separate curated subsets used in different experiments.
            </p>
          </article>
        </div>
      </section>

      <section className="lis-section lis-workflows" aria-labelledby="lis-workflows-title">
        <div className="lis-section__heading">
          <p className="lis-kicker">02 / EXPERIMENT PATHS</p>
          <h2 id="lis-workflows-title">Three approaches, distinct outcomes.</h2>
          <p>
            Reported methods and outputs stay separate; the record does not
            imply one shared data funnel.
          </p>
        </div>

        <div className="lis-workflow-grid">
          {workflows.map((workflow) => (
            <article
              className={`lis-workflow lis-workflow--${workflow.tone}`}
              key={workflow.id}
            >
              <p className="lis-kicker lis-workflow__label">
                {workflow.id} <span>/</span> {workflow.label}
              </p>
              <h3>{workflow.title}</h3>
              <div className="lis-workflow__rule" />
              <ul className="lis-workflow__methods">
                {workflow.methods.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
              <p className="lis-workflow__configuration">
                {workflow.configuration}
              </p>
              <p className="lis-workflow__outcome">{workflow.outcome}</p>
              <p className="lis-workflow__caveat">{workflow.caveat}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lis-section lis-evidence" aria-labelledby="lis-evidence-title">
        <div className="lis-section__heading">
          <p className="lis-kicker">03 / METHODS &amp; EVIDENCE</p>
          <h2 id="lis-evidence-title">What the record can support.</h2>
        </div>
        <div className="lis-evidence__grid">
          <article className="lis-evidence-panel">
            <p className="lis-kicker lis-kicker--teal">REPRESENTATION</p>
            <h3>SMILES → molecular features</h3>
            <p>
              DeepMol CSVLoader handled tabular input. Morgan fingerprints
              represented structures with radius 2 and 128 bits.
            </p>
            <p className="lis-evidence-panel__note">
              These are reported experiment methods, not a complete verified
              run trace.
            </p>
          </article>
          <article className="lis-evidence-panel lis-evidence-panel--limits">
            <p className="lis-kicker">OUTPUT / LIMITS</p>
            <h3>Sample count is not a quality claim.</h3>
            <p>
              DeepMol work produced 500 generated SMILES samples. Available
              artifacts do not verify validity, uniqueness, novelty, or research
              impact—and do not link that output to the exact configuration
              above.
            </p>
            <p className="lis-evidence-panel__note">
              EVIDENCE SHOWN / COUNTS + WORKFLOW STATUS
            </p>
          </article>
        </div>
      </section>

      <section className="lis-section lis-contribution" aria-labelledby="lis-contribution-title">
        <div className="lis-contribution__main">
          <p className="lis-kicker">04 / TECHNICAL CONTRIBUTION</p>
          <h2 id="lis-contribution-title">
            Learning the system underneath the model.
          </h2>
          <p>
            My work crossed computational chemistry, molecular data
            representation, and hands-on generation experiments. I worked
            through ML and fragment-based workflows, read the outputs against
            what the available evidence could show, and documented where a path
            succeeded—or did not.
          </p>
        </div>
        <aside className="lis-record-stamp" aria-label="Experiment scope distinction">
          <p className="lis-kicker lis-kicker--teal">RESEARCH RECORD</p>
          <h3>Keep scope visible.</h3>
          <p>
            Apr 12 snapshot <span>≠</span> curated subsets
          </p>
          <p>
            Attempted workflow <span>≠</span> successful generation
          </p>
        </aside>
      </section>

      <footer className="lis-close">
        <p className="lis-kicker">TECHNICAL TAKEAWAY</p>
        <p>
          A research workflow is easier to assess when data scope, method,
          output, and failure boundaries are recorded separately.
        </p>
      </footer>
    </article>
  );
}
