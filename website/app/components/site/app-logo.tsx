import { useId } from "react";
import { cn } from "~/lib/utils";

/**
 * The app icon, drawn from its Icon Composer layers (iosApp/iosApp/AppIcon.icon/Assets) so the
 * ball can bounce on its own.
 */
export function AppLogo({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 1024 1024" className={cn("app-logo", className)} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--logo-top)" />
          <stop offset="1" stopColor="var(--logo-bottom)" />
        </linearGradient>
        <linearGradient id={`${id}blade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2504c" />
          <stop offset="1" stopColor="#d8434b" />
        </linearGradient>
        <filter id={`${id}shadow`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#0a2a66" floodOpacity="0.35" />
        </filter>
      </defs>
      <rect width="1024" height="1024" rx="230" fill={`url(#${id}bg)`} />
      <g filter={`url(#${id}shadow)`} transform="translate(70 55) rotate(35 512 512)">
        <path d="M392 600 C438 650 455 692 457 740 L567 740 C569 692 586 650 632 600 Z" fill="#d9a466" />
        <rect x="457" y="640" width="110" height="268" rx="48" fill="#e8c592" />
        <ellipse cx="512" cy="410" rx="236" ry="250" fill={`url(#${id}blade)`} />
      </g>
      <g className="app-logo-trail" stroke="#fff" strokeOpacity="0.55" strokeWidth="24" strokeLinecap="round">
        <path d="M190 250 L142 202" />
        <path d="M250 184 L214 148" />
      </g>
      <circle className="app-logo-ball" cx="300" cy="292" r="82" fill="#fff" filter={`url(#${id}shadow)`} />
    </svg>
  );
}
