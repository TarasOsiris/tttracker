import Foundation
import Observation
import RevenueCat

/// Consumable tips, sold through a RevenueCat offering of their own so they never mix with Pro.
/// The section stays hidden until the offering has loaded with something in it.
@MainActor
@Observable
final class TipJarModel {
    struct Tip: Identifiable {
        let package: Package

        var id: String { package.identifier }
        var title: String { package.storeProduct.localizedTitle }
        var price: String { package.localizedPriceString }
    }

    private(set) var tips: [Tip] = []
    private(set) var isPurchasing = false
    var showsThanks = false
    var failure: OperationFailure?

    /// Must match the offering identifier configured in the RevenueCat dashboard.
    static let offering = "tips"

    func load() async {
        guard tips.isEmpty, Purchases.isConfigured else { return }
        guard let offering = try? await Purchases.shared.offerings().offering(identifier: Self.offering) else { return }
        tips = offering.availablePackages
            .sorted { $0.storeProduct.price < $1.storeProduct.price }
            .map(Tip.init)
    }

    func buy(_ tip: Tip) async {
        guard !isPurchasing else { return }
        isPurchasing = true
        defer { isPurchasing = false }
        do {
            let result = try await Purchases.shared.purchase(package: tip.package)
            guard !result.userCancelled else { return }
            showsThanks = true
            Services.analytics.capture(event: "tip_purchased", properties: ["product": tip.package.storeProduct.productIdentifier])
        } catch ErrorCode.purchaseCancelledError {
            return
        } catch {
            failure = OperationFailure(error)
        }
    }
}
