import SwiftUI

enum AppTab: Hashable {
    case sessions, analytics
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
    @State private var showsPaywall = false
    @State private var showsSettings = false
    @State private var settingsPath = NavigationPath()
    @State private var pendingLink: URL?

    @Environment(ProModel.self) private var pro: ProModel?

    @State private var localization = LocalizationController.shared
    @StateModel private var appearance = AppearanceModel()

    /// The accent is Pro. Losing Pro puts the default back on screen without forgetting the choice,
    /// so a restored purchase brings it back.
    private var accent: Color? { pro?.hasProFeatures == true ? appearance.accent.color : nil }

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
        }
        .onOpenURL(perform: handle)
        .sheet(isPresented: $showsPaywall) { ProPaywallSheet(source: .widget) }
        .environment(\.showsSettings, $showsSettings)
        .modifier(appEnvironment)
        // Outside the `.id` below: a language picked in General rebuilds the tabs, and a sheet
        // hosted inside them would close under the user's finger. The sheet rebuilds itself instead,
        // and keeps its place because the path lives up here.
        .sheet(isPresented: $showsSettings, onDismiss: settingsDidDismiss) {
            SettingsSheet(path: $settingsPath).modifier(appEnvironment)
        }
    }

    /// A widget tapped while Settings is up: the sheet would cover whatever the link changes and
    /// block any sheet it presents, so it closes first and the link follows once it has gone.
    private func handle(_ url: URL) {
        guard showsSettings else { return open(url) }
        pendingLink = url
        showsSettings = false
    }

    private func settingsDidDismiss() {
        settingsPath = NavigationPath()
        if let pendingLink {
            self.pendingLink = nil
            open(pendingLink)
        }
    }

    /// What every screen draws with — and the `.id` that rebuilds them when the language changes,
    /// since cached strings would not follow a new locale otherwise.
    private var appEnvironment: AppEnvironment {
        AppEnvironment(
            locale: localization.locale,
            layoutDirection: layoutDirection,
            colorScheme: appearance.themeMode.colorScheme,
            accent: accent,
            generation: localization.generation
        )
    }

    /// Where a widget tap lands. The scheme is `tttracker://`, and the host names the tab:
    /// `analytics`, `sessions/<id>` for one session, `sessions/new` to start logging one, `pro` for the
    /// paywall.
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
        case ("pro", _):
            if pro?.hasProFeatures != true { showsPaywall = true }
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
                }
            }
        )
    }
}

private struct AppEnvironment: ViewModifier {
    let locale: Locale
    let layoutDirection: LayoutDirection
    let colorScheme: ColorScheme?
    let accent: Color?
    let generation: Int

    func body(content: Content) -> some View {
        content
            .environment(\.locale, locale)
            .environment(\.layoutDirection, layoutDirection)
            .preferredColorScheme(colorScheme)
            .tint(accent)
            .id(generation)
    }
}
