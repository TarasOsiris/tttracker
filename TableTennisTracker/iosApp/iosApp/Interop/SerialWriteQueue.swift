import Foundation

/// Runs suspending writes one at a time, in the order they were requested.
///
/// Preference writes hop to a background dispatcher inside Kotlin, so three independent tasks from
/// three quick taps could commit in any order and leave the database disagreeing with the UI.
@MainActor
final class SerialWriteQueue {
    private var tail: Task<Void, Never>?

    /// Queues `work` behind anything already pending. Returns immediately.
    func enqueue(
        _ work: @escaping () async throws -> Void,
        onFailure: @escaping @MainActor (Error) -> Void = { _ in }
    ) {
        let previous = tail
        tail = Task { @MainActor in
            await previous?.value
            do {
                try await work()
            } catch {
                onFailure(error)
            }
        }
    }

    /// Waits for everything queued so far to finish.
    func drain() async {
        await tail?.value
    }
}
