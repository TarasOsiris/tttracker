# TT Tracker website

Landing page and free training-plan pages for the TT Tracker app. React Router 7 (framework mode, prerendered static HTML), Tailwind CSS 4 and shadcn/ui.

- `npm run dev` — dev server
- `npm run build` — prerenders every route into `build/client`
- `npm run typecheck` / `npm run lint`
- `npm run preview` — serve the static build

Copy lives in `app/content/` (`site.ts`, `drills.ts`). Adding a drill there adds its page to the prerender list and `sitemap.xml` automatically.

## Localization

English is served at `/`, other languages at `/{code}` (`es`, `de`, `fr`, `pt`, `ja`, `zh`, `zh-tw`, `ko`, `it`, `uk`, `tr`, `id`, `hi`, `ar`) — the same languages the apps ship. All copy lives in `app/i18n/locales/{code}.ts`, typed by `app/i18n/types.ts`. Arabic renders right-to-left (`localeInfo[l].dir`), so layout uses logical classes (`ms-`, `ps-`, `start-`, `text-start`) and directional icons flip with `rtl:rotate-180`. Page titles and descriptions follow each store listing's name, subtitle and keywords (`TableTennisTracker/fastlane/metadata`). Translations are loaded only in build-time loaders (`messages.server.ts`), so each page ships just its own language. The build fails if a locale's drills drift from the English structure.

## Serve encyclopedia

`/serves`, `/motions`, `/spins`, `/rules`, `/quiz` and `/about` are the table tennis serve encyclopedia migrated from the former TT Serves site (same paths, so the old domain 301-redirects 1:1). Code lives in `app/serves/`: normalized data in `data/`, UI dictionaries and per-language data overlays in `i18n/`. `store.server.ts` applies a locale's overlay at build time and `routes/serves-layout.tsx` hands it to the pages through `ServesProvider`. The build fails if a serves dictionary is missing a key or a data overlay is missing a field English has.
