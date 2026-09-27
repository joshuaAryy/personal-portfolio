import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JMark from "./identity/JMark";
import "./opening.css";

export default function Opening() {
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
      navigate("/projects", { replace: true });
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
    navigate("/projects", { replace: true });
  };

  return (
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
        <JMark className="opening__mark" />
      </div>
    </main>
  );
}
