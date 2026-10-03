import { Info, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/Compare";
import { BrandName, ProductThumb } from "../components/Media";
import { PageHeader } from "../components/Parts";
import { bandRange } from "../hardness";
import {
  DASH,
  fiberLabels,
  fiberPositionLabels,
  formatHardness,
  formatMm,
  formatThicknesses,
  formatWeight,
  handleLabels,
  rubberTypeLabels,
} from "../labels";
import type { ManufacturerRating } from "../models";
import { comparePayload } from "../store.server";
import { breadcrumbs, equipmentMeta } from "../utils/seo";
import { useMounted } from "~/serves/hooks/useMounted";

export function loader() {
  return comparePayload();
}

export const meta: Route.MetaFunction = () =>
  equipmentMeta({
    title: "Compare Table Tennis Blades and Rubbers Side by Side",
    description:
      "Put up to four table tennis blades or rubbers side by side: plies, carbon type and position, thickness, weight, sponge hardness and thicknesses, from makers' published specs.",
    path: "/equipment/compare",
    jsonLd: [breadcrumbs([{ name: "Compare", path: "/equipment/compare" }])],
  });

type Kind = "blade" | "rubber";
type Data = Route.ComponentProps["loaderData"];
type BladeItem = Data["blades"][number];
type RubberItem = Data["rubbers"][number];

const MAX = 4;

function parseIds(raw: string | null): { kind: Kind; ids: string[] } | null {
  if (!raw) return null;
  const parts = raw.split(",").map((p) => p.split(":") as [string, string]).filter(([k, id]) => (k === "blade" || k === "rubber") && id);
  if (!parts.length) return null;
  const kind = parts[0][0] as Kind;
  return { kind, ids: [...new Set(parts.filter(([k]) => k === kind).map(([, id]) => id))].slice(0, MAX) };
}

type Row<T> = { label: string; render: (item: T) => React.ReactNode };

const bladeRows: Row<BladeItem>[] = [
  { label: "Construction", render: (b) => b.construction },
  { label: "Composition", render: (b) => b.layup ?? DASH },
  { label: "Plies", render: (b) => b.plies ?? DASH },
  { label: "Composite", render: (b) => (b.fibers.length ? (b.fiberName ?? b.fibers.map((f) => fiberLabels[f]).join(", ")) : "None") },
  { label: "Composite position", render: (b) => (b.fibers.length ? (b.fiberPosition ? fiberPositionLabels[b.fiberPosition] : DASH) : "—") },
  { label: "Outer ply", render: (b) => b.outerWood ?? DASH },
  { label: "Thickness", render: (b) => formatMm(b.thicknessMm) },
  { label: "Nominal weight", render: (b) => formatWeight(b.weightG) },
  { label: "Handles", render: (b) => (b.handles.length ? b.handles.map((h) => handleLabels[h].replace(/ \(.*/, "")).join(", ") : DASH) },
  { label: "Maker's class", render: (b) => b.manufacturerClass ?? DASH },
  { label: "Made in", render: (b) => b.madeIn ?? DASH },
  { label: "Released", render: (b) => b.releaseYear ?? DASH },
  { label: "Availability", render: (b) => (b.status === "current" ? "Current" : "Discontinued") },
];

const rubberRows: Row<RubberItem>[] = [
  { label: "Type", render: (r) => rubberTypeLabels[r.type] },
  { label: "Topsheet", render: (r) => r.tackiness?.replace("-", " ") ?? DASH },
  { label: "Sponge hardness", render: (r) => formatHardness(r.hardness) },
  { label: "Approximate band", render: (r) => (r.hardness ? bandRange(r.bands) || "Not banded" : DASH) },
  { label: "Sponge thicknesses", render: (r) => formatThicknesses(r) },
  { label: "Sponge colour", render: (r) => r.spongeColor ?? DASH },
  { label: "ITTF approved", render: (r) => (r.ittfApproved == null ? DASH : r.ittfApproved ? "Yes" : "No") },
  { label: "Made in", render: (r) => r.madeIn ?? DASH },
  { label: "Released", render: (r) => r.releaseYear ?? DASH },
  { label: "Availability", render: (r) => (r.status === "current" ? "Current" : "Discontinued") },
];

function Ratings({ ratings, brandName }: { ratings: ManufacturerRating[]; brandName: string }) {
  if (!ratings.length) return <>{DASH}</>;
  return (
    <div>
      <p className="text-[11px] text-muted-foreground">{brandName} scale</p>
      <ul>
        {ratings.map((r) => (
          <li key={r.label}>
            {r.label}: {r.value}
            {r.max != null ? ` / ${r.max}` : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Compare({ loaderData }: Route.ComponentProps) {
  const { blades, rubbers } = loaderData;
  const [params, setParams] = useSearchParams();
  const mounted = useMounted();
  const parsed = mounted ? parseIds(params.get("ids")) : null;
  const [pickerKind, setPickerKind] = useState<Kind>("blade");
  const kind = parsed?.kind ?? pickerKind;
  const ids = parsed?.ids ?? [];

  const pool = (kind === "blade" ? blades : rubbers) as (BladeItem | RubberItem)[];
  const selected = ids.map((id) => pool.find((x) => x.id === id)).filter((x): x is BladeItem | RubberItem => !!x);

  const write = (nextKind: Kind, nextIds: string[]) => {
    const next = new URLSearchParams(params);
    if (nextIds.length) next.set("ids", nextIds.map((id) => `${nextKind}:${id}`).join(","));
    else next.delete("ids");
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const add = (id: string) => write(kind, [...ids, id].slice(0, MAX));
  const remove = (id: string) => write(kind, ids.filter((x) => x !== id));
  const switchKind = (k: Kind) => {
    setPickerKind(k);
    write(k, []);
  };

  const brandsDiffer = new Set(selected.map((s) => s.brandId)).size > 1;

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Equipment encyclopedia" title="Compare blades and rubbers">
        <p>
          Pick up to four blades or four rubbers. The table uses each maker's published specs; anything a maker doesn't
          publish shows as {DASH}. The link in your address bar always reproduces this comparison.
        </p>
      </PageHeader>

      <div className="flex gap-2" role="tablist" aria-label="What to compare">
        {(["blade", "rubber"] as Kind[]).map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={kind === k}
            onClick={() => kind !== k && switchKind(k)}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${kind === k ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
          >
            {k === "blade" ? "Blades" : "Rubbers"}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-2">
        {selected.map((s) => (
          <span key={s.id} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 py-1.5 ps-3 pe-2 text-sm font-medium text-primary">
            {s.brandName} {s.name}
            <button onClick={() => remove(s.id)} aria-label={`Remove ${s.brandName} ${s.name}`} className="rounded-full p-0.5 hover:bg-primary/20">
              <X className="size-3.5" />
            </button>
          </span>
        ))}
        {selected.length < MAX && <Picker items={pool.filter((p) => !ids.includes(p.id))} onPick={add} noun={kind === "blade" ? "blade" : "rubber"} />}
      </div>

      {selected.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-8 text-center sm:p-10">
          <p className="text-muted-foreground">
            Add a {kind} above to start, or press <strong>Compare with others</strong> on any blade or rubber page.
          </p>
          {loaderData.suggestions.length > 0 && (
            <>
              <p className="mt-6 text-sm font-semibold">Popular comparisons</p>
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {loaderData.suggestions.map((s) => (
                  <li key={s.href}>
                    <Link to={s.href} className="inline-flex rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-primary/40 hover:bg-secondary">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="sticky start-0 z-10 w-28 bg-card p-3 text-start font-medium text-muted-foreground sm:w-40 sm:p-4">Spec</th>
                {selected.map((s) => (
                  <th key={s.id} className="min-w-36 p-3 text-start align-top sm:p-4">
                    <Link to={`/equipment/${kind}s/${s.id}`} className="group block hover:text-primary">
                      <ProductThumb photo={s.photo} fallback={`/equipment/img/${kind}s/${s.id}.svg`} className="mb-2 size-24" />
                      <span className="block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        <BrandName logo={s.brandLogo} name={s.brandName} size="xs" />
                      </span>
                      <span className="font-bold">{s.name}</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {(kind === "blade" ? bladeRows : rubberRows).map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="sticky start-0 z-10 bg-card p-3 text-start text-xs font-normal text-muted-foreground sm:p-4 sm:text-sm">
                    {row.label}
                  </th>
                  {selected.map((s) => (
                    <td key={s.id} className="p-3 align-top font-medium sm:p-4">
                      {(row.render as (x: BladeItem | RubberItem) => React.ReactNode)(s)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-secondary/40">
                <th scope="row" className="sticky start-0 z-10 bg-card p-3 text-start align-top text-xs font-normal text-muted-foreground sm:p-4 sm:text-sm">
                  Maker's own ratings
                </th>
                {selected.map((s) => (
                  <td key={s.id} className="p-3 align-top sm:p-4">
                    <Ratings ratings={s.manufacturerRatings} brandName={s.brandName} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          {brandsDiffer && (
            <p className="flex gap-2 border-t p-4 text-xs leading-snug text-muted-foreground">
              <Info className="mt-px size-3.5 shrink-0" />
              These items come from different brands. Each brand rates speed, spin and control on its own scale
              {kind === "rubber" ? " and may measure sponge hardness on a different scale" : ""}, so compare those numbers only
              within one brand. The other rows are physical specs and compare directly.
            </p>
          )}
          {selected.some((s) => s.notes?.length) && (
            <p className="border-t p-4 text-xs text-muted-foreground">Some items have spec notes (for example, makers listing different values in different regions). Open the item page to read them.</p>
          )}
        </div>
      )}
    </div>
  );
}

function Picker({ items, onPick, noun }: { items: (BladeItem | RubberItem)[]; onPick: (id: string) => void; noun: string }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const matches = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((i) => !needle || `${i.brandName} ${i.name}`.toLowerCase().includes(needle)).slice(0, 12);
  }, [items, q]);
  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={`Add a ${noun}…`}
        aria-label={`Add a ${noun}`}
        className="h-10 w-full rounded-full border bg-card ps-9 pe-4 text-sm focus:ring-2 focus:ring-ring/50 focus:outline-none"
      />
      {open && matches.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-80 w-full overflow-auto rounded-2xl border bg-popover p-1 shadow-lg">
          {matches.map((m) => (
            <li key={m.id}>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(m.id);
                  setQ("");
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-start text-sm hover:bg-secondary"
              >
                <Plus className="size-3.5 text-primary" />
                <span className="text-muted-foreground">{m.brandName}</span> {m.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
