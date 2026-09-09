import SwiftUI

/// The "less → more" shading key under the heatmap.
struct HeatmapLegend: View {
    var body: some View {
        HStack(spacing: 3) {
            Text(L.analyticsHeatmapLess).font(.caption).foregroundStyle(.secondary)
            ForEach(0...4, id: \.self) { level in
                RoundedRectangle(cornerRadius: 3)
                    .fill(Color.heatmap(level: level))
                    .frame(width: HeatmapSection.cell, height: HeatmapSection.cell)
            }
            Text(L.analyticsHeatmapMore).font(.caption).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, alignment: .trailing)
        // A key, not five values to swipe through.
        .accessibilityElement(children: .combine)
    }
}
