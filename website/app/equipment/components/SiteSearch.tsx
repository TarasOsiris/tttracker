// Type-ahead search over every blade, rubber, player, brand and guide, for the encyclopedia hub.
import { Search } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { SearchEntry } from "../store.server";
import { cn } from "~/lib/utils";

const normalise = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export function SiteSearch({ entries }: { entries: SearchEntry[] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const navigate = useNavigate();
  const listId = useId();
  const indexed = useMemo(() => entries.map((e) => ({ ...e, key: normalise(e.label) })), [entries]);
  const results = useMemo(() => {
    const words = normalise(q).split(" ").filter(Boolean);
    if (!words.length) return [];
    // Every word must match; a word matching the start of a name word ranks higher, then shorter names.
    const atWord = (key: string) => Number(` ${key}`.includes(` ${words[0]}`));
    return indexed
      .filter((e) => words.every((w) => e.key.includes(w)))
      .sort((a, b) => atWord(b.key) - atWord(a.key) || a.label.length - b.label.length)
      .slice(0, 8);
  }, [indexed, q]);

  const go = (href: string) => {
    setOpen(false);
    setQ("");
    navigate(href);
  };

  return (
    <div className="relative max-w-2xl">
      <Search className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-activedescendant={results[cursor] ? `${listId}-${cursor}` : undefined}
        aria-label="Search blades, rubbers, players, brands and guides"
        placeholder="Search Viscaria, Hurricane 3, Wang Chuqin…"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setCursor(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setCursor((c) => Math.min(c + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setCursor((c) => Math.max(c - 1, 0));
          } else if (e.key === "Enter" && results[cursor]) {
            e.preventDefault();
            go(results[cursor].href);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className="h-14 w-full rounded-full border bg-card ps-12 pe-5 text-base shadow-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/50 focus:outline-none"
      />
      {open && q.trim() && (
        <ul id={listId} role="listbox" className="absolute z-30 mt-2 w-full overflow-hidden rounded-3xl border bg-popover p-1.5 shadow-xl">
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted-foreground">No matches. Try a brand or a shorter name.</li>
          ) : (
            results.map((r, i) => (
              <li key={r.href} id={`${listId}-${i}`} role="option" aria-selected={i === cursor}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(r.href)}
                  className={cn("flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-start", i === cursor && "bg-secondary")}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
                    {r.image ? (
                      <img src={r.image} alt="" className={cn("size-full", r.kind === "Player" ? "object-cover object-top" : "object-contain p-0.5")} />
                    ) : (
                      <Search className="size-4 text-muted-foreground" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{r.label}</span>
                  <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">{r.kind}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
