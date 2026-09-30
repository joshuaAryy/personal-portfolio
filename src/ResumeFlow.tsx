import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ResumeMechanism from "./ResumeMechanism";
import "./resume.css";

const resumePdfUrl = "/resume/Joshua_Aryeetey_General_Resume_v13.pdf";
const resumeFileName = "Joshua_Aryeetey_General_Resume_v13.pdf";

function getReturnPath(state: unknown): string {
  if (!state || typeof state !== "object" || !("from" in state)) {
    return "/projects";
  }

  const from = state.from;
  if (
    typeof from === "string" &&
    from.startsWith("/") &&
    !from.startsWith("//") &&
    !from.startsWith("/resume")
  ) {
    return from;
  }

  return "/projects";
}

export function ResumeFound() {
  const location = useLocation();
  const navigate = useNavigate();
  const returnTo = getReturnPath(location.state);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      navigate(returnTo, { replace: true });
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [navigate, returnTo]);

  function closeResume() {
    navigate(returnTo, { replace: true });
  }

  return (
    <section className="resume-found" aria-labelledby="resume-found-title">
      <p className="resume-found__eyebrow">PORTFOLIO UTILITY</p>
      <div className="resume-found__system">
        <ResumeMechanism />
        <Link
          className="resume-action resume-action--primary resume-found__action"
          to="/resume/viewer"
          state={location.state}
        >
          <img
            className="resume-found__action-plate resume-found__action-plate--default"
            src="/media/resume/communitydragon/9.22-ready-check/button-accept-default.png"
            alt=""
            aria-hidden="true"
            width="212"
            height="70"
          />
          <img
            className="resume-found__action-plate resume-found__action-plate--hover"
            src="/media/resume/communitydragon/9.22-ready-check/button-accept-hover.png"
            alt=""
            aria-hidden="true"
            width="212"
            height="70"
          />
          <span>View Resume</span>
        </Link>
      </div>
      <button
        className="resume-found__close"
        type="button"
        onClick={closeResume}
        aria-keyshortcuts="Escape"
      >
        ESC <span aria-hidden="true">·</span> CLOSE
      </button>
    </section>
  );
}

export function ResumeViewer() {
  const location = useLocation();

  return (
    <section className="resume-viewer" aria-labelledby="resume-viewer-title">
      <header className="resume-viewer__header">
        <div className="resume-viewer__heading">
          <Link className="resume-viewer__back" to="/resume" state={location.state}>
            <span aria-hidden="true">‹</span> Back to Resume Found
          </Link>
          <p className="resume-viewer__eyebrow">APPROVED GENERAL RESUME · VERSION 13</p>
          <h1 id="resume-viewer-title">Resume</h1>
        </div>
        <div
          className="resume-viewer__actions"
          role="group"
          aria-label="Resume actions"
        >
          <a
            className="resume-action resume-action--primary"
            href={resumePdfUrl}
            download={resumeFileName}
          >
            Download PDF
          </a>
          <a
            className="resume-action resume-action--secondary"
            href={resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Fullscreen <span aria-hidden="true">↗</span>
            <span className="resume-sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </header>

      <div className="resume-viewer__frame">
        <iframe
          className="resume-viewer__pdf"
          src={resumePdfUrl}
          title="Joshua Aryeetey’s approved general resume, version 13"
        />
      </div>
      <p className="resume-viewer__fallback">
        If the document does not appear, use Download PDF or Open Fullscreen.
      </p>
    </section>
  );
}
