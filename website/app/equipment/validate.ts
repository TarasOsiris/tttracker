// Build-time checks on the equipment data. Any problem fails `npm run build` with a list of every issue, so a
// value without a source or a rating without its scale can never reach the site.
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Blade, Brand, Guide, GlossaryTerm, Image, Player, Rubber, Source } from "./models";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FIBERS = new Set(["arylate-carbon", "zylon-carbon", "super-zlc", "zylon", "carbon", "aramid-carbon", "aramid", "texalium", "glass", "basalt", "other"]);
const HANDLES = new Set(["FL", "ST", "AN", "CON", "CS", "JP"]);
const RUBBER_TYPES = new Set(["classic", "tensor", "tacky", "hybrid", "short-pips", "medium-pips", "long-pips", "anti"]);
const SCALES = new Set(["esn", "japanese", "chinese", "unstated"]);
const SOURCE_KINDS = new Set(["manufacturer", "ittf", "retailer", "press", "player", "reference"]);
const CONFIDENCE = new Set(["confirmed", "reported", "unverified"]);

export function validateEquipment(data: {
  brands: Brand[];
  blades: Blade[];
  rubbers: Rubber[];
  players: Player[];
  guides: Guide[];
  glossary: GlossaryTerm[];
}): void {
  const errors: string[] = [];
  const err = (where: string, msg: string) => errors.push(`${where}: ${msg}`);

  const checkSource = (where: string, s: Source) => {
    if (!/^https?:\/\//.test(s.url)) err(where, `source url "${s.url}" is not absolute`);
    if (!s.label.trim()) err(where, `source ${s.url} has no label`);
    if (!SOURCE_KINDS.has(s.kind)) err(where, `source ${s.url} has unknown kind "${s.kind}"`);
    if (!ISO_DATE.test(s.accessed)) err(where, `source ${s.url} has bad accessed date "${s.accessed}"`);
  };
  const checkSources = (where: string, sources: Source[]) => {
    if (sources.length === 0) err(where, "has no sources");
    sources.forEach((s) => checkSource(where, s));
  };
  // Images must exist under public/ and say where they came from.
  const checkImage = (where: string, img: Image | undefined) => {
    if (!img) return;
    if (!img.src.startsWith("/equipment/") || !existsSync(join(process.cwd(), "public", img.src))) err(where, `image file ${img.src} is missing from public/`);
    if (!/^https?:\/\//.test(img.sourceUrl)) err(where, `image ${img.src} has no source page`);
    if (!img.credit.trim()) err(where, `image ${img.src} has no credit`);
    if (!(img.width > 0 && img.height > 0)) err(where, `image ${img.src} has no size`);
  };
  const unique = (kind: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) err(kind, `duplicate id "${id}"`);
      seen.add(id);
      if (!SLUG.test(id)) err(kind, `id "${id}" is not a lowercase slug`);
    }
  };

  unique("brands", data.brands.map((b) => b.id));
  unique("blades", data.blades.map((b) => b.id));
  unique("rubbers", data.rubbers.map((r) => r.id));
  unique("players", data.players.map((p) => p.id));
  unique("guides", data.guides.map((g) => g.slug));
  unique("glossary", data.glossary.map((t) => t.id));

  const brandIds = new Set(data.brands.map((b) => b.id));
  data.brands.forEach((b) => {
    checkSources(`brand ${b.id}`, b.sources);
    checkImage(`brand ${b.id}`, b.logo);
    if (b.hardnessScale && !SCALES.has(b.hardnessScale)) err(`brand ${b.id}`, `unknown hardness scale "${b.hardnessScale}"`);
  });

  for (const item of [...data.blades, ...data.rubbers]) {
    const where = `${"plies" in item ? "blade" : "rubber"} ${item.id}`;
    if (!brandIds.has(item.brandId)) err(where, `unknown brand "${item.brandId}"`);
    if (!item.id.startsWith(`${item.brandId}-`)) err(where, `id should start with "${item.brandId}-"`);
    checkSources(where, item.sources);
    checkImage(where, item.photo);
    if (!ISO_DATE.test(item.lastVerified)) err(where, `bad lastVerified "${item.lastVerified}"`);
    if (!item.summary.trim()) err(where, "has no summary");
    if (item.description.length === 0) err(where, "has no description");
    const urls = new Set(item.sources.map((s) => s.url));
    item.facts.forEach((f) => {
      if (!urls.has(f.source)) err(where, `fact "${f.text.slice(0, 40)}..." cites ${f.source}, which isn't in its sources`);
    });
    item.manufacturerRatings.forEach((r) => {
      if (!r.label.trim()) err(where, "manufacturer rating without a label");
      if (r.max != null && typeof r.value === "number" && r.value > r.max) err(where, `rating ${r.label} ${r.value} exceeds max ${r.max}`);
    });
    if (item.releaseYear != null && (item.releaseYear < 1950 || item.releaseYear > new Date().getUTCFullYear() + 1))
      err(where, `implausible release year ${item.releaseYear}`);
  }

  for (const b of data.blades) {
    const where = `blade ${b.id}`;
    b.fibers.forEach((f) => FIBERS.has(f) || err(where, `unknown fiber "${f}"`));
    b.handles.forEach((h) => HANDLES.has(h) || err(where, `unknown handle "${h}"`));
    if (b.fibers.length === 0 && b.fiberPosition) err(where, "all-wood blade with a fiber position");
    if (b.fibers.length > 0 && b.fiberName == null) err(where, "composite blade without the maker's fiber name");
    if (b.plyOrder && b.plies != null && b.plyOrder.length !== b.plies) err(where, `plyOrder has ${b.plyOrder.length} plies, plies says ${b.plies}`);
    if (b.thicknessMm != null && (b.thicknessMm < 4 || b.thicknessMm > 9)) err(where, `implausible thickness ${b.thicknessMm} mm`);
    if (b.weightG && (b.weightG.min < 50 || (b.weightG.max ?? b.weightG.min) > 130 || (b.weightG.max != null && b.weightG.max < b.weightG.min)))
      err(where, `implausible weight ${JSON.stringify(b.weightG)}`);
  }

  for (const r of data.rubbers) {
    const where = `rubber ${r.id}`;
    if (!RUBBER_TYPES.has(r.type)) err(where, `unknown type "${r.type}"`);
    if (r.hardness) {
      if (!SCALES.has(r.hardness.scale)) err(where, `hardness without a valid scale (${r.hardness.scale})`);
      if (r.hardness.min < 20 || r.hardness.min > 65) err(where, `implausible hardness ${r.hardness.min}`);
      if (r.hardness.max != null && r.hardness.max < r.hardness.min) err(where, "hardness max below min");
    }
    if (r.pips && !r.type.includes("pips") && r.type !== "anti") err(where, "pip geometry on a pips-in rubber");
  }

  const bladeIds = new Set(data.blades.map((b) => b.id));
  const rubberIds = new Set(data.rubbers.map((r) => r.id));
  for (const p of data.players) {
    const where = `player ${p.id}`;
    if (p.ranking) {
      checkSource(where, p.ranking.source);
      if (!ISO_DATE.test(p.ranking.date)) err(where, `bad ranking date "${p.ranking.date}"`);
    }
    if (!ISO_DATE.test(p.lastVerified)) err(where, `bad lastVerified "${p.lastVerified}"`);
    checkImage(where, p.photo);
    for (const slot of ["blade", "forehand", "backhand"] as const) {
      const s = p.setup[slot];
      if (!s) {
        err(where, `missing ${slot}`);
        continue;
      }
      const ids = slot === "blade" ? bladeIds : rubberIds;
      if (s.itemId != null && !ids.has(s.itemId)) err(where, `${slot} points at unknown ${slot === "blade" ? "blade" : "rubber"} "${s.itemId}"`);
      if (!CONFIDENCE.has(s.confidence)) err(where, `${slot} has unknown confidence "${s.confidence}"`);
      if (!ISO_DATE.test(s.asOf)) err(where, `${slot} has bad asOf "${s.asOf}"`);
      checkSource(`${where} ${slot}`, s.source);
    }
    p.history.forEach((h) => {
      checkSource(`${where} history`, h.source);
      if (!ISO_DATE.test(h.date)) err(where, `history entry has bad date "${h.date}"`);
    });
  }

  for (const g of data.guides) {
    checkSources(`guide ${g.slug}`, g.sources);
    for (const s of g.sections) {
      const f = s.figure;
      if (!f) continue;
      const where = `guide ${g.slug} figure in "${s.heading}"`;
      if (!f.caption.trim()) err(where, "has no caption");
      if (f.type === "photo") {
        checkImage(where, f.image);
        if (!f.image.alt.trim()) err(where, "photo has no alt text");
      }
      if (f.type === "products")
        for (const it of f.items)
          if (!(it.kind === "blade" ? bladeIds : rubberIds).has(it.id)) err(where, `points at unknown ${it.kind} "${it.id}"`);
    }
  }
  const guideSlugs = new Set(data.guides.map((g) => g.slug));
  for (const t of data.glossary) if (t.guide && !guideSlugs.has(t.guide)) err(`glossary ${t.id}`, `unknown guide "${t.guide}"`);

  // Inline links to equipment pages must point at pages that exist.
  const pages: Record<string, Set<string>> = {
    blades: bladeIds,
    rubbers: rubberIds,
    pros: new Set(data.players.map((p) => p.id)),
    guides: guideSlugs,
  };
  const checkLinks = (where: string, text: string) => {
    for (const m of text.matchAll(/\]\(\/equipment\/(blades|rubbers|pros|guides)\/([^)?#\s]+)/g)) {
      if (!pages[m[1]].has(m[2])) err(where, `links to missing page /equipment/${m[1]}/${m[2]}`);
    }
  };
  for (const g of data.guides) {
    checkLinks(`guide ${g.slug}`, g.intro);
    g.sections.forEach((s) => s.blocks.forEach((b) => (typeof b === "string" ? [b] : b.list).forEach((t) => checkLinks(`guide ${g.slug}`, t))));
  }
  for (const t of data.glossary) checkLinks(`glossary ${t.id}`, t.definition);
  for (const item of [...data.blades, ...data.rubbers]) {
    [...item.description, ...item.facts.map((f) => f.text), ...(item.notes ?? [])].forEach((t) => checkLinks(item.id, t));
  }

  if (errors.length) {
    throw new Error(`Equipment data failed validation (${errors.length} issue${errors.length > 1 ? "s" : ""}):\n- ${errors.join("\n- ")}`);
  }
}
