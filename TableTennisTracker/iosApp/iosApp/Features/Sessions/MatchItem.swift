import Shared

/// One match played within a session.
struct MatchItem: Identifiable, Hashable {
    let id: String
    let opponentId: String
    let opponentName: String
    let myGamesWon: Int
    let opponentGamesWon: Int
    let isDoubles: Bool
    let isRanked: Bool
    let competition: Competition?
    let rpe: Int?
    let notes: String?

    var isWin: Bool { myGamesWon > opponentGamesWon }
    var scoreText: String { L.matchScoreFormat(myGamesWon, opponentGamesWon) }
    var resultText: String { isWin ? L.matchWin : L.matchLoss }
}

extension MatchItem {
    init(_ model: Shared.Match) {
        id = model.id.stringId
        opponentId = model.opponent.id.stringId
        opponentName = model.opponent.name
        myGamesWon = Int(model.myGamesWon)
        opponentGamesWon = Int(model.opponentGamesWon)
        isDoubles = model.isDoubles
        isRanked = model.isRanked
        competition = Competition(model.competitionLevel)
        rpe = model.rpe?.intValue
        notes = model.notes?.nilIfBlank
    }
}
