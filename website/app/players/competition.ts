import type { Division } from "./models";

export type Discipline = "individualSingles" | "individualDoubles" | "mixedDoubles" | "teamSingles" | "teamDoubles";

export const disciplines: Record<Discipline, string> = {
  individualSingles: "Singles",
  individualDoubles: "Doubles",
  mixedDoubles: "Mixed doubles",
  teamSingles: "Team · singles",
  teamDoubles: "Team · doubles",
};

export type MatchEvent = { id: string; name: string; year: number; dateSource?: string };

export type Medal = {
  discipline: string;
  place: number;
  event: MatchEvent;
};

export const medalNames = ["Gold", "Silver", "Bronze"] as const;
export type Match = {
  code: string;
  date: string;
  time?: string;
  round: string;
  discipline: Discipline;
  sides: string[][];
  gamesWon: number[];
  games: number[][];
  bestOf: number;
  fixedGames?: boolean;
  entryRanks?: (number | null)[];
  seeds?: (number | null)[];
  event: MatchEvent;
  replay?: { url: string; kind: "Highlights" | "Full match"; features: string[] };
};

export type Participant = { name: string; country?: string; profileId?: string };
export type MonthlyRank = { month: string; rank: number | null };
export type RankValue = { rank: number; points: number };
export type ProfileRecord = {
  ittfId: string;
  wttName: string;
  monthlySource: string;
  monthly: MonthlyRank[];
  previousRank: number;
  doubles: Partial<Record<"MDI" | "WDI" | "XDI", RankValue>>;
};

export type ProfileCompetition = ProfileRecord & {
  matches: Match[];
  medals: Medal[];
  editions: MatchEvent[];
  people: Record<string, Participant>;
  earliest?: string;
  latest?: string;
  rankingDate: string;
  featured?: Match;
};

export type ComparisonPlayer = {
  id: string;
  ittfId: string;
  name: string;
  country: string;
  division: Division;
  rank: number;
  points: number;
  hand: string | null;
  grip: string | null;
  specialty: string;
  pattern: string;
  monthly: MonthlyRank[];
  equipment: string[];
};

export function playerSide(match: Match, player: string) {
  return match.sides[0].includes(player) ? 0 : 1;
}

export function matchWon(match: Match, player: string) {
  const side = playerSide(match, player);
  return match.gamesWon[side] > match.gamesWon[1 - side];
}

export function matchRecord(matches: Match[], player: string) {
  const wins = matches.filter((match) => matchWon(match, player)).length;
  return { wins, losses: matches.length - wins };
}

export function wasDecidingGame(match: Match) {
  if (match.fixedGames) {
    const [first, second] = match.games;
    return Boolean(first && second && (first[0] > first[1]) !== (second[0] > second[1]));
  }
  return match.gamesWon[0] + match.gamesWon[1] === match.bestOf;
}

export function comebackWin(match: Match, player: string) {
  if (match.games.length < 3 || !matchWon(match, player)) return false;
  const side = playerSide(match, player);
  return match.games.slice(0, 2).every((game) => game[side] < game[1 - side]);
}

export function rankingMovement(rank: number, previous: number) {
  if (!previous) return "New to this list";
  if (rank === previous) return "No change";
  const movement = Math.abs(previous - rank);
  return `${rank < previous ? "Up" : "Down"} ${movement}`;
}

export function wttEventUrl(event: MatchEvent) {
  return `https://www.worldtabletennis.com/eventInfo?eventId=${event.id}&selectedTab=Results`;
}

export const wttProfileUrl = (id: string) => `https://www.worldtabletennis.com/playerDescription?playerId=${id}`;

export const wttMedalsUrl = (id: string) => `https://mobileappapi.worldtabletennis.com/api/cms/GetEventMedalists/${id}`;
