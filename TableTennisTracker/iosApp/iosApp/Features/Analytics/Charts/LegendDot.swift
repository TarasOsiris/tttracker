import SwiftUI

/// A colour swatch and the series it stands for.
struct LegendDot: View {
    let color: Color
    let label: String

    var body: some View {
        HStack(spacing: 6) {
            Circle().fill(color).frame(width: 10, height: 10)
            Text(label).font(.caption).foregroundStyle(.secondary)
        }
        // The swatch says nothing on its own; the pair is one label.
        .accessibilityElement(children: .combine)
    }
}
