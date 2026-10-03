import { data, Link } from "react-router";
import type { Route } from "./+types/Guide";
import { type BladePoint, GuideDiagramView } from "../components/GuideDiagrams";
import { BrandLogo, Credit, ProductThumb } from "../components/Media";
import { Sources } from "../components/Parts";
import type { GuideFigure } from "../models";
import type { FigureProduct } from "../store.server";
import { formatDate } from "../labels";
import { guidePayload } from "../store.server";
import { absolute, breadcrumbs, equipmentMeta } from "../utils/seo";
import { inline } from "~/components/site/legal-page";
import { APP_NAME } from "~/content/site";
import { cn } from "~/lib/utils";

export function loader({ params }: Route.LoaderArgs) {
  const payload = guidePayload(params.slug);
  if (!payload) throw data("Guide not found", { status: 404 });
  return payload;
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];
  const { guide } = loaderData;
  const path = `/equipment/guides/${guide.slug}`;
  return equipmentMeta({
    title: guide.title,
    description: guide.description,
    path,
    jsonLd: [
      breadcrumbs([
        { name: "Guides", path: "/equipment/guides" },
        { name: guide.title, path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        dateModified: guide.updated,
        url: absolute(path),
        publisher: { "@type": "Organization", name: APP_NAME },
      },
    ],
  });
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** About 220 words a minute, counting the intro and every block. */
function readingMinutes(guide: Route.ComponentProps["loaderData"]["guide"]): number {
  const text = [guide.intro, ...guide.sections.flatMap((s) => s.blocks.flatMap((b) => (typeof b === "string" ? [b] : b.list)))].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export default function Guide({ loaderData }: Route.ComponentProps) {
  const { guide, terms, others, products, bladePoints } = loaderData;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
      <article className="max-w-3xl min-w-0">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/equipment/guides" className="hover:text-foreground">
            Guides
          </Link>
        </nav>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{guide.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Updated {formatDate(guide.updated)} · {readingMinutes(guide)} min read · {guide.sources.length} sources
        </p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{inline(guide.intro)}</p>
        {guide.sections.map((s) => (
          <section key={s.heading} id={slugify(s.heading)} className="mt-10 scroll-mt-24">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              <a href={`#${slugify(s.heading)}`} className="hover:text-primary">
                {s.heading}
              </a>
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              {s.blocks.map((b, i) =>
                typeof b === "string" ? (
                  <p key={i}>{inline(b)}</p>
                ) : (
                  <ul key={i} className="list-disc space-y-2 ps-5 marker:text-primary">
                    {b.list.map((item, j) => (
                      <li key={j}>{inline(item)}</li>
                    ))}
                  </ul>
                ),
              )}
            </div>
            {s.figure && <GuideFigureView figure={s.figure} products={products} bladePoints={bladePoints} />}
          </section>
        ))}
        <div id="sources" className="mt-12 scroll-mt-24 border-t pt-8">
          <Sources sources={guide.sources} />
        </div>
      </article>
      <aside className="space-y-6 text-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
        <nav aria-label="On this page" className="rounded-3xl border bg-card p-5">
          <p className="font-semibold">On this page</p>
          <ol className="mt-2 space-y-1.5">
            {guide.sections.map((s) => (
              <li key={s.heading}>
                <a href={`#${slugify(s.heading)}`} className="text-muted-foreground hover:text-primary">
                  {s.heading}
                </a>
              </li>
            ))}
            <li>
              <a href="#sources" className="text-muted-foreground hover:text-primary">
                Sources
              </a>
            </li>
          </ol>
        </nav>
        {terms.length > 0 && (
          <div className="rounded-3xl border bg-card p-5">
            <p className="font-semibold">Terms in this guide</p>
            <ul className="mt-2 space-y-1">
              {terms.map((t) => (
                <li key={t.id}>
                  <Link to={`/equipment/glossary#${t.id}`} className="text-primary hover:underline">
                    {t.term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="rounded-3xl border bg-card p-5">
          <p className="font-semibold">More guides</p>
          <ul className="mt-2 space-y-1.5">
            {others.map((g) => (
              <li key={g.slug}>
                <Link to={`/equipment/guides/${g.slug}`} className="text-muted-foreground hover:text-primary">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function GuideFigureView({
  figure,
  products,
  bladePoints,
}: {
  figure: GuideFigure;
  products: Record<string, FigureProduct>;
  bladePoints: BladePoint[];
}) {
  return (
    <figure className="mt-6 rounded-3xl border bg-card p-5 sm:p-6">
      {figure.type === "diagram" && <GuideDiagramView diagram={figure.diagram} bladePoints={bladePoints} />}
      {figure.type === "photo" && (
        <img
          src={figure.image.src}
          alt={figure.image.alt}
          width={figure.image.width}
          height={figure.image.height}
          loading="lazy"
          decoding="async"
          className="w-full rounded-2xl object-cover"
        />
      )}
      {figure.type === "products" && (
        <ul className={cn("grid gap-3", figure.items.length > 3 ? "grid-cols-2 sm:grid-cols-4" : figure.items.length === 3 ? "grid-cols-3" : "grid-cols-2")}>
          {figure.items.map((it) => {
            const p = products[`${it.kind}:${it.id}`];
            return (
              <li key={it.id}>
                <Link to={p.href} className="group block text-center">
                  <ProductThumb photo={p.photo} fallback={p.illustration} className="aspect-square w-full" />
                  <span className="mt-2 flex justify-center">
                    <BrandLogo logo={p.brandLogo} name={p.brandName} className="h-5" />
                  </span>
                  <span className="mt-1 block text-sm font-semibold group-hover:text-primary">
                    {p.brandLogo ? "" : `${p.brandName} `}
                    {p.name}
                  </span>
                  {p.note && <span className="block text-xs text-muted-foreground">{p.note}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <figcaption className="mt-4 text-sm leading-snug text-muted-foreground">
        {figure.caption}
        {figure.type === "photo" && (
          <span className="mt-1 block text-xs">
            Photo: <Credit image={figure.image} />
          </span>
        )}
        {figure.type === "products" && <span className="mt-1 block text-xs">Product photos © their makers, from their product pages.</span>}
      </figcaption>
    </figure>
  );
}
