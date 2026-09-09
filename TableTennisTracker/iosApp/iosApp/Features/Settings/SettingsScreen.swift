import SwiftUI

struct SettingsScreen: View {
    /// Set when the screen is a split view's sidebar: a page is then selected into the detail
    /// column instead of pushed.
    var selectedPage: Binding<SettingsRoute?>?

    @StateModel private var model = SettingsModel()

    private static let website = URL(string: "https://ninevastudios.com")
    private static let privacyPolicy = URL(string: "https://ninevastudios.com/privacy")

    var body: some View {
        list
            .navigationTitle(L.titleSettings)
            .navigationDestination(for: SettingsRoute.self) { settingsPage($0) }
            .task { await model.load() }
    }

    /// The selection binding goes on only where the split view needs one. A `List` that has one
    /// answers a tap by moving its selection, so passing a placeholder binding on the stack path
    /// swallows the row's link and the tap does nothing.
    @ViewBuilder private var list: some View {
        if let selectedPage {
            List(selection: selectedPage) { sections }
        } else {
            List { sections }
        }
    }

    @ViewBuilder private var sections: some View {
        generalSection
        helpSection
        aboutSection
        if model.isDebugBuild { developerSection }
        SettingsFooter(versionName: model.versionName, buildNumber: model.buildNumber)
    }

    private var generalSection: some View {
        Section(L.settingsSectionGeneral) {
            pageRow(.general)
            pageRow(.opponents)
        }
    }

    @ViewBuilder private func pageRow(_ page: SettingsRoute) -> some View {
        if selectedPage != nil {
            Label(page.title, systemImage: page.icon)
                .accessibilityElement(children: .combine)
                .accessibilityIdentifier(page.identifier)
                .tag(page)
        } else {
            NavigationLink(value: page) { Label(page.title, systemImage: page.icon) }
                .accessibilityIdentifier(page.identifier)
        }
    }

    private var helpSection: some View {
        Section(L.settingsSectionHelp) {
            Button(action: model.sendFeedback) {
                Label(L.actionSendFeedback, systemImage: "exclamationmark.bubble")
            }
        }
    }

    private var aboutSection: some View {
        Section(L.settingsSectionAbout) {
            // Hoisted to constants rather than force-unwrapped inline: a link with no destination
            // is worth dropping a row for, not worth a crash.
            if let website = Self.website {
                Link(destination: website) {
                    Label(L.actionVisitWebsite, systemImage: "globe")
                }
            }
            if let privacyPolicy = Self.privacyPolicy {
                Link(destination: privacyPolicy) {
                    Label(L.actionPrivacyPolicy, systemImage: "lock")
                }
            }
            Button(action: model.rateApp) {
                Label(L.actionRateApp, systemImage: "star")
            }
            Button(action: model.copyUserId) {
                Label(L.actionCopyUserId, systemImage: "person")
            }
            .disabled(model.userId.isEmpty)
        }
    }

    private var developerSection: some View {
        Section(L.settingsSectionDeveloper) {
            pageRow(.debug)
        }
    }
}
