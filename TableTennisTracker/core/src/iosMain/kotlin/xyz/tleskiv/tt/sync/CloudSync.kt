package xyz.tleskiv.tt.sync

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.repo.CloudSyncRepository

/**
 * What the Swift `CKSyncEngine` delegate calls into. CloudKit lives entirely in Swift; Kotlin owns
 * the database, so this is the whole boundary: which records are queued, what they hold, and what
 * to do with the ones iCloud sends back.
 *
 * Every method blocks and is safe off the main thread. The engine's delegate runs on its own queue,
 * and blocking there is what lets it hand CloudKit a record the moment it asks for one.
 *
 * Who may sync (Pro, and only in Debug and TestFlight builds) is decided in Swift, which owns both
 * the purchase state and the receipt; nothing here runs unless Swift has started the engine.
 */
class CloudSync internal constructor(private val repository: CloudSyncRepository) {

	fun isEnabled(): Boolean = repository.isEnabled()

	fun setEnabled(enabled: Boolean) = repository.setEnabled(enabled)

	fun resetAndRequeueAll() = repository.resetAndRequeueAll()

	/** The records each local write queued, so Swift can hand the engine only what is new. */
	val newlyQueuedRecordNames: Flow<List<String>> get() = repository.newlyQueuedRecordNames()

	fun pendingRecordNames(): List<String> = repository.pendingRecordNames()

	fun pendingAmong(recordNames: List<String>): List<String> = repository.pendingAmong(recordNames)

	fun recordForUpload(recordName: String): CloudRecord? = repository.recordForUpload(recordName)

	/** Returns the records written again while in flight, which still need sending. */
	fun markSent(saved: List<CloudRecord>): List<String> = repository.markSent(saved)

	fun forgetSystemFields(recordName: String) = repository.forgetSystemFields(recordName)

	fun applyRemote(records: List<CloudRecord>, deletions: List<CloudRecordDeletion>) =
		repository.applyRemote(records, deletions)
}
