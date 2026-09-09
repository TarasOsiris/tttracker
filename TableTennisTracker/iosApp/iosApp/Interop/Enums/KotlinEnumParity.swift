/// Kotlin enums export as Objective-C classes, not Swift enums, so a `switch` over them is never
/// exhaustive. Mirroring the small ones as Swift enums restores that — and `KotlinEnumParity`
/// turns "someone added a Kotlin case" into a launch-time failure rather than a silent fallback.
///
/// Raw values are the Kotlin `name`s (or `dbValue`s where one exists), which is what gets persisted.
/// One mirror per file, alongside this note.

#if DEBUG
import Shared

enum KotlinEnumParity {
    /// Fails loudly at launch if a Kotlin enum gained a case the Swift mirror does not know about,
    /// which would otherwise show up as a silent fallback to the first case.
    static func assertMirrorsAreComplete() {
        assert(
            Set(ThemeMode.allCases.map(\.rawValue)) == Set(AppThemeMode.entries.map(\.name)),
            "ThemeMode is out of sync with AppThemeMode"
        )
        assert(
            Set(WeekStart.allCases.map(\.rawValue)) == Set(Shared.WeekStartDay.entries.map(\.name)),
            "WeekStart is out of sync with WeekStartDay"
        )
        // Handed and Style deliberately omit UNKNOWN, which both render as "not set".
        assert(
            Set(Handed.allCases.map(\.rawValue))
                == Set(Shared.Handedness.entries.map(\.dbValue)).subtracting([Shared.Handedness.unknown.dbValue]),
            "Handed is out of sync with Handedness"
        )
        assert(
            Set(Style.allCases.map(\.rawValue))
                == Set(PlayingStyle.entries.map(\.dbValue)).subtracting([PlayingStyle.unknown.dbValue]),
            "Style is out of sync with PlayingStyle"
        )
        assert(
            Set(SessionKind.allCases.map(\.rawValue)) == Set(SessionType.entries.map(\.dbValue)),
            "SessionKind is out of sync with SessionType"
        )
        assert(
            Set(Competition.allCases.map(\.rawValue)) == Set(CompetitionLevel.entries.map(\.dbValue)),
            "Competition is out of sync with CompetitionLevel"
        )
    }
}
#endif
