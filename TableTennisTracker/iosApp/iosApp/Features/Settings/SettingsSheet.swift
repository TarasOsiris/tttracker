import SwiftUI

struct SettingsSheet: View {
    @Binding var path: NavigationPath

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack(path: $path) {
            SettingsScreen()
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .topBarTrailing) {
                        CloseButton(action: dismiss.callAsFunction)
                            .accessibilityIdentifier("settings.close")
                    }
                }
        }
    }
}
