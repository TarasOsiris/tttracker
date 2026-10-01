import { appNames, SITE_URL } from "~/content/site";
import { localeInfo, locales, localizePath } from "~/i18n/config";
import { useLanguage } from "../context";

export type JsonLd = Record<string, unknown> | (Record<string, unknown> | undefined)[];

export interface SeoProps {
  title: string;
  description: string;
  /** Language-neutral path, e.g. `/serves/pendulum`. */
  path?: string;
  /** Accepted for compatibility; every page is og:type "website". */
  type?: string;
  jsonLd?: JsonLd;
  noIndex?: boolean;
}

/** Search results and social cards truncate well before this; cut on a word boundary. */
const MAX_DESCRIPTION = 200;

function clampDescription(text: string): string {
  if (text.length <= MAX_DESCRIPTION) return text;
  const cut = text.slice(0, MAX_DESCRIPTION);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > MAX_DESCRIPTION - 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * Head tags for serve pages. React 19 hoists <title>/<meta>/<link> into <head>, both when
 * prerendering and on client navigation, so pages can keep declaring their SEO inline.
 */
export function Seo({ title, description: raw, path = "/", jsonLd, noIndex }: SeoProps) {
  const { language } = useLanguage();
  const description = clampDescription(raw);
  const url = `${SITE_URL}${localizePath(language, path)}`;
  const image = `${SITE_URL}/og-image.png`;
  const blocks = (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []).filter(Boolean);
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={url} />
      {!noIndex &&
        locales.map((l) => (
          <link key={l} rel="alternate" hrefLang={localeInfo[l].hreflang} href={`${SITE_URL}${localizePath(l, path)}`} />
        ))}
      {!noIndex && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={appNames[language].name} />
      <meta property="og:locale" content={localeInfo[language].og} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }} />
      ))}
    </>
  );
}
