import SwiftUI

struct GeneralSettingsScreen: View {
    @StateModel private var model = GeneralSettingsModel()
    @StateModel private var sessionDefaults = SessionDefaultsModel()
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

            if sessionDefaults.isLoaded { sessionDefaultsSection }
        }
        .task { await sessionDefaults.load() }
        .sheet(isPresented: $showsPaywall) { ProPaywallSheet(source: .accentColor) }
        .accessibilityIdentifier(SettingsRoute.general.screenIdentifier)
        .navigationTitle(L.actionUiSettings)
        .navigationBarTitleDisplayMode(.inline)
    }

    private var sessionDefaultsSection: some View {
        Section(L.settingsSectionSessions) {
            DurationSliderRows(duration: $sessionDefaults.duration)

            HStack {
                Text(L.labelIntensityRpe)
                Spacer()
                RpeBadge(rpe: sessionDefaults.rpe, namesItself: false)
            }
            Slider(value: $sessionDefaults.intensity, in: 1...10, step: 1)
                .tint(Color.rpe(sessionDefaults.rpe))
                .accessibilityLabel(L.labelIntensityRpe)
                .accessibilityValue(rpeLabel(sessionDefaults.rpe))

            SessionKindPicker(selection: $sessionDefaults.kind)

            TextField(L.labelDefaultNotes, text: notesBinding, axis: .vertical)
                .lineLimit(2...6)
        }
    }

    /// Clamped as it is typed, so an over-long paste is stored only once, already cut to the limit.
    private var notesBinding: Binding<String> {
        Binding(
            get: { sessionDefaults.notes },
            set: { sessionDefaults.notes = String($0.prefix(SessionFormModel.notesLimit)) }
        )
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
