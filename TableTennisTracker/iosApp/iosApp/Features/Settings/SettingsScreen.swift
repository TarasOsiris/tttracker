import SwiftUI

enum SettingsRoute: Hashable {
    case general, opponents, debug
}

/// The one place a route names its screen — both the pushed stack and the split view's detail
/// column build their page from here.
@ViewBuilder func settingsPage(_ route: SettingsRoute) -> some View {
    switch route {
    case .general: GeneralSettingsScreen()
    case .opponents: OpponentsScreen()
    case .debug: DebugScreen()
    }
}

struct SettingsScreen: View {
    /// Set when the screen is a split view's sidebar: a page is then selected into the detail
    /// column instead of pushed.
    var selectedPage: Binding<SettingsRoute?>?

    @StateModel private var model = SettingsModel()

    var body: some View {
        List(selection: selectedPage ?? .constant(nil)) {
            generalSection
            helpSection
            aboutSection
            if model.isDebugBuild { developerSection }
            footer
        }
        .navigationTitle(L.titleSettings)
        .navigationDestination(for: SettingsRoute.self) { settingsPage($0) }
        .task { await model.load() }
    }

    private var generalSection: some View {
        Section(L.settingsSectionGeneral) {
            pageRow(.general, title: L.actionUiSettings, icon: "gearshape")
            pageRow(.opponents, title: L.actionOpponents, icon: "person.2")
        }
    }

    @ViewBuilder private func pageRow(_ page: SettingsRoute, title: String, icon: String) -> some View {
        if selectedPage != nil {
            Label(title, systemImage: icon).tag(page)
        } else {
            NavigationLink(value: page) { Label(title, systemImage: icon) }
        }
    }

    private var helpSection: some View {
        Section(L.settingsSectionHelp) {
            Button { model.sendFeedback() } label: {
                Label(L.actionSendFeedback, systemImage: "exclamationmark.bubble")
            }
        }
    }

    private var aboutSection: some View {
        Section(L.settingsSectionAbout) {
            Link(destination: URL(string: "https://ninevastudios.com")!) {
                Label(L.actionVisitWebsite, systemImage: "globe")
            }
            Link(destination: URL(string: "https://ninevastudios.com/privacy")!) {
                Label(L.actionPrivacyPolicy, systemImage: "lock")
            }
            Button { model.rateApp() } label: {
                Label(L.actionRateApp, systemImage: "star")
            }
            Button { model.copyUserId() } label: {
                Label(L.actionCopyUserId, systemImage: "person")
            }
            .disabled(model.userId.isEmpty)
        }
    }

    private var developerSection: some View {
        Section(L.settingsSectionDeveloper) {
            pageRow(.debug, title: L.actionDebug, icon: "ladybug")
        }
    }

    private var footer: some View {
        Section {
            VStack(spacing: 4) {
                Text(L.settingsVersionFormat(model.versionName, model.buildNumber))
                Text("\(L.settingsMadeWithPrefix) \(L.settingsCompanyName)")
            }
            .font(.footnote)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity)
            .listRowBackground(Color.clear)
        }
    }
}
