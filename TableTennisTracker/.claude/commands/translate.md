Find all missing string translations in locale files and add them.

1. Read the base English strings file:
   `composeApp/src/commonMain/composeResources/values/strings.xml`
2. For each supported locale (ar, de, es, fr, hi, id, it, ja, ko, pt, tr, uk, zh-rCN):
    - Read the locale file at
      `composeApp/src/commonMain/composeResources/values-{locale}/strings.xml`
    - Find string keys that exist in English but are missing in the locale file
    - Add appropriate translations for the missing keys, maintaining the same ordering and comment
      sections as the base file
3. Compile the project to verify the changes: `./gradlew :composeApp:compileKotlinJvm`
