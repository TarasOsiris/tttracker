import Foundation

/// The day a new session is being created on, if the form is open.
///
/// Owned above the sessions tab so a widget or the Control Center button can raise the form — and
/// carrying the day rather than a flag, so that deep link can open it on today rather than on
/// wherever the list happened to be scrolled.
struct NewSessionTarget: Identifiable {
    let day: Date

    var id: Date { day }
}
