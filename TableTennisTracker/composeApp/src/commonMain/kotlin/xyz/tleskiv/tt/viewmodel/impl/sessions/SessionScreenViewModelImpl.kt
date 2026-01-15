package xyz.tleskiv.tt.viewmodel.impl.sessions

import xyz.tleskiv.tt.service.TrainingSessionService
import xyz.tleskiv.tt.viewmodel.sessions.SessionScreenViewModel

class SessionScreenViewModelImpl(sessionService: TrainingSessionService) : SessionScreenViewModel() {
	init {
		println("SessionScreenViewModelImpl created")
		println("SessionScreenViewModelImpl has: ${sessionService.getAllSessions().count()} Sessions")
	}

	override fun onCleared() {
		println("SessionScreenViewModelImpl cleared")
		super.onCleared()
	}
}