/// Which match the editor sheet is open on, if any.
enum MatchEditorTarget: Identifiable {
    case new
    case existing(PendingMatch)

    var match: PendingMatch? {
        switch self {
        case .new: nil
        case let .existing(match): match
        }
    }

    var id: String { match?.id ?? "new" }
}
