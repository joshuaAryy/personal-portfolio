import { Link } from "react-router-dom";
import { Client } from "./PortfolioLayout";

const academicProjects = [
  {
    title: "Dental Clinic DBMS",
    status: ["CURRENT · IN PROGRESS", "EVIDENCE PENDING"],
  },
  { title: "Java Swing Bookstore", status: ["EVIDENCE PENDING"] },
  { title: "Quartus/VHDL 8-bit ALU and nine-state FSM lab project" },
  { title: "Four-stage CMOS amplifier", status: ["EVIDENCE PENDING"] },
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
          <h2 id="education-projects__technical-title">ALU and FSM source notes</h2>
          <div className="education-projects__technical-grid">
            <div className="education-projects__component">
              <h3>ALU</h3>
              <p>
                The source uses 8-bit unsigned inputs and clocked arithmetic and logic operations.
                For subtraction, the result magnitude and <code>Neg</code> sign flag are separate;
                the 8-bit result is split across two 4-bit outputs.
              </p>
            </div>
            <div className="education-projects__component">
              <h3>FSM</h3>
              <p>
                A nine-state Moore machine advances on a rising clock edge when <code>data_in</code>{" "}
                is high and holds its state when low. An active-high <code>reset</code> returns it
                to state s1.
              </p>
            </div>
          </div>
          <p className="education-projects__source-note">
            The configured project top-level is <code>modified_dec3to8</code>, a decoder. These
            notes describe the ALU and FSM as separate source components.
          </p>
        </section>
      </article>
    </Client>
  );
}
