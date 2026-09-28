import type { Bounce } from "../models";
import { useLanguage } from "../context";

interface BounceDiagramProps {
  bounce: Bounce;
}

const riskColor: Record<string, string> = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
};

export function BounceDiagram({ bounce }: BounceDiagramProps) {
  const { t } = useLanguage();

  // Table dimensions in SVG coordinates
  const tableY = 60;
  const tableLeft = 20;
  const tableRight = 280;
  const tableCenter = (tableLeft + tableRight) / 2;
  const netX = tableCenter;
  const netTop = 38;
  const netBottom = tableY;

  // First bounce on server's side (before net)
  const firstBounceX = netX - 35;

  // Second bounce on receiver's side (based on category)
  const bounceX =
    bounce.category === "short"
      ? netX + 30
      : bounce.category === "half-long"
        ? netX + 60
        : netX + 95;

  // Ball path: serve descends → 1st bounce (server side) → arc over net → 2nd bounce (receiver side)
  const startX = tableLeft + 30;
  const startY = 12;
  const arcPeakY = 8; // well above net top (38)

  const pathD = [
    // Serve descends to first bounce on server's side
    `M ${startX} ${startY}`,
    `Q ${(startX + firstBounceX) / 2} ${startY - 2} ${firstBounceX} ${tableY}`,
    // Ball arcs over net to landing point on receiver's side
    `Q ${netX} ${arcPeakY} ${bounceX} ${tableY}`,
  ].join(" ");

  // Resolved by CSS (see --diagram-* in styles/index.css), not by JS.
  const legColor = "var(--diagram-leg)";
  const netColor = "var(--diagram-net)";
  const labelColor = "var(--diagram-label)";
  const tableSurface = "var(--diagram-table)";
  const color = riskColor[bounce.risk];

  return (
    <svg
      width="300"
      height="90"
      viewBox="0 0 300 90"
      className="block"
      role="img"
      aria-label={`${t("serveDetail.bounce")}: ${bounce.category}, ${t("serveDetail.risk")} ${bounce.risk}`}
    >
      {/* Table surface */}
      <rect x={tableLeft} y={tableY} width={tableRight - tableLeft} height={4} rx="1" fill={tableSurface} />

      {/* Table legs */}
      <line x1={tableLeft + 10} y1={tableY + 4} x2={tableLeft + 10} y2={tableY + 20} stroke={legColor} strokeWidth="2" />
      <line x1={tableRight - 10} y1={tableY + 4} x2={tableRight - 10} y2={tableY + 20} stroke={legColor} strokeWidth="2" />

      {/* Net */}
      <line x1={netX} y1={netTop} x2={netX} y2={netBottom} stroke={netColor} strokeWidth="2" />
      <line x1={netX - 4} y1={netTop} x2={netX + 4} y2={netTop} stroke={netColor} strokeWidth="2" />

      {/* Ball arc */}
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />

      {/* First bounce (server side) */}
      <circle cx={firstBounceX} cy={tableY} r="3" fill={color} opacity="0.4" />

      {/* Second bounce (receiver side) */}
      <circle cx={bounceX} cy={tableY} r="4" fill={color} />

      {/* Labels */}
      <text x={tableLeft} y={tableY + 18} fontSize="9" fill={labelColor}>{t("components.server")}</text>
      <text x={tableRight - 40} y={tableY + 18} fontSize="9" fill={labelColor}>{t("components.receiver")}</text>
      <text x={bounceX} y={tableY - 8} textAnchor="middle" fontSize="8" fill={color} fontWeight="600">
        {bounce.category}
      </text>
    </svg>
  );
}
