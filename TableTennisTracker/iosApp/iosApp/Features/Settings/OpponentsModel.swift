import Observation
import Shared

@MainActor
@Observable
final class OpponentsModel {
    private(set) var opponents: [Opponent] = []
    private(set) var isLoaded = false

    /// Head-to-head records by opponent id. Pro shows them on the rows.
    private(set) var records: [String: HeadToHead] = [:]

    /// The last action that did not go through, if it has not been dismissed yet.
    var failure: OperationFailure?

    @ObservationIgnored private let service: any OpponentService
    @ObservationIgnored private let analytics: any AnalyticsService
    @ObservationIgnored private let subscriptions = FlowSubscriptions()
    @ObservationIgnored private let writes = SerialWriteQueue()

    init(
        service: any OpponentService = Services.opponents,
        insights: any InsightsService = Services.insights,
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
        subscriptions.insert(
            KotlinFlow.observe(insights.insights, as: TrainingInsights.self) { [weak self] insights in
                self?.records = Dictionary(
                    insights.opponents.map(HeadToHead.init).map { ($0.id, $0) },
                    uniquingKeysWith: { first, _ in first }
                )
            }
        )
    }

    func delete(_ opponent: Opponent) {
        guard let id = opponent.id.kotlinUuid else {
            failure = OperationFailure()
            return
        }
        // The queue takes a failure handler for exactly this: without one a rejected delete was
        // silent, and the row simply reappeared with no explanation.
        writes.enqueue {
            try await self.service.deleteOpponent(id: id)
            self.analytics.capture(event: "opponent_deleted", properties: nil)
        } onFailure: { [weak self] error in
            self?.failure = OperationFailure(error)
        }
    }
}
