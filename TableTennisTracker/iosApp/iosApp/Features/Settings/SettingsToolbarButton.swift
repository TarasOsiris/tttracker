import SwiftUI

extension EnvironmentValues {
    /// Whether the Settings sheet is up. `RootTabView` hosts it above the tabs; a binding rather than
    /// a closure, which `@Entry` cannot compare and would invalidate every reader on each update.
    @Entry var showsSettings: Binding<Bool> = .constant(false)
}

extension View {
    /// The gear at the trailing edge of a tab's root toolbar.
    ///
    /// `.primaryAction`, not `.topBarTrailing`: a trailing item added after the screen's own would
    /// land to their left instead of rightmost.
    func settingsToolbarButton() -> some View { modifier(SettingsToolbarModifier()) }
}

private struct SettingsToolbarModifier: ViewModifier {
    @Environment(\.showsSettings) private var showsSettings

    func body(content: Content) -> some View {
        content
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button(L.navSettings, systemImage: "gearshape") { showsSettings.wrappedValue = true }
                        .accessibilityIdentifier("settings.toolbar")
                }
            }
    }
}
