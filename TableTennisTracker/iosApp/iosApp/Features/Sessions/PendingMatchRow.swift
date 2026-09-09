import SwiftUI

/// One entered match on the session form.
struct PendingMatchRow: View {
    let match: PendingMatch

    var body: some View {
        HStack(spacing: 12) {
            MatchResultBadge(text: match.resultText, isWin: match.isWin)

            VStack(alignment: .leading, spacing: 2) {
                Text(match.opponentName)
                if let notes = match.notes {
                    Text(notes).font(.caption).foregroundStyle(.secondary).lineLimit(2)
                }
            }

            Spacer(minLength: 8)

            Text(match.scoreText).font(.body.weight(.semibold)).monospacedDigit()
        }
        // "W", a name and a score are one result, not three things to swipe between.
        .accessibilityElement(children: .combine)
    }
}
