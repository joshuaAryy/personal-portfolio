import { Link } from "react-router-dom";
import { Client } from "./PortfolioLayout";

const capabilityAreas = [
  {
    number: "01",
    kind: "Database design · Current project",
    title: "Dental Clinic DBMS",
    status: ["CURRENT · IN PROGRESS", "EVIDENCE PENDING"],
    summary:
      "I’m developing a clinic database in Oracle, translating connected care and operations into a relational model. My reported assignment work centers on appointment relationships; the wider course project is still underway.",
    details:
      "The work brings ER modeling into SQL: mapping entities and relationships, then applying keys, constraints, and referential integrity. Queries, joins, and views make it possible to ask useful questions across the schema.",
    learning:
      "I’m learning to preserve real workflow relationships in a schema and to keep current implementation distinct from planned scope.",
    tools: ["Oracle SQL", "ER → relational schema", "Queries & joins"],
  },
  {
    number: "02",
    kind: "Object-oriented software",
    title: "Bookstore Management System",
    status: ["EVIDENCE PENDING"],
    summary:
      "I built a Java/Swing desktop bookstore around owner and customer workflows, with purchasing, loyalty behavior, and local persistence.",
    details:
      "The architecture separates interface, shared application data, and business behavior. A State pattern models Silver and Gold customer status; a Singleton provides shared bookstore state.",
    learning:
      "I applied OOP concepts to a stateful application, where clear responsibility boundaries make behavior easier to extend.",
    tools: ["Java", "Swing", "State & Singleton patterns"],
  },
  {
    number: "03",
    kind: "Digital logic · Quartus lab",
    title: "8-bit ALU + finite-state controller",
    status: [],
    summary:
      "I designed an 8-bit datapath and a clocked FSM that sequences its control, using HDL in Quartus.",
    details:
      "The design brings combinational operations together with sequential state: the controller advances or holds, the project diagram exposes an active-low reset input, and result outputs feed hexadecimal displays. A status output is present in the module interface.",
    learning:
      "Waveform simulation was part of reasoning through state transitions and the boundary between control logic and datapath behavior.",
    tools: ["HDL", "Quartus", "FSM & datapath"],
  },
  {
    number: "04",
    kind: "Analog circuit design · Simulation",
    title: "Four-stage CMOS amplifier",
    status: ["EVIDENCE PENDING"],
    summary:
      "I designed and simulated a four-stage CMOS amplifier around a 3.3 V supply, using gain stages and a source-follower output buffer.",
    details:
      "Biasing, current, and transistor sizing shape the balance among gain, power, headroom, and output swing. The buffer helps drive a load while preserving usable signal range.",
    learning:
      "KiCad/SPICE DC operating-point, AC, and transient analysis connected hand calculations to circuit behavior across operating conditions.",
    tools: ["KiCad / SPICE", "Bias & sizing", "DC · AC · transient"],
  },
];

export default function EducationProjects() {
  return (
    <Client pageClass="main--detail main--education-projects">
      <article className="education-projects" aria-labelledby="education-projects-title">
        <Link className="education-projects__back" to="/education">
          Education
        </Link>
        <header className="education-projects__heading">
          <p className="education-projects__eyebrow">TORONTO METROPOLITAN UNIVERSITY</p>
          <h1 id="education-projects-title">Computer Engineering</h1>
          <p className="education-projects__program">Software Specialization · B.Eng.</p>
          <p className="education-projects__expected">Expected 2028</p>
          <p className="education-projects__intro">
            Selected projects across databases, object-oriented software, digital logic, and analog
            design—each a different way to turn engineering concepts into a working system.
          </p>
        </header>

        <section className="education-projects__list" aria-label="Selected capability briefs">
          {capabilityAreas.map((area) => (
            <article className="education-projects__item" key={area.number}>
              <div className="education-projects__item-topline">
                <span className="education-projects__number" aria-hidden="true">{area.number}</span>
                <span className="education-projects__kind">{area.kind}</span>
              </div>
              <h2>{area.title}</h2>
              {area.status.length > 0 && (
                <ul className="education-projects__status-list" aria-label="Project status">
                  {area.status.map((label) => (
                    <li className="education-projects__status" key={label}>{label}</li>
                  ))}
                </ul>
              )}
              <p className="education-projects__summary">{area.summary}</p>
              <p className="education-projects__detail">{area.details}</p>
              <div className="education-projects__learning">
                <span>What I learned</span>
                <p>{area.learning}</p>
              </div>
              <ul className="education-projects__tools" aria-label="Methods and tools">
                {area.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </article>
          ))}
        </section>
      </article>
    </Client>
  );
}
