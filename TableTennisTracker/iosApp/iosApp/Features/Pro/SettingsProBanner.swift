import SwiftUI

/// The Pro upsell card at the top of Settings. Built from the list's own grammar — an accent-tinted
/// surface and checked benefit rows — rather than a full-bleed billboard, so it reads as part of the
/// list it sits in. Solid accent is spent only on the crown and the call to action, which shares the
/// header row so the benefits can sit two to a line beneath it.
struct SettingsProBanner: View {
    let action: () -> Void

    private static let shape = RoundedRectangle(cornerRadius: 20, style: .continuous)

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 12) {
                header
                VStack(alignment: .leading, spacing: 8) {
                    benefits
                    ProBenefitRow(benefit: .support)
                }
            }
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(.tint.opacity(0.12), in: Self.shape)
            .overlay { Self.shape.strokeBorder(.tint.opacity(0.22), lineWidth: 1) }
            .contentShape(Self.shape)
        }
        .buttonStyle(.plain)
        .hoverEffect(.highlight)
        .accessibilityElement(children: .combine)
        .accessibilityAddTraits(.isButton)
        .accessibilityHint(L.proUpgradeHint)
        .accessibilityIdentifier("settings.proBanner")
    }

    private var header: some View {
        HStack(spacing: 12) {
            Image(systemName: "crown.fill")
                .font(.subheadline.bold())
                .foregroundStyle(.white)
                .frame(width: 34, height: 34)
                .background(.tint, in: RoundedRectangle(cornerRadius: 10, style: .continuous))

            VStack(alignment: .leading, spacing: 2) {
                Text(L.proBannerTitle)
                    .font(.headline)
                    .foregroundStyle(.primary)
                Text(L.proBannerTagline)
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer(minLength: 0)

            callToAction
        }
    }

    private var benefits: some View {
        LazyVGrid(
            columns: Array(repeating: GridItem(.flexible(), spacing: 8, alignment: .leading), count: 2),
            alignment: .leading,
            spacing: 8
        ) {
            ForEach(ProBenefit.features) { ProBenefitRow(benefit: $0) }
        }
    }

    private var callToAction: some View {
        Text(L.proBannerCta)
            .font(.subheadline.weight(.semibold))
            .foregroundStyle(.white)
            .padding(.horizontal, 14)
            .padding(.vertical, 7)
            .background(.tint, in: Capsule())
            .fixedSize()
    }
}

/// What Pro includes. Keep it in step with the benefit rows of the paywall designed in RevenueCat;
/// "Support an indie developer" stays last. A new Pro feature adds a row here.
struct ProBenefit: Identifiable {
    let symbol: String
    let title: String
    let detail: String

    var id: String { title }

    static var all: [ProBenefit] { features + [support] }

    /// What Pro unlocks, as opposed to why to buy it — the banner sets these two to a line.
    static var features: [ProBenefit] {
        [
            ProBenefit(symbol: "flame.fill", title: L.proBenefitInsightsTitle, detail: L.proBenefitInsightsDetail),
            ProBenefit(symbol: "person.2.fill", title: L.proBenefitHeadToHeadTitle, detail: L.proBenefitHeadToHeadDetail),
            ProBenefit(symbol: "chart.bar.fill", title: L.proBenefitHistoryTitle, detail: L.proBenefitHistoryDetail),
            ProBenefit(symbol: "square.grid.2x2.fill", title: L.proBenefitWidgetsTitle, detail: L.proBenefitWidgetsDetail),
            ProBenefit(symbol: "tablecells.fill", title: L.proBenefitExportTitle, detail: L.proBenefitExportDetail),
            ProBenefit(symbol: "paintpalette.fill", title: L.proBenefitAccentTitle, detail: L.proBenefitAccentDetail),
        ]
    }

    static var support: ProBenefit {
        ProBenefit(symbol: "heart.fill", title: L.proBenefitSupportTitle, detail: L.proBenefitSupportDetail)
    }
}

/// A glyph and a short title, two to a line, so seven of them still leave the free user's Settings
/// readable; the detail line is spoken rather than shown.
private struct ProBenefitRow: View {
    let benefit: ProBenefit

    @ScaledMetric(relativeTo: .footnote) private var iconWidth = 18

    var body: some View {
        HStack(alignment: .firstTextBaseline, spacing: 6) {
            Image(systemName: benefit.symbol)
                .font(.caption)
                .foregroundStyle(.tint)
                .frame(width: iconWidth)
            Text(benefit.title)
                .font(.footnote.weight(.medium))
                .foregroundStyle(.primary)
                .fixedSize(horizontal: false, vertical: true)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(Text(verbatim: "\(benefit.title), \(benefit.detail)"))
    }
}
