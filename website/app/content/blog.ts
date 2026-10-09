// Blog post types and formatting, safe for the client bundle. The posts themselves live in blog-posts.ts and
// reach pages only through the build-time loaders in blog.server.ts, so a page ships just the post it shows.
// Posts are written in English; a few have translations. Inline links use [label](url) and **bold**, same as
// the legal pages. Adding a post adds its page to the prerender list and sitemap.xml automatically.
import { defaultLocale, type Locale, localeInfo } from "../i18n/config";
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
  /** ISO date of the last substantive edit, if the post was revised after publishing. */
  updated?: string;
  readMinutes: number;
  keywords: string[];
  hero: BlogImage;
  intro: string;
  /** "In short" bullets shown right under the intro. */
  takeaways: string[];
  sections: { heading: string; image?: BlogImage; blocks: LegalBlock[] }[];
  sources: { label: string; url: string }[];
};

/** What a list of posts needs: the card fields, without the article body. */
export type PostSummary = Pick<BlogPost, "slug" | "title" | "description" | "published" | "updated" | "readMinutes"> & {
  hero: Pick<BlogImage, "src" | "width" | "height" | "alt">;
};

/** A link to another post: in the page's language when translated, otherwise the English original. */
export type PostLink = { slug: string; title: string; href: string; lang: Locale };

export function formatDate(iso: string, locale: Locale = defaultLocale): string {
  const tag = localeInfo[locale]?.hreflang ?? "en";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(tag, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

