import { blogPostsByLocale } from "../content/blog-posts";
import { setupLabel } from "../equipment/components/SetupCell";
import { players } from "../equipment/data/players";
import { playerPayload } from "../equipment/store.server";
import { profileCompetition, profileRecord } from "./competition.server";
import type { ComparisonPlayer } from "./competition";
import { menProfiles } from "./men";
import { womenProfiles } from "./women";
import { countryNames, searchText, type ProfileSummary } from "./models";
import { profileIds, rankingSnapshot } from "./rankings";

const profiles = [...menProfiles, ...womenProfiles];
const byId = new Map(profiles.map((p) => [p.id, p]));

if (byId.size !== 20 || profileIds.length !== 20 || new Set(profileIds).size !== 20) {
  throw new Error("Player profiles must contain exactly 20 unique players");
}

export function profileSummaries(): ProfileSummary[] {
  return (["men", "women"] as const).flatMap((gender) => {
    const list = rankingSnapshot[gender];
    if (list.length !== 10 || list.some((p, i) => p.rank !== i + 1 || p.points <= 0)) {
      throw new Error(`Invalid top 10 snapshot: ${gender}`);
    }
    return list.map((rank) => {
      const profile = byId.get(rank.id);
      const player = players.find((p) => p.id === rank.id);
      if (!profile || !player || player.gender !== gender || !countryNames[player.country]) {
        throw new Error(`Missing profile or equipment record: ${rank.id}`);
      }
      if (profile.bio.length < 2 || profile.milestones.length < 4 || profile.game.length < 3 || !profile.sources.length) {
        throw new Error(`Incomplete player profile: ${profile.id}`);
      }
      if (profile.milestones.some((m) => !profile.sources[m.source])) {
        throw new Error(`Missing milestone source: ${profile.id}`);
      }
      if (profile.birthDate && (!/^\d{4}-\d{2}-\d{2}$/.test(profile.birthDate) || Number(profile.birthDate.slice(0, 4)) !== profile.birthYear)) {
        throw new Error(`Invalid birth date: ${profile.id}`);
      }
      for (const source of profile.sources) {
        if (new URL(source.url).protocol !== "https:") throw new Error(`Invalid profile source: ${profile.id}`);
      }
      const { id, name, country, hand, grip, photo } = player;
      return {
        id, name, country, countryName: countryNames[country], gender, hand, grip, photo,
        rank: rank.rank, points: rank.points, headline: profile.headline, specialty: profile.specialty, styleTags: profile.styleTags,
      };
    });
  });
}

export function profileDetail(id: string) {
  const summaries = profileSummaries();
  const summary = summaries.find((p) => p.id === id);
  const profile = byId.get(id);
  if (!summary || !profile) return null;
  const equipment = playerPayload(id);
  if (!equipment) throw new Error(`Missing equipment: ${id}`);
  const name = searchText(summary.name).replace(/[-\s]/g, "");
  const news = blogPostsByLocale.en
    .filter((post) => searchText(`${post.title} ${post.keywords.join(" ")}`).replace(/[-\s]/g, "").includes(name))
    .slice(0, 3)
    .map(({ slug, title, published, description }) => ({ slug, title, published, description }));
  const competition = profileCompetition(id, new Map(summaries.map((p) => [p.id, p.name])));
  const division = summaries.filter((p) => p.gender === summary.gender);
  const comparison: ComparisonPlayer[] = summaries.map((p) => {
    const setup = (p.id === id ? equipment : playerPayload(p.id))?.setup;
    return {
      id: p.id, ittfId: profileRecord(p.id).ittfId, name: p.name, country: p.countryName, division: p.gender,
      rank: p.rank, points: p.points, hand: p.hand, grip: p.grip, specialty: p.specialty,
      pattern: byId.get(p.id)!.game[0].title, monthly: profileRecord(p.id).monthly,
      equipment: setup ? [setupLabel(setup.blade), setupLabel(setup.forehand), setupLabel(setup.backhand)] : [],
    };
  });
  return {
    summary, profile, equipment, competition, snapshot: rankingSnapshot, news,
    comparison: {
      player: comparison.find((p) => p.id === id)!,
      options: comparison.filter((p) => p.id !== id),
    },
    related: division.filter((p) => p.id !== id)
      .sort((a, b) => Math.abs(a.rank - summary.rank) - Math.abs(b.rank - summary.rank)).slice(0, 3),
  };
}
