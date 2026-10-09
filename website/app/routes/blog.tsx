import { data, Link } from "react-router";
import type { Route } from "./+types/blog";
import { JsonLd } from "~/components/site/faq";
import { formatDate, type PostSummary } from "~/content/blog";
import { blogIndex, blogLocales } from "~/content/blog.server";
import { appNames } from "~/content/site";
import { defaultLocale, type Locale, localeFromPath, localeInfo, localizePath } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { rootT } from "~/lib/root-data";
import { seo } from "~/lib/seo";
import { breadcrumbList } from "~/serves/utils/seo";

// Only languages with posts of their own have an index (the prerender list matches); the rest link to English.
export function loader({ request }: Route.LoaderArgs) {
  const locale = localeFromPath(new URL(request.url).pathname);
  if (!blogLocales.includes(locale)) throw data(null, { status: 404 });
  return { ...blogIndex(locale), locales: blogLocales };
}

export const meta: Route.MetaFunction = ({ data: loaderData, matches, location }) => {
  const locale = localeFromPath(location.pathname);
  const t = rootT(matches);
  const appName = appNames[locale].name;
  return seo({
    title: `${t.blog.title} | ${appName}`,
    description: t.blog.description,
    path: "/blog",
    locale,
    alternates: loaderData?.locales,
  });
};

function PostCard({ post, lang }: { post: PostSummary; lang: Locale }) {
  const { t, locale } = useI18n();
  const foreign = lang !== locale;
  return (
    <li lang={foreign ? localeInfo[lang].hreflang : undefined}>
      <Link
        to={localizePath(lang, `/blog/${post.slug}`)}
        hrefLang={foreign ? localeInfo[lang].hreflang : undefined}
        className="block overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50"
      >
        <img
          src={post.hero.src}
          width={post.hero.width}
          height={post.hero.height}
          alt={post.hero.alt}
          loading="lazy"
          decoding="async"
          className="aspect-video w-full object-cover"
        />
        <div className="p-6">
          <time dateTime={post.published} className="text-sm text-muted-foreground">
            {formatDate(post.published, locale)} · {t.blog.readMinutes.replace("{n}", String(post.readMinutes))}
          </time>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-balance sm:text-2xl">{post.title}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{post.description}</p>
        </div>
      </Link>
    </li>
  );
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts, english } = loaderData;
  const { t, locale } = useI18n();

  return (
    <section className="px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <JsonLd data={breadcrumbList(locale, appNames[locale].brand, [{ name: t.blog.breadcrumb, path: "/blog" }])} />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{t.blog.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.blog.description}</p>
        <ul className="mt-12 space-y-6">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} lang={locale} />
          ))}
        </ul>
        {english.length > 0 && (
          <>
            <h2 className="mt-16 font-display text-2xl font-bold tracking-tight">{t.blog.moreInEnglish}</h2>
            <ul className="mt-6 space-y-6">
              {english.map((p) => (
                <PostCard key={p.slug} post={p} lang={defaultLocale} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
