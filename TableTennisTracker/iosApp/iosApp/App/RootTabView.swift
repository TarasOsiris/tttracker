import SwiftUI

enum AppTab: Hashable {
    case sessions, analytics, settings
}

/// The native app shell.
///
/// Each tab keeps its own place across tab switches — a path, or for Sessions the selected id it
/// navigates by in either of its layouts — which matches the Compose behaviour.
/// What is deliberately *not* reproduced is `TopLevelBackStack`'s most-recently-visited tab history:
/// that exists so Android's global back button has somewhere to go from a tab's root, and iOS has no
/// equivalent gesture — simulating it would make the edge-swipe jump between tabs.
struct RootTabView: View {
    @State private var selection: AppTab = .sessions
    @State private var selectedSession: String?
    @State private var newSession: NewSessionTarget?
    @State private var analyticsPath = NavigationPath()
    @State private var settingsPath = NavigationPath()

    @State private var localization = LocalizationController.shared
    @StateModel private var appearance = AppearanceModel()

    var body: some View {
        TabView(selection: tabSelection) {
            Tab(L.navSessions, systemImage: "figure.table.tennis", value: AppTab.sessions) {
                SessionsTab(selectedSession: $selectedSession, newSession: $newSession)
            }
            .accessibilityIdentifier("tab.sessions")
            Tab(L.navAnalytics, systemImage: "chart.bar.xaxis", value: AppTab.analytics) {
                NavigationStack(path: $analyticsPath) {
                    AnalyticsScreen()
                }
            }
            .accessibilityIdentifier("tab.analytics")
            Tab(L.navSettings, systemImage: "gearshape", value: AppTab.settings) {
                SettingsTab(path: $settingsPath)
            }
            .accessibilityIdentifier("tab.settings")
        }
        .onOpenURL(perform: open)
        .environment(\.locale, localization.locale)
        .environment(\.layoutDirection, layoutDirection)
        .preferredColorScheme(appearance.themeMode.colorScheme)
        .id(localization.generation)
    }

    /// Where a widget tap lands. The scheme is `tttracker://`, and the host names the tab:
    /// `analytics`, `sessions/<id>` for one session, `sessions/new` to start logging one.
    private func open(_ url: URL) {
        guard url.scheme == DeepLink.scheme else { return }
        let path = url.pathComponents.filter { $0 != "/" }
        switch (url.host(), path.first) {
        case ("analytics", _):
            selection = .analytics
            analyticsPath = NavigationPath()
        case ("sessions", "new"):
            selection = .sessions
            selectedSession = nil
            newSession = NewSessionTarget(day: Calendar.gregorian.startOfDay(for: .now))
        case ("sessions", let id?):
            selection = .sessions
            selectedSession = id
        case ("sessions", nil):
            selection = .sessions
            selectedSession = nil
        default:
            break
        }
    }

    /// Arabic needs an explicit flip: overriding `\.locale` alone does not change layout direction.
    private var layoutDirection: LayoutDirection {
        Locale.Language(identifier: localization.locale.identifier).characterDirection == .rightToLeft
            ? .rightToLeft
            : .leftToRight
    }

    /// Re-tapping the active tab returns it to its root — the iOS idiom that replaces Android's
    /// back button. Sessions navigates by a selected id rather than a path, so clearing that is
    /// what "root" means there, in both the stack and the split layout.
    private var tabSelection: Binding<AppTab> {
        Binding(
            get: { selection },
            set: { tapped in
                guard tapped == selection else {
                    selection = tapped
                    return
                }
                switch tapped {
                case .sessions: selectedSession = nil
                case .analytics: analyticsPath = NavigationPath()
                case .settings: settingsPath = NavigationPath()
                }
            }
        )
    }
}
