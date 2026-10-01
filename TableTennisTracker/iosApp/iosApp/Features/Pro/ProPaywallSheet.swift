import RevenueCat
import RevenueCatUI
import SwiftUI

/// Which affordance opened the paywall, reported with every paywall event.
enum PaywallSource: String, Identifiable {
    case toolbar
    case settingsBanner = "settings_banner"
    case iCloudSync = "icloud_sync"

    var id: String { rawValue }
}

/// The paywall itself is RevenueCat's: designed in their dashboard and fetched at runtime, so copy,
/// layout and pricing change without an app release. This wrapper only reports the funnel and gets
/// out of the way once the entitlement lands.
///
/// No `.interactiveDismissDisabled` — App Review wants an obvious way out of a paywall, and the close
/// button plus swipe-to-dismiss gives two.
struct ProPaywallSheet: View {
    let source: PaywallSource

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        PaywallView(displayCloseButton: true)
            .onPurchaseCompleted { info in
                guard info.hasProAccess else { return }
                capture("pro_purchased")
                dismiss()
            }
            .onRestoreCompleted { info in
                // Fires for every restore attempt, including one that found nothing to restore.
                guard info.hasProAccess else { return }
                capture("pro_restored")
                dismiss()
            }
            .task { capture("paywall_shown") }
    }

    private func capture(_ event: String) {
        Services.analytics.capture(event: event, properties: ["source": source.rawValue])
    }
}
