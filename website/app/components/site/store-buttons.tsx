import { cn } from "~/lib/utils";
import { links } from "~/content/site";
import { AppleIcon, GooglePlayIcon } from "./icons";

const base =
  "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-semibold whitespace-nowrap transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:w-auto";

export function StoreButtons({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <div className={cn("flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row", className)}>
      <a
        href={links.appStore}
        className={cn(
          base,
          inverted
            ? "bg-white text-[#16325c] shadow-lg shadow-black/20 hover:bg-white/90"
            : "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90",
        )}
      >
        <AppleIcon className="-mt-0.5 size-[18px]" />
        Download on the App Store
      </a>
      <a
        href={links.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          base,
          inverted
            ? "border border-white/30 bg-white/10 text-white backdrop-blur hover:border-white/50 hover:bg-white/15"
            : "border border-foreground/15 bg-card/70 text-foreground backdrop-blur hover:border-foreground/30 hover:bg-card",
        )}
      >
        <GooglePlayIcon className="size-4" />
        Get it on Google Play
      </a>
    </div>
  );
}
