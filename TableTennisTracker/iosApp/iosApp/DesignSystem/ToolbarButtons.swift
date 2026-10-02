import SwiftUI

/// The glyph buttons a sheet's navigation bar uses: an X to close or cancel, a checkmark to save.
/// iOS 26 draws them, and their spoken labels, from the button role; earlier systems get the same
/// glyph from a `Label`, which a toolbar shows as its icon.
///
/// A sheet with nothing to save puts its `CloseButton` at `.topBarTrailing`: in `.confirmationAction`
/// iOS 26 would draw it prominent, the look a save action gets.
struct CloseButton: View {
    let action: () -> Void

    var body: some View {
        if #available(iOS 26.0, *) {
            Button(role: .close, action: action)
        } else {
            Button(L.actionClose, systemImage: "xmark", action: action)
        }
    }
}

struct CancelButton: View {
    let action: () -> Void

    var body: some View {
        if #available(iOS 26.0, *) {
            Button(role: .cancel, action: action)
        } else {
            Button(L.actionCancel, systemImage: "xmark", action: action)
        }
    }
}

struct ConfirmButton: View {
    let action: () -> Void

    var body: some View {
        if #available(iOS 26.0, *) {
            Button(role: .confirm, action: action)
        } else {
            Button(L.actionSave, systemImage: "checkmark", action: action)
        }
    }
}
