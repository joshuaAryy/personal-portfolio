import { useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { experience, projects } from "./data";

function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={"mark" + (small ? " mark--small" : "")} aria-hidden="true">
      <span>◆</span>
    </span>
  );
}

function Header() {
  const { pathname } = useLocation();
  const section = pathname.startsWith("/experience")
    ? "experience"
    : pathname.startsWith("/profile")
      ? "profile"
      : "projects";
  return (
    <header className="header">
      <Link className="brand" to="/projects" aria-label="Portfolio home">
        <span className="brand-glyph" aria-hidden="true">
          ◇
        </span>
        <strong>PORTFOLIO</strong>
      </Link>
      <nav className="top-nav" aria-label="Main navigation">
        <NavLink
          className={section === "projects" ? "current" : ""}
          to="/projects"
        >
          Projects
        </NavLink>
        <NavLink
          className={section === "experience" ? "current" : ""}
          to="/experience"
        >
          Experience
        </NavLink>
        <NavLink
          className={section === "profile" ? "current" : ""}
          to="/profile"
        >
          Profile
        </NavLink>
      </nav>
      <span className="header-name">
        JOSHUA ARYEETEY<small>PORTFOLIO</small>
      </span>
    </header>
  );
}

function Rail() {
  return (
    <aside className="rail" aria-label="Portfolio index">
      <div className="rail-availability">
        <Mark small />
        <span>
          <strong>OPEN TO OPPORTUNITIES</strong>
          <small>Summer 2027 · Toronto / Remote</small>
        </span>
      </div>
      <div className="rail-content">
        <h2>ACTIVITY</h2>
        <p className="rail-context">GENERAL · PORTFOLIO</p>
        <div className="rail-group">
          <h3>CURRENT FOCUS</h3>
          <Link to="/projects/food-tracker">
            <Mark small />
            <span>
              Food Tracker<small>IN DEVELOPMENT</small>
            </span>
          </Link>
        </div>
        <div className="rail-group">
          <h3>PROJECTS (4)</h3>
          {[...projects].reverse().map((item) => (
            <Link key={item.slug} to={"/projects/" + item.slug}>
              <Mark small />
              <span>
                {item.name}
                <small>{item.role}</small>
              </span>
            </Link>
          ))}
        </div>
        <div className="rail-group">
          <h3>EXPERIENCE (2)</h3>
          {experience.map((item) => (
            <Link key={item.slug} to={"/experience/" + item.slug}>
              <Mark small />
              <span>
                {item.name}
                <small>{item.title.toUpperCase()}</small>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Client({
  children,
  pageClass = "",
}: {
  children: React.ReactNode;
  pageClass?: string;
}) {
  return (
    <div className="client">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <div className="client-body">
        <main id="main" className={"main " + pageClass}>
          {children}
        </main>
        <Rail />
      </div>
    </div>
  );
}

function LobbyCard({
  name,
  subtitle,
  role,
  selected,
  onClick,
  owner = false,
}: {
  name: string;
  subtitle: string;
  role: string;
  selected: boolean;
  onClick: () => void;
  owner?: boolean;
}) {
  return (
    <button
      type="button"
      className={"lobby-card" + (selected ? " lobby-card--selected" : "")}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="card-insignia">
        <Mark />
      </span>
      <strong>{name}</strong>
      <span className="card-subtitle">{subtitle}</span>
      <span className="card-role">{role}</span>
      <span className="card-glyphs" aria-hidden="true">
        <i>◇</i>
        <i>✧</i>
      </span>
      {owner && <span className="owner-label">PORTFOLIO OWNER</span>}
    </button>
  );
}

function Lobby({ mode }: { mode: "projects" | "experience" }) {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState("food-tracker");
  const [selectedExperience, setSelectedExperience] =
    useState<(typeof experience)[number]["slug"]>("living-in-silico");
  const isProjects = mode === "projects";
  const selected = isProjects
    ? projects.find((p) => p.slug === selectedProject)!
    : experience.find((e) => e.slug === selectedExperience)!;
  const selectedDescription = isProjects
    ? projects.find((p) => p.slug === selectedProject)!.detail
    : (() => {
        const item = experience.find((e) => e.slug === selectedExperience)!;
        return `${item.title} · ${item.dates}`;
      })();
  const detailPath = isProjects
    ? "/projects/" + selectedProject
    : "/experience/" + selectedExperience;
  const source = isProjects
    ? projects.find((p) => p.slug === selectedProject)?.source
    : undefined;
  return (
    <Client pageClass="main--lobby">
      <div className="lobby-scene">
        <div className="lobby-heading">
          <span className="heading-ornament">✣</span>
          <div>
            <h1>{isProjects ? "PROJECTS · FEATURED" : "EXPERIENCE"}</h1>
            <p>
              {isProjects
                ? "SELECT A PROJECT TO OPEN ITS CASE STUDY"
                : "PROFESSIONAL WORK · RESEARCH · DATA SYSTEMS"}
            </p>
          </div>
        </div>
        <div
          className={
            "lobby-cards " + (isProjects ? "" : "lobby-cards--experience")
          }
        >
          {isProjects ? (
            <>
              {projects.slice(0, 2).map((p) => (
                <LobbyCard
                  key={p.slug}
                  name={p.name}
                  subtitle={p.short}
                  role={p.role}
                  selected={selectedProject === p.slug}
                  onClick={() => setSelectedProject(p.slug)}
                />
              ))}
              <LobbyCard
                name="Joshua Aryeetey"
                subtitle="Computer Engineering · Software"
                role="PORTFOLIO OWNER"
                selected={false}
                owner
                onClick={() => navigate("/profile")}
              />
              {projects.slice(2).map((p) => (
                <LobbyCard
                  key={p.slug}
                  name={p.name}
                  subtitle={p.short}
                  role={p.role}
                  selected={selectedProject === p.slug}
                  onClick={() => setSelectedProject(p.slug)}
                />
              ))}
            </>
          ) : (
            <>
              <span className="lobby-plus" aria-hidden="true">
                +
              </span>
              <LobbyCard
                name={experience[0].name}
                subtitle={`${experience[0].title} · ${experience[0].dates}`}
                role={experience[0].role}
                selected={selectedExperience === experience[0].slug}
                onClick={() => setSelectedExperience(experience[0].slug)}
              />
              <LobbyCard
                name="Joshua Aryeetey"
                subtitle="Computer Engineering · Software"
                role="PORTFOLIO OWNER"
                selected={false}
                owner
                onClick={() => navigate("/profile")}
              />
              <LobbyCard
                name={experience[1].name}
                subtitle={`${experience[1].title} · ${experience[1].dates}`}
                role={experience[1].role}
                selected={selectedExperience === experience[1].slug}
                onClick={() => setSelectedExperience(experience[1].slug)}
              />
              <span className="lobby-plus" aria-hidden="true">
                +
              </span>
            </>
          )}
        </div>
        <div className="lobby-bottom">
          <div className="role-legend">
            <strong>{isProjects ? "PROJECT ROLES" : "EXPERIENCE ROLES"}</strong>
            <span>
              ◇<small>SOFTWARE</small>
            </span>
            <span>
              ✧<small>AI</small>
            </span>
            <span>
              ▤<small>DATA</small>
            </span>
            <span>
              ⌕<small>RESEARCH</small>
            </span>
          </div>
          <div className="selected-tray">
            <h2>{selected.name.toUpperCase()}</h2>
            <p>{selectedDescription}</p>
            <Link to={detailPath}>
              {isProjects ? "OPEN CASE STUDY" : "VIEW EXPERIENCE"}{" "}
              <span aria-hidden="true">↗</span>
            </Link>
            <div className="selected-tray__foot">
              SELECTED {isProjects ? "PROJECT" : "EXPERIENCE"}{" "}
              <strong>{selected.name.toUpperCase()}</strong>
            </div>
          </div>
          {source && (
            <a
              className="view-source"
              href={source}
              target="_blank"
              rel="noreferrer"
            >
              VIEW PROJECT <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </Client>
  );
}

function ProfileNav({ active }: { active: "overview" | "demos" }) {
  return (
    <nav className="profile-nav" aria-label="Profile sections">
      <NavLink
        end
        className={active === "overview" ? "active" : ""}
        to="/profile"
      >
        Overview
      </NavLink>
      <span aria-disabled="true" title="In design">
        Journey
      </span>
      <span aria-disabled="true" title="Awaiting owner photos">
        Personal Highlights
      </span>
      <NavLink
        className={active === "demos" ? "active" : ""}
        to="/profile/demos"
      >
        Demos
      </NavLink>
    </nav>
  );
}

function ProfileOverview() {
  return (
    <Client pageClass="main--profile">
      <div className="profile-layout">
        <aside className="identity-panel">
          <div className="portrait-fallback" aria-label="Portrait deferred">
            JA
          </div>
          <h1>JOSHUA ARYEETEY</h1>
          <p>COMPUTER ENGINEERING</p>
          <p>SOFTWARE · AI / ML</p>
          <div className="identity-traits">
            <span>
              ✧<small>CREATIVE</small>
            </span>
            <span>
              ➤<small>PROACTIVE</small>
            </span>
            <span>
              ◇<small>EXECUTION</small>
            </span>
          </div>
        </aside>
        <div className="profile-content">
          <ProfileNav active="overview" />
          <section
            className="profile-projects"
            aria-labelledby="profile-projects-heading"
          >
            <h2 id="profile-projects-heading">PROJECTS</h2>
            <div className="profile-project-grid">
              {[projects[2], projects[3], projects[1], projects[0]].map((p) => (
                <Link to={"/projects/" + p.slug} key={p.slug}>
                  <strong>{p.name}</strong>
                  <span>{p.detail}</span>
                </Link>
              ))}
            </div>
          </section>
          <section className="profile-signals" aria-label="Portfolio facts">
            <div>
              <strong>PROJECTS</strong>
              <span>4</span>
            </div>
            <div>
              <strong>EXPERIENCE</strong>
              <span>2</span>
            </div>
            <div>
              <strong>HACKATHON</strong>
              <span>1</span>
            </div>
            <div>
              <strong>ACADEMICS</strong>
              <span>2028</span>
            </div>
          </section>
        </div>
      </div>
    </Client>
  );
}

const demoOptions = [
  { key: "food", label: "FOOD TRACKER", image: "/media/food-tracker-mark.png" },
  { key: "crest", label: "CREST", image: "/media/crest-sample.png" },
  {
    key: "choveigo",
    label: "CHO’VEIGO",
    image: "/media/choveigo-recommendations.png",
  },
] as const;
function Demos() {
  const [selected, setSelected] =
    useState<(typeof demoOptions)[number]["key"]>("food");
  const current = demoOptions.find((item) => item.key === selected)!;
  return (
    <Client pageClass="main--demos">
      <ProfileNav active="demos" />
      <div className="demos-layout">
        <div className="demo-selector" aria-label="Demos">
          {demoOptions.map((item) => (
            <button
              key={item.key}
              className={selected === item.key ? "selected" : ""}
              onClick={() => setSelected(item.key)}
              aria-pressed={selected === item.key}
            >
              <img className="demo-thumb" src={item.image} alt="" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="recording-rail" aria-hidden="true">
          {demoOptions.map((item) => (
            <i
              key={item.key}
              className={selected === item.key ? "selected" : ""}
            />
          ))}
        </div>
        <div className="demo-stage">
          <div className={"demo-player demo-player--" + selected}>
            <img
              src={current.image}
              alt={
                selected === "food"
                  ? "Food Tracker project mark"
                  : `${current.label} project demo still`
              }
            />
            {selected === "crest" && (
              <>
                <span className="sample-cue">SAMPLE DATA</span>
                <a
                  className="demo-watch"
                  href="https://www.youtube.com/watch?v=kiq6XjNi9J8"
                  target="_blank"
                  rel="noreferrer"
                >
                  WATCH DEMO ↗
                </a>
              </>
            )}
          </div>
          <h1 className="demo-title">
            <span>{current.label}</span>
          </h1>
        </div>
      </div>
    </Client>
  );
}

function DeferredDetail({ kind }: { kind: "project" | "experience" }) {
  const { slug } = useParams();
  const item =
    kind === "project"
      ? projects.find((p) => p.slug === slug)
      : experience.find((e) => e.slug === slug);
  if (!item) return <NotFound />;
  return (
    <Client pageClass="main--detail">
      <div className="detail-back">
        <Link to={kind === "project" ? "/projects" : "/experience"}>
          ← BACK TO {kind === "project" ? "PROJECTS" : "EXPERIENCE"}
        </Link>
      </div>
      <div className="detail-deferred">
        <span className="eyebrow">
          {kind === "project" ? "CASE STUDY" : "EXPERIENCE"}
        </span>
        <h1>{item.name}</h1>
        <p>This story is being prepared for the portfolio.</p>
        <Link to={kind === "project" ? "/projects" : "/experience"}>
          RETURN TO {kind === "project" ? "PROJECTS" : "EXPERIENCE"} →
        </Link>
      </div>
    </Client>
  );
}
function NotFound() {
  return (
    <Client pageClass="main--detail">
      <div className="detail-deferred">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <Link to="/projects">RETURN TO PROJECTS →</Link>
      </div>
    </Client>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" replace />} />
      <Route path="/projects" element={<Lobby mode="projects" />} />
      <Route path="/experience" element={<Lobby mode="experience" />} />
      <Route path="/profile" element={<ProfileOverview />} />
      <Route path="/profile/demos" element={<Demos />} />
      <Route
        path="/projects/:slug"
        element={<DeferredDetail kind="project" />}
      />
      <Route
        path="/experience/:slug"
        element={<DeferredDetail kind="experience" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
