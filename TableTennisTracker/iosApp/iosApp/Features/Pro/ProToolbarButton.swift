import SwiftUI

extension View {
    /// The PRO pill at the leading edge of a tab's root toolbar, and the paywall it opens. Shown only
    /// while Pro is for sale and not yet owned, so the toolbar never keeps an empty slot for it.
    func proToolbarButton() -> some View { modifier(ProToolbarModifier()) }
}

private struct ProToolbarModifier: ViewModifier {
    /// Optional, so a preview or test that never injects one simply shows no pill.
    @Environment(ProModel.self) private var pro: ProModel?
    @State private var showsPaywall = false

    func body(content: Content) -> some View {
        content
            .toolbar {
                if pro?.showsUpsell == true {
                    ToolbarItem(placement: .topBarLeading) {
                        ProToolbarButton { showsPaywall = true }
                    }
                }
            }
            .sheet(isPresented: $showsPaywall) { ProPaywallSheet(source: .toolbar) }
    }
}

/// On iOS 26 the prominent glass style supplies the pill; earlier systems get an accent capsule. The
/// crown is a size up from the `caption2` label: at parity the short, wide glyph reads as a smudge.
private struct ProToolbarButton: View {
    let action: () -> Void

    var body: some View {
        if #available(iOS 26.0, *) {
            Button(action: action) { label }
                .buttonStyle(.glassProminent)
                .tint(.accentColor)
                .foregroundStyle(.white)
                .accessibilityHint(L.proUpgradeHint)
        } else {
            Button(action: action) {
                label
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .foregroundStyle(.white)
                    .background(Color.accentColor, in: Capsule())
            }
            .buttonStyle(.plain)
            .accessibilityHint(L.proUpgradeHint)
        }
    }

    /// An `HStack`, not a `Label`: the toolbar forces icon-only on labels, whatever their style.
    private var label: some View {
        HStack(spacing: 4) {
            Image(systemName: "crown.fill")
                .font(.callout)
            Text(L.proToolbarButton)
                .font(.caption2.bold())
        }
        .accessibilityElement(children: .combine)
        .accessibilityIdentifier("pro.toolbar")
    }
}
