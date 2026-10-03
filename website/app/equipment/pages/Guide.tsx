import { data, Link } from "react-router";
import type { Route } from "./+types/Guide";
import { Sources } from "../components/Parts";
import { formatDate } from "../labels";
import { guidePayload } from "../store.server";
import { absolute, breadcrumbs, equipmentMeta } from "../utils/seo";
import { inline } from "~/components/site/legal-page";
import { APP_NAME } from "~/content/site";

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

export default function Guide({ loaderData }: Route.ComponentProps) {
  const { guide, terms, others } = loaderData;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
      <article className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/equipment/guides" className="hover:text-foreground">
            Guides
          </Link>
        </nav>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{guide.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Updated {formatDate(guide.updated)}</p>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{inline(guide.intro)}</p>
        {guide.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{s.heading}</h2>
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
          </section>
        ))}
        <div className="mt-12 border-t pt-8">
          <Sources sources={guide.sources} />
        </div>
      </article>
      <aside className="space-y-6 text-sm lg:sticky lg:top-24 lg:self-start">
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
