import rawProfiles from "./data/profiles.json";
import rawResults from "./data/results.json";
import { matchReplay } from "./replays";
import { profileIds, rankingSnapshot } from "./rankings";
import type { Discipline, Match, MatchEvent, Medal, Participant, ProfileCompetition, ProfileRecord } from "./competition";

const records: Record<string, ProfileRecord> = rawProfiles;
const profileByIttfId = new Map(Object.entries(records).map(([slug, { ittfId }]) => [ittfId, slug]));
const participants: Record<string, Participant> = rawResults.participants;
const events: (MatchEvent & {
  matches: (Omit<Match, "event" | "discipline"> & { discipline: string })[];
  medals: (Omit<Medal, "event"> & { player: string })[];
})[] = rawResults.events;
const matchesByPlayer = new Map<string, Match[]>();
const medalsByPlayer = new Map<string, Medal[]>();

for (const { matches, medals, ...event } of events) {
  for (const { player, ...medal } of medals) {
    const list = medalsByPlayer.get(player) ?? [];
    list.push({ ...medal, event });
    medalsByPlayer.set(player, list);
  }
  for (const match of matches) {
    const playerIds = match.sides.flat();
    const replay = match.discipline === "individualSingles" ? matchReplay(event.id, playerIds) : undefined;
    for (const id of playerIds) {
      if (!profileByIttfId.has(id)) continue;
      const list = matchesByPlayer.get(id) ?? [];
      list.push({ ...match, discipline: match.discipline as Discipline, event, replay });
      matchesByPlayer.set(id, list);
    }
  }
}

for (const slug of profileIds) {
  const record = records[slug];
  if (!record || !matchesByPlayer.get(record.ittfId)?.length || !record.monthly.length) {
    throw new Error(`Missing competition or ranking data for ${slug}`);
  }
}

export function profileRecord(slug: string) {
  return records[slug];
}

export function profileCompetition(slug: string, names: Map<string, string>): ProfileCompetition {
  const record = records[slug];
  const matches = [...(matchesByPlayer.get(record.ittfId) ?? [])]
    .sort((a, b) => b.date.localeCompare(a.date) || (b.time ?? "").localeCompare(a.time ?? "") || a.code.localeCompare(b.code));
  const editions = new Map<string, MatchEvent>();
  const people: Record<string, Participant> = {};
  for (const match of matches) {
    editions.set(match.event.id, match.event);
    for (const id of match.sides.flat()) {
      const profileId = profileByIttfId.get(id);
      people[id] = profileId ? { ...participants[id], name: names.get(profileId) ?? participants[id].name, profileId } : participants[id];
    }
  }
  return {
    ...record,
    matches,
    medals: medalsByPlayer.get(record.ittfId) ?? [],
    editions: [...editions.values()],
    people,
    earliest: matches.at(-1)?.date,
    latest: matches[0]?.date,
    rankingDate: rankingSnapshot.date,
    featured: matches.find((match) => match.replay?.features.includes(slug)),
  };
}
