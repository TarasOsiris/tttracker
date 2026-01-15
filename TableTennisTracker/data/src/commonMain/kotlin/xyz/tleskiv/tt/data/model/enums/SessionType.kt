package xyz.tleskiv.tt.data.model.enums

enum class SessionType(val dbValue: String) {
	TECHNIQUE("technique"),
	MATCH_PLAY("match_play"),
	SERVE_PRACTICE("serve_practice"),
	PHYSICAL("physical"),
	FREE_PLAY("free_play"),
	OTHER("other");

	companion object {
		fun fromDb(value: String): SessionType =
			entries.firstOrNull { it.dbValue == value }
				?: error("Unknown SessionType: $value")
	}
}