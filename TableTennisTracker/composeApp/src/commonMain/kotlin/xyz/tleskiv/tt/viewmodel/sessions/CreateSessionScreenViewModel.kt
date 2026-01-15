package xyz.tleskiv.tt.viewmodel.sessions

import kotlinx.datetime.LocalDate
import xyz.tleskiv.tt.viewmodel.ViewModelBase

abstract class CreateSessionScreenViewModel : ViewModelBase() {
	abstract val initialDate: LocalDate
}