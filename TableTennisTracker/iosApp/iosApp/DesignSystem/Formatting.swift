import Foundation

extension Int {
    /// A training duration in minutes, rendered for display.
    ///
    /// `Duration.UnitsFormatStyle` pluralises and orders the units per locale, which the
    /// hand-rolled "%1$dh %2$dm" string on the Kotlin side cannot.
    var formattedTrainingDuration: String {
        Duration.seconds(self * 60)
            .formatted(.units(allowed: [.hours, .minutes], width: .abbreviated))
    }
}
