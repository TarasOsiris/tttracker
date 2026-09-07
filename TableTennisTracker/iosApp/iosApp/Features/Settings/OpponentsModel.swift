import Observation
import Shared

@MainActor
@Observable
final class OpponentsModel {
    private(set) var opponents: [Opponent] = []
    private(set) var isLoaded = false

    @ObservationIgnored private let service: any OpponentService
    @ObservationIgnored private let analytics: any AnalyticsService
    @ObservationIgnored private let subscriptions = FlowSubscriptions()
    @ObservationIgnored private let writes = SerialWriteQueue()

    init(
        service: any OpponentService = Services.opponents,
        analytics: any AnalyticsService = Services.analytics
    ) {
        self.service = service
        self.analytics = analytics
        subscriptions.insert(
            KotlinFlow.observe(service.allOpponents, as: [Shared.Opponent].self) { [weak self] rows in
                self?.opponents = rows.map(Opponent.init)
                self?.isLoaded = true
            }
        )
    }

    func delete(_ opponent: Opponent) {
        guard let id = opponent.id.kotlinUuid else { return }
        writes.enqueue {
            try await self.service.deleteOpponent(id: id)
            self.analytics.capture(event: "opponent_deleted", properties: nil)
        }
    }
}

/// Backs both the add and the edit sheet — the fields are identical, only the commit differs.
@MainActor
@Observable
final class OpponentEditorModel {
    var name = ""
    var club = ""
    var rating = ""
    var handedness: Handed?
    var style: Style?
    var notes = ""

    private(set) var isLoading: Bool

    let isEditing: Bool
    var canSave: Bool { !name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }

    @ObservationIgnored private let opponentId: String?
    @ObservationIgnored private let service: any OpponentService
    @ObservationIgnored private let analytics: any AnalyticsService

    init(
        opponentId: String? = nil,
        service: any OpponentService = Services.opponents,
        analytics: any AnalyticsService = Services.analytics
    ) {
        self.opponentId = opponentId
        self.isEditing = opponentId != nil
        self.isLoading = opponentId != nil
        self.service = service
        self.analytics = analytics
    }

    func load() async {
        guard let id = opponentId?.kotlinUuid else {
            isLoading = false
            return
        }
        if let existing = try? await service.getOpponentById(id: id) {
            let opponent = Opponent(existing)
            name = opponent.name
            club = opponent.club ?? ""
            rating = opponent.rating.map { String(Int($0)) } ?? ""
            handedness = opponent.handedness
            style = opponent.style
            notes = opponent.notes ?? ""
        }
        isLoading = false
    }

    func save() async {
        let trimmedName = name.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmedName.isEmpty else { return }

        if let id = opponentId?.kotlinUuid {
            try? await service.updateOpponent(
                id: id,
                name: trimmedName,
                club: club.nilIfBlank,
                rating: rating.nilIfBlank.flatMap(Double.init).map { KotlinDouble(double: $0) },
                handedness: handedness?.kotlin,
                style: style?.kotlin,
                notes: notes.nilIfBlank
            )
            analytics.capture(event: "opponent_edited", properties: nil)
        } else {
            _ = try? await service.addOpponent(
                name: trimmedName,
                club: club.nilIfBlank,
                rating: rating.nilIfBlank.flatMap(Double.init).map { KotlinDouble(double: $0) },
                handedness: handedness?.kotlin,
                style: style?.kotlin,
                notes: notes.nilIfBlank
            )
            analytics.capture(
                event: "opponent_added",
                properties: ["has_club": club.nilIfBlank != nil, "has_rating": rating.nilIfBlank != nil]
            )
        }
    }
}
