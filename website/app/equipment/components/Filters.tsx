// URL-driven chip filters for the explorers. Values within a group are OR-ed, groups are AND-ed, and the whole state
// lives in the query string so filtered views can be shared and linked from the guides.
import { ArrowUpDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { useMounted } from "~/serves/hooks/useMounted";

export type FilterOption = { value: string; label: string };
export type FilterDef<T> = {
  key: string;
  label: string;
  options: FilterOption[];
  match: (row: T, value: string) => boolean;
  /** Explanation shown under the group, e.g. that bands are approximate. */
  hint?: string;
};
export type SortDef<T> = { value: string; label: string; compare: (a: T, b: T) => number };

export function useFilters<T extends { name: string; brandName: string }>(rows: T[], defs: FilterDef<T>[], sorts: SortDef<T>[]) {
  const [params, setParams] = useSearchParams();
  // Prerendered HTML has no query string, so URL filters apply only after hydration.
  const mounted = useMounted();
  const active = useMemo(() => {
    const out: Record<string, string[]> = {};
    if (!mounted) return out;
    for (const def of defs) {
      const v = params.get(def.key);
      if (v) out[def.key] = v.split(",").filter((x) => def.options.some((o) => o.value === x));
    }
    return out;
  }, [defs, mounted, params]);
  const query = mounted ? (params.get("q") ?? "") : "";
  const sort = mounted ? (params.get("sort") ?? "") : "";

  const update = (mutate: (next: URLSearchParams) => void) => {
    const next = new URLSearchParams(params);
    mutate(next);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const toggle = (key: string, value: string) =>
    update((next) => {
      const current = active[key] ?? [];
      const values = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      if (values.length) next.set(key, values.join(","));
      else next.delete(key);
    });

  const setQuery = (q: string) => update((next) => (q ? next.set("q", q) : next.delete("q")));
  const setSort = (s: string) => update((next) => (s ? next.set("sort", s) : next.delete("sort")));
  const clear = () => update((next) => [...next.keys()].filter((k) => k !== "sort").forEach((k) => next.delete(k)));

  const matchesExcept = (row: T, skip?: string) =>
    defs.every((def) => def.key === skip || !active[def.key]?.length || active[def.key].some((v) => def.match(row, v)));

  const needle = query.trim().toLowerCase();
  const searched = needle ? rows.filter((r) => `${r.brandName} ${r.name}`.toLowerCase().includes(needle)) : rows;
  const results = searched.filter((r) => matchesExcept(r));
  const sortDef = sorts.find((s) => s.value === sort);
  if (sortDef) results.sort(sortDef.compare);

  /** How many results each option would give, keeping the other groups' filters. */
  const counts = (def: FilterDef<T>) => {
    const pool = searched.filter((r) => matchesExcept(r, def.key));
    return Object.fromEntries(def.options.map((o) => [o.value, pool.filter((r) => def.match(r, o.value)).length]));
  };

  const chips = defs.flatMap((def) =>
    (active[def.key] ?? []).map((v) => ({ key: def.key, value: v, label: def.options.find((o) => o.value === v)?.label ?? v })),
  );

  return { active, query, sort, toggle, setQuery, setSort, clear, results, counts, chips, filtered: chips.length > 0 || !!needle };
}

type FiltersState<T> = ReturnType<typeof useFilters<T & { name: string; brandName: string }>>;

export function FilterSidebar<T extends { name: string; brandName: string }>({ defs, state }: { defs: FilterDef<T>[]; state: FiltersState<T> }) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="flex-row items-center justify-between p-4 pb-0">
        <h2 className="font-semibold text-foreground">Filters</h2>
        {state.chips.length > 0 && (
          <button onClick={state.clear} className="text-sm text-primary underline-offset-4 hover:underline">
            Clear all
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        {defs.map((def) => {
          const counts = state.counts(def);
          const selected = state.active[def.key] ?? [];
          return (
            <div key={def.key}>
              <p className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {def.label}
                {selected.length > 0 && (
                  <span className="ms-1.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {selected.length}
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {def.options.map((o) => {
                  const on = selected.includes(o.value);
                  const n = counts[o.value];
                  if (!on && n === 0) return null;
                  return (
                    <button
                      key={o.value}
                      onClick={() => state.toggle(def.key, o.value)}
                      aria-pressed={on}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
                        on ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                      )}
                    >
                      {o.label} <span className="opacity-60">{n}</span>
                    </button>
                  );
                })}
              </div>
              {def.hint && <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{def.hint}</p>}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

/** Search box, sort menu, active chips and the sidebar/results grid. */
export function ExplorerShell<T extends { name: string; brandName: string }>({
  defs,
  sorts,
  state,
  total,
  noun,
  children,
}: {
  defs: FilterDef<T>[];
  sorts: SortDef<T>[];
  state: FiltersState<T>;
  total: number;
  noun: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-0 basis-full sm:basis-0 sm:flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={state.query}
            onChange={(e) => state.setQuery(e.target.value)}
            placeholder={`Search ${total} ${noun} by name or brand`}
            aria-label={`Search ${noun}`}
            className="h-11 w-full rounded-full border bg-card py-2 ps-9 pe-4 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none"
          />
        </div>
        <div className="relative min-w-0 flex-1 sm:flex-none">
          <ArrowUpDown className="pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={state.sort}
            onChange={(e) => state.setSort(e.target.value)}
            aria-label="Sort"
            className="h-11 w-full appearance-none rounded-full border bg-card py-2 ps-8 pe-8 text-sm text-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none"
          >
            <option value="">Sort: brand, then name</option>
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                Sort: {s.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-11 items-center gap-1.5 rounded-full border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary lg:hidden"
        >
          <SlidersHorizontal className="size-4" /> Filters
        </button>
      </div>

      {state.chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {state.chips.map((c) => (
            <button
              key={`${c.key}-${c.value}`}
              onClick={() => state.toggle(c.key, c.value)}
              className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/80"
            >
              {c.label}
              <X className="size-3" />
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className={open ? "block" : "hidden lg:block"}>
          <FilterSidebar defs={defs} state={state} />
        </aside>
        <div>
          <p className="mb-3 text-sm text-muted-foreground" aria-live="polite">
            {state.filtered ? `Showing ${state.results.length} of ${total} ${noun}` : `${total} ${noun}`}
          </p>
          {state.results.length === 0 ? (
            <div className="rounded-3xl border border-dashed p-12 text-center">
              <p className="text-muted-foreground">Nothing matches these filters.</p>
              <button onClick={state.clear} className="mt-2 text-sm text-primary underline-offset-4 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
