import SwiftUI

struct DebugScreen: View {
    /// Shown while the count is still being read. Locale-independent, so the screenshot UI test can
    /// wait for it to go away without knowing the language.
    static let unknownCount = "\u{2014}"

    @StateModel private var model = DebugModel()

    var body: some View {
        List {
            Section(L.debugDataGenerationTitle) {
                Text(L.debugDataGenerationDescription)
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                HStack {
                    Text(L.debugSessionsInDatabase)
                    Spacer()
                    // Unformatted on purpose: the screenshot UI test waits on this value, and
                    // `formatted()` would render Arabic-Indic digits under an Arabic locale.
                    Text(verbatim: model.sessionCount.map(String.init) ?? Self.unknownCount)
                        .font(.body.weight(.semibold))
                        .accessibilityIdentifier("debug.sessionCount")
                }
                Button {
                    Task { await model.generate() }
                } label: {
                    HStack {
                        Text(L.debugGenerateRandomSessions)
                        if model.isGenerating {
                            Spacer()
                            ProgressView()
                        }
                    }
                }
                .accessibilityIdentifier("debug.generate")
                .disabled(model.isBusy)
                Button {
                    Task { await model.seedShowcase() }
                } label: {
                    Text(L.debugSeedShowcaseData)
                }
                .accessibilityIdentifier("debug.seedShowcase")
                .disabled(model.isBusy)
            }
            Section(L.debugClearDatabaseTitle) {
                Text(L.debugClearDatabaseDescription)
                    .font(.footnote)
                    .foregroundStyle(.secondary)
                Button(role: .destructive) {
                    Task { await model.clearAll() }
                } label: {
                    HStack {
                        Text(L.debugClearAllSessions)
                        if model.isClearing {
                            Spacer()
                            ProgressView()
                        }
                    }
                }
                .accessibilityIdentifier("debug.clearAll")
                .disabled(model.isBusy)
            }
        }
        .accessibilityIdentifier(SettingsRoute.debug.screenIdentifier)
        .navigationTitle(L.actionDebug)
        .navigationBarTitleDisplayMode(.inline)
        .task { await model.refreshCount() }
    }
}
