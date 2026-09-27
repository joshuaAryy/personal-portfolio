import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import JMark from "./identity/JMark";
import "./opening.css";

export default function Opening({ underlay }: { underlay: ReactNode }) {
  const navigate = useNavigate();
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [leaving, setLeaving] = useState(false);
  const completed = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const goToPortfolio = () => {
      if (completed.current) return;
      completed.current = true;
      navigate("/home", { replace: true });
    };

    const beginHandoff = () => {
      if (completed.current) return;
      setLeaving(true);
      timers.current.push(window.setTimeout(goToPortfolio, reducedMotion ? 120 : 180));
    };

    timers.current.push(
      window.setTimeout(beginHandoff, reducedMotion ? 0 : 1820),
    );

    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [navigate, reducedMotion]);

  const skip = () => {
    if (completed.current) return;
    completed.current = true;
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    navigate("/home", { replace: true });
  };

  return (
    <div
      className={
        "opening-route" +
        (reducedMotion ? " opening-route--reduced" : "") +
        (leaving ? " opening-route--leaving" : "")
      }
    >
      <div className="opening__underlay" aria-hidden="true" inert>
        {underlay}
      </div>
      <main
        className={
          "opening" +
          (reducedMotion ? " opening--reduced" : "") +
          (leaving ? " opening--leaving" : "")
        }
        aria-label="Portfolio introduction"
      >
        <button className="opening__skip" type="button" onClick={skip}>
          SKIP
        </button>
        <div className="opening__center">
          <svg
            className="opening__registration"
            viewBox="0 0 532 532"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              cx="266"
              cy="266"
              r="265.45"
              stroke="#B38F52"
              strokeWidth="1.1"
              strokeOpacity="0.35"
            />
            <rect
              className="opening__tick"
              x="265"
              y="0"
              width="2"
              height="10"
              fill="rgba(201,163,94,0.42)"
            />
            <rect
              className="opening__tick"
              x="265"
              y="522"
              width="2"
              height="10"
              fill="rgba(201,163,94,0.42)"
            />
            <rect
              className="opening__tick"
              x="0"
              y="265"
              width="10"
              height="2"
              fill="rgba(201,163,94,0.42)"
            />
            <rect
              className="opening__tick"
              x="522"
              y="265"
              width="10"
              height="2"
              fill="rgba(201,163,94,0.42)"
            />
          </svg>
          <JMark className="opening__mark" />
        </div>
      </main>
    </div>
  );
}
