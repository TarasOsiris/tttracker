import Observation
import SwiftUI

/// Backing store for a screen's `@Observable` model, built on first use.
///
/// `@State private var model = Model()` builds a model on *every* initialisation of the enclosing
/// View struct: `State.init(wrappedValue:)` takes a value rather than an autoclosure, so the
/// expression is evaluated each time SwiftUI re-creates the struct and only the first result is
/// ever kept. Our models subscribe to Kotlin flows from their initialiser, so each throwaway
/// opened and immediately cancelled a coroutine per flow — and `RootTabView.body` re-evaluates on
/// every push and pop in any tab.
///
/// Wrapping the *factory* instead means nothing is built until a body actually reads the model.
@MainActor
@propertyWrapper
struct StateModel<Model: AnyObject & Observable>: DynamicProperty {
    @State private var storage: Storage

    init(wrappedValue make: @autoclosure @escaping @MainActor () -> Model) {
        _storage = State(wrappedValue: Storage(make))
    }

    var wrappedValue: Model { storage.model }

    /// `$model.property` binds straight to the model, the same way `@Bindable` does.
    var projectedValue: Bindable<Model> { Bindable(storage.model) }

    private final class Storage {
        private let make: @MainActor () -> Model
        private var built: Model?

        init(_ make: @escaping @MainActor () -> Model) { self.make = make }

        @MainActor var model: Model {
            if let built { return built }
            let model = make()
            built = model
            return model
        }
    }
}
