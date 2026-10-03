import { Link } from "react-router";
import { bandRange } from "../hardness";
import { DASH, formatHardnessValue, formatMm, formatWeight, rubberTypeLabels, shortScaleLabels } from "../labels";
import type { Image } from "../models";
import type { BladeRow, RubberRow } from "../store.server";
import { BrandName, ProductThumb } from "./Media";
import { Pill, StatusPill } from "./Parts";

function CardShell({
  to,
  photo,
  fallback,
  brand,
  brandLogo,
  name,
  children,
}: {
  to: string;
  photo?: Image;
  fallback: string;
  brand: string;
  brandLogo?: Image;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col rounded-3xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <BrandName logo={brandLogo} name={brand} size="xs" />
          </p>
          <h3 className="mt-1 text-lg leading-snug font-bold tracking-tight group-hover:text-primary">{name}</h3>
        </div>
        <ProductThumb photo={photo} fallback={fallback} className="h-20 w-24" />
      </div>
      {children}
    </Link>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold">{value}</dd>
    </div>
  );
}

export function BladeCard({ blade }: { blade: BladeRow }) {
  return (
    <CardShell
      to={`/equipment/blades/${blade.id}`}
      photo={blade.photo}
      fallback={`/equipment/img/blades/${blade.id}.svg`}
      brand={blade.brandName}
      brandLogo={blade.brandLogo} name={blade.name}>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Pill tone="primary">{blade.construction}</Pill>
        {blade.fiberName && <Pill>{blade.fiberName}</Pill>}
        <StatusPill status={blade.status} />
      </div>
      <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">{blade.summary}</p>
      <dl className="mt-4 grid grid-cols-3 gap-2 border-t pt-3">
        <Stat label="Plies" value={blade.plies?.toString() ?? DASH} />
        <Stat label="Thickness" value={formatMm(blade.thicknessMm)} />
        <Stat label="Weight" value={formatWeight(blade.weightG)} />
      </dl>
      {blade.proCount > 0 && <p className="mt-3 text-xs font-medium text-primary">🏆 Used by {blade.proCount} tracked pro{blade.proCount > 1 ? "s" : ""}</p>}
    </CardShell>
  );
}

export function RubberCard({ rubber }: { rubber: RubberRow }) {
  return (
    <CardShell
      to={`/equipment/rubbers/${rubber.id}`}
      photo={rubber.photo}
      fallback={`/equipment/img/rubbers/${rubber.id}.svg`}
      brand={rubber.brandName}
      brandLogo={rubber.brandLogo} name={rubber.name}>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Pill tone="primary">{rubberTypeLabels[rubber.type]}</Pill>
        {rubber.bands.length > 0 && <Pill>{bandRange(rubber.bands)}</Pill>}
        <StatusPill status={rubber.status} />
      </div>
      <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">{rubber.summary}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 border-t pt-3">
        <Stat
          label={rubber.hardness ? `Hardness (${shortScaleLabels[rubber.hardness.scale]})` : "Hardness"}
          value={rubber.hardness ? formatHardnessValue(rubber.hardness) : DASH}
        />
        <Stat label="Sponge" value={rubber.spongeThicknesses.join(", ") || DASH} />
      </dl>
      {rubber.proCount > 0 && <p className="mt-3 text-xs font-medium text-primary">🏆 Used by {rubber.proCount} tracked pro{rubber.proCount > 1 ? "s" : ""}</p>}
    </CardShell>
  );
}
