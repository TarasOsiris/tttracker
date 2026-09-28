import type { Trajectory } from "../models";

export const trajectories: Trajectory[] = [
  {
    id: "flat",
    label: "flat",
    netClearance: "Just over the net (1-3 cm)",
  },
  {
    id: "low-arc",
    label: "low-arc",
    netClearance: "Low arc over the net (5-15 cm)",
  },
  {
    id: "high-arc",
    label: "high-arc",
    netClearance: "High arc over the net (20+ cm)",
  },
];
