import { ArrowRight, Clock, ListChecks } from "lucide-react";
import { Link } from "react-router";
import { format } from "~/i18n/config";
import type { DrillSummary } from "~/i18n/types";
import { useI18n } from "~/i18n/use-i18n";

export function DrillCard({ drill }: { drill: DrillSummary }) {
  const { t, href } = useI18n();
  return (
    <Link
      to={href(`/drills/${drill.slug}`)}
      className="group flex flex-col rounded-3xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-2xl">{drill.emoji}</span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {t.drillsPage.levels[drill.level]}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold tracking-tight">{drill.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{drill.short}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {format(t.drillsPage.minutes, { n: drill.minutes })}
          </span>
          <span className="flex items-center gap-1">
            <ListChecks className="size-3.5" /> {format(t.drillsPage.drillCount, { n: drill.count })}
          </span>
        </span>
        <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
