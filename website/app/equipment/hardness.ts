// Coarse hardness bands, so sponges can be filtered across brands without pretending the scales convert exactly.
// A sponge gets a band only when the maker states which scale its number is on; "unstated" stays unbanded.
// Thresholds and their sources are explained on the "sponge-hardness" guide; keep both in sync.
import type { Hardness, HardnessScale } from "./models";

export type HardnessBand = "soft" | "medium" | "medium-hard" | "hard" | "very-hard";

export const bandOrder: HardnessBand[] = ["soft", "medium", "medium-hard", "hard", "very-hard"];

export const bandLabels: Record<HardnessBand, string> = {
  soft: "Soft",
  medium: "Medium",
  "medium-hard": "Medium-hard",
  hard: "Hard",
  "very-hard": "Very hard",
};

/**
 * Lower bound of medium, medium-hard, hard and very hard on each scale; below the first is soft. Built from published
 * dual labels and anchors: Nittaku prints Japanese 37.5 = German 47.5 (roughly ESN minus 10 on the Japanese scale), and
 * retailers put DHS 36 / 39 / 40 near ESN 45 / 51 / 53 (the gap grows with hardness). Bands are approximate by design.
 */
export const bandThresholds: Record<Exclude<HardnessScale, "unstated">, [number, number, number, number]> = {
  esn: [42, 46, 49, 53],
  japanese: [32, 36, 39, 43],
  chinese: [35, 37, 39, 41],
};

function bandOf(value: number, scale: Exclude<HardnessScale, "unstated">): HardnessBand {
  const t = bandThresholds[scale];
  const i = t.findIndex((lower) => value < lower);
  return bandOrder[i === -1 ? 4 : i];
}

/**
 * Every band a sponge falls in. A range ("37-41") that crosses a threshold belongs to each band it touches,
 * so filtering never hides a sponge that is sold in that hardness.
 */
export function hardnessBands(h: Hardness | null): HardnessBand[] {
  if (!h || h.scale === "unstated") return [];
  const lo = bandOrder.indexOf(bandOf(h.min, h.scale));
  const hi = bandOrder.indexOf(bandOf(h.max ?? h.min, h.scale));
  return bandOrder.slice(lo, hi + 1);
}

export function bandRange(bands: HardnessBand[]): string {
  if (bands.length === 0) return "";
  const first = bandLabels[bands[0]];
  return bands.length === 1 ? first : `${first} to ${bandLabels[bands[bands.length - 1]].toLowerCase()}`;
}
