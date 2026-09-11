import SwiftUI

@main
struct iOSApp: App {
    @Environment(\.scenePhase) private var scenePhase

    init() {
        AppBootstrap.ensureInitialised()
        SwiftPurchases.configure()
        WidgetSnapshotWriter.start()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        // The writer debounces, so a session edited and immediately backgrounded could otherwise
        // leave the widgets a beat behind.
        .onChange(of: scenePhase) { _, phase in
            if phase == .background { WidgetSnapshotWriter.shared.flush() }
        }
    }
}
