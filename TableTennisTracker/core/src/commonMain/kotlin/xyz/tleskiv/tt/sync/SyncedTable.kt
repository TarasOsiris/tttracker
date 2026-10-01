package xyz.tleskiv.tt.sync

internal enum class FieldType { STRING, LONG, DOUBLE }

internal class Field(val key: String, val type: FieldType)

private fun string(key: String) = Field(key, FieldType.STRING)
private fun long(key: String) = Field(key, FieldType.LONG)
private fun double(key: String) = Field(key, FieldType.DOUBLE)

/**
 * The tables iCloud mirrors, and the one list of them: the change-tracking triggers, the requeue on
 * enable and the record mapping all read it. Row ids are random UUIDs, so an id alone names a
 * record, and every table has `is_deleted` and `updated_at`, which the merge relies on.
 *
 * Declaration order is apply order, so a batch lands parents first. Nothing breaks when it does not:
 * foreign keys are not enforced, and a match whose session or opponent has not arrived yet is
 * simply not shown until it does.
 */
internal enum class SyncedTable(val table: String, val recordType: String, val fields: List<Field>) {
	OPPONENT(
		"opponent", "Opponent",
		listOf(string("name"), string("club"), double("rating"), string("handedness"), string("style"), string("notes"), long("createdAt"))
	),
	SESSION(
		"training_session", "TrainingSession",
		listOf(long("date"), long("durationMin"), long("rpe"), string("sessionType"), string("notes"), long("createdAt"))
	),
	MATCH(
		"match", "Match",
		listOf(
			string("sessionId"), string("opponentId"), long("myGamesWon"), long("opponentGamesWon"), string("games"),
			long("isDoubles"), long("isRanked"), string("competitionLevel"), long("rpe"), string("notes"), long("createdAt")
		)
	);

	companion object {
		fun forTable(table: String) = entries.find { it.table == table }
		fun forRecordType(recordType: String) = entries.find { it.recordType == recordType }
	}
}
