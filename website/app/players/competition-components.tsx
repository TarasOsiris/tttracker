import { useId, useState } from "react";
import { Link } from "react-router";
import { formatDate } from "~/content/blog";
import {
  comebackWin, disciplines, matchRecord, matchWon, medalNames, playerSide, rankingMovement, wasDecidingGame, wttEventUrl, wttMedalsUrl,
  type ComparisonPlayer, type Discipline, type Match, type MonthlyRank, type Participant, type ProfileCompetition,
} from "./competition";

const monthLabel = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
const shortMonth = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
const monthDate = (month: string) => new Date(`${month}-01T00:00:00Z`);
const selectClass = "block w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground";
const textLink = "font-medium text-primary underline underline-offset-4";
const sectionHeading = "font-display text-2xl font-bold tracking-tight sm:text-3xl";
const rankColors = ["var(--primary)", "var(--tertiary)"];

function ResultBadge({ win }: { win: boolean }) {
  return <span className={`inline-flex min-w-8 justify-center rounded-md border px-2 py-1 text-xs font-bold ${win ? "border-emerald-600/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-muted text-muted-foreground"}`}>
    <span aria-hidden="true">{win ? "W" : "L"}</span><span className="sr-only">{win ? "Win" : "Loss"}</span>
  </span>;
}

function LinkedPlayer({ person }: { person: Participant }) {
  return person.profileId ? <Link className={textLink} to={`/players/${person.profileId}`}>{person.name}</Link> : <>{person.name}</>;
}

function teamName(ids: string[], people: ProfileCompetition["people"]) {
  return ids.map((id) => people[id].name).join(" / ");
}

function seriesPath(points: MonthlyRank[], months: string[], x: (i: number) => number, y: (rank: number) => number) {
  let previous = -2;
  return points.flatMap(({ month, rank }) => {
    if (rank === null) return [];
    const index = months.indexOf(month);
    const command = index === previous + 1 ? "L" : "M";
    previous = index;
    return `${command}${x(index)},${y(rank)}`;
  }).join(" ");
}

function RankChart({ series }: { series: { name: string; points: MonthlyRank[] }[] }) {
  const titleId = useId();
  const months = [...new Set(series.flatMap(({ points }) => points.map(({ month }) => month)))].sort();
  const ranks = series.flatMap(({ points }) => points.flatMap(({ rank }) => rank === null ? [] : [rank]));
  if (ranks.length < 2) return null;
  const maximum = Math.max(5, ...ranks);
  const increment = maximum > 75 ? 25 : maximum > 25 ? 10 : maximum > 10 ? 5 : 2;
  const bottomRank = Math.ceil(maximum / increment) * increment;
  const ticks = [1, ...Array.from({ length: bottomRank / increment }, (_, index) => (index + 1) * increment)];
  const x = (index: number) => 42 + index * 474 / Math.max(1, months.length - 1);
  const y = (rank: number) => 17 + (rank - 1) * 130 / (bottomRank - 1);
  const labels = months.length > 5 ? new Set([0, 3, 6, 9, months.length - 1]) : new Set(months.map((_, i) => i));
  return <div>
    <svg className="block w-full" viewBox="0 0 540 180" role="img" aria-labelledby={titleId}>
      <title id={titleId}>{`Monthly singles ranking for ${series.map(({ name }) => name).join(" and ")}. Number one is at the top. Exact ranks appear in the table below.`}</title>
      {ticks.map((rank) => <g key={rank}>
        <line x1="42" x2="516" y1={y(rank)} y2={y(rank)} stroke="var(--border)" />
        <text x="35" y={y(rank) + 4} textAnchor="end" fontSize="13" fill="var(--muted-foreground)">#{rank}</text>
      </g>)}
      {months.map((month, index) => labels.has(index) && <text key={month} x={x(index)} y="170" textAnchor="middle" fontSize="14" fill="var(--muted-foreground)">{shortMonth.format(monthDate(month))}</text>)}
      {series.map(({ name, points }, index) => <g key={name}>
        <path d={seriesPath(points, months, x, y)} fill="none" stroke={rankColors[index]} strokeWidth="3" strokeDasharray={index ? "7 4" : undefined} />
        {points.map(({ month, rank }) => rank !== null && <circle key={month} cx={x(months.indexOf(month))} cy={y(rank)} r="3.5" fill={rankColors[index]}>
          <title>{`${name} · ${monthLabel.format(monthDate(month))} · #${rank}`}</title>
        </circle>)}
      </g>)}
    </svg>
    {series.length > 1 && <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
      {series.map(({ name }, i) => <li className="flex items-center gap-2" key={name}>
        <span aria-hidden="true" className={`w-5 border-t-2 ${i ? "border-dashed" : ""}`} style={{ borderColor: rankColors[i] }} />{name}
      </li>)}
    </ul>}
    <details className="text-sm">
      <summary className="cursor-pointer font-medium text-primary">View monthly rankings as a table</summary>
      <table className="mt-2 w-full text-left">
        <thead><tr className="border-b"><th scope="col" className="py-2">Month</th>{series.map(({ name }) => <th scope="col" key={name}>{name}</th>)}</tr></thead>
        <tbody>{[...months].reverse().map((month) => <tr className="border-b last:border-b-0" key={month}>
          <th scope="row" className="py-2 font-normal">{monthLabel.format(monthDate(month))}</th>
          {series.map(({ name, points }) => <td key={name}>{points.find((point) => point.month === month)?.rank ?? "—"}</td>)}
        </tr>)}</tbody>
      </table>
    </details>
  </div>;
}

export function RecentForm({ data }: { data: ProfileCompetition }) {
  const recent = data.matches.filter((match) => match.discipline === "individualSingles").slice(0, 5);
  if (!recent.length) return null;
  return <div className="rounded-2xl border bg-card p-5 sm:p-6">
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="font-display text-lg font-bold">Last {recent.length} recorded singles matches</h2>
      <a href="#results" className={`text-sm ${textLink}`}>All results</a>
    </div>
    <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
      {recent.map((match) => {
        const side = playerSide(match, data.ittfId);
        const opponent = teamName(match.sides[1 - side], data.people);
        const score = `${match.gamesWon[side]}–${match.gamesWon[1 - side]}`;
        return <li key={`${match.event.id}-${match.code}`} title={`${opponent} · ${match.event.name}`} className="min-w-0 rounded-lg bg-surface-low px-2 py-2">
          <div className="flex flex-wrap items-center gap-1.5"><ResultBadge win={matchWon(match, data.ittfId)} /><span className="text-sm font-semibold tabular-nums">{score}</span></div>
          <p className="mt-1 text-xs leading-snug break-words text-muted-foreground">{opponent}</p>
        </li>;
      })}
    </ul>
    <p className="mt-3 text-xs text-muted-foreground">Most recent first · Through {formatDate(recent[0].date)}</p>
  </div>;
}

export function Rankings({ data, name, rank, points }: { data: ProfileCompetition; name: string; rank: number; points: number }) {
  const monthly = data.monthly.flatMap((p) => p.rank === null ? [] : [p.rank]);
  const best = monthly.length ? Math.min(...monthly) : undefined;
  const doubles = [
    ["MDI", "Men’s doubles"], ["WDI", "Women’s doubles"], ["XDI", "Mixed doubles"],
  ] as const;
  return <section id="rankings" className="mt-14 scroll-mt-24" aria-labelledby="rankings-title">
    <h2 id="rankings-title" className={sectionHeading}>World ranking</h2>
    <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_2fr]">
      <dl className="grid grid-cols-2 gap-5 rounded-2xl border bg-card p-5 sm:p-6">
        <div><dt className="text-sm text-muted-foreground">Singles rank</dt><dd className="mt-1 text-2xl font-bold">#{rank}</dd></div>
        <div><dt className="text-sm text-muted-foreground">Singles points</dt><dd className="mt-1 text-2xl font-bold">{points.toLocaleString("en-US")}</dd></div>
        <div><dt className="text-sm text-muted-foreground">Since previous week</dt><dd className="mt-1 font-semibold">{rankingMovement(rank, data.previousRank)}</dd></div>
        {best !== undefined && <div><dt className="text-sm text-muted-foreground">Best monthly rank shown</dt><dd className="mt-1 font-semibold">#{best}</dd></div>}
        {doubles.map(([key, label]) => {
          const value = data.doubles[key];
          return value && <div key={key}><dt className="text-sm text-muted-foreground">{label} · individual</dt>
            <dd className="mt-1 font-semibold">#{value.rank} <span className="text-sm font-normal text-muted-foreground">· {value.points.toLocaleString("en-US")} pts</span></dd>
          </div>;
        })}
        <div className="col-span-2 text-xs text-muted-foreground">ITTF rankings published {formatDate(data.rankingDate)}</div>
      </dl>
      <div className="rounded-2xl border bg-card p-5 sm:p-6">
        <h3 className="mb-2 font-semibold">Singles rank by month</h3>
        <RankChart series={[{ name, points: data.monthly }]} />
        <p className="mt-3 text-xs text-muted-foreground">
          One snapshot per month. <a href={data.monthlySource} className={textLink}>Tabletennis Reference</a> tracks the published ITTF lists.
        </p>
      </div>
    </div>
  </section>;
}

function MatchRow({ match, data }: { match: Match; data: ProfileCompetition }) {
  const side = playerSide(match, data.ittfId);
  const opponents = match.sides[1 - side];
  const partner = match.sides[side].find((id) => id !== data.ittfId);
  return <tr className="border-b align-top last:border-b-0">
    <td className="px-3 py-3"><time dateTime={match.date} className="whitespace-nowrap">{formatDate(match.date)}</time>
      <a href={wttEventUrl(match.event)} className={`mt-1 block min-w-36 ${textLink}`}>{match.event.name}</a>
      <p className="mt-1 text-xs text-muted-foreground">{disciplines[match.discipline]} · {match.round}</p>
      {match.event.dateSource && <a href={match.event.dateSource} className={`text-xs ${textLink}`}>Olympic results book</a>}
    </td>
    <td className="px-3 py-3">
      <ul>{opponents.map((id) => <li key={id} className="min-w-24"><LinkedPlayer person={data.people[id]} /></li>)}</ul>
      {partner && <p className="mt-1 text-xs text-muted-foreground">With <LinkedPlayer person={data.people[partner]} /></p>}
      {match.entryRanks?.[1 - side] && <p className="mt-1 text-xs text-muted-foreground">Entry rank #{match.entryRanks[1 - side]}</p>}
      {match.seeds?.[1 - side] && <p className="text-xs text-muted-foreground">Seed {match.seeds[1 - side]}</p>}
    </td>
    <td className="px-3 py-3">
      <div className="flex items-center gap-2 whitespace-nowrap">
        <ResultBadge win={matchWon(match, data.ittfId)} /><strong className="tabular-nums">{match.gamesWon[side]}–{match.gamesWon[1 - side]}</strong>
      </div>
      {!!match.games.length && <p className="mt-1 min-w-28 text-xs leading-relaxed text-muted-foreground">
        <span className="sr-only">Game scores: </span>{match.games.map((game) => `${game[side]}–${game[1 - side]}`).join(", ")}
      </p>}
      {match.replay && <a href={match.replay.url} className={`mt-1 block text-xs ${textLink}`}>{match.replay.kind}</a>}
    </td>
  </tr>;
}

export function MatchExplorer({ data }: { data: ProfileCompetition }) {
  const [year, setYear] = useState("all");
  const [discipline, setDiscipline] = useState<Discipline | "all">("individualSingles");
  const [opponent, setOpponent] = useState("all");
  const [event, setEvent] = useState("all");
  const [limit, setLimit] = useState(12);
  const years = [...new Set(data.matches.map((match) => match.date.slice(0, 4)))];
  const eligible = data.matches.filter((match) => (year === "all" || match.date.startsWith(year)) && (discipline === "all" || match.discipline === discipline));
  const events = [...new Map(eligible.map((match) => [match.event.id, match.event])).values()];
  const eventMatches = eligible.filter((match) => event === "all" || match.event.id === event);
  const opponents = [...new Set(eventMatches.flatMap((match) => match.sides[1 - playerSide(match, data.ittfId)]))]
    .sort((a, b) => data.people[a].name.localeCompare(data.people[b].name));
  const selected = eventMatches.filter((match) => opponent === "all" || match.sides[1 - playerSide(match, data.ittfId)].includes(opponent));
  const record = matchRecord(selected, data.ittfId);
  const deciding = matchRecord(selected.filter(wasDecidingGame), data.ittfId);
  const comebackCount = selected.filter((m) => comebackWin(m, data.ittfId)).length;
  const topTen = selected.filter((match) => {
    const rank = match.entryRanks?.[1 - playerSide(match, data.ittfId)];
    return rank != null && rank <= 10;
  });
  const topTenRecord = matchRecord(topTen, data.ittfId);
  const upsets = selected.flatMap((match) => {
    const side = playerSide(match, data.ittfId);
    const ownRank = match.entryRanks?.[side];
    const rivalRank = match.entryRanks?.[1 - side];
    return ownRank && rivalRank && ownRank > rivalRank && matchWon(match, data.ittfId)
      ? [{ match, opponent: data.people[match.sides[1 - side][0]].name, gap: ownRank - rivalRank, ownRank, rivalRank }]
      : [];
  });
  const upset = upsets.sort((a, b) => b.gap - a.gap)[0];

  function resetEvent() {
    setEvent("all");
    setOpponent("all");
    setLimit(12);
  }

  return <section id="results" className="mt-14 scroll-mt-24" aria-labelledby="results-title">
    <h2 id="results-title" className={sectionHeading}>Match results</h2>
    {data.earliest && data.latest && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
      {data.matches.length} completed matches across {data.editions.length} archived events, {formatDate(data.earliest)} to {formatDate(data.latest)}. Records reflect events with available official scores.
    </p>}
    <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <label className="space-y-1 text-sm font-medium">Discipline
        <select className={selectClass} value={discipline} onChange={(e) => { setDiscipline(e.target.value as Discipline | "all"); resetEvent(); }}>
          <option value="all">All disciplines</option>
          {Object.entries(disciplines).filter(([key]) => data.matches.some((match) => match.discipline === key)).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
      </label>
      <label className="space-y-1 text-sm font-medium">Season
        <select className={selectClass} value={year} onChange={(e) => { setYear(e.target.value); resetEvent(); }}>
          <option value="all">All seasons</option>{years.map((year) => <option key={year}>{year}</option>)}
        </select>
      </label>
      <label className="space-y-1 text-sm font-medium">Event
        <select className={selectClass} value={event} onChange={(e) => { setEvent(e.target.value); setOpponent("all"); setLimit(12); }}>
          <option value="all">All events</option>{events.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
      </label>
      <label className="space-y-1 text-sm font-medium">Opponent
        <select className={selectClass} value={opponent} onChange={(e) => { setOpponent(e.target.value); setLimit(12); }}>
          <option value="all">All opponents</option>{opponents.map((id) => <option key={id} value={id}>{data.people[id].name}</option>)}
        </select>
      </label>
    </div>
    <dl aria-live="polite" className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border bg-surface-low p-4 sm:grid-cols-4">
      <div><dt className="text-xs text-muted-foreground">Matches</dt><dd className="mt-1 font-bold tabular-nums">{selected.length}</dd></div>
      <div><dt className="text-xs text-muted-foreground">Wins–losses</dt><dd className="mt-1 font-bold tabular-nums">{record.wins}–{record.losses}</dd></div>
      <div><dt className="text-xs text-muted-foreground">Deciding-game W–L</dt><dd className="mt-1 font-bold tabular-nums">{deciding.wins}–{deciding.losses}</dd></div>
      <div><dt className="text-xs text-muted-foreground">Wins from two games down</dt><dd className="mt-1 font-bold tabular-nums">{comebackCount}</dd></div>
    </dl>
    {(topTen.length > 0 || upset) && <div className="mt-4 flex flex-wrap gap-3 text-sm">
      {topTen.length > 0 && <p className="rounded-lg border bg-card px-3 py-2">
        <strong>{topTenRecord.wins}–{topTenRecord.losses}</strong> vs top-10 players by event entry rank
      </p>}
      {upset && <p className="rounded-lg border bg-card px-3 py-2">
        Biggest entry-rank upset · <strong>#{upset.ownRank} over #{upset.rivalRank} {upset.opponent}</strong> · <a href={wttEventUrl(upset.match.event)} className={textLink}>{upset.match.event.name}</a>
      </p>}
    </div>}
    {selected.length ? <>
      <div className="mt-4 overflow-x-auto rounded-xl border bg-card" tabIndex={0} role="region" aria-label="Match scorelines">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Results with scores from this player’s perspective</caption>
          <thead className="border-b bg-surface-low"><tr><th scope="col" className="px-3 py-2">Event</th><th scope="col" className="px-3 py-2">Opponent</th><th scope="col" className="px-3 py-2">Score</th></tr></thead>
          <tbody>{selected.slice(0, limit).map((match) => <MatchRow key={`${match.event.id}-${match.code}`} match={match} data={data} />)}</tbody>
        </table>
      </div>
      {limit < selected.length && <button type="button" className="mt-4 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold text-primary hover:bg-accent"
        onClick={() => setLimit((n) => n + 12)}>Show more matches <span className="font-normal">({limit} of {selected.length} shown)</span></button>}
    </> : <p role="status" className="mt-5 text-sm text-muted-foreground">No recorded matches for these filters.</p>}
  </section>;
}

export function CareerResults({ data }: { data: ProfileCompetition }) {
  const [discipline, setDiscipline] = useState("all");
  const [season, setSeason] = useState("all");
  const years = [...new Set(data.medals.map(({ event }) => event.year))].sort((a, b) => b - a);
  const categories = [...new Set(data.medals.map((medal) => medal.discipline))].sort();
  const medals = data.medals.filter((medal) => (discipline === "all" || medal.discipline === discipline)
    && (season === "all" || medal.event.year === Number(season)));
  if (!data.medals.length) return null;
  return <div className="mt-6 rounded-2xl border bg-card p-5 sm:p-6">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h3 className="font-display text-xl font-bold">Medals and podium finishes</h3>
        <p className="mt-1 text-sm text-muted-foreground">From official WTT tournament medal tables in the archive.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <label className="space-y-1 text-sm font-medium">Discipline
          <select className={selectClass} value={discipline} onChange={(e) => setDiscipline(e.target.value)}>
            <option value="all">All disciplines</option>{categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="space-y-1 text-sm font-medium">Season
          <select className={selectClass} value={season} onChange={(e) => setSeason(e.target.value)}>
            <option value="all">All seasons</option>{years.map((year) => <option key={year}>{year}</option>)}
          </select>
        </label>
      </div>
    </div>
    <dl aria-live="polite" className="mt-4 grid grid-cols-3 gap-2">
      {medalNames.map((name, index) => <div key={name} className="rounded-lg bg-surface-low px-3 py-2">
        <dt className="text-xs text-muted-foreground">{name}</dt><dd className="text-lg font-bold tabular-nums">{medals.filter((medal) => medal.place === index + 1).length}</dd>
      </div>)}
    </dl>
    {medals.length > 0 ? <details className="mt-4 text-sm">
      <summary className="cursor-pointer font-semibold text-primary">Show {medals.length} podium finishes</summary>
      <ul className="mt-2 divide-y">
        {medals.map((medal) => <li className="flex flex-wrap justify-between gap-x-3 gap-y-1 py-2" key={`${medal.event.id}-${medal.discipline}`}>
          <div>
            <a href={wttEventUrl(medal.event)} className={textLink}>{medal.event.name}</a>
            <p className="text-xs text-muted-foreground">{medal.event.year} · {medal.discipline}</p>
          </div>
          <a href={wttMedalsUrl(medal.event.id)} className={textLink} aria-label={`${medalNames[medal.place - 1]} · official podium for ${medal.event.name}`}>{medalNames[medal.place - 1]}</a>
        </li>)}
      </ul>
    </details> : <p className="mt-4 text-sm text-muted-foreground">No recorded podium finishes for these filters.</p>}
  </div>;
}

export function DoublesPartners({ data }: { data: ProfileCompetition }) {
  const partners = new Map<string, Match[]>();
  for (const match of data.matches) {
    const partner = match.sides[playerSide(match, data.ittfId)].find((id) => id !== data.ittfId);
    if (partner) partners.set(partner, [...(partners.get(partner) ?? []), match]);
  }
  if (!partners.size) return null;
  return <details className="mt-5 rounded-xl border bg-card p-4">
    <summary className="cursor-pointer font-semibold">Doubles partners in the archive ({partners.size})</summary>
    <ul className="mt-2 divide-y text-sm">
      {[...partners].sort((a, b) => b[1].length - a[1].length || data.people[a[0]].name.localeCompare(data.people[b[0]].name)).map(([id, matches]) => {
        const record = matchRecord(matches, data.ittfId);
        return <li className="flex justify-between gap-3 py-2" key={id}><LinkedPlayer person={data.people[id]} /><span className="shrink-0 text-muted-foreground">{record.wins} wins · {record.losses} losses</span></li>;
      })}
    </ul>
  </details>;
}

export function PlayerComparison({ player, options, data }: { player: ComparisonPlayer; options: ComparisonPlayer[]; data: ProfileCompetition }) {
  const [selected, setSelected] = useState("");
  const opponent = options.find((option) => option.id === selected);
  const singlesByOpponent = new Map<string, Match[]>();
  for (const match of data.matches) {
    if (match.discipline !== "individualSingles" && match.discipline !== "teamSingles") continue;
    const [other] = match.sides[1 - playerSide(match, player.ittfId)];
    const meetings = singlesByOpponent.get(other) ?? [];
    meetings.push(match);
    singlesByOpponent.set(other, meetings);
  }
  const meetings = singlesByOpponent.get(opponent?.ittfId ?? "") ?? [];
  const rivals = options.map((option) => ({ ...option, count: singlesByOpponent.get(option.ittfId)?.length ?? 0 }))
    .filter((option) => option.count > 0).sort((a, b) => b.count - a.count).slice(0, 3);
  const record = matchRecord(meetings, player.ittfId);
  const latest = meetings[0];
  const rows = [
    ["Singles division", (p: ComparisonPlayer) => p.division === "men" ? "Men’s" : "Women’s"],
    ["World rank", (p: ComparisonPlayer) => `#${p.rank} · ${p.points.toLocaleString("en-US")} pts`],
    ["Country", (p: ComparisonPlayer) => p.country],
    ["Playing hand", (p: ComparisonPlayer) => p.hand ? `${p.hand}-handed` : "—"],
    ["Grip", (p: ComparisonPlayer) => p.grip ?? "—"],
    ["Style", (p: ComparisonPlayer) => p.specialty],
    ["Pattern to watch", (p: ComparisonPlayer) => p.pattern],
    ["Blade", (p: ComparisonPlayer) => p.equipment[0]],
    ["Forehand rubber", (p: ComparisonPlayer) => p.equipment[1]],
    ["Backhand rubber", (p: ComparisonPlayer) => p.equipment[2]],
  ] as const;
  return <section id="compare" className="mt-14 scroll-mt-24" aria-labelledby="compare-title">
    <h2 id="compare-title" className={sectionHeading}>Compare players</h2>
    <label className="mt-4 block max-w-sm space-y-1 text-sm font-medium">Compare {player.name} with
      <select className={selectClass} value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="">Choose a player</option>
        {(["men", "women"] as const).map((division) => <optgroup key={division} label={division === "men" ? "Men’s singles" : "Women’s singles"}>
          {options.filter((option) => option.division === division).map((option) => <option value={option.id} key={option.id}>{option.name}</option>)}
        </optgroup>)}
      </select>
    </label>
    {rivals.length > 0 && <div className="mt-3 flex flex-wrap items-center gap-2">
      <p className="text-xs text-muted-foreground">Most recorded meetings</p>
      {rivals.map((rival) => <button key={rival.id} type="button" aria-pressed={rival.id === selected}
        onClick={() => setSelected(rival.id)} className="cursor-pointer rounded-full border bg-card px-3 py-1 text-xs font-medium hover:bg-accent aria-pressed:bg-accent">
        {rival.name} · {rival.count}
      </button>)}
    </div>}
    {opponent && <div className="mt-4 grid gap-4">
      <div className="rounded-2xl border bg-card p-4 sm:p-6" aria-live="polite">
        <h3 className="font-display text-lg font-bold">Singles head-to-head</h3>
        {latest ? <>
          <p className="mt-1 text-sm">{player.name} won <strong>{record.wins}</strong> and {opponent.name} won <strong>{record.losses}</strong> in {meetings.length} recorded meetings.</p>
          <p className="mt-1 text-sm text-muted-foreground">Latest meeting · {formatDate(latest.date)} · <a className={textLink} href={wttEventUrl(latest.event)}>{latest.event.name}</a></p>
          <details className="mt-3 text-sm"><summary className="cursor-pointer font-medium text-primary">Show all meetings</summary>
            <div className="mt-2 overflow-x-auto" tabIndex={0} role="region" aria-label="Head-to-head match scores">
              <table className="w-full text-left"><thead className="border-b"><tr><th scope="col" className="px-3 py-2">Event</th><th scope="col" className="px-3 py-2">Opponent</th><th scope="col" className="px-3 py-2">Score</th></tr></thead>
                <tbody>{meetings.map((match) => <MatchRow key={`${match.event.id}-${match.code}`} match={match} data={data} />)}</tbody>
              </table>
            </div>
          </details>
        </> : <p className="mt-1 text-sm text-muted-foreground">
          {player.division !== opponent.division ? "These players compete in different singles divisions." : "No recorded singles meetings in the archive."}
        </p>}
      </div>
      <div className="rounded-2xl border bg-card p-4 sm:p-6">
        <h3 className="mb-2 font-display text-lg font-bold">Monthly singles rank</h3>
        <RankChart series={[{ name: player.name, points: player.monthly }, { name: opponent.name, points: opponent.monthly }]} />
      </div>
      <table className="w-full table-fixed rounded-2xl bg-card text-left text-sm break-words">
        <thead className="border-b"><tr><th scope="col" className="w-1/4 px-2 py-3">Profile</th>
          <th scope="col" className="px-2 py-3">{player.name}</th>
          <th scope="col" className="px-2 py-3"><Link to={`/players/${opponent.id}`} className={textLink}>{opponent.name}</Link></th>
        </tr></thead>
        <tbody>{rows.map(([label, value]) => <tr className="border-b align-top" key={label}>
          <th scope="row" className="px-2 py-3 font-medium">{label}</th><td className="px-2 py-3">{value(player)}</td><td className="px-2 py-3">{value(opponent)}</td>
        </tr>)}</tbody>
      </table>
    </div>}
  </section>;
}
