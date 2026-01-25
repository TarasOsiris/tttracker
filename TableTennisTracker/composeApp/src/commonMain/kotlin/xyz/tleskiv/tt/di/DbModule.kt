package xyz.tleskiv.tt.di

import app.cash.sqldelight.ColumnAdapter
import org.koin.dsl.module
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.Match
import xyz.tleskiv.tt.db.Opponent
import xyz.tleskiv.tt.db.Training_session
import kotlin.uuid.Uuid

val uuidAdapter = object : ColumnAdapter<Uuid, String> {
	override fun decode(databaseValue: String): Uuid = Uuid.parseHex(databaseValue)
	override fun encode(value: Uuid): String = value.toHexString()
}

val dbModule = module {
	single {
		AppDatabase(
			driver = get(),
			training_sessionAdapter = Training_session.Adapter(idAdapter = uuidAdapter),
			opponentAdapter = Opponent.Adapter(idAdapter = uuidAdapter),
			matchAdapter = Match.Adapter(
				idAdapter = uuidAdapter,
				session_idAdapter = uuidAdapter,
				opponent_idAdapter = uuidAdapter
			)
		)
	}
}