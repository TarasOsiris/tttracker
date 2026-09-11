import Foundation

extension Calendar {
    /// Kotlin's `LocalDate` is an ISO date. Reading it through `Calendar.current` would interpret
    /// the year in the user's calendar — on a device set to the Buddhist calendar, year 2026 lands
    /// centuries away.
    static let gregorian = Calendar(identifier: .gregorian)

    /// The calendar the day-based features do their arithmetic in: Gregorian, the device's zone,
    /// and the user's first day of week.
    static func days(firstWeekday: Int) -> Calendar {
        var calendar = Calendar.gregorian
        calendar.firstWeekday = firstWeekday
        return calendar
    }

    /// Every day in a heatmap window, oldest first: `weeks` whole weeks followed by the current one
    /// up to `day`, so a seven-row grid lays each column out as one week — aligned to
    /// `firstWeekday`, not the system's.
    ///
    /// The `+ 1` is `day` itself. Without it the run is a day short, which shifts every row by one
    /// and leaves each column spanning two weeks.
    func heatmapDays(weeks: Int, endingOn day: Date) -> [Date] {
        let last = startOfDay(for: day)
        let daysIntoWeek = (component(.weekday, from: last) - firstWeekday + 7) % 7
        let total = weeks * 7 + daysIntoWeek + 1
        return (0..<total).reversed().compactMap { date(byAdding: .day, value: -$0, to: last) }
    }
}
