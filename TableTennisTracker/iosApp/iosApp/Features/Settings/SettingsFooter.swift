import SwiftUI

/// Version and attribution at the bottom of the settings list.
struct SettingsFooter: View {
    let versionName: String
    let buildNumber: String

    var body: some View {
        Section {
            VStack(spacing: 4) {
                Text(L.settingsVersionFormat(versionName, buildNumber))
                Text("\(L.settingsMadeWithPrefix) \(L.settingsCompanyName)")
            }
            .font(.footnote)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity)
            .listRowBackground(Color.clear)
            .accessibilityElement(children: .combine)
        }
    }
}
