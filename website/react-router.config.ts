import { copyFile, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Config } from "@react-router/dev/config";
import { blogPages, untranslatedBlogPaths } from "./app/content/blog.server";
import { drillSlugs } from "./app/content/drills";
import { SITE_URL } from "./app/content/site";
import { defaultLocale, type Locale, localeInfo, locales, localizePath } from "./app/i18n/config";
import { blades, brands, guides, players, rubbers } from "./app/equipment/data";
import { motions, serves } from "./app/serves/data";

const neutralPaths = [
  "/",
  "/drills",
  ...drillSlugs.map((s) => `/drills/${s}`),
  "/serves",
  ...serves.map((s) => `/serves/${s.id}`),
  "/motions",
  ...motions.map((m) => `/motions/${m.id}`),
  "/spins",
  "/rules",
  "/quiz",
  "/about",
  "/privacy",
  "/terms",
];
const equipmentPaths = [
  "/equipment",
  "/equipment/blades",
  ...blades.map((b) => `/equipment/blades/${b.id}`),
  "/equipment/rubbers",
  ...rubbers.map((r) => `/equipment/rubbers/${r.id}`),
  ...brands.map((b) => `/equipment/brands/${b.id}`),
  "/equipment/compare",
  "/equipment/pros",
  ...players.map((p) => `/equipment/pros/${p.id}`),
  "/equipment/guides",
  ...guides.map((g) => `/equipment/guides/${g.slug}`),
  "/equipment/glossary",
];
// Spec-drawn product illustrations, prerendered as static .svg files (not pages, so not in the sitemap).
const illustrationPaths = [
  ...blades.map((b) => `/equipment/img/blades/${b.id}.svg`),
  ...rubbers.map((r) => `/equipment/img/rubbers/${r.id}.svg`),
];
/** A page and the languages it exists in; `lastmod` only where a real date is known (never the build date). */
type Page = { path: string; locales: readonly Locale[]; lastmod?: (l: Locale) => string | undefined };

const pages: Page[] = [
  ...neutralPaths.map((path) => ({ path, locales })),
  // Blog posts are written in English; a language gets a page only for the posts translated into it.
  ...blogPages(),
  ...equipmentPaths.map((path) => ({ path, locales: [defaultLocale] })),
];

const paths = [...pages.flatMap((p) => p.locales.map((l) => localizePath(l, p.path))), ...illustrationPaths];

function sitemap() {
  const entries = pages.flatMap((p) =>
    p.locales.map((l) => {
      const lastmod = p.lastmod?.(l);
      // A page in one language has no alternates; the others list each language it exists in.
      const alternates =
        p.locales.length > 1
          ? p.locales.map((a) => `\n    <xhtml:link rel="alternate" hreflang="${localeInfo[a].hreflang}" href="${SITE_URL}${localizePath(a, p.path)}"/>`).join("") +
            `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${p.path}"/>`
          : "";
      return `  <url>\n    <loc>${SITE_URL}${localizePath(l, p.path)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}${alternates}\n  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
}

/** serve.json for the `npx serve` path: the static settings in public/ plus redirects for blog URLs with no translation. */
async function serveConfig(client: string) {
  const file = join(client, "serve.json");
  const config = JSON.parse(await readFile(file, "utf8"));
  const redirects = untranslatedBlogPaths().map(({ from, to }) => ({ source: from, destination: to, type: 301 }));
  await writeFile(file, `${JSON.stringify({ ...config, redirects: [...(config.redirects ?? []), ...redirects] }, null, 2)}\n`);
}

export default {
  ssr: false,
  prerender: paths,
  // Sitemap and 404 page are derived from the same route list, so new drills or locales can't be missed.
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, "client");
    await writeFile(join(client, "sitemap.xml"), sitemap());
    await serveConfig(client);
    await copyFile(join(client, "__spa-fallback.html"), join(client, "404.html"));
  },
} satisfies Config;
