---
name: ship
description: Bump versions and ship the app — iOS to App Store Connect, Android to Google Play
disable-model-invocation: true
---

# Ship

Bump the version, build, and upload — iOS to App Store Connect, Android to Google Play.

## Working directory

**Every command below runs from `TableTennisTracker/`**, the Gradle project root — that is where
`gradlew`, `iosApp/`, `androidApp/` and `fastlane/` live. This skill lives one level up, in the
repo root's `.claude/`, so start with:

```bash
cd TableTennisTracker
```

Skip it if the session already started there. Every path in this file (`iosApp/...`, `build/...`,
`fastlane/...`) is relative to that directory.

## Choosing platforms

| Invocation | Ships |
|---|---|
| `/ship` | iOS **and** Android |
| `/ship ios` | iOS only |
| `/ship android` | Android only |
| `/ship 1.4.0` | both, with `1.4.0` as the user-facing version |
| `/ship android 1.4.0` | Android only, version `1.4.0` |

Only treat an argument as a version if it looks like one (`1.4.0`, `2.0`). `--submit` / `submit`
skips the iOS review-submission question (Part A, Step 7); a track name (`internal`,
`production`) skips the Android publish question (Part B, Step 4).

When both platforms ship, do **Android first** — it is minutes against a ~20-minute
Kotlin/Native archive, so an Android-side problem surfaces before the expensive half. Do not
abort the second platform because the first failed; ship what can ship and say so in the report.

Facts this repo needs:

| | |
|---|---|
| App Store Connect app id | `6758044383` (Table Tennis Training Tracker) |
| Bundle / application id | `xyz.tleskiv.tt` |
| Team | `XW3GM347XY` |
| iOS version source | `iosApp/Configuration/Config.xcconfig` |
| Android version source | `androidApp/build.gradle.kts` (`versionCode`, `versionName`) |
| **iOS build target** | **`iosApp/iosApp.xcodeproj`, scheme `iosApp`** — Swift Package Manager, see below |
| IPA name | `TableTennisTracker.ipa` (from `PRODUCT_NAME`, *not* the scheme name) |
| Sentry | org `nineva-studios`, iOS project `tt-tracker-ios` |
| Play package | `xyz.tleskiv.tt` |
| Tag formats | `ios-<MARKETING_VERSION>`, `android-<versionName>` |

**This project uses Swift Package Manager, not CocoaPods.** There is no `.xcworkspace` — build the
`.xcodeproj` directly. PostHog and Sentry come from SwiftPM (declared in the Xcode project), and the
Kotlin/Native `Shared.framework` is produced by the `Compile Kotlin Framework` build phase, which
runs `./gradlew :core:embedAndSignAppleFrameworkForXcode`. The Kotlin framework links no Apple
SDKs of its own, so `./gradlew :core:linkReleaseFrameworkIosArm64` is a valid standalone check
before you spend time on an archive.

All App Store Connect calls go through the `asc` CLI, which authenticates on its own from the
system keychain — no `.p8` path, no API key flags. If any `asc` command fails on auth, run
`asc doctor`. (The `.p8` is still needed for `xcodebuild` — see Step 6.)

All Google Play calls go through the `gplay` CLI
([play-console-cli](https://github.com/tamtom/play-console-cli), `brew install --cask PollyGlot/tap/gplay`).
The package comes from the committed repo-root `.gplay/config.json` pin, found by walking up from
the cwd, so run it from inside the repo. It authenticates from its own keychain Account, registered
once per machine from the service account key:

```bash
gplay auth login --service-account "$HOME/Library/Mobile Documents/com~apple~CloudDocs/Files/taras-android-google-play.json" --name play-release
gplay auth doctor --package xyz.tleskiv.tt
```

If any `gplay` command exits 10 or 11, run `gplay auth doctor`. `gplay exit-codes` explains the
rest; 40 and 50 are the transient ones worth retrying (`--retry 3`).

**fastlane is not installed and must not become a dependency.** The `fastlane/metadata/` (App Store)
and `fastlane/play-metadata/` (Google Play) trees are used for their *directory layout* only — Step 8
reads localized release notes out of the first, and `gplay metadata` reads and writes the second.

---

# Part A — iOS

Skip this whole part for `/ship android`.

## Step 1: Determine the version bump

Read the current version from `iosApp/Configuration/Config.xcconfig`:
- `MARKETING_VERSION` (e.g. `1.3.3`) — the user-facing version
- `CURRENT_PROJECT_VERSION` (e.g. `6`) — the build number

Always increment `CURRENT_PROJECT_VERSION` by 1.

If a marketing version was passed as an argument, use it as the new `MARKETING_VERSION`. With no
version argument, keep `MARKETING_VERSION` unchanged and bump only the build number.

> **History note.** Before Sep 2026 the binary version and the store version diverged: build 6
> shipped as `MARKETING_VERSION=1.0.5` but appeared on the App Store as **1.3.2** (build 5 = 1.0.4
> = 1.3.1, and so on back to 1.0). `Config.xcconfig` was realigned to `1.3.3` to match the store
> train. If you ever see the two disagree again, the store is the source of truth — Step 2 is what
> enforces that.

## Step 2: Verify the marketing version against App Store Connect FIRST

**Do this before archiving.** `MARKETING_VERSION` is baked into the archive, so discovering a
closed train at upload time (Step 6) costs a full re-archive — and archiving this project is slow
because it compiles the whole Kotlin/Native framework.

```bash
asc versions list --app 6758044383 --platform IOS --limit 5 --output table
```

Read `versionString` and `appStoreState` of the newest entry:

- Newest version **equals** the intended `MARKETING_VERSION` and is in an editable state
  (`PREPARE_FOR_SUBMISSION`, `DEVELOPER_REJECTED`, `REJECTED`, `METADATA_REJECTED`) → the train is
  open. Keep the version; only the build number bumps.
- Newest version **equals** the intended `MARKETING_VERSION` and is `READY_FOR_SALE` (or any other
  released state) → **the train is closed**. Bump `MARKETING_VERSION` to the next free patch value
  above it (e.g. `1.3.3` released → ship `1.3.4`) without prompting.
- Newest version is **lower** than the intended `MARKETING_VERSION` → nothing to do.

This is the same rejection Step 6 would otherwise return as error `90186` ("train version … is
closed for new build submissions") or `90062` (`CFBundleShortVersionString` must be higher).

**Reuse an open version record, never create a second one.** As of Sep 2026 the `1.3.3` record is
`PREPARE_FOR_SUBMISSION` and already carries fully localized metadata in **20 locales** (name,
subtitle, keywords, description, promotional text). Creating a fresh version instead of reusing it
would leave that behind — the ASC *API* does not copy localized text onto a new version the way
the web UI does.

## Step 3: Update Config.xcconfig

Update `CURRENT_PROJECT_VERSION` and `MARKETING_VERSION` in
`iosApp/Configuration/Config.xcconfig`. Both values live in exactly one place — the target does not
redefine them, so there is nothing to change in `project.pbxproj`.

Confirm they resolved before spending twenty minutes on an archive:

```bash
xcodebuild -project iosApp/iosApp.xcodeproj -scheme iosApp -configuration Release \
  -showBuildSettings 2>/dev/null | grep -E 'MARKETING_VERSION|CURRENT_PROJECT_VERSION'
```

## Step 3b: Verify the CloudKit Production schema

TestFlight and the App Store use the Production CloudKit environment, which never creates schema on
its own: a build whose record types or fields are missing there archives, uploads and installs fine,
and then iCloud sync uploads nothing. Check before archiving:

```bash
python3 tools/check_cloudkit_schema.py
```

If it lists anything missing, **stop and tell the user**; do not work around it. Production cannot be
written from the command line, so the fix needs them:

1. Import the repo schema into Development (safe, Development can be reset):
   `xcrun cktool import-schema --team-id XW3GM347XY --container-id iCloud.xyz.tleskiv.tt --environment development --file iosApp/CloudKit/Schema.ckdb`
2. CloudKit Console → `iCloud.xyz.tleskiv.tt` → **Deploy Schema Changes…** to Production. Irreversible:
   a deployed field can never be removed, so the user reviews and clicks it.

Then re-run the check. If `cktool` reports no management token, the user saves one once with
`xcrun cktool save-token --type management` (CloudKit Console → Settings → Tokens & Keys).

## Step 4: Create the archive

```bash
asc xcode archive \
  --project iosApp/iosApp.xcodeproj \
  --scheme iosApp \
  --configuration Release \
  --archive-path build/iosApp.xcarchive \
  --overwrite \
  --xcodebuild-flag=-destination --xcodebuild-flag=generic/platform=iOS \
  --xcodebuild-flag=-allowProvisioningUpdates \
  --xcodebuild-flag=-authenticationKeyPath --xcodebuild-flag=<absolute .p8 path, see Step 6> \
  --xcodebuild-flag=-authenticationKeyID --xcodebuild-flag=4KK2B86XC6 \
  --xcodebuild-flag=-authenticationKeyIssuerID --xcodebuild-flag=69a6de84-a676-47e3-e053-5b8c7c11a4d1 \
  --output table
```

`build/` is gitignored, so nothing from this step or the next ever lands in a commit.

**Archive with the API key, like the export in Step 6.** Without it the archive signs through the
machine's broken Xcode account, falls back to the wildcard `iOS Team Provisioning Profile: *`, and
fails on the widget extension's App Group (`doesn't include the App Groups capability`). With it,
`xcodebuild` creates the profiles and registers the App ID's capabilities (App Groups, iCloud /
CloudKit, Push) itself. `xcodebuild` also needs `DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer`
on this machine, whose `xcode-select` points at the Command Line Tools.

The archive **is** the compile check — the `Compile Kotlin Framework` build phase runs
`./gradlew :core:embedAndSignAppleFrameworkForXcode`, so a Kotlin error in `:core` (or
in a module it depends on) surfaces here. There is deliberately **no
separate "does it compile" build before this, and one should not be added**: an archive compiles
into its own `Build/Intermediates.noindex/ArchiveIntermediates/` tree and shares not one object
file with a plain build, so the extra step costs a second full Kotlin/Native compile while
catching nothing the archive won't. (Learned the hard way: the first run of this skill spent 25
minutes on that step before it was killed.)

If the archive fails, stop and report the error. Do not proceed.

- `module 'Shared' not found` / `Undefined symbols: _kfun:...` — the `Compile Kotlin Framework`
  phase did not produce the framework. Run
  `./gradlew :core:linkReleaseFrameworkIosArm64` on its own to see the real Kotlin error.
- `Missing package product 'PostHog'` / `'Sentry'` — SwiftPM has not resolved. Run
  `xcodebuild -resolvePackageDependencies -project iosApp/iosApp.xcodeproj -scheme iosApp`.
- A Sentry or PostHog symbol missing at link time is a **Swift**-side problem, not a Kotlin one:
  both SDKs are used only from `iosApp/iosApp/Swift*.swift`, never from Kotlin.

The archive path is reused every ship, so confirm the archive about to be uploaded is the one just
built — a no-opped archive step would otherwise upload a stale binary:

```bash
/usr/libexec/PlistBuddy -c "Print :ApplicationProperties:CFBundleShortVersionString" \
  -c "Print :ApplicationProperties:CFBundleVersion" build/iosApp.xcarchive/Info.plist
```

It must print the version and build number set in Step 3. Anything else — stop.

## Step 5: Upload dSYMs to Sentry

Do this **before** the App Store upload, so a symbol failure stops the ship rather than being
discovered after a crash lands unsymbolicated.

```bash
sentry-cli debug-files upload -o nineva-studios -p tt-tracker-ios \
  build/iosApp.xcarchive/dSYMs
```

`-p tt-tracker-ios` is mandatory — `tt-tracker-android` is the Android project and sentry-cli's
default project is a different app entirely. Unlike Android (where the Sentry Gradle plugin uploads
ProGuard mappings automatically) **nothing on iOS uploads symbols except this step.**

`Nothing to upload, all files are on the server` is a fine result on a re-run, but on its own it
does not prove symbols exist — an empty dSYMs folder reports the same thing. Pair it with a
listing, which must contain at least `TableTennisTracker.app.dSYM`:

```bash
ls build/iosApp.xcarchive/dSYMs/
```

If the upload fails, **report it as a warning and continue** — the store upload is the critical
path, and dSYMs can be re-uploaded later from the same archive.

## Step 6: Export the IPA and upload

Export first, then upload — two steps, so an export/signing failure is distinguishable from an
upload failure.

**Export with App Store Connect API-key auth, not Xcode-account auth.** The default keychain /
Xcode-account path fails on this machine with `No Accounts` / `No signing certificate
"iOS Distribution" found`, and signing in through the Xcode GUI does not fix it. This is a
machine-wide trait — the sibling `captions-bro` and `cleaning-checlist` repos carry the identical
warning. `asc xcode export` goes through that same broken path, so it cannot be used here.

The API key also solves signing outright: with `-allowProvisioningUpdates` it lets `xcodebuild`
provision the distribution certificate itself, so there is no `.p12` to hunt down.

`build/ExportOptions.plist` is not checked in; write it before exporting (`build/` is gitignored):

```xml
<plist version="1.0"><dict>
  <key>method</key><string>app-store-connect</string>
  <key>destination</key><string>export</string>
  <key>teamID</key><string>XW3GM347XY</string>
  <key>signingStyle</key><string>automatic</string>
  <key>uploadSymbols</key><true/>
</dict></plist>
```

**Locate the `.p8` first.** Two copies exist; prefer the local one — the iCloud copy can be
evicted to a placeholder on a machine that hasn't opened it recently:

1. `/Users/taras/Documents/creds/ios/AuthKey_4KK2B86XC6_BRO.p8` — local, cannot be evicted
2. `~/Library/Mobile Documents/com~apple~CloudDocs/Files/AuthKey_4KK2B86XC6_BRO.p8`
3. If neither resolves: `find "$HOME" -maxdepth 5 -name 'AuthKey_*.p8'`

`xcodebuild: error: The -authenticationKeyPath flag must be an absolute path to an existing file.`
means eviction or a moved key — find it rather than assuming it is gone.

```bash
xcodebuild -exportArchive -archivePath build/iosApp.xcarchive -exportPath build/upload -exportOptionsPlist build/ExportOptions.plist -allowProvisioningUpdates -authenticationKeyPath /Users/taras/Documents/creds/ios/AuthKey_4KK2B86XC6_BRO.p8 -authenticationKeyID 4KK2B86XC6 -authenticationKeyIssuerID 69a6de84-a676-47e3-e053-5b8c7c11a4d1

asc builds upload --app 6758044383 --ipa build/upload/TableTennisTracker.ipa --wait --output table
```

Run the `xcodebuild` line **exactly as written** — no `set -o pipefail` prefix, no `| tail`, no
wrapper. The repo-root `.claude/settings.local.json` allows it by literal prefix, and any wrapper turns it into
a compound command that matches no rule and gets blocked.

**The IPA is named after `PRODUCT_NAME`, so it is `TableTennisTracker.ipa`, not `iosApp.ipa`** —
`asc builds upload` fails with `failed to stat IPA` if you pass the scheme name.

Export compliance needs no action: `ITSAppUsesNonExemptEncryption` is `false` in
`iosApp/iosApp/Info.plist`, so the build arrives already declared exempt. If App Store Connect ever
shows the "Determine Compliance Requirements" prompt again, that key went missing — check it
survived into the bundle with
`plutil -extract ITSAppUsesNonExemptEncryption raw <app>/Info.plist` and fix the source rather than
answering the dialog. To clear an already-uploaded build:
`asc builds update --build-id <ID> --uses-non-exempt-encryption=false`.

`--wait` polls until App Store Connect finishes processing. Note the resulting **build id** —
Step 8 needs it.

**If App Store Connect rejects the version** (`90186` / `90062`), bump `MARKETING_VERSION` to the
next free value without prompting, redo Step 3, then re-archive (Step 4) and re-upload — the
version is embedded in the archive, so re-exporting the existing one is not enough. Re-run Step 5
too: a re-archived binary has new dSYM UUIDs. Step 2 should have caught this; if it fires here, say
so in the report.

## Step 7: Ask whether to submit for review

The build is on App Store Connect at this point. Ask the user, with the AskUserQuestion tool,
whether to also submit for review:

- **Submit for review** (default) — continue to Step 8.
- **Upload only** — stop here; the build is available in App Store Connect and TestFlight.

Skip the question if the invocation already says so (`/ship --submit`).

Ask this **up front, alongside any other question**, rather than here — a slow archive should never
sit waiting on a prompt.

## Step 8: Write release notes, attach the build, submit

Only when Step 7 said to submit.

1. **Reuse the editable version record** found in Step 2. Only create one if none exists:

   ```bash
   asc versions create --app 6758044383 --platform IOS --version <MARKETING_VERSION> \
     --release-type AFTER_APPROVAL \
     --copy-metadata-from <previous version> --exclude-fields whatsNew --output table
   ```

   Prefer reuse — a version created through the API does not inherit localized metadata, and this
   app's open record carries 20 locales of it.

2. **Write "What's New" per locale.** This repo has *localized* release notes on disk at
   `fastlane/metadata/<locale>/release_notes.txt` (20 locales, written by the ASO work). Push each
   locale its own text rather than English everywhere:

   ```bash
   asc localizations list --version <VERSION_ID> --output table
   asc localizations update --version <VERSION_ID> --locale <LOCALE> --whats-new "$(cat fastlane/metadata/<LOCALE>/release_notes.txt)"
   ```

   Loop one call at a time. The shell here is **zsh**, which does not word-split an unquoted
   variable — a naive `for L in $LOCALES` passes the whole list as one locale and every call
   fails; pipe into `while read -r L` instead.

   A locale on disk that `asc localizations list` does not show yet — `zh-Hant`, added once the
   app gained Traditional Chinese — has to be created rather than updated, with every field from
   its directory:

   ```bash
   L=zh-Hant; D=fastlane/metadata/$L
   asc localizations create --version <VERSION_ID> --locale $L \
     --description "$(cat $D/description.txt)" --keywords "$(cat $D/keywords.txt)" \
     --promotional-text "$(cat $D/promotional_text.txt)" --whats-new "$(cat $D/release_notes.txt)" \
     --marketing-url "$(cat $D/marketing_url.txt)" --support-url "$(cat $D/support_url.txt)"
   asc apps rename --app 6758044383 --locale $L --name "$(cat $D/name.txt)"
   ```

   The subtitle and privacy URL live on the app info record, not the version: set them for the new
   locale in App Store Connect if `asc` cannot. Its screenshots are ready in the Screenshot Bro
   "tt tracker" project under the same locale code; once the localization exists, push them with
   the Screenshot Bro App Store sync (preview, then apply) for that locale only.

   If a locale has no file on disk, fall back to the en-US text. When the notes on disk are stale
   (they describe the *previous* ship), draft fresh English from `git log ios-<previous>..HEAD` —
   user-facing behaviour only, no refactors or dependency bumps — write it to
   `fastlane/metadata/en-US/release_notes.txt`, and use it for every locale.

3. **Attach the build** uploaded in Step 6:

   ```bash
   asc versions attach-build --version-id <VERSION_ID> --build-id <BUILD_ID>
   ```

4. **Gate on validation**, then submit. **If the `Pro Lifetime` in-app purchase has never been
   approved** (`asc iap list --app 6758044383` shows it `READY_TO_SUBMIT` rather than `APPROVED`),
   it must go to review in the same submission as the version — Apple rejects a binary that sells a
   product it has not reviewed, and `asc review submit` adds only the version. Build the submission
   by hand instead:

   ```bash
   asc versions attach-build --version-id <VERSION_ID> --build-id <BUILD_ID>
   asc review submissions-create --app 6758044383 --platform IOS --output json   # note the id
   asc review items-add --submission <SUBMISSION_ID> --item-type appStoreVersions --item-id <VERSION_ID>
   asc iap versions list --iap-id 6818121876 --output table                       # the IAP version id
   asc review items-add --submission <SUBMISSION_ID> --item-type inAppPurchaseVersions --item-id <IAP_VERSION_ID>
   asc review submissions-submit --id <SUBMISSION_ID> --confirm
   ```

   If adding the IAP fails with "Only versions in 'Prepare for Submission' or 'Developer Rejected'
   state can be submitted", the IAP version (state `READY_FOR_REVIEW`) is already sitting in an
   unsent draft submission — App Store Connect creates one when the purchase is submitted from its
   own page. Find it with `asc review submissions-list --app 6758044383` (a `READY_FOR_REVIEW`
   submission with one item; decode the item id from base64 to see `…|17|<IAP_VERSION_ID>`), add
   the app version to *that* submission instead, and submit it. A version can sit in only one
   submission, so remove it from the new one first (`asc review items-remove --id <ITEM_ID>
   --confirm`). An empty draft left behind cannot be cancelled and does no harm.

   Once the purchase is approved, later releases use the plain flow below:

   ```bash
   asc validate --app 6758044383 --version-id <VERSION_ID> --platform IOS --output table
   asc review submit --app 6758044383 --version-id <VERSION_ID> --build <BUILD_ID> --confirm --output table
   ```

   `--build` is **not optional** — `asc review submit` wraps attach-build + submissions-create +
   items-add + submissions-submit, and without it the submission has nothing to review. Prefer
   `--version-id` over `--version` when you already hold the ID; both flags exist and the ID is
   unambiguous. To see the plan without mutating, swap `--confirm` for `--dry-run`.

   If `asc validate` reports blocking errors, stop and report them — do not submit.
   `asc review doctor --app 6758044383` explains why an app can't be submitted.

   One `info` finding is expected and **not** blocking: `privacy.publish_state.unverified`
   ("App Privacy publish state is not verifiable via the public App Store Connect API"). App
   Privacy is published for this app; the public API simply cannot report it.

**A failure here does not fail the ship.** The binary is already uploaded. Report it loudly, say
plainly that the build is uploaded but **not submitted**, and note that re-running `/ship ios
--submit` picks up from the existing editable version idempotently.

## Step 9: Commit, tag, and push

```bash
git add iosApp/Configuration/Config.xcconfig
git commit -m "Bump iOS version to <MARKETING_VERSION> (<CURRENT_PROJECT_VERSION>)"
git tag ios-<MARKETING_VERSION>
git push && git push --tags
```

Push straight to `master` — this repo does not use feature branches.

`git push --tags` is mandatory; local-only tags from prior ships should never be left behind.

If the tag `ios-<MARKETING_VERSION>` already exists (a build-number-only ship on an open train),
skip the tag and push only the commit.

When both platforms ship in one run, make this a **single commit** with the Android version bump
(Part B, Step 6) and both tags, rather than two commits touching one file each.

---

# Part B — Android

Skip this whole part for `/ship ios`.

## Step 0: Preflight the bundled fonts

```bash
for f in androidApp/src/main/res/font/*.ttf; do
  head -c4 "$f" | xxd -p | grep -q '^00010000$' || { echo "not a TTF: $f"; exit 1; }
done
```

Cheap, and it catches a failure mode that already happened once: `poppins_regular.ttf` and
`poppins_medium.ttf` were saved GitHub HTML pages rather than fonts, so every body and label style
silently rendered in a fallback face for months. A real TrueType file starts
with the sfnt magic `00 01 00 00`; HTML does not.

## Step 1: Preflight the signing config

```bash
test -f androidApp/keystore.properties && echo ok
```

`androidApp/build.gradle.kts` reads `storeFile` / `storePassword` / `keyAlias` / `keyPassword` from
that file; it is gitignored and points at a keystore outside the repo
(`~/Documents/creds/android_keystore/tttracker-release.keystore`). **If it is missing, stop before
building** — the `signingConfig` block silently skips signing when `storeFile` is absent, so Gradle
produces an *unsigned* bundle that Play rejects at upload, after a full release build. Ask the user
for the file; never invent passwords and never commit it.

## Step 2: Determine the version bump

Read `versionCode` and `versionName` from `androidApp/build.gradle.kts`, then ask Play what it
already has:

```bash
gplay tracks list
gplay tracks list --output json | python3 -c "import json,sys; print(max((int(c) for t in json.load(sys.stdin).get('tracks', []) for r in t.get('releases', []) for c in r.get('versionCodes', [])), default=0))"
```

The table shows only each track's top release; the second line is the highest versionCode across
every release on every track.

The new `versionCode` is **one above the highest of the local value and the highest versionCode
reported by Play** — Play rejects a bundle whose versionCode is already used, even on a track it
never reached. (The local value routinely lags: it is the code of the *last* build, and manual Play
Console uploads can push Play ahead of the repo.)

`versionName` comes from the version argument if one was given; otherwise keep the current value.

## Step 3: Build the release bundle

```bash
./gradlew :androidApp:bundleRelease
```

The bundle lands at `androidApp/build/outputs/bundle/release/androidApp-release.aab`; if it isn't
there, locate it with `find androidApp/build/outputs -name '*.aab'`.

The Sentry Gradle plugin uploads the ProGuard mapping during this build, gated on
`$SENTRY_AUTH_TOKEN_PERSONAL`. If that variable is unset the build still succeeds but Android
crashes arrive deobfuscated-less — mention it in the report rather than failing the ship.

If the build fails, stop and report the error. Do not upload.

## Step 4: Ask where to publish

Ask with the AskUserQuestion tool — this is the one irreversible choice in the Android flow, since
a committed production release goes to real users:

- **Internal testing** (default) — `--track internal`, live to internal testers within minutes,
  no review.
- **Production — draft** — `--track production`. gplay makes a production release a draft unless
  told otherwise; it sits in the Play Console until a human presses the button.
- **Production — full release** — `--track production --complete --confirm`. Goes for review,
  then 100% of users.
- **Production — staged rollout** — `--track production --staged <fraction> --confirm`. Ask for
  the percentage, pass it as a fraction (10% → `0.1`). Widen it later with
  `gplay releases rollout --track production --staged <fraction> --confirm`.

Skip the question when the invocation named a track (`/ship android production`).

## Step 5: Upload to Play

Draft release notes from `git log android-<previous>..HEAD` — functional, user-facing changes only.
`--release-notes` applies them to the default language, `en-US`:

```bash
gplay releases upload androidApp/build/outputs/bundle/release/androidApp-release.aab \
  --track <track> [--complete --confirm | --staged <fraction> --confirm] \
  --mapping androidApp/build/outputs/mapping/release/mapping.txt \
  --release-notes "<what's new>" --retry 3
```

`--mapping` gives Play vitals the R8 mapping so its crash stacks symbolicate (Sentry gets its own
copy from the Gradle plugin). The release name defaults to the bundle's `versionName`.

gplay opens an edit, uploads the bundle, sets the track and commits in one call, and discards the
edit on any failure, so a failed run leaves nothing half-applied in the Play Console. Before any
byte is uploaded it checks the bundle is really an AAB declaring `xyz.tleskiv.tt` — which does
**not** catch a stale AAB from a previous ship; check Gradle's exit code and the file's mtime.

`--dry-run` makes **no** HTTP call; it only previews the release payload. To have Play itself
validate without publishing, run the upload inside an explicit edit and throw it away:

```bash
gplay edits begin
gplay releases upload <aab> --track <track> ...   # joins the pinned edit
gplay edits validate
gplay edits discard
```

Notes on failures:

- **`versionCode N has already been used`** — Step 2's check was skipped or Play moved ahead. Bump
  `versionCode` again, rebuild (Step 3), re-upload. The versionCode is inside the bundle.
- **`APK signed with the wrong key` / unsigned bundle** — `keystore.properties` was missing or
  wrong at build time. Fix it and rebuild.
- **`changesNotSentForReview`** — Play refused to send the change for review automatically. Re-run
  with `--changes-not-sent-for-review`; the release then waits in the Play Console for a human to
  send it for review. Surface this in the report, don't bury it.
- **Exit 3** — a production `--complete`/`--staged` without `--confirm`. The message names the flag.
- **`COMMIT_OUTCOME_UNKNOWN`** — the commit was sent and may be live. Check
  `gplay releases list --track <track>` before re-running, or the retry trips over its own
  versionCode.
- **Exit 60 `EDIT_ALREADY_EXISTS`** — a pinned edit was left open (`gplay edits status`); commit or
  `gplay edits discard` it.

## Step 6: Commit, tag, and push

```bash
git add androidApp/build.gradle.kts
git commit -m "Bump Android version to <versionName> (versionCode <versionCode>)"
git tag android-<versionName>
git push && git push --tags
```

Push straight to `master`. If the tag `android-<versionName>` already exists (a versionCode-only
ship), skip the tag and push only the commit. When both platforms ship in one run, use the single
combined commit described in Part A, Step 9.

---

# Store listing and graphics

Not part of a ship, but the same tool. `fastlane/play-metadata/<lang>/` is the fastlane supply
layout `gplay metadata` reads (`title.txt`, `short_description.txt`, `full_description.txt`):

```bash
gplay metadata list                                          # live languages and char usage
gplay metadata pull     --dir fastlane/play-metadata         # Play is the source of truth; pull first
gplay metadata validate --dir fastlane/play-metadata
gplay metadata apply    --dir fastlane/play-metadata --dry-run
gplay metadata apply    --dir fastlane/play-metadata --confirm
```

`apply` writes every locale in one edit and is additive; `--prune` deletes live locales absent from
the tree, which is a real delete. Re-run the `--dry-run` afterwards — all `unchanged` is the
read-back.

Images are a separate tree, `<dir>/<lang>/images/<type>/1.png…N.png` for galleries and
`<dir>/<lang>/images/<type>.png` for `icon` / `featureGraphic`. Stage it under `build/` (gitignored)
— e.g. `fastlane/play-metadata/feature-graphic.png` copied to
`build/play-images/<lang>/images/featureGraphic.png` for the default language and each language
that carries its own copy (`gplay metadata images list --type featureGraphic`):

```bash
gplay metadata images validate --dir build/play-images
gplay metadata images apply --dir build/play-images --type featureGraphic --prune --dry-run
gplay metadata images apply --dir build/play-images --type featureGraphic --prune --confirm
```

**Always pass `--type`** — gplay 2.0.0 walks every image type when unfiltered, and Play rejects
`promoGraphic` with an HTTP 400 that aborts the command. Without `--prune` the apply is additive and
old images stay beside the new ones; with it only the slots the tree holds are replaced.

---

# Report

Print one summary covering everything that ran:

**iOS** — previous → new version and build number; whether the Step 2 train check bumped
`MARKETING_VERSION` (and if Step 6 had to re-archive, say so); Sentry dSYM status; upload status
and build id; version record created or reused; how many locales got release notes; validation
result; review submission id and state — or that the build is uploaded but **not** submitted.

**Android** — previous → new `versionCode`/`versionName`; whether Play's highest versionCode forced
a larger bump than +1; whether the Sentry mapping upload ran; track, release status and rollout
percentage; whether the release is live, awaiting review, or sitting as a draft for a human to
publish.

**Both** — commit and tags pushed.

If one platform failed and the other shipped, say so plainly at the top rather than in a footnote.
