import Foundation
import Observation
import Shared
import UIKit

/// iCloud sync's switch and status, and the owner of the `CloudSyncEngine`. The engine runs only
/// while `isUnlocked` (Pro).
///
/// Losing Pro stops the engine but keeps the stored switch, because `false` is also what RevenueCat
/// reports before it has answered; turning sync off there would cost a full re-upload the moment the
/// answer lands.
@MainActor
@Observable
final class CloudSyncModel {

    enum Status: Equatable {
        case idle
        case syncing
        case synced(Date)
        case failed(CloudSyncFailure)
        case turnedOffRemotely
        case accountChanged
    }

    private(set) var isLoaded = false
    private(set) var isEnabled = false
    private(set) var isUnlocked = false
    private(set) var status: Status = .idle

    private static let lastSyncedKey = "cloudSyncLastSyncedAt"

    /// Lazy: the app builds this model as a stored property, before `AppBootstrap` has started Koin.
    @ObservationIgnored private lazy var sync: CloudSync = Services.cloudSync
    @ObservationIgnored private var engine: CloudSyncEngine?
    @ObservationIgnored private var startup: Task<Void, Never>?
    @ObservationIgnored private var queuedRecords: FlowSubscription?
    @ObservationIgnored private var isStarted = false

    /// Database work and engine teardown, serially and off the main thread: a quick off/on must not
    /// let the new engine load the state file the old one is deleting.
    @ObservationIgnored private var lifecycle: Task<Void, Never>?

    private func enqueue(_ work: @escaping @Sendable () async -> Void) {
        let previous = lifecycle
        lifecycle = Task.detached {
            await previous?.value
            await work()
        }
    }

    func start(isUnlocked: Bool) {
        guard !isStarted else { return }
        isStarted = true
        self.isUnlocked = isUnlocked

        NotificationCenter.default.addObserver(
            forName: UIApplication.willEnterForegroundNotification, object: nil, queue: .main
        ) { [weak self] _ in
            Task { @MainActor in await self?.engine?.fetchChanges() }
        }

        let sync = sync
        enqueue { [weak self] in
            let enabled = sync.isEnabled()
            await self?.didLoad(isEnabled: enabled)
        }
    }

    private func didLoad(isEnabled: Bool) {
        self.isEnabled = isEnabled
        isLoaded = true
        resumeIfAllowed()
    }

    func setUnlocked(_ unlocked: Bool) {
        guard isStarted, unlocked != isUnlocked else { return }
        isUnlocked = unlocked
        if unlocked {
            resumeIfAllowed()
        } else if engine != nil {
            stopEngine(forgettingState: false)
            status = .idle
        }
    }

    private func resumeIfAllowed() {
        guard isLoaded, isEnabled, isUnlocked, engine == nil else { return }
        if let date = UserDefaults.standard.object(forKey: Self.lastSyncedKey) as? Date {
            status = .synced(date)
        }
        startEngine()
    }

    /// The user's switch. Sync turning itself off goes through `turnOff(showing:)` alone, so it is
    /// not counted as the user opting out.
    func setEnabled(_ enabled: Bool) {
        guard isLoaded, enabled != isEnabled, isUnlocked || !enabled else { return }
        if enabled {
            isEnabled = true
            UserDefaults.standard.removeObject(forKey: Self.lastSyncedKey)
            status = .syncing
            let sync = sync
            enqueue { sync.setEnabled(enabled: true) }
            startEngine()
        } else {
            turnOff(showing: .idle)
        }
        Services.analytics.capture(event: enabled ? "icloud_sync_enabled" : "icloud_sync_disabled", properties: nil)
    }

    private func turnOff(showing status: Status) {
        guard isEnabled else { return }
        isEnabled = false
        UserDefaults.standard.removeObject(forKey: Self.lastSyncedKey)
        self.status = status
        stopEngine(forgettingState: true)
        let sync = sync
        enqueue { sync.setEnabled(enabled: false) }
    }

    func syncNow() {
        guard let engine else { return }
        Task { await engine.syncNow() }
    }

    private func startEngine() {
        let engine = CloudSyncEngine(sync: sync) { [weak self] update in self?.apply(update) }
        self.engine = engine
        UIApplication.shared.registerForRemoteNotifications()

        enqueue { await engine.start() }
        let ready = lifecycle
        startup = Task { [weak self] in
            await ready?.value
            guard !Task.isCancelled, let self else { return }
            Task { await engine.syncNow() }
            queuedRecords = KotlinFlow.observe(sync.newlyQueuedRecordNames, as: [String].self) { recordNames in
                Task { await engine.queue(recordNames) }
            }
        }
    }

    private func stopEngine(forgettingState: Bool) {
        startup?.cancel()
        startup = nil
        queuedRecords?.cancel()
        queuedRecords = nil
        guard let engine else { return }
        self.engine = nil
        enqueue { await engine.shutDown(forgettingState: forgettingState) }
    }

    private func apply(_ update: CloudSyncEngine.Update) {
        guard isEnabled, isUnlocked else { return }
        switch update {
        case .syncing:
            status = .syncing
        case .synced(let date):
            status = .synced(date)
            UserDefaults.standard.set(date, forKey: Self.lastSyncedKey)
        case .failed(let failure):
            status = .failed(failure)
        case .zoneDeleted:
            turnOff(showing: .turnedOffRemotely)
        case .accountChanged:
            turnOff(showing: .accountChanged)
        }
    }
}
