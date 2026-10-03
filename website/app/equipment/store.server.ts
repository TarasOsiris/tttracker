// Build-time access to the equipment data. Validates everything once, then hands each page only what it renders,
// so a blade page doesn't ship the whole catalog.
import { blades, brands, glossary, guides, players, rubbers } from "./data";
import { type HardnessBand, hardnessBands } from "./hardness";
import { construction } from "./labels";
import type { Blade, Brand, Player, Rubber, SetupSlot } from "./models";
import { validateEquipment } from "./validate";

validateEquipment({ brands, blades, rubbers, players, guides, glossary });

const brandById = new Map(brands.map((b) => [b.id, b]));
const bladeById = new Map(blades.map((b) => [b.id, b]));
const rubberById = new Map(rubbers.map((r) => [r.id, r]));
const playerById = new Map(players.map((p) => [p.id, p]));

export type PlayerRef = { id: string; name: string; country: string; slot: SetupSlot; variant?: string };

/** Who uses each catalog item, from the pro setups. */
const usage = new Map<string, PlayerRef[]>();
for (const p of players) {
  for (const slot of ["blade", "forehand", "backhand"] as const) {
    const s = p.setup[slot];
    if (!s.itemId) continue;
    const key = `${slot === "blade" ? "blade" : "rubber"}:${s.itemId}`;
    const list = usage.get(key) ?? [];
    // A player using the same rubber on both sides is listed once.
    if (!list.some((r) => r.id === p.id)) list.push({ id: p.id, name: p.name, country: p.country, slot, variant: s.variant });
    usage.set(key, list);
  }
}
const usedBy = (kind: "blade" | "rubber", id: string) => usage.get(`${kind}:${id}`) ?? [];

export type BrandRef = Pick<Brand, "id" | "name" | "country" | "ratingNote">;
const brandRef = (id: string): BrandRef => {
  const b = brandById.get(id)!;
  return { id: b.id, name: b.name, country: b.country, ratingNote: b.ratingNote };
};

export type BladeRow = Pick<
  Blade,
  | "id" | "name" | "brandId" | "layup" | "plies" | "fibers" | "fiberName" | "fiberPosition" | "thicknessMm" | "weightG"
  | "handles" | "manufacturerClass" | "status" | "summary" | "releaseYear"
> & { brandName: string; construction: string; proCount: number };

export type RubberRow = Pick<
  Rubber,
  "id" | "name" | "brandId" | "type" | "tackiness" | "hardness" | "spongeThicknesses" | "status" | "summary" | "releaseYear" | "ittfApproved"
> & { brandName: string; bands: HardnessBand[]; proCount: number };

function bladeRow(b: Blade): BladeRow {
  return {
    id: b.id, name: b.name, brandId: b.brandId, layup: b.layup, plies: b.plies, fibers: b.fibers, fiberName: b.fiberName,
    fiberPosition: b.fiberPosition, thicknessMm: b.thicknessMm, weightG: b.weightG, handles: b.handles,
    manufacturerClass: b.manufacturerClass, status: b.status, summary: b.summary, releaseYear: b.releaseYear,
    brandName: brandById.get(b.brandId)!.name, construction: construction(b), proCount: usedBy("blade", b.id).length,
  };
}

function rubberRow(r: Rubber): RubberRow {
  return {
    id: r.id, name: r.name, brandId: r.brandId, type: r.type, tackiness: r.tackiness, hardness: r.hardness,
    spongeThicknesses: r.spongeThicknesses, status: r.status, summary: r.summary, releaseYear: r.releaseYear,
    ittfApproved: r.ittfApproved, brandName: brandById.get(r.brandId)!.name, bands: hardnessBands(r.hardness),
    proCount: usedBy("rubber", r.id).length,
  };
}

const byBrandThenName = <T extends { brandName: string; name: string }>(a: T, b: T) =>
  a.brandName.localeCompare(b.brandName, "en") || a.name.localeCompare(b.name, "en", { numeric: true });

const brandOptions = (ids: string[]) =>
  brands.filter((b) => ids.includes(b.id)).map((b) => ({ id: b.id, name: b.name }));

export function bladesPayload() {
  const rows = blades.map(bladeRow).sort(byBrandThenName);
  return { rows, brands: brandOptions([...new Set(blades.map((b) => b.brandId))]) };
}

export function rubbersPayload() {
  const rows = rubbers.map(rubberRow).sort(byBrandThenName);
  return { rows, brands: brandOptions([...new Set(rubbers.map((r) => r.brandId))]) };
}

function similarBlades(b: Blade): BladeRow[] {
  const target = construction(b);
  return blades
    .filter((o) => o.id !== b.id && construction(o) === target && o.fibers.join() === b.fibers.join())
    .map((o) => ({ o, d: Math.abs((o.thicknessMm ?? 99) - (b.thicknessMm ?? 99)) + (o.plies === b.plies ? 0 : 1) + (o.brandId === b.brandId ? 0 : 0.5) }))
    .sort((x, y) => x.d - y.d)
    .slice(0, 6)
    .map(({ o }) => bladeRow(o));
}

function similarRubbers(r: Rubber): RubberRow[] {
  const bands = hardnessBands(r.hardness);
  return rubbers
    .filter((o) => o.id !== r.id && o.type === r.type)
    .map((o) => ({ o, d: (hardnessBands(o.hardness).some((x) => bands.includes(x)) ? 0 : 1) + (o.brandId === r.brandId ? 0 : 0.5) }))
    .sort((x, y) => x.d - y.d)
    .slice(0, 6)
    .map(({ o }) => rubberRow(o));
}

export function bladePayload(id: string) {
  const blade = bladeById.get(id);
  if (!blade) return null;
  return { blade, brand: brandRef(blade.brandId), usedBy: usedBy("blade", id), similar: similarBlades(blade) };
}

export function rubberPayload(id: string) {
  const rubber = rubberById.get(id);
  if (!rubber) return null;
  return {
    rubber,
    brand: brandRef(rubber.brandId),
    bands: hardnessBands(rubber.hardness),
    usedBy: usedBy("rubber", id),
    similar: similarRubbers(rubber),
  };
}

/** Everything the compare table can show, minus the prose. */
export function comparePayload() {
  const strip = <T extends Blade | Rubber>(item: T) => {
    const rest: Partial<T> = { ...item };
    delete rest.description;
    delete rest.facts;
    delete rest.sources;
    return rest as Omit<T, "description" | "facts" | "sources">;
  };
  return {
    blades: blades.map((b) => ({ ...strip(b), brandName: brandById.get(b.brandId)!.name, construction: construction(b) })),
    rubbers: rubbers.map((r) => ({ ...strip(r), brandName: brandById.get(r.brandId)!.name, bands: hardnessBands(r.hardness) })),
    brands: brands.map((b) => brandRef(b.id)),
  };
}

export type ResolvedSetupItem = Player["setup"]["blade"] & { brandName: string | null };
export type PlayerRow = Omit<Player, "setup" | "history" | "photo"> & { setup: Record<SetupSlot, ResolvedSetupItem> };

function resolveSetup(p: Player): Record<SetupSlot, ResolvedSetupItem> {
  const resolve = (slot: SetupSlot): ResolvedSetupItem => {
    const s = p.setup[slot];
    const item = s.itemId ? (slot === "blade" ? bladeById.get(s.itemId) : rubberById.get(s.itemId)) : undefined;
    return { ...s, brandName: item ? brandById.get(item.brandId)!.name : null };
  };
  return { blade: resolve("blade"), forehand: resolve("forehand"), backhand: resolve("backhand") };
}

function playerRow(p: Player): PlayerRow {
  const { id, name, country, gender, hand, grip, ranking, lastVerified } = p;
  return { id, name, country, gender, hand, grip, ranking, lastVerified, setup: resolveSetup(p) };
}

/** Most-used catalog items among the tracked players; a player counts once per item. */
function mostUsed(kind: "blade" | "rubber", lookup: Map<string, Blade | Rubber>) {
  return [...lookup.values()]
    .map((item) => ({ id: item.id, name: item.name, brandName: brandById.get(item.brandId)!.name, count: usedBy(kind, item.id).length }))
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 6);
}

export function prosPayload() {
  const rank = (p: Player) => p.ranking?.position ?? Number.POSITIVE_INFINITY;
  const sorted = [...players].sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
  return {
    rows: sorted.map(playerRow),
    topBlades: mostUsed("blade", bladeById),
    topRubbers: mostUsed("rubber", rubberById),
  };
}

export function playerPayload(id: string) {
  const player = playerById.get(id);
  if (!player) return null;
  return { player, setup: resolveSetup(player) };
}

export function hubPayload() {
  const pros = prosPayload();
  return {
    counts: { blades: blades.length, rubbers: rubbers.length, brands: brands.length, players: players.length },
    brands: brands.map((b) => ({
      id: b.id,
      name: b.name,
      country: b.country,
      blades: blades.filter((x) => x.brandId === b.id).length,
      rubbers: rubbers.filter((x) => x.brandId === b.id).length,
    })),
    topBlades: pros.topBlades,
    topRubbers: pros.topRubbers,
    guides: guides.map(({ slug, title, description }) => ({ slug, title, description })),
  };
}

export function brandPayload(id: string) {
  const brand = brandById.get(id);
  if (!brand) return null;
  const byName = <T extends { name: string }>(a: T, b: T) => a.name.localeCompare(b.name, "en", { numeric: true });
  return {
    brand,
    blades: blades.filter((b) => b.brandId === id).map(bladeRow).sort(byName),
    rubbers: rubbers.filter((r) => r.brandId === id).map(rubberRow).sort(byName),
  };
}

export function guidesPayload() {
  return guides.map(({ slug, title, description }) => ({ slug, title, description }));
}

export function guidePayload(slug: string) {
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return null;
  const terms = glossary.filter((t) => t.guide === slug);
  return { guide, terms, others: guidesPayload().filter((g) => g.slug !== slug) };
}

export function glossaryPayload() {
  return [...glossary].sort((a, b) => a.term.localeCompare(b.term, "en"));
}

export const brandIds = brands.map((b) => b.id);
export const bladeIds = blades.map((b) => b.id);
export const rubberIds = rubbers.map((r) => r.id);
export const playerIds = players.map((p) => p.id);
export const guideSlugs = guides.map((g) => g.slug);

export function illustrationSubject(kind: "blades" | "rubbers", id: string) {
  if (kind === "blades") {
    const item = bladeById.get(id);
    return item ? { kind, item, title: `Illustration of the ${brandById.get(item.brandId)!.name} ${item.name} blade` } : null;
  }
  const item = rubberById.get(id);
  return item ? { kind, item, title: `Illustration of ${brandById.get(item.brandId)!.name} ${item.name} rubber` } : null;
}

export const illustrationUrl = (kind: "blades" | "rubbers", id: string) => `/equipment/img/${kind}/${id}.svg`;
