export type Project = {
  slug: string;
  name: string;
  indexGlyph: string;
  short: string;
  role: string;
  detail: string;
  source?: string;
  mark: string;
};
export const projectIdentities = {
  fraymakers: { mark: "/media/profile/fraymakers-logo.png", alt: "Fraymakers official wordmark" },
  crest: { mark: "/media/profile/profile-crest-emblem.png", alt: "Crest project mark" },
  "food-tracker": { mark: "/media/profile/food-tracker-mark.svg", alt: "Food Tracker project mark" },
  choveigo: { mark: "/media/profile/choveigo-mark.svg", alt: "Cho’Veigo project mark" },
} as const;
export const experienceIdentities = {
  "living-in-silico": { mark: "/media/profile/living-in-silico-logo.png", alt: "Living in Silico logo" },
  "stush-patties": { mark: "/media/profile/stush-patties-logo.png", alt: "Stush Patties logo" },
} as const;
export const portfolioIdentity = {
  mark: "/media/profile/open-portfolio-j-small-54.svg",
  alt: "Portfolio J mark",
} as const;
export const projects: Project[] = [
  {
    slug: "fraymakers",
    name: "Fraymakers",
    indexGlyph: "F",
    short: "Tournament automation · 2025",
    role: "AUTOMATION · WEB",
    detail: "Tournament automation",
    mark: projectIdentities.fraymakers.mark,
  },
  {
    slug: "crest",
    name: "Crest",
    indexGlyph: "C",
    short: "MPC Hacks · 2026",
    role: "AI · DATA",
    detail: "MPC Hacks 2026 · 3rd Place, Brim Financial Challenge",
    source: "https://github.com/Atlearia/mpchacks",
    mark: projectIdentities.crest.mark,
  },
  {
    slug: "food-tracker",
    name: "Food Tracker",
    indexGlyph: "FT",
    short: "Nutrition intelligence platform",
    role: "MOBILE · BACKEND",
    detail: "Nutrition tracking · search · analytics",
    source: "https://github.com/joshuaAryy/food-tracker",
    mark: projectIdentities["food-tracker"].mark,
  },
  {
    slug: "choveigo",
    name: "Cho’Veigo",
    indexGlyph: "CV",
    short: "Evidence-first job matching",
    role: "AI · SOFTWARE",
    detail: "Resume tailoring",
    source: "https://github.com/ShivGitHub1-n/Application-Cho-Viego",
    mark: projectIdentities.choveigo.mark,
  },
];
export const experience = [
  {
    slug: "living-in-silico",
    name: "Living in Silico",
    dates: "Mar–Jun 2025",
    title: "AI/ML Research Intern",
    role: "AI · RESEARCH",
  },
  {
    slug: "stush-patties",
    name: "Stush Patties",
    dates: "Sep–Nov 2025",
    title: "Software Engineering Intern",
    role: "SOFTWARE · DATA",
  },
] as const;
