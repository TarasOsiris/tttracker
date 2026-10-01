package xyz.tleskiv.tt.repo

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.sync.CloudRecord
import xyz.tleskiv.tt.sync.CloudRecordDeletion

/**
 * The database half of iCloud sync. Local writes are queued by triggers (see
 * `installCloudSyncTracking()`), never by the other repositories, so nothing else in the app knows
 * sync exists.
 *
 * Blocking rather than `suspend`: the sync engine calls in from its own background threads and
 * needs each answer before it can hand CloudKit the next record.
 */
internal interface CloudSyncRepository {
	fun isEnabled(): Boolean

	/** Enabling queues every row; disabling forgets the queue (bar hard deletes) and every change tag. */
	fun setEnabled(enabled: Boolean)

	/** For a new iCloud account or a deleted zone: nothing known about the server is true any more. */
	fun resetAndRequeueAll()

	fun pendingRecordNames(): List<String>

	/** Those of [recordNames] still queued, without reading the whole outbox. */
	fun pendingAmong(recordNames: Collection<String>): List<String>

	/** The records queued since the previous emission; the first emission is the whole outbox. */
	fun newlyQueuedRecordNames(): Flow<List<String>>

	/** Null when nothing is queued for [recordName] any more. */
	fun recordForUpload(recordName: String): CloudRecord?

	/**
	 * [saved] are the records as CloudKit acknowledged them. Returns the ones written again while in
	 * flight, which stay queued and must go out again.
	 */
	fun markSent(saved: List<CloudRecord>): List<String>

	fun forgetSystemFields(recordName: String)

	/** Merges what iCloud sent into the database; see `CloudSyncRepositoryImpl` for the rule. */
	fun applyRemote(records: List<CloudRecord>, deletions: List<CloudRecordDeletion>)
}
