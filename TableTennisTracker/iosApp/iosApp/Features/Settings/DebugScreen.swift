import Observation
import SwiftUI
import Shared

@MainActor
@Observable
final class DebugModel {
    private(set) var isClearing = false
    private(set) var isGenerating = false

    @ObservationIgnored private let sessions: any TrainingSessionService
    @ObservationIgnored private let opponents: any OpponentService

    init(
        sessions: any TrainingSessionService = Services.sessions,
        opponents: any OpponentService = Services.opponents
    ) {
        self.sessions = sessions
        self.opponents = opponents
    }

    func clearAll() async {
        isClearing = true
        defer { isClearing = false }
        try? await sessions.deleteAllSessions()
    }

    /// Mirrors `DebugScreenViewModel.generateRandomSessions`, which lives in a ViewModel and so
    /// cannot be called from Swift.
    func generate(count: Int = 100) async {
        isGenerating = true
        defer { isGenerating = false }

        var roster: [(KotlinUuid, String)] = []
        for name in Self.opponentNames {
            guard let id = try? await opponents.addOpponent(
                name: name,
                club: Self.clubNames.randomElement() ?? nil,
                rating: Bool.random() ? KotlinDouble(double: Double.random(in: 800...2500)) : nil,
                handedness: Bool.random() ? Handed.allCases.randomElement()?.kotlin : nil,
                style: Bool.random() ? Style.allCases.randomElement()?.kotlin : nil,
                notes: nil
            ) else { continue }
            roster.append((id, name))
        }

        for _ in 0..<count {
            let day = Calendar.gregorian.date(byAdding: .day, value: -Int.random(in: 0..<365), to: .now)
            guard let dateTime = day?.kotlinLocalDateTimeAtNoon else { continue }
            _ = try? await sessions.addSession(
                dateTime: dateTime,
                durationMinutes: Int32([30, 45, 60, 90, 120].randomElement() ?? 60),
                rpe: Int32.random(in: 1...10),
                sessionType: Bool.random() ? SessionKind.allCases.randomElement()?.kotlin : nil,
                notes: Int.random(in: 0..<100) < 30 ? "Random session note #\(Int.random(in: 0..<1000))" : nil,
                matches: matches(against: roster)
            )
        }
    }

    private func matches(against roster: [(KotlinUuid, String)]) -> [MatchInput] {
        guard !roster.isEmpty else { return [] }
        return (0..<Int.random(in: 0..<6)).compactMap { _ in
            guard let opponent = roster.randomElement() else { return nil }
            let mine = Int32.random(in: 0...3)
            let theirs = mine == 3 ? Int32.random(in: 0...2) : Int32.random(in: (mine + 1)...3)
            return MatchInput(
                opponentId: opponent.0,
                opponentName: opponent.1,
                myGamesWon: mine,
                opponentGamesWon: theirs,
                isDoubles: Int.random(in: 0..<100) < 20,
                isRanked: Bool.random(),
                competitionLevel: Bool.random() ? Competition.allCases.randomElement()?.kotlin : nil,
                notes: nil
            )
        }
    }

    private static let opponentNames = [
        "Alex Chen", "Maria Kovacs", "Jan Mueller", "Lisa Wang", "Tom Anderson",
        "Yuki Tanaka", "Peter Schmidt", "Anna Petrov", "Carlos Silva", "Emma Brown",
        "Wei Liu", "Sophie Martin", "Raj Patel", "Olga Ivanova", "James Wilson"
    ]

    private static let clubNames: [String?] = [
        "TTC Berlin", "Vienna Spin", "Prague Smashers", "London Blades", "Paris Elite",
        "Munich Stars", "Barcelona TT", "Amsterdam Aces", "Stockholm Spinners", nil
    ]
}

struct DebugScreen: View {
    @StateModel private var model = DebugModel()

    var body: some View {
        List {
            Section(L.debugDataGenerationTitle) {
                Text(L.debugDataGenerationDescription)
                    .font(.footnote)
                    .foregroundStyle(.secondary)
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
                .disabled(model.isGenerating)
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
                .disabled(model.isClearing)
            }
        }
        .navigationTitle(L.actionDebug)
        .navigationBarTitleDisplayMode(.inline)
    }
}
