package xyz.tleskiv.tt.data.db

import app.cash.sqldelight.ColumnAdapter
import app.cash.sqldelight.driver.jdbc.sqlite.JdbcSqliteDriver
import xyz.tleskiv.tt.data.model.SessionType
import xyz.tleskiv.tt.db.ServerDatabase
import xyz.tleskiv.tt.db.Training_session
import xyz.tleskiv.tt.db.User
import java.io.File
import kotlin.uuid.Uuid

object DatabaseFactory {
	private val uuidAdapter = object : ColumnAdapter<Uuid, String> {
		override fun decode(databaseValue: String): Uuid = Uuid.parse(databaseValue)

		override fun encode(value: Uuid): String = value.toString()
	}

	private val sessionTypeAdapter = object : ColumnAdapter<SessionType, String> {
		override fun decode(databaseValue: String): SessionType = SessionType.fromDb(databaseValue)

		override fun encode(value: SessionType): String = value.dbValue
	}

	fun create(dbPath: String = "server/data/server.db"): ServerDatabase {
		// Ensure parent directory exists
		File(dbPath).parentFile?.mkdirs()

		val driver = JdbcSqliteDriver("jdbc:sqlite:$dbPath")

		// Create schema if needed
		ServerDatabase.Companion.Schema.create(driver)

		// Apply SQLite optimizations
		driver.execute(null, "PRAGMA journal_mode = WAL;", 0)
		driver.execute(null, "PRAGMA synchronous = NORMAL;", 0)
		driver.execute(null, "PRAGMA foreign_keys = ON;", 0)
		driver.execute(null, "PRAGMA temp_store = MEMORY;", 0)

		return ServerDatabase(
			driver = driver,
			userAdapter = User.Adapter(idAdapter = uuidAdapter),
			training_sessionAdapter = Training_session.Adapter(
				idAdapter = uuidAdapter,
				user_idAdapter = uuidAdapter,
				session_typeAdapter = sessionTypeAdapter
			)
		)
	}
}
