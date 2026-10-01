import { Link } from "react-router-dom";
import "./lis-research-record.css";

const experiments = [
  {
    number: "01",
    kind: "SEQUENCE GENERATION",
    title: "DeepMol",
    steps: ["CSVLoader", "Morgan fingerprints", "RNN MolecularGenerator"],
    purpose: "SMILES sequence generation",
    outcomeLabel: "METHOD",
    outcome: "SMILES sequence generation",
    outcomeDetail: "",
    tone: "amber",
  },
  {
    number: "02",
    kind: "FRAGMENT-BASED DESIGN",
    title: "RDKit + Fragmenstein",
    steps: ["Structure", "Fragment selection", "Recombination"],
    purpose: "Select structurally compatible fragments with RDKit / Fragmenstein.",
    outcomeLabel: "OUTCOME",
    outcome: "Explored in some workflows",
    outcomeDetail: "I explored structure decomposition and fragment recombination with RDKit / Fragmenstein.",
    tone: "teal",
  },
  {
    number: "03",
    kind: "ATTEMPTED GENERATION",
    title: "REINVENT4",
    steps: ["REINVENT4 researched", "Generation attempted"],
    purpose: "Generation attempt did not succeed.",
    outcomeLabel: "OUTCOME",
    outcome: "No successful generation",
    outcomeDetail: "I researched and attempted REINVENT4, but did not reach successful molecule generation.",
    tone: "coral",
  },
] as const;

function RepresentationFigure() {
  return (
    <figure className="lis-public-representation" aria-labelledby="lis-representation-title">
      <figcaption id="lis-representation-title">
        <span>SCHEMATIC · NOT A PROJECT SAMPLE</span>
      </figcaption>
      <div className="lis-public-representation__flow">
        <div className="lis-public-representation__structure">
          <p>STRUCTURE</p>
          <svg viewBox="0 0 136 94" aria-hidden="true">
            <g stroke="#a9bdc0" strokeWidth="3" strokeLinecap="round">
              <path d="M26 22h38l22 24H48v26h42M64 22v48M86 46h28" fill="none" />
            </g>
            <g fill="#eee7d8" stroke="#07141d" strokeWidth="2">
              <circle cx="26" cy="22" r="7" /><circle cx="64" cy="22" r="7" />
              <circle cx="86" cy="46" r="7" /><circle cx="48" cy="46" r="7" />
              <circle cx="64" cy="70" r="7" /><circle cx="90" cy="70" r="7" />
              <circle cx="114" cy="46" r="7" />
            </g>
            <g fill="#c79b45" stroke="#07141d" strokeWidth="2">
              <circle cx="64" cy="22" r="7" /><circle cx="86" cy="46" r="7" />
            </g>
          </svg>
        </div>
        <span className="lis-public-representation__arrow" aria-hidden="true">→</span>
        <div className="lis-public-representation__smiles">
          <strong>SMILES</strong>
          <i /><i />
          <small>string format</small>
        </div>
        <span className="lis-public-representation__arrow" aria-hidden="true">→</span>
        <div className="lis-public-representation__fingerprint">
          <p>MORGAN FINGERPRINT</p>
          <div aria-hidden="true">
            {Array.from({ length: 32 }, (_, index) => (
              <i className={(index * 7 + index % 5) % 4 === 0 ? "is-on" : undefined} key={index} />
            ))}
          </div>
          <strong>radius 2 · 128 bits</strong>
          <small>Illustrative bit marks</small>
        </div>
      </div>
    </figure>
  );
}

function ExperimentRoutes() {
  return (
    <div className="lis-public-routes" role="list" aria-label="Three molecular modeling approaches">
      {experiments.map((experiment) => (
        <article className={`lis-public-route lis-public-route--${experiment.tone}`} key={experiment.number} role="listitem">
          <div className="lis-public-route__name">
            <p>{experiment.number} / {experiment.kind}</p>
            <h3>{experiment.title}</h3>
          </div>
          <div className="lis-public-route__method">
            <div>
              {experiment.steps.map((step, index) => (
                <span key={step}>
                  <b>{step}</b>
                  {index < experiment.steps.length - 1 && <i aria-hidden="true">→</i>}
                </span>
              ))}
            </div>
            <p className="lis-public-route__purpose">{experiment.purpose}</p>
          </div>
          <div className="lis-public-route__outcome">
            <p>{experiment.outcomeLabel}</p>
            <strong>{experiment.outcome}</strong>
            {experiment.outcomeDetail && <small>{experiment.outcomeDetail}</small>}
          </div>
        </article>
      ))}
    </div>
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
          <p className="lis-kicker lis-kicker--teal">GENERATIVE MOLECULAR MODELING&nbsp; / &nbsp;EXPERIENCE · 2025</p>
          <h1 id="lis-title">Molecules need representation before generation.</h1>
          <p className="lis-public-hero__lead">
            I joined a biomedical research group new to computational chemistry. Before exploring generation, I had to learn how molecular structures become SMILES and model-ready features.
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

      <section className="lis-public-section lis-public-representation-section" aria-labelledby="lis-model-title">
        <div className="lis-public-section__intro">
          <p className="lis-kicker">01 / MODEL REPRESENTATION</p>
          <h2 id="lis-model-title">Represent the molecule first.</h2>
          <p>
            I moved from molecular structures to SMILES, then used RDKit to parse and validate the representation.
          </p>
          <div className="lis-public-dataset" aria-label="Dataset scope">
            <p className="lis-kicker">DATA SCOPE</p>
            <p>Source collection · <strong>15,696 records</strong> / <strong>14,487 unique SMILES</strong>.</p>
            <p>Curated experiment sets · roughly <strong>400–600 entries</strong>.</p>
          </div>
        </div>
        <RepresentationFigure />
      </section>

      <section className="lis-public-section lis-public-experiments" aria-labelledby="lis-experiments-title">
        <div className="lis-public-section__heading">
          <p className="lis-kicker">02 / EXPERIMENT ROUTES</p>
          <h2 id="lis-experiments-title">Three approaches. Different outcomes.</h2>
          <p>I explored sequence generation, fragment-based design, and another generative workflow.</p>
        </div>
        <ExperimentRoutes />
      </section>

      <section className="lis-public-output" aria-label="Project output">
        <header className="lis-public-section__heading lis-public-output__heading">
          <p className="lis-kicker">03 / PROJECT OUTPUT</p>
          <h2>A project output in SMILES.</h2>
        </header>
        <div className="lis-public-output__card">
          <div className="lis-public-output__count">
            <p className="lis-kicker">PROJECT OUTPUT · DEEPMOL</p>
            <strong>500</strong>
          </div>
          <div className="lis-public-output__sample">
            <h3>generated SMILES samples</h3>
            <p>SEQUENCE-GENERATION OUTPUT</p>
          </div>
        </div>
      </section>

      <section className="lis-public-section lis-public-contribution" aria-labelledby="lis-contribution-title">
        <div>
          <p className="lis-kicker">04 / MY CONTRIBUTION</p>
          <h2 id="lis-contribution-title">Research engineering across the workflow.</h2>
          <p>
            I worked across data loading, SMILES processing, molecular features, sequence generation, and fragment workflows.
          </p>
        </div>
        <aside className="lis-public-learning">
          <p className="lis-kicker lis-kicker--teal">TECHNICAL LEARNING</p>
          <h3>Sequence vs. fragments</h3>
          <p>
            One route modeled SMILES sequences; another selected and recombined compatible fragments. Comparing them made molecular representation a core modeling choice.
          </p>
        </aside>
      </section>

      <footer className="lis-public-close">
        <p className="lis-kicker">WHAT I CARRIED FORWARD</p>
        <h2>I left with a habit of making each workflow clear and stating what each experiment actually showed.</h2>
        <p className="lis-public-footer">LIVING IN SILICO&nbsp; / &nbsp;GENERATIVE MOLECULAR MODELING</p>
      </footer>
    </article>
  );
}
