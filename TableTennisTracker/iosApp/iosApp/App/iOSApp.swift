import SwiftUI

@main
struct iOSApp: App {
    init() {
        AppBootstrap.ensureInitialised()
        SwiftPurchases.configure()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
