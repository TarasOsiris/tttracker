Run from `TableTennisTracker/` — every path below is relative to it.

Find all missing string translations in locale files and add them.

**Write every translation yourself.** Do not call Google Translate, DeepL or any other translation
service, API, library or website, and do not paste in machine output. Translate as a fluent native
speaker localizing a polished iOS and Android app would: idiomatic UI language, not a word-for-word
rendering of the English.

1. Read the base English strings file: `androidApp/src/main/res/values/strings.xml`.
2. For each supported locale (ar, de, es, fr, hi, id, it, ja, ko, pt, tr, uk, zh-rCN, zh-rTW):
    - Read the locale file at `androidApp/src/main/res/values-{locale}/strings.xml` **in full**
      before translating anything. It is your glossary and style guide for that language.
    - Find string keys that exist in English but are missing in the locale file.
    - Translate them following the rules below, and add them keeping the same ordering and comment
      sections as the base file.
3. Verify the resources compile: `./gradlew :androidApp:assembleDebug`.
4. Project the new strings onto iOS: `python3 tools/strings/xcstrings.py`, then
   `python3 tools/strings/xcstrings.py --check`.
5. Report, per locale, how many keys were added, and list any string where you were unsure of the
   meaning or had to depart noticeably from the English, so a human can review it.

## Translation rules

- **Match what the locale file already says.** Reuse its existing words for the app's concepts
  (session, match, opponent, RPE, training, Settings, Pro, …) instead of introducing synonyms, and
  keep the same register: if German uses "du", Japanese plain or polite form, French "vous", carry
  that on.
- **Understand the string before translating it.** Read the key name and its neighbours to see where
  it appears: a button label, a section header, a footer explanation, an accessibility hint or a
  status line each want a different form. A button is a short verb ("Sync now" → "Jetzt
  synchronisieren"), not a sentence.
- **Keep UI strings about as short as the English.** Labels sit in toolbars, rows and pills.
  Prefer the shorter natural phrasing; never pad. `PRO` stays `PRO`.
- **Use each platform's own words** for system features: "iCloud", "Apple Account", "Restore
  purchases" and "Settings" as Apple localizes them in that language (for example "Käufe
  wiederherstellen", "Restaurer les achats", "購入を復元"), App Store / Google Play unchanged.
- **Do not translate** product and brand names (TT Tracker, TT Tracker Pro, iCloud, App Store,
  Google Play), units such as RPE, or anything inside a placeholder.
- **Keep placeholders and markup exactly**: `%1$s`, `%1$d`, `%%`, `\n`, and their order of
  arguments unless the grammar of the language needs them reordered (positional placeholders allow
  that). Keep `<xliff:g>` tags and HTML entities intact.
- **Plurals and numbers**: if the English is a `<plurals>` resource, supply every quantity the
  language needs (`one`, `few`, `many`, `other`, …), not just the English two.
- **Escape apostrophes** as `\'` — aapt rejects a bare `'` in a string resource. This matters for
  French, Italian and Ukrainian especially. Escape `"` and `@`/`?` at the start of a string the same
  way.
- **Script and locale**: `zh-rCN` is Simplified Chinese; `zh-rTW` is Traditional Chinese as written
  in Taiwan, using the Taiwan UI terms Apple and Google use (設定, 儲存, 新增, 帳號) — it also serves
  Hong Kong, so avoid Taiwan-only slang; `pt` is Brazilian Portuguese; `uk` is Ukrainian, not
  Russian; `ar` is written right-to-left, so check punctuation reads naturally in RTL.
- **Typography**: use the language's own quotes and punctuation (« » with spaces in French, „ " in
  German, full-width punctuation in Japanese and Chinese), and the proper ellipsis `…`.
