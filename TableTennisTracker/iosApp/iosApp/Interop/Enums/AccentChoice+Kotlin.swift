import Shared

/// `AccentChoice` mirrors `AppAccent`; it lives in `Common` for the widgets, which have no Kotlin.
/// See `KotlinEnumParity.swift` for why these mirrors exist.
extension AccentChoice {
    init(_ kotlin: AppAccent) { self = AccentChoice(rawValue: kotlin.name) ?? .default }

    var kotlin: AppAccent {
        switch self {
        case .default: .default_
        case .green: .green
        case .teal: .teal
        case .indigo: .indigo
        case .purple: .purple
        case .pink: .pink
        case .red: .red
        case .orange: .orange
        }
    }
}
