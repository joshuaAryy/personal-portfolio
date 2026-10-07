import { Link } from "react-router-dom";
import { Client } from "./PortfolioLayout";
import "./education-projects.css";

type CapabilityBrief = {
  id: "dental" | "bookstore" | "alu" | "cmos";
  discipline: string;
  title: string;
  status: string[];
  summary: string;
  focus: string;
  boundary?: string;
};

const capabilityBriefs: CapabilityBrief[] = [
  {
    id: "dental",
    discipline: "DATABASE DESIGN · ORACLE SQL",
    title: "Dental Clinic DBMS",
    status: ["CURRENT · IN PROGRESS", "OWNER-REPORTED · EVIDENCE PENDING"],
    summary: "Current CPS510 work is developing a relational database for clinic workflows.",
    focus: "Capability focus: ER-to-relational modeling, keys and integrity constraints, and SQL queries across connected records.",
    boundary: "The broader clinic scope remains planned; no completed schema or query implementation is asserted.",
  },
  {
    id: "bookstore",
    discipline: "OBJECT-ORIENTED SOFTWARE · JAVA / SWING",
    title: "Bookstore Management System",
    status: ["OWNER-REPORTED · EVIDENCE PENDING"],
    summary: "Owner-reported Java/Swing desktop bookstore with owner and customer paths.",
    focus: "Capability focus: separate UI and transaction responsibilities, State-pattern loyalty behavior, shared Singleton state, and local file persistence.",
    boundary: "No source or authentic interface was reviewed; course attribution is omitted.",
  },
  {
    id: "alu",
    discipline: "DIGITAL LOGIC · QUARTUS / VHDL",
    title: "8-bit ALU + nine-state FSM",
    status: ["SOURCE VERIFIED · LAB 6 PART 2"],
    summary: "A clocked digital system separates the data path from FSM-driven operation selection.",
    focus: "Capability focus: connect sequential control, an 8-bit datapath, and hexadecimal display inputs.",
    boundary: "The selected BDF pin is named Resetn while the FSM module resets high, so system reset polarity is unresolved. Waveform files show setup, not a verified passing trace; no hardware demonstration is claimed.",
  },
  {
    id: "cmos",
    discipline: "ANALOG DESIGN · KICAD / SPICE",
    title: "Four-stage CMOS amplifier",
    status: ["OWNER-REPORTED · EVIDENCE PENDING"],
    summary: "Owner-reported KiCad/SPICE study of a four-stage CMOS amplifier.",
    focus: "Capability focus: reason about gain, bias/current, buffering, load, and output headroom through DC, AC, and transient analysis.",
    boundary: "No schematic, netlist, or result plot was found; exact topology, values, and results remain unverified.",
  },
];

const domains = [
  { label: "DATA", detail: "Relational modeling" },
  { label: "SOFTWARE", detail: "Java / Swing design" },
  { label: "DIGITAL", detail: "ALU + FSM" },
  { label: "ANALOG", detail: "CMOS tradeoffs" },
];

function AluSourceMap() {
  return (
    <figure className="education-projects__alu-map" aria-labelledby="education-alu-map-title">
      <header className="education-projects__figure-heading">
        <div>
          <p className="education-projects__figure-label">LAB 6 · PART 2 SOURCE MAP</p>
          <h4 id="education-alu-map-title">Data and control meet at the ALU</h4>
        </div>
        <p>Traced from the configured block diagram.</p>
      </header>

      <div className="education-projects__map-lanes">
        <section className="education-projects__map-lane" aria-label="ALU data path">
          <h5>DATA PATH</h5>
          <ol className="education-projects__map-flow">
            <li><span>INPUTS</span><strong>Two 8-bit inputs</strong><small>A[7:0] + B[7:0]</small></li>
            <li><span>CAPTURE</span><strong>Input latches</strong></li>
            <li className="education-projects__map-core"><span>COMPUTE</span><strong>ALU</strong></li>
            <li><span>RESULT</span><strong>R1 / R2 · two 4-bit outputs</strong></li>
            <li><span>DISPLAY</span><strong>Seven-segment inputs</strong></li>
          </ol>
        </section>

        <section className="education-projects__map-lane education-projects__map-lane--control" aria-label="ALU control path">
          <h5>CONTROL PATH</h5>
          <ol className="education-projects__map-flow">
            <li><span>SEQUENCE</span><strong>Nine-state FSM</strong></li>
            <li><span>DECODE</span><strong>State decoder</strong></li>
            <li className="education-projects__map-feed"><span>SELECT</span><strong>OP[15..0] feeds the ALU operation input</strong></li>
          </ol>
        </section>
      </div>

      <figcaption>
        The part 2 BDF connects the two input latches to the ALU, the FSM through a state decoder to OP[15..0], and the ALU result nibbles to display inputs.
      </figcaption>
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

        <section className="education-projects__overview" aria-label="Four engineering domains">
          <h2>Four engineering domains</h2>
          <ul>
            {domains.map((domain) => (
              <li key={domain.label}>
                <span>{domain.label}</span>
                <strong>{domain.detail}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="education-projects__list" aria-label="Selected work">
          <h2 className="education-projects__section-title">Selected work</h2>
          <div className="education-projects__briefs">
            {capabilityBriefs.map((brief) => (
              <article className={`education-projects__brief education-projects__brief--${brief.id}`} key={brief.id}>
                <header className="education-projects__brief-heading">
                  <p className="education-projects__kind">{brief.discipline}</p>
                  <h3>{brief.title}</h3>
                  <ul className="education-projects__status-list" aria-label={`${brief.title} evidence status`}>
                    {brief.status.map((label) => <li key={label}>{label}</li>)}
                  </ul>
                </header>

                <div className="education-projects__brief-copy">
                  <p className="education-projects__summary">{brief.summary}</p>
                  <p className="education-projects__focus">{brief.focus}</p>
                  {brief.id !== "alu" && brief.boundary && (
                    <p className="education-projects__boundary">{brief.boundary}</p>
                  )}
                </div>
                {brief.id === "alu" && <AluSourceMap />}
                {brief.id === "alu" && brief.boundary && (
                  <p className="education-projects__boundary education-projects__boundary--alu">{brief.boundary}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      </article>
    </Client>
  );
}
