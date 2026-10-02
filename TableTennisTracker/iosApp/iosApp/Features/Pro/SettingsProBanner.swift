import SwiftUI

/// The Pro upsell card at the top of Settings. Built from the list's own grammar — an accent-tinted
/// surface and checked benefit rows — rather than a full-bleed billboard, so it reads as part of the
/// list it sits in. Solid accent is spent only on the crown and the call to action.
struct SettingsProBanner: View {
    let action: () -> Void

    private static let shape = RoundedRectangle(cornerRadius: 20, style: .continuous)

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 16) {
                header
                benefits
                callToAction
            }
            .padding(16)
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
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }

            Spacer(minLength: 0)
        }
    }

    private var benefits: some View {
        VStack(alignment: .leading, spacing: 9) {
            ForEach(ProBenefit.all) { ProBenefitRow(benefit: $0) }
        }
    }

    private var callToAction: some View {
        HStack(spacing: 6) {
            Text(L.proBannerCta)
                .font(.subheadline.weight(.semibold))
            Image(systemName: "arrow.right")
                .font(.footnote.bold())
        }
        .foregroundStyle(.white)
        .padding(.vertical, 12)
        .frame(maxWidth: .infinity)
        .background(.tint, in: Capsule())
    }
}

/// What Pro includes. Keep it in step with the benefit rows of the paywall designed in RevenueCat;
/// "Support an indie developer" stays last. A new Pro feature adds a row here.
struct ProBenefit: Identifiable {
    let symbol: String
    let title: String
    let detail: String

    var id: String { title }

    static var all: [ProBenefit] {
        [
            ProBenefit(symbol: "flame.fill", title: L.proBenefitInsightsTitle, detail: L.proBenefitInsightsDetail),
            ProBenefit(symbol: "person.2.fill", title: L.proBenefitHeadToHeadTitle, detail: L.proBenefitHeadToHeadDetail),
            ProBenefit(symbol: "chart.bar.fill", title: L.proBenefitHistoryTitle, detail: L.proBenefitHistoryDetail),
            ProBenefit(symbol: "square.grid.2x2.fill", title: L.proBenefitWidgetsTitle, detail: L.proBenefitWidgetsDetail),
            ProBenefit(symbol: "tablecells.fill", title: L.proBenefitExportTitle, detail: L.proBenefitExportDetail),
            ProBenefit(symbol: "paintpalette.fill", title: L.proBenefitAccentTitle, detail: L.proBenefitAccentDetail),
            ProBenefit(symbol: "heart.fill", title: L.proBenefitSupportTitle, detail: L.proBenefitSupportDetail),
        ]
    }
}

/// One line per benefit, so seven of them still leave the free user's Settings readable; the detail
/// line is spoken rather than shown.
private struct ProBenefitRow: View {
    let benefit: ProBenefit

    @ScaledMetric(relativeTo: .subheadline) private var iconWidth = 22

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: benefit.symbol)
                .font(.footnote)
                .foregroundStyle(.tint)
                .frame(width: iconWidth)
            Text(benefit.title)
                .font(.subheadline.weight(.medium))
                .foregroundStyle(.primary)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(Text(verbatim: "\(benefit.title), \(benefit.detail)"))
    }
}
