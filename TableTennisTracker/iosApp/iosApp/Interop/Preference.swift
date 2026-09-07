import Observation
import SwiftUI
import Shared

/// A single preference: observed from a Kotlin flow, written back through a suspending setter.
///
/// Every preference-backed control needs the same four things — the current value, an optimistic
/// write so the control responds on the same frame, ordering so quick taps cannot commit out of
/// order, and a revert if the write fails. Writing that out per property is what let the analytics
/// toggles ship without the revert while the settings ones had it.
@MainActor
@Observable
final class Preference<Value> {
    private(set) var value: Value

    @ObservationIgnored private let commit: (Value) async throws -> Void
    @ObservationIgnored private let apply: (@MainActor (Value) -> Void)?
    @ObservationIgnored private let queue: SerialWriteQueue

    /// - Parameters:
    ///   - flow: the Kotlin flow carrying the stored value.
    ///   - decode: maps a flow emission to `Value`; the erased cast happens here.
    ///   - commit: the suspending setter on the repository.
    ///   - apply: an optional side effect that must track the value, applied optimistically and
    ///     undone on failure alongside it.
    init(
        initial: Value,
        flow: AnyKotlinFlow,
        subscriptions: FlowSubscriptions,
        queue: SerialWriteQueue,
        decode: @escaping @MainActor (Any) -> Value?,
        apply: (@MainActor (Value) -> Void)? = nil,
        commit: @escaping (Value) async throws -> Void
    ) {
        self.value = initial
        self.queue = queue
        self.commit = commit
        self.apply = apply

        subscriptions.insert(
            FlowObserverKt.observe(flow) { [weak self] emitted in
                MainActor.assumeIsolated {
                    guard let decoded = decode(emitted) else { return }
                    self?.value = decoded
                }
            }
        )
    }

    /// Applies `newValue` immediately, then persists it; reverts if the write fails.
    func set(_ newValue: Value) {
        let previous = value
        value = newValue
        apply?(newValue)
        queue.enqueue { [commit] in
            try await commit(newValue)
        } onFailure: { [weak self] _ in
            self?.value = previous
            self?.apply?(previous)
        }
    }

    var binding: Binding<Value> {
        Binding(get: { self.value }, set: { self.set($0) })
    }
}

extension Preference where Value == Bool {
    /// Kotlin `Boolean` arrives boxed.
    convenience init(
        initial: Bool,
        flow: AnyKotlinFlow,
        subscriptions: FlowSubscriptions,
        queue: SerialWriteQueue,
        commit: @escaping (Bool) async throws -> Void
    ) {
        self.init(
            initial: initial,
            flow: flow,
            subscriptions: subscriptions,
            queue: queue,
            decode: { ($0 as? KotlinBoolean)?.boolValue },
            apply: nil,
            commit: commit
        )
    }
}
