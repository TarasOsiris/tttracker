// Refresh exact App Store quotes before building; keep a tracked fallback for outages.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fetchAppStoreReviews } from "./lib/app-store-reviews.mjs";

const APPS = {
  "table-tennis-tracker": "6758044383"
};
const output = new URL("../app/content/app-store-reviews.json", import.meta.url);
let previous = { apps: {} };
try { previous = JSON.parse(await readFile(output, "utf8")); } catch { /* First fetch. */ }
const apps = {};
for (const [slug, appId] of Object.entries(APPS)) {
  apps[slug] = await fetchAppStoreReviews(appId, previous.apps?.[slug] ?? []);
  console.log(slug + ": " + apps[slug].length + " App Store reviews");
}
if (JSON.stringify(apps) !== JSON.stringify(previous.apps)) {
  await mkdir(new URL(".", output), { recursive: true });
  await writeFile(output, JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), apps }, null, 2) + "\n");
}
