import Foundation

/// Where a widget tap takes the user. `RootTabView` is the other half.
enum DeepLink {
    static let scheme = "tttracker"

    static let analytics = URL(string: "\(scheme)://analytics")!
    static let newSession = URL(string: "\(scheme)://sessions/new")!

    static func session(_ id: String) -> URL {
        URL(string: "\(scheme)://sessions/\(id)") ?? newSession
    }
}
