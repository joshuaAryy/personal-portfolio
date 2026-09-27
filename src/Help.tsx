import { Link } from "react-router-dom";
import { projects } from "./data";
import { UtilityState } from "./UtilityState";
import "./utility.css";

const sectionLinks = [
  {
    label: "Projects",
    routes: [{ path: "/projects", label: "/projects" }],
    description: "Browse project cards and the available case studies.",
  },
  {
    label: "Experience",
    routes: [{ path: "/experience", label: "/experience" }],
    description: "Browse the two published experience stories.",
  },
  {
    label: "Profile",
    routes: [
      { path: "/profile", label: "/profile" },
      { path: "/profile/journey", label: "/profile/journey" },
      { path: "/profile/demos", label: "/profile/demos" },
    ],
    description: "Read the overview, Journey, and demos.",
  },
] as const;

export function Help() {
  const publicProjects = projects.filter((project) => project.source);

  return (
    <article className="utility-page utility-help" aria-labelledby="help-title">
      <header className="utility-page__header">
        <p className="utility-eyebrow utility-eyebrow--cyan">Portfolio guide</p>
        <h1 id="help-title">Find your way around.</h1>
        <p className="utility-page__deck">
          A short guide to the pages, project stories, source links and keyboard
          controls.
        </p>
      </header>

      <div className="utility-help__grid">
        <div className="utility-help__column utility-help__column--index">
          <section className="utility-card" aria-labelledby="help-navigation">
            <p className="utility-eyebrow">01 / Navigation</p>
            <h2 id="help-navigation">Choose a section</h2>
            <p className="utility-card__intro">
              The top navigation opens the current Projects, Experience and
              Profile areas.
            </p>
            <ul className="utility-route-list">
              {sectionLinks.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>
                  <span aria-hidden="true"> · </span>
                  {item.routes.map((route, index) => (
                    <span key={route.path}>
                      {index > 0 && <span aria-hidden="true"> · </span>}
                      <Link to={route.path}>{route.label}</Link>
                    </span>
                  ))}
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
            <p className="utility-note">
              Personal Highlights is waiting on owner photos.
            </p>
          </section>

          <section className="utility-card" aria-labelledby="help-sources">
            <p className="utility-eyebrow">02 / Public sources</p>
            <h2 id="help-sources">Read the project repositories</h2>
            <p className="utility-card__intro">
              These project pages link to public source repositories:
            </p>
            <ul className="utility-source-list">
              {publicProjects.map((project) => (
                <li key={project.slug}>
                  <span>{project.name}</span>
                  <span aria-hidden="true"> · </span>
                  <a href={project.source} target="_blank" rel="noreferrer">
                    {project.source?.replace(/^https:\/\//, "")}
                    <span className="utility-sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="utility-help__column utility-help__column--guide">
          <UtilityState
            variant="empty"
            title="Nothing to show here yet"
            message="Keep the reason brief and offer one real route forward. This pattern does not promise an automatic retry."
            action={{ to: "/projects", label: "Browse Projects" }}
          />

          <section className="utility-card" aria-labelledby="help-keyboard">
            <p className="utility-eyebrow">03 / Keyboard</p>
            <h2 id="help-keyboard">Keep focus visible</h2>
            <p>
              <kbd>Tab</kbd> moves through links and buttons. Press{" "}
              <kbd>Enter</kbd> to open links and activate buttons; press{" "}
              <kbd>Space</kbd> to activate a focused button. The skip link
              moves directly to the main content.
            </p>
            <span className="utility-focus-sample" aria-hidden="true">
              Visible focus · cyan ring
            </span>
          </section>

          <section className="utility-card" aria-labelledby="help-return">
            <p className="utility-eyebrow">04 / When a story isn’t ready</p>
            <h2 id="help-return">The list is a safe place to return</h2>
            <p>
              Unfinished project pages return to Projects; unfinished
              experience pages return to Experience. Start again from those
              indexes.
            </p>
            <div className="utility-help__return-actions">
              <Link className="utility-button" to="/projects">
                Back to Projects
              </Link>
              <Link className="utility-button" to="/experience">
                Back to Experience
              </Link>
            </div>
          </section>
        </div>
      </div>

      <p className="utility-help__closing">
        Need a fresh start? Return to <Link to="/projects">/projects</Link>.
      </p>
    </article>
  );
}

export default Help;
