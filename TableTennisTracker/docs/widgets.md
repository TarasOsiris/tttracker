# iOS widgets

The iOS app ships a widget extension, `TTWidgets`, with three Home Screen widgets, two Lock Screen
accessories and one Control Center control. Android has no widgets yet.

| Kind | Families | Tapping it opens |
| --- | --- | --- |
| `…widget.summary` | small, medium, large, accessoryRectangular, accessoryCircular | `tttracker://analytics` |
| `…widget.heatmap` | medium, large | `tttracker://analytics` |
| `…widget.lastSession` | small, medium, accessoryRectangular | `tttracker://sessions/<id>` |
| `…control.addSession` | Control Center / Lock Screen / Action button | `tttracker://sessions/new` |

## How the widgets get their data

They do not read `app.db`. It lives in the app's private container, and reaching it would mean
linking `Shared.framework` and starting Koin inside a process with a ~30 MB budget, plus
cross-process WAL access.

Instead the app writes a JSON snapshot into the `group.xyz.tleskiv.tt` App Group container and the
extension reads only that:

- `iosApp/iosApp/Widgets/WidgetSnapshotWriter.swift` (app) subscribes to
  `TrainingAnalyticsService.summary`, `.dailyLoad` and `TrainingSessionService.allSessions`,
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

## Adding a widget

1. A new file in `iosApp/TTWidgets/`, and a line in `TTWidgetsBundle.body`. New Swift files need no
   pbxproj edit — the target uses file-system-synchronized groups.
2. A stable `kind` in `WidgetKind`. Changing one orphans every widget a user has placed.
3. Strings go in `androidApp/src/main/res/values/strings.xml` like every other string; run
   `tools/strings/xcstrings.py` and `/translate`.
4. If it needs a value the snapshot does not carry, add it to `WidgetSnapshot` and fill it in
   `WidgetSnapshotWriter` — not by reaching for Kotlin from the extension.

## Checking it by hand

The simulator keeps App Group containers at the path `xcrun simctl get_app_container <device>
xyz.tleskiv.tt groups` prints; `widget-snapshot.json` there is what the widgets see.
`iosAppUITests/WidgetDeepLinkUITests.swift` covers the app's half of a widget tap.
