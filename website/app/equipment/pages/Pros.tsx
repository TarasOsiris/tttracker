import { Link } from "react-router";
import type { Route } from "./+types/Pros";
import { BrandLogo, PlayerAvatar, ProductThumb } from "../components/Media";
import { PageHeader } from "../components/Parts";
import { ConfidencePill, SetupCell } from "../components/SetupCell";
import { confidenceLabels, flag, formatDate } from "../labels";
import type { Confidence } from "../models";
import { type PlayerRow, prosPayload } from "../store.server";
import { absolute, breadcrumbs, equipmentMeta } from "../utils/seo";

export function loader() {
  return prosPayload();
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  equipmentMeta({
    title: "Pro Table Tennis Players' Equipment: Blades and Rubbers of the Top Players",
    description: `What blades and rubbers the world's top table tennis players use: ${loaderData?.rows.length ?? 0} pros' setups with sources and dates, updated weekly.`,
    path: "/equipment/pros",
    jsonLd: [
      breadcrumbs([{ name: "Pro setups", path: "/equipment/pros" }]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Pro table tennis player setups",
        itemListElement: (loaderData?.rows ?? []).map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absolute(`/equipment/pros/${p.id}`) })),
      },
    ],
  });

function latestCheck(rows: PlayerRow[]): string | null {
  return rows.reduce<string | null>((max, r) => (!max || r.lastVerified > max ? r.lastVerified : max), null);
}

function SetupTable({ rows, title }: { rows: PlayerRow[]; title: string }) {
  if (!rows.length) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 overflow-x-auto rounded-3xl border bg-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b text-start text-muted-foreground">
              <th className="w-14 p-3 text-start font-medium">Rank</th>
              <th className="p-3 text-start font-medium">Player</th>
              <th className="p-3 text-start font-medium">Blade</th>
              <th className="p-3 text-start font-medium">Forehand</th>
              <th className="p-3 text-start font-medium">Backhand</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((p) => (
              <tr key={p.id} className="align-top">
                <td className="p-3 font-display text-lg font-extrabold text-primary">{p.ranking?.position ?? "—"}</td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <PlayerAvatar photo={p.photo} name={p.name} country={p.country} className="size-11" />
                    <div>
                      <Link to={`/equipment/pros/${p.id}`} className="font-semibold hover:text-primary hover:underline">
                        <span aria-hidden="true">{flag(p.country)} </span>
                        {p.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {p.country}
                        {p.hand ? ` · ${p.hand}-handed` : ""}
                        {p.grip ? ` · ${p.grip}` : ""}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <SetupCell item={p.setup.blade} slot="blade" />
                </td>
                <td className="p-3">
                  <SetupCell item={p.setup.forehand} slot="forehand" />
                </td>
                <td className="p-3">
                  <SetupCell item={p.setup.backhand} slot="backhand" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Pros({ loaderData }: Route.ComponentProps) {
  const { rows, topBlades, topRubbers } = loaderData;
  const ranked = rows.filter((r) => r.ranking);
  const men = ranked.filter((r) => r.gender === "men");
  const women = ranked.filter((r) => r.gender === "women");
  const notable = rows.filter((r) => !r.ranking);
  const rankingDate = ranked[0]?.ranking?.date;
  const checked = latestCheck(rows);
  return (
    <div className="space-y-10">
      <PageHeader eyebrow="Equipment encyclopedia" title="What the pros play with">
        <p>
          Blades and rubbers of the world's top-ranked men and women, each with the source it comes from and the date it was
          reported. Rankings and setups are re-checked every week.
        </p>
        {(checked || rankingDate) && (
          <p className="mt-2 text-sm">
            {checked && `Last checked ${formatDate(checked)}. `}
            {rankingDate && `Ranks from the ITTF/WTT world ranking of ${formatDate(rankingDate)}.`}
          </p>
        )}
      </PageHeader>

      <aside className="rounded-3xl border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
        <p className="font-semibold text-foreground">How to read this</p>
        <ul className="mt-2 space-y-1.5">
          {(Object.keys(confidenceLabels) as Confidence[]).map((c) => (
            <li key={c} className="flex items-center gap-2">
              <ConfidencePill confidence={c} /> {confidenceLabels[c].description}
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Top players often use versions you can't buy: national-team or "provincial" rubbers, custom-made or relabelled
          blades. These are marked under the item name, and the link goes to the closest retail product, which may play
          differently.
        </p>
      </aside>

      {(topBlades.length > 0 || topRubbers.length > 0) && (
        <section className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Most-used blades", items: topBlades, base: "/equipment/blades" },
            { title: "Most-used rubbers", items: topRubbers, base: "/equipment/rubbers" },
          ].map((g) => (
            <div key={g.title} className="rounded-3xl border bg-card p-5">
              <h2 className="font-bold">{g.title} among tracked pros</h2>
              <ol className="mt-3 space-y-2 text-sm">
                {g.items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3">
                    <ProductThumb photo={i.photo} fallback={`/equipment/img/${g.base.split("/").pop()}/${i.id}.svg`} className="size-10" />
                    <BrandLogo logo={i.brandLogo} name={i.brandName} className="h-5" />
                    <Link to={`${g.base}/${i.id}`} className="flex-1 hover:text-primary hover:underline">
                      {i.brandLogo ? "" : `${i.brandName} `}
                      {i.name}
                    </Link>
                    <span className="text-muted-foreground">{i.count}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      )}

      <SetupTable rows={men} title="Men's top players" />
      <SetupTable rows={women} title="Women's top players" />
      <SetupTable rows={notable} title="Other notable players" />
    </div>
  );
}
