import { Link } from "react-router";
import { confidenceLabels, formatDate } from "../labels";
import type { Confidence, SetupSlot } from "../models";
import type { ResolvedSetupItem } from "../store.server";
import { cn } from "~/lib/utils";

const tone: Record<Confidence, string> = {
  confirmed: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300",
  reported: "bg-sky-100 text-sky-900 dark:bg-sky-900/30 dark:text-sky-300",
  unverified: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300",
};

export function ConfidencePill({ confidence }: { confidence: Confidence }) {
  return (
    <span title={confidenceLabels[confidence].description} className={cn("inline-flex rounded-full px-1.5 py-px text-[10px] font-semibold", tone[confidence])}>
      {confidenceLabels[confidence].label}
    </span>
  );
}

/** "Brand Name", without doubling a brand the reported name already starts with (in any casing). */
export function setupLabel(item: Pick<ResolvedSetupItem, "brandName" | "name">): string {
  return item.brandName && !item.name.toLowerCase().startsWith(item.brandName.toLowerCase()) ? `${item.brandName} ${item.name}` : item.name;
}

export function SetupCell({ item, slot, detailed }: { item: ResolvedSetupItem; slot: SetupSlot; detailed?: boolean }) {
  const href = item.itemId ? `/equipment/${slot === "blade" ? "blades" : "rubbers"}/${item.itemId}` : null;
  const label = setupLabel(item);
  const variant = item.variant && !item.name.toLowerCase().includes(item.variant.toLowerCase()) ? item.variant : null;
  return (
    <div className="space-y-0.5">
      {href ? (
        <Link to={href} className="font-medium text-foreground hover:text-primary hover:underline">
          {label}
        </Link>
      ) : (
        <span className="font-medium">{label}</span>
      )}
      {variant && <p className="text-xs text-muted-foreground">{variant}</p>}
      <p className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
        <ConfidencePill confidence={item.confidence} />
        {detailed ? (
          <>
            as of {formatDate(item.asOf)} ·{" "}
            <a href={item.source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {item.source.label}
            </a>
          </>
        ) : (
          <a href={item.source.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline" title={`${item.source.label}, as of ${formatDate(item.asOf)}`}>
            source
          </a>
        )}
      </p>
    </div>
  );
}
