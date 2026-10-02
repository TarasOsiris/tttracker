import Foundation
import Shared

/// One bar in the weekly chart.
struct WeeklyTraining: Identifiable {
    let id: Int
    /// The week's first day, on the user's first day of week.
    let start: Date
    let minutes: Int
}

/// How far back the weekly chart reaches.
enum WeeklyRange: CaseIterable, Identifiable {
    case eightWeeks, sixMonths, year, all

    var id: Self { self }

    var weeks: Int32 {
        switch self {
        case .eightWeeks: 8
        case .sixMonths: 26
        case .year: 52
        case .all: InsightsServiceCompanion.shared.ALL_WEEKS
        }
    }

    var needsPro: Bool { self != .eightWeeks }

    var label: String {
        switch self {
        case .eightWeeks: L.analyticsRange8w
        case .sixMonths: L.analyticsRange6m
        case .year: L.analyticsRange1y
        case .all: L.analyticsRangeAll
        }
    }

    /// Day and month while each bar is a labelled week, months once there are too many to label, and
    /// years once the months would repeat.
    func axisFormat(weeks: Int) -> Date.FormatStyle {
        if self == .eightWeeks { return .dateTime.day().month(.defaultDigits) }
        return weeks > 60 ? .dateTime.year() : .dateTime.month(.abbreviated)
    }
}
