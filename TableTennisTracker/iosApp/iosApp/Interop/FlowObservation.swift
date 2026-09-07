import Foundation
import Shared

/// Kotlin's `Flow`, spelled once. The exported protocol carries no element type.
typealias AnyKotlinFlow = any Kotlinx_coroutines_coreFlow

/// A live flow subscription.
///
/// Spelled with its module because `Shared.Cancellable` is ambiguous with `Combine.Cancellable` in
/// any file that imports SwiftUI.
typealias FlowSubscription = Shared.Cancellable

/// Holds flow subscriptions for the lifetime of whatever owns it.
///
/// Not `@MainActor`: `deinit` has to be able to cancel from any thread, and cancelling a Kotlin
/// scope is thread-safe.
final class FlowSubscriptions {
    private var subscriptions: [FlowSubscription] = []

    func insert(_ subscription: FlowSubscription) {
        subscriptions.append(subscription)
    }

    func cancelAll() {
        subscriptions.forEach { $0.cancel() }
        subscriptions.removeAll()
    }

    deinit { subscriptions.forEach { $0.cancel() } }
}

enum KotlinFlow {
    /// The one place the erased `Any` coming out of a Kotlin flow is cast.
    ///
    /// `Flow.observe` collects on `Dispatchers.Main.immediate`, so `onEach` already runs on the main
    /// thread. Stating that with `assumeIsolated` rather than hopping through a `Task` keeps
    /// emissions in order and avoids a runloop turn per database change.
    @discardableResult
    static func observe<T>(
        _ flow: AnyKotlinFlow,
        as _: T.Type = T.self,
        file: StaticString = #fileID,
        line: UInt = #line,
        onEach: @escaping @MainActor (T) -> Void
    ) -> FlowSubscription {
        FlowObserverKt.observe(flow) { erased in
            MainActor.assumeIsolated {
                guard let value = erased as? T else {
                    assertionFailure("\(file):\(line): flow emitted \(type(of: erased)), expected \(T.self)")
                    return
                }
                onEach(value)
            }
        }
    }

    /// Kotlin `Boolean` arrives boxed. Going through `KotlinBoolean` rather than `as? Bool` keeps
    /// the cast honest — `NSNumber as? Bool` succeeds for any numeric value.
    @discardableResult
    static func observeBool(
        _ flow: AnyKotlinFlow,
        onEach: @escaping @MainActor (Bool) -> Void
    ) -> FlowSubscription {
        observe(flow, as: KotlinBoolean.self) { onEach($0.boolValue) }
    }

    @discardableResult
    static func observeInt(
        _ flow: AnyKotlinFlow,
        onEach: @escaping @MainActor (Int) -> Void
    ) -> FlowSubscription {
        observe(flow, as: KotlinInt.self) { onEach($0.intValue) }
    }
}
