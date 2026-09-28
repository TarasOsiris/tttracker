import { Outlet, useLocation } from "react-router";
import type { Route } from "./+types/serves-layout";
import { localeFromPath, stripLocale } from "~/i18n/config";
import { cn } from "~/lib/utils";
import { ServesProvider } from "~/serves/context";
import { Link } from "~/serves/navigation";
import { servesPayload } from "~/serves/store.server";

// Build-time: only this locale's serve data and UI strings are embedded in the page.
export function loader({ request }: Route.LoaderArgs) {
  return servesPayload(localeFromPath(new URL(request.url).pathname));
}

const tabs = [
  { to: "/serves", key: "nav.serves", emoji: "🏓" },
  { to: "/motions", key: "nav.motions", emoji: "🔄" },
  { to: "/spins", key: "nav.spins", emoji: "🌀" },
  { to: "/rules", key: "nav.rules", emoji: "📏" },
  { to: "/quiz", key: "nav.quiz", emoji: "🧠" },
];

export default function ServesLayout({ loaderData }: Route.ComponentProps) {
  const neutral = stripLocale(useLocation().pathname);
  return (
    <ServesProvider payload={loaderData}>
      <div className="relative">
        <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-80" />
        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28">
          <nav
            aria-label={loaderData.dict["layout.title"]}
            className="no-print no-scrollbar -mx-4 mb-8 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0"
          >
            {tabs.map((tab) => {
              const active = neutral === tab.to || neutral.startsWith(`${tab.to}/`);
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  <span aria-hidden="true">{tab.emoji}</span>
                  {loaderData.dict[tab.key]}
                </Link>
              );
            })}
          </nav>
          <Outlet />
        </div>
      </div>
    </ServesProvider>
  );
}
