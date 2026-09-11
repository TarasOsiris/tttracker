/// Headline totals for the analytics screen, and for the widgets' summary tiles.
struct Summary: Codable, Equatable, Sendable {
    var totalSessions = 0
    var totalMinutes = 0
    var matchesWon = 0
    var matchesLost = 0

    var totalMatches: Int { matchesWon + matchesLost }
    var winRate: Double? { totalMatches > 0 ? Double(matchesWon) / Double(totalMatches) : nil }
}
