import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./opening.css";

const OPENING_DURATION_MS = 2_000;
const REDUCED_HANDOFF_MS = 120;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type OpeningAssetProps = {
  className: string;
  src: string;
  nodeId: string;
  overscan?: string;
};

function OpeningAsset({ className, src, nodeId, overscan = "" }: OpeningAssetProps) {
  return (
    <div className={`opening__layer ${className}`} data-node-id={nodeId}>
      <div className={`opening__asset-frame ${overscan}`}>
        <img src={src} alt="" draggable={false} />
      </div>
    </div>
  );
}

function OpeningArchiveMark({
  className,
  nodeId,
}: {
  className: string;
  nodeId: string;
}) {
  return (
    <div className={`opening__layer ${className}`} data-node-id={nodeId}>
      <img
        className="opening__archive-mark"
        data-node-id="159:2"
        src="/media/profile/open-portfolio-j-archive-source-700.png"
        alt=""
        draggable={false}
      />
    </div>
  );
}

export default function Opening({ underlay }: { underlay: ReactNode }) {
  const navigate = useNavigate();
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  );
  const [leaving, setLeaving] = useState(false);
  const completed = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const preference = window.matchMedia(REDUCED_MOTION_QUERY);
    const syncPreference = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    if (typeof preference.addEventListener === "function") {
      preference.addEventListener("change", syncPreference);
      return () => preference.removeEventListener("change", syncPreference);
    }

    if (typeof preference.addListener === "function") {
      preference.addListener(syncPreference);
      return () => preference.removeListener(syncPreference);
    }
  }, []);

  useEffect(() => {
    const goToHome = () => {
      if (completed.current) return;
      completed.current = true;
      navigate("/home", { replace: true });
    };

    if (reducedMotion) {
      setLeaving(true);
      timers.current.push(window.setTimeout(goToHome, REDUCED_HANDOFF_MS));
    } else {
      setLeaving(false);
      timers.current.push(window.setTimeout(goToHome, OPENING_DURATION_MS));
    }

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
        className={"opening" + (reducedMotion ? " opening--reduced" : "")}
        aria-label="Portfolio introduction"
        data-node-id="2025:2"
      >
        <div className="opening__treatment" data-node-id="2025:18" aria-hidden="true">
          <img
            className="opening__environment"
            src="/media/opening/gameflow-background.jpg"
            alt=""
            draggable={false}
            data-node-id="2448:3"
          />
          <div className="opening__mechanism">
            <OpeningAsset
              className="opening__bezel opening__motion--outer"
              src="/media/opening/outer-dark-alloy-bezel.svg"
              nodeId="2443:2"
              overscan="opening__overscan--outer"
            />
            <OpeningAsset
              className="opening__bevel opening__motion--outer"
              src="/media/opening/bevel-catch.svg"
              nodeId="2443:8"
              overscan="opening__overscan--bevel"
            />
            <OpeningAsset
              className="opening__enamel-bed opening__motion--outer"
              src="/media/opening/black-enamel-bed.svg"
              nodeId="2443:14"
              overscan="opening__overscan--enamel"
            />
            <OpeningAsset
              className="opening__inner-rail opening__motion--outer"
              src="/media/opening/recessed-inner-rail.svg"
              nodeId="2443:20"
              overscan="opening__overscan--rail"
            />
            <OpeningAsset
              className="opening__segmented-bezel opening__motion--segmented"
              src="/media/opening/segmented-outer-bezel.svg"
              nodeId="2443:38"
            />
            <div
              className="opening__layer opening__tick-track opening__motion--ticks"
              data-node-id="2443:71"
            >
              <div className="opening__ticks-frame" data-node-id="2448:312">
                <div
                  className="opening__ticks-content"
                  data-node-id="2448:314"
                  data-mask-node-id="2448:317"
                >
                  <img
                    className="opening__tick-art"
                    src="/media/opening/circle-lines-gold.svg"
                    alt=""
                    draggable={false}
                    data-node-id="2448:315"
                  />
                </div>
              </div>
            </div>
            <OpeningAsset
              className="opening__cyan opening__motion--cyan"
              src="/media/opening/cyan-energy-insets.svg"
              nodeId="2443:92"
            />
            <OpeningAsset
              className="opening__jewels opening__motion--outer"
              src="/media/opening/indexed-jewel-marks.svg"
              nodeId="2443:110"
            />
            <OpeningArchiveMark
              className="opening__construction opening__motion--construction"
              nodeId="2983:310"
            />
            <OpeningArchiveMark
              className="opening__j-body opening__motion--j-body"
              nodeId="2983:313"
            />
            <OpeningAsset
              className="opening__glint opening__motion--glint"
              src="/media/opening/restrained-rail-glint.svg"
              nodeId="2443:154"
            />
          </div>
        </div>
        <button
          className="opening__skip"
          type="button"
          aria-label="Skip to Home"
          onClick={skip}
          data-node-id="2025:35"
        >
          <span aria-hidden="true">SKIP&nbsp;&nbsp;&nbsp;&#8599;</span>
        </button>
      </main>
    </div>
  );
}
