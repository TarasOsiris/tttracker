import SwiftUI

struct GeneralSettingsScreen: View {
    @StateModel private var model = GeneralSettingsModel()

    var body: some View {
        Form {
            Section(L.settingsSectionAppearance) {
                Picker(L.actionTheme, selection: model.themeMode.binding) {
                    ForEach(ThemeMode.allCases) { Text($0.label).tag($0) }
                }
                .pickerStyle(.navigationLink)

                Picker(L.actionLanguage, selection: model.appLocale.binding) {
                    ForEach(LocaleOption.all) { Text($0.displayName).tag($0) }
                }
                .pickerStyle(.navigationLink)
            }

            Section(L.settingsSectionCalendar) {
                Picker(L.actionWeekStart, selection: model.weekStart.binding) {
                    ForEach(WeekStart.allCases) { Text($0.label).tag($0) }
                }
                .pickerStyle(.navigationLink)

                Toggle(L.settingsHighlightCurrentDay, isOn: model.highlightCurrentDay.binding)
            }
        }
        .navigationTitle(L.actionUiSettings)
        .navigationBarTitleDisplayMode(.inline)
    }
}
