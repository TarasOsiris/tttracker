import type {
  Serve,
  EnrichedServe,
  Motion,
  SpinProfile,
  Bounce,
  Placement,
  Speed,
  Trajectory,
  Toss,
  Deception,
  TacticalPurpose,
} from "../models";

export interface DataStore {
  motions: Map<string, Motion>;
  spins: Map<string, SpinProfile>;
  bounces: Map<string, Bounce>;
  placements: Map<string, Placement>;
  speeds: Map<string, Speed>;
  trajectories: Map<string, Trajectory>;
  tosses: Map<string, Toss>;
  deceptions: Map<string, Deception>;
  tacticalPurposes: Map<string, TacticalPurpose>;
}

export function enrichServe(serve: Serve, store: DataStore): EnrichedServe {
  const { motionId, spinProfileId, bounceId, placementIds, speedId, trajectoryId, tossId, deceptionIds, tacticalPurposeIds, ...rest } = serve;

  return {
    ...rest,
    motion: store.motions.get(motionId)!,
    spinProfile: store.spins.get(spinProfileId)!,
    bounce: store.bounces.get(bounceId)!,
    placements: placementIds.map((id) => store.placements.get(id)!),
    speed: store.speeds.get(speedId)!,
    trajectory: store.trajectories.get(trajectoryId)!,
    toss: store.tosses.get(tossId)!,
    deceptions: deceptionIds.map((id) => store.deceptions.get(id)!),
    tacticalPurposes: tacticalPurposeIds.map((id) => store.tacticalPurposes.get(id)!),
  };
}
