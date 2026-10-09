// Build-time only (.server): loaders hand each page the one post or the summaries it renders, so the client
// bundle never carries the posts. Relative imports, because react-router.config.ts reads this file too.
import { players } from "../equipment/data/players";
import { defaultLocale, type Locale, locales, localizePath } from "../i18n/config";
import type { BlogPost, PostLink, PostSummary } from "./blog";
import type { LegalBlock } from "./legal";
import { blogPostsByLocale } from "./blog-posts";

const english = blogPostsByLocale.en;

export const postSlugs = english.map((p) => p.slug);

// A translation must translate an existing English post, or its page would have no original to point back to.
for (const locale of locales) {
  for (const post of blogPostsByLocale[locale] ?? []) {
    if (!postSlugs.includes(post.slug)) throw new Error(`Blog post "${post.slug}" (${locale}) has no English original`);
  }
}

const postsIn = (locale: Locale): BlogPost[] => blogPostsByLocale[locale] ?? [];

/** The languages a post was really written or translated in, English first. Only these get a page. */
export function postLocales(slug: string): Locale[] {
  return locales.filter((l) => postsIn(l).some((p) => p.slug === slug));
}

/** Languages with at least one post of their own get a blog index; the others link to the English one. */
export const blogLocales: Locale[] = locales.filter((l) => postsIn(l).length > 0);

/** Newest date a post was published or revised. */
export const postDate = (p: Pick<BlogPost, "published" | "updated">) => p.updated ?? p.published;

/** Every blog page that exists, with the languages it exists in and its last change, for prerender and the sitemap. */
export function blogPages(): { path: string; locales: Locale[]; lastmod: (l: Locale) => string | undefined }[] {
  const newest = (list: BlogPost[]) => list.map(postDate).sort().at(-1);
  return [
    // A translated index also lists the English posts, so it changes whenever one is added.
    { path: "/blog", locales: blogLocales, lastmod: (l) => newest(l === defaultLocale ? english : [...english, ...postsIn(l)]) },
    ...english.map((p) => ({
      path: `/blog/${p.slug}`,
      locales: postLocales(p.slug),
      lastmod: (l: Locale) => {
        const post = postsIn(l).find((q) => q.slug === p.slug);
        return post && postDate(post);
      },
    })),
  ];
}

/** Locale-prefixed blog URLs that have no page (no translation), to redirect to the English original. */
export function untranslatedBlogPaths(): { from: string; to: string }[] {
  return locales
    .filter((l) => l !== defaultLocale)
    .flatMap((l) => [
      ...(blogLocales.includes(l) ? [] : [{ from: localizePath(l, "/blog"), to: "/blog" }]),
      ...postSlugs.filter((s) => !postLocales(s).includes(l)).map((s) => ({ from: localizePath(l, `/blog/${s}`), to: `/blog/${s}` })),
    ]);
}

const summarize = (p: BlogPost): PostSummary => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  published: p.published,
  ...(p.updated ? { updated: p.updated } : {}),
  readMinutes: p.readMinutes,
  hero: { src: p.hero.src, width: p.hero.width, height: p.hero.height, alt: p.hero.alt },
});

/**
 * The blog index for a language: its own posts, then (for a translated index) the English posts that have no
 * translation yet, which link to the English page.
 */
export function blogIndex(locale: Locale): { posts: PostSummary[]; english: PostSummary[] } {
  const own = postsIn(locale);
  return {
    posts: own.map(summarize),
    english: locale === defaultLocale ? [] : english.filter((p) => !own.some((o) => o.slug === p.slug)).map(summarize),
  };
}

/** Where a link in a post should go from a page in `locale`: the localized page when one exists. */
function resolveHref(url: string, locale: Locale): string {
  if (!url.startsWith("/") || locale === defaultLocale) return url;
  const [path, hash = ""] = url.split("#");
  const post = /^\/blog\/([^/]+)$/.exec(path);
  if (post) return postLocales(post[1]).includes(locale) ? localizePath(locale, url) : url;
  if (path === "/blog") return blogLocales.includes(locale) ? localizePath(locale, url) : url;
  // English-only sections exist once, at the root.
  if (/^\/(equipment|changelog)(\/|$)/.test(path)) return url;
  return localizePath(locale, path) + (hash ? `#${hash}` : "");
}

// Same syntax as `inline` in legal-page.tsx.
const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

/** Lower case without accents, one character per character, so indexes still line up with the original. */
const fold = (s: string) =>
  Array.from(s, (c) => {
    if (c.length > 1) return c;
    const base = c.normalize("NFD")[0].toLowerCase()[0];
    return ({ ø: "o", ł: "l", đ: "d" } as Record<string, string>)[base] ?? base;
  }).join("");

// A name matches with or without its hyphens and accents ("Lin Yun-ju", "Jang Woo-jin" for "Jang Woojin").
const proPages = players.map((p) => {
  const letters = Array.from(fold(p.name).replace(/[^\p{L}]/gu, ""));
  return {
    key: letters.join(""),
    href: `/equipment/pros/${p.id}`,
    pattern: new RegExp(`(?<!\\p{L})${letters.map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[-\\s]?")}(?!\\p{L})`, "u"),
  };
});

/**
 * Points the first mention of each player who has a pro-setup page at that page: a Wikipedia link with the
 * player's name becomes an internal link, and so does the first plain mention of a player not linked yet.
 * Later Wikipedia links to the same player become plain text, so a post links each player once.
 */
function linkPros(sections: BlogPost["sections"]): BlogPost["sections"] {
  const linked = new Set<string>();
  const linkText = (text: string): string => {
    let out = "";
    let last = 0;
    const plain = (segment: string) => {
      let rest = segment;
      let result = "";
      for (;;) {
        const folded = fold(rest);
        let first: { index: number; length: number; href: string } | undefined;
        for (const pro of proPages) {
          if (linked.has(pro.href)) continue;
          const m = pro.pattern.exec(folded);
          if (m && (!first || m.index < first.index)) first = { index: m.index, length: m[0].length, href: pro.href };
        }
        if (!first) return result + rest;
        linked.add(first.href);
        result += `${rest.slice(0, first.index)}[${rest.slice(first.index, first.index + first.length)}](${first.href})`;
        rest = rest.slice(first.index + first.length);
      }
    };
    for (const match of text.matchAll(INLINE)) {
      const [whole, label, url] = match;
      const index = match.index ?? 0;
      out += plain(text.slice(last, index));
      last = index + whole.length;
      const pro = label && /^https?:\/\/[a-z-]+\.wikipedia\.org\//.test(url) ? proPages.find((p) => p.key === fold(label).replace(/[^\p{L}]/gu, "")) : undefined;
      if (!pro) out += whole;
      else if (linked.has(pro.href)) out += label;
      else {
        linked.add(pro.href);
        out += `[${label}](${pro.href})`;
      }
    }
    return out + plain(text.slice(last));
  };
  const linkBlock = (b: LegalBlock): LegalBlock => (typeof b === "string" ? linkText(b) : { list: b.list.map(linkText) });
  return sections.map((s) => ({ ...s, blocks: s.blocks.map(linkBlock) }));
}

/** Rewrites every `[label](url)` in a post's text to the page it should open from `locale`. */
function localizeLinks(post: BlogPost, locale: Locale): BlogPost {
  const text = (s: string) => s.replace(/\]\((\/[^)]*)\)/g, (_, url: string) => `](${resolveHref(url, locale)})`);
  const block = (b: LegalBlock): LegalBlock => (typeof b === "string" ? text(b) : { list: b.list.map(text) });
  return {
    ...post,
    takeaways: post.takeaways.map(text),
    sections: post.sections.map((s) => ({ ...s, blocks: s.blocks.map(block) })),
  };
}

const MAX_RELATED = 6;

/**
 * One post in one language, ready to render (only real translations, never an English fallback), with links
 * to the newest other posts and the languages it exists in.
 */
export function blogPost(slug: string, locale: Locale): { post: BlogPost; others: PostLink[]; locales: Locale[] } | undefined {
  const post = postsIn(locale).find((p) => p.slug === slug);
  if (!post) return undefined;
  const others = english
    .filter((p) => p.slug !== slug)
    .slice(0, MAX_RELATED)
    .map((p): PostLink => {
      const translated = postsIn(locale).find((q) => q.slug === p.slug);
      return translated
        ? { slug: p.slug, title: translated.title, href: localizePath(locale, `/blog/${p.slug}`), lang: locale }
        : { slug: p.slug, title: p.title, href: `/blog/${p.slug}`, lang: defaultLocale };
    });
  return { post: localizeLinks({ ...post, sections: linkPros(post.sections) }, locale), others, locales: postLocales(slug) };
}
