package xyz.tleskiv.tt.db

import app.cash.sqldelight.ColumnAdapter
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.atStartOfDayIn
import kotlinx.datetime.toLocalDateTime
import kotlin.time.Instant
import kotlin.uuid.Uuid

val uuidAdapter = object : ColumnAdapter<Uuid, String> {
	override fun decode(databaseValue: String): Uuid = Uuid.parseHex(databaseValue)
	override fun encode(value: Uuid): String = value.toHexString()
}

val instantAdapter = object : ColumnAdapter<Instant, Long> {
	override fun decode(databaseValue: Long): Instant = Instant.fromEpochMilliseconds(databaseValue)
	override fun encode(value: Instant): Long = value.toEpochMilliseconds()
}

val localDateAdapter = object : ColumnAdapter<LocalDate, Long> {
	override fun decode(databaseValue: Long): LocalDate =
		Instant.fromEpochMilliseconds(databaseValue).toLocalDateTime(TimeZone.UTC).date

	override fun encode(value: LocalDate): Long =
		value.atStartOfDayIn(TimeZone.UTC).toEpochMilliseconds()
}

inline fun <reified T : Enum<T>> enumByNameAdapter(): ColumnAdapter<T, String> =
	object : ColumnAdapter<T, String> {
		override fun decode(databaseValue: String): T = enumValueOf(databaseValue)
		override fun encode(value: T): String = value.name
	}

inline fun <reified T : Enum<T>> enumByOrdinalAdapter(): ColumnAdapter<T, Long> =
	object : ColumnAdapter<T, Long> {
		override fun decode(databaseValue: Long): T = enumValues<T>()[databaseValue.toInt()]
		override fun encode(value: T): Long = value.ordinal.toLong()
	}
