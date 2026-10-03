import { useState, useEffect } from "react";
import type { SpinProfile } from "../models";
import { useLanguage } from "../context";

// Theme-dependent colours are Tailwind classes rather than computed attributes:
// the prerenderer has no theme, so reading it during render would make every
// prerendered wheel disagree with the first client render.
const GUIDE = "stroke-border";
const INK = "fill-muted-foreground";

interface SpinWheelProps {
  spin: SpinProfile;
  size?: number;
}

export function SpinWheel({ spin, size = 120 }: SpinWheelProps) {
  const { t } = useLanguage();
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 16;
  const [progress, setProgress] = useState(0);
  const [animatedId, setAnimatedId] = useState(spin.id);

  // Restart the grow-in animation when the spin changes (state adjusted during render, not in an effect).
  if (animatedId !== spin.id) {
    setAnimatedId(spin.id);
    setProgress(0);
  }

  useEffect(() => {
    const raf = requestAnimationFrame(() => setProgress(1));
    return () => cancelAnimationFrame(raf);
  }, [spin.id]);

  const arrows: { value: number; angle: number; label: string; color: string }[] = [
    { value: spin.topspin, angle: -90, label: t("components.top"), color: "#ff5722" },
    { value: spin.backspin, angle: 90, label: t("components.back"), color: "#2196f3" },
    { value: spin.leftSidespin, angle: 180, label: t("components.left"), color: "#eec01f" },
    { value: spin.rightSidespin, angle: 0, label: t("components.right"), color: "#4caf50" },
  ];

  const isNoSpin = arrows.every((a) => a.value === 0);

  return (
    <svg
      direction="ltr"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="block"
      role="img"
      aria-label={
        isNoSpin
          ? t("components.noSpin")
          : arrows
              .filter((a) => a.value > 0)
              .map((a) => `${a.label} ${a.value}%`)
              .join(", ")
      }
    >
      {/* Background circles */}
      <circle cx={cx} cy={cy} r={maxR} fill="none" className={GUIDE} strokeWidth="1" />
      <circle cx={cx} cy={cy} r={maxR * 0.5} fill="none" className={GUIDE} strokeWidth="0.5" strokeDasharray="4 2" />
      <circle cx={cx} cy={cy} r={4} className={INK} />

      {/* Cross lines */}
      <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} className={GUIDE} strokeWidth="0.5" />
      <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} className={GUIDE} strokeWidth="0.5" />

      {isNoSpin ? (
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" className={INK} fontWeight="500">
          {t("components.noSpin")}
        </text>
      ) : (
        arrows
          .filter((a) => a.value > 0)
          .map((arrow, i) => {
            const len = (arrow.value / 100) * maxR;
            const rad = (arrow.angle * Math.PI) / 180;
            const ex = cx + Math.cos(rad) * len;
            const ey = cy + Math.sin(rad) * len;

            // Arrowhead — concave base for a sleek look
            const headLen = 8;
            const headAngle = 0.45;
            const inset = 3; // concave depth
            const ax1 = ex - headLen * Math.cos(rad - headAngle);
            const ay1 = ey - headLen * Math.sin(rad - headAngle);
            const ax2 = ex - headLen * Math.cos(rad + headAngle);
            const ay2 = ey - headLen * Math.sin(rad + headAngle);
            const mx = ex - inset * Math.cos(rad);
            const my = ey - inset * Math.sin(rad);

            // Stop line before arrowhead so they don't overlap
            const lineEnd = len - headLen * 0.5;
            const lex = cx + Math.cos(rad) * lineEnd;
            const ley = cy + Math.sin(rad) * lineEnd;

            // Label position
            const labelR = len + 12;
            const lx = cx + Math.cos(rad) * labelR;
            const ly = cy + Math.sin(rad) * labelR;

            return (
              <g
                key={arrow.label}
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  transform: `scale(${progress})`,
                  transition: `transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 80}ms`,
                }}
              >
                <line x1={cx} y1={cy} x2={lex} y2={ley} stroke={arrow.color} strokeWidth="2.5" strokeLinecap="round" />
                <path
                  d={`M${ex},${ey} L${ax1},${ay1} L${mx},${my} L${ax2},${ay2} Z`}
                  fill={arrow.color}
                />
                <text x={lx} y={ly + 3} textAnchor="middle" fontSize="9" fill={arrow.color} fontWeight="600">
                  {arrow.label}
                </text>
              </g>
            );
          })
      )}
    </svg>
  );
}
