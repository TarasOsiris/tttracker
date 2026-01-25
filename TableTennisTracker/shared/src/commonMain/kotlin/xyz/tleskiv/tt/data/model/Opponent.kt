package xyz.tleskiv.tt.data.model

import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import kotlin.uuid.ExperimentalUuidApi
import kotlin.uuid.Uuid

@OptIn(ExperimentalUuidApi::class)
data class Opponent(
    val id: Uuid,
    val name: String,
    val club: String?,
    val rating: Double?,
    val handedness: Handedness?,
    val style: PlayingStyle?,
    val notes: String?,
    val createdAt: Long,
    val updatedAt: Long
)
