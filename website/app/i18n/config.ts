export const locales = ["en", "es", "de", "fr", "pt", "ja", "zh", "ko", "it", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeInfo: Record<Locale, { label: string; hreflang: string; og: string }> = {
  en: { label: "English", hreflang: "en", og: "en_US" },
  es: { label: "Español", hreflang: "es", og: "es_ES" },
  de: { label: "Deutsch", hreflang: "de", og: "de_DE" },
  fr: { label: "Français", hreflang: "fr", og: "fr_FR" },
  pt: { label: "Português", hreflang: "pt-BR", og: "pt_BR" },
  ja: { label: "日本語", hreflang: "ja", og: "ja_JP" },
  zh: { label: "简体中文", hreflang: "zh-Hans", og: "zh_CN" },
  ko: { label: "한국어", hreflang: "ko", og: "ko_KR" },
  it: { label: "Italiano", hreflang: "it", og: "it_IT" },
  uk: { label: "Українська", hreflang: "uk", og: "uk_UA" },
};

const isLocale = (s: string | undefined): s is Locale => !!s && (locales as readonly string[]).includes(s);

export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : defaultLocale;
}

/** "/es/drills" -> "/drills" */
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (!isLocale(seg) || seg === defaultLocale) return pathname || "/";
  return pathname.slice(seg.length + 1) || "/";
}

/** ("es", "/drills") -> "/es/drills"; ("es", "/#faq") -> "/es#faq" */
export function localizePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
