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

export const links = {
  appStore: "https://apps.apple.com/us/app/tt-training-tracker/id6758044383",
  googlePlay: "https://play.google.com/store/apps/details?id=xyz.tleskiv.tt",
  telegram: "https://t.me/tttrackerapp",
  support: "https://ninevastudios.com/about-us",
  email: "info@ninevastudios.com",
  studio: "https://ninevastudios.com",
};

export const navLinks = [
  { href: "/#features", key: "features" },
  { href: "/#how-it-works", key: "howItWorks" },
  { href: "/serves", key: "serves" },
  { href: "/drills", key: "drills" },
  { href: "/#faq", key: "faq" },
] as const;

export const screenshotFiles = ["screen-1", "screen-2", "screen-3", "screen-4", "screen-5", "screen-6", "screen-7", "screen-8"];
