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

extension KotlinInstant {
    var date: Date { Date(timeIntervalSince1970: TimeInterval(toEpochMilliseconds()) / 1000) }
}

extension Kotlinx_datetimeLocalDate {
    var dateComponents: DateComponents {
        DateComponents(year: Int(year), month: Int(month.ordinal + 1), day: Int(day))
    }

    var date: Date? { Calendar.current.date(from: dateComponents) }
}
