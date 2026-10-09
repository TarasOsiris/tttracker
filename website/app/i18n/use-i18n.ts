import { useLocation, useRouteLoaderData } from "react-router";
import type { loader as rootLoader } from "~/root";
import { type Locale, localeFromPath, localizePath } from "./config";

export function useLocale(): Locale {
  return localeFromPath(useLocation().pathname);
}

export function useI18n() {
  const data = useRouteLoaderData<typeof rootLoader>("root");
  const locale = useLocale();
  if (!data) throw new Error("Root loader data missing");
  return {
    t: data.t,
    locale,
    href: (path: string) => localizePath(locale, path),
    /** The blog index in this language when it has one, otherwise the English blog. */
    blogHref: data.blogLocales.includes(locale) ? localizePath(locale, "/blog") : "/blog",
  };
}
