package xyz.tleskiv.tt.model.mappers

import xyz.tleskiv.tt.data.model.Match
import xyz.tleskiv.tt.data.model.Opponent
import xyz.tleskiv.tt.data.model.TrainingSession
import xyz.tleskiv.tt.data.model.enums.CompetitionLevel
import xyz.tleskiv.tt.data.model.enums.Handedness
import xyz.tleskiv.tt.data.model.enums.PlayingStyle
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.GetSessionWithMatchesById
import xyz.tleskiv.tt.db.SelectAllSessionsWithMatches
import xyz.tleskiv.tt.util.ext.toEpochMillis

fun List<SelectAllSessionsWithMatches>.toTrainingSessions(): List<TrainingSession> {
	return groupBy { it.session_id }.map { (sessionId, rows) ->
		val first = rows.first()
		TrainingSession(
			id = sessionId,
			date = first.session_date.toEpochMillis(),
			durationMinutes = first.session_duration_min.toInt(),
			rpe = first.session_rpe.toInt(),
			sessionType = first.session_type?.let { SessionType.fromDb(it) },
			notes = first.session_notes,
			matches = rows.mapNotNull { it.toMatch() },
			createdAt = first.session_created_at.toEpochMilliseconds(),
			updatedAt = first.session_updated_at.toEpochMilliseconds()
		)
	}
}

fun SelectAllSessionsWithMatches.toMatch(): Match? {
	val matchId = match_id ?: return null
	val opponentId = opponent_id ?: return null
	val opponentName = opponent_name ?: return null

	return Match(
		id = matchId,
		sessionId = session_id,
		opponent = Opponent(
			id = opponentId,
			name = opponentName,
			club = opponent_club,
			rating = opponent_rating,
			handedness = opponent_handedness?.let { Handedness.fromDb(it) },
			style = opponent_style?.let { PlayingStyle.fromDb(it) },
			notes = opponent_notes,
			createdAt = opponent_created_at?.toEpochMilliseconds() ?: 0L,
			updatedAt = opponent_updated_at?.toEpochMilliseconds() ?: 0L
		),
		myGamesWon = match_my_games_won?.toInt() ?: 0,
		opponentGamesWon = match_opponent_games_won?.toInt() ?: 0,
		games = match_games,
		isDoubles = match_is_doubles ?: false,
		isRanked = match_is_ranked ?: false,
		competitionLevel = match_competition_level?.let { CompetitionLevel.fromDb(it) },
		rpe = match_rpe?.toInt(),
		notes = match_notes,
		createdAt = match_created_at?.toEpochMilliseconds() ?: 0L,
		updatedAt = match_updated_at?.toEpochMilliseconds() ?: 0L
	)
}

fun List<GetSessionWithMatchesById>.toTrainingSession(): TrainingSession? {
	if (isEmpty()) return null
	val first = first()
	return TrainingSession(
		id = first.session_id,
		date = first.session_date.toEpochMillis(),
		durationMinutes = first.session_duration_min.toInt(),
		rpe = first.session_rpe.toInt(),
		sessionType = first.session_type?.let { SessionType.fromDb(it) },
		notes = first.session_notes,
		matches = mapNotNull { it.toMatch() },
		createdAt = first.session_created_at.toEpochMilliseconds(),
		updatedAt = first.session_updated_at.toEpochMilliseconds()
	)
}

fun GetSessionWithMatchesById.toMatch(): Match? {
	val matchId = match_id ?: return null
	val opponentId = opponent_id ?: return null
	val opponentName = opponent_name ?: return null

	return Match(
		id = matchId,
		sessionId = session_id,
		opponent = Opponent(
			id = opponentId,
			name = opponentName,
			club = opponent_club,
			rating = opponent_rating,
			handedness = opponent_handedness?.let { Handedness.fromDb(it) },
			style = opponent_style?.let { PlayingStyle.fromDb(it) },
			notes = opponent_notes,
			createdAt = opponent_created_at?.toEpochMilliseconds() ?: 0L,
			updatedAt = opponent_updated_at?.toEpochMilliseconds() ?: 0L
		),
		myGamesWon = match_my_games_won?.toInt() ?: 0,
		opponentGamesWon = match_opponent_games_won?.toInt() ?: 0,
		games = match_games,
		isDoubles = match_is_doubles ?: false,
		isRanked = match_is_ranked ?: false,
		competitionLevel = match_competition_level?.let { CompetitionLevel.fromDb(it) },
		rpe = match_rpe?.toInt(),
		notes = match_notes,
		createdAt = match_created_at?.toEpochMilliseconds() ?: 0L,
		updatedAt = match_updated_at?.toEpochMilliseconds() ?: 0L
	)
}
