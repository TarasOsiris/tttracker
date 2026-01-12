package xyz.tleskiv.tt.data

import kotlinx.serialization.Serializable

@Serializable
data class User(
	val id: String,
	val email: String
)
