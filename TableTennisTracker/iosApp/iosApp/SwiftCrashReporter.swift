import Foundation
import Sentry
import Shared

/// Sentry-backed implementation of the shared CrashReporter.
///
/// Sentry lives on the Swift side so the Kotlin framework links no Apple SDKs of its own and can
/// therefore be built and linked standalone, outside an Xcode build.
final class SwiftCrashReporter: NSObject, CrashReporter {
    private var initialized = false

    func start(dsn: String, userId: String) {
        guard !initialized, !dsn.isEmpty else { return }
        SentrySDK.start { options in
            options.dsn = dsn
        }
        SentrySDK.setUser(User(userId: userId))
        initialized = true
    }
}
