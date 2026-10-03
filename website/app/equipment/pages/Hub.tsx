import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/Hub";
import { PageHeader } from "../components/Parts";
import { hubPayload } from "../store.server";
import { breadcrumbs, equipmentMeta, SECTION } from "../utils/seo";

export function loader() {
  return hubPayload();
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  equipmentMeta({
    title: `${SECTION}: Blades, Rubbers & Pro Setups`,
    description: `Specs for ${loaderData?.counts.blades ?? 0} blades and ${loaderData?.counts.rubbers ?? 0} rubbers from ${loaderData?.counts.brands ?? 0} brands, side-by-side comparison, pro player setups and guides to carbon, pips and sponge hardness.`,
    path: "/equipment",
    jsonLd: [breadcrumbs([])],
  });

export default function Hub({ loaderData }: Route.ComponentProps) {
  const { counts, brands, topBlades, topRubbers, guides } = loaderData;
  const sections = [
    { to: "/equipment/blades", icon: "🪵", title: "Blades", desc: `${counts.blades} blades: all-wood, inner and outer carbon, ALC, ZLC and more.` },
    { to: "/equipment/rubbers", icon: "🟥", title: "Rubbers", desc: `${counts.rubbers} rubbers: tensors, Chinese tacky, hybrids and pips.` },
    { to: "/equipment/compare", icon: "⚖️", title: "Compare", desc: "Up to four blades or rubbers side by side." },
    { to: "/equipment/pros", icon: "🏆", title: "Pro setups", desc: `What ${counts.players || "the top"} players use, updated weekly.` },
  ];
  return (
    <div className="space-y-12">
      <PageHeader eyebrow="Equipment encyclopedia" title="Table tennis equipment, explained and compared">
        <p>
          Every spec here comes from the maker's own published data, with sources on each page. Ratings are shown on each
          brand's own scale and sponge hardness on the scale the maker uses, because neither converts cleanly between brands.
          When a maker doesn't publish a value, we show {"—"} rather than guess.
        </p>
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="group rounded-3xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-xl">{s.icon}</span>
            <h2 className="mt-4 flex items-center gap-1.5 text-lg font-bold tracking-tight">
              {s.title}
              <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </Link>
        ))}
      </section>

      {guides.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight">Guides</h2>
          <p className="mt-1 text-muted-foreground">How blades and rubbers are built, and what the numbers mean.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.slug} to={`/equipment/guides/${g.slug}`} className="rounded-3xl border bg-card p-5 transition-colors hover:border-primary/40">
                <h3 className="font-bold tracking-tight">{g.title}</h3>
                <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{g.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {(topBlades.length > 0 || topRubbers.length > 0) && (
        <section className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Blades the pros use most", items: topBlades, base: "/equipment/blades" },
            { title: "Rubbers the pros use most", items: topRubbers, base: "/equipment/rubbers" },
          ].map((g) => (
            <div key={g.title} className="rounded-3xl border bg-card p-6">
              <h2 className="text-lg font-bold">{g.title}</h2>
              <ol className="mt-3 space-y-2 text-sm">
                {g.items.map((i, n) => (
                  <li key={i.id} className="flex items-baseline gap-3">
                    <span className="w-4 font-display font-extrabold text-primary">{n + 1}</span>
                    <Link to={`${g.base}/${i.id}`} className="flex-1 hover:text-primary hover:underline">
                      {i.brandName} {i.name}
                    </Link>
                    <span className="text-muted-foreground">
                      {i.count} pro{i.count > 1 ? "s" : ""}
                    </span>
                  </li>
                ))}
              </ol>
              <Link to="/equipment/pros" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                See every pro setup →
              </Link>
            </div>
          ))}
        </section>
      )}

      <section id="brands" className="scroll-mt-24">
        <h2 className="text-2xl font-bold tracking-tight">Brands</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((b) => (
            <li key={b.id} className="rounded-2xl border bg-card p-4">
              <Link to={`/equipment/brands/${b.id}`} className="font-bold hover:text-primary hover:underline">
                {b.name}
              </Link>
              <p className="text-xs text-muted-foreground">{b.country}</p>
              <p className="mt-2 flex gap-3 text-sm">
                {b.blades > 0 && (
                  <Link to={`/equipment/blades?brand=${b.id}`} className="text-primary hover:underline">
                    {b.blades} blades
                  </Link>
                )}
                {b.rubbers > 0 && (
                  <Link to={`/equipment/rubbers?brand=${b.id}`} className="text-primary hover:underline">
                    {b.rubbers} rubbers
                  </Link>
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
