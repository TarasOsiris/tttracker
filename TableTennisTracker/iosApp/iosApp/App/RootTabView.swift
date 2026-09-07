import SwiftUI

enum AppTab: Hashable {
    case sessions, analytics, settings
}

/// The native app shell.
///
/// Each tab keeps its own navigation path across tab switches, which matches the Compose behaviour.
/// What is deliberately *not* reproduced is `TopLevelBackStack`'s most-recently-visited tab history:
/// that exists so Android's global back button has somewhere to go from a tab's root, and iOS has no
/// equivalent gesture — simulating it would make the edge-swipe jump between tabs.
struct RootTabView: View {
    @State private var selection: AppTab = .sessions
    @State private var sessionsPath = NavigationPath()
    @State private var analyticsPath = NavigationPath()
    @State private var settingsPath = NavigationPath()

    @State private var localization = LocalizationController.shared
    @State private var appearance = AppearanceModel()

    var body: some View {
        TabView(selection: tabSelection) {
            Tab(L.navSessions, systemImage: "figure.table.tennis", value: AppTab.sessions) {
                NavigationStack(path: $sessionsPath) {
                    ComingSoonView(title: L.navSessions)
                }
            }
            Tab(L.navAnalytics, systemImage: "chart.bar.xaxis", value: AppTab.analytics) {
                NavigationStack(path: $analyticsPath) {
                    ComingSoonView(title: L.navAnalytics)
                }
            }
            Tab(L.navSettings, systemImage: "gearshape", value: AppTab.settings) {
                NavigationStack(path: $settingsPath) {
                    SettingsScreen()
                }
            }
        }
        .environment(\.locale, localization.locale)
        .environment(\.layoutDirection, layoutDirection)
        .preferredColorScheme(appearance.themeMode.colorScheme)
        .id(localization.generation)
    }

    /// Arabic needs an explicit flip: overriding `\.locale` alone does not change layout direction.
    private var layoutDirection: LayoutDirection {
        Locale.Language(identifier: localization.locale.identifier).characterDirection == .rightToLeft
            ? .rightToLeft
            : .leftToRight
    }

    /// Re-tapping the active tab pops it to root — the iOS idiom that replaces Android's back button.
    private var tabSelection: Binding<AppTab> {
        Binding(
            get: { selection },
            set: { tapped in
                guard tapped == selection else {
                    selection = tapped
                    return
                }
                switch tapped {
                case .sessions: sessionsPath = NavigationPath()
                case .analytics: analyticsPath = NavigationPath()
                case .settings: settingsPath = NavigationPath()
                }
            }
        )
    }
}

/// Placeholder for the tabs that have not been ported yet. The Compose UI cannot be embedded per
/// tab — `MainViewController()` renders the whole app including its own tab bar.
struct ComingSoonView: View {
    let title: String

    var body: some View {
        ContentUnavailableView(title, systemImage: "hammer", description: Text(verbatim: "Not ported yet"))
            .navigationTitle(title)
    }
}
