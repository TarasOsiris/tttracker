import { data, Link } from "react-router";
import type { Route } from "./+types/PlayerDetail";
import { PageHeader } from "../components/Parts";
import { SetupCell, setupLabel } from "../components/SetupCell";
import { flag, formatDate } from "../labels";
import { playerPayload } from "../store.server";
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
    jsonLd: [
      breadcrumbs([
        { name: "Pro setups", path: "/equipment/pros" },
        { name: player.name, path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: absolute(path),
        mainEntity: { "@type": "Person", name: player.name, nationality: player.country, jobTitle: "Table tennis player" },
      },
    ],
  });
};

export default function PlayerDetail({ loaderData }: Route.ComponentProps) {
  const { player, setup } = loaderData;
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
            <img src={player.photo.src} width={player.photo.width} height={player.photo.height} alt={player.name} className="size-36 rounded-3xl object-cover" />
            <figcaption className="mt-1 max-w-36 text-[10px] text-muted-foreground">
              <a href={player.photo.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {player.photo.credit}
              </a>
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

      <section className="grid gap-4 md:grid-cols-3">
        {slots.map(({ slot, label }) => (
          <div key={slot} className="rounded-3xl border bg-card p-5">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
            <div className="mt-2 text-lg">
              <SetupCell item={setup[slot]} slot={slot} detailed />
            </div>
          </div>
        ))}
      </section>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Professionals often play with customised or non-retail versions and change equipment between events. Where a variant
        is known it's noted above; the linked product is the closest one you can buy. Last checked {formatDate(player.lastVerified)}.
      </p>

      {player.history.length > 0 && (
        <section>
          <h2 className="text-xl font-bold tracking-tight">Equipment changes</h2>
          <ol className="mt-3 space-y-2 text-sm">
            {[...player.history]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((h) => (
                <li key={`${h.date}-${h.slot}`} className="rounded-2xl border bg-card p-3">
                  <span className="text-muted-foreground">{formatDate(h.date)} · {h.slot}:</span> {h.from} → <strong>{h.to}</strong>{" "}
                  <a href={h.source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                    {h.source.label}
                  </a>
                </li>
              ))}
          </ol>
        </section>
      )}

      <p>
        <Link to="/equipment/pros" className="text-sm font-medium text-primary hover:underline">
          ← All pro setups
        </Link>
      </p>
    </article>
  );
}
