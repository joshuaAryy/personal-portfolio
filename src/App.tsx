import { useEffect, useRef, useState } from "react";
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
import ChoViegoCase from "./ChoViegoCase";
import StushPattiesCase from "./StushPattiesCase";
import FraymakersCase from "./FraymakersCase";
import LivingInSilicoCase from "./LivingInSilicoCase";
import JourneyCase from "./JourneyCase";
import FoodTrackerPage from "./project-pages/FoodTrackerPage";
import CrestPage from "./project-pages/CrestPage";
import { Help } from "./Help";
import { NotFoundContent } from "./NotFoundContent";
import { ResumeFound, ResumeViewer } from "./ResumeFlow";
import JMark from "./identity/JMark";
import Opening from "./Opening";
import ProfileNav from "./ProfileNav";
import ProfileOverview from "./ProfileOverview";

const railProjectOrder = ["food-tracker", "choveigo", "crest", "fraymakers"] as const;
const railProjects = railProjectOrder.map(
  (slug) => projects.find((project) => project.slug === slug)!,
);
const projectCasePaths: Record<string, string> = {
  fraymakers: "/projects/fraymakers",
  "food-tracker": "/projects/food-tracker",
  choveigo: "/projects/choveigo",
  crest: "/projects/crest",
};
const experienceStoryPaths: Record<string, string> = {
  "living-in-silico": "/experience/living-in-silico",
  "stush-patties": "/experience/stush-patties",
};

function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={"mark" + (small ? " mark--small" : "")} aria-hidden="true">
      <span>◆</span>
    </span>
  );
}

function Header() {
  const { pathname } = useLocation();
  const section =
    pathname === "/help"
      ? null
      : pathname.startsWith("/resume")
        ? "resume"
        : pathname.startsWith("/experience")
          ? "experience"
          : pathname.startsWith("/profile")
            ? "profile"
            : "projects";
  return (
    <header className="header">
      <Link className="brand" to="/projects" aria-label="Portfolio home">
        <JMark variant="ringed" decorative className="brand-glyph" />
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
        <NavLink
          className={section === "resume" ? "current header-resume" : "header-resume"}
          to="/resume"
          state={pathname.startsWith("/resume") ? undefined : { from: pathname }}
        >
          Resume
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `header-help${isActive ? " current" : ""}`
          }
          to="/help"
        >
          Help
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
          <a
            href="https://github.com/joshuaAryy/food-tracker"
            target="_blank"
            rel="noreferrer"
          >
            <Mark small />
            <span>
              Food Tracker<small>VIEW SOURCE REPOSITORY</small>
            </span>
          </a>
        </div>
        <div className="rail-group">
          <h3>PROJECTS (4)</h3>
          {railProjects.map((item) =>
            projectCasePaths[item.slug] ? (
              <Link key={item.slug} to={projectCasePaths[item.slug]}>
                <Mark small />
                <span>
                  {item.name}
                  <small>CASE STUDY</small>
                </span>
              </Link>
            ) : (
              <div className="rail-item" key={item.slug}>
                <Mark small />
                <span>
                  {item.name}
                  <small>CASE STUDY IN DEVELOPMENT</small>
                </span>
              </div>
            ),
          )}
        </div>
        <div className="rail-group">
          <h3>EXPERIENCE (2)</h3>
          {experience.map((item) => {
            const storyPath = experienceStoryPaths[item.slug];
            const content = (
              <>
                <Mark small />
                <span>
                  {item.name}
                  <small>{storyPath ? "EXPERIENCE STORY" : "STORY IN DEVELOPMENT"}</small>
                </span>
              </>
            );
            return storyPath ? (
              <Link key={item.slug} to={storyPath}>
                {content}
              </Link>
            ) : (
              <div className="rail-item" key={item.slug}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
      <Link className="rail-help" to="/help">
        HELP {"\u00b7"} PORTFOLIO GUIDE
      </Link>
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
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, [pathname]);

  return (
    <div className="client">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <div className="client-body">
        <main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className={"main " + pageClass}
        >
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
  indexGlyph,
  selected,
  onClick,
  owner = false,
}: {
  name: string;
  subtitle: string;
  role: string;
  indexGlyph?: string;
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
      <span className={"card-insignia" + (owner ? " card-insignia--owner" : "")}>
        {owner ? (
          <JMark variant="ringed" decorative className="owner-j-mark" />
        ) : indexGlyph ? (
          <span
            className={
              "mark project-index" +
              (indexGlyph.length > 1 ? " project-index--wide" : "")
            }
            aria-hidden="true"
          >
            <span>{indexGlyph}</span>
          </span>
        ) : (
          <Mark />
        )}
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
  const source = isProjects
    ? projects.find((p) => p.slug === selectedProject)?.source
    : undefined;
  const selectedDetailPath = isProjects
    ? projectCasePaths[selectedProject]
    : experienceStoryPaths[selectedExperience];
  return (
    <Client pageClass="main--lobby">
      <div className="lobby-scene">
        <div className="lobby-heading">
          <span className="heading-ornament">✣</span>
          <div>
            <h1>{isProjects ? "PROJECTS · FEATURED" : "EXPERIENCE"}</h1>
            <p>
              {isProjects
                ? "SELECT A PROJECT TO EXPLORE WHAT'S AVAILABLE"
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
                  indexGlyph={p.indexGlyph}
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
                  indexGlyph={p.indexGlyph}
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
            {selectedDetailPath ? (
              <Link className="selected-tray__action" to={selectedDetailPath}>
                {isProjects ? "READ CASE STUDY" : "READ EXPERIENCE STORY"}{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            ) : (
              <p className="selected-tray__status">
                {isProjects
                  ? "CASE STUDY IN DEVELOPMENT"
                  : "FULL EXPERIENCE STORY IN DEVELOPMENT"}
              </p>
            )}
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

const demoOptions = [
  { key: "crest", label: "CREST", image: "/media/crest-sample.png" },
  {
    key: "choveigo",
    label: "CHO’VEIGO",
    image: "/media/choveigo-recommendations.png",
  },
] as const;
function Demos() {
  const [selected, setSelected] =
    useState<(typeof demoOptions)[number]["key"]>("crest");
  const current = demoOptions.find((item) => item.key === selected)!;
  return (
    <Client pageClass="main--demos">
      <ProfileNav />
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
              alt={`${current.label} project demo still`}
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

function ReservedDetailRoute({ kind }: { kind: "project" | "experience" }) {
  const { slug } = useParams();
  const item =
    kind === "project"
      ? projects.find((p) => p.slug === slug)
      : experience.find((e) => e.slug === slug);
  if (!item) return <NotFound />;
  return (
    <Navigate
      to={kind === "project" ? "/projects" : "/experience"}
      replace
    />
  );
}
function NotFound() {
  return (
    <Client pageClass="main--detail main--not-found">
      <NotFoundContent />
    </Client>
  );
}
export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Opening underlay={<Lobby mode="projects" />} />}
      />
      <Route path="/projects" element={<Lobby mode="projects" />} />
      <Route path="/experience" element={<Lobby mode="experience" />} />
      <Route
        path="/profile"
        element={
          <Client pageClass="main--profile">
            <ProfileOverview projects={projects} projectCasePaths={projectCasePaths} />
          </Client>
        }
      />
      <Route
        path="/resume"
        element={
          <Client pageClass="main--detail main--resume-found">
            <ResumeFound />
          </Client>
        }
      />
      <Route
        path="/resume/viewer"
        element={
          <Client pageClass="main--detail main--resume-viewer">
            <ResumeViewer />
          </Client>
        }
      />
      <Route
        path="/help"
        element={
          <Client pageClass="main--detail main--utility">
            <Help />
          </Client>
        }
      />
      <Route
        path="/profile/journey"
        element={
          <Client pageClass="main--detail main--journey">
            <div className="journey-layout">
              <aside className="journey-identity" aria-label="Profile identity">
                <div className="journey-identity__portrait" aria-hidden="true">
                  JA
                </div>
                <div className="journey-identity__copy">
                  <p className="journey-identity__name">JOSHUA ARYEETEY</p>
                  <p>COMPUTER ENGINEERING</p>
                  <p>SOFTWARE · AI / ML</p>
                  <div className="journey-identity__traits" aria-label="Creative, proactive, execution">
                    <span aria-hidden="true">✧</span>
                    <span aria-hidden="true">➤</span>
                    <span aria-hidden="true">◇</span>
                  </div>
                </div>
              </aside>
              <div className="journey-content">
                <ProfileNav />
                <JourneyCase />
              </div>
            </div>
          </Client>
        }
      />
      <Route path="/profile/demos" element={<Demos />} />
      <Route
        path="/projects/food-tracker"
        element={<FoodTrackerPage Client={Client} />}
      />
      <Route
        path="/projects/crest"
        element={<CrestPage Client={Client} />}
      />
      <Route
        path="/projects/fraymakers"
        element={
          <Client pageClass="main--detail main--fraymakers-case">
            <FraymakersCase />
          </Client>
        }
      />
      <Route
        path="/projects/choveigo"
        element={
          <Client pageClass="main--detail main--choveigo-case">
            <ChoViegoCase />
          </Client>
        }
      />
      <Route
        path="/projects/:slug"
        element={<ReservedDetailRoute kind="project" />}
      />
      <Route
        path="/experience/living-in-silico"
        element={
          <Client pageClass="main--detail main--living-case">
            <LivingInSilicoCase />
          </Client>
        }
      />
      <Route
        path="/experience/stush-patties"
        element={
          <Client pageClass="main--detail main--stush-case">
            <StushPattiesCase />
          </Client>
        }
      />
      <Route
        path="/experience/:slug"
        element={<ReservedDetailRoute kind="experience" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
