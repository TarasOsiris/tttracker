import Foundation

/// Stand-in content for the widget gallery and for previews, used only when the app has never
/// written a snapshot — the system redacts it there anyway. Shape, not values: the palette stays
/// neutral because `BrandColors` reaches the widget through the snapshot and nowhere else.
extension WidgetSnapshot {
    static var sample: WidgetSnapshot {
        let calendar = Calendar.gregorian
        let today = calendar.startOfDay(for: .now)
        let days = (0..<120).compactMap { offset -> DayLoad? in
            guard offset % 3 != 0 else { return nil }
            guard let date = calendar.date(byAdding: .day, value: -offset, to: today) else { return nil }
            let sessions = offset % 7 == 1 ? 2 : 1
            return DayLoad(date: date, sessions: sessions, level: offset % 7 == 1 ? 4 : (offset % 2) + 1)
        }
        return WidgetSnapshot(
            summary: Summary(totalSessions: 48, totalMinutes: 3_960, matchesWon: 31, matchesLost: 17),
            days: Array(days.reversed()),
            lastSession: LastSession(
                id: UUID().uuidString,
                date: today,
                minutes: 90,
                rpe: 7,
                kindLabel: L.sessionTypeMatchPlay,
                kind: "match_play",
                matchesWon: 3,
                matchesLost: 1,
                topScore: L.matchScoreFormat(3, 1),
                opponent: "Ana"
            ),
            palette: .neutral,
            languageTag: Bundle.main.preferredLocalizations.first ?? "en",
            firstWeekday: Calendar.gregorian.firstWeekday
        )
    }
}
