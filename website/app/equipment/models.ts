// Equipment encyclopedia data model. English only. Accuracy rules (enforced by validate.ts at build):
// - Every blade, rubber, player and guide cites `sources`; every fact cites one of them.
// - Unknown values are `null` and render as "—". Nothing is estimated or converted.
// - Manufacturer ratings are stored verbatim on the brand's own scale and are never compared across brands.
// - Sponge hardness keeps the scale the maker states; only coarse bands (hardness.ts) are compared.
import type { LegalBlock } from "~/content/legal";

/** ISO date, YYYY-MM-DD. */
export type IsoDate = string;

export type SourceKind =
  /** The brand's own site, catalog or official regional distributor (e.g. Butterfly North America). */
  | "manufacturer"
  /** ITTF / WTT documents, including the authorised racket coverings list (LARC) and rankings. */
  | "ittf"
  /** A retailer's product page. Only used when no manufacturer page states the value. */
  | "retailer"
  /** News, interviews, federation and sponsor announcements. */
  | "press"
  /** The player's own channels. */
  | "player"
  /** Encyclopedic or technical references (e.g. a fibre maker's material page). */
  | "reference";

export interface Source {
  url: string;
  label: string;
  kind: SourceKind;
  /** When the page was read. */
  accessed: IsoDate;
}

/** A fact shown on a page. `source` must be the url of one of the item's `sources`. */
export interface Fact {
  text: string;
  source: string;
}

/** A rating exactly as the maker prints it, e.g. { label: "Reaction", value: 11.8 }. */
export interface ManufacturerRating {
  label: string;
  value: number | string;
  /** Top of the maker's scale when the maker states it, e.g. 10 for "Speed 9.5/10". */
  max?: number;
}

/**
 * - esn: the European (German) scale used by ESN-made sponges (Tibhar, Andro, Donic, Joola, Xiom...).
 * - japanese: the scale Butterfly and other Japanese makers print; lower numbers than ESN for similar feel.
 * - chinese: the scale DHS and other Chinese makers print.
 * - unstated: the maker prints a number but doesn't say which scale; no band is derived from it.
 */
export type HardnessScale = "esn" | "japanese" | "chinese" | "unstated";

export interface Hardness {
  min: number;
  /** Set when the maker gives a range ("39-41"). */
  max?: number;
  scale: HardnessScale;
}

export type Status = "current" | "discontinued";

export type Fiber =
  | "arylate-carbon"
  | "zylon-carbon"
  | "super-zlc"
  | "zylon"
  | "carbon"
  | "aramid-carbon"
  | "aramid"
  | "texalium"
  | "glass"
  | "basalt"
  | "other";

/** Where the composite layers sit. outer: just under the outer veneer. inner: next to the core. */
export type FiberPosition = "outer" | "inner" | "other";

export type Handle = "FL" | "ST" | "AN" | "CON" | "CS" | "JP";

/** A real photo or logo stored under public/equipment/. */
export interface Image {
  /** Site path, e.g. "/equipment/photos/blades/butterfly-viscaria.webp". */
  src: string;
  width: number;
  height: number;
  /** The page the image was taken from (the maker's own product page for product photos). */
  sourceUrl: string;
  /** Shown under the image, e.g. "© Butterfly" or "Photo: Jane Doe, CC BY-SA 4.0". */
  credit: string;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  website: string;
  /** How this brand's own ratings work, shown next to them. */
  ratingNote: string | null;
  /** The hardness scale the brand prints, if it is consistent across its range. */
  hardnessScale: HardnessScale | null;
  /** The brand's logo, used wherever the brand is named. */
  logo?: Image;
  sources: Source[];
}

interface ItemBase {
  /** URL slug, unique within blades or within rubbers, e.g. "butterfly-viscaria". */
  id: string;
  brandId: string;
  /** Retail name without the brand, e.g. "Viscaria". */
  name: string;
  /** Other names the same product is sold under. */
  aliases?: string[];
  manufacturerRatings: ManufacturerRating[];
  releaseYear: number | null;
  status: Status;
  /** One sentence for cards and meta descriptions. Our words, neutral, no marketing claims. */
  summary: string;
  /** 2-4 short paragraphs. Our words; claims about feel are attributed ("Butterfly describes..."). */
  description: string[];
  facts: Fact[];
  /** Conflicting official values and other caveats, e.g. regional sites listing different weights. */
  notes?: string[];
  /** Product photo from the maker's own product page. Without one, the spec-drawn illustration is shown. */
  photo?: Image;
  sources: Source[];
  lastVerified: IsoDate;
}

export interface Blade extends ItemBase {
  /** Total plies, wood plus composite, or null if the maker doesn't say. */
  plies: number | null;
  /** The maker's own notation, verbatim, e.g. "5W+2AC". */
  layup: string | null;
  /** Ply order from one face to the other, only when the maker publishes it. */
  plyOrder?: string[];
  /** Empty for all-wood blades. */
  fibers: Fiber[];
  /** The maker's name for the composite, e.g. "Arylate Carbon", "Texalium". */
  fiberName: string | null;
  fiberPosition: FiberPosition | null;
  outerWood: string | null;
  thicknessMm: number | null;
  /** Nominal weight as the maker states it; makers note blades vary by several grams. */
  weightG: { min: number; max?: number } | null;
  handles: Handle[];
  /** e.g. "OFF", "ALL+", verbatim. Classes are each brand's own and aren't compared across brands. */
  manufacturerClass: string | null;
  madeIn: string | null;
}

export type RubberType = "classic" | "tensor" | "tacky" | "hybrid" | "short-pips" | "medium-pips" | "long-pips" | "anti";

export interface Rubber extends ItemBase {
  type: RubberType;
  /** How tacky the topsheet is, when the maker or ITTF-approved description says so. */
  tackiness: "non-tacky" | "slightly-tacky" | "tacky" | null;
  hardness: Hardness | null;
  /** Sponge thicknesses as sold, verbatim, e.g. ["1.9", "2.1", "MAX"]. "OX" means no sponge. */
  spongeThicknesses: string[];
  spongeColor: string | null;
  /** Topsheet colours sold, verbatim from the maker, e.g. ["Red", "Black"]. Empty if the maker doesn't list them. */
  topsheetColors?: string[];
  /** Pimple geometry for pips-out rubbers, only as published. */
  pips?: { heightMm?: number; diameterMm?: number; ratio?: number; note?: string };
  /** True only when confirmed on the ITTF approved list or the maker's own page. */
  ittfApproved: boolean | null;
  madeIn: string | null;
}

export type Confidence = "confirmed" | "reported" | "unverified";

export interface SetupItem {
  /** A catalog id (blade id for the blade slot, rubber id otherwise), or null if it isn't in the catalog. */
  itemId: string | null;
  /** Name as reported, e.g. "Hurricane 3 National (blue sponge)". */
  name: string;
  /** Set when the player uses a non-retail version (national-team, custom, relabelled). */
  variant?: string;
  confidence: Confidence;
  source: Source;
  asOf: IsoDate;
}

export type SetupSlot = "blade" | "forehand" | "backhand";

export interface SetupChange {
  date: IsoDate;
  slot: SetupSlot;
  from: string;
  to: string;
  source: Source;
}

export interface Player {
  /** URL slug, e.g. "wang-chuqin". */
  id: string;
  name: string;
  /** ITTF three-letter country code, e.g. "CHN". */
  country: string;
  gender: "men" | "women";
  hand: "right" | "left" | null;
  grip: "shakehand" | "penhold" | null;
  /** null once a player drops out of the tracked rankings; they stay listed as notable players. */
  ranking: { position: number; date: IsoDate; source: Source } | null;
  setup: Record<SetupSlot, SetupItem>;
  history: SetupChange[];
  /** Freely licensed photo (Wikimedia Commons), credited. */
  photo?: Image;
  lastVerified: IsoDate;
}

export interface Guide {
  slug: string;
  title: string;
  /** Meta description, 140-160 characters. */
  description: string;
  intro: string;
  sections: { heading: string; blocks: LegalBlock[] }[];
  sources: Source[];
  updated: IsoDate;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  aliases?: string[];
  /** One or two sentences; may use [label](url) and **bold**. */
  definition: string;
  /** Guide that explains it in depth. */
  guide?: string;
}
