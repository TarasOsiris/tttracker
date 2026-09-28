// Build-time only (.server): loaders pick one locale, so the client bundle never ships all translations.
import { type Drill, drillCount, drillSlugs, totalMinutes } from "~/content/drills";
import type { Locale } from "./config";
import { de } from "./locales/de";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { it } from "./locales/it";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { pt } from "./locales/pt";
import { zh } from "./locales/zh";
import type { DrillSummary, Messages } from "./types";

const all: Record<Locale, Messages> = { en, es, de, fr, pt, ja, zh, ko, it };

// Fail the build if a translation drifts from the English structure the routes and checklists rely on.
const shape = (m: Messages) =>
  JSON.stringify(m.drills.map((d) => [d.slug, d.level, d.sessionType, d.blocks.map((b) => b.items.map((i) => i.minutes))]));
for (const [locale, m] of Object.entries(all)) {
  if (shape(m) !== shape(en) || m.drills.map((d) => d.slug).join() !== drillSlugs.join()) {
    throw new Error(`Locale "${locale}" drills don't match the English structure`);
  }
  if (m.screenshots.alts.length !== en.screenshots.alts.length || m.mockup.weekdays.length !== 7) {
    throw new Error(`Locale "${locale}" has the wrong number of screenshot alts or weekdays`);
  }
}

export const getMessages = (locale: Locale) => all[locale];

export function uiMessages(locale: Locale) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { drills, ...ui } = all[locale];
  return ui;
}

export const summarize = (d: Drill): DrillSummary => ({
  slug: d.slug,
  emoji: d.emoji,
  title: d.title,
  short: d.short,
  level: d.level,
  minutes: totalMinutes(d),
  count: drillCount(d),
});

export const drillSummaries = (locale: Locale) => all[locale].drills.map(summarize);
