import type { loader as rootLoader } from "~/root";

type RootData = Awaited<ReturnType<typeof rootLoader>>;

/** UI strings from the root loader, for `meta` functions (which can't use hooks). */
export function rootT(matches: readonly ({ id: string; data?: unknown } | undefined)[]): RootData["t"] {
  const root = matches.find((m) => m?.id === "root")?.data as RootData | undefined;
  if (!root) throw new Error("Root loader data missing");
  return root.t;
}
