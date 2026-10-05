import { Client } from "./PortfolioLayout";
import ProfileNav from "./ProfileNav";
import "./personal-highlights.css";

const moments = [
  {
    source: "IMG_0422.jpeg",
    alt: "A spontaneous group selfie.",
    layout: "wide",
  },
  {
    source: "IMG_0098.jpeg",
    alt: "A pause beneath a sunset sky.",
    layout: "tall",
  },
  {
    source: "IMG_0208.jpeg",
    alt: "A playful museum moment beneath a rounded exhibit.",
    layout: "tall",
  },
  {
    source: "IMG_0305.jpeg",
    alt: "A selfie at a construction site.",
    layout: "tall",
  },
  {
    source: "IMG_0308.jpeg",
    alt: "A playful moment in a gallery.",
    layout: "wide",
  },
  {
    source: "IMG_0320.jpeg",
    alt: "A quiet view across a city skyline.",
    layout: "tall",
  },
  {
    source: "IMG_0394.jpeg",
    alt: "A small group shares a moment at an event.",
    layout: "wide",
  },
] as const;

export default function PersonalHighlightsPage() {
  return (
    <Client pageClass="main--detail main--personal-highlights">
      <ProfileNav />
      <section className="personal-highlights" aria-labelledby="personal-highlights-title">
        <h1 id="personal-highlights-title">PERSONAL HIGHLIGHTS</h1>
        <div className="personal-highlights__gallery">
          {moments.map((moment) => (
            <figure
              className={`personal-highlights__item personal-highlights__item--${moment.layout}`}
              key={moment.source}
            >
              <img
                className="personal-highlights__photo"
                src={`/media/profile/highlights/${moment.source}`}
                alt={moment.alt}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>
    </Client>
  );
}
