import { Link } from "react-router";
import type { Route } from "./+types/blog-post";
import { inline } from "~/components/site/legal-page";
import { formatDate, getPost, posts } from "~/content/blog";
import { APP_NAME, SITE_URL } from "~/content/site";
import { seo } from "~/lib/seo";

export function loader({ params }: Route.LoaderArgs) {
  const post = getPost(params.slug);
  if (!post) throw new Response("Not found", { status: 404 });
  return { post };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: `Not found | ${APP_NAME}` }];
  const { post } = data;
  const url = `${SITE_URL}/blog/${post.slug}`;
  return [
    ...seo({ title: `${post.title} | ${APP_NAME}`, description: post.description, path: `/blog/${post.slug}`, locale: "en", localized: false }).map((m) =>
      "property" in m && m.property === "og:type" ? { property: "og:type", content: "article" } : m,
    ),
    { name: "keywords", content: post.keywords.join(", ") },
    { property: "article:published_time", content: post.published },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.published,
        dateModified: post.published,
        keywords: post.keywords.join(", "),
        image: `${SITE_URL}/og-image.png`,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "Nineva Studios", url: "https://ninevastudios.com" },
        publisher: { "@type": "Organization", name: "Nineva Studios", url: "https://ninevastudios.com" },
      },
    },
  ];
};

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  const others = posts.filter((p) => p.slug !== post.slug);
  return (
    <article lang="en" className="px-4 pt-32 pb-20 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-foreground">
            Blog
          </Link>
        </nav>
        <header className="mt-4 border-b pb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={post.published}>{formatDate(post.published)}</time> · {post.readMinutes} min read
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.intro}</p>
        </header>
        {post.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{section.heading}</h2>
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
        ))}
        <section className="mt-12 border-t pt-8">
          <h2 className="font-display text-lg font-bold">Sources</h2>
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
            <h2 className="font-display text-lg font-bold">More from the blog</h2>
            <ul className="mt-3 space-y-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="text-primary underline-offset-2 hover:underline">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
