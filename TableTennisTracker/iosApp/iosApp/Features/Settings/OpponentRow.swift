import SwiftUI

/// One opponent in the roster.
struct OpponentRow: View {
    let opponent: Opponent

    /// The initial's badge grows with the user's text size rather than clipping the letter inside
    /// a fixed 40pt circle.
    @ScaledMetric(relativeTo: .headline) private var badgeSize = 40

    var body: some View {
        HStack(spacing: 12) {
            Text(opponent.initial)
                .font(.headline)
                .foregroundStyle(.white)
                .frame(minWidth: badgeSize, minHeight: badgeSize)
                .background(Color.accentColor, in: .circle)
                // It is the first letter of the name below it, not a fact of its own.
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                Text(opponent.name)
                if let subtitle = opponent.subtitle {
                    Text(subtitle).font(.subheadline).foregroundStyle(.secondary)
                }
                if let notes = opponent.notes {
                    Text(notes).font(.footnote).foregroundStyle(.secondary).lineLimit(2)
                }
            }
        }
        .accessibilityElement(children: .combine)
    }
}
