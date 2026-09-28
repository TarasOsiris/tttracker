export const SITE_URL = "https://ttapp.smashyapps.com";
export const APP_NAME = "TT Tracker";
export const APP_FULL_NAME = "Ping Pong & Table Tennis Log";

export const links = {
  appStore: "https://apps.apple.com/us/app/tt-training-tracker/id6758044383",
  googlePlay: "https://play.google.com/store/apps/details?id=xyz.tleskiv.tt",
  telegram: "https://t.me/tttrackerapp",
  support: "https://ninevastudios.com/about-us",
  privacy: "https://ninevastudios.com/privacy-policy",
  studio: "https://ninevastudios.com",
  ttServes: "https://ttserves.tleskiv.xyz",
};

export const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/drills", label: "Drills" },
  { href: "/#faq", label: "FAQ" },
];

export const trustPoints = ["Free", "No account", "Works offline", "14 languages"];

export type Feature = {
  icon: "sessions" | "matches" | "analytics" | "calendar" | "widgets" | "simple";
  title: string;
  body: string;
  bullets: string[];
};

export const features: Feature[] = [
  {
    icon: "sessions",
    title: "Sessions in seconds",
    body: "Log a practice in under 30 seconds: how long, what kind, and how hard it felt.",
    bullets: ["7 session types", "Duration & RPE 1–10", "Notes and backfilling"],
  },
  {
    icon: "matches",
    title: "Matches & opponents",
    body: "Record every match game by game and keep a profile for each opponent you face.",
    bullets: ["Singles or doubles", "Practice, league, tournament", "Style, rating, handedness"],
  },
  {
    icon: "analytics",
    title: "Analytics that answer questions",
    body: "See your win rate, how much you really train each week, and a full year at a glance.",
    bullets: ["Win/loss chart", "Weekly training totals", "12-month heatmap"],
  },
  {
    icon: "calendar",
    title: "Smart calendar",
    body: "Month and week views with density dots show your busiest weeks. Tap a day to see what you did.",
    bullets: ["Month & week views", "Session density", "Custom first day of week"],
  },
  {
    icon: "widgets",
    title: "Home & Lock Screen widgets",
    body: "Keep your heatmap and last session on your Home Screen and log new sessions from Control Center.",
    bullets: ["Summary & heatmap widgets", "Lock Screen stats", "Quick add-session control"],
  },
  {
    icon: "simple",
    title: "Simple by design",
    body: "No sign-up, no clutter, no cloud required. Everything stays on your device.",
    bullets: ["Works fully offline", "Light & dark theme", "Available in 14 languages"],
  },
];

export const steps = [
  {
    title: "Log a session",
    body: "Pick a type (technique, match play, serve practice…), set the duration and effort, add a note. Done in under 30 seconds.",
  },
  {
    title: "Record your matches",
    body: "Add game scores against saved opponents, whether it's a friendly, a league night or a tournament.",
  },
  {
    title: "See your progress",
    body: "Your heatmap fills up, weekly totals climb and your win rate tells you whether the work is paying off.",
  },
];

export const screenshots = [
  { file: "screen-1", alt: "Weekly calendar with logged table tennis training sessions" },
  { file: "screen-2", alt: "Adding a new session with duration, type and intensity" },
  { file: "screen-3", alt: "Settings for default session duration, intensity and type" },
  { file: "screen-4", alt: "Session details screen showing duration and RPE" },
  { file: "screen-5", alt: "Editing or deleting an existing session" },
  { file: "screen-6", alt: "Monthly calendar view with session density" },
  { file: "screen-7", alt: "Analytics heatmap of training sessions" },
  { file: "screen-8", alt: "Calendar in dark theme" },
];

export const faqs = [
  {
    q: "Is TT Tracker free?",
    a: "Yes. You can download it for free on the App Store and Google Play and log as many sessions and matches as you like.",
  },
  {
    q: "Which devices does it run on?",
    a: "iPhone and iPad (iOS) and Android phones and tablets. Home Screen and Lock Screen widgets are available on iOS.",
  },
  {
    q: "Do I need an account?",
    a: "No. Open the app and start logging. There's no sign-up, email or password.",
  },
  {
    q: "Does it work offline? Where is my data stored?",
    a: "It works fully offline. Your sessions, matches and opponents are stored on your device, not on our servers.",
  },
  {
    q: "Is it for ping pong or table tennis?",
    a: "Both, they're the same sport! Whether you play casual ping pong in the garage or compete in a league, the app tracks your practice and matches the same way.",
  },
  {
    q: "What languages is it available in?",
    a: "14: English, Arabic, Chinese, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Portuguese, Spanish, Turkish and Ukrainian.",
  },
];
