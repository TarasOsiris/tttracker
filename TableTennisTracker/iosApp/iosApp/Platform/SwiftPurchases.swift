import Foundation
import RevenueCat

/// Configures RevenueCat at launch. `ProModel` reads the Pro entitlement and `ProPaywallSheet` shows
/// the paywall.
enum SwiftPurchases {
    /// RevenueCat is never configured in Debug builds or under XCTest; `ProModel` then counts the
    /// user as Pro. Nothing may touch `Purchases.shared` while this is false.
    static let isEnabled: Bool = {
        #if DEBUG
        return false
        #else
        let environment = ProcessInfo.processInfo.environment
        return NSClassFromString("XCTestCase") == nil && environment["XCTestConfigurationFilePath"] == nil
        #endif
    }()

    static func configure() {
        guard isEnabled, !Purchases.isConfigured else { return }
        let apiKey = Bundle.main.object(forInfoDictionaryKey: "REVENUECAT_API_KEY") as? String ?? ""
        guard !apiKey.isEmpty else { return }

        Purchases.logLevel = .warn
        Purchases.configure(with: Configuration.Builder(withAPIKey: apiKey).build())
    }

    /// The id RevenueCat knows this user by, which is what support looks a customer up with. Nil
    /// when the SDK is not configured, as in a Debug build or one without an API key.
    static var appUserID: String? { isEnabled && Purchases.isConfigured ? Purchases.shared.appUserID : nil }
}
