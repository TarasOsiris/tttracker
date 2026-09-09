import SwiftUI

/// One recorded match, on the session details screen.
struct MatchDetailRow: View {
    let match: MatchItem

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 10) {
                MatchResultBadge(text: match.resultText, isWin: match.isWin)
                Text(match.opponentName)
                Spacer()
                Text(match.scoreText).font(.body.weight(.semibold)).monospacedDigit()
            }
            if !tags.isEmpty {
                HStack(spacing: 6) {
                    ForEach(tags, id: \.self) { tag in
                        Text(tag)
                            .font(.caption)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 3)
                            .background(Color(.tertiarySystemFill), in: .capsule)
                    }
                }
            }
            if let notes = match.notes {
                Text(notes).font(.caption).foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 2)
        // Result, opponent, score and tags describe one match between them.
        .accessibilityElement(children: .combine)
    }

    private var tags: [String] {
        var tags: [String] = []
        if match.isDoubles { tags.append(L.labelDoubles) }
        if match.isRanked { tags.append(L.labelRanked) }
        if let competition = match.competition { tags.append(competition.label) }
        return tags
    }
}
