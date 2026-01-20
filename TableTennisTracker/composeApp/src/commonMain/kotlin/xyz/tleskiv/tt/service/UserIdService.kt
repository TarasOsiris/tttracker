package xyz.tleskiv.tt.service

interface UserIdService {
	suspend fun getUserId(): String
}
