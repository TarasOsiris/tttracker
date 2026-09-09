import SwiftUI

/// The win/loss capsule that fronts every match row.
struct MatchResultBadge: View {
    let text: String
    let isWin: Bool

    var body: some View {
        Text(text)
            .font(.caption.weight(.bold))
            .foregroundStyle(.white)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(isWin ? Color.matchWin : Color.matchLoss, in: .capsule)
    }
}
