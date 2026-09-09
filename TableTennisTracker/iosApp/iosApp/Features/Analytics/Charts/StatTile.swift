import SwiftUI

/// One headline number with a caption.
///
/// The value arrives as a `Text` rather than a `String` so it can carry a format style that
/// resolves against the app's locale — see `Formatting.swift`.
struct StatTile: View {
    let emoji: String
    let value: Text
    let label: String
    var tint: Color?

    var body: some View {
        VStack(spacing: 4) {
            // Decorative: "🏓" reads as "table tennis paddle and ball", which says nothing the
            // label below does not say better.
            Text(emoji).accessibilityHidden(true)
            value.font(.title3).bold().foregroundStyle(tint ?? .primary)
            Text(label).font(.caption).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 8)
        .background(Color(.secondarySystemGroupedBackground), in: .rect(cornerRadius: 12))
        // One tile is one fact; read as three elements it announces a bare number with no name.
        .accessibilityElement(children: .combine)
        .accessibilityLabel(label)
        .accessibilityValue(value)
    }
}
