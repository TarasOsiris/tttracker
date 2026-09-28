import type { EnrichedServe } from "../models";

export type SortOption = "name" | "difficulty-asc" | "difficulty-desc" | "speed";

export interface ServeFilters {
  motion?: string[];
  spin?: string[];
  bounce?: string[];
  placement?: string[];
  difficulty?: string[];
  speed?: string[];
  search?: string;
  favorites?: boolean;
  sort?: SortOption;
}

export function parseFiltersFromParams(params: URLSearchParams): ServeFilters {
  const filters: ServeFilters = {};
  const keys: (keyof Omit<ServeFilters, "search" | "favorites" | "sort">)[] = ["motion", "spin", "bounce", "placement", "difficulty", "speed"];
  for (const key of keys) {
    const val = params.get(key);
    if (val) {
      filters[key] = val.split(",");
    }
  }
  const search = params.get("search");
  if (search) {
    filters.search = search;
  }
  if (params.get("favorites") === "1") {
    filters.favorites = true;
  }
  const sort = params.get("sort");
  if (sort && ["name", "difficulty-asc", "difficulty-desc", "speed"].includes(sort)) {
    filters.sort = sort as SortOption;
  }
  return filters;
}

export function filtersToParams(filters: ServeFilters): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, values] of Object.entries(filters)) {
    if (key === "search") {
      if (values) params.set(key, values as string);
    } else if (key === "favorites") {
      if (values) params.set(key, "1");
    } else if (key === "sort") {
      if (values) params.set(key, values as string);
    } else if (values && (values as string[]).length > 0) {
      params.set(key, (values as string[]).join(","));
    }
  }
  return params;
}

export function filterServes(serves: EnrichedServe[], filters: ServeFilters, favoriteIds?: Set<string>): EnrichedServe[] {
  return serves.filter((serve) => {
    if (filters.favorites && favoriteIds && !favoriteIds.has(serve.id)) {
      return false;
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !serve.name.toLowerCase().includes(q) &&
        !serve.description.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    if (filters.motion?.length && !filters.motion.includes(serve.motion.id)) {
      return false;
    }
    if (filters.spin?.length && !filters.spin.includes(serve.spinProfile.id)) {
      return false;
    }
    if (filters.bounce?.length && !filters.bounce.includes(serve.bounce.category)) {
      return false;
    }
    if (filters.placement?.length && !serve.placements.some((p) => filters.placement!.includes(p.id))) {
      return false;
    }
    if (filters.difficulty?.length && !filters.difficulty.includes(String(serve.difficulty))) {
      return false;
    }
    if (filters.speed?.length && !filters.speed.includes(serve.speed.id)) {
      return false;
    }
    return true;
  });
}

const speedOrder: Record<string, number> = { slow: 0, medium: 1, fast: 2 };

export function sortServes(serves: EnrichedServe[], sort?: SortOption): EnrichedServe[] {
  if (!sort) return serves;
  const sorted = [...serves];
  switch (sort) {
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "difficulty-asc":
      sorted.sort((a, b) => a.difficulty - b.difficulty);
      break;
    case "difficulty-desc":
      sorted.sort((a, b) => b.difficulty - a.difficulty);
      break;
    case "speed":
      sorted.sort((a, b) => (speedOrder[a.speed.label] ?? 0) - (speedOrder[b.speed.label] ?? 0));
      break;
  }
  return sorted;
}

export function hasActiveFilters(filters: ServeFilters): boolean {
  return Object.entries(filters).some(([key, v]) => {
    if (key === "sort") return false;
    if (key === "search" || key === "favorites") return !!v;
    return v && (v as string[]).length > 0;
  });
}
