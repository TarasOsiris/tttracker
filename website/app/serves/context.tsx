import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocale } from "~/i18n/use-i18n";
import type { Language } from "./i18n/types";
import type { EnrichedServe, Motion, SpinProfile, Bounce, Placement, Speed, Trajectory, Toss, Deception, TacticalPurpose, Serve } from "./models";
import type { ServesPayload } from "./store.server";
import { enrichServe, type DataStore } from "./utils/enrich";

interface DataContextValue {
  store: DataStore;
  serves: Serve[];
  enrichedServes: EnrichedServe[];
  enrichedServesMap: Map<string, EnrichedServe>;
  motions: Motion[];
  spins: SpinProfile[];
  bounces: Bounce[];
  placements: Placement[];
  speeds: Speed[];
  trajectories: Trajectory[];
  tosses: Toss[];
  deceptions: Deception[];
  tacticalPurposes: TacticalPurpose[];
}

interface ServesContextValue {
  data: DataContextValue;
  dict: Record<string, string>;
}

const ServesContext = createContext<ServesContextValue | null>(null);

const buildMap = <T extends { id: string }>(items: T[]) => new Map(items.map((item) => [item.id, item]));

/** Turns the loader's translated, normalized payload into the lookup maps and enriched serves the pages use. */
export function ServesProvider({ payload, children }: { payload: ServesPayload; children: ReactNode }) {
  const value = useMemo<ServesContextValue>(() => {
    const d = payload.data;
    const store: DataStore = {
      motions: buildMap(d.motions),
      spins: buildMap(d.spins),
      bounces: buildMap(d.bounces),
      placements: buildMap(d.placements),
      speeds: buildMap(d.speeds),
      trajectories: buildMap(d.trajectories),
      tosses: buildMap(d.tosses),
      deceptions: buildMap(d.deceptions),
      tacticalPurposes: buildMap(d.tacticalPurposes),
    };
    const enrichedServes = d.serves.map((s) => enrichServe(s, store));
    return {
      dict: payload.dict,
      data: {
        store,
        ...d,
        enrichedServes,
        enrichedServesMap: new Map(enrichedServes.map((s) => [s.id, s])),
      },
    };
  }, [payload]);

  return <ServesContext.Provider value={value}>{children}</ServesContext.Provider>;
}

function useServesContext() {
  const ctx = useContext(ServesContext);
  if (!ctx) throw new Error("Serves pages must render inside ServesProvider");
  return ctx;
}

export function useDataStore(): DataContextValue {
  return useServesContext().data;
}

export function useEnrichedServes(): EnrichedServe[] {
  return useServesContext().data.enrichedServes;
}

/** Same shape as TT Serves' LanguageProvider hook: `language` plus `t(key, vars)`. */
export function useLanguage(): { language: Language; t: (key: string, vars?: Record<string, string | number>) => string } {
  const { dict } = useServesContext();
  const language = useLocale();
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let str = dict[key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) str = str.replaceAll(`{${k}}`, String(v));
      return str;
    },
    [dict],
  );
  return { language, t };
}
