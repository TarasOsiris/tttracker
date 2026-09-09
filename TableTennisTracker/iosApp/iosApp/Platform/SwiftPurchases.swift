import Foundation
import RevenueCat

/// Configures RevenueCat at launch. Nothing else reads the SDK yet — it is here so the dashboard
/// reports active users; entitlements, offerings and paywalls are not wired up.
enum SwiftPurchases {
    static func configure() {
        guard !Purchases.isConfigured else { return }
        let apiKey = Bundle.main.object(forInfoDictionaryKey: "REVENUECAT_API_KEY") as? String ?? ""
        guard !apiKey.isEmpty else { return }

        #if DEBUG
        Purchases.logLevel = .debug
        #else
        Purchases.logLevel = .warn
        #endif
        Purchases.configure(with: Configuration.Builder(withAPIKey: apiKey).build())
    }
}
