import SwiftUI

/// Locked until the user owns Pro: the same title and hint, with the toggle swapped for the way in.
/// Absent entirely outside Debug and TestFlight.
struct CloudSyncSection: View {
    let onUnlock: () -> Void

    @Environment(CloudSyncModel.self) private var model: CloudSyncModel?

    var body: some View {
        if let model, model.isAvailable, model.isLoaded {
            Section {
                if model.isUnlocked {
                    Toggle(isOn: Binding(get: { model.isEnabled }, set: { model.setEnabled($0) })) { syncLabel }
                        .accessibilityIdentifier("settings.icloudSync")
                    if model.isEnabled {
                        Button(L.settingsIcloudSyncNow) { model.syncNow() }
                            .disabled(model.status == .syncing)
                    }
                } else {
                    syncLabel
                    Button(action: onUnlock) {
                        Label(L.settingsIcloudUnlockPro, systemImage: "crown.fill")
                    }
                }
            } header: {
                Text(L.settingsIcloudSection)
            } footer: {
                // Minute ticks keep "Last synced 2 minutes ago" honest while the screen stays open.
                TimelineView(.everyMinute) { _ in
                    if model.isUnlocked, let text = statusText(model) {
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
