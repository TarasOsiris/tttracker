import Foundation
import Observation
import Shared

/// Writes the log out as two CSV files for the share sheet. The CSV itself is built in `:core`.
@MainActor
@Observable
final class DataExportModel {
    private(set) var isExporting = false
    /// Set once the files are written, to present the share sheet with.
    var exported: ExportedFiles?
    var failure: OperationFailure?

    @ObservationIgnored private let sessions: any TrainingSessionService
    @ObservationIgnored private let analytics: any AnalyticsService

    init(
        sessions: any TrainingSessionService = Services.sessions,
        analytics: any AnalyticsService = Services.analytics
    ) {
        self.sessions = sessions
        self.analytics = analytics
    }

    func export() async {
        guard !isExporting else { return }
        isExporting = true
        defer { isExporting = false }
        do {
            let all = try await sessions.getAllSessions()
            let stamp = Date.now.formatted(.iso8601.year().month().day())
            // A fresh folder per export, so a share sheet still open on the last one is not
            // reading a file that is being replaced underneath it.
            let folder = FileManager.default.temporaryDirectory
                .appendingPathComponent("export-\(UUID().uuidString)", isDirectory: true)
            try FileManager.default.createDirectory(at: folder, withIntermediateDirectories: true)
            let sessionsFile = folder.appendingPathComponent("tt-tracker-sessions-\(stamp).csv")
            let matchesFile = folder.appendingPathComponent("tt-tracker-matches-\(stamp).csv")
            try CsvExportKt.sessionsCsv(sessions: all).write(to: sessionsFile, atomically: true, encoding: .utf8)
            try CsvExportKt.matchesCsv(sessions: all).write(to: matchesFile, atomically: true, encoding: .utf8)
            exported = ExportedFiles(urls: [sessionsFile, matchesFile])
            analytics.capture(event: "data_exported", properties: ["sessions": all.count])
        } catch {
            failure = OperationFailure(error)
        }
    }
}

struct ExportedFiles: Identifiable {
    let id = UUID()
    let urls: [URL]
}
