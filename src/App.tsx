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

const railProjectOrder = ["food-tracker", "choveigo", "crest", "fraymakers"] as const;
const railProjects = railProjectOrder.map(
  (slug) => projects.find((project) => project.slug === slug)!,
);

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
            item.slug === "food-tracker" ? (
              <Link key={item.slug} to="/projects/food-tracker">
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
          {experience.map((item) => (
            <div className="rail-item" key={item.slug}>
              <Mark small />
              <span>
                {item.name}
                <small>STORY IN DEVELOPMENT</small>
              </span>
            </div>
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
            {isProjects && selectedProject === "food-tracker" ? (
              <Link className="selected-tray__action" to="/projects/food-tracker">
                READ CASE STUDY <span aria-hidden="true">↗</span>
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

const foodChapters = [
  { id: "overview", label: "OVERVIEW" },
  { id: "search", label: "SEARCH" },
  { id: "iteration", label: "ITERATION" },
  { id: "workflow", label: "WORKFLOW" },
  { id: "reflection", label: "REFLECTION" },
] as const;
type FoodChapterId = (typeof foodChapters)[number]["id"];

const foodBenchmarkSets = [
  {
    name: "DEVELOPMENT · 80 QUERIES",
    legacy: ["40/80", "40/80", "40/80"],
    hybrid: ["71/80", "72/80", "72/80"],
  },
  {
    name: "HOLDOUT · 40 QUERIES",
    legacy: ["25/40", "25/40", "25/40"],
    hybrid: ["27/40", "28/40", "28/40"],
  },
] as const;

function FoodBenchmarkPlate() {
  return (
    <figure className="food-benchmark" aria-labelledby="food-benchmark-title">
      <figcaption id="food-benchmark-title" className="food-benchmark__title">
        OFFLINE RETRIEVAL BENCHMARK
      </figcaption>
      <div className="food-benchmark__splits">
        {foodBenchmarkSets.map((set) => (
          <section className="food-benchmark__split" key={set.name}>
            <h3>{set.name}</h3>
            <table>
              <thead>
                <tr>
                  <th scope="col">RETRIEVER</th>
                  <th scope="col">TOP-1</th>
                  <th scope="col">TOP-3</th>
                  <th scope="col">TOP-5</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">LEGACY</th>
                  {set.legacy.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
                <tr className="food-benchmark__hybrid">
                  <th scope="row">FULL HYBRID</th>
                  {set.hybrid.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </section>
        ))}
      </div>
      <p className="food-benchmark__scale">
        REFERENCE CATALOG · 12,363 active foods · 277,341 nutrient rows · SCALE
        ONLY, NOT PRODUCT IMPACT
      </p>
    </figure>
  );
}

function FoodTrackerCaseStudy() {
  const [activeChapter, setActiveChapter] = useState<FoodChapterId>("overview");

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;

    let frame = 0;
    const updateChapter = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const overflowY = window.getComputedStyle(main).overflowY;
        const mainIsScroller = overflowY === "auto" || overflowY === "scroll";
        const rootTop = mainIsScroller ? main.getBoundingClientRect().top : 0;
        const activationLine = rootTop + 78;
        let nextChapter: FoodChapterId = "overview";

        for (const chapter of foodChapters) {
          const section = document.getElementById(`food-${chapter.id}`);
          if (section && section.getBoundingClientRect().top <= activationLine) {
            nextChapter = chapter.id;
          }
        }
        setActiveChapter(nextChapter);
      });
    };

    main.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("resize", updateChapter);
    updateChapter();

    return () => {
      main.removeEventListener("scroll", updateChapter);
      window.removeEventListener("scroll", updateChapter);
      window.removeEventListener("resize", updateChapter);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Client pageClass="main--detail main--food-case">
      <nav className="food-case-nav" aria-label="Food Tracker case study">
        <div className="food-case-nav__chapters">
          {foodChapters.map((chapter) => (
            <a
              href={`#food-${chapter.id}`}
              aria-current={activeChapter === chapter.id ? "location" : undefined}
              key={chapter.id}
              onClick={() => setActiveChapter(chapter.id)}
            >
              {chapter.label}
            </a>
          ))}
        </div>
        <Link className="food-case-nav__back" to="/projects">
          ‹ PROJECTS
        </Link>
        <span className="food-case-nav__breadcrumb">CASE STUDY / FOOD TRACKER</span>
      </nav>

      <article className="food-story-content">
        <section className="food-section food-hero" id="food-overview">
          <div className="food-hero__opening">
            <p className="food-project-label">
              <strong>FOOD TRACKER</strong>
              <span>FLAGSHIP PROJECT</span>
            </p>
            <h1>Simple tracking,<br />serious insight.</h1>
            <p className="food-hero__intro">
              I started with my own gym nutrition: logging needed to feel quick,
              while search, serving, recommendations, and long-term insight had
              to earn my trust.
            </p>
            <p className="food-hero__principle">
              Simple and Complex are two presentation levels over the same
              backend.
            </p>
          </div>

          <div className="food-system-path">
            <p className="food-eyebrow">A SHORT PATH TO A TRUSTWORTHY LOG</p>
            <h2>Quick to enter. Careful underneath.</h2>
            <ol className="food-system-path__steps">
              {[
                ["INTENT", "AI may interpret"],
                ["SEARCH", "Rank candidates"],
                ["FOOD DATA", "Trusted values"],
                ["SERVING", "Backend resolves"],
                ["LOG + INSIGHT", "History · trends"],
              ].map(([title, detail]) => (
                <li key={title}>
                  <span>{title}</span>
                  <small>{detail}</small>
                </li>
              ))}
            </ol>
            <p className="food-system-path__summary">
              AI can help interpret intent; trusted food data and backend
              serving conversion define nutrition values.
            </p>
            <p className="food-system-path__sources">
              Canadian Nutrient File · Ciqual · CoFID · USDA FoodData Central ·
              Open Food Facts
            </p>
          </div>
        </section>

        <section className="food-section food-search" id="food-search">
          <p className="food-section-label">SEARCH / EVALUATION</p>
          <div className="food-search__grid">
            <div className="food-search__story">
              <h2>Benchmarking changed the architecture.</h2>
              <p>
                I measured retrieval on development and holdout queries before
                deciding where semantic search belonged. The benchmark made
                evaluation the authority.
              </p>
            </div>
            <FoodBenchmarkPlate />
          </div>
          <p className="food-search__decision">
            The path became query → deterministic ranking → fuzzy retrieval →
            semantic candidates → union → deterministic evaluator → final rank.
            Pinecone supplied candidates only. The interview reports semantic
            retrieval added latency for little extra recovery.
          </p>
        </section>

        <section className="food-section food-iteration" id="food-iteration">
          <p className="food-section-label">ITERATION</p>
          <h2>A passing test suite wasn't the same as a useful search.</h2>
          <div className="food-iteration__episodes">
            <article>
              <span className="food-iteration__number">01</span>
              <div>
                <h3>GREEN TESTS, POOR RELEVANCE</h3>
                <p>
                  Automated tests passed while real food search still felt
                  wrong. I judged retrieval against development and holdout
                  queries instead of treating a passing suite as proof of
                  relevance.
                </p>
              </div>
            </article>
            <article>
              <span className="food-iteration__number">02</span>
              <div>
                <h3>INDEX STATE IS PART OF CORRECTNESS</h3>
                <p>
                  A Pinecone pagination issue once left partial or stale index
                  state. In a separate staging run, quota and rate-limit
                  behavior interrupted indexing.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="food-section food-boundaries" id="food-boundaries">
          <p className="food-section-label">ENGINEERING BOUNDARIES</p>
          <h2>Three rules keep the numbers honest.</h2>
          <div className="food-boundaries__rules">
            <article>
              <h3>NUTRITION AUTHORITY</h3>
              <p>
                AI may interpret food intent. Trusted normalized data and
                backend serving resolution determine nutrition values.
              </p>
            </article>
            <article>
              <h3>HISTORICAL INTEGRITY</h3>
              <p>
                A log is canonical. Historical nutrition stays immutable;
                unknown nutrition stays unknown.
              </p>
            </article>
            <article>
              <h3>SEARCH RANKING</h3>
              <p>
                Pinecone is a candidate source, not the final ranker. A
                deterministic evaluator sets the final order.
              </p>
            </article>
          </div>
        </section>

        <section className="food-section food-workflow" id="food-workflow">
          <div className="food-workflow__story">
            <p className="food-section-label">HOW MY WORKFLOW EVOLVED</p>
            <h2>I made implementation more deliberate.</h2>
            <p>
              Later, I gave Codex and AI agents bounded tasks with written
              specs, then set acceptance and regression checks and used
              independent review before integration.
            </p>
            <p>
              I retained product decisions, architecture direction, evaluation,
              debugging direction, and acceptance.
            </p>
          </div>
          <ol className="food-workflow__steps">
            {[
              "BOUND A TASK",
              "WRITE THE SPEC",
              "EVALUATE",
              "REVIEW INDEPENDENTLY",
            ].map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="food-section food-reflection" id="food-reflection">
          <p className="food-section-label">WHAT I TOOK FORWARD</p>
          <h2>Trust is what makes simple tracking possible.</h2>
          <p>
            I learned that the work behind a simple log is what lets me make the
            experience feel simple: nutrition stays explicit, history stays
            trustworthy, and the next step feels clear.
          </p>
          <small>
            I’m continuing frontend refinement and closing remaining product
            issues.
          </small>
        </section>
      </article>
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
                <article key={p.slug}>
                  <strong>{p.name}</strong>
                  <span>{p.detail}</span>
                  {p.slug === "food-tracker" && (
                    <Link to="/projects/food-tracker">READ CASE STUDY ↗</Link>
                  )}
                  {p.source && (
                    <a href={p.source} target="_blank" rel="noreferrer">
                      VIEW SOURCE REPOSITORY <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
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
        path="/projects/food-tracker"
        element={<FoodTrackerCaseStudy />}
      />
      <Route
        path="/projects/:slug"
        element={<ReservedDetailRoute kind="project" />}
      />
      <Route
        path="/experience/:slug"
        element={<ReservedDetailRoute kind="experience" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
