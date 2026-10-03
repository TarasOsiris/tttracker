import { data, Link } from "react-router";
import type { Route } from "./+types/BladeDetail";
import { BladeCard } from "../components/Cards";
import {
  Facts,
  ItemHero,
  Notes,
  ProductFigure,
  Pill,
  Prose,
  RatingsBlock,
  Sources,
  SpecTable,
  StatusPill,
  UsedBy,
} from "../components/Parts";
import { BladeInContext, schematicPlies } from "../components/ItemVisuals";
import { PlyDiagram } from "../components/PlyDiagram";
import { DASH, construction, fiberLabels, fiberPositionLabels, formatMm, formatWeight, handleLabels } from "../labels";
import { bladePayload } from "../store.server";
import { absolute, breadcrumbs, equipmentMeta } from "../utils/seo";

export function loader({ params }: Route.LoaderArgs) {
  const payload = bladePayload(params.bladeId);
  if (!payload) throw data("Blade not found", { status: 404 });
  return payload;
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];
  const { blade, brand } = loaderData;
  const full = `${brand.name} ${blade.name}`;
  const path = `/equipment/blades/${blade.id}`;
  const specs = [blade.layup, blade.thicknessMm != null && `${blade.thicknessMm} mm`, blade.weightG && formatWeight(blade.weightG)]
    .filter(Boolean)
    .join(", ");
  return equipmentMeta({
    title: `${full} Blade Specs: Plies, Carbon, Thickness & Weight`,
    description: `${full} specs${specs ? ` (${specs})` : ""}: construction, handles, ${brand.name}'s own ratings and sources. ${blade.summary}`,
    path,
    image: blade.photo && { ...blade.photo, alt: `${full} blade` },
    jsonLd: [
      breadcrumbs([
        { name: "Blades", path: "/equipment/blades" },
        { name: brand.name, path: `/equipment/brands/${brand.id}` },
        { name: full, path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: full,
        brand: { "@type": "Brand", name: brand.name },
        category: "Table tennis blade",
        description: blade.summary,
        url: absolute(path),
        image: absolute(blade.photo?.src ?? `/equipment/img/blades/${blade.id}.svg`),
        additionalProperty: [
          blade.layup && {
            "@type": "PropertyValue",
            name: "Composition",
            value: blade.layup,
          },
          blade.plies != null && {
            "@type": "PropertyValue",
            name: "Plies",
            value: blade.plies,
          },
          blade.thicknessMm != null && {
            "@type": "PropertyValue",
            name: "Thickness",
            value: blade.thicknessMm,
            unitCode: "MMT",
          },
          blade.weightG && {
            "@type": "PropertyValue",
            name: "Nominal weight",
            value: formatWeight(blade.weightG),
          },
        ].filter(Boolean),
      },
    ],
  });
};

export default function BladeDetail({ loaderData }: Route.ComponentProps) {
  const { blade, brand, usedBy, similar, distribution, weightMid } = loaderData;
  const schematic = schematicPlies(blade);
  const rows = [
    { label: "Brand", value: brand.name },
    { label: "Construction", value: construction(blade) },
    {
      label: "Composition",
      value: blade.layup ?? DASH,
      hint: "As the maker writes it",
    },
    { label: "Plies", value: blade.plies ?? DASH },
    {
      label: "Composite",
      value: blade.fibers.length ? (blade.fiberName ?? DASH) : "None",
      hint: blade.fibers.length ? `Type: ${blade.fibers.map((f) => fiberLabels[f]).join(", ")}` : undefined,
    },
    ...(blade.fibers.length
      ? [
          {
            label: "Composite position",
            value: blade.fiberPosition ? fiberPositionLabels[blade.fiberPosition] : DASH,
          },
        ]
      : []),
    { label: "Outer ply", value: blade.outerWood ?? DASH },
    { label: "Thickness", value: formatMm(blade.thicknessMm) },
    {
      label: "Weight",
      value: formatWeight(blade.weightG),
      hint: "Nominal; wood varies blade to blade",
    },
    {
      label: "Handles",
      value: blade.handles.length ? blade.handles.map((h) => handleLabels[h]).join(", ") : DASH,
    },
    {
      label: "Maker's class",
      value: blade.manufacturerClass ?? DASH,
      hint: "The brand's own category",
    },
    { label: "Made in", value: blade.madeIn ?? DASH },
    { label: "Released", value: blade.releaseYear ?? DASH },
  ];
  return (
    <article className="space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/equipment/blades" className="hover:text-foreground">
          Blades
        </Link>{" "}
        /{" "}
        <Link to={`/equipment/brands/${brand.id}`} className="hover:text-foreground">
          {brand.name}
        </Link>
      </nav>
      <ItemHero
        brand={brand}
        kind="Blade"
        title={`${brand.name} ${blade.name}`}
        summary={blade.summary}
        compareHref={`/equipment/compare?ids=blade:${blade.id}`}
        tags={
          <>
            <Pill tone="primary">{construction(blade)}</Pill>
            {blade.layup && <Pill>{blade.layup}</Pill>}
            <StatusPill status={blade.status} />
            {blade.aliases?.map((a) => (
              <Pill key={a}>Also sold as {a}</Pill>
            ))}
          </>
        }
        figure={
          <ProductFigure
            photo={blade.photo}
            illustration={`/equipment/img/blades/${blade.id}.svg`}
            alt={`${brand.name} ${blade.name} blade${blade.handles[0] ? ` with a ${handleLabels[blade.handles[0]].replace(/ \(.*/, "").toLowerCase()} handle` : ""}`}
            note={`${blade.handles[0] ? `${handleLabels[blade.handles[0]].replace(/ \(.*/, "").toLowerCase()} handle` : "handle shape not published"}, ${blade.outerWood ? `${blade.outerWood.toLowerCase()} outer ply` : "generic wood colour"}`}
          />
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-6">
          <SpecTable title="Specifications" rows={rows} />
          <section>
            <h2 className="text-xl font-bold tracking-tight">About the {blade.name}</h2>
            <div className="mt-3">
              <Prose paragraphs={blade.description} />
            </div>
          </section>
          <Facts facts={blade.facts} sources={blade.sources} />
          <UsedBy players={usedBy} />
        </div>
        <div className="space-y-6">
          {blade.plyOrder && <PlyDiagram plies={blade.plyOrder} />}
          {schematic && <PlyDiagram plies={schematic} schematicFrom={blade.layup ?? `${blade.plies} plies`} />}
          <BladeInContext thickness={blade.thicknessMm} weight={weightMid} weightLabel={formatWeight(blade.weightG)} distribution={distribution} />
          <RatingsBlock ratings={blade.manufacturerRatings} brand={brand} />
          <Notes notes={blade.notes} />
          <Sources sources={blade.sources} lastVerified={blade.lastVerified} />
        </div>
      </div>

      {similar.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight">Similar construction</h2>
          <p className="mt-1 text-sm text-muted-foreground">Same construction and composite type, closest in thickness and plies.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((b) => (
              <BladeCard key={b.id} blade={b} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
