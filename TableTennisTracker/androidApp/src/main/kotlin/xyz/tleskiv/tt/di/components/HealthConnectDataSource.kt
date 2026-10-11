package xyz.tleskiv.tt.di.components

import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.ActiveCaloriesBurnedRecord
import androidx.health.connect.client.records.ExerciseSessionRecord
import androidx.health.connect.client.records.HeartRateRecord
import androidx.health.connect.client.request.AggregateGroupByDurationRequest
import androidx.health.connect.client.request.AggregateRequest
import androidx.health.connect.client.request.ReadRecordsRequest
import androidx.health.connect.client.time.TimeRangeFilter
import xyz.tleskiv.tt.health.HealthWorkout
import xyz.tleskiv.tt.health.HeartRatePoint
import java.time.Duration
import java.time.Instant
import kotlin.time.Instant as KotlinInstant

/**
 * Health Connect: built into Android 14 and later, an app from Play on Android 9 to 13. Read-only;
 * reads only while the app is in the foreground, which is all the app needs.
 */
class HealthConnectDataSource(private val context: Context) : HealthDataSource {

	override val isAvailable: Boolean
		get() = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O &&
			HealthConnectClient.getSdkStatus(context) == HealthConnectClient.SDK_AVAILABLE

	private val client by lazy { HealthConnectClient.getOrCreate(context) }

	override suspend fun hasReadAccess(): Boolean =
		isAvailable && client.permissionController.getGrantedPermissions().containsAll(READ_PERMISSIONS)

	override suspend fun recentWorkouts(): List<HealthWorkout> {
		val since = Instant.now().minus(Duration.ofDays(HealthDataSource.LOOKBACK_DAYS.toLong()))
		return client.readRecords(ReadRecordsRequest(ExerciseSessionRecord::class, TimeRangeFilter.after(since)))
			.records
			.filter { it.exerciseType == ExerciseSessionRecord.EXERCISE_TYPE_TABLE_TENNIS }
			.sortedByDescending { it.startTime }
			.map { it.toWorkout() }
	}

	override suspend fun workout(id: String): HealthWorkout? =
		runCatching { client.readRecord(ExerciseSessionRecord::class, id).record }.getOrNull()?.toWorkout()

	override suspend fun heartRate(workout: HealthWorkout): List<HeartRatePoint> =
		client.aggregateGroupByDuration(
			AggregateGroupByDurationRequest(
				metrics = setOf(HeartRateRecord.BPM_AVG),
				timeRangeFilter = workout.timeRange(),
				timeRangeSlicer = Duration.ofMinutes(1)
			)
		).mapNotNull { slice ->
			slice.result[HeartRateRecord.BPM_AVG]?.let { HeartRatePoint(slice.startTime.toKotlin(), it.toDouble()) }
		}

	/** Heart rate and energy come from their own records over the workout's span. */
	private suspend fun ExerciseSessionRecord.toWorkout(): HealthWorkout {
		val span = TimeRangeFilter.between(startTime, endTime)
		val totals = client.aggregate(
			AggregateRequest(
				metrics = setOf(HeartRateRecord.BPM_AVG, HeartRateRecord.BPM_MAX, ActiveCaloriesBurnedRecord.ACTIVE_CALORIES_TOTAL),
				timeRangeFilter = span
			)
		)
		return HealthWorkout(
			id = metadata.id,
			start = startTime.toKotlin(),
			end = endTime.toKotlin(),
			activeEnergyKilocalories = ownActiveCalories(span) ?: totals[ActiveCaloriesBurnedRecord.ACTIVE_CALORIES_TOTAL]?.inKilocalories,
			averageHeartRate = totals[HeartRateRecord.BPM_AVG]?.toDouble(),
			maxHeartRate = totals[HeartRateRecord.BPM_MAX]?.toDouble(),
			sourceName = appLabel(metadata.dataOrigin.packageName)
		)
	}

	/**
	 * The energy the app that recorded the workout wrote for it. Preferred to Health Connect's own
	 * total, which counts only apps on the user's data-source priority list and so is often empty,
	 * and summing every app's records instead would count a watch and a phone twice.
	 */
	private suspend fun ExerciseSessionRecord.ownActiveCalories(span: TimeRangeFilter): Double? =
		client.readRecords(ReadRecordsRequest(ActiveCaloriesBurnedRecord::class, span, dataOriginFilter = setOf(metadata.dataOrigin)))
			.records
			.takeIf { it.isNotEmpty() }
			?.sumOf { it.energy.inKilocalories }

	/** Null when the recording app is not visible to this one, which Android 11+ allows only by name. */
	private fun appLabel(packageName: String): String? = try {
		val info = context.packageManager.getApplicationInfo(packageName, 0)
		context.packageManager.getApplicationLabel(info).toString()
	} catch (_: PackageManager.NameNotFoundException) {
		null
	}

	private fun HealthWorkout.timeRange() =
		TimeRangeFilter.between(Instant.ofEpochMilli(start.toEpochMilliseconds()), Instant.ofEpochMilli(end.toEpochMilliseconds()))

	private fun Instant.toKotlin() = KotlinInstant.fromEpochMilliseconds(toEpochMilli())

	companion object {
		/** What the app asks for, all read-only; must match the manifest's `health` permissions. */
		val READ_PERMISSIONS = setOf(
			HealthPermission.getReadPermission(ExerciseSessionRecord::class),
			HealthPermission.getReadPermission(HeartRateRecord::class),
			HealthPermission.getReadPermission(ActiveCaloriesBurnedRecord::class)
		)
	}
}
