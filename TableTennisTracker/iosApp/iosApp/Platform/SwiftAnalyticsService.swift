import Foundation
import PostHog
import Shared

/// PostHog-backed implementation of the shared AnalyticsService.
///
/// Living on the Swift side means the app links PostHog through SwiftPM rather than a Kotlin
/// cinterop binding, and event properties can be sent, which the cinterop bindings could not do.
final class SwiftAnalyticsService: NSObject, AnalyticsService {
    private static let host = "https://eu.i.posthog.com"

    private let isEnabled: Bool

    override init() {
        let apiKey = Bundle.main.object(forInfoDictionaryKey: "POSTHOG_API_KEY") as? String ?? ""
        #if DEBUG
        let shouldEnable = false
        #else
        let shouldEnable = !apiKey.isEmpty
        #endif
        isEnabled = shouldEnable
        super.init()

        if shouldEnable {
            let config = PostHogConfig(apiKey: apiKey, host: Self.host)
            PostHogSDK.shared.setup(config)
        }
    }

    func capture(event: String, properties: [String: Any]?) {
        guard isEnabled else { return }
        PostHogSDK.shared.capture(event, properties: properties)
    }

    func screen(screenName: String, properties: [String: Any]?) {
        guard isEnabled else { return }
        PostHogSDK.shared.screen(screenName, properties: properties)
    }

    func identify(userId: String, properties: [String: Any]?) {
        guard isEnabled else { return }
        PostHogSDK.shared.identify(userId, userProperties: properties)
    }

    func reset() {
        guard isEnabled else { return }
        PostHogSDK.shared.reset()
    }
}
