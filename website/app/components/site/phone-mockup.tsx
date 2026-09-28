import { BarChart3, CalendarDays, ChevronLeft, ChevronRight, Plus, Settings, Trophy } from "lucide-react";
import { useI18n } from "~/i18n/use-i18n";
import { cn } from "~/lib/utils";

// Deterministic "random" so prerendered HTML matches hydration.
const seeded = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const heatClasses = ["bg-heat-0", "bg-primary/25", "bg-primary/50", "bg-primary/75", "bg-primary"];

export function heatLevel(i: number, bias = 0) {
  const r = seeded(i) + bias;
  if (r < 0.35) return 0;
  if (r < 0.55) return 1;
  if (r < 0.75) return 2;
  if (r < 0.9) return 3;
  return 4;
}

export function Heatmap({ weeks = 20, className, cell = "size-2.5" }: { weeks?: number; className?: string; cell?: string }) {
  return (
    <div className={cn("grid grid-flow-col grid-rows-7 gap-[3px]", className)} aria-hidden="true">
      {Array.from({ length: weeks * 7 }, (_, i) => (
        <span key={i} className={cn("rounded-[3px]", cell, heatClasses[heatLevel(i, i / (weeks * 7) / 4)])} />
      ))}
    </div>
  );
}

// September 2026 starts on a Tuesday; week starts Monday like the app default.
const OFFSET = 1;
const DAYS = 30;
const TODAY = 28;
const sessionDays: Record<number, number> = { 1: 1, 3: 2, 5: 1, 8: 1, 10: 3, 12: 1, 15: 2, 17: 1, 19: 2, 22: 1, 24: 2, 26: 1, 28: 2 };

export function PhoneMockup() {
  const { t } = useI18n();
  const m = t.mockup;
  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      <div className="rounded-[3.2rem] bg-neutral-900 p-3 shadow-[0_40px_80px_-30px_rgb(10_30_60/0.55)] ring-1 ring-black/10 dark:ring-white/10">
        <div className="relative overflow-hidden rounded-[2.6rem] bg-background text-foreground">
          {/* status bar */}
          <div className="flex h-11 items-center justify-between px-7 pt-1 text-[12px] font-semibold">
            <span>9:41</span>
            <span className="absolute top-2.5 left-1/2 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-5 rounded-[3px] border border-current/40 p-px">
                <span className="block h-full w-3/4 rounded-[1px] bg-current" />
              </span>
            </span>
          </div>

          <div className="px-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ChevronLeft className="size-4 text-muted-foreground" />
                <p className="font-display text-[15px] font-bold tracking-tight whitespace-nowrap">{m.month}</p>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
              <div className="hidden rounded-full bg-secondary p-0.5 text-[10px] font-semibold sm:flex">
                <span className="rounded-full px-2 py-0.5 text-muted-foreground">{m.week}</span>
                <span className="rounded-full bg-primary px-2 py-0.5 text-primary-foreground">{m.monthToggle}</span>
              </div>
            </div>

            {/* calendar */}
            <div className="mt-3 rounded-2xl bg-accent/60 p-2 dark:bg-accent/40">
              <div className="grid grid-cols-7 text-center text-[9px] font-medium text-muted-foreground">
                {m.weekdays.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-y-0.5 text-center text-[11px]">
                {Array.from({ length: OFFSET }, (_, i) => (
                  <span key={`e${i}`} />
                ))}
                {Array.from({ length: DAYS }, (_, i) => {
                  const day = i + 1;
                  const dots = sessionDays[day] ?? 0;
                  const today = day === TODAY;
                  return (
                    <span key={day} className="flex flex-col items-center">
                      <span
                        className={cn(
                          "flex size-6 items-center justify-center rounded-full",
                          today && "bg-primary font-bold text-primary-foreground",
                        )}
                      >
                        {day}
                      </span>
                      <span className="flex h-1 gap-[2px]">
                        {Array.from({ length: dots }, (_, j) => (
                          <span key={j} className="size-1 rounded-full bg-primary" />
                        ))}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* day list */}
            <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold">
              <span className="flex size-5 items-center justify-center rounded-md bg-secondary text-[10px]">28</span>
              {m.today}
            </div>
            <div className="mt-2 space-y-2">
              <SessionRow color="bg-technique" title={t.sessionTypes.technique} meta={m.techniqueMeta} rpe={7} />
              <div className="rounded-xl bg-card p-2.5 shadow-sm ring-1 ring-border/60">
                <div className="flex items-center gap-2.5">
                  <span className="h-8 w-1 rounded-full bg-match" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold">{t.sessionTypes.match}</p>
                    <p className="truncate text-[10px] text-muted-foreground">{m.matchMeta}</p>
                  </div>
                  <span className="rounded-full bg-win/15 px-2 py-0.5 text-[10px] font-bold text-[#2e7d32] dark:text-win">
                    {m.win} 3–1
                  </span>
                </div>
                <div className="mt-1.5 ml-3.5 flex gap-1 text-[9px] font-medium text-muted-foreground tabular-nums">
                  {["11–7", "9–11", "11–8", "11–6"].map((g) => (
                    <span key={g} className="rounded bg-secondary px-1.5 py-0.5">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAB + bottom nav */}
          <span className="absolute right-4 bottom-16 flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg">
            <Plus className="size-5" />
          </span>
          <div className="grid grid-cols-3 border-t bg-surface-low pt-2 pb-4 text-center text-[9px] font-medium text-muted-foreground">
            <span className="flex flex-col items-center gap-0.5 text-foreground">
              <span className="rounded-full bg-accent px-3 py-0.5 text-accent-foreground">
                <CalendarDays className="size-3.5" />
              </span>
              {m.tabs[0]}
            </span>
            <span className="flex flex-col items-center gap-0.5 pt-0.5">
              <BarChart3 className="size-3.5" />
              {m.tabs[1]}
            </span>
            <span className="flex flex-col items-center gap-0.5 pt-0.5">
              <Settings className="size-3.5" />
              {m.tabs[2]}
            </span>
          </div>
        </div>
      </div>

      {/* floating stat cards */}
      <div className="absolute bottom-28 -left-36 hidden w-44 rounded-2xl border bg-card/95 p-3 shadow-xl backdrop-blur xl:block">
        <p className="text-[11px] font-semibold text-muted-foreground">{m.heatmapLabel}</p>
        <Heatmap weeks={14} cell="size-2" className="mt-2 gap-[2px]" />
        <p className="mt-2 font-display text-sm font-bold">
          {m.heatmapStat} <span className="text-xs font-medium text-muted-foreground">· {m.heatmapHours}</span>
        </p>
      </div>
      <div className="absolute -top-8 -right-20 hidden items-center gap-3 rounded-2xl border bg-card/95 p-3 pr-4 shadow-xl backdrop-blur xl:flex">
        <span className="flex size-9 items-center justify-center rounded-xl bg-tertiary-container text-tertiary-container-foreground">
          <Trophy className="size-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground">{m.winRate}</p>
          <p className="font-display text-lg leading-tight font-extrabold">
            64% <span className="text-xs font-semibold text-[#2e7d32] dark:text-win">+8%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function SessionRow({ color, title, meta, rpe }: { color: string; title: string; meta: string; rpe: number }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-card p-2.5 shadow-sm ring-1 ring-border/60">
      <span className={cn("h-8 w-1 rounded-full", color)} />
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold">{title}</p>
        <p className="truncate text-[10px] text-muted-foreground">{meta}</p>
      </div>
      <span className="flex size-6 items-center justify-center rounded-full bg-[#fc822e]/15 text-[10px] font-bold text-[#c2560d] dark:text-[#fe9c26]">
        {rpe}
      </span>
    </div>
  );
}
