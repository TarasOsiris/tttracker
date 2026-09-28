export interface Motion {
  id: string;
  name: string;
  hand: "forehand" | "backhand";
  description: string;
  spinCapabilities: string[];
  difficulty: number; // 1-5
  references?: ({ type: "youtube"; videoId: string; title?: string } | { type: "instagram"; url: string; title?: string })[];
}

export interface SpinProfile {
  id: string;
  name: string;
  topspin: number;   // 0-100
  backspin: number;   // 0-100
  leftSidespin: number; // 0-100
  rightSidespin: number; // 0-100
  description: string;
}

export interface Bounce {
  id: string;
  label: string;
  category: "short" | "half-long" | "long";
  secondBouncePosition: string;
  risk: "low" | "medium" | "high";
}

export interface Placement {
  id: string;
  label: string;
  side: "forehand" | "backhand" | "middle";
  depth: "short" | "long";
  dangerZone: boolean;
  x: number; // 0-100 percentage for visualization
  y: number; // 0-100 percentage for visualization
}

export interface Deception {
  id: string;
  name: string;
  description: string;
  counterplay: string;
}

export interface TacticalPurpose {
  id: string;
  name: string;
  type: "serve_only" | "serve_plus_one";
  goal: string;
}

export interface Speed {
  id: string;
  label: "slow" | "medium" | "fast";
  kmh: string;
  tacticalNote: string;
}

export interface Trajectory {
  id: string;
  label: "flat" | "low-arc" | "high-arc";
  netClearance: string;
}

export interface Toss {
  id: string;
  height: "low" | "medium" | "high";
  position: string;
  legal: boolean;
}

export interface Serve {
  id: string;
  name: string;
  motionId: string;
  spinProfileId: string;
  bounceId: string;
  placementIds: string[];
  speedId: string;
  trajectoryId: string;
  tossId: string;
  deceptionIds: string[];
  tacticalPurposeIds: string[];
  difficulty: number; // 1-5
  commonality: "very common" | "common" | "uncommon" | "rare";
  description: string;
  legalityNotes?: string;
  contactPoint?: string;
  returnAdvice?: string;
  references?: ({ type: "youtube"; videoId: string; title?: string } | { type: "instagram"; url: string; title?: string })[];
  famousPlayer?: { name: string; url: string };
}

export interface EnrichedServe extends Omit<Serve, "motionId" | "spinProfileId" | "bounceId" | "placementIds" | "speedId" | "trajectoryId" | "tossId" | "deceptionIds" | "tacticalPurposeIds"> {
  motion: Motion;
  spinProfile: SpinProfile;
  bounce: Bounce;
  placements: Placement[];
  speed: Speed;
  trajectory: Trajectory;
  toss: Toss;
  deceptions: Deception[];
  tacticalPurposes: TacticalPurpose[];
}
