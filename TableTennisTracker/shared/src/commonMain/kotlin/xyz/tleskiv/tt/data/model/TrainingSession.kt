package xyz.tleskiv.tt.data.model

import xyz.tleskiv.tt.data.model.enums.SessionType
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
data class TrainingSession(
    val id: Uuid,
    val date: Long,
    val durationMinutes: Int,
    val rpe: Int,
    val sessionType: SessionType?,
    val notes: String?,
    val matches: List<Match>,
    val createdAt: Long,
    val updatedAt: Long
)
