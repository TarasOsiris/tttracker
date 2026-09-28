import type { EnrichedServe } from "../models";

export function getSimilarServes(
  current: EnrichedServe,
  all: EnrichedServe[],
  limit = 4
): EnrichedServe[] {
  const scored = all
    .filter((s) => s.id !== current.id)
    .map((s) => ({ serve: s, score: computeScore(current, s) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((s) => s.serve);
}

export function computeScore(a: EnrichedServe, b: EnrichedServe): number {
  let score = 0;

  // Same motion (+3)
  if (a.motion.id === b.motion.id) score += 3;

  // Spin profile similarity (+2 scaled)
  const dist = Math.sqrt(
    (a.spinProfile.topspin - b.spinProfile.topspin) ** 2 +
    (a.spinProfile.backspin - b.spinProfile.backspin) ** 2 +
    (a.spinProfile.leftSidespin - b.spinProfile.leftSidespin) ** 2 +
    (a.spinProfile.rightSidespin - b.spinProfile.rightSidespin) ** 2
  );
  score += 2 * Math.max(0, 1 - dist / 200);

  // Same difficulty ±1 (+1)
  if (Math.abs(a.difficulty - b.difficulty) <= 1) score += 1;

  // Same speed (+1)
  if (a.speed.label === b.speed.label) score += 1;

  // Same bounce category (+1)
  if (a.bounce.category === b.bounce.category) score += 1;

  // Same trajectory (+0.5)
  if (a.trajectory.label === b.trajectory.label) score += 0.5;

  // Overlapping tactical purposes (+0.5 per overlap)
  const aTactical = new Set(a.tacticalPurposes.map((tp) => tp.id));
  for (const tp of b.tacticalPurposes) {
    if (aTactical.has(tp.id)) score += 0.5;
  }

  return score;
}
