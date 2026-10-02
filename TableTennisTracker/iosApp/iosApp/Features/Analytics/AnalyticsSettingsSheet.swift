import SwiftUI

/// Which cards the analytics screen shows, and in what order. The list stays in edit mode so the
/// drag handles are always there, the way Reminders lays out its own list settings.
struct AnalyticsSettingsSheet: View {
    let model: AnalyticsModel

    @Environment(\.dismiss) private var dismiss
    @Environment(ProModel.self) private var pro: ProModel?

    var body: some View {
        NavigationStack {
            List {
                Section {
                    ForEach(model.cards.value) { setting in
                        row(for: setting.card)
                            .accessibilityIdentifier("analytics.card.\(setting.card.rawValue)")
                    }
                    .onMove(perform: model.moveCards)
                } footer: {
                    Text(L.analyticsWidgetsReorderHint)
                }
            }
            .environment(\.editMode, .constant(.active))
            .navigationTitle(L.analyticsSettingsTitle)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(L.actionClose, action: dismiss.callAsFunction)
                }
            }
        }
        .presentationDetents([.medium, .large])
    }

    /// Without Pro an insight is part of the locked preview, which has no off switch; it can still
    /// be moved, and the preview moves with it.
    @ViewBuilder private func row(for card: AnalyticsCard) -> some View {
        if card.isInsight && pro?.hasProFeatures != true {
            LabeledContent(card.label) { ProBadge() }
        } else {
            Toggle(card.label, isOn: model.isVisible(card))
        }
    }
}
