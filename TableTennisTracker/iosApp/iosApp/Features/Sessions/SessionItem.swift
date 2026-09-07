import Foundation
import Shared

/// View-facing training session.
struct SessionItem: Identifiable, Hashable {
    let id: String
    let day: Date
    let createdAt: Int64
    let durationMinutes: Int
    let kind: SessionKind?
    let rpe: Int
    let notes: String?
    let matches: [MatchItem]

    var title: String { kind?.label ?? L.sessionDefaultTitle }
    var durationText: String { durationMinutes.formattedTrainingDuration }
}

/// One match played within a session.
struct MatchItem: Identifiable, Hashable {
    let id: String
    let opponentId: String
    let opponentName: String
    let myGamesWon: Int
    let opponentGamesWon: Int
    let isDoubles: Bool
    let isRanked: Bool
    let competition: Competition?
    let rpe: Int?
    let notes: String?

    var isWin: Bool { myGamesWon > opponentGamesWon }
    var scoreText: String { L.matchScoreFormat(myGamesWon, opponentGamesWon) }
    var resultText: String { isWin ? L.matchWin : L.matchLoss }
}

extension SessionItem {
    init?(_ model: TrainingSession) {
        guard let day = model.date.sessionDay else { return nil }
        id = model.id.stringId
        self.day = day
        createdAt = model.createdAt
        durationMinutes = Int(model.durationMinutes)
        kind = SessionKind(model.sessionType)
        rpe = Int(model.rpe)
        notes = model.notes?.nilIfBlank
        matches = model.matches.map(MatchItem.init)
    }
}

extension MatchItem {
    init(_ model: Shared.Match) {
        id = model.id.stringId
        opponentId = model.opponent.id.stringId
        opponentName = model.opponent.name
        myGamesWon = Int(model.myGamesWon)
        opponentGamesWon = Int(model.opponentGamesWon)
        isDoubles = model.isDoubles
        isRanked = model.isRanked
        competition = Competition(model.competitionLevel)
        rpe = model.rpe?.intValue
        notes = model.notes?.nilIfBlank
    }
}

extension Calendar {
    /// Only for decoding stored session dates — see `Int64.sessionDay`.
    static let utc: Calendar = {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .gmt
        return calendar
    }()

    /// The calendar this feature does its date arithmetic in: Gregorian, the device's zone, and the
    /// user's first day of week.
    static func days(firstWeekday: Int) -> Calendar {
        var calendar = Calendar.gregorian
        calendar.firstWeekday = firstWeekday
        return calendar
    }
}

extension Int64 {
    /// The calendar day a stored `TrainingSession.date` denotes, as local midnight.
    ///
    /// `:core` writes the column with `atStartOfDayIn(TimeZone.UTC)`, so the day has to be read back
    /// in UTC — reading that instant in the device's own zone lands on the day before for anyone
    /// west of Greenwich, which is the bug the Compose list has. Rebuilding it as *local* midnight
    /// then makes the key an ordinary calendar day, the same convention `AnalyticsModel` uses.
    var sessionDay: Date? {
        let instant = Date(timeIntervalSince1970: Double(self) / 1000)
        return Calendar.gregorian.date(from: Calendar.utc.dateComponents([.year, .month, .day], from: instant))
    }
}
