import { useMemo } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/RubberExplorer";
import { RubberCard } from "../components/Cards";
import { ExplorerShell, type FilterDef, type SortDef, useFilters } from "../components/Filters";
import { PageHeader } from "../components/Parts";
import { bandLabels, bandOrder, type HardnessBand } from "../hardness";
import { rubberTypeLabels } from "../labels";
import type { RubberType } from "../models";
import { type RubberRow, rubbersPayload } from "../store.server";
import { breadcrumbs, equipmentMeta, itemList } from "../utils/seo";

export function loader() {
  return rubbersPayload();
}

const TITLE = "Table Tennis Rubbers";

export const meta: Route.MetaFunction = ({ loaderData }) => {
  const rows = loaderData?.rows ?? [];
  return equipmentMeta({
    title: `${TITLE}: Tensor, Tacky, Hybrid & Pips Compared`,
    description: `Compare ${rows.length} table tennis rubbers from ${loaderData?.brands.length ?? 0} brands: tensors, Chinese tacky, hybrids, short, medium and long pips, with sponge hardness on each maker's own scale.`,
    path: "/equipment/rubbers",
    jsonLd: [
      breadcrumbs([{ name: "Rubbers", path: "/equipment/rubbers" }]),
      itemList(TITLE, "/equipment/rubbers", rows.map((r) => ({ name: `${r.brandName} ${r.name}`, path: `/equipment/rubbers/${r.id}` }))),
    ],
  });
};

const typeOrder: RubberType[] = ["classic", "tensor", "tacky", "hybrid", "short-pips", "medium-pips", "long-pips", "anti"];

function buildDefs(rows: RubberRow[], brands: { id: string; name: string }[]): FilterDef<RubberRow>[] {
  const thicknesses = [...new Set(rows.flatMap((r) => r.spongeThicknesses))].sort((a, b) => (parseFloat(a) || 99) - (parseFloat(b) || 99));
  return [
    { key: "brand", label: "Brand", options: brands.map((b) => ({ value: b.id, label: b.name })), match: (r, v) => r.brandId === v },
    {
      key: "type",
      label: "Type",
      options: typeOrder.filter((t) => rows.some((r) => r.type === t)).map((t) => ({ value: t, label: rubberTypeLabels[t] })),
      match: (r, v) => r.type === v,
    },
    {
      key: "hardness",
      label: "Sponge hardness",
      options: bandOrder.map((b) => ({ value: b, label: bandLabels[b] })),
      match: (r, v) => r.bands.includes(v as HardnessBand),
      hint: "Approximate bands across the European, Japanese and Chinese scales; see the hardness guide. Sponges whose maker doesn't state a scale aren't banded.",
    },
    {
      key: "tack",
      label: "Topsheet",
      options: [
        { value: "non-tacky", label: "Non-tacky" },
        { value: "slightly-tacky", label: "Slightly tacky" },
        { value: "tacky", label: "Tacky" },
      ],
      match: (r, v) => r.tackiness === v,
    },
    { key: "sponge", label: "Sponge thickness", options: thicknesses.map((t) => ({ value: t, label: t })), match: (r, v) => r.spongeThicknesses.includes(v) },
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

const sorts: SortDef<RubberRow>[] = [
  { value: "name", label: "name", compare: (a, b) => a.name.localeCompare(b.name, "en", { numeric: true }) },
  {
    value: "softest",
    label: "softest band first",
    compare: (a, b) => nullsLast(a.bands.length ? bandOrder.indexOf(a.bands[0]) : null, b.bands.length ? bandOrder.indexOf(b.bands[0]) : null),
  },
  {
    value: "hardest",
    label: "hardest band first",
    compare: (a, b) =>
      nullsLast(a.bands.length ? bandOrder.indexOf(a.bands[a.bands.length - 1]) : null, b.bands.length ? bandOrder.indexOf(b.bands[b.bands.length - 1]) : null, -1),
  },
  { value: "newest", label: "newest first", compare: (a, b) => nullsLast(a.releaseYear, b.releaseYear, -1) },
  { value: "pros", label: "most used by pros", compare: (a, b) => b.proCount - a.proCount },
];

export default function RubberExplorer({ loaderData }: Route.ComponentProps) {
  const { rows, brands } = loaderData;
  const defs = useMemo(() => buildDefs(rows, brands), [rows, brands]);
  const state = useFilters(rows, defs, sorts);
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Equipment encyclopedia" title={TITLE}>
        <p>
          {rows.length} rubbers from {brands.length} brands. Hardness is shown exactly as each maker states it, with the
          scale it's measured on: a 40° Chinese sponge is not a 40° European one.{" "}
          <Link to="/equipment/guides/sponge-hardness-scales" className="font-medium text-primary hover:underline">
            How the hardness scales differ
          </Link>
          .
        </p>
      </PageHeader>
      <ExplorerShell defs={defs} sorts={sorts} state={state} total={rows.length} noun="rubbers">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {state.results.map((r) => (
            <RubberCard key={r.id} rubber={r} />
          ))}
        </div>
      </ExplorerShell>
    </div>
  );
}
