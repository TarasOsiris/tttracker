export const SITE_URL = "https://ttapp.smashyapps.com";
import type { Locale } from "~/i18n/config";

/**
 * The app as each store listing names it (TableTennisTracker/fastlane/metadata/<lang>/name.txt, or
 * play-metadata/zh-TW/title.txt for zh-tw), for page titles, the header and share cards. `brand` is the part that fits a header; the full name in
 * some languages carries keywords after it. "TT Tracker" is only the label under the home-screen icon.
 */
export const appNames: Record<Locale, { name: string; brand: string }> = {
  en: { name: "Ping Pong & Table Tennis Log", brand: "Ping Pong & Table Tennis Log" },
  es: { name: "Ping Pong y Tenis de Mesa", brand: "Ping Pong y Tenis de Mesa" },
  de: { name: "Tischtennis Trainingstagebuch", brand: "Tischtennis Trainingstagebuch" },
  fr: { name: "Tennis de table & Ping Pong", brand: "Tennis de table & Ping Pong" },
  pt: { name: "Ping Pong e Tênis de Mesa", brand: "Ping Pong e Tênis de Mesa" },
  ja: { name: "卓球ノート 練習記録・試合記録・勝率分析", brand: "卓球ノート" },
  zh: { name: "乒乓球笔记 训练记录·比赛记录·胜率", brand: "乒乓球笔记" },
  ko: { name: "탁구 훈련일지 - 경기·연습 기록 노트", brand: "탁구 훈련일지" },
  it: { name: "Ping Pong & Tennis Tavolo", brand: "Ping Pong & Tennis Tavolo" },
  uk: { name: "Настільний теніс: щоденник", brand: "Настільний теніс" },
  "zh-tw": { name: "桌球筆記 乒乓球訓練·比賽紀錄·勝率", brand: "桌球筆記" },
  tr: { name: "Masa Tenisi Antrenman Günlüğü", brand: "Masa Tenisi Antrenman Günlüğü" },
  id: { name: "Jurnal Latihan Tenis Meja", brand: "Jurnal Latihan Tenis Meja" },
  hi: { name: "टेबल टेनिस ट्रेनिंग डायरी", brand: "टेबल टेनिस ट्रेनिंग डायरी" },
  ar: { name: "تنس الطاولة: سجل التدريب", brand: "تنس الطاولة: سجل التدريب" },
};

export const APP_NAME = appNames.en.name;

export const APP_STORE_ID = "6758044383";
export const PLAY_PACKAGE = "xyz.tleskiv.tt";

export const links = {
  // No storefront in the path, so Apple opens the visitor's own country's (localized) listing.
  appStore: `https://apps.apple.com/app/id${APP_STORE_ID}`,
  googlePlay: `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`,
  email: "info@ninevastudios.com",
  studio: "https://ninevastudios.com",
};

/** The developer's own profiles, shown as icons in the footer. */
export const socials = {
  x: "https://x.com/soycastic",
  threads: "https://www.threads.com/@soycastic",
};

// Header menus group these: "app" pages are sections of the home page, "learn" is the free content. The footer lists
// them flat.
export const navLinks = [
  { href: "/#features", key: "features", group: "app" },
  { href: "/#how-it-works", key: "howItWorks", group: "app" },
  { href: "/#pricing", key: "pricing", group: "app" },
  { href: "/#faq", key: "faq", group: "app" },
  { href: "/serves", key: "serves", group: "learn" },
  { href: "/drills", key: "drills", group: "learn" },
  // The equipment encyclopedia is English only, so every language links to the same page. The blog links to the
  // language's own index where it has translated posts, otherwise to the English one (`blogHref`).
  { href: "/equipment", key: "equipment", group: "learn", englishOnly: true },
  { href: "/blog", key: "blog", group: "learn" },
] as const;

export const navGroups = ["app", "learn"] as const;

export const screenshotFiles = ["screen-1", "screen-2", "screen-3", "screen-4", "screen-5", "screen-6", "screen-7", "screen-8"];

/** Where on the site a store link sits; becomes the Play install referrer and the GA event label. */
export type StorePlacement = "hero" | "cta" | "menu" | "footer" | "blog" | "blog-inline" | "pricing";

const playLanguage: Partial<Record<Locale, string>> = { pt: "pt-BR", zh: "zh-CN", "zh-tw": "zh-TW" };

/**
 * App Store Connect provider token (`pt`), from App Analytics > Campaigns > Generate a link. App Analytics only
 * credits campaign links that carry it; leave it null until it is copied from there.
 */
const APP_STORE_PROVIDER_TOKEN: string | null = null;

/**
 * Store URLs for a page language. Google Play shows the listing in `hl` and passes `referrer` to the
 * install, so Play Console's acquisition report credits the website and the placement. The App Store link
 * carries the placement as its campaign token (`ct`, at most 40 characters).
 */
export function storeLinks(locale: Locale, placement: StorePlacement) {
  const referrer = encodeURIComponent(`utm_source=website&utm_medium=${placement}&utm_campaign=${locale}`);
  const campaign = new URLSearchParams({ ...(APP_STORE_PROVIDER_TOKEN ? { pt: APP_STORE_PROVIDER_TOKEN } : {}), ct: `website-${placement}` });
  return {
    appStore: `${links.appStore}?${campaign}`,
    googlePlay: `${links.googlePlay}&hl=${playLanguage[locale] ?? locale}&referrer=${referrer}`,
  };
}
