---
name: pro-setups-update
description: Weekly refresh of the pro player rankings and equipment setups on the website's equipment encyclopedia, with sources, then push to master. Used by the scheduled pro-setups routine.
---

Run from `website/`. Player data is in `app/equipment/data/players.ts` (types in `app/equipment/models.ts`); the catalog is one
file per brand in `app/equipment/data/brands/`. `npm run build` runs `app/equipment/validate.ts`, which fails on a slot
without a source, an unknown catalog id or a bad date. Use today's date for every `accessed`, `asOf` and `lastVerified`
you write.

## The rule: never mislead
A wrong setup is worse than an old one. Change data only on evidence you read in this session. If sources disagree or
you're unsure, keep the current value and say so in the commit body. Never remove data without a source showing it's wrong.

## 1. Rankings
- Fetch the current ITTF/WTT senior world ranking (worldtabletennis.com rankings, or ittf.com; if they block fetches use
  results.ittf.link or a reliable mirror and say which). Track the top 25 men's singles and top 25 women's singles.
- Update each tracked player's `ranking` ({ position, date: the ranking's publication date, source }).
- A new player in the top 25: add them (step 2 for their setup). A player who left the top 25: set `ranking: null`
  (they move to "Other notable players"); never delete a player, so their page URL keeps working.

## 2. Setups
For each player, search for equipment news since their slot `asOf` dates: sponsor announcements and sponsor team pages
(Butterfly, DHS, Stiga, Xiom, Nittaku, Tibhar, Andro, Victas, Joola...), the player's own posts, interviews, and
reputable equipment coverage. Match photos alone are not enough to change a slot (at most `unverified`).
- Change a slot only with a source newer than its current `asOf`. Append the old item to `history`
  ({ date, slot, from, to, source }) and set the new slot's `source`, `asOf` and `confidence`:
  - `confirmed`: the player, their sponsor/federation, or an official WTT/ITTF source states it.
  - `reported`: a reputable equipment site, interview or news outlet reports it.
  - `unverified`: only seen in photos/footage. Use sparingly.
- Non-retail gear (national/provincial rubbers, custom or relabelled blades, special editions not on sale) goes in
  `variant`, with `itemId` pointing at the closest retail catalog item only if the source names that product; else `itemId: null`.
- Re-checking a slot with no change: update `lastVerified` on the player only. Don't bump `asOf` unless a new source confirms it.

## 3. New catalog items
If a pro switches to a retail blade or rubber that isn't in the catalog, add it to the brand's file under
`app/equipment/data/brands/` following the doc comments in `models.ts`: values only from the maker's own page (retailers
only for gaps), unknown fields `null`, ratings verbatim with the brand's labels, hardness with the scale the maker uses
(`unstated` if unclear), `sources` and `lastVerified`. Don't add products from memory.

## 4. Verify and publish
- `npm run typecheck && npm run lint && npm run build`. Fix any validation error properly (never by deleting a source).
- Skip the commit if nothing changed.
- Commit "Weekly pro setups update (YYYY-MM-DD)". In the body, list each changed player and slot (old → new) with its
  source URL, ranking changes in one line, and anything left unchanged because sources conflicted.
- Push straight to `master`: `git fetch origin master && git rebase origin/master && git push origin HEAD:master`.
  Do not open a PR.
