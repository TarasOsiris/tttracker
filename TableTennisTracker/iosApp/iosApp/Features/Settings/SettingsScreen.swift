import SwiftUI

struct SettingsScreen: View {
    /// Set when the screen is a split view's sidebar: a page is then selected into the detail
    /// column instead of pushed.
    var selectedPage: Binding<SettingsRoute?>?

    @StateModel private var model = SettingsModel()
    @StateModel private var dataExport = DataExportModel()
    @State private var paywallSource: PaywallSource?
    @Environment(ProModel.self) private var pro: ProModel?

    private static let website = URL(string: "https://ninevastudios.com")
    private static let privacyPolicy = URL(string: "https://ninevastudios.com/privacy")

    var body: some View {
        list
            .navigationTitle(L.titleSettings)
            .navigationDestination(for: SettingsRoute.self) { settingsPage($0) }
            .proToolbarButton()
            .task { await model.load() }
            .sheet(item: $paywallSource) { ProPaywallSheet(source: $0) }
            .sheet(item: $dataExport.exported) { ShareSheet(items: $0.urls).ignoresSafeArea() }
            .failureAlert($dataExport.failure)
            .alert(
                pro?.restoreResult?.title ?? "",
                isPresented: Binding(get: { pro?.restoreResult != nil }, set: { if !$0 { pro?.restoreResult = nil } })
            ) {}
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
        if let pro, pro.showsUpsell { proSections(pro) }
        generalSection
        CloudSyncSection()
        dataSection
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

    @ViewBuilder private func proSections(_ pro: ProModel) -> some View {
        Section {
            SettingsProBanner { paywallSource = .settingsBanner }
                .listRowInsets(EdgeInsets(top: 8, leading: 0, bottom: 8, trailing: 0))
                .listRowBackground(Color.clear)
        }

        // Apple requires a way to restore a non-consumable outside the purchase flow itself.
        Section {
            Button { Task { await pro.restore() } } label: {
                Label(L.actionRestorePurchases, systemImage: "arrow.clockwise")
            }
            .disabled(pro.isRestoring)
        }
    }

    private var dataSection: some View {
        Section(L.settingsSectionData) {
            Button {
                if pro?.hasProFeatures == true {
                    Task { await dataExport.export() }
                } else {
                    paywallSource = .settingsExport
                }
            } label: {
                HStack {
                    Label {
                        VStack(alignment: .leading, spacing: 2) {
                            Text(L.settingsExport)
                                .foregroundStyle(Color.primary)
                            Text(L.settingsExportHint)
                                .font(.footnote)
                                .foregroundStyle(Color.secondary)
                        }
                    } icon: {
                        Image(systemName: "square.and.arrow.up")
                    }
                    Spacer()
                    if dataExport.isExporting {
                        ProgressView()
                    } else if pro?.hasProFeatures != true {
                        ProBadge()
                    }
                }
            }
            .disabled(dataExport.isExporting)
            .accessibilityIdentifier("settings.export")
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
