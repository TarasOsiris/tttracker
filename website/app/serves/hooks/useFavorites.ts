import { useSyncExternalStore, useCallback } from "react";

const STORAGE_KEY = "favorite-serves";
const EMPTY: Set<string> = new Set();

const isBrowser = typeof window !== "undefined";

function getSnapshot(): Set<string> {
  if (!isBrowser) return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

let cached = getSnapshot();

function subscribe(callback: () => void) {
  if (!isBrowser) return () => {};
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cached = getSnapshot();
      callback();
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getSnapshotCached() {
  return cached;
}

/**
 * Prerendered HTML never has favourites, so hydration must start from the same
 * empty set — React swaps in the real value on the first post-hydration render.
 */
function getServerSnapshot() {
  return EMPTY;
}

function persist(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    /* private mode — favourites stay in memory for this session */
  }
  cached = ids;
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshotCached, getServerSnapshot);

  const toggleFavorite = useCallback((id: string) => {
    const next = new Set(getSnapshot());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    persist(next);
    // Force re-render by re-triggering subscribers
    window.dispatchEvent(
      new StorageEvent("storage", { key: STORAGE_KEY }),
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.has(id),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorite };
}
