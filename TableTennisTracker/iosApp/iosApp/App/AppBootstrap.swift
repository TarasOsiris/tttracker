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
