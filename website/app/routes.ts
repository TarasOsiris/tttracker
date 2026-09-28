import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { defaultLocale, locales } from "./i18n/config";

// English lives at the root; every other locale gets a /{code} prefix with the same route modules.
const localized = locales
  .filter((l) => l !== defaultLocale)
  .flatMap((l) => [
    route(l, "routes/home.tsx", { id: `${l}/home` }),
    route(`${l}/drills`, "routes/drills.tsx", { id: `${l}/drills` }),
    route(`${l}/drills/:slug`, "routes/drill.tsx", { id: `${l}/drill` }),
  ]);

export default [
  index("routes/home.tsx"),
  route("drills", "routes/drills.tsx"),
  route("drills/:slug", "routes/drill.tsx"),
  ...localized,
] satisfies RouteConfig;
