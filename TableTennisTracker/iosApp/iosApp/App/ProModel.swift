import Observation
import RevenueCat

/// Whether to sell Pro, and whether the user already owns it, for every Pro affordance and for
/// iCloud sync. The one place "is Pro" is read from RevenueCat, so the toolbar, Settings and sync
/// cannot disagree.
@MainActor
@Observable
final class ProModel {

    enum RestoreResult: Identifiable {
        case restored, nothingToRestore, failed

        var id: Self { self }

        var title: String {
            switch self {
            case .restored: L.proRestoreSuccess
            case .nothingToRestore: L.proRestoreNothing
            case .failed: L.proRestoreFailed
            }
        }
    }

    /// Pro is sold only where its features exist. iCloud sync is the only one, and it ships to Debug
    /// and TestFlight alone, so an App Store install is offered nothing.
    let isOffered = SandboxDistribution.isActive

    private(set) var isPro = false
    private(set) var isRestoring = false
    var restoreResult: RestoreResult?

    var showsUpsell: Bool { isOffered && !isPro }

    @ObservationIgnored private var observation: Task<Void, Never>?

    func start() {
        guard isOffered, observation == nil, Purchases.isConfigured else { return }
        // Seeded from RevenueCat's on-disk cache, so a returning buyer does not see the free tier for
        // the frames before the first network call lands.
        apply(Purchases.shared.cachedCustomerInfo)
        observation = Task { [weak self] in
            for await info in Purchases.shared.customerInfoStream {
                self?.apply(info)
            }
        }
    }

    /// A nil cache is "not known yet", not "not entitled" — leave the value alone.
    private func apply(_ info: CustomerInfo?) {
        guard let info else { return }
        isPro = info.hasProAccess
    }

    /// The restored entitlement reaches `isPro` through the customer-info stream like any other
    /// update; the result here only picks the alert.
    func restore() async {
        guard !isRestoring, Purchases.isConfigured else { return }
        isRestoring = true
        defer { isRestoring = false }
        do {
            let info = try await Purchases.shared.restorePurchases()
            restoreResult = info.hasProAccess ? .restored : .nothingToRestore
        } catch {
            restoreResult = .failed
        }
    }
}

enum ProEntitlement {
    /// Must match the entitlement identifier configured in the RevenueCat dashboard.
    static let id = "nineva_studios_tt_tracker_pro"
}

extension CustomerInfo {
    var hasProAccess: Bool { entitlements[ProEntitlement.id]?.isActive == true }
}
