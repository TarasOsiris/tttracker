import Shared

/// Mirrors `SessionType`. A session's type is optional, so a nil Kotlin value maps to nil here
/// rather than to a case — `OTHER` is a type the user can pick, not the absence of one.
///
/// Never round-trip through `SessionType.companion.fromDb`: alone among these enums it *throws* on
/// an unrecognised value, and a Kotlin throw out of a non-suspend function kills the process.
enum SessionKind: String, CaseIterable, Identifiable {
    case technique = "technique"
    case matchPlay = "match_play"
    case tournament = "tournament"
    case servePractice = "serve_practice"
    case physical = "physical"
    case freePlay = "free_play"
    case other = "other"

    var id: String { rawValue }

    init?(_ kotlin: SessionType?) {
        guard let kotlin, let mirrored = SessionKind(rawValue: kotlin.dbValue) else { return nil }
        self = mirrored
    }

    var kotlin: SessionType {
        switch self {
        case .technique: .technique
        case .matchPlay: .matchPlay
        case .tournament: .tournament
        case .servePractice: .servePractice
        case .physical: .physical
        case .freePlay: .freePlay
        case .other: .other
        }
    }

    var label: String {
        switch self {
        case .technique: L.sessionTypeTechnique
        case .matchPlay: L.sessionTypeMatchPlay
        case .tournament: L.sessionTypeTournament
        case .servePractice: L.sessionTypeServePractice
        case .physical: L.sessionTypePhysical
        case .freePlay: L.sessionTypeFreePlay
        case .other: L.sessionTypeOther
        }
    }
}
