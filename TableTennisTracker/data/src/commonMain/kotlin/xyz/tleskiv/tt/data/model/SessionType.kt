package xyz.tleskiv.tt.data.model

enum class SessionType(val dbValue: String) {
	TECHNICAL("technical"),
	MATCHPLAY("matchplay"),
	PHYSICAL("physical"),
	RECOVERY("recovery");

	companion object {
		fun fromDb(value: String): SessionType =
			entries.firstOrNull { it.dbValue == value }
				?: error("Unknown SessionType: $value")
	}
}
