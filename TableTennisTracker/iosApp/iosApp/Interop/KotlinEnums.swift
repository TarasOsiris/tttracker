import SwiftUI
import Shared

/// Kotlin enums export as Objective-C classes, not Swift enums, so a `switch` over them is never
/// exhaustive. Mirroring the small ones as Swift enums restores that — and the parity tests below
/// turn "someone added a Kotlin case" into a build-time or launch-time failure rather than a silent
/// fallback.
///
/// Raw values are the Kotlin `name`s (or `dbValue`s where one exists), which is what gets persisted.

enum ThemeMode: String, CaseIterable, Identifiable {
    case system = "SYSTEM"
    case light = "LIGHT"
    case dark = "DARK"

    var id: String { rawValue }

    init(_ kotlin: AppThemeMode) { self = ThemeMode(rawValue: kotlin.name) ?? .system }

    var kotlin: AppThemeMode {
        switch self {
        case .system: .system
        case .light: .light
        case .dark: .dark
        }
    }

    var colorScheme: ColorScheme? {
        switch self {
        case .system: nil
        case .light: .light
        case .dark: .dark
        }
    }

    var label: String {
        switch self {
        case .system: L.themeSystem
        case .light: L.themeLight
        case .dark: L.themeDark
        }
    }
}

enum WeekStart: String, CaseIterable, Identifiable {
    case monday = "MONDAY"
    case sunday = "SUNDAY"
    case saturday = "SATURDAY"

    var id: String { rawValue }

    init(_ kotlin: Shared.WeekStartDay) { self = WeekStart(rawValue: kotlin.name) ?? .monday }

    var kotlin: Shared.WeekStartDay {
        switch self {
        case .monday: .monday
        case .sunday: .sunday
        case .saturday: .saturday
        }
    }

    var label: String {
        switch self {
        case .monday: L.weekStartMonday
        case .sunday: L.weekStartSunday
        case .saturday: L.weekStartSaturday
        }
    }

    /// `Calendar.firstWeekday` numbering, where 1 is Sunday.
    var firstWeekday: Int {
        switch self {
        case .sunday: 1
        case .monday: 2
        case .saturday: 7
        }
    }
}

enum Handed: String, CaseIterable, Identifiable {
    case right = "right"
    case left = "left"

    var id: String { rawValue }

    /// `UNKNOWN` maps to `nil`: the form models "not set" as no selection, and there is no string
    /// for it in any locale.
    init?(_ kotlin: Shared.Handedness?) {
        guard let kotlin, let mapped = Handed(rawValue: kotlin.dbValue) else { return nil }
        self = mapped
    }

    var kotlin: Shared.Handedness {
        switch self {
        case .right: .right
        case .left: .left
        }
    }

    var label: String {
        switch self {
        case .right: L.handednessRight
        case .left: L.handednessLeft
        }
    }
}

enum Style: String, CaseIterable, Identifiable {
    case attacker = "attacker"
    case defender = "defender"
    case allRound = "all_round"
    case pips = "pips"
    case chopper = "chopper"

    var id: String { rawValue }

    init?(_ kotlin: PlayingStyle?) {
        guard let kotlin, let mapped = Style(rawValue: kotlin.dbValue) else { return nil }
        self = mapped
    }

    var kotlin: PlayingStyle {
        switch self {
        case .attacker: .attacker
        case .defender: .defender
        case .allRound: .allRound
        case .pips: .pips
        case .chopper: .chopper
        }
    }

    var label: String {
        switch self {
        case .attacker: L.styleAttacker
        case .defender: L.styleDefender
        case .allRound: L.styleAllRound
        case .pips: L.stylePips
        case .chopper: L.styleChopper
        }
    }
}

extension SessionType {
    var label: String {
        switch self {
        case .technique: L.sessionTypeTechnique
        case .matchPlay: L.sessionTypeMatchPlay
        case .tournament: L.sessionTypeTournament
        case .servePractice: L.sessionTypeServePractice
        case .physical: L.sessionTypePhysical
        case .freePlay: L.sessionTypeFreePlay
        default: L.sessionTypeOther
        }
    }
}

extension CompetitionLevel {
    var label: String {
        switch self {
        case .practice: L.competitionLevelPractice
        case .league: L.competitionLevelLeague
        case .tournament: L.competitionLevelTournament
        default: ""
        }
    }
}

/// `AppLocale` has 15 cases and already carries its own endonym, so wrapping beats mirroring —
/// there is no second table to drift.
struct LocaleOption: Identifiable, Hashable {
    let kotlin: AppLocale

    var id: String { kotlin.name }
    var displayName: String { kotlin.displayName }
    var languageTag: String { kotlin.languageTag }

    init(_ kotlin: AppLocale) { self.kotlin = kotlin }

    static let system = LocaleOption(.system)
    static let all = AppLocale.entries.map(LocaleOption.init)
}

/// RPE 1...10 to its label, matching `getRpeLabel` in the Compose UI.
func rpeLabel(_ rpe: Int) -> String {
    switch rpe {
    case 1, 2: L.rpeVeryEasy
    case 3, 4: L.rpeEasy
    case 5, 6: L.rpeModerate
    case 7, 8: L.rpeHard
    case 9, 10: L.rpeMaxEffort
    default: ""
    }
}

#if DEBUG
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
    }
}
#endif
