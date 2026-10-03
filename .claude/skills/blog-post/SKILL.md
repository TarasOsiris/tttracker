---
name: blog-post
description: Write and publish a table tennis news blog post on the website (research, images, links, ASO) and push it to master. Used by the scheduled blog routine.
---

Run from `website/`. Posts live in `app/content/blog.ts` (newest first); the page templates are `app/routes/blog.tsx` and `app/routes/blog-post.tsx`. Prerender list and `sitemap.xml` pick up new posts automatically.

## 1. Research
- WebSearch the latest table tennis news (WTT, ITTF, major events, upsets, rankings, equipment, rule changes). Use today's date, and do not repeat a story already in `blog.ts`.
- WebFetch the best sources for exact scores and names. Some sites (ittf.com, scmp.com) return 403; use search snippets only for facts and say so in the final report. Never state a score, date or name you did not see in a source.
- Pick one main story plus 2-3 smaller ones. Prefer stories fans want to read: finals, upsets, records, upcoming events.

## 2. Write (not dry)
- Hook intro in 2-3 sentences with the most surprising fact. Conversational, active voice, short paragraphs.
- `takeaways`: 4-5 "In short" bullets.
- Sections with concrete scores, names and a "why it matters" line. End with a section that ties to the app: link to `/` (the log), `/serves`, `/spins`, `/drills`, `/quiz` where relevant.
- Link generously: player names to their Wikipedia page, events to worldtabletennis.com / ittf.com / Wikipedia, results to a tracker. Only link URLs you saw in search results or know exist.
- List every source under `sources`.

## 3. Images (required: hero plus 1-2 inline)
- Find freely licensed photos on Wikimedia Commons via the API (`action=query&generator=search&gsrnamespace=6&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1000`). Send a User-Agent such as `TTTrackerBlog/1.0 (https://ttapp.smashyapps.com; info@ninevastudios.com)`, wait between calls, and retry on HTTP 429.
- Only CC BY, CC BY-SA or public domain. Record the author and the Commons file page URL for `credit` / `creditUrl`.
- Look at each image before using it (resize with `convert -resize 700x`, then Read it). Do not use a photo unless you are sure what it shows. If a photo is not from the event or is years old, say so in the caption ("Archive photo from 2017"); never imply it shows the event. Skip low-quality stills.
- Save as WebP in `website/public/blog/` (`convert in.img -resize 1200x -quality 70 out.webp`; hero cropped to 16:9, 1200x675, ideally under 200 KB; inline 1000 px wide). Descriptive alt text.
- If no suitable image can be found, publish without one for that slot rather than using a doubtful one, and mention it in the report.

## 4. ASO / SEO
- Title: main keyword first, about 60-70 characters when possible, with the names people search for. `description`: 140-160 characters with the key facts. 5-8 `keywords`. `slug`: lowercase, keyword-rich, no date needed.
- Keep `published` as today's ISO date. Check the page has one H1, canonical, Open Graph image (the hero) and `BlogPosting` JSON-LD (the template handles these).

## 5. Verify and publish
- `npm run typecheck && npm run lint && npm run build`; confirm `build/client/blog/<slug>/index.html` exists and the sitemap lists it.
- Commit with a clear message and push straight to `master` (`git fetch origin master && git rebase origin/master && git push origin HEAD:master`). Also push the working branch if the stop hook asks.
- Do not open a PR.
