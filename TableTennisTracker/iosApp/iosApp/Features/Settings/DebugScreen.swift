import Observation
import SwiftUI
import Shared

@MainActor
@Observable
final class DebugModel {
    private(set) var isGenerating = false
    private(set) var isClearing = false

    @ObservationIgnored private let sessions: any TrainingSessionService

    init(sessions: any TrainingSessionService = Services.sessions) {
        self.sessions = sessions
    }

    func clearAll() async {
        isClearing = true
        defer { isClearing = false }
        try? await sessions.deleteAllSessions()
    }
}

struct DebugScreen: View {
    @State private var model = DebugModel()

    var body: some View {
        List {
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
                .disabled(model.isClearing)
            }
        }
        .navigationTitle(L.actionDebug)
        .navigationBarTitleDisplayMode(.inline)
    }
}
