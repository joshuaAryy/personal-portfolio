import { Link } from "react-router-dom";
import { Client } from "./PortfolioLayout";

const academicProjects = [
  { title: "Dental Clinic DBMS", status: "CURRENT · IN PROGRESS" },
  { title: "Java Swing Bookstore" },
  { title: "Custom 8-bit ALU / FSM · Quartus" },
  { title: "CMOS Amplifier" },
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
              {status && <p className="education-projects__status">{status}</p>}
            </article>
          ))}
        </section>
      </article>
    </Client>
  );
}
