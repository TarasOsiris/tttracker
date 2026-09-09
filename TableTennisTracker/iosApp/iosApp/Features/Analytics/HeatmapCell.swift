import SwiftUI

/// One day in the heatmap.
struct HeatmapCell: View {
    let day: Date
    let level: Int
    let sessions: Int

    @Environment(\.locale) private var locale

    var body: some View {
        RoundedRectangle(cornerRadius: 3)
            .fill(Color.heatmap(level: level))
            .frame(width: HeatmapSection.cell, height: HeatmapSection.cell)
            // Built from the in-app locale like every other date in the app, and paired with a
            // named value — read as a bare number, "3" said nothing about what was being counted.
            .accessibilityLabel(Text(day, format: .fullDay(locale)))
            .accessibilityValue(Text(L.accessibilitySessionsCount(sessions)))
    }
}
