import Foundation
import os

/// The App Group file the app writes and the widgets read.
enum WidgetStore {
    static let appGroup = "group.xyz.tleskiv.tt"

    private static let log = Logger(subsystem: "xyz.tleskiv.tt", category: "widgets")

    private static var url: URL? {
        FileManager.default
            .containerURL(forSecurityApplicationGroupIdentifier: appGroup)?
            .appendingPathComponent("widget-snapshot.json")
    }

    /// The snapshot on disk, or nil before the app has ever written one.
    static func read() -> WidgetSnapshot? {
        guard let url, let data = try? Data(contentsOf: url) else { return nil }
        return try? decoder.decode(WidgetSnapshot.self, from: data)
    }

    /// Writes the snapshot, returning the bytes written so the caller can tell a real change from
    /// a flow re-emitting the same values. Atomic, because a widget may be reading as we write.
    @discardableResult
    static func write(_ snapshot: WidgetSnapshot) -> Data? {
        guard let url else {
            // Missing on a build whose entitlement has not been provisioned; the widgets then show
            // their placeholder rather than stale numbers, which is the right failure.
            log.error("no container for \(appGroup, privacy: .public)")
            return nil
        }
        guard let data = try? encoder.encode(snapshot) else { return nil }
        do {
            try data.write(to: url, options: .atomic)
            return data
        } catch {
            log.error("snapshot write failed: \(error.localizedDescription, privacy: .public)")
            return nil
        }
    }

    private static let encoder: JSONEncoder = {
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        // So the caller can compare encodings to decide whether anything actually changed.
        encoder.outputFormatting = .sortedKeys
        return encoder
    }()

    private static let decoder: JSONDecoder = {
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return decoder
    }()
}
