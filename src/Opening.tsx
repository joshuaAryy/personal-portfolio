import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./opening.css";

const OPENING_DURATION_MS = 5_000;
const REDUCED_HANDOFF_MS = 120;
const NORMAL_HANDOFF_MS = 160;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const OPENING_ARCHIVE_FALLBACK_SOURCE = "/media/profile/open-portfolio-j-archive-source-700.png";
const OPENING_V8_ASSETS = {
  j: "/media/identity/sonnet-v8/figma/canonical-j.png",
  orb: "/media/identity/sonnet-v8/figma-export/portal-plasma-2x.png",
  ring: "/media/identity/sonnet-v8/figma-export/orb-ring-alpha-3x.png",
  contactShadow: "/media/identity/sonnet-v8/figma-export/j-contact-shadow-alpha-3x.png",
  activationBloom: "/media/opening/j-sonnet-motion-v8/figma-motion/orb-activation-bloom-2x.png",
  sheen: "/media/opening/j-sonnet-motion-v8/figma-motion/sheen-band-2x.png",
  pulseSpark: "/media/opening/j-sonnet-motion-v8/figma-motion/pulse-spark-2x.png",
} as const;
const OPENING_V8_MOTION_ASSETS = {
  seamLight: "/media/opening/j-sonnet-motion-v8/figma-motion/seam-light.svg",
  conduit: "/media/opening/j-sonnet-motion-v8/figma-motion/conduit.svg",
  lightExits: "/media/opening/j-sonnet-motion-v8/figma-motion/light-exits.svg",
} as const;

const J_PIECE_CLIPS = {
  crown: "polygon(-4.42% 37.52%, 55.98% 22.48%, 60.96% 23.72%, 65.96% 19.98%, 106.69% 9.85%, 106.84% -4.27%, -4.27% -4.27%)",
  shaft: "polygon(-4.12% 38.76%, 55.98% 23.80%, 61.26% 25.11%, 66.52% 21.18%, 106.99% 11.09%, 106.69% 51.35%, 66.24% 61.43%, 60.96% 60.11%, 55.70% 64.04%, 52.42% 64.87%)",
  hook: "polygon(52.71% 66.11%, 56.26% 65.24%, 61.26% 61.50%, 66.24% 62.76%, 106.99% 52.61%, 106.84% 111.11%, -4.27% 111.11%, -4.27% 53.42%, 52.56% 53.42%)",
} as const;

const OPENING_STORYBOARD_NODES = [
  "3714:2",
  "3714:530",
  "3714:1058",
  "3714:1575",
  "3714:2092",
  "3714:2609",
  "3714:3126",
] as const;

function V8HeroMark({ unavailable, onAssetError }: { unavailable: boolean; onAssetError: () => void }) {
  if (unavailable) {
    return <img className="opening__archive-mark" src={OPENING_ARCHIVE_FALLBACK_SOURCE} alt="" draggable={false} />;
  }

  return (
    <div
      className="opening__j-mark"
      data-node-id="3735:2"
      data-j-rig-source="3712:2"
      data-j-assembly="sonnet-v8-seven-state"
      data-j-source="figma-sonnet-v8-3735:516"
      data-j-state-s1={OPENING_STORYBOARD_NODES[0]}
      data-j-state-s2={OPENING_STORYBOARD_NODES[1]}
      data-j-state-s3={OPENING_STORYBOARD_NODES[2]}
      data-j-state-s4={OPENING_STORYBOARD_NODES[3]}
      data-j-state-s5={OPENING_STORYBOARD_NODES[4]}
      data-j-state-s6={OPENING_STORYBOARD_NODES[5]}
      data-j-state-s7={OPENING_STORYBOARD_NODES[6]}
    >
      <div className="opening__j-assembly" data-j-layer="assembled-pieces-and-orb">
        <img
          className="opening__orb-layer opening__orb-layer--portal"
          src={OPENING_V8_ASSETS.orb}
          alt=""
          draggable={false}
          data-node-id="3735:6"
          data-j-layer="portal-plasma-vignette"
          onError={onAssetError}
        />
        <img
          className="opening__j-activation-bloom"
          data-node-id="3712:698"
          data-j-layer="activation-bloom"
          src={OPENING_V8_ASSETS.activationBloom}
          alt=""
          draggable={false}
          onError={onAssetError}
        />
        <img
          className="opening__orb-layer opening__orb-layer--ring"
          src={OPENING_V8_ASSETS.ring}
          alt=""
          draggable={false}
          data-node-id="3735:137"
          data-j-layer="gold-orb-ring"
          onError={onAssetError}
        />
        <img
          className="opening__orb-layer opening__orb-layer--contact-shadow"
          src={OPENING_V8_ASSETS.contactShadow}
          alt=""
          draggable={false}
          data-node-id="3735:145"
          data-j-layer="j-contact-shadow"
          onError={onAssetError}
        />
        <span className="opening__j-settled" data-node-id="3735:390" data-j-layer="fused-j">
          <img src={OPENING_V8_ASSETS.j} alt="" draggable={false} onError={onAssetError} />
        </span>
        {(["crown", "shaft", "hook"] as const).map((piece) => (
          <span
            className={`opening__j-piece opening__j-piece--${piece}`}
            data-node-id={piece === "crown" ? "3712:518" : piece === "shaft" ? "3712:224" : "3712:371"}
            data-j-piece={piece}
            key={piece}
            style={{ clipPath: J_PIECE_CLIPS[piece] }}
          >
            <img
              className="opening__j-piece-art"
              data-j-source="figma-sonnet-v8-3735:516"
              src={OPENING_V8_ASSETS.j}
              alt=""
              draggable={false}
              onError={onAssetError}
            />
          </span>
        ))}
      </div>
      <img
        className="opening__j-initial-lockup"
        data-node-id="3735:2"
        data-j-layer="initial-lockup"
        src="/media/identity/sonnet-v8/figma-export/canonical-lockup.png"
        alt=""
        draggable={false}
        onError={onAssetError}
      />
      <span className="opening__j-lock" aria-hidden="true" data-j-layer="join-effects">
        <span className="opening__j-seam-light" data-node-id="3712:665">
          <img src={OPENING_V8_MOTION_ASSETS.seamLight} alt="" draggable={false} onError={onAssetError} />
        </span>
        <span className="opening__j-conduit" data-node-id="3712:692" data-j-layer="conduit">
          <img src={OPENING_V8_MOTION_ASSETS.conduit} alt="" draggable={false} onError={onAssetError} />
          <svg className="opening__j-conduit-pulse" viewBox="0 0 110.579 246.888" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="opening__j-conduit-pulse-path opening__j-conduit-pulse-path--stem"
              d="M102.4 7.00656C103 71.0066 103 131.007 102.6 173.007"
              pathLength={100}
            />
            <path
              className="opening__j-conduit-pulse-path opening__j-conduit-pulse-path--hook"
              d="M8.80018 197.007C9.80018 211.007 14.8002 219.007 21.8002 224.007C36.8002 240.007 65.8002 240.007 86.8002 230.007"
              pathLength={100}
            />
          </svg>
        </span>
        <svg className="opening__j-seam-pulse" viewBox="0 0 534.416 279.206" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="opening__j-seam-pulse-path opening__j-seam-pulse-path--crown"
            d="M288.507 70.3516L313.207 76.4516L337.807 58.0516"
            pathLength={100}
          />
          <path
            className="opening__j-seam-pulse-path opening__j-seam-pulse-path--hook"
            d="M288.507 264.252L313.207 246.752L336.507 252.652"
            pathLength={100}
          />
        </svg>
        <img className="opening__j-light-exits" data-node-id="3712:683" data-j-layer="light-exits" src={OPENING_V8_MOTION_ASSETS.lightExits} alt="" draggable={false} onError={onAssetError} />
      </span>
      <span className="opening__j-sheen" aria-hidden="true" data-node-id="3712:703" data-j-layer="material-sheen">
        <img src={OPENING_V8_ASSETS.sheen} alt="" draggable={false} />
      </span>
      <svg className="opening__j-pulse-spark" viewBox="0 0 468 468" aria-hidden="true" data-node-id="3712:712" data-j-layer="pulse-spark">
          <image href={OPENING_V8_ASSETS.pulseSpark} x="-19" y="-13" width="38" height="26">
            <animateMotion
              dur="0.92s"
              begin="2.58s"
              fill="freeze"
              calcMode="linear"
              path="M290 96 L253 205 L262 300 L205 352 L162 292"
            />
            <animate
              attributeName="opacity"
              dur="0.92s"
              begin="2.58s"
              fill="freeze"
              values="0;1;0"
              keyTimes="0;0.16;1"
            />
          </image>
      </svg>
    </div>
  );
}

export default function Opening({ underlay }: { underlay: ReactNode }) {
  const navigate = useNavigate();
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  );
  const [leaving, setLeaving] = useState(false);
  const [v8MarkUnavailable, setV8MarkUnavailable] = useState(false);
  const completed = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const preference = window.matchMedia(REDUCED_MOTION_QUERY);
    const syncPreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches);

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

    const beginNormalHandoff = () => {
      if (completed.current) return;
      setLeaving(true);
      timers.current.push(window.setTimeout(goToHome, NORMAL_HANDOFF_MS));
    };

    if (reducedMotion) {
      setLeaving(false);
      timers.current.push(window.setTimeout(goToHome, REDUCED_HANDOFF_MS));
    } else {
      setLeaving(false);
      timers.current.push(
        window.setTimeout(
          beginNormalHandoff,
          OPENING_DURATION_MS - NORMAL_HANDOFF_MS,
        ),
      );
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
        <div className="opening__treatment" data-node-id="3580:2" aria-hidden="true">
          <span className="opening__radial-field" />
          <span className="opening__peripheral-lines" />
          <span className="opening__peripheral-mark opening__peripheral-mark--northwest" />
          <span className="opening__peripheral-mark opening__peripheral-mark--northeast" />
          <span className="opening__peripheral-mark opening__peripheral-mark--west" />
          <span className="opening__peripheral-mark opening__peripheral-mark--east" />
          <span className="opening__peripheral-mark opening__peripheral-mark--southwest" />
          <span className="opening__peripheral-mark opening__peripheral-mark--southeast" />
          <span className="opening__peripheral-mark opening__peripheral-mark--north" />
          <span className="opening__peripheral-mark opening__peripheral-mark--south" />
          <div className="opening__mechanism" data-node-id="3581:2">
            <span className="opening__ring opening__ring--outer" />
            <span className="opening__ring opening__ring--inner" />
            <span className="opening__orbit-turn" aria-hidden="true">
              <span className="opening__orbit-spin">
                <span className="opening__orbit-ticks">
                  {Array.from({ length: 180 }, (_, index) => (
                    <span
                      className={`opening__orbit-tick${index % 12 === 0 ? " opening__orbit-tick--major" : ""}`}
                      key={index}
                      style={{ transform: `rotate(${index * 2}deg)` }}
                    />
                  ))}
                </span>
              </span>
            </span>
            <div
              className="opening__mark-motion"
                data-j-source={v8MarkUnavailable ? "archive-159:2" : "sonnet-v8-3735:516"}
              aria-hidden="true"
            >
              <V8HeroMark unavailable={v8MarkUnavailable} onAssetError={() => setV8MarkUnavailable(true)} />
            </div>
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
