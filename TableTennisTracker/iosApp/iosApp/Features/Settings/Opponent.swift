import Shared

/// View-facing opponent.
///
/// `:core` now hands out the shared domain model with typed enums, so this only normalises for the
/// UI: blank strings become `nil`, and the id becomes a Swift-friendly `String`.
struct Opponent: Identifiable, Hashable {
    let id: String
    let name: String
    let club: String?
    let rating: Double?
    let handedness: Handed?
    let style: Style?
    let notes: String?

    var initial: String { name.first.map { String($0).uppercased() } ?? "?" }
    var ratingText: String? { rating.map { L.opponentRatingFormat(Int($0)) } }

    var subtitle: String? {
        [club, ratingText].compactMap { $0 }.joined(separator: " • ").nilIfBlank
    }
}

extension Opponent {
    init(_ model: Shared.Opponent) {
        id = model.id.stringId
        name = model.name
        club = model.club?.nilIfBlank
        rating = model.rating?.doubleValue
        handedness = Handed(model.handedness)
        style = Style(model.style)
        notes = model.notes?.nilIfBlank
    }
}
