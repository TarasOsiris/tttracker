import { ArrowLeftRight } from "lucide-react";
import { data, Link } from "react-router";
import type { Route } from "./+types/RubberDetail";
import { RubberCard } from "../components/Cards";
import { Facts, Illustration, Notes, PageHeader, Pill, Prose, RatingsBlock, Sources, SpecTable, StatusPill, UsedBy } from "../components/Parts";
import { bandRange } from "../hardness";
import { DASH, formatHardness, formatThicknesses, rubberTypeLabels } from "../labels";
import { rubberPayload } from "../store.server";
import { absolute, breadcrumbs, equipmentMeta } from "../utils/seo";

export function loader({ params }: Route.LoaderArgs) {
  const payload = rubberPayload(params.rubberId);
  if (!payload) throw data("Rubber not found", { status: 404 });
  return payload;
}

const tackLabels = { "non-tacky": "Non-tacky", "slightly-tacky": "Slightly tacky", tacky: "Tacky" } as const;

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];
  const { rubber, brand } = loaderData;
  const full = `${brand.name} ${rubber.name}`;
  const path = `/equipment/rubbers/${rubber.id}`;
  return equipmentMeta({
    title: `${full} Rubber Specs: Sponge Hardness, Thickness & Type`,
    description: `${full} (${rubberTypeLabels[rubber.type].toLowerCase()}) specs: sponge hardness ${formatHardness(rubber.hardness)}, thicknesses, ${brand.name}'s own ratings and sources. ${rubber.summary}`,
    path,
    jsonLd: [
      breadcrumbs([
        { name: "Rubbers", path: "/equipment/rubbers" },
        { name: brand.name, path: `/equipment/brands/${brand.id}` },
        { name: full, path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: full,
        brand: { "@type": "Brand", name: brand.name },
        category: "Table tennis rubber",
        description: rubber.summary,
        url: absolute(path),
        image: absolute(`/equipment/img/rubbers/${rubber.id}.svg`),
        additionalProperty: [
          { "@type": "PropertyValue", name: "Type", value: rubberTypeLabels[rubber.type] },
          rubber.hardness && { "@type": "PropertyValue", name: "Sponge hardness", value: formatHardness(rubber.hardness) },
          rubber.spongeThicknesses.length > 0 && { "@type": "PropertyValue", name: "Sponge thicknesses", value: formatThicknesses(rubber) },
        ].filter(Boolean),
      },
    ],
  });
};

export default function RubberDetail({ loaderData }: Route.ComponentProps) {
  const { rubber, brand, bands, usedBy, similar } = loaderData;
  const pips = rubber.pips;
  const rows = [
    { label: "Brand", value: brand.name },
    { label: "Type", value: rubberTypeLabels[rubber.type] },
    { label: "Topsheet", value: rubber.tackiness ? tackLabels[rubber.tackiness] : DASH },
    {
      label: "Sponge hardness",
      value: formatHardness(rubber.hardness),
      hint: "Exactly as the maker states it, on its own scale",
    },
    ...(rubber.hardness
      ? [
          {
            label: "Approximate band",
            value: bands.length ? (
              <Link to="/equipment/guides/sponge-hardness-scales" className="text-primary hover:underline">
                {bandRange(bands)}
              </Link>
            ) : (
              "Not banded: scale not stated"
            ),
            hint: "Rough cross-brand grouping, not a conversion",
          },
        ]
      : []),
    { label: "Sponge thicknesses", value: formatThicknesses(rubber) },
    { label: "Sponge colour", value: rubber.spongeColor ?? DASH },
    ...(pips
      ? [
          { label: "Pip height", value: pips.heightMm != null ? `${pips.heightMm} mm` : DASH },
          { label: "Pip diameter", value: pips.diameterMm != null ? `${pips.diameterMm} mm` : DASH },
          ...(pips.ratio != null ? [{ label: "Height / width ratio", value: pips.ratio }] : []),
          ...(pips.note ? [{ label: "Pip notes", value: pips.note }] : []),
        ]
      : []),
    { label: "ITTF approved", value: rubber.ittfApproved == null ? DASH : rubber.ittfApproved ? "Yes" : "No" },
    { label: "Made in", value: rubber.madeIn ?? DASH },
    { label: "Released", value: rubber.releaseYear ?? DASH },
  ];
  return (
    <article className="space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/equipment/rubbers" className="hover:text-foreground">
          Rubbers
        </Link>{" "}
        /{" "}
        <Link to={`/equipment/brands/${brand.id}`} className="hover:text-foreground">
          {brand.name}
        </Link>
      </nav>
      <PageHeader eyebrow={`${brand.name} rubber`} title={`${brand.name} ${rubber.name}`}>
        <p>{rubber.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Pill tone="primary">{rubberTypeLabels[rubber.type]}</Pill>
          {bands.length > 0 && <Pill>{bandRange(bands)}</Pill>}
          <StatusPill status={rubber.status} />
          {rubber.aliases?.map((a) => <Pill key={a}>Also sold as {a}</Pill>)}
          <Link
            to={`/equipment/compare?ids=rubber:${rubber.id}`}
            className="ms-auto inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-1.5 text-sm font-medium hover:border-primary/40"
          >
            <ArrowLeftRight className="size-4" /> Compare
          </Link>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          <SpecTable title="Specifications" rows={rows} />
          <section>
            <h2 className="text-xl font-bold tracking-tight">About {rubber.name}</h2>
            <div className="mt-3">
              <Prose paragraphs={rubber.description} />
            </div>
          </section>
          <Facts facts={rubber.facts} sources={rubber.sources} />
          <UsedBy players={usedBy} />
        </div>
        <div className="space-y-6">
          <Illustration
            src={`/equipment/img/rubbers/${rubber.id}.svg`}
            alt={`Illustration of ${brand.name} ${rubber.name}${rubber.topsheetColors?.length ? ` in ${rubber.topsheetColors.join(" and ").toLowerCase()}` : ""}`}
            note={[
              rubber.topsheetColors?.length ? `colours sold: ${rubber.topsheetColors.join(", ")}` : "colours not listed, shown in grey",
              rubber.type.includes("pips") ? "pips facing out" : "pips facing in",
              rubber.spongeThicknesses.length > 0 && rubber.spongeThicknesses.every((t) => /^ox$/i.test(t.trim()))
                ? "no sponge"
                : rubber.spongeColor
                  ? `${rubber.spongeColor.toLowerCase()} sponge`
                  : "sponge colour not listed, shown in grey",
            ].join(", ")}
          />
          <RatingsBlock ratings={rubber.manufacturerRatings} brand={brand} />
          <Notes notes={rubber.notes} />
          <Sources sources={rubber.sources} lastVerified={rubber.lastVerified} />
        </div>
      </div>

      {similar.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight">Similar rubbers</h2>
          <p className="mt-1 text-sm text-muted-foreground">Same type, overlapping hardness band where known.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((r) => (
              <RubberCard key={r.id} rubber={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
