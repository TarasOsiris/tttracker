import { useEffect, useRef, useSyncExternalStore } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { useI18n } from "~/i18n/use-i18n";

/**
 * Google Consent Mode v2. root.tsx sets the defaults before GA loads: analytics denied in the EEA, the UK and
 * Switzerland (by Google's own IP region), granted elsewhere, ads denied everywhere since the site shows none.
 * This banner asks visitors whose time zone is in Europe, once; "Cookie settings" in the footer reopens it
 * anywhere. The choice lives in localStorage and the inline script in root.tsx re-applies it on every page.
 */
export const CONSENT_KEY = "analytics-consent";

type Choice = "granted" | "denied";

const listeners = new Set<() => void>();
let reopened = false;
// Kept for this visit when storage is blocked, so the banner still closes.
let memoryChoice: Choice | null = null;

function storedChoice(): Choice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // storage unavailable (private mode): fall back to this visit's answer
  }
  return memoryChoice;
}

function inEurope(): boolean {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone?.startsWith("Europe/") ?? false;
  } catch {
    return false;
  }
}

const emit = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

const isOpen = () => reopened || (storedChoice() === null && inEurope());

/** Opens the banner again, from the footer's "Cookie settings". */
export function openConsentSettings() {
  reopened = true;
  emit();
}

function choose(choice: Choice) {
  memoryChoice = choice;
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // storage unavailable: the choice holds for this visit only
  }
  window.gtag?.("consent", "update", { analytics_storage: choice });
  reopened = false;
  emit();
}

export function ConsentBanner() {
  const { t, href } = useI18n();
  // Closed in the prerendered HTML; the client decides after hydration.
  const open = useSyncExternalStore(subscribe, isOpen, () => false);
  const ref = useRef<HTMLDivElement>(null);

  // Reopened from the footer: move focus to the banner so keyboard users land on it.
  useEffect(() => {
    if (open && reopened) ref.current?.focus();
  }, [open]);

  if (!open) return null;
  return (
    <div
      ref={ref}
      role="region"
      aria-label={t.consent.label}
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border bg-card p-4 shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/50 sm:inset-x-auto sm:start-4 sm:bottom-4 sm:max-w-md sm:p-5"
    >
      <p className="text-sm leading-relaxed">
        {t.consent.text}{" "}
        <Link to={href("/privacy")} className="font-medium text-primary underline-offset-2 hover:underline">
          {t.footer.privacy}
        </Link>
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" className="rounded-full px-5" onClick={() => choose("denied")}>
          {t.consent.reject}
        </Button>
        <Button className="rounded-full px-5" onClick={() => choose("granted")}>
          {t.consent.accept}
        </Button>
      </div>
    </div>
  );
}
