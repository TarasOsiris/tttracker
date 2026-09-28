import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * `false` during the prerender and the hydration render, `true` afterwards.
 * Gates anything that reads browser-only state (URL query, localStorage) so the
 * first client render matches the prerendered HTML exactly.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
