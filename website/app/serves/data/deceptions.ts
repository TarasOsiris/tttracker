import type { Deception } from "../models";

export const deceptions: Deception[] = [
  {
    id: "fake-backspin",
    name: "Fake Backspin",
    description: "The server mimics a heavy backspin motion but contacts the ball with minimal spin or topspin. The opponent expects underspin and pushes the ball long or into the net.",
    counterplay: "Watch the contact point closely. If the racket slides under the ball, it's backspin. If it brushes the back, it's likely no-spin or topspin.",
  },
  {
    id: "same-motion",
    name: "Same-Motion Variation",
    description: "Multiple spin types are delivered from an identical service motion. The opponent cannot distinguish between backspin, no-spin, and sidespin variations.",
    counterplay: "Focus on the sound of contact and ball trajectory rather than the arm motion. Practice reading the ball flight path.",
  },
  {
    id: "contact-hiding",
    name: "Contact-Point Hiding",
    description: "The server uses body positioning or arm angle to obscure the exact moment and angle of racket-ball contact.",
    counterplay: "Position yourself to see through the server's body angle. Request the umpire enforce visibility rules if contact is fully hidden.",
  },
  {
    id: "wrist-snap",
    name: "Wrist Snap Fake",
    description: "A fast wrist snap suggests heavy spin, but the racket face angle at contact produces much less spin than expected.",
    counterplay: "Don't react to the wrist speed alone. Focus on the ball's behavior immediately after the bounce.",
  },
  {
    id: "speed-variation",
    name: "Speed Variation",
    description: "Alternating between fast and slow serves with the same motion to disrupt the opponent's timing and footwork.",
    counterplay: "Stay on your toes with a neutral ready position. Read the ball speed early and adjust your backswing accordingly.",
  },
  {
    id: "body-feint",
    name: "Body Feint",
    description: "The server uses shoulder, hip, or head movement to suggest a different placement or spin direction than what is actually delivered.",
    counterplay: "Ignore body language and focus on the racket and ball. Train to read spin from ball rotation rather than server body movement.",
  },
];
