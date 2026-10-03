import { Link } from "react-router";
import type { Route } from "./+types/Guides";
import { PageHeader } from "../components/Parts";
import { guidesPayload } from "../store.server";
import { breadcrumbs, equipmentMeta, itemList } from "../utils/seo";

export function loader() {
  return guidesPayload();
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  equipmentMeta({
    title: "Table Tennis Equipment Guides: Carbon, Pips, Sponge Hardness",
    description:
      "Plain-language guides to table tennis equipment: ALC vs ZLC carbon, inner vs outer carbon, plies and woods, handles, rubber types, pips and sponge hardness scales.",
    path: "/equipment/guides",
    jsonLd: [
      breadcrumbs([{ name: "Guides", path: "/equipment/guides" }]),
      itemList("Equipment guides", "/equipment/guides", (loaderData ?? []).map((g) => ({ name: g.title, path: `/equipment/guides/${g.slug}` }))),
    ],
  });

export default function Guides({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Equipment encyclopedia" title="Equipment guides">
        <p>How blades and rubbers are made, what the terms on the packaging mean, and how to read makers' numbers.</p>
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2">
        {loaderData.map((g) => (
          <Link key={g.slug} to={`/equipment/guides/${g.slug}`} className="rounded-3xl border bg-card p-6 transition-colors hover:border-primary/40">
            <h2 className="text-lg font-bold tracking-tight">{g.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{g.description}</p>
          </Link>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Looking for a single term? See the{" "}
        <Link to="/equipment/glossary" className="text-primary hover:underline">
          glossary
        </Link>
        .
      </p>
    </div>
  );
}
