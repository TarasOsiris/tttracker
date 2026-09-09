import Foundation
import Observation
import Shared

@MainActor
@Observable
final class DebugModel {
    private(set) var isClearing = false
    private(set) var isGenerating = false

    /// What is actually in the database. A debug screen should say so, and it is the only signal the
    /// screenshot UI test can wait on that is not a transient busy flag — those flip and flip back
    /// between two polls of an XCTest predicate, so a fast write reads as a failure.
    ///
    /// `nil` until the first read lands. Rendering a placeholder 0 would be a lie the screenshot
    /// test believes: it decides whether to clear from this value, and a 0 read before the count
    /// arrives skips the clear on exactly the runs that carry the previous language's rows.
    private(set) var sessionCount: Int?

    /// Either operation blocks both buttons: clearing partway through a generation run empties what
    /// has been written so far while the loop keeps inserting, and the reverse re-adds a roster
    /// mid-clear.
    var isBusy: Bool { isClearing || isGenerating }

    @ObservationIgnored private let sessions: any TrainingSessionService
    @ObservationIgnored private let opponents: any OpponentService

    init(
        sessions: any TrainingSessionService = Services.sessions,
        opponents: any OpponentService = Services.opponents
    ) {
        self.sessions = sessions
        self.opponents = opponents
    }

    /// Sessions first: that clears their matches in one transaction, so nothing is left pointing at
    /// an opponent when the roster goes. Opponents have to go too — `generate` inserts fifteen per
    /// run, and leaving them behind would accumulate duplicate names with no way to remove them.
    func clearAll() async {
        isClearing = true
        defer { isClearing = false }
        try? await sessions.deleteAllSessions()
        try? await opponents.deleteAllOpponents()
        await refreshCount()
    }

    func refreshCount() async {
        sessionCount = (try? await sessions.getAllSessions().count) ?? 0
    }

    /// Mirrors `DebugScreenViewModel.generateRandomSessions`, which lives in a ViewModel and so
    /// cannot be called from Swift.
    func generate(count: Int = 100) async {
        isGenerating = true
        defer { isGenerating = false }
        defer { Task { await refreshCount() } }

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

    /// Delegates to `ShowcaseSeeder` in `:core`, the same writer the Compose debug screen and the
    /// Android screenshot test use — so the iPhone, iPad and Android rows show one player.
    func seedShowcase() async {
        isGenerating = true
        defer { isGenerating = false }
        defer { Task { await refreshCount() } }

        try? await ShowcaseSeeder(trainingSessionService: sessions, opponentService: opponents)
            .seed(languageTag: LocalizationController.shared.languageTag)
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
