import Shared

/// Mirrors `Handedness`. See `KotlinEnumParity.swift` for why these mirrors exist.
enum Handed: String, CaseIterable, Identifiable {
    case right = "right"
    case left = "left"

    var id: String { rawValue }

    /// `UNKNOWN` maps to `nil`: the form models "not set" as no selection, and there is no string
    /// for it in any locale.
    init?(_ kotlin: Shared.Handedness?) {
        guard let kotlin, let mapped = Handed(rawValue: kotlin.dbValue) else { return nil }
        self = mapped
    }

    var kotlin: Shared.Handedness {
        switch self {
        case .right: .right
        case .left: .left
        }
    }

    var label: String {
        switch self {
        case .right: L.handednessRight
        case .left: L.handednessLeft
        }
    }
}
