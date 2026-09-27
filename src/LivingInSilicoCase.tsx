import { Link } from "react-router-dom";
import "./lis-research-record.css";

const learningTools = [
  "SMILES",
  "DeepMol",
  "Fragmenstein",
  "REINVENT4",
  "Research papers",
  "Technical documentation",
] as const;

const fragmentSteps = [
  {
    title: "Decompose",
    detail: "Break existing molecular structures into reusable fragments.",
  },
  {
    title: "Select",
    detail: "Choose fragments that are structurally compatible.",
  },
  {
    title: "Recombine",
    detail: "Explore candidate structures with RDKit and Fragmenstein.",
  },
] as const;

const handoffItems = ["Research code", "Written report"] as const;

export default function LivingInSilicoCase() {
  return (
    <article className="living-story" aria-labelledby="living-title">
      <div className="living-back">
        <Link to="/experience">‹ EXPERIENCE</Link>
        <span>CASE STUDY / LIVING IN SILICO</span>
      </div>

      <header className="living-opening" id="living-opening">
        <div className="living-opening__copy">
          <p className="living-eyebrow">EXPERIENCE / GENERATIVE MOLECULAR MODELING</p>
          <h1 id="living-title">Learning a new science through machine learning.</h1>
          <p className="living-opening__lead">
            My first major technical internship took me into computational
            chemistry and biomedical research—domains I was only beginning to
            understand.
          </p>
          <dl className="living-meta">
            <div>
              <dt>ROLE</dt>
              <dd>AI/ML Research Intern</dd>
            </div>
            <div>
              <dt>DATES</dt>
              <dd>March–June 2025</dd>
            </div>
            <div>
              <dt>SUPERVISOR</dt>
              <dd>Sohail Mahmood</dd>
            </div>
          </dl>
        </div>

        <aside className="living-cohort" aria-label="Intern cohort context">
          <strong>4</strong>
          <p className="living-eyebrow">FIRST-YEAR INTERNS</p>
          <p>
            We came from different schools. Much of the research domain was new
            to the group.
          </p>
        </aside>
      </header>

      <section className="living-learning" aria-labelledby="living-learning-title">
        <div className="living-section-label">
          <span>01</span>
          <p className="living-eyebrow">A FAST START</p>
        </div>
        <div className="living-learning__copy">
          <h2 id="living-learning-title">The first weeks were a rapid education.</h2>
          <p>
            In the first one to two weeks, I learned unfamiliar terminology,
            followed papers and repositories, and worked through technical
            documentation while getting oriented to the research.
          </p>
        </div>
        <ul className="living-tool-list" aria-label="Research topics and tools">
          {learningTools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </section>

      <section className="living-memory" aria-labelledby="living-memory-title">
        <p className="living-eyebrow">A MOMENT I REMEMBER</p>
        <div className="living-memory__body">
          <strong>3–4 AM</strong>
          <div>
            <h2 id="living-memory-title">Before school, still following the question.</h2>
            <p>
              I stayed up watching and taking notes on a Stanford machine-learning
              lecture, thinking about how algorithms could apply to the research.
              I was absorbed in finding the connection.
            </p>
          </div>
        </div>
      </section>

      <section className="living-experiments" aria-labelledby="living-experiments-title">
        <div className="living-section-label">
          <span>02</span>
          <p className="living-eyebrow">EXPERIMENT CONTEXT</p>
        </div>
        <div className="living-experiments__main">
          <h2 id="living-experiments-title">Different datasets served different experiments.</h2>
          <div className="living-dataset-pair">
            <div className="living-dataset living-dataset--snapshot">
              <h3 className="living-eyebrow">APR 12 SNAPSHOT · OWNER-PROVIDED</h3>
              <div className="living-dataset__figures">
                <p><strong>15,696</strong><span>rows</span></p>
                <p><strong>14,487</strong><span>unique SMILES</span></p>
              </div>
            </div>
            <div className="living-dataset living-dataset--experiments">
              <h3 className="living-eyebrow">SEPARATE CURATED EXPERIMENTS</h3>
              <p className="living-dataset__range">~400–600</p>
              <p className="living-dataset__caption">entries in other experiments</p>
              <p className="living-dataset__note">
                A different experimental scale, kept separate from the Apr 12 snapshot.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="living-research-record" aria-labelledby="living-research-record-title">
        <h2 className="living-research-record__sr-only" id="living-research-record-title">
          DeepMol research record
        </h2>
        <div className="living-research-record__sample">
          <span className="living-research-record__index" aria-hidden="true">03</span>
          <p className="living-research-record__count">500</p>
          <p className="living-research-record__caption">GENERATED SMILES SAMPLES</p>
        </div>
        <div className="living-research-record__column living-research-record__method">
          <h3>METHOD</h3>
          <p>
            I used DeepMol CSVLoader and Morgan fingerprints (radius 2, 128
            bits), then ran an RNN MolecularGenerator for 10 epochs with batch
            size 64.
          </p>
        </div>
        <div className="living-research-record__column living-research-record__attempt">
          <h3>ATTEMPT</h3>
          <h4>REINVENT4</h4>
        </div>
        <div className="living-research-record__column living-research-record__outcome">
          <h3>OUTCOME</h3>
          <p>Did not achieve successful generation before the internship ended.</p>
        </div>
      </section>

      <section className="living-fragmenstein" aria-labelledby="living-fragmenstein-title">
        <div className="living-section-label">
          <span>04</span>
          <p className="living-eyebrow">FRAGMENT-BASED DESIGN</p>
        </div>
        <div className="living-fragmenstein__content">
          <h2 id="living-fragmenstein-title">Exploring structures through fragments.</h2>
          <p className="living-fragmenstein__intro">
            I also experimented with fragment-based molecular design using
            RDKit and Fragmenstein.
          </p>
          <ol className="living-fragment-steps">
            {fragmentSteps.map((step, index) => (
              <li key={step.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="living-reinvent" aria-labelledby="living-reinvent-title">
        <p className="living-eyebrow">AN UNFINISHED THREAD</p>
        <div>
          <h2 id="living-reinvent-title">REINVENT4</h2>
          <p>
            I researched and attempted the workflow, but successful generation
            was not achieved before the internship ended.
          </p>
        </div>
      </section>

      <footer className="living-close">
        <div className="living-handoff">
          <p className="living-eyebrow">FINAL HANDOFF</p>
          <ul aria-label="Handoff items">
            {handoffItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="living-reflection">
          <p className="living-eyebrow">WHAT STAYED WITH ME</p>
          <p>
            This was the beginning of my interest in machine learning: learn the
            domain, stay curious through the unfinished parts, and keep connecting
            the technical work back to the research question.
          </p>
        </div>
      </footer>
    </article>
  );
}
