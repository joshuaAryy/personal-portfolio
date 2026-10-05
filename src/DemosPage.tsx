import { useEffect, useRef, useState } from "react";
import { Client } from "./PortfolioLayout";
import ProfileNav from "./ProfileNav";
import { projectIdentities } from "./data";
import "./demos-page.css";

const demoOptions = [
  {
    key: "food",
    label: "FOOD TRACKER",
    image: "/media/demos-food.png",
    imageAlt: "Food Tracker selected mark",
    mark: projectIdentities["food-tracker"].mark,
    rail: "/media/demos-rail-food.svg",
  },
  {
    key: "crest",
    label: "CREST",
    image: "/media/crest-sample.png",
    imageAlt: "Crest expense approval sample workspace",
    mark: projectIdentities.crest.mark,
    rail: "/media/demos-rail-crest.svg",
  },
  {
    key: "choveigo",
    label: "CHO’VEIGO",
    image: "/media/choveigo-recommendations.png",
    imageAlt: "Cho’Veigo recommendations interface capture",
    mark: projectIdentities.choveigo.mark,
    rail: "/media/demos-rail-choveigo.svg",
  },
] as const;

type DemoKey = (typeof demoOptions)[number]["key"];

const crestEmbedUrl =
  "https://www.youtube-nocookie.com/embed/kiq6XjNi9J8?autoplay=1";

export default function DemosPage() {
  const [selected, setSelected] = useState<DemoKey>("food");
  const [crestIsPlaying, setCrestIsPlaying] = useState(false);
  const crestVideoRef = useRef<HTMLIFrameElement>(null);
  const current = demoOptions.find((item) => item.key === selected)!;

  useEffect(() => {
    if (selected === "crest" && crestIsPlaying) {
      crestVideoRef.current?.focus({ preventScroll: true });
    }
  }, [crestIsPlaying, selected]);

  function selectDemo(key: DemoKey) {
    setSelected(key);
    setCrestIsPlaying(false);
  }

  return (
    <Client pageClass="main--demos">
      <ProfileNav />
      <div className="demo-layout">
        <nav className="demo-selector" aria-label="Demo selector">
          {demoOptions.map((item, index) => (
            <button
              key={item.key}
              className={`demo-selector__button${selected === item.key ? " is-selected" : ""}`}
              type="button"
              onClick={() => selectDemo(item.key)}
              aria-pressed={selected === item.key}
              data-node-id={
                index === 0 ? "1316:103" : index === 1 ? "1316:107" : "1316:113"
              }
            >
              <img className="demo-selector__thumb" src={item.mark} alt="" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <img
          className="demo-recording-rail"
          src={current.rail}
          alt=""
          aria-hidden="true"
        />

        <section className="demo-stage" aria-label={`${current.label} demo`}>
          <div className={`demo-player demo-player--${selected}`}>
            {selected === "crest" && crestIsPlaying ? (
              <iframe
                ref={crestVideoRef}
                className="demo-player__video"
                src={crestEmbedUrl}
                title="Crest expense intelligence demo video"
                tabIndex={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <>
                <img
                  className="demo-player__still"
                  src={current.image}
                  alt={current.imageAlt}
                />
                {selected === "food" && (
                  <span className="demo-player__pending" role="status">
                    DEMO PENDING
                  </span>
                )}
                {selected === "crest" && (
                  <>
                    <span
                      className="demo-player__sample-badge"
                      data-node-id="1553:45"
                    >
                      <span
                        className="demo-player__sample-badge-label"
                        data-node-id="1553:46"
                      >
                        SAMPLE DATA
                      </span>
                    </span>
                    <button
                      className="demo-player__play"
                      type="button"
                      onClick={() => setCrestIsPlaying(true)}
                      aria-label="Play Crest demo in player"
                      data-node-id="1316:4622"
                    >
                      <span className="demo-player__play-icon" aria-hidden="true" />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <h1 className="demo-title" data-node-id="1316:131">
            {current.label}
          </h1>
        </section>
      </div>
    </Client>
  );
}
