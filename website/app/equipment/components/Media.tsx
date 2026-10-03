// Brand logos, product photos and player photos. Logos sit on a white chip so dark logos stay legible in dark mode.
// Products without a photo fall back to the spec-drawn illustration.
import type { Image } from "../models";
import { flag } from "../labels";
import { cn } from "~/lib/utils";

export function BrandLogo({ logo, name, className }: { logo?: Image; name: string; className?: string }) {
  if (!logo) return null;
  return (
    <span className={cn("inline-flex shrink-0 items-center rounded-md bg-white px-1.5 py-0.5 ring-1 ring-black/5", className)}>
      <img src={logo.src} alt={name} width={logo.width} height={logo.height} loading="lazy" decoding="async" className="h-full w-auto max-w-24 object-contain" />
    </span>
  );
}

/** The brand's logo, or its name when there is no logo. The logo's alt text carries the name for screen readers. */
export function BrandName({ logo, name, size = "sm" }: { logo?: Image; name: string; size?: "xs" | "sm" }) {
  if (!logo) return <span>{name}</span>;
  return <BrandLogo logo={logo} name={name} className={size === "xs" ? "h-5" : "h-6"} />;
}

export function ProductThumb({ photo, fallback, className }: { photo?: Image; fallback: string; className?: string }) {
  return (
    <span className={cn("flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-black/5", className)}>
      {/* Decorative here: the name and specs are in the text next to it. */}
      <img
        src={photo?.src ?? fallback}
        alt=""
        width={photo?.width ?? 56}
        height={photo?.height ?? 64}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain p-1"
      />
    </span>
  );
}

export function PlayerAvatar({ photo, name, country, className }: { photo?: Image; name: string; country: string; className?: string }) {
  if (!photo) {
    return (
      <span aria-hidden="true" className={cn("flex shrink-0 items-center justify-center rounded-full bg-secondary text-lg", className)}>
        {flag(country) || name.slice(0, 1)}
      </span>
    );
  }
  return (
    <img
      src={photo.src}
      alt={name}
      width={photo.width}
      height={photo.height}
      loading="lazy"
      decoding="async"
      className={cn("shrink-0 rounded-full object-cover object-top", className)}
    />
  );
}

export function Credit({ image }: { image: Image }) {
  return (
    <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
      {image.credit}
    </a>
  );
}
