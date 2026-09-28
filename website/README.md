# TT Tracker website

Landing page and free training-plan pages for the TT Tracker app. React Router 7 (framework mode, prerendered static HTML), Tailwind CSS 4 and shadcn/ui.

- `npm run dev` — dev server
- `npm run build` — prerenders every route into `build/client`
- `npm run typecheck` / `npm run lint`
- `npm run preview` — serve the static build

Copy lives in `app/content/` (`site.ts`, `drills.ts`). Adding a drill there adds its page to the prerender list and `sitemap.xml` automatically.

## Localization

English is served at `/`, other languages at `/{code}` (`es`, `de`, `fr`, `pt`, `ja`, `zh`, `ko`, `it`). All copy lives in `app/i18n/locales/{code}.ts`, typed by `app/i18n/types.ts`. Translations are loaded only in build-time loaders (`messages.server.ts`), so each page ships just its own language. The build fails if a locale's drills drift from the English structure.
