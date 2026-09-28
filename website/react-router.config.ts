import { copyFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Config } from "@react-router/dev/config";
import { drills } from "./app/content/drills";
import { SITE_URL } from "./app/content/site";

const paths = ["/", "/drills", ...drills.map((d) => `/drills/${d.slug}`)];

export default {
  ssr: false,
  prerender: paths,
  // Sitemap and 404 page are derived from the same route list, so new drills can't be missed.
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, "client");
    const urls = paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n");
    await writeFile(
      join(client, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    );
    await copyFile(join(client, "__spa-fallback.html"), join(client, "404.html"));
  },
} satisfies Config;
