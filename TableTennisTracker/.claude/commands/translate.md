Find all missing string translations in locale files and add them.

1. Read the base English strings file: `androidApp/src/main/res/values/strings.xml`
2. For each supported locale (ar, de, es, fr, hi, id, it, ja, ko, pt, tr, uk, zh-rCN):
    - Read the locale file at `androidApp/src/main/res/values-{locale}/strings.xml`
    - Find string keys that exist in English but are missing in the locale file
    - Add appropriate translations for the missing keys, maintaining the same ordering and comment
      sections as the base file
    - Escape apostrophes as `\'` — aapt rejects a bare `'` in a string resource
3. Verify the resources compile: `./gradlew :androidApp:assembleDebug`
4. Project the new strings onto iOS: `python3 tools/strings/xcstrings.py`
