import Foundation

/// Where a widget tap takes the user. `RootTabView` is the other half.
enum DeepLink {
    static let scheme = "tttracker"

    static let analytics = URL(string: "\(scheme)://analytics")!
    static let newSession = URL(string: "\(scheme)://sessions/new")!
    /// The Pro paywall, from a Pro widget placed without Pro.
    static let pro = URL(string: "\(scheme)://pro")!

    static func session(_ id: String) -> URL {
        URL(string: "\(scheme)://sessions/\(id)") ?? newSession
    }
}
