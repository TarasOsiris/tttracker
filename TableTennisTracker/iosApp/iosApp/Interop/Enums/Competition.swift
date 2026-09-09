import Shared

/// Mirrors `CompetitionLevel`. Optional on a match, so nil means "not recorded".
enum Competition: String, CaseIterable, Identifiable {
    case practice = "practice"
    case league = "league"
    case tournament = "tournament"

    var id: String { rawValue }

    init?(_ kotlin: CompetitionLevel?) {
        guard let kotlin, let mirrored = Competition(rawValue: kotlin.dbValue) else { return nil }
        self = mirrored
    }

    var kotlin: CompetitionLevel {
        switch self {
        case .practice: .practice
        case .league: .league
        case .tournament: .tournament
        }
    }

    var label: String {
        switch self {
        case .practice: L.competitionLevelPractice
        case .league: L.competitionLevelLeague
        case .tournament: L.competitionLevelTournament
        }
    }
}
