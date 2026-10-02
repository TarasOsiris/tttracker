import Foundation

/// Everything the widgets draw, as the app last saw it.
///
/// The extension does not link the Kotlin framework and cannot reach `app.db`, which lives in the
/// app's own container; instead the app writes this file into the shared App Group whenever its
/// data changes. Anything that needs Kotlin — a session type's colour, its translated name — is
/// resolved here, at write time, so the widget only ever formats numbers and dates.
///
/// Deliberately carries no timestamp: the writer decides whether to spend a widget reload by
/// comparing the encoded bytes against the last ones, and a `generatedAt` would differ every time.
struct WidgetSnapshot: Codable, Equatable, Sendable {
    var summary = Summary()
    /// Newest last, one entry per day that the heatmap covers.
    var days: [DayLoad] = []
    var lastSession: LastSession?
    var palette: Palette
    /// The shipped localization the app is running in, so the widget can match it.
    var languageTag: String
    /// `Calendar.firstWeekday` numbering, from the week-start preference.
    var firstWeekday: Int

    // Optional so a snapshot written by an older build still decodes: a missing key is nil, where a
    // non-optional with a default would fail the whole file.

    /// Whether the Pro widgets show their content or the way to unlock it.
    var isPro: Bool?
    var streak: Streak?
    /// The last few weeks, oldest first, the current one last.
    var weeks: [WeekLoad]?
    /// The app's accent, already nil when it is not Pro's to show.
    var accent: AccentChoice?

    var isEmpty: Bool { summary.totalSessions == 0 }

    /// What the widgets show before the app has run, or if the App Group is unreachable.
    static var placeholder: WidgetSnapshot {
        WidgetSnapshot(
            palette: .neutral,
            languageTag: Bundle.main.preferredLocalizations.first ?? "en",
            firstWeekday: Calendar.gregorian.firstWeekday
        )
    }

    var locale: Locale { Locale(identifier: languageTag) }

    /// Points the generated `L` accessors at the language the app is running in. The widget process
    /// has no notion of the in-app override otherwise — it is not in its `UserDefaults`.
    func applyLocalization() {
        Localization.use(bundle: Localization.bundle(for: languageTag) ?? .main, locale: locale)
    }

    struct DayLoad: Codable, Equatable, Sendable, Identifiable {
        var date: Date
        var sessions: Int
        /// Intensity bucket, 0 through 4, from `:core`'s `heatmapLevel`.
        var level: Int

        var id: Date { date }
    }

    var hasPro: Bool { isPro == true }

    struct Streak: Codable, Equatable, Sendable {
        var currentWeeks: Int
        var longestWeeks: Int
    }

    struct WeekLoad: Codable, Equatable, Sendable, Identifiable {
        var start: Date
        var sessions: Int
        var minutes: Int
        /// RPE × minutes, summed over the week.
        var load: Int

        var id: Date { start }
    }

    struct LastSession: Codable, Equatable, Sendable {
        var id: String
        var date: Date
        var minutes: Int
        var rpe: Int
        /// Already translated — the mapping from a session type to its name lives in the app.
        var kindLabel: String?
        /// `SessionKind.rawValue`, for `Palette.sessionType(_:)`.
        var kind: String?
        var matchesWon: Int
        var matchesLost: Int
        /// The first match of the session, as "3 - 1".
        var topScore: String?
        var opponent: String?

        var matchCount: Int { matchesWon + matchesLost }
    }
}
