import SwiftUI

@main
struct iOSApp: App {
    init() {
        AppBootstrap.ensureInitialised()
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
