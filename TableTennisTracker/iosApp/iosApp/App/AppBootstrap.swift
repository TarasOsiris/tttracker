import Foundation
import Shared

/// One-time startup, shared by the app and by SwiftUI previews (which never run `iOSApp.init`).
enum AppBootstrap {
    private static let analytics = SwiftAnalyticsService()
    private static let crashReporter = SwiftCrashReporter()

    static func ensureInitialised() {
        // doInitApp is idempotent on the Kotlin side, so calling this from a preview is safe.
        IosEntryPointKt.doInitApp(analyticsService: analytics, crashReporter: crashReporter)
        #if DEBUG
        KotlinEnumParity.assertMirrorsAreComplete()
        #endif
    }
}

/// Chooses between the native shell and the Compose UI.
///
/// The native shell is the default on every configuration, App Store builds included. The Compose
/// UI is still built and still reachable, because the two are compared side by side while the
/// remaining tabs are ported — but only through a launch argument or a defaults key, neither of
/// which a device build can reach on its own.
enum UIShell {
    private static let defaultsKey = "composeUIEnabled"

    static var useNative: Bool {
        let arguments = ProcessInfo.processInfo.arguments
        if arguments.contains("-nativeUI") { return true }
        if arguments.contains("-composeUI") { return false }
        return !UserDefaults.standard.bool(forKey: defaultsKey)
    }
}
