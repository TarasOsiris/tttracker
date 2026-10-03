import type { MetaDescriptor } from "react-router";
import { APP_NAME, SITE_URL } from "~/content/site";
import { seo } from "~/lib/seo";

export const SECTION = "Table Tennis Equipment Encyclopedia";

export const absolute = (path: string) => `${SITE_URL}${path}`;

/** English-only page meta plus any JSON-LD blocks. */
export function equipmentMeta({
  title,
  description,
  path,
  jsonLd = [],
  image,
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>[];
  /** Share card; defaults to the site's. */
  image?: { src: string; width: number; height: number; alt: string };
}): MetaDescriptor[] {
  return [
    ...seo({ title: `${title} | ${APP_NAME}`, description, path, locale: "en", localized: false, ...(image ? { image } : {}) }),
    ...jsonLd.map((data) => ({ "script:ld+json": data })),
  ];
}

export function breadcrumbs(crumbs: { name: string; path: string }[]): Record<string, unknown> {
  const items = [{ name: "Home", path: "/" }, { name: "Equipment", path: "/equipment" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absolute(c.path) })),
  };
}

export function itemList(name: string, path: string, items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: absolute(path),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absolute(it.path) })),
    },
  };
}
