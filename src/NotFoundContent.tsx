import { Link } from "react-router-dom";
import "./utility.css";

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
          <p>This address doesn’t match a current portfolio route.</p>
          <nav className="utility-recovery-actions" aria-label="Recovery link">
            <Link className="utility-button utility-button--primary" to="/projects">
              Go to Projects
            </Link>
          </nav>
        </div>
      </div>
    </article>
  );
}

export default NotFoundContent;
