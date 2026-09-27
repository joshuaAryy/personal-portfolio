import { Link } from "react-router-dom";
import { UtilityState } from "./UtilityState";
import "./utility.css";

const indexes = [
  { label: "Projects", route: "/projects" },
  { label: "Experience", route: "/experience" },
  { label: "Profile", route: "/profile" },
] as const;

export function NotFoundContent() {
  return (
    <article
      className="utility-page utility-not-found"
      aria-labelledby="not-found-title"
    >
      <p className="utility-eyebrow utility-eyebrow--cyan">Route recovery</p>

      <div className="utility-not-found__hero">
        <div className="utility-not-found__message">
          <p className="utility-not-found__code" aria-label="Error 404">
            404
          </p>
          <h1 id="not-found-title">This page isn’t here.</h1>
          <p>
            The address doesn’t match a current page. Use a route below to
            continue.
          </p>
          <nav className="utility-recovery-actions" aria-label="Recovery links">
            <Link className="utility-button utility-button--primary" to="/projects">
              Go to Projects
            </Link>
            <Link className="utility-button" to="/experience">
              Browse Experience
            </Link>
            <Link className="utility-button" to="/profile">
              Open Profile
            </Link>
          </nav>
        </div>

        <UtilityState
          variant="unavailable"
          title="Return to a known page"
          message="This address does not match a current portfolio route. The Projects index is available."
          action={{ to: "/projects", label: "Back to Projects" }}
        />
      </div>

      <section className="utility-indexes" aria-labelledby="available-indexes">
        <p className="utility-eyebrow" id="available-indexes">
          Available indexes
        </p>
        <nav aria-label="Available sections">
          {indexes.map((index) => (
            <Link key={index.route} to={index.route}>
              <strong>{index.label}</strong>
              <span aria-hidden="true"> · </span>
              <code>{index.route}</code>
            </Link>
          ))}
        </nav>
        <p>Public project repositories are linked from the relevant project pages.</p>
      </section>
    </article>
  );
}

export default NotFoundContent;
