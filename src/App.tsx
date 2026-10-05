import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { experience, projects } from "./data";
import { Client } from "./PortfolioLayout";
import { projectCasePaths } from "./project-route-paths";
import ChoViegoCase from "./ChoViegoCase";
import StushPattiesCase from "./StushPattiesCase";
import FraymakersCase from "./FraymakersCase";
import LivingInSilicoCase from "./LivingInSilicoCase";
import JourneyCase from "./JourneyCase";
import JourneyVoidField from "./JourneyVoidField";
import FoodTrackerPage from "./project-pages/FoodTrackerPage";
import CrestPage from "./project-pages/CrestPage";
import { HelpExperienceProvider, HelpRouteEntry } from "./Help";
import { NotFoundContent } from "./NotFoundContent";
import { ResumeFound, ResumeViewer } from "./ResumeFlow";
import Opening from "./Opening";
import ProfileNav from "./ProfileNav";
import ProfileOverview, { JourneyTraitMedallions } from "./ProfileOverview";
import Lobby from "./Lobby";
import DemosPage from "./DemosPage";
import PersonalHighlightsPage from "./PersonalHighlightsPage";
import HomeExplore from "./HomeExplore";
import EducationProjects from "./EducationProjects";

function ReservedDetailRoute({ kind }: { kind: "project" | "experience" }) {
  const { slug } = useParams();
  const item =
    kind === "project"
      ? projects.find((p) => p.slug === slug)
      : experience.find((e) => e.slug === slug);
  if (!item) return <NotFound />;
  return (
    <Navigate
      to={kind === "project" ? "/projects" : "/experience"}
      replace
    />
  );
}
function NotFound() {
  return (
    <Client pageClass="main--detail main--not-found">
      <NotFoundContent />
    </Client>
  );
}
export default function App() {
  return (
    <HelpExperienceProvider>
    <Routes>
      <Route
        path="/"
        element={<Opening underlay={<HomeExplore />} />}
      />
      <Route path="/home" element={<HomeExplore />} />
      <Route path="/projects" element={<Lobby mode="projects" />} />
      <Route path="/experience" element={<Lobby mode="experience" />} />
      <Route path="/hackathons" element={<Lobby mode="hackathons" />} />
      <Route path="/education" element={<Lobby mode="education" />} />
      <Route path="/education/projects" element={<EducationProjects />} />
      <Route
        path="/profile"
        element={
          <Client pageClass="main--profile">
            <ProfileOverview projects={projects} projectCasePaths={projectCasePaths} />
          </Client>
        }
      />
      <Route
        path="/resume"
        element={
          <Client pageClass="main--detail main--resume-found">
            <ResumeFound />
          </Client>
        }
      />
      <Route
        path="/resume/viewer"
        element={
          <Client pageClass="main--detail main--resume-viewer">
            <ResumeViewer />
          </Client>
        }
      />
      <Route path="/help" element={<HelpRouteEntry />} />
      <Route
        path="/profile/journey"
        element={
          <Client pageClass="main--detail main--journey">
            <div className="journey-layout">
              <JourneyVoidField />
              <aside className="journey-identity" aria-label="Profile identity">
                <div className="journey-identity__portrait" aria-hidden="true">
                  <img
                    className="journey-identity__photo"
                    src="/media/lobby/profile-portrait-source.jpg"
                    alt=""
                  />
                  <img
                    className="journey-identity__frame"
                    src="/media/lobby/project-medallion-frame.png"
                    alt=""
                  />
                </div>
                <div className="journey-identity__copy">
                  <p className="journey-identity__name">JOSHUA ARYEETEY</p>
                  <div className="journey-identity__credentials">
                    <div className="journey-identity__education">
                      <p className="journey-identity__program">COMPUTER ENGINEERING</p>
                      <p className="journey-identity__specialization">SOFTWARE · AI / ML</p>
                    </div>
                    <div className="journey-identity__degree-medallion" aria-hidden="true">
                      <img src="/media/lobby/project-medallion-frame.png" alt="" />
                      <span>CE</span>
                    </div>
                  </div>
                  <div className="journey-identity__divider" aria-hidden="true" />
                  <JourneyTraitMedallions />
                </div>
              </aside>
              <div className="journey-content">
                <ProfileNav />
                <JourneyCase />
              </div>
            </div>
          </Client>
        }
      />
      <Route path="/profile/demos" element={<DemosPage />} />
      <Route path="/profile/highlights" element={<PersonalHighlightsPage />} />
      <Route
        path="/projects/food-tracker"
        element={<FoodTrackerPage />}
      />
      <Route
        path="/projects/crest"
        element={<CrestPage />}
      />
      <Route
        path="/projects/fraymakers"
        element={
          <Client pageClass="main--detail main--fraymakers-case">
            <FraymakersCase />
          </Client>
        }
      />
      <Route
        path="/projects/choveigo"
        element={
          <Client pageClass="main--detail main--choveigo-case">
            <ChoViegoCase />
          </Client>
        }
      />
      <Route
        path="/projects/:slug"
        element={<ReservedDetailRoute kind="project" />}
      />
      <Route
        path="/experience/living-in-silico"
        element={
          <Client pageClass="main--detail main--living-case">
            <LivingInSilicoCase />
          </Client>
        }
      />
      <Route
        path="/experience/stush-patties"
        element={
          <Client pageClass="main--detail main--stush-case">
            <StushPattiesCase />
          </Client>
        }
      />
      <Route
        path="/experience/:slug"
        element={<ReservedDetailRoute kind="experience" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </HelpExperienceProvider>
  );
}
