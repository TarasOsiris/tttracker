import Observation
import Shared

/// Backs both the add and the edit sheet — the fields are identical, only the commit differs.
@MainActor
@Observable
final class OpponentEditorModel {
    var name = ""
    var club = ""

    /// Held as the number it is, not as text.
    ///
    /// It used to be a `String` parsed with `Double.init`, which only accepts "." as the decimal
    /// separator — so a rating typed on a comma-decimal keyboard was silently dropped on save.
    /// Bound through `TextField(value:format:)`, parsing follows the locale instead.
    var rating: Double?

    var handedness: Handed?
    var style: Style?
    var notes = ""

    private(set) var isLoading: Bool

    /// The last action that did not go through, if it has not been dismissed yet.
    var failure: OperationFailure?

    let isEditing: Bool
    var canSave: Bool { !name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }

    @ObservationIgnored private let editing: KotlinUuid?
    @ObservationIgnored private let service: any OpponentService
    @ObservationIgnored private let analytics: any AnalyticsService

    init(
        opponentId: String? = nil,
        service: any OpponentService = Services.opponents,
        analytics: any AnalyticsService = Services.analytics
    ) {
        // Resolve the id once. An unparseable id must not silently fall through to the create path
        // and add a second opponent instead of editing the one that was tapped.
        self.editing = opponentId?.kotlinUuid
        self.isEditing = opponentId != nil
        self.isLoading = opponentId != nil
        self.service = service
        self.analytics = analytics
    }

    func load() async {
        guard let id = editing else {
            isLoading = false
            return
        }
        if let existing = try? await service.getOpponentById(id: id) {
            let opponent = Opponent(existing)
            name = opponent.name
            club = opponent.club ?? ""
            rating = opponent.rating
            handedness = opponent.handedness
            style = opponent.style
            notes = opponent.notes ?? ""
        }
        isLoading = false
    }

    /// Returns `true` when the opponent was stored, so the sheet only dismisses on success.
    func save() async -> Bool {
        let trimmedName = name.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedName.isEmpty else { return false }

        // isEditing is set from the id the caller passed, so an unparseable one lands here rather
        // than quietly creating a duplicate.
        guard !isEditing || editing != nil else {
            failure = OperationFailure()
            return false
        }

        let rating = rating.map { KotlinDouble(double: $0) }
        do {
            if let id = editing {
                try await service.updateOpponent(
                    id: id,
                    name: trimmedName,
                    club: club.nilIfBlank,
                    rating: rating,
                    handedness: handedness?.kotlin,
                    style: style?.kotlin,
                    notes: notes.nilIfBlank
                )
                analytics.capture(event: "opponent_edited", properties: nil)
            } else {
                _ = try await service.addOpponent(
                    name: trimmedName,
                    club: club.nilIfBlank,
                    rating: rating,
                    handedness: handedness?.kotlin,
                    style: style?.kotlin,
                    notes: notes.nilIfBlank
                )
                analytics.capture(
                    event: "opponent_added",
                    properties: ["has_club": club.nilIfBlank != nil, "has_rating": rating != nil]
                )
            }
            return true
        } catch {
            failure = OperationFailure(error)
            return false
        }
    }
}
