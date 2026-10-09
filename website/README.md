# TT Tracker website

Landing page and free training-plan pages for the TT Tracker app. React Router 7 (framework mode, prerendered static HTML), Tailwind CSS 4 and shadcn/ui.

- `npm run dev` — dev server
- `npm run build` — prerenders every route into `build/client`
- `npm run typecheck` / `npm run lint`
- `npm run preview` — serve the static build
- `scripts/og-images.sh` — after a build, re-renders the per-language share cards in `public/og/` from the home hero

Copy lives in `app/content/` (`site.ts`, `drills.ts`, `changelog.ts`). Adding a drill there adds its page to the prerender list and `sitemap.xml` automatically. `/support` is localized; `/changelog` is English only and lists user-visible changes per app release, dated by the version bump.

## Blog

Posts live in `app/content/blog-posts.ts`, written in English. A translation goes in its language's list under the same slug; a language gets a post page, hreflang entry and sitemap entry only for posts really translated into it, and a blog index only when it has at least one (`blog.server.ts`). Other localized blog URLs 301 to the English page (nginx rule, and `serve.json` redirects written at build time). At build time the first mention of a player who has an `/equipment/pros` page links there, replacing a Wikipedia link to them.

## Pricing and analytics

The home page's Pricing section and the FAQ describe TT Tracker Pro from the app's own Pro benefit strings; no price is shown, since it varies by store country. The home page's app schema adds the App Store rating (fetched at build time) once the listing has at least 5 ratings. Google Analytics runs in Consent Mode v2: denied by default in the EEA, the UK and Switzerland, with a banner for visitors in a European time zone and "Cookie settings" in the footer.

## Deploy

Production is the `Dockerfile` (static build served by nginx with `nginx.conf`: caching, gzip, security headers, redirects) behind Cloudflare. `nixpacks.toml` (`npx serve` with `public/serve.json`) mirrors the headers and redirects but isn't used in production. `404.html` is the prerendered `/404` page without its scripts, so it works without JavaScript.

## Localization

English is served at `/`, other languages at `/{code}` (`es`, `de`, `fr`, `pt`, `ja`, `zh`, `zh-tw`, `ko`, `it`, `uk`, `tr`, `id`, `hi`, `ar`): 15 of the 22 languages the apps ship. Czech, Dutch, Malay, Polish, Swedish, Thai and Vietnamese are in the apps and store listings but not on the site yet. All copy lives in `app/i18n/locales/{code}.ts`, typed by `app/i18n/types.ts`. Arabic renders right-to-left (`localeInfo[l].dir`), so layout uses logical classes (`ms-`, `ps-`, `start-`, `text-start`) and directional icons flip with `rtl:rotate-180`. Page titles and descriptions follow each store listing's name, subtitle and keywords (`TableTennisTracker/fastlane/metadata`). Translations are loaded only in build-time loaders (`messages.server.ts`), so each page ships just its own language. The build fails if a locale's drills drift from the English structure.

## Serve encyclopedia

`/serves`, `/motions`, `/spins`, `/rules`, `/quiz` and `/about` are the table tennis serve encyclopedia migrated from the former TT Serves site (same paths, so the old domain 301-redirects 1:1). Code lives in `app/serves/`: normalized data in `data/`, UI dictionaries and per-language data overlays in `i18n/`. `store.server.ts` applies a locale's overlay at build time and `routes/serves-layout.tsx` hands it to the pages through `ServesProvider`. The build fails if a serves dictionary is missing a key or a data overlay is missing a field English has.

## Equipment encyclopedia

`/equipment/...` (English only, like the blog): blade and rubber explorers, item and brand pages, a compare page, pro player setups, guides and a glossary. Code lives in `app/equipment/`: types in `models.ts`, one data file per brand in `data/brands/`, players in `data/players-*.ts`, guides and glossary in `data/guide*.ts`. `store.server.ts` hands each page only what it renders.

Images live in `public/equipment/`: product photos come from each maker's own product page (`photos/`, credited "© Brand" with the source page), brand logos from the brand's site or Wikimedia Commons (`brands/`), and player photos from freely licensed Wikimedia Commons or Openverse files, or otherwise the official World Table Tennis profile headshot (`players/`, credited to the author and licence, or "© World Table Tennis"). Add one with `scripts/equipment-image.sh <url> <path under public/>` (needs ffmpeg and cwebp). A product without a photo shows an illustration drawn from its specs (`illustrations.ts`, prerendered as `/equipment/img/{blades,rubbers}/<id>.svg`); deleting a photo file and its `photo` field falls back to it.

Accuracy rules, enforced by `validate.ts` at build time (a violation fails `npm run build`):
- Every item, player slot and guide cites sources; every fact cites one of its item's sources. Unknown values are `null` and show as "—".
- Manufacturer ratings are stored verbatim on the brand's own scale and never compared across brands.
- Sponge hardness keeps the scale the maker prints (`esn`, `japanese`, `chinese`, or `unstated`). Cross-brand filtering uses the approximate bands in `hardness.ts`, explained on the hardness guide; change both together.
- Links to equipment pages in prose must point at pages that exist.

Pro setups are refreshed weekly by the `pro-setups-update` skill (`.claude/skills/pro-setups-update/SKILL.md`), run by a scheduled routine that pushes to `master`.
