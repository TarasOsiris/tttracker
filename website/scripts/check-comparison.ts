// Checks one blade-vs-blade article against the catalog and the build-time rules, without a full build:
//   node_modules/.bin/jiti scripts/check-comparison.ts app/equipment/data/versus/<slug>.ts
import { resolve } from "node:path";
import {
  blades,
  brands,
  comparisons,
  glossary,
  guides,
  players,
  rubbers,
} from "../app/equipment/data";
import type { BladeComparison } from "../app/equipment/models";
import { validateEquipment } from "../app/equipment/validate";

const file = process.argv[2];
if (!file) throw new Error("usage: check-comparison.ts <file>");
const mod = (await import(resolve(file))) as { comparison?: BladeComparison };
if (!mod.comparison) throw new Error(`${file} must export \`comparison\``);
const c = mod.comparison;
// Checked alongside the registered articles, so a clashing slug or pair fails here rather than in the build.
validateEquipment({
  brands,
  blades,
  rubbers,
  players,
  guides,
  glossary,
  comparisons: [...comparisons.filter((x) => x !== c), c],
});
if (!comparisons.includes(c))
  console.warn(
    `Note: ${c.slug} isn't in app/equipment/data/versus/index.ts yet, so it has no page until it's added there.`,
  );
const words = [
  c.intro,
  ...c.sections.flatMap((s) =>
    s.blocks.flatMap((b) => (typeof b === "string" ? [b] : b.list)),
  ),
  ...c.faq.map((f) => f.a),
]
  .join(" ")
  .split(/\s+/).length;
console.log(
  `OK ${c.slug}: ${words} words, ${c.sections.length} sections, ${c.faq.length} FAQs, ${c.sources.length} sources, title ${c.title.length} chars, description ${c.description.length} chars`,
);
