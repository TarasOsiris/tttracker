import SwiftUI

extension View {
    /// Pro content, shown as is once Pro is owned. Until then it stays in place but blurred, behind
    /// one button to the paywall: a free user sees the shape of what they would get, drawn from their
    /// own data, rather than an empty promise.
    /// - Parameter caption: one line under the button saying what is behind it.
    func proLocked(_ source: PaywallSource, caption: String? = nil) -> some View {
        modifier(ProLockedModifier(source: source, caption: caption))
    }
}

private struct ProLockedModifier: ViewModifier {
    let source: PaywallSource
    let caption: String?

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
                    VStack(spacing: 10) {
                        Button { showsPaywall = true } label: {
                            // White by hand: inside a List the label's icon takes the accent, which
                            // is the button's own fill, and the crown disappears into it.
                            Label(L.proUnlock, systemImage: "crown.fill")
                                .font(.subheadline.weight(.semibold))
                                .foregroundStyle(.white)
                        }
                        .buttonStyle(.borderedProminent)
                        .buttonBorderShape(.capsule)
                        .accessibilityHint(L.proUpgradeHint)
                        .accessibilityIdentifier("pro.unlock.\(source.rawValue)")

                        if let caption {
                            Text(caption)
                                .font(.footnote.weight(.medium))
                                .foregroundStyle(.secondary)
                                .multilineTextAlignment(.center)
                                .frame(maxWidth: 260)
                        }
                    }
                    // A frosted card, so the caption reads cleanly over the blurred content.
                    .padding(.vertical, 14)
                    .padding(.horizontal, 18)
                    .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
                    .padding(.horizontal)
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
