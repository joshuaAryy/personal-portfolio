import { Link } from "react-router-dom";
import { Client } from "./PortfolioLayout";
import "./education-projects.css";

type CapabilityBrief = {
  id: "dental" | "bookstore" | "alu" | "cmos";
  number: string;
  discipline: string;
  title: string;
  status?: string;
  summary: string;
  focus: string;
  takeaway: string;
  tools: string[];
};

const capabilityBriefs: CapabilityBrief[] = [
  {
    id: "dental",
    number: "01",
    discipline: "DATABASES / ORACLE SQL",
    title: "Dental Clinic DBMS",
    status: "CURRENT · IN PROGRESS",
    summary: "A CPS510 project modeling records and relationships across dental-clinic workflows.",
    focus: "ER-to-relational design, keys and integrity, and SQL queries across connected records.",
    takeaway: "Broader clinic workflows are planned as the course project continues.",
    tools: ["Oracle SQL", "ER / relational model", "Keys + integrity"],
  },
  {
    id: "bookstore",
    number: "02",
    discipline: "JAVA / SWING / OBJECT-ORIENTED DESIGN",
    title: "Bookstore Management System",
    summary: "A desktop bookstore with distinct owner and customer workflows.",
    focus: "OOP separates interface, account state, and transactions; state-pattern loyalty behavior, shared manager state, and local file persistence support the two roles.",
    takeaway: "Clear responsibility boundaries make stateful workflows easier to extend.",
    tools: ["Java", "Swing", "State / Singleton patterns"],
  },
  {
    id: "alu",
    number: "03",
    discipline: "DIGITAL LOGIC / QUARTUS / VHDL",
    title: "8-bit ALU + FSM",
    summary: "An 8-bit arithmetic and logic unit with finite-state control for clocked operation selection.",
    focus: "Waveform simulation in Quartus makes sequencing and displayed results inspectable before hardware work.",
    takeaway: "Waveforms help trace clocked control across the datapath.",
    tools: ["Quartus", "HDL", "Finite-state control"],
  },
  {
    id: "cmos",
    number: "04",
    discipline: "ANALOG DESIGN / KICAD SPICE",
    title: "Four-stage CMOS amplifier",
    summary: "A four-stage MOSFET amplifier design study.",
    focus: "Gain distribution, bias/current, and output buffering are weighed against load and headroom through DC, AC, and transient SPICE analysis.",
    takeaway: "Stage choices balance gain with current, load, and output headroom.",
    tools: ["KiCad", "SPICE", "DC / AC / transient"],
  },
];

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
          <p className="education-projects__program">Software Specialization / B.Eng.</p>
          <p className="education-projects__expected">Expected 2028</p>
        </header>

        <section className="education-projects__list" aria-label="Selected engineering projects">
          <h2 className="education-projects__section-title">Selected work</h2>
          <div className="education-projects__briefs education-projects__briefs--cards">
            {capabilityBriefs.map((brief) => (
              <article className={`education-projects__brief education-projects__brief--${brief.id}`} key={brief.id}>
                <header className="education-projects__brief-heading">
                  <div className="education-projects__brief-meta">
                    <span className="education-projects__number" aria-hidden="true">{brief.number}</span>
                    <p className="education-projects__kind">{brief.discipline}</p>
                  </div>
                  <h3>{brief.title}</h3>
                  {brief.status ? <p className="education-projects__status">{brief.status}</p> : null}
                </header>

                <div className="education-projects__brief-copy">
                  <p className="education-projects__summary">{brief.summary}</p>
                  <p className="education-projects__focus">{brief.focus}</p>
                  <p className="education-projects__learning"><span>TAKEAWAY</span>{brief.takeaway}</p>
                  <ul className="education-projects__tools" aria-label={`${brief.title} tools and methods`}>
                    {brief.tools.map((tool) => <li key={tool}>{tool}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </article>
    </Client>
  );
}
