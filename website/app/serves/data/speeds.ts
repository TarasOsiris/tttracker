import type { Speed } from "../models";

export const speeds: Speed[] = [
  {
    id: "slow",
    label: "slow",
    kmh: "20-40 km/h",
    tacticalNote: "Maximizes spin potential. Gives the server more time to prepare for the next ball.",
  },
  {
    id: "medium",
    label: "medium",
    kmh: "40-65 km/h",
    tacticalNote: "Balances spin and speed. Reduces opponent's reaction time while maintaining control.",
  },
  {
    id: "fast",
    label: "fast",
    kmh: "65-100+ km/h",
    tacticalNote: "Rushes the opponent. Sacrifices spin for raw speed to force a weak return or outright ace.",
  },
];
