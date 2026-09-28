import type { SVGProps } from "react";

export function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.66ZM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.66 1.37-.58.67-1.1 1.76-.96 2.8 1.01.08 2.05-.52 2.68-1.28Z" />
    </svg>
  );
}

export function GooglePlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#00d7fe" d="M3.6 2.2c-.23.25-.37.63-.37 1.12v17.36c0 .49.14.87.37 1.12l.06.06 9.72-9.72v-.23L3.66 2.14l-.06.06Z" />
      <path fill="#ffce00" d="m16.62 15.38-3.24-3.24v-.23l3.24-3.25.07.04 3.84 2.18c1.1.62 1.1 1.64 0 2.27l-3.84 2.18-.07.05Z" />
      <path fill="#ff3a44" d="m16.69 15.34-3.31-3.31-9.78 9.77c.36.38.96.43 1.63.05l11.46-6.51" />
      <path fill="#00f076" d="M16.69 8.7 5.23 2.2c-.67-.39-1.27-.34-1.63.04l9.78 9.78 3.31-3.32Z" />
    </svg>
  );
}

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.94 4.3 18.9 18.63c-.23 1.01-.83 1.26-1.68.78l-4.63-3.41-2.23 2.15c-.25.25-.45.45-.93.45l.33-4.71 8.58-7.75c.37-.33-.08-.52-.58-.18L7.14 12.63 2.58 11.2c-.99-.31-1-.99.21-1.47l17.8-6.86c.83-.31 1.55.18 1.35 1.43Z" />
    </svg>
  );
}

export function Squiggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 300 12" preserveAspectRatio="none" fill="none" aria-hidden="true" {...props}>
      <path d="M2 8.5C50 3 100 3 150 6.5S250 10 298 4" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
