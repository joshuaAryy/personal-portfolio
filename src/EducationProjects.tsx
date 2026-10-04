import { Link } from "react-router-dom";
import { Client } from "./PortfolioLayout";

const academicProjects = [
  {
    title: "Dental Clinic DBMS",
    status: ["CURRENT · IN PROGRESS", "EVIDENCE PENDING"],
  },
  { title: "Bookstore Management System", status: ["EVIDENCE PENDING"] },
  { title: "Quartus/VHDL 8-bit ALU and nine-state FSM lab project" },
  { title: "Four-stage CMOS amplifier", status: ["EVIDENCE PENDING"] },
];

const aluOperations = [
  "Shift A right by two with 1-fill",
  "(A - B) + 4",
  "Maximum of A and B",
  "Concatenate B's low nibble with A's high nibble",
  "Increment A",
  "Bitwise AND",
  "Invert A's high nibble",
  "Rotate B left by three",
  "Zero result",
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
        </header>
        <section className="education-projects__list" aria-label="Academic projects">
          {academicProjects.map(({ title, status }) => (
            <article className="education-projects__item" key={title}>
              <h2>{title}</h2>
              {status?.map((label) => (
                <p className="education-projects__status" key={label}>
                  {label}
                </p>
              ))}
            </article>
          ))}
        </section>
        <section
          className="education-projects__technical"
          aria-labelledby="education-projects__technical-title"
        >
          <p className="education-projects__eyebrow">QUARTUS II · CYCLONE II · LAB 6 · PART 2</p>
          <h2 id="education-projects__technical-title">An opcode-driven ALU and controller</h2>
          <figure className="education-system-map" aria-label="Lab 6 part 2 system map">
            <div className="education-system-map__stage education-system-map__sources">
              <div className="education-system-map__node">
                <span>DATA PATH</span>
                <strong>A and B · 8-bit inputs</strong>
                <p>Two latch1 input registers</p>
              </div>
              <div className="education-system-map__node">
                <span>CONTROL PATH</span>
                <strong>Nine-state Moore FSM</strong>
                <p>Current state passes through a one-hot opcode decoder</p>
              </div>
            </div>
            <span className="education-system-map__arrow" aria-hidden="true">→</span>
            <div className="education-system-map__stage education-system-map__core">
              <div className="education-system-map__node">
                <span>PROCESS</span>
                <strong>Clocked 8-bit ALU</strong>
                <p>Latched operands + 16-bit opcode</p>
              </div>
            </div>
            <span className="education-system-map__arrow" aria-hidden="true">→</span>
            <div className="education-system-map__stage education-system-map__outputs">
              <div className="education-system-map__node">
                <span>DISPLAY PATH</span>
                <strong>R1 and R2 · 4-bit nibbles</strong>
                <p>Sent to seven-segment decoders</p>
              </div>
            </div>
            <figcaption>
              Source-derived from the configured Lab 6 part 2 block diagram; the separate
              identifier-display branch is omitted.
            </figcaption>
          </figure>
          <div className="education-projects__technical-grid">
            <section className="education-projects__component" aria-labelledby="education-alu-operations">
              <h3 id="education-alu-operations">Nine opcode branches</h3>
              <ul className="education-projects__operation-list">
                {aluOperations.map((operation) => <li key={operation}>{operation}</li>)}
              </ul>
            </section>
            <section className="education-projects__component" aria-labelledby="education-fsm-behavior">
              <h3 id="education-fsm-behavior">State progression</h3>
              <p>
                When <code>data_in</code> is high on a rising clock edge, the FSM advances; when
                low, it holds. The sequence wraps from state s9 to s1, and the component's reset
                input returns it to s1. Its four-bit state feeds a decoder that generates the ALU's
                one-hot operation input.
              </p>
            </section>
          </div>
          <p className="education-projects__source-note">
            This page describes the selected Quartus source snapshot; it does not claim a hardware
            demonstration. In this version, the ALU assigns its declared <code>Neg</code> output low
            on each rising edge and no opcode branch raises it, so no signed-result behavior is
            claimed.
          </p>
        </section>
      </article>
    </Client>
  );
}
