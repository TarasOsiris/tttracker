# Writing a "blade vs blade" article

Each article is a page at `/equipment/compare/<slug>` in the website's equipment encyclopedia. It targets searches
like "viscaria vs timo boll alc". It should be **the most accurate, useful comparison of these two blades on the web**
for a club player deciding between them. The page shows the two product pictures, a spec table built from the catalog,
and the tracked pros who use each blade automatically. You write the text: intro, verdict, sections, FAQ and sources.

The site's rule is **never mislead**. A missing claim is better than a wrong one.

## Before writing
1. Read both blades in the catalog: `app/equipment/data/brands/<brand>.ts` (search for the id). Their `layup`, plies,
   thickness, weight, handles, ratings, `description`, `facts`, `notes` and `sources` are the verified baseline.
   `app/equipment/models.ts` explains each field. The spec table shows these values, so **your text must never
   contradict them**. If the maker doesn't publish a value (null), don't state one. You may say a value is unpublished,
   or quote a reputable measurement and attribute it.
2. Check who uses each blade in `app/equipment/data/players-men.ts` and `players-women.ts` (current `setup.blade` and
   `history`). You may mention famous past users (e.g. a champion who made a blade famous) only with a source you fetched.
3. Research with web search and fetching: the makers' own product pages and catalogues; reputable equipment sites
   (revspin.net aggregate ratings, tabletennis11, megaspin, Table Tennis Daily, tabletennisdb, ttgearlab,
   tabletennis.ph, Butterfly/Stiga/DHS interviews); and for differences in feel, measured reviews. **Cite only pages you
   actually fetched that state the claim.** Never cite from memory or guess URLs.

## Content rules
- Plain, neutral English for a club player. No hype ("ultimate", "beast"), no "we tested", no first person.
  Attribute feel claims: "Butterfly describes…", "RevSpin users rate…", "reviewers often find…" (with a source).
- Explain *why* the blades differ (composite type and position, plies, outer veneer, thickness, weight, handle shape,
  head size if published), then *what that means* when playing: dwell time, arc, speed at mid-distance, blocking,
  short game, flicks, power loops.
- Be concrete about who should pick which: level, style (close-to-table vs mid-distance, forehand- vs backhand-heavy),
  rubbers that suit each (link catalog rubbers), and penhold/handle options if relevant.
- Mention price only as relative ("usually costs more") with a source. No affiliate tone.
- If the two are nearly identical (e.g. same layup), say so plainly and focus on the real differences
  (handle, weight, veneer, edition), and don't invent big differences.
- Length: about 900–1,400 words across intro, sections and FAQ. 4–7 sections, for example:
  "Construction: what's actually different", "Speed, control and feel", "Close to the table vs mid-distance",
  "Which rubbers to pair", "Who uses them", "Price, editions and versions". Use your own headings to fit the pair.
- 3–5 FAQ entries answering real search questions ("Is the Viscaria faster than the Timo Boll ALC?",
  "Which is better for beginners?"). Plain-text answers of 1–3 sentences. Markdown links do not render in FAQ answers.
- `verdict.a` / `verdict.b`: one sentence each completing "Choose the <name> if…", e.g.
  "you want a slightly larger sweet spot and a flared handle for forehand-led looping."

## Links
- Text fields (intro, verdict, section blocks) support `[label](url)` and `**bold**`.
- Link internally where it helps the reader: `/equipment/blades/<id>`, `/equipment/rubbers/<id>`,
  `/equipment/pros/<id>`, `/equipment/guides/<slug>` (guides: carbon-fibers-explained, inner-vs-outer-carbon,
  plies-and-woods, blade-handles, sponge-hardness-scales, rubber-types, pips-explained, sponge-thickness,
  speed-glue-and-boosting, choosing-your-first-setup), `/equipment/glossary`. Only ids that exist in the catalog.
- Every external URL linked in the text must also be in `sources`. `sources` lists every page a claim relies on:
  `{ url, label: "<Site>: <what it is>", kind: manufacturer|ittf|retailer|press|player|reference, accessed: "2026-11-21" }`.

## File format
Create `app/equipment/data/versus/<slug>.ts` (slug given in your task):

```ts
import type { BladeComparison } from "../../models";

export const comparison: BladeComparison = {
  slug: "viscaria-vs-timo-boll-alc",
  a: "butterfly-viscaria",
  b: "butterfly-timo-boll-alc",
  title: "…",          // ≤ 60 chars, starts with "<A> vs <B>", e.g. "Viscaria vs Timo Boll ALC: Which Blade Suits You?"
  description: "…",    // 120–160 chars, unique, says what the reader gets
  intro: "…",
  verdict: { a: "…", b: "…" },
  sections: [{ heading: "…", blocks: ["paragraph", { list: ["item", "item"] }] }],
  faq: [{ q: "…?", a: "…" }],
  sources: [{ url: "https://…", label: "…", kind: "manufacturer", accessed: "2026-11-21" }],
  updated: "2026-11-21",
};
```

## Check, then stop
- Run from `website/`: `node_modules/.bin/jiti scripts/check-comparison.ts app/equipment/data/versus/<slug>.ts`.
  It must print `OK …`. Fix every reported problem. Also run `npx prettier --check` on the file if prettier is
  available; otherwise keep the formatting like the example.
- **Only create your own article files.** Don't edit any other file (not `versus/index.ts`, not the catalog, not
  the players). Don't run `npm run build`, don't commit, don't push. Other writers work in the same checkout.
- If you find an error in the catalog or player data while researching, don't fix it. Report it in your final reply
  with the source URL.
- Final reply: one line per article (slug, word count, number of sources), then any catalog problems you found.
