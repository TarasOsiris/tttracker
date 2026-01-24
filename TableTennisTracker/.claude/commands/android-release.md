Prepare an Android release for Google Play:

1. Read the current versionCode and versionName from `androidApp/build.gradle.kts`
2. Increment versionCode by 1
3. Ask the user what the new versionName should be (suggest incrementing minor version)
4. Update both values in `androidApp/build.gradle.kts`
5. Build the release Android App Bundle with `./gradlew :androidApp:bundleRelease`
6. Copy the .aab file to Desktop with name format: `tttracker-v{versionName}-{versionCode}.aab` (e.g., `tttracker-v1.1-2.aab`)
7. Report the file location on Desktop
8. Add git tag in format `android-{version-name}` and push to origin
