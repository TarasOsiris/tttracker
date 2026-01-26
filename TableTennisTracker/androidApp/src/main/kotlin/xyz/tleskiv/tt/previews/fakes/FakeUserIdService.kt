package xyz.tleskiv.tt.previews.fakes

import xyz.tleskiv.tt.service.UserIdService

class FakeUserIdService : UserIdService {
	override suspend fun getUserId(): String = "preview-user-id"
}
