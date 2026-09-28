export type SessionType = "technique" | "match" | "serve" | "physical" | "freeplay";

export type Drill = {
  slug: string;
  emoji: string;
  title: string;
  short: string;
  metaTitle: string;
  metaDescription: string;
  level: "Beginner" | "Intermediate" | "All levels";
  sessionType: SessionType;
  intro: string;
  blocks: { title: string; items: { name: string; minutes: number; note?: string }[] }[];
  tips: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const totalMinutes = (d: Drill) =>
  d.blocks.reduce((sum, b) => sum + b.items.reduce((s, i) => s + i.minutes, 0), 0);

export const drillCount = (d: Drill) => d.blocks.reduce((sum, b) => sum + b.items.length, 0);


// Slugs are shared by every locale; the English list is the source of truth for routes.
export const drillSlugs = [
  "beginner-fundamentals",
  "footwork-drills",
  "serve-and-receive",
  "multiball-training",
  "forehand-backhand-consistency",
  "match-play-prep",
];
