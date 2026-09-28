import type { Toss } from "../models";

export const tosses: Toss[] = [
  {
    id: "low-legal",
    height: "low",
    position: "Open palm, ball visible, tossed ~16 cm upward",
    legal: true,
  },
  {
    id: "medium-legal",
    height: "medium",
    position: "Open palm, ball visible, tossed ~30-50 cm upward",
    legal: true,
  },
  {
    id: "high-legal",
    height: "high",
    position: "Open palm, ball visible, tossed 2-5 meters upward",
    legal: true,
  },
  {
    id: "hidden-illegal",
    height: "low",
    position: "Ball hidden behind body or arm during toss — illegal under ITTF rules",
    legal: false,
  },
];
