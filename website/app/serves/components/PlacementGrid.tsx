import type { Placement } from "../models";
import { useLanguage } from "../context";

interface PlacementGridProps {
  placements: Placement[];
  allPlacements?: Placement[];
}

export function PlacementGrid({ placements, allPlacements }: PlacementGridProps) {
  const { t } = useLanguage();
  const activeIds = new Set(placements.map((p) => p.id));
  const displayPlacements = allPlacements ?? placements;

  // Resolved by CSS (see --placement-* in styles/index.css), not by JS.
  const tableFill = "var(--placement-fill)";
  const tableStroke = "var(--placement-stroke)";
  const centerLineColor = "var(--placement-center-line)";
  const halfLabelColor = "#ffffff";
  const inactiveDotFill = "var(--placement-dot)";
  const inactiveLabelFill = "var(--placement-dot-label)";
  const activeLabelFill = "#ffffff";
  const netColor = "#ffffff";

  return (
    <svg
      width="300"
      height="400"
      viewBox="0 0 300 400"
      className="block"
      role="img"
      aria-label={`${t("serveDetail.placement")}: ${placements.map((p) => p.label).join(", ")}`}
    >
      {/* Table outline */}
      <rect x="10" y="10" width="280" height="380" rx="5" fill={tableFill} stroke={tableStroke} strokeWidth="2" />

      {/* Table border (white outer line, like a real table) */}
      <rect x="15" y="15" width="270" height="370" rx="3" fill="none" stroke={centerLineColor} strokeWidth="0.5" opacity="0.4" />

      {/* Center line */}
      <line x1="150" y1="10" x2="150" y2="390" stroke={centerLineColor} strokeWidth="0.5" strokeDasharray="5 4" />

      {/* Net */}
      <line x1="10" y1="200" x2="290" y2="200" stroke={netColor} strokeWidth="3" />

      {/* Half labels */}
      <text x="150" y="115" textAnchor="middle" fontSize="13" fill={halfLabelColor} opacity="0.5" fontWeight="500">{t("components.serverSide")}</text>
      <text x="150" y="305" textAnchor="middle" fontSize="13" fill={halfLabelColor} opacity="0.5" fontWeight="500">{t("components.receiverSide")}</text>

      {/* Side labels */}
      <text x="75" y="230" textAnchor="middle" fontSize="12" fill={halfLabelColor} opacity="0.35" fontWeight="500">BH</text>
      <text x="225" y="230" textAnchor="middle" fontSize="12" fill={halfLabelColor} opacity="0.35" fontWeight="500">FH</text>

      {/* Placement dots */}
      {displayPlacements.map((p) => {
        const isActive = activeIds.has(p.id);
        const px = 10 + (p.x / 100) * 280;
        // Map y: receiver side is bottom half (y: 200-390)
        const py = 200 + (p.y / 100) * 190;

        return (
          <g key={p.id}>
            {p.dangerZone && isActive && (
              <circle cx={px} cy={py} r="22" fill="#ef444420" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3 2" />
            )}
            <circle
              cx={px}
              cy={py}
              r="9"
              fill={isActive ? (p.dangerZone ? "#ef4444" : "#f59e0b") : inactiveDotFill}
              opacity={isActive ? 1 : 0.3}
            />
            <text
              x={px}
              y={py + 22}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill={isActive ? activeLabelFill : inactiveLabelFill}
            >
              {p.label.replace(" (Elbow)", "")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
