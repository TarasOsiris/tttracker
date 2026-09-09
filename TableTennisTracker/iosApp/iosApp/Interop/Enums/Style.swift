import Shared

/// Mirrors `PlayingStyle`. See `KotlinEnumParity.swift` for why these mirrors exist.
enum Style: String, CaseIterable, Identifiable {
    case attacker = "attacker"
    case defender = "defender"
    case allRound = "all_round"
    case pips = "pips"
    case chopper = "chopper"

    var id: String { rawValue }

    init?(_ kotlin: PlayingStyle?) {
        guard let kotlin, let mapped = Style(rawValue: kotlin.dbValue) else { return nil }
        self = mapped
    }

    var kotlin: PlayingStyle {
        switch self {
        case .attacker: .attacker
        case .defender: .defender
        case .allRound: .allRound
        case .pips: .pips
        case .chopper: .chopper
        }
    }

    var label: String {
        switch self {
        case .attacker: L.styleAttacker
        case .defender: L.styleDefender
        case .allRound: L.styleAllRound
        case .pips: L.stylePips
        case .chopper: L.styleChopper
        }
    }
}
