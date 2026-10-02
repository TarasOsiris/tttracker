import SwiftUI

extension View {
    /// Pro content, shown as is once Pro is owned. Until then it stays in place but blurred, behind
    /// one button to the paywall: a free user sees the shape of what they would get, drawn from their
    /// own data, rather than an empty promise.
    func proLocked(_ source: PaywallSource) -> some View { modifier(ProLockedModifier(source: source)) }
}

private struct ProLockedModifier: ViewModifier {
    let source: PaywallSource

    @Environment(ProModel.self) private var pro: ProModel?
    @State private var showsPaywall = false

    func body(content: Content) -> some View {
        if pro?.hasProFeatures == true {
            content
        } else {
            content
                .blur(radius: 7, opaque: false)
                .clipped()
                .allowsHitTesting(false)
                // Blurred numbers are noise to VoiceOver; the button says what is here.
                .accessibilityHidden(true)
                .overlay {
                    Button { showsPaywall = true } label: {
                        Label(L.proUnlock, systemImage: "crown.fill")
                            .font(.subheadline.weight(.semibold))
                    }
                    .buttonStyle(.borderedProminent)
                    .buttonBorderShape(.capsule)
                    .accessibilityHint(L.proUpgradeHint)
                    .accessibilityIdentifier("pro.unlock.\(source.rawValue)")
                }
                .sheet(isPresented: $showsPaywall) { ProPaywallSheet(source: source) }
        }
    }
}

/// A small crown marking a row that leads to a Pro feature, for rows that cannot be blurred.
struct ProBadge: View {
    var body: some View {
        Image(systemName: "crown.fill")
            .font(.footnote)
            .foregroundStyle(.tint)
            .accessibilityLabel(L.proToolbarButton)
    }
}
