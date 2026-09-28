import { Check, RotateCcw } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";
import { Button } from "~/components/ui/button";
import { type Drill, drillCount, totalMinutes } from "~/content/drills";
import { cn } from "~/lib/utils";

const storageKey = (slug: string) => `drill-progress:${slug}`;
// Keyed by content, not position, so edits to a plan never tick the wrong step.
const itemId = (block: string, item: string) => `${block}/${item}`;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function read(slug: string) {
  try {
    return localStorage.getItem(storageKey(slug)) ?? "[]";
  } catch {
    return "[]";
  }
}

function write(slug: string, ids: Set<string>) {
  try {
    localStorage.setItem(storageKey(slug), JSON.stringify([...ids]));
  } catch {
    // storage unavailable — progress just won't survive a reload
  }
  listeners.forEach((l) => l());
}

export function DrillChecklist({ drill }: { drill: Drill }) {
  // Server snapshot is empty, so prerendered HTML and hydration agree.
  const raw = useSyncExternalStore(subscribe, () => read(drill.slug), () => "[]");
  const done = useMemo(() => {
    const valid = new Set(drill.blocks.flatMap((b) => b.items.map((it) => itemId(b.title, it.name))));
    try {
      return new Set((JSON.parse(raw) as string[]).filter((id) => valid.has(id)));
    } catch {
      return new Set<string>();
    }
  }, [raw, drill]);
  const update = (next: Set<string>) => write(drill.slug, next);

  const toggle = (id: string) => {
    const next = new Set(done);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    update(next);
  };

  const total = drillCount(drill);
  const minutesLeft =
    totalMinutes(drill) -
    drill.blocks.reduce(
      (sum, b) => sum + b.items.reduce((s, it) => s + (done.has(itemId(b.title, it.name)) ? it.minutes : 0), 0),
      0,
    );
  const complete = done.size === total;

  return (
    <>
      <div className="no-print sticky top-16 z-10 mt-10 rounded-3xl border bg-card/90 p-4 shadow-sm backdrop-blur-xl sm:px-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="font-medium" aria-live="polite">
            {complete ? (
              <span className="text-primary">Session complete. Nice work! 🏓</span>
            ) : (
              <>
                <span className="font-display font-bold tabular-nums">
                  {done.size}/{total}
                </span>{" "}
                done · <span className="tabular-nums">{minutesLeft}</span> min left
              </>
            )}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-muted-foreground"
            onClick={() => update(new Set())}
            disabled={done.size === 0}
          >
            <RotateCcw /> Reset
          </Button>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${(done.size / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-8 space-y-10">
        {drill.blocks.map((b) => (
          <section key={b.title}>
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold tracking-tight">{b.title}</h2>
              <span className="text-sm text-muted-foreground">{b.items.reduce((s, i) => s + i.minutes, 0)} min</span>
            </div>
            <ul className="mt-3 divide-y overflow-hidden rounded-3xl border bg-card">
              {b.items.map((it) => {
                const id = itemId(b.title, it.name);
                const checked = done.has(id);
                return (
                  <li key={it.name}>
                    <label className="flex cursor-pointer items-start gap-4 px-5 py-4 transition-colors hover:bg-secondary/50">
                      <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(id)} />
                      <span
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 border-input transition-colors peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50",
                          checked && "border-primary bg-primary text-primary-foreground",
                        )}
                        aria-hidden="true"
                      >
                        {checked && <Check className="size-3.5" strokeWidth={3} />}
                      </span>
                      <span className="flex-1">
                        <span className={cn("block font-medium transition-colors", checked && "text-muted-foreground line-through")}>
                          {it.name}
                        </span>
                        {it.note && <span className="mt-0.5 block text-sm text-muted-foreground">{it.note}</span>}
                      </span>
                      <span className="shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-sm font-semibold text-accent-foreground tabular-nums">
                        {it.minutes}′
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
