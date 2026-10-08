import { Link } from "react-router-dom";
import { Client } from "./PortfolioLayout";
import "./education-projects.css";

type CapabilityBrief = {
  id: "dental" | "bookstore" | "alu" | "cmos";
  discipline: string;
  title: string;
  status?: string;
  summary: string;
  focus: string;
  boundary?: string;
};

const capabilityBriefs: CapabilityBrief[] = [
  {
    id: "dental",
    discipline: "DATABASES / ORACLE SQL",
    title: "Dental Clinic DBMS",
    status: "CURRENT · IN PROGRESS",
    summary: "A CPS510 project modeling records and relationships across dental-clinic workflows.",
    focus: "ER-to-relational design, keys and integrity, and SQL queries across connected records.",
    boundary: "Broader clinic workflows are planned as the course project continues.",
  },
  {
    id: "bookstore",
    discipline: "JAVA / SWING / OBJECT-ORIENTED DESIGN",
    title: "Bookstore Management System",
    summary: "A desktop bookstore with distinct owner and customer workflows.",
    focus: "OOP separates interface, account state, and transactions. State-pattern loyalty behavior, shared manager state, and local file persistence carry behavior and data across sessions.",
  },
  {
    id: "alu",
    discipline: "DIGITAL LOGIC / QUARTUS / VHDL",
    title: "8-bit ALU + FSM",
    summary: "An 8-bit arithmetic and logic unit with finite-state control for clocked operation selection.",
    focus: "Waveform simulation in Quartus makes sequencing and displayed results inspectable before hardware work.",
  },
  {
    id: "cmos",
    discipline: "ANALOG DESIGN / KICAD SPICE",
    title: "Four-stage CMOS amplifier",
    summary: "A four-stage MOSFET amplifier design study.",
    focus: "Gain distribution, bias/current, and output buffering are weighed against load and headroom through DC, AC, and transient SPICE analysis.",
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
          <div className="education-projects__briefs">
            {capabilityBriefs.map((brief) => (
              <article className={`education-projects__brief education-projects__brief--${brief.id}`} key={brief.id}>
                <header className="education-projects__brief-heading">
                  <p className="education-projects__kind">{brief.discipline}</p>
                  <h3>{brief.title}</h3>
                  {brief.status ? <p className="education-projects__status">{brief.status}</p> : null}
                </header>

                <div className="education-projects__brief-copy">
                  <p className="education-projects__summary">{brief.summary}</p>
                  <p className="education-projects__focus">{brief.focus}</p>
                  {brief.boundary ? <p className="education-projects__boundary">{brief.boundary}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </article>
    </Client>
  );
}
