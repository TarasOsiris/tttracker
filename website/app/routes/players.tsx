import { Search, Users, X } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/players";
import type { PageHandle } from "~/i18n/config";
import { SITE_URL } from "~/content/site";
import { formatDate } from "~/content/blog";
import { seo } from "~/lib/seo";
import { cn } from "~/lib/utils";
import { PlayerCard, RankingNote } from "~/players/components";
import { filterProfiles, type Division } from "~/players/models";
import { rankingSnapshot } from "~/players/rankings";
import { profileSummaries } from "~/players/store.server";
import { breadcrumbList } from "~/serves/utils/seo";

export const handle: PageHandle = { locales: ["en"] };
export const loader = () => ({ players: profileSummaries(), snapshot: rankingSnapshot });
export const shouldRevalidate = () => false;

export const meta: Route.MetaFunction = ({ data }) => [
  ...seo({ title: "Top 10 Table Tennis Players: Men’s & Women’s Profiles", description: "Meet the men’s and women’s top 10: biographies, career milestones, playing styles, equipment and lessons to take into your next table tennis session.", path: "/players", locale: "en", localized: false }),
  { "script:ld+json": breadcrumbList("en", "Home", [{ name: "Player profiles", path: "/players" }]) },
  ...(data ? [{ "script:ld+json": {
    "@context": "https://schema.org", "@type": "CollectionPage", name: "Table tennis player profiles",
    url: `${SITE_URL}/players`, dateModified: data.snapshot.checked,
    mainEntity: {
      "@type": "ItemList", numberOfItems: data.players.length,
      itemListElement: data.players.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}/players/${p.id}` })),
    },
  } }] : []),
];

export default function Players({ loaderData: { players, snapshot } }: Route.ComponentProps) {
  const [params, setParams] = useSearchParams();
  const tour = params.get("tour");
  const division = tour === "men" || tour === "women" ? tour : "all";
  const query = params.get("q") ?? "";
  const visible = filterProfiles(players, division, query);
  const setFilter = (key: string, value: string) => {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value && !(key === "tour" && value === "all")) next.set(key, value);
      else next.delete(key);
      return next;
    }, { replace: true, preventScrollReset: true });
  };

  return (
    <div lang="en" className="px-4 pt-24 pb-20 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-3xl bg-brand-navy px-6 py-10 text-white sm:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -end-20 -top-24 size-80 rounded-full border-[50px] border-white/5" />
          <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_16rem]">
            <div>
              <p className="text-sm font-semibold tracking-widest text-blue-200 uppercase">The player collection</p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-6xl">Meet the players.<br />Understand the game.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">Twenty players at the top of table tennis. Explore their stories, study their styles and bring something new to your own game.</p>
              <a href="#directory" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#16325c] hover:bg-blue-100">Explore player profiles</a>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
              <Users className="size-6 text-blue-200" aria-hidden="true" />
              <p className="mt-4 text-2xl font-bold">10 men. 10 women.</p>
              <p className="mt-2 text-sm leading-relaxed text-blue-100">ITTF singles top 10<br />Week {snapshot.week} · {formatDate(snapshot.date)}</p>
              <p className="mt-4 border-t border-white/20 pt-4 text-sm text-blue-100">Biography · Career · Playing style · Equipment · Practice ideas</p>
            </div>
          </div>
        </section>

        <section id="directory" aria-labelledby="directory-heading" className="scroll-mt-24 pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">Find your next player to study</p>
              <h2 id="directory-heading" className="mt-2 font-display text-3xl font-bold tracking-tight">Player profiles</h2>
            </div>
            <Link to="/equipment/pros" className="text-sm font-medium text-primary underline underline-offset-4">Browse all pro equipment setups</Link>
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border bg-card p-4 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Singles division">
              {([ ["all", "All players"], ["men", "Men’s top 10"], ["women", "Women’s top 10"] ] as const).map(([value, label]) => (
                <button key={value} type="button" onClick={() => setFilter("tour", value)} aria-pressed={division === value}
                  className={cn("cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-colors", division === value ? "bg-primary text-primary-foreground" : "bg-secondary/60 hover:bg-secondary")}>
                  {label}
                </button>
              ))}
            </div>
            <div className="w-full md:max-w-sm">
              <label htmlFor="player-search" className="mb-2 block text-sm font-medium">Search players, countries or styles</label>
              <div className="relative">
                <Search aria-hidden="true" className="pointer-events-none absolute start-3 top-3 size-5 text-muted-foreground" />
                <input id="player-search" type="search" value={query} onChange={(e) => setFilter("q", e.target.value)} placeholder="Try Lebrun, Japan or penhold"
                  className="h-11 w-full rounded-xl border bg-background pe-10 ps-10 text-base focus-visible:outline-2 focus-visible:outline-primary" />
                {query && <button type="button" aria-label="Clear search" onClick={() => setFilter("q", "")}
                  className="absolute end-1 top-1 flex size-9 cursor-pointer items-center justify-center rounded-lg hover:bg-secondary"><X className="size-4" aria-hidden="true" /></button>}
              </div>
            </div>
          </div>
          <p role="status" className="mt-4 text-sm text-muted-foreground">{visible.length} of 20 profiles{query.trim() ? ` matching “${query.trim()}”` : ""}</p>
          {(["men", "women"] as Division[]).map((gender) => {
            const group = visible.filter((p) => p.gender === gender);
            if (!group.length) return null;
            return (
              <section key={gender} aria-labelledby={`${gender}-heading`} className="mt-8">
                <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b pb-4">
                  <h2 id={`${gender}-heading`} className="font-display text-2xl font-bold">{gender === "men" ? "Men’s singles" : "Women’s singles"}</h2>
                  <p className="text-sm text-muted-foreground">World ranking order · {group.length} profiles</p>
                </div>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{group.map((player) => <PlayerCard key={player.id} player={player} />)}</ul>
              </section>
            );
          })}
          {!visible.length && <div className="mt-8 rounded-2xl border border-dashed p-10 text-center">
            <h3 className="text-xl font-semibold">No players found</h3>
            <p className="mt-3 text-muted-foreground">Try a different name, country or playing style, or show the full collection.</p>
            <button type="button" onClick={() => setParams({}, { replace: true, preventScrollReset: true })} className="mt-5 cursor-pointer rounded-full bg-primary px-5 py-3 font-medium text-primary-foreground">Show all 20 players</button>
          </div>}
          <div className="mt-10 rounded-2xl border bg-surface-low p-5 sm:p-6">
            <RankingNote date={snapshot.date} week={snapshot.week} officialUrl={snapshot.officialUrl} />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Selection checked {formatDate(snapshot.checked)}. Publication date from ITTF; positions and points read from ranking mirrors and cross-checked. Profiles are in English.</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">{snapshot.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">{s.label}</a></li>)}</ul>
          </div>
        </section>
      </div>
    </div>
  );
}
