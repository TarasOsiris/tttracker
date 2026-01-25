package xyz.tleskiv.tt.model.mappers

import xyz.tleskiv.tt.data.model.Match
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.util.ext.toLocalDate
import xyz.tleskiv.tt.util.ext.toLocalDateTime
import xyz.tleskiv.tt.viewmodel.sessions.SessionDetailsScreenViewModel.MatchUiModel
import xyz.tleskiv.tt.viewmodel.sessions.SessionsScreenViewModel.SessionUiModel

fun TrainingSession.toSessionUiModel(): SessionUiModel = SessionUiModel(
	id = id,
	date = date.toLocalDateTime().date,
	durationMinutes = durationMinutes,
	sessionType = sessionType,
	rpe = rpe,
	notes = notes
)

fun TrainingSession.toSessionUiModelUtc(): SessionUiModel = SessionUiModel(
	id = id,
	date = date.toLocalDate(),
	durationMinutes = durationMinutes,
	sessionType = sessionType,
	rpe = rpe,
	notes = notes
)

fun Match.toMatchUiModel(): MatchUiModel = MatchUiModel(
	id = id,
	opponentName = opponent.name,
	myGamesWon = myGamesWon,
	opponentGamesWon = opponentGamesWon,
	isDoubles = isDoubles,
	isRanked = isRanked,
	competitionLevel = competitionLevel,
	rpe = rpe,
	notes = notes
)
