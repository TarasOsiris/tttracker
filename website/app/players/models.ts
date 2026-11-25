import type { drillSlugs } from "../content/drills";
import type { Image } from "../equipment/models";

export type Division = "men" | "women";
export type ProfileSource = { label: string; url: string };
export type PlayerProfile = {
  id: string;
  birthDate: string | null;
  birthYear: number;
  headline: string;
  specialty: string;
  styleTags: string[];
  bio: string[];
  milestones: { year: string; title: string; detail: string; source: number }[];
  game: { title: string; description: string }[];
  watch: string[];
  practice: { drill: typeof drillSlugs[number]; title: string; steps: string[]; goal: string };
  sources: ProfileSource[];
};

export type ProfileSummary = {
  id: string;
  name: string;
  country: string;
  countryName: string;
  gender: Division;
  hand: "left" | "right" | null;
  grip: "shakehand" | "penhold" | null;
  photo?: Image;
  rank: number;
  points: number;
  headline: string;
  specialty: string;
  styleTags: string[];
};

export const countryNames: Record<string, string> = {
  CHN: "China", JPN: "Japan", FRA: "France", TPE: "Chinese Taipei",
  SWE: "Sweden", BRA: "Brazil", KOR: "South Korea",
};

export function searchText(text: string) {
  return text.normalize("NFD").replace(/\p{M}/gu, "").replace(/ø/g, "o").toLowerCase();
}

export function filterProfiles(profiles: ProfileSummary[], division: Division | "all", query: string) {
  const terms = searchText(query).trim().split(/\s+/).filter(Boolean);
  return profiles.filter((p) => (division === "all" || p.gender === division) && terms.every((term) =>
    searchText(`${p.name} ${p.country} ${p.countryName} ${p.specialty} ${p.styleTags.join(" ")} ${p.hand}-handed ${p.grip}`).includes(term),
  ));
}
