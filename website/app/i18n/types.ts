import type { Drill, SessionType } from "~/content/drills";

export type FeatureIcon = "sessions" | "matches" | "analytics" | "calendar" | "widgets" | "simple";
type QA = { q: string; a: string };

export type Messages = {
  meta: { homeTitle: string; homeDescription: string; drillsTitle: string; drillsDescription: string };
  nav: {
    features: string;
    howItWorks: string;
    serves: string;
    drills: string;
    equipment: string;
    blog: string;
    faq: string;
    getApp: string;
    openMenu: string;
    menu: string;
    toggleTheme: string;
    skipToContent: string;
    language: string;
  };
  store: { appStore: string; googlePlay: string };
  hero: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    subtitleBefore: string;
    subtitleStrong: string;
    subtitleAfter: string;
    trustPoints: string[];
  };
  mockup: {
    /** Hint under the hero phone that it can be used. */
    tryIt: string;
    weekdays: string[];
    today: string;
    yesterday: string;
    tomorrow: string;
    noSessions: string;
    /** "{n} min" */
    minutes: string;
    /** "{n} h" */
    hours: string;
    addSession: string;
    save: string;
    cancel: string;
    duration: string;
    sessionType: string;
    intensity: string;
    summary: string;
    totalSessions: string;
    totalTime: string;
    winLoss: string;
    heatmapTitle: string;
    weeklyTraining: string;
    /** A technique note, then a match note. */
    notes: string[];
    /** Sessions, Analytics */
    tabs: string[];
    heatmapLabel: string;
    heatmapStat: string;
    heatmapHours: string;
    winRate: string;
  };
  sessionTypes: Record<SessionType | "tournament" | "other", string>;
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    sessionTypesTitle: string;
    items: { icon: FeatureIcon; title: string; body: string; bullets: string[] }[];
  };
  steps: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  screenshots: {
    eyebrow: string;
    title: string;
    subtitle: string;
    previous: string;
    next: string;
    previousOne: string;
    nextOne: string;
    enlarge: string;
    alts: string[];
  };
  drillsTeaser: { eyebrow: string; title: string; subtitle: string; browseAll: string };
  servesTeaser: { eyebrow: string; title: string; subtitle: string; cta: string };
  faq: { eyebrow: string; title: string; items: QA[] };
  cta: {
    homeTitle: string;
    homeSubtitle: string;
    drillsTitle: string;
    drillsSubtitle: string;
    drillTitle: string;
    drillSubtitle: string;
    servesTitle: string;
    servesSubtitle: string;
  };
  footer: {
    tagline: string;
    product: string;
    download: string;
    company: string;
    contact: string;
    privacy: string;
    terms: string;
    encyclopedia: string;
    allServes: string;
    motions: string;
    spins: string;
    rules: string;
    quiz: string;
    about: string;
    language: string;
    legal: string;
  };
  drillsPage: {
    eyebrow: string;
    title: string;
    intro: string;
    back: string;
    minutes: string;
    minutesLong: string;
    drillCount: string;
    print: string;
    tipsTitle: string;
    faqTitle: string;
    moreTitle: string;
    progressDone: string;
    progressLeft: string;
    complete: string;
    reset: string;
    levels: Record<Drill["level"], string>;
  };
  errors: {
    notFoundTitle: string;
    notFoundBody: string;
    errorTitle: string;
    errorBody: string;
    backHome: string;
    drillNotFound: string;
  };
  drills: Drill[];
};

export type DrillSummary = Pick<Drill, "slug" | "emoji" | "title" | "short" | "level"> & {
  minutes: number;
  count: number;
};
