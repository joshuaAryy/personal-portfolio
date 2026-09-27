import { projects } from "./data";

export const projectCasePaths: Record<string, string> = {
  fraymakers: "/projects/fraymakers",
  "food-tracker": "/projects/food-tracker",
  choveigo: "/projects/choveigo",
  crest: "/projects/crest",
};

export const experienceStoryPaths: Record<string, string> = {
  "living-in-silico": "/experience/living-in-silico",
  "stush-patties": "/experience/stush-patties",
};

const railProjectOrder = ["food-tracker", "choveigo", "crest", "fraymakers"] as const;

export const railProjects = railProjectOrder.map(
  (slug) => projects.find((project) => project.slug === slug)!,
);
