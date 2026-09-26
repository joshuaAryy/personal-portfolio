export type Project = { slug: string; name: string; short: string; role: string; detail: string; source?: string }
export const projects: Project[] = [
  { slug: 'fraymakers', name: 'Fraymakers', short: 'Tournament automation · 2025', role: 'AUTOMATION · WEB', detail: 'Tournament automation' },
  { slug: 'crest', name: 'Crest', short: 'MPC Hacks · 2026', role: 'AI · DATA', detail: 'MPC Hacks 2026 · 3rd Place, Brim Financial Challenge', source: 'https://github.com/Atlearia/mpchacks' },
  { slug: 'food-tracker', name: 'Food Tracker', short: 'Nutrition intelligence platform', role: 'MOBILE · BACKEND', detail: 'Nutrition tracking · search · analytics', source: 'https://github.com/joshuaAryy/food-tracker' },
  { slug: 'choveigo', name: "Cho’Veigo", short: 'Evidence-first job matching', role: 'AI · SOFTWARE', detail: 'Resume tailoring', source: 'https://github.com/ShivGitHub1-n/Application-Cho-Viego' },
]
export const experience = [
  { slug: 'living-in-silico', name: 'Living in Silico', dates: 'Mar–Jun 2025', title: 'AI/ML Research Intern', role: 'AI · RESEARCH' },
  { slug: 'stush-patties', name: 'Stush Patties', dates: 'Sep–Nov 2025', title: 'Software Engineering Intern', role: 'SOFTWARE · DATA' },
] as const
