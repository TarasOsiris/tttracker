/// Which opponent the editor sheet is open on, if any.
enum OpponentEditorTarget: Identifiable {
    case new
    case existing(String)

    var opponentId: String? {
        switch self {
        case .new: nil
        case .existing(let id): id
        }
    }

    var id: String { opponentId ?? "new" }
}
