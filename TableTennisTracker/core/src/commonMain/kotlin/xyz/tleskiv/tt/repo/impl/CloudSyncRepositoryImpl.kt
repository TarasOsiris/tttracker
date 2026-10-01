package xyz.tleskiv.tt.repo.impl

import app.cash.sqldelight.Query
import app.cash.sqldelight.db.SqlDriver
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.conflate
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.localDateAdapter
import xyz.tleskiv.tt.repo.CloudSyncRepository
import xyz.tleskiv.tt.sync.CloudRecord
import xyz.tleskiv.tt.sync.CloudRecordDeletion
import xyz.tleskiv.tt.sync.FieldType
import xyz.tleskiv.tt.sync.SyncedTable
import xyz.tleskiv.tt.util.nowInstant
import kotlin.time.Instant
import kotlin.uuid.Uuid

/**
 * One version of a record, ordered so that merging is a join: deleted beats live, then the later
 * updated_at wins, then — for two live versions stamped the same millisecond — the greater content.
 * Every device compares the same two versions the same way, whichever order they arrive in, so
 * they all settle on the same one. Tombstones carry no content, so two of them differ only in time.
 */
private class Version(val isDeleted: Boolean, val modifiedAt: Long, val content: String) : Comparable<Version> {
	override fun compareTo(other: Version): Int =
		compareValuesBy(this, other, { it.isDeleted }, { it.modifiedAt }, { it.content })
}

internal class CloudSyncRepositoryImpl(
	private val database: AppDatabase,
	private val driver: SqlDriver,
	private val ioDispatcher: CoroutineDispatcher
) : CloudSyncRepository {

	private val queries get() = database.appDatabaseQueries

	/**
	 * The outbox seq each record was read at for upload. Only the engine's actor touches it, one call
	 * at a time. Lost on relaunch, where [markSent] falls back to comparing changed_at.
	 */
	private val uploadedSeqs = mutableMapOf<String, Long>()

	override fun isEnabled(): Boolean = queries.isCloudSyncEnabled().executeAsOne()

	override fun setEnabled(enabled: Boolean) {
		queries.transaction {
			if (enabled) {
				queries.enableCloudSync()
				enqueueAll()
			} else {
				queries.disableCloudSync()
			}
		}
		if (enabled) driver.notifyListeners(OUTBOX)
	}

	override fun resetAndRequeueAll() {
		queries.transaction {
			queries.resetCloudSyncMetadata()
			enqueueAll()
		}
		driver.notifyListeners(OUTBOX)
	}

	/**
	 * Every row of every synced table, deleted ones included so they go out as tombstones. OR IGNORE
	 * keeps a queued hard delete. Raw SQL because a table name cannot be a bound parameter, so the
	 * caller notifies the outbox's listeners itself.
	 */
	private fun enqueueAll() {
		queries.bumpCloudSyncOutboxSeq()
		SyncedTable.entries.forEach { table ->
			driver.execute(
				null,
				"""
				INSERT OR IGNORE INTO $OUTBOX (record_id, table_name, is_purged, changed_at, seq)
				SELECT id, '${table.table}', 0, updated_at, (SELECT outbox_seq FROM cloud_sync_state) FROM ${table.table}
				""".trimIndent(),
				0
			)
		}
	}

	override fun pendingRecordNames(): List<String> = queries.selectCloudSyncOutbox().executeAsList()

	override fun pendingAmong(recordNames: Collection<String>): List<String> =
		recordNames.filter { queries.selectCloudSyncOutboxEntry(it).executeAsOneOrNull() != null }

	/** Reads only past the last outbox_seq seen, so a write costs what it queued, not the whole outbox. */
	override fun newlyQueuedRecordNames(): Flow<List<String>> = flow {
		var lastSeq = -1L
		databaseWrites().collect {
			val queued = queries.selectCloudSyncOutboxSince(lastSeq).executeAsList()
			if (queued.isNotEmpty()) {
				lastSeq = queued.last().seq
				emit(queued.map { it.record_id })
			}
		}
	}.flowOn(ioDispatcher)

	/**
	 * A driver listener rather than a query flow on the outbox: the outbox is written by triggers,
	 * and SQLDelight notifies only the tables a statement names.
	 */
	private fun databaseWrites(): Flow<Unit> = callbackFlow {
		val tables = (SyncedTable.entries.map { it.table } + OUTBOX).toTypedArray()
		val listener = Query.Listener { trySend(Unit) }
		driver.addListener(*tables, listener = listener)
		send(Unit)
		awaitClose { driver.removeListener(*tables, listener = listener) }
	}.conflate()

	override fun recordForUpload(recordName: String): CloudRecord? = queries.transactionWithResult {
		val entry = queries.selectCloudSyncOutboxEntry(recordName).executeAsOneOrNull() ?: return@transactionWithResult null
		val table = SyncedTable.forTable(entry.table_name) ?: return@transactionWithResult null
		val record = if (entry.is_purged != 0L) {
			tombstone(table, recordName, entry.changed_at)
		} else {
			rowRecord(table, recordName) ?: return@transactionWithResult null
		}
		uploadedSeqs[recordName] = entry.seq
		record.withSystemFields(queries.selectCloudSyncSystemFields(recordName).executeAsOneOrNull())
	}

	override fun markSent(saved: List<CloudRecord>): List<String> = queries.transactionWithResult {
		saved.mapNotNull { record ->
			val name = record.recordName
			val systemFields = record.systemFields
			if (systemFields != null) {
				queries.upsertCloudSyncSystemFields(name, systemFields)
			} else {
				queries.deleteCloudSyncSystemFields(name)
			}
			val seq = uploadedSeqs.remove(name)
			if (seq != null) {
				queries.deleteCloudSyncOutboxEntryIfSeq(name, seq)
			} else {
				queries.deleteCloudSyncOutboxEntryIfUnchanged(name, record.modifiedAt)
			}
			name.takeIf { queries.selectCloudSyncOutboxEntry(it).executeAsOneOrNull() != null }
		}
	}

	override fun forgetSystemFields(recordName: String) {
		queries.deleteCloudSyncSystemFields(recordName)
	}

	/**
	 * Each incoming record is weighed against the local row by [Version] — queued or not, since the
	 * order is a pure function of the two versions. The loser is overwritten: a remote winner is
	 * written to the row, a local winner is queued to overwrite iCloud's copy. Equal versions are
	 * already in step, so any queued upload is dropped.
	 *
	 * Writing a remote version fires the change triggers like any other write, so its outbox row is
	 * removed straight after; otherwise every fetched record would echo back to iCloud.
	 *
	 * A record CloudKit reports deleted (which this app never does: deletions travel as tombstones)
	 * is taken as deleted here too, since a deletion wins whatever its time.
	 *
	 * Last, the app's own cascade runs again: a match can arrive live under a session or opponent
	 * that another device deleted while this one was adding to it.
	 */
	override fun applyRemote(records: List<CloudRecord>, deletions: List<CloudRecordDeletion>) = queries.transaction {
		var wroteAny = false

		records.mapNotNull { record -> SyncedTable.forRecordType(record.recordType)?.let { it to record } }
			.sortedBy { (table, _) -> table.ordinal }
			.forEach { (table, record) ->
				val name = record.recordName
				val id = parseId(name) ?: return@forEach
				record.systemFields?.let { queries.upsertCloudSyncSystemFields(name, it) }
				val pending = queries.selectCloudSyncOutboxEntry(name).executeAsOneOrNull()
				val local = if (pending?.is_purged == 1L) {
					Version(isDeleted = true, modifiedAt = pending.changed_at, content = "")
				} else {
					rowRecord(table, name)?.version(table)
				}
				val remote = record.version(table)
				when {
					local == null && remote.isDeleted -> Unit
					(local == null || remote > local) && write(table, id, record) -> {
						queries.deleteCloudSyncOutboxEntry(name)
						wroteAny = true
					}
					local == null -> Unit
					local.compareTo(remote) == 0 -> queries.deleteCloudSyncOutboxEntry(name)
					pending == null -> queries.enqueueForCloudSync(name, table.table, local.modifiedAt)
				}
			}

		deletions.forEach { deletion ->
			val table = SyncedTable.forRecordType(deletion.recordType) ?: return@forEach
			val name = deletion.recordName
			val id = parseId(name) ?: return@forEach
			val row = rowRecord(table, name)
			if (row != null && !row.isDeleted) {
				markDeleted(table, id, Instant.fromEpochMilliseconds(row.modifiedAt))
				wroteAny = true
			}
			queries.deleteCloudSyncOutboxEntry(name)
			queries.deleteCloudSyncSystemFields(name)
		}

		if (wroteAny) queries.deleteMatchesOfDeletedParents(nowInstant)
	}

	/**
	 * False when [r] cannot be written: a match naming no valid session or opponent, say from a
	 * damaged record. It then counts as losing, so a local copy goes up and repairs iCloud's; dropping
	 * the local queued upload instead would leave the devices apart for good.
	 */
	private fun write(table: SyncedTable, id: Uuid, r: CloudRecord): Boolean {
		val updatedAt = Instant.fromEpochMilliseconds(r.modifiedAt)
		if (r.isDeleted) {
			markDeleted(table, id, updatedAt)
			return true
		}
		when (table) {
			SyncedTable.OPPONENT -> queries.syncUpsertOpponent(
				name = r.string("name").orEmpty(), club = r.string("club"), rating = r.double("rating"),
				handedness = r.string("handedness"), style = r.string("style"), notes = r.string("notes"),
				created_at = r.instant("createdAt"), updated_at = updatedAt, id = id
			)
			SyncedTable.SESSION -> queries.syncUpsertSession(
				date = localDateAdapter.decode(r.long("date") ?: 0), duration_min = r.long("durationMin") ?: 0,
				rpe = r.long("rpe") ?: 0, session_type = r.string("sessionType"), notes = r.string("notes"),
				created_at = r.instant("createdAt"), updated_at = updatedAt, id = id
			)
			SyncedTable.MATCH -> {
				val sessionId = r.string("sessionId")?.let(::parseId) ?: return false
				val opponentId = r.string("opponentId")?.let(::parseId) ?: return false
				queries.syncUpsertMatch(
					session_id = sessionId, opponent_id = opponentId, my_games_won = r.long("myGamesWon") ?: 0,
					opponent_games_won = r.long("opponentGamesWon") ?: 0, games = r.string("games"),
					is_doubles = r.long("isDoubles") == 1L, is_ranked = r.long("isRanked") == 1L,
					competition_level = r.string("competitionLevel"), rpe = r.long("rpe"), notes = r.string("notes"),
					created_at = r.instant("createdAt"), updated_at = updatedAt, id = id
				)
			}
		}
		return true
	}

	private fun markDeleted(table: SyncedTable, id: Uuid, updatedAt: Instant) {
		when (table) {
			SyncedTable.OPPONENT -> queries.syncMarkOpponentDeleted(updatedAt, id)
			SyncedTable.SESSION -> queries.syncMarkSessionDeleted(updatedAt, id)
			SyncedTable.MATCH -> queries.syncMarkMatchDeleted(updatedAt, id)
		}
	}

	/** The row as it would go to iCloud, soft-deleted ones as tombstones; null if there is no row. */
	private fun rowRecord(table: SyncedTable, recordName: String): CloudRecord? {
		val id = parseId(recordName) ?: return null
		return when (table) {
			SyncedTable.OPPONENT -> queries.selectOpponentRowById(id).executeAsOneOrNull()?.let {
				if (it.is_deleted) return tombstone(table, recordName, it.updated_at.millis)
				record(
					table, recordName, it.updated_at.millis,
					mapOf(
						"name" to it.name, "club" to it.club, "rating" to it.rating, "handedness" to it.handedness,
						"style" to it.style, "notes" to it.notes, "createdAt" to it.created_at.millis
					)
				)
			}
			SyncedTable.SESSION -> queries.selectSessionRowById(id).executeAsOneOrNull()?.let {
				if (it.is_deleted) return tombstone(table, recordName, it.updated_at.millis)
				record(
					table, recordName, it.updated_at.millis,
					mapOf(
						"date" to localDateAdapter.encode(it.date), "durationMin" to it.duration_min, "rpe" to it.rpe,
						"sessionType" to it.session_type, "notes" to it.notes, "createdAt" to it.created_at.millis
					)
				)
			}
			SyncedTable.MATCH -> queries.selectMatchRowById(id).executeAsOneOrNull()?.let {
				if (it.is_deleted) return tombstone(table, recordName, it.updated_at.millis)
				record(
					table, recordName, it.updated_at.millis,
					mapOf(
						"sessionId" to it.session_id.toHexString(), "opponentId" to it.opponent_id.toHexString(),
						"myGamesWon" to it.my_games_won, "opponentGamesWon" to it.opponent_games_won, "games" to it.games,
						"isDoubles" to it.is_doubles.toLong(), "isRanked" to it.is_ranked.toLong(),
						"competitionLevel" to it.competition_level, "rpe" to it.rpe, "notes" to it.notes,
						"createdAt" to it.created_at.millis
					)
				)
			}
		}
	}

	private fun tombstone(table: SyncedTable, recordName: String, modifiedAt: Long) =
		record(table, recordName, modifiedAt, emptyMap(), isDeleted = true)

	private fun record(
		table: SyncedTable,
		recordName: String,
		modifiedAt: Long,
		values: Map<String, Any?>,
		isDeleted: Boolean = false
	) = CloudRecord(
		recordType = table.recordType,
		recordName = recordName,
		strings = values.filterValuesIsInstance<String>(),
		integers = values.filterValuesIsInstance<Long>(),
		doubles = values.filterValuesIsInstance<Double>(),
		nullKeys = table.fields.map { it.key }.filter { values[it] == null },
		isDeleted = isDeleted,
		modifiedAt = modifiedAt,
		systemFields = null
	)

	private fun CloudRecord.withSystemFields(systemFields: String?) = CloudRecord(
		recordType, recordName, strings, integers, doubles, nullKeys, isDeleted, modifiedAt, systemFields
	)

	/**
	 * Only the fields this version of the app knows, each read as its own type, so a local row and
	 * the same row back from iCloud compare equal.
	 */
	private fun CloudRecord.version(table: SyncedTable): Version {
		if (isDeleted) return Version(isDeleted = true, modifiedAt = modifiedAt, content = "")
		val content = table.fields.joinToString("\u001F") { field ->
			val value = when (field.type) {
				FieldType.STRING -> string(field.key)
				FieldType.LONG -> long(field.key)
				FieldType.DOUBLE -> double(field.key)
			}
			"${field.key}=${value ?: "\u0000"}"
		}
		return Version(isDeleted = false, modifiedAt = modifiedAt, content = content)
	}

	private fun CloudRecord.string(key: String): String? = strings[key]
	private fun CloudRecord.long(key: String): Long? = integers[key] ?: doubles[key]?.toLong()
	private fun CloudRecord.double(key: String): Double? = doubles[key] ?: integers[key]?.toDouble()
	private fun CloudRecord.instant(key: String) = Instant.fromEpochMilliseconds(long(key) ?: 0)

	private val Instant.millis get() = toEpochMilliseconds()
	private fun Boolean.toLong() = if (this) 1L else 0L

	private fun parseId(recordName: String): Uuid? = runCatching { Uuid.parseHex(recordName) }.getOrNull()

	private inline fun <reified V> Map<String, Any?>.filterValuesIsInstance(): Map<String, V> =
		entries.mapNotNull { (key, value) -> (value as? V)?.let { key to it } }.toMap()

	private companion object {
		const val OUTBOX = "cloud_sync_outbox"
	}
}
