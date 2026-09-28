import { useSyncExternalStore } from "react";
import { cn } from "~/lib/utils";
import { links } from "~/content/site";
import { AppleIcon, GooglePlayIcon } from "./icons";

const base =
  "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-semibold whitespace-nowrap transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:w-auto";

const styles = {
  primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90",
  secondary: "border border-foreground/15 bg-card/70 text-foreground backdrop-blur hover:border-foreground/30 hover:bg-card",
  primaryInverted: "bg-white text-brand-navy shadow-lg shadow-black/20 hover:bg-white/90",
  secondaryInverted: "border border-white/30 bg-white/10 text-white backdrop-blur hover:border-white/50 hover:bg-white/15",
};

const noopSubscribe = () => () => {};

// Server snapshot is false, so prerendered HTML (App Store first) hydrates cleanly.
function useIsAndroid() {
  return useSyncExternalStore(
    noopSubscribe,
    () => /android/i.test(navigator.userAgent),
    () => false,
  );
}

export function StoreButtons({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  const android = useIsAndroid();
  const style = (primary: boolean) =>
    inverted ? (primary ? styles.primaryInverted : styles.secondaryInverted) : primary ? styles.primary : styles.secondary;

  return (
    <div className={cn("flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row", className)}>
      <a href={links.appStore} className={cn(base, style(!android), android && "order-2")}>
        <AppleIcon className="-mt-0.5 size-[18px]" />
        Download on the App Store
      </a>
      <a
        href={links.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, style(android), android && "order-1")}
      >
        <GooglePlayIcon className="size-4" />
        Get it on Google Play
      </a>
    </div>
  );
}
