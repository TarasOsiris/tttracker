package xyz.tleskiv.tt.data.model.enums

enum class Handedness(val dbValue: String) {
    LEFT("left"),
    RIGHT("right"),
    UNKNOWN("unknown");

    companion object {
        fun fromDb(value: String): Handedness =
            entries.firstOrNull { it.dbValue == value } ?: UNKNOWN
    }
}
