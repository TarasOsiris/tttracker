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
        VStack(alignment: .leading, spacing: 12) {
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
    let title: String
    let detail: String

    var id: String { title }

    static var all: [ProBenefit] {
        [
            ProBenefit(title: L.proBenefitInsightsTitle, detail: L.proBenefitInsightsDetail),
            ProBenefit(title: L.proBenefitHeadToHeadTitle, detail: L.proBenefitHeadToHeadDetail),
            ProBenefit(title: L.proBenefitHistoryTitle, detail: L.proBenefitHistoryDetail),
            ProBenefit(title: L.proBenefitWidgetsTitle, detail: L.proBenefitWidgetsDetail),
            ProBenefit(title: L.proBenefitExportTitle, detail: L.proBenefitExportDetail),
            ProBenefit(title: L.proBenefitAccentTitle, detail: L.proBenefitAccentDetail),
            ProBenefit(title: L.proBenefitSupportTitle, detail: L.proBenefitSupportDetail),
        ]
    }
}

private struct ProBenefitRow: View {
    let benefit: ProBenefit

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "checkmark")
                .font(.footnote.bold())
                .foregroundStyle(.tint)
                .frame(width: 18)
                .padding(.top, 2)
            VStack(alignment: .leading, spacing: 2) {
                Text(benefit.title)
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(.primary)
                Text(benefit.detail)
                    .font(.footnote)
                    .foregroundStyle(.secondary)
            }
        }
    }
}
