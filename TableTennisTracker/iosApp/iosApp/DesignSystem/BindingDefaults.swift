import SwiftUI

/// Adapters that let an optional piece of `@State` drive a control that needs a non-optional.
///
/// These exist so screens do not hand-roll a `Binding(get:set:)` in their body: written inline the
/// getter and setter are easy to get subtly out of step with each other, and they mix plumbing in
/// with layout.
extension Binding {
    /// Reads through `fallback` while the value is nil. Writes always land on the optional.
    static func ?? (binding: Binding<Value?>, fallback: Value) -> Binding<Value> {
        Binding<Value>(
            get: { binding.wrappedValue ?? fallback },
            set: { binding.wrappedValue = $0 }
        )
    }

    /// Whether the optional currently holds something, for the `isPresented:` half of a
    /// presentation that is really driven by an item. Setting it false clears the item; it cannot
    /// set one, which is exactly what a dismissal needs.
    func isPresent<Wrapped>() -> Binding<Bool> where Value == Wrapped? {
        Binding<Bool>(
            get: { wrappedValue != nil },
            set: { if !$0 { wrappedValue = nil } }
        )
    }
}
