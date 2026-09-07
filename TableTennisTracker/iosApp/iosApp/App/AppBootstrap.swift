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

/// Chooses between the Compose UI and the native shell.
///
/// `SWIFT_ACTIVE_COMPILATION_CONDITIONS` defines `DEBUG` only in the Debug configuration, which
/// `/ship` never archives, so in a Release build this returns a compile-time `false` and
/// `ContentView` does not mention `RootTabView` at all. The native UI is therefore **unreachable**
/// in the App Store binary — there is no flag, defaults key or launch argument that can reach it.
///
/// Unreachable, not absent: SwiftUI view bodies are not fully dead-stripped, so some of the native
/// screens still compile into the Release binary as orphaned code. If that ever matters — for
/// binary size once every screen is ported, say — the fix is to wrap each native UI file in
/// `#if DEBUG`, not to change this switch.
enum UIShell {
    #if DEBUG
    private static let defaultsKey = "nativeUIEnabled"
    #endif

    static var useNative: Bool {
        #if DEBUG
        let arguments = ProcessInfo.processInfo.arguments
        if arguments.contains("-nativeUI") { return true }
        if arguments.contains("-composeUI") { return false }
        return UserDefaults.standard.bool(forKey: defaultsKey)
        #else
        return false
        #endif
    }
}
