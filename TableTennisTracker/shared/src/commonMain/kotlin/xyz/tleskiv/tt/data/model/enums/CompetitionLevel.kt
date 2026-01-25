package xyz.tleskiv.tt.data.model.enums

enum class CompetitionLevel(val dbValue: String) {
    PRACTICE("practice"),
    LEAGUE("league"),
    TOURNAMENT("tournament");

    companion object {
        fun fromDb(value: String): CompetitionLevel =
            entries.firstOrNull { it.dbValue == value } ?: PRACTICE
    }
}
