import Foundation
import RevenueCat

/// Configures RevenueCat at launch. `ProModel` reads the Pro entitlement, `ProPaywallSheet` shows the
/// paywall, and `TipJarModel` sells tips from their own offering.
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
