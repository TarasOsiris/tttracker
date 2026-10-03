import { useDataStore } from "../context";
import { useLanguage } from "../context";
import { useFavorites } from "../hooks/useFavorites";
import type { ServeFilters } from "../utils/filter";
import { eBounce, eSpeed } from "../utils/emoji";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { Heart } from "lucide-react";

interface FilterPanelProps {
  filters: ServeFilters;
  onChange: (filters: ServeFilters) => void;
  onClear: () => void;
}

export function FilterPanel({ filters, onChange, onClear }: FilterPanelProps) {
  const { motions, spins, speeds } = useDataStore();
  const { language, t } = useLanguage();
  const { favorites } = useFavorites();

  const toggleFilter = (key: keyof Omit<ServeFilters, "search" | "favorites" | "sort">, value: string) => {
    const current = filters[key] ?? [];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const hasFilters = Object.values(filters).some((v) => v && v.length > 0);

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex-row items-center justify-between p-4 pb-0">
        <h3 className="font-semibold text-foreground">{t("filter.title")}</h3>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            {t("filter.clearAll")}
          </button>
        )}
      </CardHeader>

      <CardContent className="space-y-4 p-4">
        {/* Favorites */}
        {favorites.size > 0 && (
          <button
            onClick={() => onChange({ ...filters, favorites: !filters.favorites })}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              filters.favorites
                ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <Heart className={`size-4 ${filters.favorites ? "fill-red-500 text-red-500" : ""}`} />
            {t("filter.favorites")} ({favorites.size})
          </button>
        )}

        {/* Motion */}
        <FilterGroup label={t("filter.motion")} count={filters.motion?.length}>
          {motions.map((m) => (
            <FilterChip
              key={m.id}
              label={m.name}
              active={filters.motion?.includes(m.id) ?? false}
              onClick={() => toggleFilter("motion", m.id)}
            />
          ))}
        </FilterGroup>

        {/* Bounce */}
        <FilterGroup label={t("filter.bounce")} count={filters.bounce?.length}>
          {(["short", "half-long", "long"] as const).map((cat) => (
            <FilterChip
              key={cat}
              label={eBounce(cat, language)}
              active={filters.bounce?.includes(cat) ?? false}
              onClick={() => toggleFilter("bounce", cat)}
            />
          ))}
        </FilterGroup>

        {/* Speed */}
        <FilterGroup label={t("filter.speed")} count={filters.speed?.length}>
          {speeds.map((s) => (
            <FilterChip
              key={s.id}
              label={eSpeed(s.label, language)}
              active={filters.speed?.includes(s.id) ?? false}
              onClick={() => toggleFilter("speed", s.id)}
            />
          ))}
        </FilterGroup>

        {/* Difficulty */}
        <FilterGroup label={t("filter.difficulty")} count={filters.difficulty?.length}>
          {[1, 2, 3, 4, 5].map((d) => (
            <FilterChip
              key={d}
              label={`${d}`}
              active={filters.difficulty?.includes(String(d)) ?? false}
              onClick={() => toggleFilter("difficulty", String(d))}
            />
          ))}
        </FilterGroup>

        {/* Spin */}
        <FilterGroup label={t("filter.spinProfile")} count={filters.spin?.length}>
          {spins.map((s) => (
            <FilterChip
              key={s.id}
              label={s.name}
              active={filters.spin?.includes(s.id) ?? false}
              onClick={() => toggleFilter("spin", s.id)}
            />
          ))}
        </FilterGroup>
      </CardContent>
    </Card>
  );
}

function FilterGroup({ label, count, children }: { label: string; count?: number; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
        {count != null && count > 0 && (
          <span className="ms-1.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {count}
          </span>
        )}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      )}
    >
      {label}
    </button>
  );
}
