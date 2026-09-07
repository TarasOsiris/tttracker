import Foundation
import Observation
import Shared

@MainActor
@Observable
final class MatchEditorModel {
    /// How many name suggestions the Compose `OpponentField` offers.
    private static let suggestionLimit = 5

    var opponentName: String
    var myGamesWon: Int
    var opponentGamesWon: Int
    var isDoubles: Bool
    var isRanked: Bool
    var competition: Competition?
    var notes: String

    private(set) var opponents: [Opponent] = []

    let isEditing: Bool

    @ObservationIgnored private let id: String
    @ObservationIgnored private var opponentId: String?
    @ObservationIgnored private let subscriptions = FlowSubscriptions()

    var canSave: Bool { !opponentName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }

    /// Known opponents whose name contains what has been typed, minus an exact hit — once the name
    /// matches there is nothing left to suggest.
    var suggestions: [Opponent] {
        let query = opponentName.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !query.isEmpty else { return Array(opponents.prefix(Self.suggestionLimit)) }
        guard !opponents.contains(where: { $0.name.caseInsensitiveCompare(query) == .orderedSame }) else { return [] }
        return opponents
            .filter { $0.name.localizedCaseInsensitiveContains(query) }
            .prefix(Self.suggestionLimit)
            .map { $0 }
    }

    init(editing match: PendingMatch?, opponents service: any OpponentService = Services.opponents) {
        isEditing = match != nil
        id = match?.id ?? UUID().uuidString
        opponentId = match?.opponentId
        opponentName = match?.opponentName ?? ""
        myGamesWon = match?.myGamesWon ?? 0
        opponentGamesWon = match?.opponentGamesWon ?? 0
        isDoubles = match?.isDoubles ?? false
        isRanked = match?.isRanked ?? false
        competition = match?.competition
        notes = match?.notes ?? ""

        subscriptions.insert(
            KotlinFlow.observe(service.allOpponents, as: [Shared.Opponent].self) { [weak self] all in
                self?.opponents = all.map(Opponent.init)
            }
        )
    }

    /// Picking a suggestion links the match to that opponent; typing over it unlinks again, so a new
    /// name is created rather than silently retargeting the previous opponent.
    func choose(_ opponent: Opponent) {
        opponentName = opponent.name
        opponentId = opponent.id
    }

    func nameChanged() {
        guard let opponentId, let linked = opponents.first(where: { $0.id == opponentId }) else { return }
        if linked.name != opponentName { self.opponentId = nil }
    }

    func result() -> PendingMatch {
        PendingMatch(
            id: id,
            opponentName: opponentName.trimmingCharacters(in: .whitespacesAndNewlines),
            opponentId: opponentId,
            myGamesWon: myGamesWon,
            opponentGamesWon: opponentGamesWon,
            isDoubles: isDoubles,
            isRanked: isRanked,
            competition: competition,
            notes: notes.nilIfBlank
        )
    }
}
