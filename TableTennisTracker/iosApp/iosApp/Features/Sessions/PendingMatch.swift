import Foundation
import Shared

/// A match being entered on the session form, before the session is saved.
///
/// `opponentId` is nil for a name typed freehand — `addSession` creates the opponent row from
/// `opponentName` in that case, which is how the Compose form works too.
struct PendingMatch: Identifiable, Hashable {
    let id: String
    var opponentName: String
    var opponentId: String?
    var myGamesWon: Int
    var opponentGamesWon: Int
    var isDoubles: Bool
    var isRanked: Bool
    var competition: Competition?
    var notes: String?

    var isWin: Bool { myGamesWon > opponentGamesWon }
    var scoreText: String { L.matchScoreFormat(myGamesWon, opponentGamesWon) }
    var resultText: String { isWin ? L.matchWin : L.matchLoss }

    init(
        id: String = UUID().uuidString,
        opponentName: String = "",
        opponentId: String? = nil,
        myGamesWon: Int = 0,
        opponentGamesWon: Int = 0,
        isDoubles: Bool = false,
        isRanked: Bool = false,
        competition: Competition? = nil,
        notes: String? = nil
    ) {
        self.id = id
        self.opponentName = opponentName
        self.opponentId = opponentId
        self.myGamesWon = myGamesWon
        self.opponentGamesWon = opponentGamesWon
        self.isDoubles = isDoubles
        self.isRanked = isRanked
        self.competition = competition
        self.notes = notes
    }
}

extension PendingMatch {
    /// An existing session's match, reopened for editing.
    ///
    /// Carrying `opponentId` matters: saving an edit reinserts every match, and a nil id makes the
    /// repository create a *new* opponent row from the name with no dedupe, so the roster would grow
    /// by one per opponent on every save.
    init(_ match: MatchItem) {
        self.init(
            id: match.id,
            opponentName: match.opponentName,
            opponentId: match.opponentId,
            myGamesWon: match.myGamesWon,
            opponentGamesWon: match.opponentGamesWon,
            isDoubles: match.isDoubles,
            isRanked: match.isRanked,
            competition: match.competition,
            notes: match.notes
        )
    }

    /// Every argument is passed explicitly: `MatchInput`'s four Kotlin defaults do not survive the
    /// Objective-C export.
    var input: MatchInput {
        MatchInput(
            opponentId: opponentId?.kotlinUuid,
            opponentName: opponentName.trimmingCharacters(in: .whitespacesAndNewlines),
            myGamesWon: Int32(myGamesWon),
            opponentGamesWon: Int32(opponentGamesWon),
            isDoubles: isDoubles,
            isRanked: isRanked,
            competitionLevel: competition?.kotlin,
            notes: notes?.nilIfBlank
        )
    }
}
