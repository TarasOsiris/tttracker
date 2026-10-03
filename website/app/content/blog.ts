// Blog posts, in English only (news and commentary are not translated). Newest first. Inline links use
// [label](url) and **bold**, same as the legal pages. Adding a post here adds its page to the prerender
// list and sitemap.xml automatically.
import type { LegalBlock } from "./legal";

export type BlogImage = {
  /** File under public/blog/. */
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Caption shown under the image; say honestly when it is an archive photo. */
  caption: string;
  /** Photographer and licence, e.g. "Bearas, CC BY-SA 4.0". */
  credit: string;
  /** Page the photo came from (Wikimedia Commons file page). */
  creditUrl: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description / card summary, aim for 140-160 characters. */
  description: string;
  /** ISO date. */
  published: string;
  readMinutes: number;
  keywords: string[];
  hero: BlogImage;
  intro: string;
  /** "In short" bullets shown right under the intro. */
  takeaways: string[];
  sections: { heading: string; image?: BlogImage; blocks: LegalBlock[] }[];
  sources: { label: string; url: string }[];
};

import { defaultLocale, type Locale, localeInfo } from "../i18n/config";
import { blogPostsByLocale } from "./blog-posts";

export const posts: BlogPost[] = blogPostsByLocale.en;
export const postSlugs = posts.map((p) => p.slug);

export function getPosts(locale: Locale = defaultLocale): BlogPost[] {
  return blogPostsByLocale[locale] ?? blogPostsByLocale.en;
}

export function getPost(slug: string, locale: Locale = defaultLocale): BlogPost | undefined {
  const list = getPosts(locale);
  return list.find((p) => p.slug === slug);
}

export const BLOG_TITLE = "Table Tennis News & Tips Blog";
export const BLOG_DESCRIPTION =
  "Latest table tennis news, tournament recaps and practical training tips for ping pong players, from the makers of Ping Pong & Table Tennis Log.";

export function formatDate(iso: string, locale: Locale = defaultLocale): string {
  const tag = localeInfo[locale]?.hreflang ?? "en";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(tag, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

