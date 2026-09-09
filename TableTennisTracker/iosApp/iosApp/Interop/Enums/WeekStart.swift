import Shared

/// Mirrors `WeekStartDay`. See `KotlinEnumParity.swift` for why these mirrors exist.
enum WeekStart: String, CaseIterable, Identifiable {
    case monday = "MONDAY"
    case sunday = "SUNDAY"
    case saturday = "SATURDAY"

    var id: String { rawValue }

    init(_ kotlin: Shared.WeekStartDay) { self = WeekStart(rawValue: kotlin.name) ?? .monday }

    var kotlin: Shared.WeekStartDay {
        switch self {
        case .monday: .monday
        case .sunday: .sunday
        case .saturday: .saturday
        }
    }

    var label: String {
        switch self {
        case .monday: L.weekStartMonday
        case .sunday: L.weekStartSunday
        case .saturday: L.weekStartSaturday
        }
    }

    /// `Calendar.firstWeekday` numbering, where 1 is Sunday.
    var firstWeekday: Int {
        switch self {
        case .sunday: 1
        case .monday: 2
        case .saturday: 7
        }
    }
}
