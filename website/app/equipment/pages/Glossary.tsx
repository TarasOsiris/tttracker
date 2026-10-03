import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/Glossary";
import { PageHeader } from "../components/Parts";
import { glossaryPayload } from "../store.server";
import { absolute, breadcrumbs, equipmentMeta } from "../utils/seo";
import { inline } from "~/components/site/legal-page";
import { cn } from "~/lib/utils";

export function loader() {
  return glossaryPayload();
}

export const meta: Route.MetaFunction = ({ loaderData }) =>
  equipmentMeta({
    title: "Table Tennis Equipment Glossary: ALC, ZLC, Tensor, Pips & More",
    description:
      "Every table tennis equipment term explained in a sentence or two: arylate carbon, ZLC, Texalium, tensor, tacky, hybrid, short and long pips, ESN hardness, FL and ST handles.",
    path: "/equipment/glossary",
    jsonLd: [
      breadcrumbs([{ name: "Glossary", path: "/equipment/glossary" }]),
      {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: "Table tennis equipment glossary",
        url: absolute("/equipment/glossary"),
        hasDefinedTerm: (loaderData ?? []).map((t) => ({
          "@type": "DefinedTerm",
          name: t.term,
          description: t.definition.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, ""),
          url: absolute(`/equipment/glossary#${t.id}`),
        })),
      },
    ],
  });

export default function Glossary({ loaderData }: Route.ComponentProps) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const matches = (t: (typeof loaderData)[number]) =>
    !needle || [t.term, ...(t.aliases ?? []), t.definition].some((x) => x.toLowerCase().includes(needle));
  const shown = loaderData.filter(matches);
  const letters = [...new Set(loaderData.map((t) => t.term[0].toUpperCase()))];
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Equipment encyclopedia" title="Equipment glossary">
        <p>The words on blade and rubber packaging, in plain English.</p>
      </PageHeader>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Filter ${loaderData.length} terms`}
          aria-label="Filter glossary terms"
          className="h-11 w-full rounded-full border bg-card ps-9 pe-4 text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none"
        />
      </div>
      <nav aria-label="Letters" className={needle ? "hidden" : "flex flex-wrap gap-1.5"}>
        {letters.map((l) => (
          <a key={l} href={`#letter-${l}`} className="flex size-8 items-center justify-center rounded-full border bg-card text-sm font-semibold hover:border-primary/40">
            {l}
          </a>
        ))}
      </nav>
      <dl className="max-w-3xl space-y-3">
        {shown.length === 0 && <p className="text-muted-foreground">No terms match “{q}”.</p>}
        {loaderData.map((t, i) => {
          const letter = t.term[0].toUpperCase();
          const first = i === 0 || loaderData[i - 1].term[0].toUpperCase() !== letter;
          return (
            <div key={t.id} id={t.id} className={cn("scroll-mt-24 rounded-2xl border bg-card p-4 target:border-primary target:ring-2 target:ring-primary/30", !matches(t) && "hidden")}>
              {first && <span id={`letter-${letter}`} className="block scroll-mt-24" />}
              <dt className="font-bold">
                {t.term}
                {t.aliases?.length ? <span className="ms-2 text-sm font-normal text-muted-foreground">also: {t.aliases.join(", ")}</span> : null}
              </dt>
              <dd className="mt-1 leading-relaxed text-muted-foreground">
                {inline(t.definition)}
                {t.guide && (
                  <>
                    {" "}
                    <Link to={`/equipment/guides/${t.guide}`} className="text-sm font-medium whitespace-nowrap text-primary hover:underline">
                      Read the guide →
                    </Link>
                  </>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
