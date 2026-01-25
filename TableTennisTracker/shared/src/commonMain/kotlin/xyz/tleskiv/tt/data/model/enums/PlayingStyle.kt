package xyz.tleskiv.tt.data.model.enums

enum class PlayingStyle(val dbValue: String) {
    ATTACKER("attacker"),
    DEFENDER("defender"),
    ALL_ROUND("all_round"),
    PIPS("pips"),
    CHOPPER("chopper"),
    UNKNOWN("unknown");

    companion object {
        fun fromDb(value: String): PlayingStyle =
            entries.firstOrNull { it.dbValue == value } ?: UNKNOWN
    }
}
