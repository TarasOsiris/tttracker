import { Link } from "react-router";
import type { Route } from "./+types/blog";
import { formatDate, getPosts } from "~/content/blog";
import { appNames } from "~/content/site";
import { localeFromPath } from "~/i18n/config";
import { useI18n } from "~/i18n/use-i18n";
import { rootT } from "~/lib/root-data";
import { seo } from "~/lib/seo";

export function loader({ request }: Route.LoaderArgs) {
  const locale = localeFromPath(new URL(request.url).pathname);
  return { posts: getPosts(locale) };
}

export const meta: Route.MetaFunction = ({ matches, location }) => {
  const locale = localeFromPath(location.pathname);
  const t = rootT(matches);
  const appName = appNames[locale].name;
  return seo({
    title: `${t.blog.title} | ${appName}`,
    description: t.blog.description,
    path: "/blog",
    locale,
  });
};

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  const { t, locale, href } = useI18n();

  return (
    <section lang={locale} className="px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{t.blog.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.blog.description}</p>
        <ul className="mt-12 space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to={href(`/blog/${p.slug}`)} className="block overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50">
                <img
                  src={p.hero.src}
                  width={p.hero.width}
                  height={p.hero.height}
                  alt={p.hero.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full object-cover"
                />
                <div className="p-6">
                <time dateTime={p.published} className="text-sm text-muted-foreground">
                  {formatDate(p.published, locale)} · {t.blog.readMinutes.replace("{n}", String(p.readMinutes))}
                </time>
                <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-balance sm:text-2xl">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

