import Foundation

extension Calendar {
    /// Only for decoding stored session dates — see `Int64.sessionDay`.
    static let utc: Calendar = {
        var calendar = Calendar(identifier: .gregorian)
        calendar.timeZone = .gmt
        return calendar
    }()

    /// The calendar this feature does its date arithmetic in: Gregorian, the device's zone, and the
    /// user's first day of week.
    static func days(firstWeekday: Int) -> Calendar {
        var calendar = Calendar.gregorian
        calendar.firstWeekday = firstWeekday
        return calendar
    }
}

extension Int64 {
    /// The calendar day a stored `TrainingSession.date` denotes, as local midnight.
    ///
    /// `:core` writes the column with `atStartOfDayIn(TimeZone.UTC)`, so the day has to be read back
    /// in UTC — reading that instant in the device's own zone lands on the day before for anyone
    /// west of Greenwich, which is the bug the Compose list has. Rebuilding it as *local* midnight
    /// then makes the key an ordinary calendar day, the same convention `AnalyticsModel` uses.
    var sessionDay: Date? {
        let instant = Date(timeIntervalSince1970: Double(self) / 1000)
        return Calendar.gregorian.date(from: Calendar.utc.dateComponents([.year, .month, .day], from: instant))
    }
}
