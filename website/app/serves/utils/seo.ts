import { localizePath } from "~/i18n/config";
import type { Language } from "../i18n/types";
import { SITE_URL } from "./constants";

/** Absolute URL for a language-neutral path, in the given language. */
export function absoluteUrl(path: string, language: Language): string {
  return `${SITE_URL}${localizePath(language, path)}`;
}

/** BreadcrumbList schema, always rooted at the home page of the active language. */
export function breadcrumbList(
  language: Language,
  homeName: string,
  crumbs: { name: string; path: string }[],
): Record<string, unknown> {
  const items = [{ name: homeName, path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path, language),
    })),
  };
}

/** The FAQ entries on the rules page, as FAQPage schema. */
export function faqPage(t: (key: string) => string, count = FAQ_COUNT): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Array.from({ length: count }, (_, i) => ({
      "@type": "Question",
      name: t(`rules.faq.q${i + 1}`),
      acceptedAnswer: { "@type": "Answer", text: t(`rules.faq.a${i + 1}`) },
    })),
  };
}

export const FAQ_COUNT = 7;
