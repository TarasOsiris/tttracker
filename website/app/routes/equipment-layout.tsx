import { Link, Outlet, useLocation } from "react-router";
import { CtaSection } from "~/components/site/cta-section";
import { cn } from "~/lib/utils";

const tabs = [
  { to: "/equipment", label: "Overview", emoji: "🏓", exact: true },
  { to: "/equipment/blades", label: "Blades", emoji: "🪵" },
  { to: "/equipment/rubbers", label: "Rubbers", emoji: "🟥" },
  { to: "/equipment/compare", label: "Compare", emoji: "⚖️" },
  { to: "/equipment/pros", label: "Pro setups", emoji: "🏆" },
  { to: "/equipment/guides", label: "Guides", emoji: "📘" },
  { to: "/equipment/glossary", label: "Glossary", emoji: "🔤" },
];

export default function EquipmentLayout() {
  const path = useLocation().pathname.replace(/\/$/, "");
  return (
    <div lang="en">
      <div className="relative">
        <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-80" />
        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 sm:pt-28">
          <nav aria-label="Equipment encyclopedia" className="no-print no-scrollbar -mx-4 mb-8 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => {
              const active = tab.exact ? path === tab.to : path === tab.to || path.startsWith(`${tab.to}/`);
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
                  {tab.label}
                </Link>
              );
            })}
          </nav>
          <Outlet />
        </div>
      </div>
      <div className="no-print">
        <CtaSection
          title="Log your training with any setup"
          subtitle="Track practice sessions and matches, and see how your game develops after an equipment change. Free, no account needed."
        />
      </div>
    </div>
  );
}
