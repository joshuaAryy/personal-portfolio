import { Link } from "react-router-dom";
import { Client } from "./PortfolioLayout";
import "./education-projects.css";

const ownerReportedProjects = [
  {
    kind: "DATABASES · CPS510",
    title: "Dental Clinic DBMS",
    status: ["CURRENT · IN PROGRESS", "EVIDENCE PENDING"],
    summary:
      "Owner-reported CPS510 work focuses on relational modeling, SQL queries, and integrity rules for a developing Oracle clinic database. Broader scope and implemented schema remain unverified in local project files.",
  },
  {
    kind: "OBJECT-ORIENTED SOFTWARE",
    title: "Bookstore Management System",
    status: ["EVIDENCE PENDING"],
    summary:
      "Owner-reported Java/Swing desktop work spans owner and customer workflows, purchasing, local persistence, shared application state, and State/Singleton patterns for customer status.",
  },
  {
    kind: "ANALOG DESIGN · KICAD / SPICE",
    title: "Four-stage CMOS amplifier",
    status: ["EVIDENCE PENDING"],
    summary:
      "Owner-reported four-stage MOSFET/CMOS amplifier study in KiCad/SPICE, balancing gain distribution, bias/current, load buffering, and headroom. Exact topology and simulation values await artifact review.",
  },
];

function EducationOwnerBrief({
  kind,
  title,
  status,
  summary,
}: (typeof ownerReportedProjects)[number]) {
  return (
    <article className="education-projects__item education-projects__item--owner">
      <div className="education-projects__brief-heading">
        <p className="education-projects__kind">{kind}</p>
        <h3>{title}</h3>
        <ul className="education-projects__status-list" aria-label={`${title} status`}>
          <li className="education-projects__source-status">OWNER-REPORTED</li>
          {status.map((label) => (
            <li className="education-projects__status" key={label}>{label}</li>
          ))}
        </ul>
      </div>
      <p className="education-projects__summary">{summary}</p>
    </article>
  );
}

function AluSystemMap() {
  return (
    <figure className="education-projects__system-map" aria-labelledby="alu-system-map-title">
      <div className="education-projects__map-heading">
        <div>
          <p className="education-projects__kind">SOURCE-DERIVED SYSTEM MAP</p>
          <h3 id="alu-system-map-title">Two paths select and feed one datapath</h3>
        </div>
        <span>Lab 6 · part 2 snapshot</span>
      </div>

      <div className="education-projects__flow-lanes">
        <div className="education-projects__flow-lane" role="group" aria-label="ALU data path">
          <p className="education-projects__lane-label">DATA</p>
          <div className="education-projects__flow-stage">
            <span>OPERANDS</span>
            <strong>A + B</strong>
            <small>8 bits each</small>
          </div>
          <span className="education-projects__flow-arrow" aria-hidden="true">→</span>
          <div className="education-projects__flow-stage">
            <span>CAPTURE</span>
            <strong>Two input latches</strong>
            <small>one per operand</small>
          </div>
          <span className="education-projects__flow-arrow" aria-hidden="true">→</span>
          <div className="education-projects__flow-stage education-projects__flow-stage--endpoint">
            <span>DATA INPUT</span>
            <strong>ALU A / B ports</strong>
          </div>
        </div>

        <div className="education-projects__flow-lane education-projects__flow-lane--control" role="group" aria-label="ALU control path">
          <p className="education-projects__lane-label">CONTROL</p>
          <div className="education-projects__flow-stage">
            <span>SEQUENCE</span>
            <strong>9-state Moore FSM</strong>
            <small>rising edge · data high advances; low holds</small>
          </div>
          <span className="education-projects__flow-arrow" aria-hidden="true">→</span>
          <div className="education-projects__flow-stage">
            <span>STATE</span>
            <strong>4-bit state code</strong>
          </div>
          <span className="education-projects__flow-arrow" aria-hidden="true">→</span>
          <div className="education-projects__flow-stage">
            <span>DECODE</span>
            <strong>modified_dec3to8</strong>
            <small>9 one-hot operation lines</small>
          </div>
          <span className="education-projects__flow-arrow" aria-hidden="true">→</span>
          <div className="education-projects__flow-stage education-projects__flow-stage--endpoint">
            <span>CONTROL INPUT</span>
            <strong>ALU OP port</strong>
          </div>
        </div>
      </div>

      <p className="education-projects__merge-note">Separate data and control inputs meet at the same clocked unit</p>

      <div className="education-projects__result-path" role="group" aria-label="ALU result and display path">
        <div className="education-projects__alu-block">
          <span>CLOCKED DATAPATH</span>
          <strong>8-bit ALU</strong>
          <small>9 opcode branches · arithmetic, logic, shifts, and nibble operations</small>
        </div>
        <span className="education-projects__flow-arrow" aria-hidden="true">→</span>
        <div className="education-projects__result-split">
          <div className="education-projects__result-branch">
            <strong>R2 [7:4]</strong>
            <span>High result nibble → display</span>
          </div>
          <div className="education-projects__result-branch">
            <strong>R1 [3:0]</strong>
            <span>Low result nibble → display</span>
          </div>
        </div>
      </div>

      <figcaption>
        Source snapshot traced to the Quartus project and HDL.
      </figcaption>
    </figure>
  );
}

function VerifiedAluBrief() {
  return (
    <article className="education-projects__item education-projects__item--alu" aria-labelledby="alu-brief-title">
      <header className="education-projects__alu-heading">
        <div>
          <p className="education-projects__kind">DIGITAL LOGIC · QUARTUS / VHDL</p>
          <h3 id="alu-brief-title">8-bit ALU + finite-state controller</h3>
        </div>
        <span className="education-projects__verified-status">SOURCE-VERIFIED · LAB 6 PART 2 SNAPSHOT</span>
      </header>

      <div className="education-projects__alu-intro">
        <p>
          The selected Quartus snapshot pairs a clocked 8-bit ALU with a nine-state Moore controller. Two latched operands and the controller’s decoded operation travel on separate paths into the same datapath.
        </p>
        <p className="education-projects__contribution">
          <span>MY TECHNICAL CONTRIBUTION · OWNER REPORT</span>
          I worked across the VHDL implementation and top-level integration.
        </p>
      </div>

      <AluSystemMap />

      <div className="education-projects__alu-close">
        <p><strong>Design distinction</strong> — the FSM sequences control; the ALU applies the selected operation; the output logic formats the result for two seven-segment displays.</p>
        <p>The FSM HDL resets high to its first state; the top-level BDF port is named Resetn, so system-level polarity remains unresolved. Waveform files document simulation setup, not a verified passing trace or board demonstration.</p>
      </div>
    </article>
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
          <p className="education-projects__intro">
            Selected work across databases, desktop software, digital systems, and analog design. The briefs distinguish owner-reported scope from source-verified implementation.
          </p>
        </header>

        <section className="education-projects__list" aria-label="Selected capability briefs">
          <div className="education-projects__section-heading">
            <h2>Selected capability briefs</h2>
            <p>Project detail stays proportional to the evidence available.</p>
          </div>
          <div className="education-projects__owner-briefs">
            <EducationOwnerBrief {...ownerReportedProjects[0]} />
            <EducationOwnerBrief {...ownerReportedProjects[1]} />
          </div>

          <VerifiedAluBrief />

          <div className="education-projects__owner-briefs education-projects__owner-briefs--close">
            <EducationOwnerBrief {...ownerReportedProjects[2]} />
          </div>
        </section>
      </article>
    </Client>
  );
}
