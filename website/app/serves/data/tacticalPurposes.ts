import type { TacticalPurpose } from "../models";

export const tacticalPurposes: TacticalPurpose[] = [
  {
    id: "force-weak-return",
    name: "Force Weak Return",
    type: "serve_only",
    goal: "Make the opponent produce a high or long return that can be attacked on the third ball.",
  },
  {
    id: "set-up-fh-attack",
    name: "Set Up Forehand Attack",
    type: "serve_plus_one",
    goal: "Position the serve so the return comes to the forehand side for an aggressive loop or smash.",
  },
  {
    id: "prevent-flip",
    name: "Prevent Flip",
    type: "serve_only",
    goal: "Keep the serve short and low enough that the opponent cannot flip or attack it aggressively.",
  },
  {
    id: "force-push",
    name: "Force Push",
    type: "serve_only",
    goal: "Heavy backspin that forces the opponent to push, giving the server initiative for the third ball.",
  },
  {
    id: "target-elbow",
    name: "Target Elbow",
    type: "serve_only",
    goal: "Aim at the opponent's elbow (crossover point) to create indecision between forehand and backhand.",
  },
  {
    id: "go-for-ace",
    name: "Go for Ace",
    type: "serve_only",
    goal: "A high-risk serve designed to win the point outright through speed, placement, or deception.",
  },
  {
    id: "serve-plus-one-fh",
    name: "Serve+1 to Forehand",
    type: "serve_plus_one",
    goal: "Serve pattern designed so the expected return can be attacked with a forehand from a prepared position.",
  },
  {
    id: "serve-plus-one-bh",
    name: "Serve+1 to Backhand",
    type: "serve_plus_one",
    goal: "Serve pattern designed so the expected return can be attacked with a backhand punch or loop.",
  },
];
