import { Fragment } from "react";
import { data, Link } from "react-router";
import type { Route } from "./+types/blog-post";
import appIcon from "~/assets/icon/app-icon-512.png";
import { CtaSection } from "~/components/site/cta-section";
import { inline } from "~/components/site/legal-page";
import { StoreButtons } from "~/components/site/store-buttons";
import { type BlogImage, formatDate } from "~/content/blog";
import { blogPost } from "~/content/blog.server";
import { appNames, SITE_URL } from "~/content/site";
import { localeFromPath, localeInfo, localizePath } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { rootT } from "~/lib/root-data";
import { authorSchema, publisherSchema } from "~/lib/schema";
import { seo } from "~/lib/seo";
import { breadcrumbList } from "~/serves/utils/seo";

// Only real translations have a page (the prerender list matches), so the content's language is the page's.
export function loader({ params, request }: Route.LoaderArgs) {
  const locale = localeFromPath(new URL(request.url).pathname);
  const found = blogPost(params.slug, locale);
  if (!found) throw data(null, { status: 404 });
  return { ...found, locale };
}

export const meta: Route.MetaFunction = ({ data: loaderData, matches, location }) => {
  const locale = localeFromPath(location.pathname);
  const appName = appNames[locale].name;
  if (!loaderData) return [{ title: `Not found | ${appName}` }];
  const { post } = loaderData;
  const url = `${SITE_URL}${localizePath(locale, `/blog/${post.slug}`)}`;
  const image = `${SITE_URL}${post.hero.src}`;
  return [
    ...seo({
      title: `${post.title} | ${appName}`,
      description: post.description,
      path: `/blog/${post.slug}`,
      locale,
      alternates: loaderData.locales,
      image: post.hero,
    }).map((m) => ("property" in m && m.property === "og:type" ? { property: "og:type", content: "article" } : m)),
    { name: "keywords", content: post.keywords.join(", ") },
    { property: "article:published_time", content: post.published },
    ...(post.updated ? [{ property: "article:modified_time", content: post.updated }] : []),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.published,
        dateModified: post.updated ?? post.published,
        inLanguage: localeInfo[locale].hreflang,
        keywords: post.keywords.join(", "),
        image,
        mainEntityOfPage: url,
        author: authorSchema,
        publisher: publisherSchema,
      },
    },
    {
      "script:ld+json": breadcrumbList(locale, appNames[locale].brand, [
        { name: rootT(matches).blog.breadcrumb, path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    },
  ];
};

// Photos and their captions are shared by every translation of a post and written in English.
function Figure({ image, priority }: { image: BlogImage; priority?: boolean }) {
  const { locale } = useI18n();
  return (
    <figure className="mt-6" lang={locale === "en" ? undefined : "en"}>
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="h-auto w-full rounded-2xl border object-cover"
      />
      <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {image.caption} Photo:{" "}
        <a href={image.creditUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
          {image.credit}
        </a>
        , via Wikimedia Commons.
      </figcaption>
    </figure>
  );
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post, others, locale } = loaderData;
  const { t, href } = useI18n();

  return (
    <article className="pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label={t.blog.breadcrumb} className="text-sm text-muted-foreground">
          <Link to={href("/blog")} className="hover:text-foreground">
            {t.blog.breadcrumb}
          </Link>
        </nav>
        <header className="mt-4 border-b pb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={post.published}>{formatDate(post.published, locale)}</time> · {t.blog.readMinutes.replace("{n}", String(post.readMinutes))}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.intro}</p>
        </header>
        <Figure image={post.hero} priority />
        <aside className="mt-8 rounded-2xl border bg-card p-6">
          <h2 className="font-display text-lg font-bold">{t.blog.inShort}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-primary">
            {post.takeaways.map((t, i) => (
              <li key={i}>{inline(t)}</li>
            ))}
          </ul>
        </aside>
        {post.sections.map((section, index) => (
          <Fragment key={section.heading}>
            {index === INLINE_CTA_AFTER && post.sections.length > INLINE_CTA_AFTER + 1 && <InlineCta />}
            <section className="mt-10">
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{section.heading}</h2>
              {section.image && <Figure image={section.image} />}
              <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                {section.blocks.map((block, i) =>
                  typeof block === "string" ? (
                    <p key={i}>{inline(block)}</p>
                  ) : (
                    <ul key={i} className="list-disc space-y-3 pl-5 marker:text-primary">
                      {block.list.map((item, j) => (
                        <li key={j}>{inline(item)}</li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          </Fragment>
        ))}
        <section className="mt-12 border-t pt-8">
          <h2 className="font-display text-lg font-bold">{t.blog.sources}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-primary">
            {post.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-2 hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
        {others.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-lg font-bold">{t.blog.moreFromBlog}</h2>
            <ul className="mt-3 space-y-2">
              {others.map((p) => (
                <li key={p.slug} lang={p.lang === locale ? undefined : localeInfo[p.lang].hreflang}>
                  <Link
                    to={p.href}
                    hrefLang={p.lang === locale ? undefined : localeInfo[p.lang].hreflang}
                    className="text-primary underline-offset-2 hover:underline"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <CtaSection title={t.cta.blogTitle} subtitle={t.cta.blogSubtitle} placement="blog" />
    </article>
  );
}

/** A compact app pitch between sections, for readers who never reach the end of the post. */
const INLINE_CTA_AFTER = 2;

function InlineCta() {
  const { t } = useI18n();
  return (
    <aside className="mt-10 flex flex-col items-center gap-5 rounded-2xl border bg-card p-6 text-center sm:flex-row sm:text-start">
      <img src={appIcon} alt="" width={56} height={56} loading="lazy" decoding="async" className="size-14 shrink-0 rounded-[0.9rem]" />
      <p className="flex-1 font-medium text-balance">{t.cta.blogInline}</p>
      <StoreButtons placement="blog-inline" className="sm:w-auto sm:flex-col [&>a]:h-10 [&>a]:text-sm" />
    </aside>
  );
}

