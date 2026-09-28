import type { Bounce } from "../models";

export const bounces: Bounce[] = [
  {
    id: "short-low",
    label: "Short (2nd bounce on table)",
    category: "short",
    secondBouncePosition: "On the table near the net",
    risk: "low",
  },
  {
    id: "short-medium",
    label: "Short (2nd bounce near end line)",
    category: "short",
    secondBouncePosition: "Near the end line of the table",
    risk: "medium",
  },
  {
    id: "half-long",
    label: "Half-Long",
    category: "half-long",
    secondBouncePosition: "Right at the end line — ambiguous length",
    risk: "high",
  },
  {
    id: "long-medium",
    label: "Long (deep)",
    category: "long",
    secondBouncePosition: "Would land well beyond the table",
    risk: "medium",
  },
  {
    id: "long-high",
    label: "Long (fast & deep)",
    category: "long",
    secondBouncePosition: "Far beyond the table",
    risk: "high",
  },
  {
    id: "deep-long",
    label: "Deep Long (end line)",
    category: "long",
    secondBouncePosition: "Right at the opponent's end line. Despite the long length, a well-placed deep serve jams the opponent, making a quality attack difficult.",
    risk: "low",
  },
];
