import { BarChart3, ChevronDown, ChevronLeft, ChevronRight, Plus, Pointer, Settings, Trophy } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type PointerEvent, type ReactNode } from "react";
import { format, localeInfo } from "~/i18n/config";
import type { Messages } from "~/i18n/types";
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

/* ---------- Days ---------- */

// Days are counted from 1 Jan 2026 in UTC, so no time zone can shift one.
const DAY_MS = 86_400_000;
const EPOCH = Date.UTC(2026, 0, 1);
const dateOf = (d: number) => new Date(EPOCH + d * DAY_MS);
const dayIndex = (y: number, m: number, d: number) => Math.round((Date.UTC(y, m, d) - EPOCH) / DAY_MS);
// A fixed "today", so the page prerenders the same screen it hydrates.
const TODAY = dayIndex(2026, 8, 28);
const LAST = dayIndex(2026, 11, 31);
// Week starts Monday like the app default.
const weekStart = (d: number) => d - ((dateOf(d).getUTCDay() + 6) % 7);
const sameMonth = (a: number, b: number) => dateOf(a).getUTCMonth() === dateOf(b).getUTCMonth();

function addMonths(d: number, n: number) {
  const x = dateOf(d);
  const y = x.getUTCFullYear();
  const m = x.getUTCMonth() + n;
  const length = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return dayIndex(y, m, Math.min(x.getUTCDate(), length));
}

const EXPANDED_ROWS = 6;

/** One week, or the six-row grid that always fully contains the month — as `SessionCalendar` does. */
function visibleDays(selection: number, expanded: boolean) {
  const x = dateOf(selection);
  const start = expanded ? weekStart(dayIndex(x.getUTCFullYear(), x.getUTCMonth(), 1)) : weekStart(selection);
  return Array.from({ length: expanded ? EXPANDED_ROWS * 7 : 7 }, (_, i) => start + i);
}

/* ---------- Sessions ---------- */

type Kind = keyof Messages["sessionTypes"];

interface Session {
  id: number;
  day: number;
  kind: Kind;
  minutes: number;
  rpe: number;
  /** Index into `mockup.notes`. */
  note?: number;
  won?: boolean;
}

// core/.../model/BrandColors.kt
const kindClass: Record<Kind, string> = {
  technique: "bg-technique",
  match: "bg-match",
  tournament: "bg-tournament",
  serve: "bg-serve",
  physical: "bg-physical",
  freeplay: "bg-freeplay",
  other: "bg-other",
};
const formKinds: Kind[] = ["technique", "match", "serve", "physical", "freeplay", "tournament", "other"];
const kindWeights: [Kind, number][] = [
  ["technique", 0.34],
  ["match", 0.2],
  ["freeplay", 0.14],
  ["serve", 0.12],
  ["physical", 0.1],
  ["tournament", 0.05],
  ["other", 0.05],
];

const rpeRamp = [
  "#4caf50", "#7fb549", "#a7b941", "#ccbd34", "#eec01f",
  "#ffb517", "#fe9c26", "#fc822e", "#f96533", "#f44336",
];

/** Black or white, whichever clears 4.5:1 on the fill — the app's `Color.ink(on:)`. */
function inkOn(hex: string) {
  const channel = (i: number) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5) > 0.1791 ? "#000" : "#fff";
}

function pickKind(r: number): Kind {
  for (const [kind, weight] of kindWeights) {
    if (r < weight) return kind;
    r -= weight;
  }
  return "other";
}

function seedSessions(): Session[] {
  const out: Session[] = [];
  for (let d = 0; d < TODAY; d++) {
    const r = seeded(d + 101);
    // Training picks up over the year, so the heatmap has a story to tell.
    const chance = 0.3 + (d / TODAY) * 0.28;
    if (r > chance) continue;
    const count = r < chance * 0.15 ? 2 : 1;
    for (let j = 0; j < count; j++) {
      const id = out.length;
      const kind = pickKind(seeded(d * 7 + j * 13 + 3));
      out.push({
        id,
        day: d,
        kind,
        minutes: [45, 60, 60, 75, 90, 90, 120][Math.floor(seeded(d * 5 + j) * 7)],
        rpe: 3 + Math.floor(seeded(d * 11 + j) * 7),
        won: kind === "match" || kind === "tournament" ? seeded(id * 17) > 0.38 : undefined,
      });
    }
  }
  out.push(
    { id: out.length, day: TODAY, kind: "technique", minutes: 90, rpe: 7, note: 0 },
    { id: out.length + 1, day: TODAY, kind: "match", minutes: 60, rpe: 8, note: 1, won: true },
  );
  return out;
}

function minutesFor(sessions: Session[] | undefined) {
  return sessions?.reduce((sum, s) => sum + s.minutes, 0) ?? 0;
}

function heatFor(minutes: number) {
  if (minutes === 0) return 0;
  if (minutes < 60) return 1;
  if (minutes < 90) return 2;
  if (minutes < 120) return 3;
  return 4;
}

type Mockup = Messages["mockup"];

function useFormats() {
  const { locale } = useI18n();
  const tag = localeInfo[locale].hreflang;
  // Western digits everywhere, as the app shows them (Arabic would otherwise default to Arabic-Indic).
  return useMemo(
    () => ({
      month: new Intl.DateTimeFormat(tag, { month: "long", year: "numeric", timeZone: "UTC", numberingSystem: "latn" }),
      weekday: new Intl.DateTimeFormat(tag, { weekday: "long", timeZone: "UTC", numberingSystem: "latn" }),
      full: new Intl.DateTimeFormat(tag, { weekday: "long", month: "long", day: "numeric", timeZone: "UTC", numberingSystem: "latn" }),
    }),
    [tag],
  );
}

const noopSubscribe = () => () => {};

/* ---------- Phone ---------- */

export function PhoneMockup() {
  const { t } = useI18n();
  const m = t.mockup;
  const [touched, setTouched] = useState(false);
  return (
    <div className="relative mx-auto w-[290px] sm:w-[320px]">
      <div
        onPointerDown={() => setTouched(true)}
        className="rounded-[3.2rem] bg-neutral-900 p-3 shadow-[0_40px_80px_-30px_rgb(10_30_60/0.55)] ring-1 ring-black/10 dark:ring-white/10"
      >
        <div className="relative flex h-[580px] flex-col overflow-hidden rounded-[2.6rem] bg-background text-foreground sm:h-[640px]">
          {/* status bar */}
          <div className="flex h-11 shrink-0 items-center justify-between px-7 pt-1 text-[12px] font-semibold">
            <span>9:41</span>
            <span className="absolute top-2.5 left-1/2 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-5 rounded-[3px] border border-current/40 p-px">
                <span className="block h-full w-3/4 rounded-[1px] bg-current" />
              </span>
            </span>
          </div>
          <AppScreen />
          <span className="pointer-events-none absolute bottom-1.5 left-1/2 z-40 h-1 w-24 -translate-x-1/2 rounded-full bg-foreground/80" />
        </div>
      </div>

      {/* Says the phone is live; steps aside once it has been used. */}
      <p
        className={cn(
          "mt-5 flex justify-center transition-opacity duration-500",
          touched && "pointer-events-none opacity-0",
        )}
        aria-hidden={touched}
      >
        <span className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/60 motion-reduce:animate-none" />
            <span className="relative size-2 rounded-full bg-primary" />
          </span>
          {m.tryIt}
          <Pointer className="size-3.5 text-primary" />
        </span>
      </p>

      {/* floating stat cards */}
      <div className="pointer-events-none absolute bottom-40 -start-36 hidden w-44 rounded-2xl border bg-card/95 p-3 shadow-xl backdrop-blur xl:block">
        <p className="text-[11px] font-semibold text-muted-foreground">{m.heatmapLabel}</p>
        <Heatmap weeks={14} cell="size-2" className="mt-2 gap-[2px]" />
        <p className="mt-2 font-display text-sm font-bold">
          {m.heatmapStat} <span className="text-xs font-medium text-muted-foreground">· {m.heatmapHours}</span>
        </p>
      </div>
      <div className="pointer-events-none absolute -top-8 -end-20 hidden items-center gap-3 rounded-2xl border bg-card/95 p-3 pe-4 shadow-xl backdrop-blur xl:flex">
        <span className="flex size-9 items-center justify-center rounded-xl bg-tertiary-container text-tertiary-container-foreground">
          <Trophy className="size-4" />
        </span>
        <div>
          <p className="text-[11px] font-semibold text-muted-foreground">{m.winRate}</p>
          <p className="font-display text-lg leading-tight font-extrabold">
            64% <span dir="ltr" className="text-xs font-semibold text-[#2e7d32] dark:text-win">+8%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

type Tab = "sessions" | "analytics";

/** A small working copy of the iOS app: the Sessions and Analytics tabs over one set of sessions. */
function AppScreen() {
  const { t } = useI18n();
  const m = t.mockup;
  const [tab, setTab] = useState<Tab>("sessions");
  const [sessions, setSessions] = useState(seedSessions);
  const [adding, setAdding] = useState(false);
  const [topDay, setTopDay] = useState(TODAY);
  const [fresh, setFresh] = useState<number | null>(null);

  const byDay = useMemo(() => {
    const map = new Map<number, Session[]>();
    for (const s of sessions) map.set(s.day, [...(map.get(s.day) ?? []), s]);
    return map;
  }, [sessions]);

  const save = (s: Omit<Session, "id" | "day">) => {
    const id = sessions.length;
    setSessions([...sessions, { ...s, id, day: topDay, won: s.kind === "match" || s.kind === "tournament" ? true : undefined }]);
    setFresh(id);
    setAdding(false);
  };

  return (
    <div className="relative min-h-0 flex-1">
      {tab === "sessions" ? (
        <SessionsScreen byDay={byDay} topDay={topDay} setTopDay={setTopDay} fresh={fresh} m={m} />
      ) : (
        <AnalyticsScreen sessions={sessions} byDay={byDay} m={m} />
      )}

      {tab === "sessions" && (
        <button
          type="button"
          onClick={() => setAdding(true)}
          aria-label={m.addSession}
          className="absolute end-3.5 bottom-[4.6rem] z-20 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="size-6" strokeWidth={2.5} />
        </button>
      )}

      {/* iOS 26 floating tab bar */}
      <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center">
        <div className="flex gap-0.5 rounded-full bg-card/85 p-1 shadow-lg ring-1 ring-border/70 backdrop-blur-xl">
          {(["sessions", "analytics"] as const).map((key, i) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              aria-pressed={tab === key}
              className={cn(
                "flex min-w-[4.6rem] flex-col items-center gap-0.5 rounded-full px-3 py-1 text-[9px] font-semibold transition-colors",
                tab === key ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {key === "sessions" ? <PaddleIcon className="size-4" /> : <BarChart3 className="size-4" />}
              {m.tabs[i]}
            </button>
          ))}
        </div>
      </div>

      {adding && <AddSessionSheet day={topDay} onCancel={() => setAdding(false)} onSave={save} m={m} />}
    </div>
  );
}

function PaddleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="14" cy="10" r="6.5" />
      <path d="M9.6 13.1l1.6 1.6-5.4 5.4a1.15 1.15 0 0 1-1.6-1.6z" />
      <circle cx="5" cy="5.5" r="2" />
    </svg>
  );
}

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-foreground" aria-hidden="true">
      {children}
    </span>
  );
}

/* ---------- Sessions tab ---------- */

function SessionsScreen({
  byDay,
  topDay,
  setTopDay,
  fresh,
  m,
}: {
  byDay: Map<number, Session[]>;
  topDay: number;
  setTopDay: (d: number) => void;
  fresh: number | null;
  m: Mockup;
}) {
  const { t } = useI18n();
  const fmt = useFormats();
  const [expanded, setExpanded] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  // The prerender starts the list at today, so it shows today at the top without any script;
  // the past is put above it once hydrated, in a layout effect, before anything is painted.
  const listStart = useSyncExternalStore(noopSubscribe, () => 0, () => TODAY);
  const listRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef(new Map<number, HTMLElement>());
  const ignoreScroll = useRef(false);
  const frame = useRef(0);

  const scrollTo = (day: number) => {
    const list = listRef.current;
    const el = sectionRefs.current.get(day);
    if (!list || !el) return;
    if (Math.abs(list.scrollTop - el.offsetTop) < 1) return;
    // The list reports where it is, and a deliberate move must not be reported back mid-way.
    ignoreScroll.current = true;
    list.scrollTop = el.offsetTop;
  };

  useLayoutEffect(() => {
    // Nothing can have moved the list yet: it starts out on today.
    if (listStart === 0) scrollTo(TODAY);
  }, [listStart]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const select = (day: number) => {
    const clamped = Math.min(LAST, Math.max(0, day));
    setTopDay(clamped);
    scrollTo(clamped);
  };

  // Like the app, scrolling the list moves the calendar's selection, never the other way round.
  const onScroll = () => {
    if (ignoreScroll.current) {
      ignoreScroll.current = false;
      return;
    }
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const list = listRef.current;
      if (!list) return;
      const top = list.scrollTop + 1;
      let lo = listStart;
      let hi = LAST;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        const el = sectionRefs.current.get(mid);
        if (el && el.offsetTop + el.offsetHeight > top) hi = mid;
        else lo = mid + 1;
      }
      setTopDay(lo);
    });
  };

  const days = Array.from({ length: LAST - listStart + 1 }, (_, i) => listStart + i);

  return (
    <div className="flex h-full flex-col">
      <div className="grid h-9 shrink-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-3">
        <span />
        <p className="text-[13px] font-semibold">{m.tabs[0]}</p>
        <div className="flex items-center justify-end gap-1.5">
          {topDay !== TODAY && (
            <button
              type="button"
              onClick={() => select(TODAY)}
              className="animate-in rounded-full bg-secondary px-2 py-1 text-[10px] font-semibold text-primary fade-in"
            >
              {m.today}
            </button>
          )}
          <NavIcon>
            <Settings className="size-3.5" />
          </NavIcon>
        </div>
      </div>

      <Calendar
        selection={topDay}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        onSelect={select}
        byDay={byDay}
        m={m}
      />

      <div ref={listRef} onScroll={onScroll} className="no-scrollbar relative min-h-0 flex-1 overflow-y-auto pb-32">
        {days.map((day) => {
          const list = byDay.get(day);
          return (
            <section
              key={day}
              ref={(el) => {
                if (el) sectionRefs.current.set(day, el);
                else sectionRefs.current.delete(day);
              }}
            >
              <DayHeader day={day} m={m} weekday={fmt.weekday} />
              {list ? (
                list.map((s) => (
                  <div key={s.id} className={cn("px-3 py-1", s.id === fresh && "animate-in fade-in slide-in-from-top-2 duration-300")}>
                    <SessionRow
                      session={s}
                      title={t.sessionTypes[s.kind]}
                      duration={format(m.minutes, { n: s.minutes })}
                      note={s.note === undefined ? undefined : m.notes[s.note]}
                      selected={selectedId === s.id}
                      onClick={() => setSelectedId(selectedId === s.id ? null : s.id)}
                    />
                  </div>
                ))
              ) : (
                <p className="px-4 py-2.5 text-[11px] text-muted-foreground/60">{m.noSessions}</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

const ROW = 34;

function Calendar({
  selection,
  expanded,
  onToggle,
  onSelect,
  byDay,
  m,
}: {
  selection: number;
  expanded: boolean;
  onToggle: () => void;
  onSelect: (d: number) => void;
  byDay: Map<number, Session[]>;
  m: Mockup;
}) {
  const fmt = useFormats();
  const drag = useRef<{ x: number; y: number } | null>(null);
  const step = (n: number) => (expanded ? addMonths(selection, n) : selection + n * 7);
  const canStep = (n: number) => {
    const to = step(n);
    return to >= 0 && to <= LAST;
  };
  const page = (n: number) => canStep(n) && onSelect(step(n));

  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: PointerEvent) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current = null;
    // Swiping towards the start of the line moves forward, which is leftwards only in left-to-right pages.
    const forward = getComputedStyle(e.currentTarget).direction === "rtl" ? dx > 0 : dx < 0;
    if (Math.abs(dx) > 24 && Math.abs(dx) > Math.abs(dy)) page(forward ? 1 : -1);
  };

  return (
    <div
      className="shrink-0 touch-pan-y border-b bg-surface-low px-2 pb-1.5 select-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="flex items-center justify-between py-1">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-1 rounded-lg px-1.5 py-1 font-display text-[14px] font-bold tracking-tight whitespace-nowrap hover:bg-secondary"
        >
          <span suppressHydrationWarning>{fmt.month.format(dateOf(selection))}</span>
          <ChevronDown className={cn("size-3.5 transition-transform duration-300", expanded && "rotate-180")} strokeWidth={3} />
        </button>
        <div className="flex">
          {[-1, 1].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => page(n)}
              disabled={!canStep(n)}
              aria-label={fmt.month.format(dateOf(step(n)))}
              className="flex size-7 items-center justify-center rounded-full text-primary hover:bg-secondary disabled:opacity-30"
            >
              {n < 0 ? <ChevronLeft className="size-4 rtl:rotate-180" /> : <ChevronRight className="size-4 rtl:rotate-180" />}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-[9px] font-medium text-muted-foreground">
        {m.weekdays.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div
        className="grid grid-cols-7 overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{ height: ROW * (expanded ? EXPANDED_ROWS : 1) }}
      >
        {visibleDays(selection, expanded).map((day) => {
          const inRange = day >= 0 && day <= LAST;
          const selected = day === selection;
          const today = day === TODAY;
          const list = byDay.get(day) ?? [];
          return (
            <button
              key={day}
              type="button"
              disabled={!inRange}
              onClick={() => onSelect(day)}
              aria-pressed={selected}
              className={cn(
                "group flex flex-col items-center gap-[3px] pt-0.5",
                (!inRange || (expanded && !sameMonth(day, selection))) && "opacity-35",
              )}
              style={{ height: ROW }}
            >
              <span
                className={cn(
                  "flex size-[25px] items-center justify-center rounded-full text-[11.5px] tabular-nums transition-colors",
                  selected && today && "bg-primary font-bold text-primary-foreground",
                  selected && !today && "bg-primary/20",
                  !selected && today && "font-bold text-primary ring-[1.5px] ring-primary ring-inset",
                  !selected && "group-enabled:group-hover:bg-secondary",
                )}
              >
                {dateOf(day).getUTCDate()}
              </span>
              <span className="flex h-1 gap-[2px]">
                {list.slice(0, 4).map((s) => (
                  <span key={s.id} className={cn("size-1 rounded-full ring-[0.5px] ring-foreground/20", kindClass[s.kind])} />
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DayHeader({ day, m, weekday }: { day: number; m: Mockup; weekday: Intl.DateTimeFormat }) {
  const today = day === TODAY;
  const diff = day - TODAY;
  const caption =
    diff === 0 ? m.today : diff === 1 ? m.tomorrow : diff === -1 ? m.yesterday : weekday.format(dateOf(day));
  return (
    <div className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/95 px-3.5 py-1.5 backdrop-blur">
      <span
        className={cn(
          "flex size-6 items-center justify-center rounded-md text-[11px] font-bold tabular-nums",
          today ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
        )}
      >
        {dateOf(day).getUTCDate()}
      </span>
      <span
        suppressHydrationWarning
        className={cn("text-[11px]", today ? "font-semibold text-primary" : "text-muted-foreground")}
      >
        {caption}
      </span>
    </div>
  );
}

function SessionRow({
  session,
  title,
  duration,
  note,
  selected,
  onClick,
}: {
  session: Session;
  title: string;
  duration: string;
  note?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-xl p-2.5 text-left shadow-sm ring-1 ring-border/60 transition-colors",
        selected ? "bg-primary/15" : "bg-card hover:bg-secondary/60",
      )}
    >
      <span className={cn("h-8 w-1 shrink-0 rounded-full", kindClass[session.kind])} />
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-semibold">{title}</span>
        <span className="block text-[10px] text-muted-foreground">{duration}</span>
        {note && <span className="block truncate text-[10px] text-muted-foreground">{note}</span>}
      </span>
      <RpeBadge rpe={session.rpe} />
    </button>
  );
}

function RpeBadge({ rpe }: { rpe: number }) {
  const fill = rpeRamp[rpe - 1];
  return (
    <span
      className="flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
      style={{ backgroundColor: fill, color: inkOn(fill) }}
    >
      {rpe}
    </span>
  );
}

function AddSessionSheet({
  day,
  onCancel,
  onSave,
  m,
}: {
  day: number;
  onCancel: () => void;
  onSave: (s: Omit<Session, "id" | "day">) => void;
  m: Mockup;
}) {
  const { t } = useI18n();
  const fmt = useFormats();
  const [kind, setKind] = useState<Kind>("technique");
  const [minutes, setMinutes] = useState(60);
  const [rpe, setRpe] = useState(5);
  const rpeColor = rpeRamp[rpe - 1];
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <button type="button" aria-label={m.cancel} onClick={onCancel} className="absolute inset-0 animate-in bg-black/30 fade-in" />
      <div className="relative animate-in rounded-t-[1.6rem] bg-surface-low px-4 pt-3 pb-8 shadow-2xl duration-300 slide-in-from-bottom">
        <span className="mx-auto block h-1 w-9 rounded-full bg-foreground/20" />
        <div className="mt-2 flex items-center justify-between text-[12px]">
          <button type="button" onClick={onCancel} className="rounded-full px-2 py-1 text-primary hover:bg-secondary">
            {m.cancel}
          </button>
          <p className="font-semibold">{m.addSession}</p>
          <button
            type="button"
            onClick={() => onSave({ kind, minutes, rpe })}
            className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {m.save}
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground" suppressHydrationWarning>
          {fmt.full.format(dateOf(day))}
        </p>

        <div className="mt-3 rounded-xl bg-card p-3 ring-1 ring-border/60">
          <div className="flex items-baseline justify-between">
            <p className="text-[11px] font-medium">{m.duration}</p>
            <p className="font-display text-[14px] font-bold text-primary">{format(m.minutes, { n: minutes })}</p>
          </div>
          <input
            type="range"
            min={10}
            max={180}
            step={5}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            aria-label={m.duration}
            className="mt-1 w-full accent-primary"
          />

          <p className="mt-2 text-[11px] font-medium">{m.sessionType}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {formKinds.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                aria-pressed={kind === k}
                className={cn(
                  "flex items-center gap-1 rounded-lg border px-2 py-1 text-[10px] font-medium transition-colors",
                  kind === k ? "border-transparent bg-accent text-accent-foreground" : "hover:bg-secondary",
                )}
              >
                <span className={cn("size-1.5 rounded-full", kindClass[k])} />
                {t.sessionTypes[k]}
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <p className="text-[11px] font-medium">{m.intensity}</p>
            <p className="font-display text-[14px] font-bold" style={{ color: rpeColor }}>
              {rpe}
            </p>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={rpe}
            onChange={(e) => setRpe(Number(e.target.value))}
            aria-label={m.intensity}
            className="mt-1 w-full"
            style={{ accentColor: rpeColor }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Analytics tab ---------- */

const HEATMAP_WEEKS = 16;
const CHART_WEEKS = 8;

function AnalyticsScreen({ sessions, byDay, m }: { sessions: Session[]; byDay: Map<number, Session[]>; m: Mockup }) {
  const totalMinutes = minutesFor(sessions);
  const won = sessions.filter((s) => s.won === true).length;
  const lost = sessions.filter((s) => s.won === false).length;
  const rate = won + lost ? won / (won + lost) : null;

  const thisWeek = weekStart(TODAY);
  const weekly = Array.from({ length: CHART_WEEKS }, (_, i) => {
    const start = thisWeek - (CHART_WEEKS - 1 - i) * 7;
    return Array.from({ length: 7 }, (_, d) => minutesFor(byDay.get(start + d))).reduce((a, b) => a + b, 0);
  });
  const maxWeek = Math.max(...weekly, 1);
  const heatStart = thisWeek - (HEATMAP_WEEKS - 1) * 7;

  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-surface-low pb-24">
      <div className="flex h-9 items-center justify-end px-3">
        <NavIcon>
          <Settings className="size-3.5" />
        </NavIcon>
      </div>
      <p className="px-4 font-display text-[22px] font-bold tracking-tight">{m.tabs[1]}</p>

      <SectionTitle>{m.summary}</SectionTitle>
      <div className="grid grid-cols-2 gap-2 px-3">
        <StatTile emoji="🏓" value={String(sessions.length)} label={m.totalSessions} />
        <StatTile emoji="⏱️" value={format(m.hours, { n: Math.round(totalMinutes / 60) })} label={m.totalTime} />
        <StatTile emoji="🏆" value={`${won}–${lost}`} label={m.winLoss} />
        <StatTile
          emoji="📈"
          value={rate === null ? "—" : `${Math.round(rate * 100)}%`}
          label={m.winRate}
          className={rate === null ? undefined : rate >= 0.5 ? "text-[#2e7d32] dark:text-win" : "text-[#c62828] dark:text-loss"}
        />
      </div>

      <SectionTitle>{m.weeklyTraining}</SectionTitle>
      <div className="mx-3 rounded-xl bg-card p-3 ring-1 ring-border/60">
        <p className="font-display text-[15px] font-bold">{format(m.minutes, { n: weekly[CHART_WEEKS - 1] })}</p>
        <div className="mt-2 flex h-20 items-end gap-1.5">
          {weekly.map((v, i) => (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-t-[4px] transition-[height] duration-500",
                i === CHART_WEEKS - 1 ? "bg-primary" : "bg-primary/35",
              )}
              style={{ height: `${Math.max(4, (v / maxWeek) * 100)}%` }}
            />
          ))}
        </div>
      </div>

      <SectionTitle>{m.heatmapTitle}</SectionTitle>
      <div className="mx-3 rounded-xl bg-card p-3 ring-1 ring-border/60">
        <div className="grid grid-flow-col grid-rows-7 justify-between gap-[3px]">
          {Array.from({ length: HEATMAP_WEEKS * 7 }, (_, i) => {
            const day = heatStart + i;
            return (
              <span
                key={day}
                className={cn(
                  "size-[11px] rounded-[3px] transition-colors",
                  day > TODAY ? "bg-transparent" : heatClasses[heatFor(minutesFor(byDay.get(day)))],
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <p className="mt-4 mb-1.5 px-4 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">{children}</p>;
}

function StatTile({ emoji, value, label, className }: { emoji: string; value: string; label: string; className?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl bg-card py-2.5 ring-1 ring-border/60">
      <span className="text-[13px]" aria-hidden="true">
        {emoji}
      </span>
      <span className={cn("font-display text-[15px] font-bold tabular-nums", className)}>{value}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
