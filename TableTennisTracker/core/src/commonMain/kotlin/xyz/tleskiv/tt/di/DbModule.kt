package xyz.tleskiv.tt.di

import org.koin.dsl.module
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.App_metadata
import xyz.tleskiv.tt.db.Match
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.db.Training_session
import xyz.tleskiv.tt.db.User_preferences
import xyz.tleskiv.tt.db.instantAdapter
import xyz.tleskiv.tt.db.localDateAdapter
import xyz.tleskiv.tt.db.uuidAdapter

val dbModule = module {
	single {
		AppDatabase(
			driver = get(),
			app_metadataAdapter = App_metadata.Adapter(
				created_atAdapter = instantAdapter,
				updated_atAdapter = instantAdapter
			),
			user_preferencesAdapter = User_preferences.Adapter(
				created_atAdapter = instantAdapter,
				updated_atAdapter = instantAdapter
			),
			training_sessionAdapter = Training_session.Adapter(
				idAdapter = uuidAdapter,
				dateAdapter = localDateAdapter,
				created_atAdapter = instantAdapter,
				updated_atAdapter = instantAdapter
			),
			opponentAdapter = Opponent.Adapter(
				idAdapter = uuidAdapter,
				created_atAdapter = instantAdapter,
				updated_atAdapter = instantAdapter
			),
			matchAdapter = Match.Adapter(
				idAdapter = uuidAdapter,
				session_idAdapter = uuidAdapter,
				opponent_idAdapter = uuidAdapter,
				created_atAdapter = instantAdapter,
				updated_atAdapter = instantAdapter
			)
		)
	}
}
