import { useState, useMemo } from "react";
import { useMounted } from "../hooks/useMounted";
import { Link } from "../navigation";
import { useSearchParams } from "react-router";
import { useNavigate } from "../navigation";
import { useDataStore, useEnrichedServes } from "../context";
import { useLanguage } from "../context";
import { useFavorites } from "../hooks/useFavorites";
import { Seo } from "../components/Seo";
import { ServeCard } from "../components/ServeCard";
import { FilterPanel } from "../components/FilterPanel";
import { filterServes, sortServes, parseFiltersFromParams, filtersToParams, hasActiveFilters } from "../utils/filter";
import type { ServeFilters, SortOption } from "../utils/filter";
import { eBounce, eSpeed } from "../utils/emoji";
import { absoluteUrl, breadcrumbList } from "../utils/seo";
import { Search, X, SlidersHorizontal, ArrowUpDown, ArrowRight, Dices } from "lucide-react";

const SORT_OPTIONS: SortOption[] = ["name", "difficulty-asc", "difficulty-desc", "speed"];

interface ActiveChip {
  group: keyof ServeFilters;
  value: string;
  label: string;
}

export default function ServeExplorer() {
  const { language, t } = useLanguage();
  const enrichedServes = useEnrichedServes();
  const { motions, spins, speeds, deceptions } = useDataStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();
  // Prerendered HTML has no query string, so filters from the URL apply only after hydration.
  const mounted = useMounted();
  const filters = useMemo(() => (mounted ? parseFiltersFromParams(searchParams) : {}), [mounted, searchParams]);
  const filtered = sortServes(filterServes(enrichedServes, filters, favorites), filters.sort);
  const description = t("serveExplorer.description", { count: enrichedServes.length });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const listSchema = useMemo(
    () => [
      breadcrumbList(language, t("nav.home"), [{ name: t("nav.serves"), path: "/serves" }]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: t("serveExplorer.title"),
        description,
        url: absoluteUrl("/serves", language),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: enrichedServes.length,
          itemListElement: enrichedServes.map((serve, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: serve.name,
            url: absoluteUrl(`/serves/${serve.id}`, language),
          })),
        },
      },
    ],
    [description, enrichedServes, language, t],
  );

  // Build lookup maps for filter chip labels
  const motionMap = useMemo(() => new Map(motions.map((m) => [m.id, m.name])), [motions]);
  const spinMap = useMemo(() => new Map(spins.map((s) => [s.id, s.name])), [spins]);
  const speedMap = useMemo(() => new Map(speeds.map((s) => [s.id, s.label])), [speeds]);

  // Build active filter chips
  const activeChips = useMemo(() => {
    const chips: ActiveChip[] = [];
    if (filters.favorites) {
      chips.push({ group: "favorites", value: "true", label: `❤️ ${t("filter.favorites")}` });
    }
    filters.motion?.forEach((id) => {
      const name = motionMap.get(id);
      if (name) chips.push({ group: "motion", value: id, label: name });
    });
    filters.bounce?.forEach((cat) => {
      chips.push({ group: "bounce", value: cat, label: eBounce(cat, language) });
    });
    filters.speed?.forEach((id) => {
      const label = speedMap.get(id);
      if (label) chips.push({ group: "speed", value: id, label: eSpeed(label, language) });
    });
    filters.difficulty?.forEach((d) => {
      chips.push({ group: "difficulty", value: d, label: `⭐ ${d}` });
    });
    filters.spin?.forEach((id) => {
      const name = spinMap.get(id);
      if (name) chips.push({ group: "spin", value: id, label: name });
    });
    return chips;
  }, [filters, motionMap, spinMap, speedMap, language, t]);

  const removeChip = (group: keyof ServeFilters, value: string) => {
    if (group === "favorites") {
      setSearchParams(filtersToParams({ ...filters, favorites: undefined }));
    } else {
      const current = (filters[group] as string[] | undefined) ?? [];
      const next = current.filter((v) => v !== value);
      setSearchParams(filtersToParams({ ...filters, [group]: next.length > 0 ? next : undefined }));
    }
  };

  const goToRandomServe = () => {
    const pool = filtered.length > 0 ? filtered : enrichedServes;
    const random = pool[Math.floor(Math.random() * pool.length)];
    navigate(`/serves/${random.id}`);
  };

  const handleFilterChange = (next: ServeFilters) => {
    setSearchParams(filtersToParams(next));
    setFiltersOpen(false);
  };

  return (
    <div className="space-y-6">
      <Seo
        title={t("home.pageTitle")}
        description={description}
        path="/serves"
        jsonLd={listSchema}
      />
      <header className="max-w-3xl">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">{t("layout.title")}</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{t("home.title")}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t("home.subtitle")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={goToRandomServe}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            <Dices className="size-4" /> {t("serveExplorer.randomServe")}
          </button>
          <Link
            to="/quiz"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-foreground/15 bg-card px-6 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-foreground/30"
          >
            🧠 {t("quiz.title")}
          </Link>
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { value: enrichedServes.length, label: t("home.statServes"), to: "/serves" },
          { value: motions.length, label: t("home.statMotions"), to: "/motions" },
          { value: spins.length, label: t("home.statSpins"), to: "/spins" },
          { value: deceptions.length, label: t("home.statDeceptions"), to: "/serves" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-3xl border bg-card p-4 sm:p-5">
            <dd className="font-display text-3xl font-extrabold text-primary">{stat.value}</dd>
            <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="flex items-end justify-between gap-4 pt-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("serveExplorer.title")}</h2>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-0 basis-full sm:basis-0 sm:flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={filters.search ?? ""}
            onChange={(e) => setSearchParams(filtersToParams({ ...filters, search: e.target.value || undefined }))}
            placeholder={t("serveExplorer.searchPlaceholder")}
            className="h-11 w-full rounded-full border bg-card py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
          {filters.search && (
            <button
              onClick={() => setSearchParams(filtersToParams({ ...filters, search: undefined }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative min-w-0 flex-1 sm:flex-none">
          <ArrowUpDown className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={filters.sort ?? ""}
            onChange={(e) =>
              setSearchParams(
                filtersToParams({ ...filters, sort: (e.target.value || undefined) as SortOption | undefined })
              )
            }
            className="h-full w-full appearance-none rounded-full border bg-card py-2 pl-8 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          >
            <option value="">{t("serveExplorer.sortDefault")}</option>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {t(`serveExplorer.sort.${opt}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setFiltersOpen((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary lg:hidden"
        >
          <SlidersHorizontal className="size-4" />
          {t("filter.title")}
        </button>
      </div>

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <button
              key={`${chip.group}-${chip.value}`}
              onClick={() => removeChip(chip.group, chip.value)}
              className="flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              {chip.label}
              <X className="size-3" />
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className={filtersOpen ? "block" : "hidden lg:block"}>
          <FilterPanel
            filters={filters}
            onChange={handleFilterChange}
            onClear={() => {
              setSearchParams({});
              setFiltersOpen(false);
            }}
          />
        </aside>

        <div>
          {hasActiveFilters(filters) && (
            <p className="mb-3 text-sm text-muted-foreground">
              {t("serveExplorer.showing", { filtered: filtered.length, total: enrichedServes.length })}
            </p>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed p-12 text-center">
              <p className="text-muted-foreground">{t("serveExplorer.empty")}</p>
              <button
                onClick={() => setSearchParams({})}
                className="mt-2 text-sm text-primary underline-offset-4 hover:underline"
              >
                {t("serveExplorer.clearFilters")}
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((serve) => (
                <ServeCard key={serve.id} serve={serve} />
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="pt-8">
        <h2 className="text-2xl font-bold tracking-tight">{t("home.explore")}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/motions", label: t("nav.motions"), desc: t("home.motionsDesc", { count: motions.length }), icon: "🔄" },
            { to: "/spins", label: t("nav.spins"), desc: t("home.spinsDesc", { count: spins.length }), icon: "🌀" },
            { to: "/rules", label: t("nav.rules"), desc: t("home.rulesDesc"), icon: "📏" },
            { to: "/quiz", label: t("nav.quiz"), desc: t("quiz.title"), icon: "🧠" },
          ].map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-3xl border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-xl">{s.icon}</span>
              <h3 className="mt-4 flex items-center gap-1.5 text-lg font-bold tracking-tight">
                {s.label}
                <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
