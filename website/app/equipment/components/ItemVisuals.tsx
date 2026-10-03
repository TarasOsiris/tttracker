// Small visual summaries on blade and rubber pages, each drawn only from that item's published values.
import { Link } from "react-router";
import { type HardnessBand, bandLabels, bandOrder, bandThresholds } from "../hardness";
import { formatHardnessValue, scaleLabels } from "../labels";
import type { Blade, Hardness } from "../models";
import { cn } from "~/lib/utils";

const bandFill: Record<HardnessBand, string> = {
  soft: "bg-[#86b6ef] dark:bg-[#184f95]",
  medium: "bg-[#5598e7] dark:bg-[#256abf]",
  "medium-hard": "bg-[#2a78d6] dark:bg-[#3987e5]",
  hard: "bg-[#1c5cab] dark:bg-[#6da7ec]",
  "very-hard": "bg-[#104281] dark:bg-[#9ec5f4]",
};

/**
 * Where a sponge's published hardness sits among our bands on its own scale. Bands are drawn equal width (they are
 * groupings, not a linear scale); within a band the marker is placed by degree. Not shown for "scale unstated".
 */
export function HardnessGauge({ hardness, brandName }: { hardness: Hardness; brandName: string }) {
  if (hardness.scale === "unstated") return null;
  const t = bandThresholds[hardness.scale];
  const edges = [t[0] - 6, ...t, t[3] + 6];
  const pos = (v: number) => {
    const clamped = Math.min(Math.max(v, edges[0]), edges[5]);
    const i = Math.min(edges.findIndex((e, j) => j > 0 && clamped < e) - 1, 4);
    const band = i < 0 ? 4 : i;
    return ((band + (clamped - edges[band]) / (edges[band + 1] - edges[band])) / 5) * 100;
  };
  const lo = pos(hardness.min);
  const hi = pos(hardness.max ?? hardness.min);
  return (
    <section className="rounded-3xl border bg-card p-5 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight">Sponge hardness</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {brandName} prints <strong className="text-foreground">{formatHardnessValue(hardness)}</strong> on the {scaleLabels[hardness.scale]}.
      </p>
      <div className="relative mt-6">
        <div className="flex h-3 gap-0.5 overflow-hidden rounded-full">
          {bandOrder.map((b) => (
            <div key={b} className={cn("flex-1", bandFill[b])} title={bandLabels[b]} />
          ))}
        </div>
        {hi - lo < 1.5 ? (
          <span
            className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-card bg-foreground shadow"
            style={{ insetInlineStart: `${lo}%` }}
            aria-hidden="true"
          />
        ) : (
          <span
            className="absolute top-1/2 h-5 -translate-y-1/2 rounded-full border-[3px] border-card bg-foreground shadow"
            style={{ insetInlineStart: `${lo}%`, width: `${hi - lo}%` }}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="mt-2 grid grid-cols-5 text-center text-[11px] text-muted-foreground">
        {bandOrder.map((b) => (
          <span key={b}>{bandLabels[b]}</span>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Bands are our rough cross-brand grouping, not a conversion.{" "}
        <Link to="/equipment/guides/sponge-hardness-scales" className="text-primary hover:underline">
          How the scales differ
        </Link>
      </p>
    </section>
  );
}

/**
 * A generic ply order for blades whose maker gives the build but not the ply-by-ply order: all-wood 5 or 7 plies, or a
 * 5+2 composite with a published fibre position. Anything else returns null rather than a guess.
 */
export function schematicPlies(b: Pick<Blade, "plies" | "fibers" | "fiberPosition" | "plyOrder" | "fiberName">): string[] | null {
  if (b.plyOrder) return null;
  const fibre = b.fiberName ?? "Fibre";
  if (b.fibers.length === 0) {
    if (b.plies === 5) return ["Outer ply", "Second ply", "Core", "Second ply", "Outer ply"];
    if (b.plies === 7) return ["Outer ply", "Second ply", "Third ply", "Core", "Third ply", "Second ply", "Outer ply"];
    return null;
  }
  if (b.plies === 7 && b.fiberPosition === "outer") return ["Outer ply", fibre, "Inner ply", "Core", "Inner ply", fibre, "Outer ply"];
  if (b.plies === 7 && b.fiberPosition === "inner") return ["Outer ply", "Inner ply", fibre, "Core", fibre, "Inner ply", "Outer ply"];
  return null;
}

/** A dot for every catalogue blade with this value published, and this blade highlighted. */
function Strip({
  label,
  unit,
  words,
  values,
  value,
  domain,
}: {
  label: string;
  unit: string;
  words: [less: string, more: string];
  values: number[];
  value: number;
  domain: [number, number];
}) {
  const x = (v: number) => ((Math.min(Math.max(v, domain[0]), domain[1]) - domain[0]) / (domain[1] - domain[0])) * 100;
  const below = values.filter((v) => v < value).length;
  const above = values.filter((v) => v > value).length;
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">
          {below} {words[0]} · {above} {words[1]}
        </span>
      </div>
      <div className="relative mt-2 h-6">
        <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
        {values.map((v, i) => (
          <span key={i} className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted-foreground/40" style={{ insetInlineStart: `${x(v)}%` }} />
        ))}
        <span
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-primary shadow"
          style={{ insetInlineStart: `${x(value)}%` }}
          title={`${value} ${unit}`}
        />
      </div>
      <div className="flex justify-between text-[11px] text-muted-foreground">
        <span>
          {domain[0]} {unit}
        </span>
        <span>
          {domain[1]} {unit}
        </span>
      </div>
    </div>
  );
}

export function BladeInContext({
  thickness,
  weight,
  weightLabel,
  distribution,
}: {
  thickness: number | null;
  /** Midpoint when the maker gives a range; `weightLabel` shows the published value. */
  weight: number | null;
  weightLabel: string;
  distribution: { thickness: number[]; weight: number[] };
}) {
  if (thickness == null && weight == null) return null;
  return (
    <section className="rounded-3xl border bg-card p-5 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight">Compared with the catalogue</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Each grey dot is another blade whose maker publishes the value. Weight ranges count at their midpoint.
      </p>
      <div className="mt-4 space-y-5">
        {thickness != null && <Strip label={`Thickness ${thickness} mm`} unit="mm" words={["thinner", "thicker"]} values={distribution.thickness} value={thickness} domain={[5, 7.5]} />}
        {weight != null && <Strip label={`Weight ${weightLabel}`} unit="g" words={["lighter", "heavier"]} values={distribution.weight} value={weight} domain={[70, 100]} />}
      </div>
    </section>
  );
}
