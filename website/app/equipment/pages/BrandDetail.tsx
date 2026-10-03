import { data, Link } from "react-router";
import type { Route } from "./+types/BrandDetail";
import { BladeCard, RubberCard } from "../components/Cards";
import { BrandLogo } from "../components/Media";
import { PageHeader, Sources } from "../components/Parts";
import { scaleLabels } from "../labels";
import { brandPayload } from "../store.server";
import { absolute, breadcrumbs, equipmentMeta, itemList } from "../utils/seo";

export function loader({ params }: Route.LoaderArgs) {
  const payload = brandPayload(params.brandId);
  if (!payload) throw data("Brand not found", { status: 404 });
  return payload;
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];
  const { brand, blades, rubbers } = loaderData;
  const path = `/equipment/brands/${brand.id}`;
  const parts = [blades.length && `${blades.length} blades`, rubbers.length && `${rubbers.length} rubbers`].filter(Boolean).join(" and ");
  return equipmentMeta({
    title: `${brand.name} Table Tennis Blades and Rubbers: Specs Compared`,
    description: `${brand.name} table tennis equipment: ${parts} with plies, carbon type, thickness, weight and sponge hardness from ${brand.name}'s published specs, with sources.`,
    path,
    jsonLd: [
      breadcrumbs([{ name: brand.name, path }]),
      {
        "@context": "https://schema.org",
        "@type": "Brand",
        name: brand.name,
        url: brand.website,
        sameAs: brand.website,
        ...(brand.logo ? { logo: absolute(brand.logo.src) } : {}),
      },
      itemList(`${brand.name} table tennis equipment`, path, [
        ...blades.map((b) => ({ name: `${brand.name} ${b.name}`, path: `/equipment/blades/${b.id}` })),
        ...rubbers.map((r) => ({ name: `${brand.name} ${r.name}`, path: `/equipment/rubbers/${r.id}` })),
      ]),
    ],
  });
};

export default function BrandDetail({ loaderData }: Route.ComponentProps) {
  const { brand, blades, rubbers } = loaderData;
  return (
    <div className="space-y-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/equipment" className="hover:text-foreground">
          Equipment
        </Link>{" "}
        / Brands
      </nav>
      <BrandLogo logo={brand.logo} name={brand.name} className="-mb-4 h-12 px-3 py-2" />
      <PageHeader eyebrow={`Brand · ${brand.country}`} title={`${brand.name} blades and rubbers`}>
        <p>
          {blades.length > 0 && `${blades.length} ${brand.name} blades`}
          {blades.length > 0 && rubbers.length > 0 && " and "}
          {rubbers.length > 0 && `${rubbers.length} rubbers`}, with specs taken from {brand.name}'s own published data.{" "}
          {brand.ratingNote}
          {brand.hardnessScale && brand.hardnessScale !== "unstated" && (
            <>
              {" "}
              {brand.name} sponge hardness is generally printed on the{" "}
              <Link to="/equipment/guides/sponge-hardness-scales" className="text-primary hover:underline">
                {scaleLabels[brand.hardnessScale]}
              </Link>
              ; each rubber page shows the scale for that product.
            </>
          )}
        </p>
        <p className="mt-3 text-base">
          Official site:{" "}
          <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {brand.website.replace(/^https?:\/\//, "")}
          </a>
        </p>
      </PageHeader>

      {blades.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight">{brand.name} blades</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blades.map((b) => (
              <BladeCard key={b.id} blade={b} />
            ))}
          </div>
        </section>
      )}
      {rubbers.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold tracking-tight">{brand.name} rubbers</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rubbers.map((r) => (
              <RubberCard key={r.id} rubber={r} />
            ))}
          </div>
        </section>
      )}
      <Sources sources={brand.sources} />
    </div>
  );
}
