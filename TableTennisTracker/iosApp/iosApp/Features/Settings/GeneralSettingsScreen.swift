import SwiftUI

struct GeneralSettingsScreen: View {
    @StateModel private var model = GeneralSettingsModel()
    @Environment(ProModel.self) private var pro: ProModel?
    @State private var showsPaywall = false

    var body: some View {
        Form {
            Section(L.settingsSectionAppearance) {
                Picker(L.actionTheme, selection: model.themeMode.binding) {
                    ForEach(ThemeMode.allCases) { Text($0.label).tag($0) }
                }
                .pickerStyle(.navigationLink)
                .accessibilityIdentifier("general.theme")

                accentPicker

                Picker(L.actionLanguage, selection: model.appLocale.binding) {
                    ForEach(LocaleOption.all) { Text($0.displayName).tag($0) }
                }
                .pickerStyle(.navigationLink)
                .accessibilityIdentifier("general.language")
            }

            Section(L.settingsSectionCalendar) {
                Picker(L.actionWeekStart, selection: model.weekStart.binding) {
                    ForEach(WeekStart.allCases) { Text($0.label).tag($0) }
                }
                .pickerStyle(.navigationLink)

                Toggle(L.settingsHighlightCurrentDay, isOn: model.highlightCurrentDay.binding)
            }
        }
        .sheet(isPresented: $showsPaywall) { ProPaywallSheet(source: .accentColor) }
        .accessibilityIdentifier(SettingsRoute.general.screenIdentifier)
        .navigationTitle(L.actionUiSettings)
        .navigationBarTitleDisplayMode(.inline)
    }

    /// Every colour is listed for everyone; choosing one other than the default without Pro opens
    /// the paywall instead.
    private var accentPicker: some View {
        let hasPro = pro?.hasProFeatures == true
        return Picker(selection: Binding(
            get: { hasPro ? model.accent.value : .default },
            set: { accent in
                if accent != .default && !hasPro {
                    showsPaywall = true
                } else {
                    model.accent.set(accent)
                }
            }
        )) {
            ForEach(AccentChoice.allCases) { accent in
                Label {
                    Text(accent.label)
                } icon: {
                    Image(systemName: "circle.fill")
                        .foregroundStyle(accent.color ?? Color.accentColor)
                }
                .tag(accent)
            }
        } label: {
            HStack {
                Text(L.settingsAccentColor)
                if !hasPro { ProBadge() }
            }
        }
        .pickerStyle(.navigationLink)
        .accessibilityIdentifier("general.accent")
    }
}
