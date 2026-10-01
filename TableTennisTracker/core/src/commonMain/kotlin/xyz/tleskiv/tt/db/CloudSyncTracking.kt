package xyz.tleskiv.tt.db

import app.cash.sqldelight.db.QueryResult
import app.cash.sqldelight.db.SqlDriver
import xyz.tleskiv.tt.sync.SyncedTable

/**
 * iCloud change tracking, installed by the iOS [DatabaseFactory] only: sync is iOS-only, and Android
 * should not pay a trigger check on every write for a queue nothing reads. Idempotent.
 *
 * Two triggers per write. Inserts and updates queue the row while sync is on, stamped with the
 * row's own updated_at, which is what last-writer-wins compares. Soft deletes are updates like any
 * other. Hard deletes (the debug screen's wipe) queue a bare tombstone for as long as sync has ever
 * been on, so a record removed while sync was off does not come back from iCloud. Each queued
 * write takes the next outbox_seq.
 *
 * An UPDATE that changes nothing queues nothing.
 *
 * A trigger is recreated only when its SQL differs from what is installed — a changed body or a new
 * column — so an ordinary launch runs no DDL. Not declared in AppDatabase.sq: nothing reads them
 * through SQLDelight, and Android must not get them.
 */
fun SqlDriver.installCloudSyncTracking() {
	val nowMillis = "CAST((julianday('now') - 2440587.5) * 86400000 AS INTEGER)"
	val installed = installedTriggers()
	for (table in SyncedTable.entries.map { it.table }) {
		val changed = columnsOf(table).joinToString(" OR ", "(", ")") { "OLD.$it IS NOT NEW.$it" }
		val triggers = listOf(
			Trigger("INSERT", "(SELECT is_enabled FROM cloud_sync_state) = 1", "NEW.id", "0", "NEW.updated_at"),
			Trigger("UPDATE", "(SELECT is_enabled FROM cloud_sync_state) = 1 AND $changed", "NEW.id", "0", "NEW.updated_at"),
			Trigger("DELETE", "EXISTS (SELECT 1 FROM cloud_sync_state)", "OLD.id", "1", nowMillis)
		)
		for (trigger in triggers) {
			val name = "${table}_cloud_sync_${trigger.event.lowercase()}"
			val sql = """
				CREATE TRIGGER $name
				AFTER ${trigger.event} ON $table
				WHEN ${trigger.condition}
				BEGIN
				    UPDATE cloud_sync_state SET outbox_seq = outbox_seq + 1;
				    INSERT OR REPLACE INTO cloud_sync_outbox (record_id, table_name, is_purged, changed_at, seq)
				    VALUES (${trigger.id}, '$table', ${trigger.isPurged}, ${trigger.changedAt}, (SELECT outbox_seq FROM cloud_sync_state));
				END
			""".trimIndent()
			if (installed[name] == sql) continue
			execute(null, "DROP TRIGGER IF EXISTS $name;", 0)
			execute(null, "$sql;", 0)
		}
	}
}

private class Trigger(val event: String, val condition: String, val id: String, val isPurged: String, val changedAt: String)

/** sqlite_master keeps each trigger's CREATE statement as written, minus the closing semicolon. */
private fun SqlDriver.installedTriggers(): Map<String, String> =
	executeQuery(null, "SELECT name, sql FROM sqlite_master WHERE type = 'trigger';", { cursor ->
		val triggers = mutableMapOf<String, String>()
		while (cursor.next().value) {
			triggers[cursor.getString(0)!!] = cursor.getString(1).orEmpty()
		}
		QueryResult.Value(triggers)
	}, 0).value

private fun SqlDriver.columnsOf(table: String): List<String> =
	executeQuery(null, "PRAGMA table_info($table);", { cursor ->
		val columns = mutableListOf<String>()
		while (cursor.next().value) {
			columns += cursor.getString(1)!!
		}
		QueryResult.Value(columns)
	}, 0).value
