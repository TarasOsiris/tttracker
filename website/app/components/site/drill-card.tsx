import { ArrowRight, Clock, ListChecks } from "lucide-react";
import { Link } from "react-router";
import { type Drill, drillCount, totalMinutes } from "~/content/drills";

export function DrillCard({ drill }: { drill: Drill }) {
  return (
    <Link
      to={`/drills/${drill.slug}`}
      className="group flex flex-col rounded-3xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-2xl">{drill.emoji}</span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">{drill.level}</span>
      </div>
      <h3 className="mt-5 text-lg font-bold tracking-tight">{drill.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{drill.short}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {totalMinutes(drill)} min
          </span>
          <span className="flex items-center gap-1">
            <ListChecks className="size-3.5" /> {drillCount(drill)} drills
          </span>
        </span>
        <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
