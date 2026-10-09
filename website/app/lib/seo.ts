import type { MetaDescriptor } from "react-router";
import { appNames, SITE_URL } from "~/content/site";
import { type Locale, localeInfo, locales, localizePath } from "~/i18n/config";

/** Share card per language: the home hero rendered by `scripts/og-images.sh` into public/og/. */
export const OG_IMAGE = { width: 1200, height: 630 };
export const ogImageUrl = (locale: Locale) => `${SITE_URL}/og/${locale}.jpg`;

/** Google cuts snippets at about 155–160 characters; cut on a word boundary so it ends cleanly. */
const MAX_DESCRIPTION = 160;

export function clampDescription(text: string): string {
  if (text.length <= MAX_DESCRIPTION) return text;
  const cut = text.slice(0, MAX_DESCRIPTION - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > MAX_DESCRIPTION - 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, "")}…`;
}

/**
 * `path` is locale-neutral ("/drills"); canonical and hreflang alternates are derived from it. A page
 * that exists in one language only (`localized: false`) gets no alternates, and one that exists in some
 * languages lists just those (`alternates`, which must include English, the x-default).
 */
export function seo({
  title,
  description: raw,
  path,
  locale,
  localized = true,
  alternates = locales,
  image = { src: ogImageUrl(locale), ...OG_IMAGE, alt: appNames[locale].name },
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  localized?: boolean;
  alternates?: readonly Locale[];
  /** Share card; defaults to the language's home hero. `src` may be site-relative. */
  image?: { src: string; width: number; height: number; alt: string };
}): MetaDescriptor[] {
  const description = clampDescription(raw);
  const imageUrl = image.src.startsWith("/") ? `${SITE_URL}${image.src}` : image.src;
  const url = `${SITE_URL}${localizePath(locale, path)}`;
  const alternateLinks: MetaDescriptor[] =
    localized && alternates.length > 1
    ? [
        ...alternates.map((l) => ({
          tagName: "link",
          rel: "alternate",
          hrefLang: localeInfo[l].hreflang,
          href: `${SITE_URL}${localizePath(l, path)}`,
        })),
        { tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${path}` },
      ]
    : [];
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...alternateLinks,
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: appNames[locale].name },
    { property: "og:locale", content: localeInfo[locale].og },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: String(image.width) },
    { property: "og:image:height", content: String(image.height) },
    { property: "og:image:alt", content: image.alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];
}
