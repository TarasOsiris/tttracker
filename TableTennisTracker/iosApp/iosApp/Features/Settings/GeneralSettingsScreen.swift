import SwiftUI

struct GeneralSettingsScreen: View {
    @State private var model = GeneralSettingsModel()

    var body: some View {
        Form {
            Section(L.settingsSectionAppearance) {
                Picker(L.actionTheme, selection: model.themeModeBinding) {
                    ForEach(ThemeMode.allCases) { Text($0.label).tag($0) }
                }
                .pickerStyle(.navigationLink)

                Picker(L.actionLanguage, selection: model.appLocaleBinding) {
                    ForEach(LocaleOption.all) { Text($0.displayName).tag($0) }
                }
                .pickerStyle(.navigationLink)
            }

            Section(L.settingsSectionCalendar) {
                Picker(L.actionWeekStart, selection: model.weekStartBinding) {
                    ForEach(WeekStart.allCases) { Text($0.label).tag($0) }
                }
                .pickerStyle(.navigationLink)

                Toggle(L.settingsHighlightCurrentDay, isOn: model.highlightCurrentDayBinding)
            }
        }
        .navigationTitle(L.actionUiSettings)
        .navigationBarTitleDisplayMode(.inline)
    }
}
