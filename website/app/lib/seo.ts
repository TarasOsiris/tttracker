import type { MetaDescriptor } from "react-router";
import { APP_NAME, SITE_URL } from "~/content/site";
import { type Locale, localeInfo, locales, localizePath } from "~/i18n/config";

/**
 * `path` is locale-neutral ("/drills"); canonical and hreflang alternates are derived from it. A page
 * that exists in one language only (`localized: false`) gets no alternates.
 */
export function seo({
  title,
  description,
  path,
  locale,
  localized = true,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  localized?: boolean;
}): MetaDescriptor[] {
  const url = `${SITE_URL}${localizePath(locale, path)}`;
  const alternates: MetaDescriptor[] = localized
    ? [
        ...locales.map((l) => ({
          tagName: "link",
          rel: "alternate",
          hrefLang: localeInfo[l].hreflang,
          href: `${SITE_URL}${localizePath(l, path)}`,
        })),
        { tagName: "link", rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${path}` },
      ]
    : [];
  const image = `${SITE_URL}/og-image.png`;
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    ...alternates,
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: APP_NAME },
    { property: "og:locale", content: localeInfo[locale].og },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}
