import { copyFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Config } from "@react-router/dev/config";
import { drillSlugs } from "./app/content/drills";
import { SITE_URL } from "./app/content/site";
import { localeInfo, locales, localizePath } from "./app/i18n/config";
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
];
const paths = locales.flatMap((l) => neutralPaths.map((p) => localizePath(l, p)));

function sitemap() {
  const entries = locales.flatMap((l) =>
    neutralPaths.map((p) => {
      const alternates = locales
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${localeInfo[a].hreflang}" href="${SITE_URL}${localizePath(a, p)}"/>`)
        .join("\n");
      return `  <url>\n    <loc>${SITE_URL}${localizePath(l, p)}</loc>\n${alternates}\n  </url>`;
    }),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`;
}

export default {
  ssr: false,
  prerender: paths,
  // Sitemap and 404 page are derived from the same route list, so new drills or locales can't be missed.
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, "client");
    await writeFile(join(client, "sitemap.xml"), sitemap());
    await copyFile(join(client, "__spa-fallback.html"), join(client, "404.html"));
  },
} satisfies Config;
