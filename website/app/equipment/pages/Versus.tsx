import { data, Link } from "react-router";
import type { Route } from "./+types/Versus";
import { BrandLogo, PlayerAvatar } from "../components/Media";
import { Sources } from "../components/Parts";
import {
  DASH,
  anchorId,
  construction,
  fiberLabels,
  formatDate,
  formatMm,
  formatWeight,
  handleLabels,
} from "../labels";
import { versusPayload } from "../store.server";
import { absolute, breadcrumbs, equipmentMeta } from "../utils/seo";
import { Faq, faqJsonLd } from "~/components/site/faq";
import { inline } from "~/components/site/legal-page";
import { APP_NAME } from "~/content/site";

export function loader({ params }: Route.LoaderArgs) {
  const payload = versusPayload(params.slug);
  if (!payload) throw data("Comparison not found", { status: 404 });
  return payload;
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData) return [];
  const { comparison: c, a, b } = loaderData;
  const path = `/equipment/compare/${c.slug}`;
  const full = (s: typeof a) => `${s.brand.name} ${s.blade.name}`;
  // Share and article images need a real photo; the spec drawings are SVG.
  const pictured = a.blade.photo ? a : b.blade.photo ? b : null;
  return equipmentMeta({
    title: c.title,
    description: c.description,
    path,
    image: pictured?.blade.photo && {
      ...pictured.blade.photo,
      alt: `${full(pictured)} blade`,
    },
    jsonLd: [
      breadcrumbs([
        { name: "Compare", path: "/equipment/compare" },
        { name: `${a.blade.name} vs ${b.blade.name}`, path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: c.title,
        description: c.description,
        datePublished: c.updated,
        dateModified: c.updated,
        author: { "@type": "Organization", name: APP_NAME },
        url: absolute(path),
        ...(pictured?.blade.photo
          ? { image: absolute(pictured.blade.photo.src) }
          : {}),
        about: [a, b].map((s) => ({
          "@type": "Product",
          name: full(s),
          brand: { "@type": "Brand", name: s.brand.name },
          url: absolute(`/equipment/blades/${s.blade.id}`),
        })),
        publisher: { "@type": "Organization", name: APP_NAME },
      },
      faqJsonLd(c.faq),
    ],
  });
};

type Side = Route.ComponentProps["loaderData"]["a"];

function specRows(s: Side): { label: string; value: string }[] {
  const b = s.blade;
  return [
    { label: "Construction", value: construction(b) },
    { label: "Composition", value: b.layup ?? DASH },
    { label: "Plies", value: b.plies != null ? String(b.plies) : DASH },
    {
      label: "Composite",
      value: b.fibers.length
        ? (b.fiberName ?? b.fibers.map((f) => fiberLabels[f]).join(", "))
        : "None",
    },
    { label: "Outer ply", value: b.outerWood ?? DASH },
    {
      label: "Thickness",
      value: b.thicknessMm != null ? formatMm(b.thicknessMm) : DASH,
    },
    { label: "Weight", value: b.weightG ? formatWeight(b.weightG) : DASH },
    {
      label: "Handles",
      value: b.handles.length
        ? b.handles.map((h) => handleLabels[h]).join(", ")
        : DASH,
    },
    { label: "Maker's class", value: b.manufacturerClass ?? DASH },
    {
      label: "Maker's ratings",
      value: b.manufacturerRatings.length
        ? b.manufacturerRatings
            .map((r) => `${r.label} ${r.value}${r.max ? `/${r.max}` : ""}`)
            .join(", ")
        : DASH,
    },
    { label: "Made in", value: b.madeIn ?? DASH },
  ];
}

function BladeHead({ side }: { side: Side }) {
  return (
    <Link
      to={`/equipment/blades/${side.blade.id}`}
      className="group flex flex-col items-center gap-3 text-center"
    >
      <span className="flex h-40 w-32 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 sm:h-52 sm:w-40">
        <img
          src={side.blade.photo?.src ?? side.illustration}
          alt=""
          width={side.blade.photo?.width ?? 56}
          height={side.blade.photo?.height ?? 64}
          fetchPriority="high"
          className="h-full w-full object-contain p-2"
        />
      </span>
      <BrandLogo
        logo={side.brand.logo}
        name={side.brand.name}
        className="h-5"
      />
      <span className="font-display text-lg font-bold group-hover:text-primary group-hover:underline">
        {side.blade.name}
      </span>
    </Link>
  );
}

function ProList({ side }: { side: Side }) {
  if (side.usedBy.length === 0)
    return (
      <span className="text-muted-foreground">None of the tracked pros</span>
    );
  return (
    <ul className="flex flex-wrap gap-1.5">
      {side.usedBy.map((p) => (
        <li key={p.id}>
          <Link
            to={`/equipment/pros/${p.id}`}
            className="inline-flex items-center gap-1.5 rounded-full border bg-background px-2 py-1 text-xs hover:border-primary/40"
          >
            <PlayerAvatar
              photo={p.photo}
              name={p.name}
              country={p.country}
              className="size-5 text-[10px]"
            />
            {p.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Versus({ loaderData }: Route.ComponentProps) {
  const { comparison: c, a, b, related } = loaderData;
  const rowsA = specRows(a);
  const rowsB = specRows(b);
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
      <article className="max-w-3xl min-w-0">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/equipment/compare" className="hover:text-foreground">
            Compare
          </Link>{" "}
          / {a.blade.name} vs {b.blade.name}
        </nav>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          {c.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Updated {formatDate(c.updated)} · {c.sources.length} sources
        </p>

        <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <BladeHead side={a} />
          <span
            aria-hidden="true"
            className="font-display text-2xl font-extrabold text-muted-foreground"
          >
            vs
          </span>
          <BladeHead side={b} />
        </div>

        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          {inline(c.intro)}
        </p>

        <section
          aria-labelledby="verdict"
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          <h2 id="verdict" className="sr-only">
            Quick verdict
          </h2>
          {[
            { side: a, text: c.verdict.a },
            { side: b, text: c.verdict.b },
          ].map(({ side, text }) => (
            <div key={side.blade.id} className="rounded-3xl border bg-card p-5">
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                Choose the {side.blade.name} if…
              </p>
              <p className="mt-2 leading-relaxed">{inline(text)}</p>
            </div>
          ))}
        </section>

        <section id="specs" className="mt-10 scroll-mt-24">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Specs side by side
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            From each maker's published specs. Makers rate on their own scales,
            so ratings from different brands aren't comparable.
          </p>
          <div className="mt-4 overflow-x-auto rounded-3xl border bg-card">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th
                    scope="col"
                    className="w-1/4 p-3 font-medium text-muted-foreground"
                  >
                    <span className="sr-only">Spec</span>
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    {a.brand.name} {a.blade.name}
                  </th>
                  <th scope="col" className="p-3 font-semibold">
                    {b.brand.name} {b.blade.name}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rowsA.map((r, i) => (
                  <tr key={r.label}>
                    <th
                      scope="row"
                      className="p-3 text-left font-normal text-muted-foreground"
                    >
                      {r.label}
                    </th>
                    <td className="p-3 font-medium">{r.value}</td>
                    <td className="p-3 font-medium">{rowsB[i].value}</td>
                  </tr>
                ))}
                <tr>
                  <th
                    scope="row"
                    className="p-3 text-left align-top font-normal text-muted-foreground"
                  >
                    Tracked pros
                  </th>
                  <td className="p-3 align-top">
                    <ProList side={a} />
                  </td>
                  <td className="p-3 align-top">
                    <ProList side={b} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {c.sections.map((s) => (
          <section
            key={s.heading}
            id={anchorId(s.heading)}
            className="mt-10 scroll-mt-24"
          >
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
              <a
                href={`#${anchorId(s.heading)}`}
                className="hover:text-primary"
              >
                {s.heading}
              </a>
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              {s.blocks.map((blk, i) =>
                typeof blk === "string" ? (
                  <p key={i}>{inline(blk)}</p>
                ) : (
                  <ul
                    key={i}
                    className="list-disc space-y-2 ps-5 marker:text-primary"
                  >
                    {blk.list.map((item, j) => (
                      <li key={j}>{inline(item)}</li>
                    ))}
                  </ul>
                ),
              )}
            </div>
          </section>
        ))}

        <section id="faq" className="mt-10 scroll-mt-24">
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Questions
          </h2>
          <div className="mt-4">
            <Faq items={c.faq} />
          </div>
        </section>

        <div id="sources" className="mt-12 scroll-mt-24 border-t pt-8">
          <Sources sources={c.sources} />
        </div>
      </article>

      <aside className="space-y-6 text-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
        <nav
          aria-label="On this page"
          className="rounded-3xl border bg-card p-5"
        >
          <p className="font-semibold">On this page</p>
          <ol className="mt-2 space-y-1.5">
            {[
              { id: "specs", heading: "Specs side by side" },
              ...c.sections.map((s) => ({
                id: anchorId(s.heading),
                heading: s.heading,
              })),
              { id: "faq", heading: "Questions" },
              { id: "sources", heading: "Sources" },
            ].map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="rounded-3xl border bg-card p-5">
          <p className="font-semibold">Compare the specs yourself</p>
          <p className="mt-1 text-muted-foreground">
            Add a third blade or swap one out in the comparison table.
          </p>
          <Link
            to={`/equipment/compare?ids=blade:${a.blade.id},blade:${b.blade.id}`}
            className="mt-3 inline-block font-medium text-primary hover:underline"
          >
            Open in Compare →
          </Link>
        </div>
        {related.length > 0 && (
          <div className="rounded-3xl border bg-card p-5">
            <p className="font-semibold">Related comparisons</p>
            <ul className="mt-2 space-y-1.5">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/equipment/compare/${r.slug}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {r.a.name} vs {r.b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
