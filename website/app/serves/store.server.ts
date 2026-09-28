// Build-time only: each serves page receives just its own language's translated data.
import type { Locale } from "~/i18n/config";
import {
  bounces,
  deceptions,
  motions,
  placements,
  serves,
  speeds,
  spins,
  tacticalPurposes,
  tosses,
  trajectories,
} from "./data";
import { de } from "./i18n/de";
import { deData } from "./i18n/de-data";
import { en } from "./i18n/en";
import { es } from "./i18n/es";
import { type DataTranslations, esData } from "./i18n/es-data";
import { fr } from "./i18n/fr";
import { frData } from "./i18n/fr-data";
import { it } from "./i18n/it";
import { itData } from "./i18n/it-data";
import { ja } from "./i18n/ja";
import { jaData } from "./i18n/ja-data";
import { ko } from "./i18n/ko";
import { koData } from "./i18n/ko-data";
import { pt } from "./i18n/pt";
import { ptData } from "./i18n/pt-data";
import type { TranslationDict } from "./i18n/types";
import { uk } from "./i18n/uk";
import { ukData } from "./i18n/uk-data";
import { zh } from "./i18n/zh";
import { zhData } from "./i18n/zh-data";

const dictionaries: Record<Locale, TranslationDict> = { en, es, de, fr, pt, ja, zh, ko, it, uk };
const dataTranslations: Partial<Record<Locale, DataTranslations>> = {
  es: esData,
  de: deData,
  fr: frData,
  pt: ptData,
  ja: jaData,
  zh: zhData,
  ko: koData,
  it: itData,
  uk: ukData,
};

// A missing key would put English on a page indexed as another language, so fail the build instead.
for (const [locale, dict] of Object.entries(dictionaries)) {
  const missing = Object.keys(en).filter((k) => !(k in dict));
  if (missing.length) throw new Error(`Serves dictionary "${locale}" is missing: ${missing.slice(0, 5).join(", ")}`);
}

function applyTranslation<T extends { id: string }>(items: T[], translations: Record<string, Partial<T>> | undefined): T[] {
  if (!translations) return items;
  return items.map((item) => {
    const overlay = translations[item.id];
    return overlay ? { ...item, ...overlay } : item;
  });
}

export function servesPayload(locale: Locale) {
  const tr = dataTranslations[locale];
  return {
    dict: dictionaries[locale],
    data: {
      motions: applyTranslation(motions, tr?.motions),
      spins: applyTranslation(spins, tr?.spins),
      bounces: applyTranslation(bounces, tr?.bounces),
      placements: applyTranslation(placements, tr?.placements),
      speeds: applyTranslation(speeds, tr?.speeds),
      trajectories: applyTranslation(trajectories, tr?.trajectories),
      tosses: applyTranslation(tosses, tr?.tosses),
      deceptions: applyTranslation(deceptions, tr?.deceptions),
      tacticalPurposes: applyTranslation(tacticalPurposes, tr?.tacticalPurposes),
      serves: applyTranslation(serves, tr?.serves),
    },
  };
}

export type ServesPayload = ReturnType<typeof servesPayload>;

export const serveIds = serves.map((s) => s.id);
export const motionIds = motions.map((m) => m.id);

/** A few very common serves for the tracker home page teaser. */
export function featuredServes(locale: Locale, count = 3) {
  return servesPayload(locale)
    .data.serves.filter((s) => s.commonality === "very common")
    .slice(0, count)
    .map(({ id, name, description, difficulty }) => ({ id, name, description, difficulty }));
}
