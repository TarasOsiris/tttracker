// Display names and formatting for equipment values. Unknown values render as an em dash, never a guess.
import type { Blade, Confidence, Fiber, FiberPosition, Handle, Hardness, HardnessScale, Rubber, RubberType } from "./models";

export const DASH = "—";

export const fiberLabels: Record<Fiber, string> = {
  "arylate-carbon": "Arylate carbon (ALC)",
  "zylon-carbon": "Zylon carbon (ZLC)",
  "super-zlc": "Super ZLC",
  zylon: "Zylon (ZLF)",
  carbon: "Carbon",
  "aramid-carbon": "Aramid carbon",
  aramid: "Aramid (Kevlar)",
  texalium: "Texalium",
  glass: "Glass fibre",
  basalt: "Basalt",
  other: "Other composite",
};

export const fiberPositionLabels: Record<FiberPosition, string> = {
  outer: "Outer (under the face veneer)",
  inner: "Inner (next to the core)",
  other: "Other",
};

export const handleLabels: Record<Handle, string> = {
  FL: "Flared (FL)",
  ST: "Straight (ST)",
  AN: "Anatomic (AN)",
  CON: "Concave (CON)",
  CS: "Chinese penhold (CS)",
  JP: "Japanese penhold (JP)",
};

export const rubberTypeLabels: Record<RubberType, string> = {
  classic: "Classic inverted (non-tensor)",
  tensor: "Tensor (European/Japanese)",
  tacky: "Tacky (Chinese style)",
  hybrid: "Hybrid",
  "short-pips": "Short pips",
  "medium-pips": "Medium pips",
  "long-pips": "Long pips",
  anti: "Anti-spin",
};

export const scaleLabels: Record<HardnessScale, string> = {
  esn: "European (ESN) scale",
  japanese: "Japanese scale",
  chinese: "Chinese scale",
  unstated: "scale not stated by the maker",
};

export const shortScaleLabels: Record<HardnessScale, string> = {
  esn: "ESN",
  japanese: "Japanese",
  chinese: "Chinese",
  unstated: "scale unstated",
};

export const confidenceLabels: Record<Confidence, { label: string; description: string }> = {
  confirmed: { label: "Confirmed", description: "Stated by the player, their sponsor or an official source." },
  reported: { label: "Reported", description: "Reported by a reputable equipment site or interview." },
  unverified: { label: "Unverified", description: "Seen in match footage or photos but not confirmed by a source." },
};

export function construction(blade: Pick<Blade, "fibers" | "fiberPosition">): string {
  if (blade.fibers.length === 0) return "All-wood";
  if (blade.fiberPosition === "outer") return "Outer composite";
  if (blade.fiberPosition === "inner") return "Inner composite";
  return "Composite";
}

export function formatWeight(w: Blade["weightG"]): string {
  if (!w) return DASH;
  return w.max != null && w.max !== w.min ? `${w.min}–${w.max} g` : `${w.min} g`;
}

export function formatMm(mm: number | null): string {
  return mm == null ? DASH : `${mm} mm`;
}

export function formatHardnessValue(h: Hardness): string {
  return h.max != null && h.max !== h.min ? `${h.min}–${h.max}°` : `${h.min}°`;
}

export function formatHardness(h: Hardness | null): string {
  if (!h) return DASH;
  return `${formatHardnessValue(h)} (${scaleLabels[h.scale]})`;
}

export function formatThicknesses(r: Pick<Rubber, "spongeThicknesses">): string {
  return r.spongeThicknesses.length ? r.spongeThicknesses.join(", ") : DASH;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

/** Three-letter ITTF code to a flag emoji, for the common codes that differ from ISO alpha-2. */
const ittfToIso2: Record<string, string> = {
  CHN: "CN", JPN: "JP", KOR: "KR", TPE: "TW", HKG: "HK", SGP: "SG", IND: "IN", GER: "DE", FRA: "FR", SWE: "SE",
  BRA: "BR", POR: "PT", ESP: "ES", SLO: "SI", CRO: "HR", ROU: "RO", EGY: "EG", NGR: "NG", USA: "US", PUR: "PR",
  AUT: "AT", DEN: "DK", BEL: "BE", ENG: "GB", NED: "NL", POL: "PL", CZE: "CZ", SVK: "SK", HUN: "HU", LUX: "LU",
  ITA: "IT", SUI: "CH", CAN: "CA", MEX: "MX", ARG: "AR", CHI: "CL", AUS: "AU", NZL: "NZ", THA: "TH", MAS: "MY",
  INA: "ID", IRI: "IR", KAZ: "KZ", UKR: "UA", TUR: "TR", ALG: "DZ", TUN: "TN", PRK: "KP", MAC: "MO", VIE: "VN",
  SRB: "RS", GRE: "GR", NOR: "NO", FIN: "FI", ISR: "IL", QAT: "QA", KSA: "SA", LTU: "LT", LAT: "LV", EST: "EE",
  MDA: "MD", BLR: "BY", RUS: "RU", PHI: "PH", PER: "PE", CUB: "CU", DOM: "DO", ECU: "EC", COL: "CO", VEN: "VE",
};

export function flag(country: string): string {
  const iso = ittfToIso2[country];
  if (!iso) return "";
  return String.fromCodePoint(...[...iso].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}
