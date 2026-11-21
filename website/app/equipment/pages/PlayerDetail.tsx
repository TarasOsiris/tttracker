import { data, Link } from "react-router";
import type { Route } from "./+types/PlayerDetail";
import { PageHeader } from "../components/Parts";
import { Credit, ProductThumb } from "../components/Media";
import { ConfidencePill, SetupCell, setupLabel } from "../components/SetupCell";
import { approxDateAttr, flag, formatApproxDate, formatDate } from "../labels";
import type { SetupSlot } from "../models";
import { type ItemVisual, type ResolvedSetupChange, playerPayload } from "../store.server";
import { cn } from "~/lib/utils";
import { profileIds } from "~/players/rankings";
import { absolute, breadcrumbs, equipmentMeta } from "../utils/seo";

export function loader({ params }: Route.LoaderArgs) {
  const payload = playerPayload(params.playerId);
  if (!payload) throw data("Player not found", { status: 404 });
  return payload;
}

const slots = [
  { slot: "blade", label: "Blade" },
  { slot: "forehand", label: "Forehand rubber" },
  { slot: "backhand", label: "Backhand rubber" },
] as const;

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];
  const { player, setup } = loaderData;
  const path = `/equipment/pros/${player.id}`;
  return equipmentMeta({
    title: `${player.name} Equipment ${player.lastVerified.slice(0, 4)}: Blade and Rubbers`,
    description: `${player.name}'s table tennis setup: ${slots
      .filter(({ slot }) => !setup[slot].name.startsWith("Not publicly"))
      .map(({ slot, label }) => `${setupLabel(setup[slot])} (${label.toLowerCase()})`)
      .join(", ") || "what is publicly known"}, with sources and dates.`,
    path,
    image: player.photo && { ...player.photo, alt: player.name },
    jsonLd: [
      breadcrumbs([
        { name: "Pro setups", path: "/equipment/pros" },
        { name: player.name, path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: absolute(path),
        mainEntity: {
          "@type": "Person",
          name: player.name,
          nationality: { "@type": "Country", name: player.country },
          jobTitle: "Table tennis player",
          ...(player.photo ? { image: absolute(player.photo.src) } : {}),
        },
      },
    ],
  });
};

const slotNames: Record<SetupSlot, string> = { blade: "Blade", forehand: "Forehand", backhand: "Backhand" };

/** The product picture, linked to its catalog page; a neutral placeholder keeps rows aligned for off-catalog items. */
function ItemPicture({ visual, name, size }: { visual: ItemVisual | null; name: string; size: "sm" | "lg" }) {
  const box = size === "lg" ? "h-28 w-24" : "h-16 w-14";
  if (!visual) return <span aria-hidden="true" className={cn("shrink-0 rounded-xl border border-dashed bg-secondary/40", box)} />;
  return (
    <Link to={visual.href} tabIndex={-1} aria-hidden="true" title={name} className="shrink-0">
      <ProductThumb photo={visual.photo} fallback={visual.illustration} className={box} />
    </Link>
  );
}

function HistoryItem({ name, visual }: { name: string; visual: ItemVisual | null }) {
  const label = setupLabel({ brandName: visual?.brandName ?? null, name });
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <ItemPicture visual={visual} name={label} size="sm" />
      {visual ? (
        <Link to={visual.href} className="min-w-0 font-medium text-foreground hover:text-primary hover:underline">
          {label}
        </Link>
      ) : (
        <span className="min-w-0 font-medium">{label}</span>
      )}
    </div>
  );
}

function HistoryEntry({ change }: { change: ResolvedSetupChange }) {
  return (
    <li className="relative pl-6">
      <span aria-hidden="true" className="absolute top-2 left-0 size-3 rounded-full border-2 border-primary bg-background" />
      <p className="text-sm">
        <time dateTime={approxDateAttr(change.date, change.precision)} className="font-semibold">
          {formatApproxDate(change.date, change.precision)}
        </time>
        <span className="text-muted-foreground"> · {slotNames[change.slot]}</span>
      </p>
      <div className="mt-2 rounded-2xl border bg-card p-3">
        <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
          <HistoryItem name={change.from} visual={change.fromItem} />
          <span className="self-start pl-5 text-muted-foreground sm:self-auto sm:pl-0">
            <span aria-hidden="true" className="inline-block rotate-90 sm:rotate-0">→</span>
            <span className="sr-only">replaced by</span>
          </span>
          <HistoryItem name={change.to} visual={change.toItem} />
        </div>
        {change.note && <p className="mt-2 text-sm text-muted-foreground">{change.note}</p>}
        <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
          <ConfidencePill confidence={change.confidence} />
          <span>Source:</span>
          <a href={change.source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {change.source.label}
          </a>
        </p>
      </div>
    </li>
  );
}

export default function PlayerDetail({ loaderData }: Route.ComponentProps) {
  const { player, setup, setupVisuals, history } = loaderData;
  return (
    <article className="space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/equipment/pros" className="hover:text-foreground">
          Pro setups
        </Link>{" "}
        / {player.name}
      </nav>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {player.photo && (
          <figure className="shrink-0">
            <img
              src={player.photo.src}
              width={player.photo.width}
              height={player.photo.height}
              alt={player.name}
              fetchPriority="high"
              className="size-40 rounded-3xl bg-secondary object-cover object-top"
            />
            <figcaption className="mt-1 max-w-40 text-[10px] leading-tight text-muted-foreground">
              Photo: <Credit image={player.photo} />
            </figcaption>
          </figure>
        )}
        <PageHeader eyebrow={`${player.gender === "men" ? "Men's" : "Women's"} table tennis`} title={`${player.name}'s equipment`}>
          <p>
            <span aria-hidden="true">{flag(player.country)} </span>
            {player.country}
            {player.hand ? ` · ${player.hand}-handed` : ""}
            {player.grip ? ` · ${player.grip}` : ""}
            {player.ranking && (
              <>
                {" · "}World No. {player.ranking.position} (
                <a href={player.ranking.source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {formatDate(player.ranking.date)}
                </a>
                )
              </>
            )}
          </p>
        </PageHeader>
      </div>

      {profileIds.includes(player.id) && (
        <Link to={`/players/${player.id}`} className="inline-flex rounded-full border px-5 py-3 font-medium text-primary hover:bg-secondary">
          Explore {player.name}’s full player profile
        </Link>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        {slots.map(({ slot, label }) => (
          <div key={slot} className="flex gap-4 rounded-3xl border bg-card p-5">
            {setupVisuals[slot] && <ItemPicture visual={setupVisuals[slot]} name={setupLabel(setup[slot])} size="lg" />}
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
              <div className="mt-2 text-lg">
                <SetupCell item={setup[slot]} slot={slot} detailed />
              </div>
            </div>
          </div>
        ))}
      </section>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Professionals often play with customised or non-retail versions and change equipment between events. Where a variant
        is known it's noted above; the linked product is the closest one you can buy. Last checked {formatDate(player.lastVerified)}.
      </p>

      <section aria-labelledby="history-heading">
        <h2 id="history-heading" className="text-xl font-bold tracking-tight">
          {player.name}'s equipment history
        </h2>
        {history.length > 0 ? (
          <>
            <p className="mt-1 text-sm text-muted-foreground">
              Documented switches, newest first. Each one links to the source that reports it; dates are only as precise as
              that source.
            </p>
            <ol className="relative mt-5 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-[5px] before:w-0.5 before:bg-border">
              {history.map((h) => (
                <HistoryEntry key={`${h.date}-${h.slot}-${h.to}`} change={h} />
              ))}
            </ol>
          </>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">
            We haven't found a dated, sourced record of {player.name}'s earlier equipment yet. Changes are added here as
            sponsors and reputable equipment sites report them.
          </p>
        )}
      </section>

      <p>
        <Link to="/equipment/pros" className="text-sm font-medium text-primary hover:underline">
          ← All pro setups
        </Link>
      </p>
    </article>
  );
}
