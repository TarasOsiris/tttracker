package xyz.tleskiv.tt.repo

import app.cash.sqldelight.db.QueryResult
import app.cash.sqldelight.driver.native.inMemoryDriver
import io.kotest.matchers.collections.shouldBeEmpty
import io.kotest.matchers.collections.shouldContainExactly
import io.kotest.matchers.collections.shouldContainExactlyInAnyOrder
import io.kotest.matchers.nulls.shouldBeNull
import io.kotest.matchers.nulls.shouldNotBeNull
import io.kotest.matchers.shouldBe
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.installCloudSyncTracking
import xyz.tleskiv.tt.di.createAppDatabase
import xyz.tleskiv.tt.repo.impl.CloudSyncRepositoryImpl
import xyz.tleskiv.tt.repo.impl.TrainingSessionsRepositoryImpl
import xyz.tleskiv.tt.service.MatchInput
import xyz.tleskiv.tt.sync.CloudRecord
import xyz.tleskiv.tt.sync.CloudRecordDeletion
import kotlin.test.Test
import kotlin.time.Instant
import kotlin.uuid.Uuid

/** One install of the app: its own database, sync repository and session repository. */
private class Device {
	val driver = inMemoryDriver(AppDatabase.Schema).also { it.installCloudSyncTracking() }
	val database = createAppDatabase(driver)
	val queries = database.appDatabaseQueries
	val sync = CloudSyncRepositoryImpl(database, driver, Dispatchers.Default)
	val sessions = TrainingSessionsRepositoryImpl(database, Dispatchers.Default)

	fun insertSession(id: Uuid, at: Long, notes: String? = null) = queries.insertSession(
		id = id, date = LocalDate(2026, 9, 1), duration_min = 60, rpe = 5, session_type = null, notes = notes,
		updated_at = Instant.fromEpochMilliseconds(at)
	)

	fun editSession(id: Uuid, at: Long, notes: String?) = queries.updateSession(
		date = LocalDate(2026, 9, 1), duration_min = 60, rpe = 5, session_type = null, notes = notes,
		updated_at = Instant.fromEpochMilliseconds(at), id = id
	)

	fun insertOpponent(id: Uuid, at: Long, name: String = "Ma Long") = queries.insertOpponent(
		id = id, name = name, club = null, rating = 1500.5, handedness = null, style = null, notes = null,
		updated_at = Instant.fromEpochMilliseconds(at)
	)

	fun insertMatch(id: Uuid, sessionId: Uuid, opponentId: Uuid, at: Long) = queries.insertMatch(
		id = id, session_id = sessionId, opponent_id = opponentId, my_games_won = 3, opponent_games_won = 1, games = null,
		is_doubles = false, is_ranked = true, competition_level = null, rpe = null, notes = null,
		updated_at = Instant.fromEpochMilliseconds(at)
	)

	fun session(id: Uuid) = queries.selectSessionRowById(id).executeAsOneOrNull()
	fun match(id: Uuid) = queries.selectMatchRowById(id).executeAsOneOrNull()
	fun pending() = sync.pendingRecordNames()

	fun schemaVersion(): Long = driver.executeQuery(
		null, "PRAGMA schema_version;", { QueryResult.Value(if (it.next().value) it.getLong(0)!! else 0L) }, 0
	).value
}

/**
 * CloudKit's private database as `CKSyncEngine` sees it: a save carries the change tag it was made
 * against and is refused with the server's copy when that tag is stale, which the engine answers by
 * merging that copy (`applyRemote`) and sending again whatever is still queued.
 */
private class FakeCloud {
	val records = mutableMapOf<String, CloudRecord>()
	private var nextTag = 0

	fun push(device: Device) {
		repeat(MAX_ROUNDS) {
			val queued = device.pending()
			if (queued.isEmpty()) return
			val saved = mutableListOf<CloudRecord>()
			for (name in queued) {
				val outgoing = device.sync.recordForUpload(name) ?: continue
				val current = records[name]
				if (current != null && current.systemFields != outgoing.systemFields) {
					device.sync.applyRemote(listOf(current), emptyList())
					continue
				}
				val stored = outgoing.received("tag-${nextTag++}")
				records[name] = stored
				saved += stored
			}
			device.sync.markSent(saved)
		}
		error("outbox never drained")
	}

	fun pull(device: Device) = device.sync.applyRemote(records.values.toList(), emptyList())

	/** Swift copies every key it finds and nothing else: a null field arrives absent. */
	private fun CloudRecord.received(tag: String) =
		CloudRecord(recordType, recordName, strings, integers, doubles, emptyList(), isDeleted, modifiedAt, tag)

	private companion object {
		const val MAX_ROUNDS = 10
	}
}

class CloudSyncRepositoryTest {

	private val sessionId = Uuid.random()
	private val opponentId = Uuid.random()
	private val matchId = Uuid.random()
	private val sessionName = sessionId.toHexString()
	private val matchName = matchId.toHexString()
	private val phoneNotes = "Phone"
	private val tabletNotes = "Tablet"

	@Test
	fun setEnabled_withExistingRows_queuesEveryRowIncludingDeletedOnes() {
		val device = Device()
		device.insertSession(sessionId, at = 1_000)
		device.insertOpponent(opponentId, at = 1_000)
		device.insertMatch(matchId, sessionId, opponentId, at = 1_000)
		device.queries.deleteMatch(updated_at = Instant.fromEpochMilliseconds(2_000), id = matchId)

		device.sync.setEnabled(true)

		device.pending() shouldContainExactlyInAnyOrder listOf(sessionName, opponentId.toHexString(), matchName)
	}

	@Test
	fun localWrite_whileSyncNeverEnabled_queuesNothing() {
		val device = Device()

		device.insertSession(sessionId, at = 1_000)

		device.pending().shouldBeEmpty()
	}

	@Test
	fun updateSession_withUnchangedContent_neitherRestampsNorQueues() {
		val device = Device()
		val insertedAt = 1_000L
		device.insertSession(sessionId, at = insertedAt, notes = "Loops")
		device.sync.setEnabled(true)
		device.sync.markSent(device.pending().mapNotNull { device.sync.recordForUpload(it) })

		device.editSession(sessionId, at = 5_000, notes = "Loops")

		device.session(sessionId)?.updated_at shouldBe Instant.fromEpochMilliseconds(insertedAt)
		device.pending().shouldBeEmpty()
	}

	@Test
	fun updateSession_withClockBehindStoredVersion_stampsAfterIt() {
		val device = Device()
		val storedAt = 10_000L
		val laggingClock = 4_000L
		device.insertSession(sessionId, at = storedAt)

		device.editSession(sessionId, at = laggingClock, notes = "Edited")

		device.session(sessionId)?.updated_at shouldBe Instant.fromEpochMilliseconds(storedAt + 1)
	}

	@Test
	fun applyRemote_newerRemoteEdit_overwritesQueuedLocalEditAndUnqueuesIt() {
		val (phone, tablet, cloud) = pairedDevices()
		phone.editSession(sessionId, at = 2_000, notes = phoneNotes)
		tablet.editSession(sessionId, at = 3_000, notes = tabletNotes)

		cloud.push(tablet)
		cloud.pull(phone)

		phone.session(sessionId)?.notes shouldBe tabletNotes
		phone.pending().shouldBeEmpty()
	}

	@Test
	fun push_olderLocalEditAgainstNewerServerCopy_takesServerCopyAndSendsNothing() {
		val (phone, tablet, cloud) = pairedDevices()
		tablet.editSession(sessionId, at = 3_000, notes = tabletNotes)
		cloud.push(tablet)
		phone.editSession(sessionId, at = 2_000, notes = phoneNotes)

		cloud.push(phone)

		phone.session(sessionId)?.notes shouldBe tabletNotes
		cloud.records.getValue(sessionName).strings["notes"] shouldBe tabletNotes
	}

	@Test
	fun push_newerLocalEditAgainstOlderServerCopy_overwritesServerCopy() {
		val (phone, tablet, cloud) = pairedDevices()
		tablet.editSession(sessionId, at = 2_000, notes = tabletNotes)
		cloud.push(tablet)
		phone.editSession(sessionId, at = 3_000, notes = phoneNotes)

		cloud.push(phone)
		cloud.pull(tablet)

		cloud.records.getValue(sessionName).strings["notes"] shouldBe phoneNotes
		tablet.session(sessionId)?.notes shouldBe phoneNotes
	}

	@Test
	fun applyRemote_olderRemoteCopyOfUnqueuedRow_requeuesLocalVersion() {
		val device = Device()
		device.sync.setEnabled(true)
		val localNotes = "Local"
		device.insertSession(sessionId, at = 5_000, notes = localNotes)
		device.sync.markSent(device.pending().mapNotNull { device.sync.recordForUpload(it) })
		val staleRemote = sessionRecord(modifiedAt = 1_000, notes = "Stale")

		device.sync.applyRemote(listOf(staleRemote), emptyList())

		device.session(sessionId)?.notes shouldBe localNotes
		device.pending() shouldContainExactly listOf(sessionName)
	}

	@Test
	fun applyRemote_tombstoneOlderThanLocalEdit_stillDeletesRow() {
		val (phone, tablet, cloud) = pairedDevices()
		tablet.sessionsDelete(sessionId, at = 2_000)
		phone.editSession(sessionId, at = 9_000, notes = "Edited after the delete")

		cloud.push(tablet)
		cloud.push(phone)
		cloud.pull(tablet)

		phone.session(sessionId)?.is_deleted shouldBe true
		tablet.session(sessionId)?.is_deleted shouldBe true
		cloud.records.getValue(sessionName).isDeleted shouldBe true
	}

	@Test
	fun recordForUpload_softDeletedRow_isTombstoneWithoutContent() {
		val device = Device()
		device.insertSession(sessionId, at = 1_000, notes = "Private")
		device.sync.setEnabled(true)
		device.sessionsDelete(sessionId, at = 2_000)

		val record = device.sync.recordForUpload(sessionName).shouldNotBeNull()

		record.isDeleted shouldBe true
		record.strings shouldBe emptyMap()
		record.integers shouldBe emptyMap()
		record.nullKeys shouldContainExactlyInAnyOrder listOf("date", "durationMin", "rpe", "sessionType", "notes", "createdAt")
	}

	@Test
	fun applyRemote_sameTimestampDifferentContent_bothDevicesSettleOnOneVersion() {
		val (phone, tablet, cloud) = pairedDevices()
		val sameMillisecond = 4_000L
		phone.editSession(sessionId, at = sameMillisecond, notes = phoneNotes)
		tablet.editSession(sessionId, at = sameMillisecond, notes = tabletNotes)

		cloud.push(phone)
		cloud.push(tablet)
		cloud.pull(phone)
		cloud.push(phone)

		val settled = cloud.records.getValue(sessionName).strings["notes"]
		phone.session(sessionId)?.notes shouldBe settled
		tablet.session(sessionId)?.notes shouldBe settled
	}

	@Test
	fun applyRemote_matchAddedUnderSessionDeletedElsewhere_isDeletedAndQueued() {
		val (phone, tablet, cloud) = pairedDevices()
		tablet.sessionsDelete(sessionId, at = 2_000)
		phone.insertOpponent(opponentId, at = 2_000)
		phone.insertMatch(matchId, sessionId, opponentId, at = 3_000)

		cloud.push(tablet)
		cloud.push(phone)
		cloud.pull(tablet)
		cloud.push(tablet)
		cloud.pull(phone)

		phone.match(matchId)?.is_deleted shouldBe true
		tablet.match(matchId)?.is_deleted shouldBe true
		cloud.records.getValue(matchName).isDeleted shouldBe true
	}

	@Test
	fun applyRemote_matchBeforeItsSessionAndOpponent_isStoredAndJoinsOnceTheyArrive() {
		val (phone, _, cloud) = pairedDevices()
		phone.insertOpponent(opponentId, at = 2_000)
		phone.insertMatch(matchId, sessionId, opponentId, at = 2_000)
		cloud.push(phone)
		val fresh = Device().also { it.sync.setEnabled(true) }
		val match = cloud.records.getValue(matchName)
		val parents = cloud.records.values.filter { it.recordName != matchName }

		fresh.sync.applyRemote(listOf(match), emptyList())
		fresh.sync.applyRemote(parents, emptyList())

		fresh.match(matchId).shouldNotBeNull().is_deleted shouldBe false
		fresh.queries.getSessionWithMatchesById(sessionId).executeAsList().map { it.match_id } shouldContainExactly listOf(matchId)
		fresh.pending().shouldBeEmpty()
	}

	@Test
	fun pull_everyRecordType_reproducesRowsExactlyWithoutEchoingThemBack() {
		val (phone, _, cloud) = pairedDevices()
		phone.insertOpponent(opponentId, at = 2_000)
		phone.insertMatch(matchId, sessionId, opponentId, at = 2_000)
		cloud.push(phone)
		val fresh = Device().also { it.sync.setEnabled(true) }

		cloud.pull(fresh)

		fresh.session(sessionId) shouldBe phone.session(sessionId)
		fresh.match(matchId) shouldBe phone.match(matchId)
		fresh.queries.selectOpponentRowById(opponentId).executeAsOne() shouldBe
			phone.queries.selectOpponentRowById(opponentId).executeAsOne()
		fresh.pending().shouldBeEmpty()
	}

	@Test
	fun hardDelete_whileSyncOffAfterBeingOn_goesOutAsTombstone() {
		val device = Device()
		device.insertSession(sessionId, at = 1_000)
		device.sync.setEnabled(true)
		device.sync.setEnabled(false)

		device.queries.deleteAllSessions()
		device.sync.setEnabled(true)

		device.sync.recordForUpload(sessionName).shouldNotBeNull().isDeleted shouldBe true
	}

	@Test
	fun markSent_rowWrittenAgainWhileInFlight_staysQueued() {
		val device = Device()
		device.insertSession(sessionId, at = 1_000)
		device.sync.setEnabled(true)
		val inFlight = device.sync.recordForUpload(sessionName).shouldNotBeNull()

		device.editSession(sessionId, at = 2_000, notes = "Edited mid-upload")
		val stillQueued = device.sync.markSent(listOf(inFlight))

		stillQueued shouldContainExactly listOf(sessionName)
	}

	@Test
	fun applyRemote_cloudKitDeletion_softDeletesRowAndForgetsIt() {
		val (phone, _, _) = pairedDevices()

		phone.sync.applyRemote(emptyList(), listOf(CloudRecordDeletion("TrainingSession", sessionName)))

		phone.session(sessionId)?.is_deleted shouldBe true
		phone.pending().shouldBeEmpty()
		phone.queries.selectCloudSyncSystemFields(sessionName).executeAsOneOrNull().shouldBeNull()
	}

	@Test
	fun editSession_withExistingMatches_updatesThemInPlace() {
		runBlocking {
			val device = Device()
			device.insertSession(sessionId, at = 1_000)
			device.insertOpponent(opponentId, at = 1_000)
			device.insertMatch(matchId, sessionId, opponentId, at = 1_000)
			val editedScore = 2
			val edited = MatchInput(
				opponentId = opponentId, opponentName = "Ma Long", myGamesWon = editedScore, opponentGamesWon = 3, id = matchId
			)
			val added = MatchInput(opponentId = opponentId, opponentName = "Ma Long", myGamesWon = 3, opponentGamesWon = 0)

			device.sessions.editSession(sessionId, LocalDate(2026, 9, 1), 60, 5, null, null, listOf(edited, added))

			val live = device.queries.getMatchesBySessionId(sessionId).executeAsList()
			live.map { it.id } shouldContainExactlyInAnyOrder listOf(matchId, live.first { it.id != matchId }.id)
			device.match(matchId)?.my_games_won shouldBe editedScore.toLong()
		}
	}

	@Test
	fun applyRemote_newerMatchWithoutValidSession_keepsAndRequeuesLocalCopy() {
		val (phone, _, cloud) = pairedDevices()
		phone.insertOpponent(opponentId, at = 2_000)
		phone.insertMatch(matchId, sessionId, opponentId, at = 2_000)
		cloud.push(phone)
		val sent = cloud.records.getValue(matchName)
		val damaged = CloudRecord(
			sent.recordType, sent.recordName, sent.strings - "sessionId", sent.integers, sent.doubles, emptyList(),
			isDeleted = false, modifiedAt = 9_000, systemFields = "tag-damaged"
		)

		phone.sync.applyRemote(listOf(damaged), emptyList())

		phone.match(matchId)?.session_id shouldBe sessionId
		phone.pending() shouldContainExactly listOf(matchName)
	}

	@Test
	fun installCloudSyncTracking_withTriggersAlreadyCurrent_changesNoSchema() {
		val device = Device()
		val before = device.schemaVersion()

		device.driver.installCloudSyncTracking()

		device.schemaVersion() shouldBe before
	}

	@Test
	fun editSession_savingTheSameNewMatchTwice_keepsOneRowUnderItsOwnId() {
		runBlocking {
			val device = Device()
			device.insertSession(sessionId, at = 1_000)
			device.insertOpponent(opponentId, at = 1_000)
			val newMatchId = Uuid.random()
			val added = MatchInput(
				opponentId = opponentId, opponentName = "Ma Long", myGamesWon = 3, opponentGamesWon = 0, id = newMatchId
			)

			repeat(2) { device.sessions.editSession(sessionId, LocalDate(2026, 9, 1), 60, 5, null, null, listOf(added)) }

			device.queries.getMatchesBySessionId(sessionId).executeAsList().map { it.id } shouldContainExactly listOf(newMatchId)
			device.queries.selectAllMatches().executeAsList().size shouldBe 1
		}
	}

	@Test
	fun editSession_matchWithGamesAndRpe_keepsThem() {
		runBlocking {
			val device = Device()
			val games = "11-9,11-7,11-5"
			val matchRpe = 7L
			device.insertSession(sessionId, at = 1_000)
			device.insertOpponent(opponentId, at = 1_000)
			device.queries.insertMatch(
				id = matchId, session_id = sessionId, opponent_id = opponentId, my_games_won = 3, opponent_games_won = 0,
				games = games, is_doubles = false, is_ranked = false, competition_level = null, rpe = matchRpe, notes = null,
				updated_at = Instant.fromEpochMilliseconds(1_000)
			)
			val unchanged = MatchInput(
				opponentId = opponentId, opponentName = "Ma Long", myGamesWon = 3, opponentGamesWon = 0, id = matchId
			)

			device.sessions.editSession(sessionId, LocalDate(2026, 9, 1), 60, 5, null, "New notes", listOf(unchanged))

			val match = device.match(matchId).shouldNotBeNull()
			match.games shouldBe games
			match.rpe shouldBe matchRpe
			match.updated_at shouldBe Instant.fromEpochMilliseconds(1_000)
		}
	}

	/** Two devices that have already synced one session with each other. */
	private fun pairedDevices(): Triple<Device, Device, FakeCloud> {
		val cloud = FakeCloud()
		val phone = Device().also { it.sync.setEnabled(true) }
		phone.insertSession(sessionId, at = 1_000, notes = "Original")
		cloud.push(phone)
		val tablet = Device().also { it.sync.setEnabled(true) }
		cloud.pull(tablet)
		return Triple(phone, tablet, cloud)
	}

	private fun Device.sessionsDelete(id: Uuid, at: Long) = database.transaction {
		queries.deleteMatchesBySessionId(updated_at = Instant.fromEpochMilliseconds(at), session_id = id)
		queries.deleteSession(updated_at = Instant.fromEpochMilliseconds(at), id = id)
	}

	private fun sessionRecord(modifiedAt: Long, notes: String) = CloudRecord(
		recordType = "TrainingSession", recordName = sessionName,
		strings = mapOf("notes" to notes),
		integers = mapOf("date" to 0L, "durationMin" to 60L, "rpe" to 5L, "createdAt" to 1_000L),
		doubles = emptyMap(), nullKeys = emptyList(), isDeleted = false, modifiedAt = modifiedAt, systemFields = "tag"
	)
}
