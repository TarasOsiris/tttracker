import SwiftUI

enum SettingsRoute: Hashable {
    case general, opponents, debug
}

struct SettingsScreen: View {
    @StateModel private var model = SettingsModel()

    var body: some View {
        List {
            generalSection
            helpSection
            aboutSection
            if model.isDebugBuild { developerSection }
            footer
        }
        .navigationTitle(L.titleSettings)
        .navigationDestination(for: SettingsRoute.self) { route in
            switch route {
            case .general: GeneralSettingsScreen()
            case .opponents: OpponentsScreen()
            case .debug: DebugScreen()
            }
        }
        .task { await model.load() }
    }

    private var generalSection: some View {
        Section(L.settingsSectionGeneral) {
            NavigationLink(value: SettingsRoute.general) {
                Label(L.actionUiSettings, systemImage: "gearshape")
            }
            NavigationLink(value: SettingsRoute.opponents) {
                Label(L.actionOpponents, systemImage: "person.2")
            }
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
            NavigationLink(value: SettingsRoute.debug) {
                Label(L.actionDebug, systemImage: "ladybug")
            }
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
