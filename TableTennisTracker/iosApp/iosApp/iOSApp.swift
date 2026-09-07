import SwiftUI
import Shared

@main
struct iOSApp: App {
    init() {
        IosEntryPointKt.doInitApp(
            analyticsService: SwiftAnalyticsService(),
            crashReporter: SwiftCrashReporter()
        )
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
