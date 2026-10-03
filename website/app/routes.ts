import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { defaultLocale, type Locale, locales } from "./i18n/config";

// Serve encyclopedia (migrated from TT Serves): same paths as the old site, so its URLs redirect 1:1.
const servesPages: [path: string, file: string][] = [
  ["serves", "ServeExplorer"],
  ["serves/:serveId", "ServeDetail"],
  ["motions", "MotionList"],
  ["motions/:motionId", "MotionDetail"],
  ["spins", "SpinEncyclopedia"],
  ["rules", "Rules"],
  ["quiz", "Quiz"],
  ["about", "About"],
];

const equipmentPages: [path: string, file: string][] = [
  ["equipment", "Hub"],
  ["equipment/blades", "BladeExplorer"],
  ["equipment/blades/:bladeId", "BladeDetail"],
  ["equipment/rubbers", "RubberExplorer"],
  ["equipment/rubbers/:rubberId", "RubberDetail"],
  ["equipment/brands/:brandId", "BrandDetail"],
  ["equipment/compare", "Compare"],
  ["equipment/pros", "Pros"],
  ["equipment/pros/:playerId", "PlayerDetail"],
  ["equipment/guides", "Guides"],
  ["equipment/guides/:slug", "Guide"],
  ["equipment/glossary", "Glossary"],
];

// English lives at the root; every other locale gets a /{code} prefix with the same route modules.
function localeRoutes(l: Locale) {
  const en = l === defaultLocale;
  const prefix = en ? "" : `${l}/`;
  const id = (name: string) => (en ? {} : { id: `${l}/${name}` });
  return [
    en ? index("routes/home.tsx") : route(l, "routes/home.tsx", id("home")),
    route(`${prefix}drills`, "routes/drills.tsx", id("drills")),
    route(`${prefix}drills/:slug`, "routes/drill.tsx", id("drill")),
    layout(
      "routes/serves-layout.tsx",
      id("serves-layout"),
      servesPages.map(([path, file]) => route(`${prefix}${path}`, `serves/pages/${file}.tsx`, id(file))),
    ),
  ];
}

export default [
  ...locales.flatMap(localeRoutes),
  // English only (see content/legal.ts), so each exists once, at the root, for every language's footer.
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  // Blog posts are English only too.
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog-post.tsx"),
  // Equipment encyclopedia, English only for now.
  layout(
    "routes/equipment-layout.tsx",
    equipmentPages.map(([path, file]) => route(path, `equipment/pages/${file}.tsx`)),
  ),
  route("equipment/img/:kind/:file", "equipment/pages/Illustration.ts"),
] satisfies RouteConfig;
