import { useMemo } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/BladeExplorer";
import { BladeCard } from "../components/Cards";
import { ExplorerShell, type FilterDef, type SortDef, useFilters } from "../components/Filters";
import { PageHeader } from "../components/Parts";
import { fiberLabels, handleLabels } from "../labels";
import type { Image, Fiber, Handle } from "../models";
import { type BladeRow, bladesPayload } from "../store.server";
import { breadcrumbs, equipmentMeta, itemList } from "../utils/seo";

export function loader() {
  return bladesPayload();
}

const TITLE = "Table Tennis Blades";

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const rows = loaderData?.rows ?? [];
  return equipmentMeta({
    title: `${TITLE}: Specs, Plies & Carbon Types Compared`,
    description: `Compare ${rows.length} table tennis blades from ${loaderData?.brands.length ?? 0} brands. Filter by all-wood, inner or outer carbon, fibre type, plies, thickness, weight and handle.`,
    path: "/equipment/blades",
    jsonLd: [
      breadcrumbs([{ name: "Blades", path: "/equipment/blades" }]),
      itemList(TITLE, "/equipment/blades", rows.map((b) => ({ name: `${b.brandName} ${b.name}`, path: `/equipment/blades/${b.id}` }))),
    ],
  });
};

const weightBuckets = [
  { value: "lt80", label: "Under 80 g", lo: 0, hi: 79.99 },
  { value: "80-84", label: "80–84 g", lo: 80, hi: 84.99 },
  { value: "85-89", label: "85–89 g", lo: 85, hi: 89.99 },
  { value: "90plus", label: "90 g and up", lo: 90, hi: 999 },
];
const thicknessBuckets = [
  { value: "lt5.8", label: "Under 5.8 mm", lo: 0, hi: 5.79 },
  { value: "5.8-6.2", label: "5.8–6.2 mm", lo: 5.8, hi: 6.2 },
  { value: "gt6.2", label: "Over 6.2 mm", lo: 6.21, hi: 99 },
];

function buildDefs(rows: BladeRow[], brands: { id: string; name: string; logo?: Image }[]): FilterDef<BladeRow>[] {
  const fibers = [...new Set(rows.flatMap((r) => r.fibers))] as Fiber[];
  const plies = [...new Set(rows.map((r) => r.plies).filter((p): p is number => p != null))].sort((a, b) => a - b);
  const handles = (["FL", "ST", "AN", "CON", "CS", "JP"] as Handle[]).filter((h) => rows.some((r) => r.handles.includes(h)));
  return [
    { key: "brand", label: "Brand", options: brands.map((b) => ({ value: b.id, label: b.name, icon: b.logo })), match: (r, v) => r.brandId === v },
    {
      key: "build",
      label: "Construction",
      options: ["All-wood", "Outer composite", "Inner composite", "Composite"].map((c) => ({ value: c.toLowerCase().replace(" ", "-"), label: c })),
      match: (r, v) => r.construction.toLowerCase().replace(" ", "-") === v,
      hint: "Composite = carbon or another fibre layer. Outer sits just under the face veneer, inner next to the core.",
    },
    { key: "fiber", label: "Fibre", options: fibers.map((f) => ({ value: f, label: fiberLabels[f] })), match: (r, v) => r.fibers.includes(v as Fiber) },
    { key: "plies", label: "Plies", options: plies.map((p) => ({ value: String(p), label: `${p}` })), match: (r, v) => String(r.plies) === v },
    {
      key: "thickness",
      label: "Thickness",
      options: thicknessBuckets,
      match: (r, v) => {
        const b = thicknessBuckets.find((x) => x.value === v)!;
        return r.thicknessMm != null && r.thicknessMm >= b.lo && r.thicknessMm <= b.hi;
      },
    },
    {
      key: "weight",
      label: "Nominal weight",
      options: weightBuckets,
      // A blade sold as 85-90 g matches every bucket its range touches.
      match: (r, v) => {
        const b = weightBuckets.find((x) => x.value === v)!;
        return r.weightG != null && r.weightG.min <= b.hi && (r.weightG.max ?? r.weightG.min) >= b.lo;
      },
      hint: "As stated by the maker. Wood varies, so individual blades can differ by several grams.",
    },
    { key: "handle", label: "Handle", options: handles.map((h) => ({ value: h, label: handleLabels[h] })), match: (r, v) => r.handles.includes(v as Handle) },
    {
      key: "status",
      label: "Availability",
      options: [
        { value: "current", label: "Current" },
        { value: "discontinued", label: "Discontinued" },
      ],
      match: (r, v) => r.status === v,
    },
    { key: "pros", label: "Pro use", options: [{ value: "yes", label: "Used by tracked pros" }], match: (r) => r.proCount > 0 },
  ];
}

const nullsLast = (a: number | null, b: number | null, dir = 1) => (a == null ? 1 : b == null ? -1 : (a - b) * dir);

const sorts: SortDef<BladeRow>[] = [
  { value: "brand", label: "brand, then name", compare: (a, b) => a.brandName.localeCompare(b.brandName, "en") || a.name.localeCompare(b.name, "en", { numeric: true }) },
  { value: "name", label: "name", compare: (a, b) => a.name.localeCompare(b.name, "en", { numeric: true }) },
  { value: "light", label: "lightest first", compare: (a, b) => nullsLast(a.weightG?.min ?? null, b.weightG?.min ?? null) },
  { value: "heavy", label: "heaviest first", compare: (a, b) => nullsLast(a.weightG?.max ?? a.weightG?.min ?? null, b.weightG?.max ?? b.weightG?.min ?? null, -1) },
  { value: "thin", label: "thinnest first", compare: (a, b) => nullsLast(a.thicknessMm, b.thicknessMm) },
  { value: "thick", label: "thickest first", compare: (a, b) => nullsLast(a.thicknessMm, b.thicknessMm, -1) },
  { value: "newest", label: "newest first", compare: (a, b) => nullsLast(a.releaseYear, b.releaseYear, -1) },
  { value: "pros", label: "most used by pros", compare: (a, b) => b.proCount - a.proCount },
];

export default function BladeExplorer({ loaderData }: Route.ComponentProps) {
  const { rows, brands } = loaderData;
  const defs = useMemo(() => buildDefs(rows, brands), [rows, brands]);
  const state = useFilters(rows, defs, sorts);
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Equipment encyclopedia" title={TITLE}>
        <p>
          {rows.length} blades from {brands.length} brands, with plies, composite type and position, thickness, weight and
          handles taken from each maker's published specs. New to blade construction? Start with{" "}
          <Link to="/equipment/guides/carbon-fibers-explained" className="font-medium text-primary hover:underline">
            carbon and fibres explained
          </Link>
          .
        </p>
      </PageHeader>
      <ExplorerShell defs={defs} sorts={sorts} state={state} total={rows.length} noun="blades"
        renderItem={(b) => <BladeCard blade={b} />}
      />
    </div>
  );
}
