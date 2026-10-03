import { Link } from "react-router";
import type { Route } from "./+types/blog";
import { BLOG_DESCRIPTION, BLOG_TITLE, formatDate, posts } from "~/content/blog";
import { APP_NAME } from "~/content/site";
import { seo } from "~/lib/seo";

export const meta: Route.MetaFunction = () =>
  seo({ title: `${BLOG_TITLE} | ${APP_NAME}`, description: BLOG_DESCRIPTION, path: "/blog", locale: "en", localized: false });

export default function Blog() {
  return (
    <section lang="en" className="px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{BLOG_TITLE}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{BLOG_DESCRIPTION}</p>
        <ul className="mt-12 space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`} className="block overflow-hidden rounded-2xl border bg-card transition-colors hover:border-primary/50">
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
                  {formatDate(p.published)} · {p.readMinutes} min read
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
