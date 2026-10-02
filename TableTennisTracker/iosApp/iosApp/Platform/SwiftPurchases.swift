import Foundation
import RevenueCat

/// Configures RevenueCat at launch. `ProModel` reads the Pro entitlement and `ProPaywallSheet` shows
/// the paywall.
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
