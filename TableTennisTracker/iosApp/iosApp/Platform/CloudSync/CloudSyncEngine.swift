import CloudKit
import Shared
import os

enum CloudSyncFailure: Equatable, Sendable {
    case noAccount
    case quotaExceeded
    case other
}

/// Mirrors the Kotlin database into the user's private iCloud database with `CKSyncEngine`.
/// The engine decides when to talk to CloudKit; Kotlin's `CloudSync` decides what, keeps the outbox
/// that is the truth about what is still pending, and resolves every conflict. A deletion goes out
/// as a tombstone save, never a CloudKit delete, so a device that still holds the record cannot
/// bring it back.
actor CloudSyncEngine: CKSyncEngineDelegate {

    enum Update: Sendable {
        case syncing
        case synced(Date)
        case failed(CloudSyncFailure)
        case zoneDeleted
        /// Another Apple ID than the one this device synced with. Nothing goes up until the user
        /// turns sync on again: this device holds the previous account's training.
        case accountChanged
    }

    static let containerIdentifier = "iCloud.xyz.tleskiv.tt"
    private static let zoneID = CKRecordZone.ID(zoneName: "Training", ownerName: CKCurrentUserDefaultName)
    private static let log = Logger(subsystem: "xyz.tleskiv.tt", category: "CloudSync")

    private let sync: CloudSync
    private let report: @MainActor @Sendable (Update) -> Void
    private var container: CKContainer?
    private var engine: CKSyncEngine?

    /// Rejected for a reason a retry will not fix; they sit out until Sync now or the next foreground.
    private var quarantined: Set<String> = []

    private var operationsInFlight = 0
    private var failureThisRound: CloudSyncFailure?
    private var isAccountAvailable = true
    private var isShutDown = false
    private var zoneDeletedRemotely = false
    private var isRecoveringZone = false

    init(sync: CloudSync, report: @escaping @MainActor @Sendable (Update) -> Void) {
        self.sync = sync
        self.report = report
    }

    /// Not in `init`: an actor cannot hand itself out as the delegate from a synchronous initializer.
    func start() async {
        guard engine == nil, !isShutDown else { return }
        let container = CKContainer(identifier: Self.containerIdentifier)
        self.container = container
        let saved = Self.loadState()
        let engine = CKSyncEngine(CKSyncEngine.Configuration(
            database: container.privateCloudDatabase, stateSerialization: saved, delegate: self))
        self.engine = engine

        // Before anything is queued: the account may have changed while the app was not running.
        await refreshAccountStatus()
        if isAccountAvailable, let current = try? await container.userRecordID().recordName {
            if let known = Self.knownAccount, known != current { return await accountChanged() }
            Self.knownAccount = current
        }

        if saved == nil {
            engine.state.add(pendingDatabaseChanges: [.saveZone(CKRecordZone(zoneID: Self.zoneID))])
        }
        reconcile(sync.pendingRecordNames())
        if !isAccountAvailable {
            await report(.failed(.noAccount))
        }
    }

    /// `forgettingState` is for turning sync off. A stop because Pro lapsed keeps the engine's state,
    /// or coming back would look like a new sign-in and re-upload everything.
    func shutDown(forgettingState: Bool) async {
        isShutDown = true
        await engine?.cancelOperations()
        engine = nil
        if forgettingState {
            Self.deleteState()
            Self.knownAccount = nil
        }
    }

    func syncNow() async {
        guard let engine, !isShutDown else { return }
        await refreshAccountStatus()
        releaseQuarantine()
        do {
            try await engine.fetchChanges()
            try await engine.sendChanges()
        } catch {
            Self.log.error("sync failed: \(error)")
            await report(.failed(Self.failure(for: error)))
        }
    }

    /// Coming back to the foreground: pushes may have been missed, iCloud storage freed, or the
    /// account become available again.
    func fetchChanges() async {
        guard let engine, !isShutDown else { return }
        await refreshAccountStatus()
        releaseQuarantine()
        try? await engine.fetchChanges()
    }

    /// Adds only what the latest local writes queued; the engine ignores a change it already holds.
    func queue(_ recordNames: [String]) {
        guard let engine, !isShutDown else { return }
        let changes = recordNames.filter { !quarantined.contains($0) }.map(Self.saveChange)
        if !changes.isEmpty { engine.state.add(pendingRecordZoneChanges: changes) }
    }

    private func releaseQuarantine() {
        guard !quarantined.isEmpty else { return }
        quarantined.removeAll()
        reconcile(sync.pendingRecordNames())
    }

    /// Makes the engine's whole pending list match Kotlin's outbox. For the rare moments that can
    /// remove changes as well as add them; everyday writes go through `queue`.
    private func reconcile(_ recordNames: [String]) {
        guard let engine, !isShutDown else { return }
        let desired = Set(recordNames.filter { !quarantined.contains($0) }.map(Self.saveChange))
        let current = Set(engine.state.pendingRecordZoneChanges)
        let stale = current.subtracting(desired)
        let missing = desired.subtracting(current)
        if !stale.isEmpty { engine.state.remove(pendingRecordZoneChanges: Array(stale)) }
        if !missing.isEmpty { engine.state.add(pendingRecordZoneChanges: Array(missing)) }
    }

    private static func saveChange(_ recordName: String) -> CKSyncEngine.PendingRecordZoneChange {
        .saveRecord(CKRecord.ID(recordName: recordName, zoneID: zoneID))
    }

    private func refreshAccountStatus() async {
        guard let container, let status = try? await container.accountStatus() else { return }
        isAccountAvailable = status == .available
    }

    // MARK: - CKSyncEngineDelegate

    func handleEvent(_ event: CKSyncEngine.Event, syncEngine: CKSyncEngine) async {
        guard !isShutDown else { return }
        switch event {
        case .stateUpdate(let update):
            Self.saveState(update.stateSerialization)
        case .accountChange(let change):
            await handleAccountChange(change, engine: syncEngine)
        case .fetchedDatabaseChanges(let changes):
            await handleZoneDeletions(changes, engine: syncEngine)
        case .fetchedRecordZoneChanges(let changes):
            apply(changes.modifications.map(\.record), deletions: changes.deletions.map {
                CloudRecordDeletion(recordType: $0.recordType, recordName: $0.recordID.recordName)
            })
        case .sentRecordZoneChanges(let sent):
            await handleSent(sent, engine: syncEngine)
        case .willFetchChanges, .willSendChanges:
            await begin()
        case .didFetchChanges, .didSendChanges:
            await end()
        default:
            break
        }
    }

    func nextRecordZoneChangeBatch(
        _ context: CKSyncEngine.SendChangesContext, syncEngine: CKSyncEngine
    ) async -> CKSyncEngine.RecordZoneChangeBatch? {
        guard !isShutDown else { return nil }
        let changes = syncEngine.state.pendingRecordZoneChanges.filter { context.options.scope.contains($0) }
        return await CKSyncEngine.RecordZoneChangeBatch(pendingChanges: changes) { id in
            await self.recordToSend(id, engine: syncEngine)
        }
    }

    // MARK: - Sending

    private func recordToSend(_ id: CKRecord.ID, engine: CKSyncEngine) -> CKRecord? {
        guard let cloud = sync.recordForUpload(recordName: id.recordName) else {
            engine.state.remove(pendingRecordZoneChanges: [.saveRecord(id)])
            return nil
        }
        let record = cloud.systemFields.flatMap(CKRecord.fromSystemFields)
            ?? CKRecord(recordType: cloud.recordType, recordID: id)
        record.setValues(of: cloud)
        return record
    }

    private func handleSent(_ sent: CKSyncEngine.Event.SentRecordZoneChanges, engine: CKSyncEngine) async {
        var needsRequeue: [String] = []
        var needsRefetch: Set<String> = []
        var inMissingZone: [CKRecord.ID] = []
        var rejected: [CKRecord.ID] = []
        var zoneDeletedByUser = false

        for failure in sent.failedRecordSaves {
            let record = failure.record
            let name = record.recordID.recordName
            switch failure.error.code {
            case .serverRecordChanged:
                if let server = failure.error.serverRecord {
                    // Kotlin weighs the server's copy against the row: a local winner stays queued
                    // and goes out again on the server's change tag, a remote one is written here.
                    apply([server])
                    needsRequeue.append(name)
                } else {
                    // Re-sending on the same stale change tag would fail forever; a fetch brings the current one.
                    quarantined.insert(name)
                    needsRefetch.insert(name)
                }
            case .zoneNotFound:
                inMissingZone.append(record.recordID)
            case .userDeletedZone:
                zoneDeletedByUser = true
            case .unknownItem:
                // Deletions travel as tombstones, so no device ever removes a record from the server: a
                // missing one means the zone was wiped and recreated. The row is still ours; send it as new.
                sync.forgetSystemFields(recordName: name)
                needsRequeue.append(name)
            case .operationCancelled:
                break
            case _ where Self.isTransient(failure.error):
                failureThisRound = Self.failure(for: failure.error)
            default:
                Self.log.error("save of \(name) failed: \(failure.error)")
                quarantined.insert(name)
                failureThisRound = Self.failure(for: failure.error)
                rejected.append(record.recordID)
            }
        }

        queue(sync.markSent(saved: sent.savedRecords.map(\.cloudRecord)))

        if zoneDeletedByUser {
            zoneDeletedRemotely = true
            return await report(.zoneDeleted)
        }
        if !needsRequeue.isEmpty { queue(sync.pendingAmong(recordNames: needsRequeue)) }
        if !rejected.isEmpty { engine.state.remove(pendingRecordZoneChanges: rejected.map { .saveRecord($0) }) }
        // Detached: CKSyncEngine traps when a call that re-enters the delegate is awaited from within a
        // delegate callback, and a plain Task would inherit that context.
        if !inMissingZone.isEmpty {
            engine.state.remove(pendingRecordZoneChanges: inMissingZone.map { .saveRecord($0) })
            let names = inMissingZone.map(\.recordName)
            Task.detached { await self.recoverMissingZone(quarantining: names) }
        }
        if !needsRefetch.isEmpty {
            Task.detached { await self.refetch(releasing: needsRefetch) }
        }
    }

    /// The zone may be missing because the user deleted this app's data from iCloud settings, and
    /// recreating it would undo that. A fetch reports such a deletion; only without one does the
    /// zone come back. A recreated zone is empty, so every change tag is forgotten and every row
    /// queued again, not just the ones in the batch that failed: a stale tag on any of the rest
    /// would fail as `unknownItem`. Without a fetch the records sit out until Sync now or the next
    /// foreground, which retry them into the same check.
    private func recoverMissingZone(quarantining recordNames: [String]) async {
        guard let engine, !isShutDown, !isRecoveringZone else { return }
        isRecoveringZone = true
        defer { isRecoveringZone = false }
        do {
            try await engine.fetchChanges()
        } catch {
            quarantined.formUnion(recordNames)
            return
        }
        guard !zoneDeletedRemotely, !isShutDown else { return }
        sync.resetAndRequeueAll()
        engine.state.add(pendingDatabaseChanges: [.saveZone(CKRecordZone(zoneID: Self.zoneID))])
        reconcile(sync.pendingRecordNames())
    }

    private func refetch(releasing recordNames: Set<String>) async {
        guard let engine, !isShutDown else { return }
        do { try await engine.fetchChanges() } catch { return }
        quarantined.subtract(recordNames)
        reconcile(sync.pendingRecordNames())
    }

    // MARK: - Fetching

    private func apply(_ records: [CKRecord], deletions: [CloudRecordDeletion] = []) {
        sync.applyRemote(records: records.map(\.cloudRecord), deletions: deletions)
    }

    private func handleZoneDeletions(_ changes: CKSyncEngine.Event.FetchedDatabaseChanges, engine: CKSyncEngine) async {
        for deletion in changes.deletions where deletion.zoneID == Self.zoneID {
            switch deletion.reason {
            case .encryptedDataReset:
                sync.resetAndRequeueAll()
                engine.state.add(pendingDatabaseChanges: [.saveZone(CKRecordZone(zoneID: Self.zoneID))])
                reconcile(sync.pendingRecordNames())
            default:
                zoneDeletedRemotely = true
                await report(.zoneDeleted)
            }
        }
    }

    /// Signing back in to the account this device synced with requeues everything, since the server
    /// may have changed meanwhile. Any other account gets nothing: the rows here include the previous
    /// account's, and uploading them would hand one person's training to another's iCloud.
    private func handleAccountChange(_ change: CKSyncEngine.Event.AccountChange, engine: CKSyncEngine) async {
        switch change.changeType {
        case .signIn(let currentUser):
            if let known = Self.knownAccount, known != currentUser.recordName { return await accountChanged() }
            Self.knownAccount = currentUser.recordName
            isAccountAvailable = true
            quarantined.removeAll()
            sync.resetAndRequeueAll()
            engine.state.add(pendingDatabaseChanges: [.saveZone(CKRecordZone(zoneID: Self.zoneID))])
            reconcile(sync.pendingRecordNames())
        case .switchAccounts:
            await accountChanged()
        case .signOut:
            isAccountAvailable = false
            await report(.failed(.noAccount))
        @unknown default:
            break
        }
    }

    /// Stops sending at once, before the model has torn the engine down.
    private func accountChanged() async {
        isShutDown = true
        await report(.accountChanged)
    }

    // MARK: - Status

    private func begin() async {
        operationsInFlight += 1
        guard operationsInFlight == 1 else { return }
        failureThisRound = nil
        await report(.syncing)
    }

    private func end() async {
        operationsInFlight = max(0, operationsInFlight - 1)
        guard operationsInFlight == 0 else { return }
        if !isAccountAvailable { await refreshAccountStatus() }
        guard operationsInFlight == 0 else { return }
        guard isAccountAvailable else { return await report(.failed(.noAccount)) }
        await report(failureThisRound.map(Update.failed) ?? .synced(.now))
    }

    private static func isTransient(_ error: CKError) -> Bool {
        switch error.code {
        case .networkFailure, .networkUnavailable, .zoneBusy, .serviceUnavailable, .requestRateLimited,
             .notAuthenticated, .accountTemporarilyUnavailable, .operationCancelled:
            return true
        default:
            return false
        }
    }

    private static func failure(for error: Error) -> CloudSyncFailure {
        switch (error as? CKError)?.code {
        case .notAuthenticated, .accountTemporarilyUnavailable: return .noAccount
        case .quotaExceeded: return .quotaExceeded
        default: return .other
        }
    }

    // MARK: - Engine state

    private static var stateURL: URL {
        URL.applicationSupportDirectory.appending(path: "CloudSyncEngineState.json")
    }

    private static func loadState() -> CKSyncEngine.State.Serialization? {
        guard let data = try? Data(contentsOf: stateURL) else { return nil }
        return try? JSONDecoder().decode(CKSyncEngine.State.Serialization.self, from: data)
    }

    private static func saveState(_ state: CKSyncEngine.State.Serialization) {
        do {
            try FileManager.default.createDirectory(
                at: stateURL.deletingLastPathComponent(), withIntermediateDirectories: true)
            try JSONEncoder().encode(state).write(to: stateURL, options: .atomic)
        } catch {
            log.error("engine state not saved: \(error)")
        }
    }

    /// The user record of the account this device syncs with, so a different one is noticed even
    /// when CKSyncEngine reports it as a plain sign-in.
    private static let knownAccountKey = "cloudSyncAccount"

    private static var knownAccount: String? {
        get { UserDefaults.standard.string(forKey: knownAccountKey) }
        set { UserDefaults.standard.set(newValue, forKey: knownAccountKey) }
    }

    private static func deleteState() {
        try? FileManager.default.removeItem(at: stateURL)
    }
}
