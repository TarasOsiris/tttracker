import type { Language } from "../i18n/types";

type I18n = Partial<Record<Language, Record<string, string>>>;

const speedEmoji: Record<string, string> = {
  slow: "🐢",
  medium: "⚡",
  fast: "🚀",
};

const speedI18n: I18n = {
  es: { slow: "lento", medium: "medio", fast: "rápido" },
  zh: { slow: "慢速", medium: "中速", fast: "快速" },
  fr: { slow: "lent", medium: "moyen", fast: "rapide" },
  de: { slow: "langsam", medium: "mittel", fast: "schnell" },
  ja: { slow: "遅い", medium: "普通", fast: "速い" },
  uk: { slow: "повільно", medium: "середньо", fast: "швидко" },
  pt: { slow: "lento", medium: "médio", fast: "rápido" },
  ko: { slow: "느림", medium: "보통", fast: "빠름" },
  it: { slow: "lento", medium: "medio", fast: "veloce" },
};

const commonalityEmoji: Record<string, string> = {
  "very common": "⭐",
  common: "👍",
  uncommon: "🔍",
  rare: "💎",
};

const commonalityI18n: I18n = {
  es: { "very common": "muy común", common: "común", uncommon: "poco común", rare: "raro" },
  zh: { "very common": "非常常见", common: "常见", uncommon: "不常见", rare: "罕见" },
  fr: { "very common": "très courant", common: "courant", uncommon: "peu courant", rare: "rare" },
  de: { "very common": "sehr häufig", common: "häufig", uncommon: "ungewöhnlich", rare: "selten" },
  ja: { "very common": "非常に一般的", common: "一般的", uncommon: "珍しい", rare: "レア" },
  uk: { "very common": "дуже поширена", common: "поширена", uncommon: "малопоширена", rare: "рідкісна" },
  pt: { "very common": "muito comum", common: "comum", uncommon: "incomum", rare: "raro" },
  ko: { "very common": "매우 흔함", common: "흔함", uncommon: "드묾", rare: "희귀" },
  it: { "very common": "molto comune", common: "comune", uncommon: "poco comune", rare: "raro" },
};

const bounceEmoji: Record<string, string> = {
  short: "📍",
  "half-long": "📏",
  long: "📐",
};

const bounceI18n: I18n = {
  es: { short: "corto", "half-long": "medio-largo", long: "largo" },
  zh: { short: "短", "half-long": "半长", long: "长" },
  fr: { short: "court", "half-long": "mi-long", long: "long" },
  de: { short: "kurz", "half-long": "halblang", long: "lang" },
  ja: { short: "短い", "half-long": "ハーフロング", long: "長い" },
  uk: { short: "короткий", "half-long": "напівдовгий", long: "довгий" },
  pt: { short: "curto", "half-long": "meio-longo", long: "longo" },
  ko: { short: "짧음", "half-long": "하프롱", long: "긺" },
  it: { short: "corto", "half-long": "mezza lunghezza", long: "lungo" },
};

const riskEmoji: Record<string, string> = {
  low: "✅",
  medium: "⚠️",
  high: "🔴",
};

const riskI18n: I18n = {
  es: { low: "bajo", medium: "medio", high: "alto" },
  zh: { low: "低", medium: "中", high: "高" },
  fr: { low: "faible", medium: "moyen", high: "élevé" },
  de: { low: "niedrig", medium: "mittel", high: "hoch" },
  ja: { low: "低", medium: "中", high: "高" },
  uk: { low: "низький", medium: "середній", high: "високий" },
  pt: { low: "baixo", medium: "médio", high: "alto" },
  ko: { low: "낮음", medium: "보통", high: "높음" },
  it: { low: "basso", medium: "medio", high: "alto" },
};

const trajectoryEmoji: Record<string, string> = {
  flat: "➡️",
  "low-arc": "↗️",
  "high-arc": "⤴️",
};

const trajectoryI18n: I18n = {
  es: { flat: "plano", "low-arc": "arco bajo", "high-arc": "arco alto" },
  zh: { flat: "平直", "low-arc": "低弧线", "high-arc": "高弧线" },
  fr: { flat: "plat", "low-arc": "arc bas", "high-arc": "arc haut" },
  de: { flat: "flach", "low-arc": "flacher Bogen", "high-arc": "hoher Bogen" },
  ja: { flat: "フラット", "low-arc": "低い弧", "high-arc": "高い弧" },
  uk: { flat: "плоска", "low-arc": "низька дуга", "high-arc": "висока дуга" },
  pt: { flat: "reta", "low-arc": "arco baixo", "high-arc": "arco alto" },
  ko: { flat: "직선", "low-arc": "낮은 궤적", "high-arc": "높은 궤적" },
  it: { flat: "piatta", "low-arc": "arco basso", "high-arc": "arco alto" },
};

const tossEmoji: Record<string, string> = {
  low: "⬇️",
  medium: "↔️",
  high: "⬆️",
};

const tossI18n: I18n = {
  es: { low: "bajo", medium: "medio", high: "alto" },
  zh: { low: "低", medium: "中", high: "高" },
  fr: { low: "bas", medium: "moyen", high: "haut" },
  de: { low: "niedrig", medium: "mittel", high: "hoch" },
  ja: { low: "低い", medium: "普通", high: "高い" },
  uk: { low: "низьке", medium: "середнє", high: "високе" },
  pt: { low: "baixo", medium: "médio", high: "alto" },
  ko: { low: "낮은 토스", medium: "보통 토스", high: "높은 토스" },
  it: { low: "basso", medium: "medio", high: "alto" },
};

const handEmoji: Record<string, string> = {
  forehand: "✋",
  backhand: "🤚",
};

const handI18n: I18n = {
  es: { forehand: "derecha", backhand: "revés" },
  zh: { forehand: "正手", backhand: "反手" },
  fr: { forehand: "coup droit", backhand: "revers" },
  de: { forehand: "Vorhand", backhand: "Rückhand" },
  ja: { forehand: "フォアハンド", backhand: "バックハンド" },
  uk: { forehand: "форхенд", backhand: "бекхенд" },
  pt: { forehand: "forehand", backhand: "backhand" },
  ko: { forehand: "포핸드", backhand: "백핸드" },
  it: { forehand: "dritto", backhand: "rovescio" },
};

const spinCapEmoji: Record<string, string> = {
  backspin: "⬇️",
  topspin: "⬆️",
  "left-sidespin": "⬅️",
  "right-sidespin": "➡️",
  "no-spin": "⭕",
  sidespin: "↔️",
  "heavy-backspin": "⏬",
};

const spinCapI18n: I18n = {
  es: {
    backspin: "cortado", topspin: "liftado", "left-sidespin": "lateral izq.",
    "right-sidespin": "lateral der.", "no-spin": "sin efecto", sidespin: "lateral",
    "heavy-backspin": "cortado pesado",
  },
  zh: {
    backspin: "下旋", topspin: "上旋", "left-sidespin": "左侧旋",
    "right-sidespin": "右侧旋", "no-spin": "不转", sidespin: "侧旋",
    "heavy-backspin": "强下旋",
  },
  fr: {
    backspin: "coupé", topspin: "lifté", "left-sidespin": "latéral gauche",
    "right-sidespin": "latéral droit", "no-spin": "sans effet", sidespin: "latéral",
    "heavy-backspin": "coupé lourd",
  },
  de: {
    backspin: "Unterschnitt", topspin: "Topspin", "left-sidespin": "Seitschnitt links",
    "right-sidespin": "Seitschnitt rechts", "no-spin": "ohne Schnitt", sidespin: "Seitschnitt",
    "heavy-backspin": "starker Unterschnitt",
  },
  ja: {
    backspin: "下回転", topspin: "上回転", "left-sidespin": "左横回転",
    "right-sidespin": "右横回転", "no-spin": "無回転", sidespin: "横回転",
    "heavy-backspin": "強い下回転",
  },
  uk: {
    backspin: "нижнє", topspin: "топспін", "left-sidespin": "лівий боковий",
    "right-sidespin": "правий боковий", "no-spin": "без обертання", sidespin: "боковий",
    "heavy-backspin": "сильне нижнє",
  },
  pt: {
    backspin: "backspin", topspin: "topspin", "left-sidespin": "lateral esq.",
    "right-sidespin": "lateral dir.", "no-spin": "sem efeito", sidespin: "lateral",
    "heavy-backspin": "backspin pesado",
  },
  ko: {
    backspin: "하회전", topspin: "상회전", "left-sidespin": "왼쪽 횡회전",
    "right-sidespin": "오른쪽 횡회전", "no-spin": "무회전", sidespin: "횡회전",
    "heavy-backspin": "강한 하회전",
  },
  it: {
    backspin: "taglio", topspin: "topspin", "left-sidespin": "laterale sx",
    "right-sidespin": "laterale dx", "no-spin": "senza effetto", sidespin: "laterale",
    "heavy-backspin": "taglio pesante",
  },
};

function label(v: string, i18n: I18n, lang?: Language) {
  return lang ? (i18n[lang]?.[v] ?? v) : v;
}

export function eSpeed(v: string, lang?: Language) { return `${speedEmoji[v] ?? ""} ${label(v, speedI18n, lang)}`; }
export function eCommonality(v: string, lang?: Language) { return `${commonalityEmoji[v] ?? ""} ${label(v, commonalityI18n, lang)}`; }
export function eBounce(v: string, lang?: Language) { return `${bounceEmoji[v] ?? ""} ${label(v, bounceI18n, lang)}`; }
export function eRisk(v: string, lang?: Language) { return `${riskEmoji[v] ?? ""} ${label(v, riskI18n, lang)}`; }
export function eTrajectory(v: string, lang?: Language) { return `${trajectoryEmoji[v] ?? ""} ${label(v, trajectoryI18n, lang)}`; }
export function eToss(v: string, lang?: Language) { return `${tossEmoji[v] ?? ""} ${label(v, tossI18n, lang)}`; }
export function eHand(v: string, lang?: Language) { return `${handEmoji[v] ?? ""} ${label(v, handI18n, lang)}`; }
export function eSpinCap(v: string, lang?: Language) { return `${spinCapEmoji[v] ?? ""} ${label(v, spinCapI18n, lang)}`; }
