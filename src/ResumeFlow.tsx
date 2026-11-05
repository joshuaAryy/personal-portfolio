import { useEffect, useLayoutEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ResumeMechanism from "./ResumeMechanism";
import "./resume.css";

const resumePdfUrl = "/resume/Joshua_Aryeetey_General_Resume_v13.pdf";
const resumeFileName = "Joshua_Aryeetey_General_Resume_v13.pdf";

export function ResumeFoundTakeover({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const hasCapturedFocusRef = useRef(false);

  useLayoutEffect(() => {
    if (!hasCapturedFocusRef.current) {
      const activeElement = document.activeElement;
      returnFocusRef.current = activeElement instanceof HTMLElement && activeElement !== document.body
        ? activeElement
        : null;
      hasCapturedFocusRef.current = true;
    }
    dialogRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => () => {
    const previousTarget = returnFocusRef.current;
    const target = previousTarget?.isConnected
      ? previousTarget
      : document.querySelector<HTMLElement>("#main");
    target?.focus({ preventScroll: true });
  }, []);

  function keepFocusInside(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute("hidden"));
    if (!focusable.length) {
      event.preventDefault();
      dialog.focus({ preventScroll: true });
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;
    if (event.shiftKey && (activeElement === first || activeElement === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="resume-takeover">
      <div
        ref={dialogRef}
        className="resume-takeover__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-found-title"
        tabIndex={-1}
        onKeyDown={keepFocusInside}
      >
        {children}
      </div>
    </div>
  );
}

function getReturnPath(state: unknown): string {
  if (!state || typeof state !== "object" || !("from" in state)) {
    return "/home";
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

  return "/home";
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
      <div className="resume-found__composition">
        <div className="resume-found__system">
          <ResumeMechanism />
        </div>
        <h1 id="resume-found-title" className="resume-found__title">Resume Found</h1>
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
        <button
          className="resume-found__close"
          type="button"
          onClick={closeResume}
          aria-keyshortcuts="Escape"
        >
          CLOSE
        </button>
      </div>
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
          title="Joshua Aryeetey’s resume"
        />
      </div>
      <p className="resume-viewer__fallback">
        If the document does not appear, use Download PDF or Open Fullscreen.
      </p>
    </section>
  );
}
