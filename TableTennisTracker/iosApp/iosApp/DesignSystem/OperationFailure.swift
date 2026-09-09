import SwiftUI

/// A user action that did not go through, raised for the user to see.
///
/// One value rather than a `Bool` plus a parallel `String?`: the pair had to be kept in step by
/// hand in every model that reported a failure, and "show what actually went wrong" was something
/// each new model had to remember to re-derive.
struct OperationFailure {
    /// What the failure said, when it said anything. Some failures are a rejected precondition
    /// rather than a thrown error and carry no message.
    let message: String?

    init(_ error: Error? = nil) { message = error?.localizedDescription }
}

extension View {
    /// The app's standard error alert, shown while `failure` holds one.
    ///
    /// No action button: a lone dismissing "OK" is what an alert does anyway.
    func failureAlert(_ failure: Binding<OperationFailure?>) -> some View {
        alert(
            L.titleError,
            isPresented: failure.isPresent(),
            presenting: failure.wrappedValue
        ) { _ in
        } message: { failure in
            if let message = failure.message { Text(message) }
        }
    }
}
