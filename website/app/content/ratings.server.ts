// Build-time only (.server): the App Store rating for the home page's MobileApplication schema.
import { APP_STORE_ID } from "./site";

/**
 * Below this many ratings the average says little, and Google may treat a rich result built on it as
 * misleading, so the schema leaves the rating out until the listing has earned it.
 */
const MIN_RATINGS = 5;

export type AppRating = { ratingValue: number; ratingCount: number };

let pending: Promise<AppRating | null> | undefined;

/**
 * The US App Store listing's average rating, read once per build from Apple's public lookup API. Offline,
 * slow or odd answers give null, so the build never fails on it and the page simply has no rating.
 */
export function appStoreRating(): Promise<AppRating | null> {
  pending ??= (async () => {
    try {
      const res = await fetch(`https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=us`, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) return null;
      const app = (await res.json())?.results?.[0];
      const ratingValue = Number(app?.averageUserRating);
      const ratingCount = Number(app?.userRatingCount);
      if (!Number.isFinite(ratingValue) || !Number.isInteger(ratingCount) || ratingCount < MIN_RATINGS) return null;
      return { ratingValue: Math.round(ratingValue * 10) / 10, ratingCount };
    } catch {
      return null;
    }
  })();
  return pending;
}
