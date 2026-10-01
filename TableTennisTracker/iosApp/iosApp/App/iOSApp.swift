import SwiftUI

@main
struct iOSApp: App {
    @Environment(\.scenePhase) private var scenePhase
    @State private var pro = ProModel()
    @State private var cloudSync = CloudSyncModel()

    init() {
        AppBootstrap.ensureInitialised()
        SwiftPurchases.configure()
        WidgetSnapshotWriter.start()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(pro)
                .environment(cloudSync)
                .task {
                    pro.start()
                    cloudSync.start(isUnlocked: pro.isPro)
                }
                .onChange(of: pro.isPro) { _, isPro in cloudSync.setUnlocked(isPro) }
        }
        // The writer debounces, so a session edited and immediately backgrounded could otherwise
        // leave the widgets a beat behind.
        .onChange(of: scenePhase) { _, phase in
            if phase == .background { WidgetSnapshotWriter.shared.flush() }
        }
    }
}
