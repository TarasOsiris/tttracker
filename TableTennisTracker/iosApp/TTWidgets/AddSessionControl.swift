import AppIntents
import SwiftUI
import WidgetKit

/// A Control Center / Lock Screen button that opens the app straight into the create sheet.
struct AddSessionControl: ControlWidget {
    var body: some ControlWidgetConfiguration {
        StaticControlConfiguration(kind: WidgetKind.addSession) {
            ControlWidgetButton(action: AddSessionIntent()) {
                Label(L.widgetAddSessionName, systemImage: "plus")
            }
        }
        .displayName(LocalizedStringResource("widget_add_session_name", table: Localization.table))
        .description(LocalizedStringResource("widget_add_session_description", table: Localization.table))
    }
}

/// Opens the app rather than doing the work in-process: logging a session needs the form, and the
/// extension cannot reach the database.
struct AddSessionIntent: AppIntent {
    static var title = LocalizedStringResource("widget_add_session_name", table: Localization.table)
    static var openAppWhenRun = true

    func perform() async throws -> some IntentResult & OpensIntent {
        .result(opensIntent: OpenURLIntent(DeepLink.newSession))
    }
}
