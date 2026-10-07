import { Link } from "react-router-dom";
import { Client } from "./PortfolioLayout";
import "./education-projects.css";

const capabilityBriefs = [
  {
    id: "dental",
    discipline: "Database design · Oracle SQL",
    title: "Dental Clinic DBMS",
    status: ["CURRENT · IN PROGRESS", "EVIDENCE PENDING"],
    diagram: ["Clinic workflows", "ER → relational schema", "Integrity + query/report logic"],
    ideas: [
      "Translate an ER model into relational tables and relationships.",
      "Use primary/foreign keys, junction tables, and integrity constraints.",
      "Query across connected records with joins, grouping, and views.",
    ],
    caption:
      "Planned scope includes patients, dentists, appointments, procedures, billing, and inventory; prescriptions appear in earlier planning. These are project goals, not a claim that each area is implemented.",
    takeaway:
      "I’m learning to model how a clinic works while keeping active implementation separate from the wider target.",
    tags: ["Oracle SQL", "ER modeling", "Relational design"],
  },
  {
    id: "bookstore",
    discipline: "Object-oriented software · Java / Swing",
    title: "Bookstore Management System",
    status: ["EVIDENCE PENDING"],
    diagram: ["Owner + customer flows", "UI · account · transaction", "Shared state + local files"],
    ideas: [
      "Separate interface, account state, and transaction behavior.",
      "Model Silver/Gold loyalty changes with the State pattern.",
      "Share bookstore state through a Singleton; persist books and customers locally.",
    ],
    caption:
      "Owner-reported desktop application architecture, with purchasing and loyalty behavior across both user paths.",
    takeaway:
      "Design patterns helped turn changing customer behavior and shared data into explicit responsibilities.",
    tags: ["Java", "Swing", "State + Singleton"],
  },
  {
    id: "alu",
    discipline: "Digital logic · Quartus / HDL",
    title: "8-bit ALU + finite-state controller",
    status: ["SOURCE VERIFIED · LAB 6 SNAPSHOT"],
    diagram: ["DATA · A/B operands → ALU → hex output", "CONTROL · clocked FSM → operation select"],
    ideas: [
      "Combine combinational arithmetic/logic with a sequential controller.",
      "Advance or hold FSM state on clock edges; keep reset behavior distinct from the datapath.",
      "Route result/status signals to hexadecimal display logic.",
    ],
    caption:
      "The BDF exposes an active-low-labeled reset pin (Resetn); the FSM module resets high, so integrated reset polarity remains unresolved. Waveforms were used in the reported validation workflow; available files show setup, not a verified passing trace.",
    takeaway:
      "Separating data and control paths made the boundary between operation selection and computation easier to reason about.",
    tags: ["HDL", "Quartus", "FSM + datapath"],
  },
  {
    id: "cmos",
    discipline: "Analog design · KiCad / SPICE",
    title: "Four-stage CMOS amplifier",
    status: ["EVIDENCE PENDING"],
    diagram: ["Distributed gain", "Bias + device sizing", "Source-follower buffer → load"],
    ideas: [
      "Distribute gain across stages on a 3.3 V supply.",
      "Balance bias current and transistor sizing against headroom and power.",
      "Use a source-follower buffer to drive the load and preserve signal swing.",
    ],
    caption:
      "Owner-reported KiCad/SPICE work used DC, AC, and transient analysis to examine gain, power, and output-swing tradeoffs. Exact topology and final values remain unverified.",
    takeaway:
      "A load changes the design problem: the output stage must drive it without giving away too much swing or gain.",
    tags: ["KiCad / SPICE", "Bias + sizing", "DC · AC · transient"],
  },
];

function ConceptFigure({
  briefId,
  steps,
}: {
  briefId: string;
  steps: string[];
}) {
  return (
    <figure className={`education-projects__figure education-projects__figure--${briefId}`}>
      <figcaption className="education-projects__figure-label">Engineering concept flow</figcaption>
      <ol className="education-projects__flow" aria-label="Engineering concept flow">
        {steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
    </figure>
  );
}

export default function EducationProjects() {
  return (
    <Client pageClass="main--detail main--education-projects">
      <article className="education-projects education-projects--capability-briefs" aria-labelledby="education-projects-title">
        <Link className="education-projects__back" to="/education">
          Education
        </Link>

        <header className="education-projects__heading">
          <p className="education-projects__eyebrow">TORONTO METROPOLITAN UNIVERSITY</p>
          <h1 id="education-projects-title">Computer Engineering</h1>
          <p className="education-projects__program">Software Specialization · B.Eng.</p>
          <p className="education-projects__expected">Expected 2028</p>
        </header>

        <section className="education-projects__list" aria-label="Selected capability briefs">
          <h2 className="education-projects__section-title">Selected capability briefs</h2>
          <div className="education-projects__grid">
            {capabilityBriefs.map((brief) => (
              <article className={`education-projects__brief education-projects__brief--${brief.id}`} key={brief.id}>
                <header className="education-projects__brief-heading">
                  <p className="education-projects__kind">{brief.discipline}</p>
                  <h3>{brief.title}</h3>
                  <ul className="education-projects__status-list" aria-label={`${brief.title} status`}>
                    {brief.status.map((label) => <li key={label}>{label}</li>)}
                  </ul>
                </header>

                <ConceptFigure briefId={brief.id} steps={brief.diagram} />

                <ul className="education-projects__ideas" aria-label="Engineering ideas">
                  {brief.ideas.map((idea) => <li key={idea}>{idea}</li>)}
                </ul>

                <p className="education-projects__caption">{brief.caption}</p>

                <div className="education-projects__takeaway">
                  <span>Takeaway</span>
                  <p>{brief.takeaway}</p>
                </div>

                <ul className="education-projects__tags" aria-label="Methods and tools">
                  {brief.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </article>
    </Client>
  );
}
