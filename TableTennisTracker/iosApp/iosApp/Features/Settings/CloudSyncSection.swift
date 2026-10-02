import SwiftUI

struct CloudSyncSection: View {
    @Environment(CloudSyncModel.self) private var model: CloudSyncModel?

    var body: some View {
        if let model, model.isLoaded {
            Section {
                Toggle(isOn: Binding(get: { model.isEnabled }, set: { model.setEnabled($0) })) { syncLabel }
                    .accessibilityIdentifier("settings.icloudSync")
                if model.isEnabled {
                    Button(L.settingsIcloudSyncNow) { model.syncNow() }
                        .disabled(model.status == .syncing)
                }
            } header: {
                Text(L.settingsIcloudSection)
            } footer: {
                // Minute ticks keep "Last synced 2 minutes ago" honest while the screen stays open.
                TimelineView(.everyMinute) { _ in
                    if let text = statusText(model) {
                        Text(text)
                    }
                }
            }
        }
    }

    private var syncLabel: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(L.settingsIcloudSync)
            Text(L.settingsIcloudSyncHint)
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
    }

    private func statusText(_ model: CloudSyncModel) -> String? {
        switch model.status {
        case .idle:
            return model.isEnabled ? L.settingsIcloudWaiting : nil
        case .syncing:
            return L.settingsIcloudSyncing
        case .synced(let date):
            return L.settingsIcloudLastSynced(date.formatted(.relative(presentation: .named)))
        case .failed(.noAccount):
            return L.settingsIcloudNoAccount
        case .failed(.quotaExceeded):
            return L.settingsIcloudQuotaExceeded
        case .failed(.other):
            return L.settingsIcloudFailed
        case .turnedOffRemotely:
            return L.settingsIcloudTurnedOff
        case .accountChanged:
            return L.settingsIcloudAccountChanged
        }
    }
}
