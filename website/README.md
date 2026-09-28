# TT Tracker website

Landing page and free training-plan pages for the TT Tracker app. React Router 7 (framework mode, prerendered static HTML), Tailwind CSS 4 and shadcn/ui.

- `npm run dev` — dev server
- `npm run build` — prerenders every route into `build/client`
- `npm run typecheck` / `npm run lint`
- `npm run preview` — serve the static build

Copy lives in `app/content/` (`site.ts`, `drills.ts`). Adding a drill there adds its page to the prerender list and `sitemap.xml` automatically.
