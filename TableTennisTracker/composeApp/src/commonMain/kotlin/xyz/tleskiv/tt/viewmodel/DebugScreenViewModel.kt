package xyz.tleskiv.tt.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.service.TrainingSessionService
import kotlin.random.Random
import kotlin.time.Clock
import kotlin.time.Duration.Companion.days

class DebugScreenViewModel(
	private val trainingSessionService: TrainingSessionService
) : ViewModel() {

	private val _isGenerating = MutableStateFlow(false)
	val isGenerating: StateFlow<Boolean> = _isGenerating

	private val _isClearing = MutableStateFlow(false)
	val isClearing: StateFlow<Boolean> = _isClearing

	fun generateRandomSessions(count: Int = 100) {
		viewModelScope.launch {
			_isGenerating.value = true
			try {
				val now = Clock.System.now()
				val timeZone = TimeZone.currentSystemDefault()
				val sessionTypes = SessionType.entries

				repeat(count) {
					val daysAgo = Random.nextInt(0, 365)
					val hour = Random.nextInt(8, 21)
					val minute = Random.nextInt(0, 60)

					val dateTime = (now - daysAgo.days).toLocalDateTime(timeZone)
					val sessionDateTime = LocalDateTime(dateTime.year, dateTime.month, dateTime.day, hour, minute)

					val durationMinutes = listOf(30, 45, 60, 90, 120).random()
					val rpe = Random.nextInt(1, 11)
					val sessionType = if (Random.nextBoolean()) sessionTypes.random() else null
					val notes = if (Random.nextInt(100) < 30) "Random session note #${Random.nextInt(1000)}" else null

					trainingSessionService.addSession(
						dateTime = sessionDateTime,
						durationMinutes = durationMinutes,
						rpe = rpe,
						sessionType = sessionType,
						notes = notes
					)
				}
			} finally {
				_isGenerating.value = false
			}
		}
	}

	fun clearAllSessions() {
		viewModelScope.launch {
			_isClearing.value = true
			try {
				trainingSessionService.deleteAllSessions()
			} finally {
				_isClearing.value = false
			}
		}
	}
}
