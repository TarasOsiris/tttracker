# Widgets

Both apps ship the same five home-screen widgets, two of them Pro, and the same "Add session"
shortcut. iOS adds Lock Screen accessories, which Android has no counterpart for.

| Widget | iOS kind / families | Android provider / sizes | Tapping it opens |
| --- | --- | --- | --- |
| Summary | `…widget.summary` — small, medium, large, accessoryRectangular, accessoryCircular | `SummaryWidget` — small, medium, large | `tttracker://analytics` |
| Heatmap | `…widget.heatmap` — medium, large | `HeatmapWidget` — any size from 3×2 | `tttracker://analytics` |
| Last session | `…widget.lastSession` — small, medium, accessoryRectangular | `LastSessionWidget` — small, medium | `tttracker://sessions/<id>` |
| Training streak (Pro) | `…widget.streak` — small, accessoryRectangular, accessoryCircular | `StreakWidget` — small | `tttracker://analytics` |
| Training load (Pro) | `…widget.trainingLoad` — small, medium | `TrainingLoadWidget` — small, medium | `tttracker://analytics` |
| Add session | `…control.addSession` — Control Center / Lock Screen / Action button | static launcher shortcut (`res/xml/shortcuts.xml`) | `tttracker://sessions/new` |

Before the first session is logged every widget shows the invitation to log one, and a tap opens
`tttracker://sessions/new`. A Pro widget placed without Pro shows its lock (the crown and "Unlock
with Pro in the app"), and a tap opens `tttracker://pro`, the paywall, with `PaywallSource` `widget`.
The widget picker always shows the real thing, unlocked. The Pro accent tints every widget, and only
while the user has Pro.

## Deep links

`tttracker://analytics`, `tttracker://sessions`, `tttracker://sessions/new`,
`tttracker://sessions/<id>` and `tttracker://pro`. Both apps close Settings, or anything else open
above the tabs, before following one. On iOS `RootTabView.open(_:)` routes them; on Android
`MainActivity` receives them (`onCreate` and `onNewIntent`), `deeplink/DeepLink.kt` parses them, and
`ui/nav/DeepLinkNavigation.kt` applies them to the Navigation 3 back stacks from `TopNavDisplay`.
Widget taps use explicit intents for `MainActivity`, so they never reach another app that claims
the scheme.

## iOS: a snapshot file

The extension does not read `app.db`. It lives in the app's private container, and reaching it would
mean linking `Shared.framework` and starting Koin inside a process with a ~30 MB budget, plus
cross-process WAL access.

Instead the app writes a JSON snapshot into the `group.xyz.tleskiv.tt` App Group container and the
extension reads only that:

- `iosApp/iosApp/Widgets/WidgetSnapshotWriter.swift` (app) subscribes to
  `TrainingAnalyticsService.summary`, `.dailyLoad`, `TrainingSessionService.allSessions`,
  `InsightsService.insights` and `.trainingWeeks`, and the accent and week-start preferences;
  coalesces the burst of emissions each write produces, and reloads the timelines only when the
  encoded bytes changed.
- `iosApp/Common/WidgetSnapshot.swift` is the payload, and `WidgetStore.swift` the file.
- `iosApp/TTWidgets/SnapshotProvider.swift` reads it and returns one entry, refreshed at the next
  midnight so "today" and the heatmap window roll over on their own.

The consequence is that widgets are as fresh as the last time the app ran. For a manual training
log that is the same moment the data last changed.

Anything the extension cannot work out for itself is resolved **when the snapshot is written**:

- heatmap intensity buckets, via `:core`'s `heatmapLevel`;
- a session type's translated name;
- the brand palette, copied from `BrandColors` — which stays the single source of truth for colour,
  since `iosApp/Common/Palette.swift` only knows how to read ARGB numbers, not where they came from.

`languageTag` travels in the snapshot too, so the widget resolves `L` strings in the app's in-app
language rather than the device's. Widget *gallery* names come from `LocalizedStringResource`, which
the system resolves in the system language.

## Android: Glance, in the app's process

Android widgets are rendered by the app's own process — the widget host starts it when it needs
one — so there is no snapshot file. Everything lives in `androidApp/.../appwidget/`:

- `WidgetDataSource` combines the same `:core` flows the iOS writer subscribes to into a
  `WidgetData` (the snapshot's counterpart, mapped by the pure functions in `WidgetData.kt`), plus a
  day ticker so the heatmap window and "this week" roll over at midnight.
- `TTGlanceWidget` is the base of the five `GlanceAppWidget`s. Each widget's content *collects*
  `WidgetDataSource.data` rather than reading it once, because Glance keeps a session alive after it
  renders and an update recomposes that session instead of calling `provideGlance` again.
- `WidgetUpdater`, started from `TTApplication`, coalesces the burst of emissions a write produces
  and calls `updateAll` only when `WidgetData` changed. It also schedules an inexact alarm at the
  next midnight (`WidgetRefreshReceiver`) for when the process is gone, and on API 35+ publishes
  generated picker previews (`setWidgetPreviews`); older launchers show each provider's static
  `previewLayout`.
- `WidgetProStore` keeps the last known Pro state and accent in SharedPreferences.
  `ProModel.knownHasProFeatures` is null until RevenueCat has answered, and only a known value is
  written, so a widget host cold-starting the process does not flash a Pro user's widgets locked.
- `WidgetEnvironment` resolves strings and number/date formats in the in-app language
  (`AppLocale`), and themes the widget from `appColorScheme` — the app's own light and dark schemes
  with the accent applied — so a widget follows the launcher's day/night mode by itself.

Widget picker names and descriptions are the receivers' `android:label` and the provider infos'
`android:description`, which the launcher resolves in the system language.

Glance limits that shaped the layouts: a `Row`/`Column` renders at most ten children (the heatmap
groups its week columns), corner radii only apply on API 31+, and every cell is one view, so the
heatmap's days are tinted `Image`s of `widget_cell` rather than boxes with spacers.

## Adding a widget

1. iOS: a new file in `iosApp/TTWidgets/`, and a line in `TTWidgetsBundle.body`. New Swift files
   need no pbxproj edit — the target uses file-system-synchronized groups. A stable `kind` in
   `WidgetKind`: changing one orphans every widget a user has placed.
2. Android: a `TTGlanceWidget` subclass and its `GlanceAppWidgetReceiver` in `appwidget/`, listed in
   `TTWidgets`, a `<receiver>` in the manifest and a provider info in `res/xml/`. The receiver's
   class name is the Android `kind`: renaming it orphans every placed widget.
3. Strings go in `androidApp/src/main/res/values/strings.xml` like every other string; run
   `tools/strings/xcstrings.py` and `/translate`.
4. If it needs a value neither side carries, add it to `WidgetSnapshot` / `WidgetSnapshotWriter` on
   iOS — not by reaching for Kotlin from the extension — and to `WidgetData` / `WidgetDataSource` on
   Android.

## Checking it by hand

iOS: the simulator keeps App Group containers at the path `xcrun simctl get_app_container <device>
xyz.tleskiv.tt groups` prints; `widget-snapshot.json` there is what the widgets see.
`iosAppUITests/WidgetDeepLinkUITests.swift` covers the app's half of a widget tap.

Android: `adb shell dumpsys appwidget` lists the providers; `adb shell am start -a
android.intent.action.VIEW -d tttracker://analytics` exercises a route (with both a debug and a
release build installed, add `-n xyz.tleskiv.tt.debug/xyz.tleskiv.tt.MainActivity` to pick one).
