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
