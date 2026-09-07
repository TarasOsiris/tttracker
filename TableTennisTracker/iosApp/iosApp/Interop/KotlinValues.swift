import Foundation
import Shared

extension KotlinUuid {
    /// The canonical dashed form, suitable as a SwiftUI `Identifiable.ID`.
    var stringId: String { toHexDashString() }
}

extension String {
    /// Parses a Kotlin `Uuid`, or returns `nil`.
    ///
    /// Validates with `Foundation.UUID` first: `Uuid.parse` throws on malformed input, and a Kotlin
    /// exception out of a non-suspend function terminates the process rather than surfacing as a
    /// Swift error.
    var kotlinUuid: KotlinUuid? {
        guard UUID(uuidString: self) != nil else { return nil }
        return KotlinUuid.companion.parse(uuidString: self)
    }

    var nilIfBlank: String? {
        let trimmed = trimmingCharacters(in: .whitespacesAndNewlines)
        return trimmed.isEmpty ? nil : trimmed
    }
}

extension Calendar {
    /// Kotlin's `LocalDate` is an ISO date. Reading it through `Calendar.current` would interpret
    /// the year in the user's calendar — on a device set to the Buddhist calendar, year 2026 lands
    /// centuries away.
    static let gregorian = Calendar(identifier: .gregorian)
}

extension Kotlinx_datetimeLocalDate {
    var dateComponents: DateComponents {
        DateComponents(year: Int(year), month: Int(month.ordinal + 1), day: Int(day))
    }

    var date: Date? { Calendar.gregorian.date(from: dateComponents) }
}

extension Date {
    /// The Gregorian calendar day this instant falls on, as a Kotlin `LocalDate`.
    var kotlinLocalDate: Kotlinx_datetimeLocalDate? {
        let parts = Calendar.gregorian.dateComponents([.year, .month, .day], from: self)
        guard let year = parts.year, let month = parts.month, let day = parts.day else { return nil }
        return Kotlinx_datetimeLocalDate(year: Int32(year), month: Int32(month), day: Int32(day))
    }

    /// This instant's Gregorian day at midday, as a Kotlin `LocalDateTime`.
    ///
    /// `addSession`/`editSession` take a `LocalDateTime`, but `TrainingSessionServiceImpl` passes
    /// only `dateTime.date` to the repository — the time is never stored. Midday is what the Compose
    /// create screen sends, and matching it keeps the two writers identical.
    var kotlinLocalDateTimeAtNoon: Kotlinx_datetimeLocalDateTime? {
        let parts = Calendar.gregorian.dateComponents([.year, .month, .day], from: self)
        guard let year = parts.year, let month = parts.month, let day = parts.day else { return nil }
        return Kotlinx_datetimeLocalDateTime(
            year: Int32(year), month: Int32(month), day: Int32(day),
            hour: 12, minute: 0, second: 0, nanosecond: 0
        )
    }
}
