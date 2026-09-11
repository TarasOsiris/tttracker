import SwiftUI
import WidgetKit

@main
struct TTWidgetsBundle: WidgetBundle {
    init() {
        // Before any configuration is built, so the gallery names below come out in the app's
        // language rather than the device's.
        WidgetStore.read()?.applyLocalization()
    }

    var body: some Widget {
        SummaryWidget()
        HeatmapWidget()
        LastSessionWidget()
        AddSessionControl()
    }
}

/// Timeline kinds. Stable strings: changing one orphans every widget a user has placed.
enum WidgetKind {
    static let summary = "xyz.tleskiv.tt.widget.summary"
    static let heatmap = "xyz.tleskiv.tt.widget.heatmap"
    static let lastSession = "xyz.tleskiv.tt.widget.lastSession"
    static let addSession = "xyz.tleskiv.tt.control.addSession"
}
