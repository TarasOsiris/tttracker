package xyz.tleskiv.tt.data.db

import app.cash.sqldelight.ColumnAdapter
import app.cash.sqldelight.db.QueryResult
import app.cash.sqldelight.driver.jdbc.sqlite.JdbcSqliteDriver
import xyz.tleskiv.tt.data.model.enums.SessionType
import xyz.tleskiv.tt.db.ServerDatabase
import xyz.tleskiv.tt.db.Training_session
import xyz.tleskiv.tt.db.User
import xyz.tleskiv.tt.db.User_credentials
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

		// Create schema or migrate if needed
		migrateIfNeeded(driver)

		// Apply SQLite optimizations
		driver.execute(null, "PRAGMA journal_mode = WAL;", 0)
		driver.execute(null, "PRAGMA synchronous = NORMAL;", 0)
		driver.execute(null, "PRAGMA foreign_keys = ON;", 0)
		driver.execute(null, "PRAGMA temp_store = MEMORY;", 0)

		return ServerDatabase(
			driver = driver,
			userAdapter = User.Adapter(idAdapter = uuidAdapter),
			user_credentialsAdapter = User_credentials.Adapter(user_idAdapter = uuidAdapter),
			training_sessionAdapter = Training_session.Adapter(
				idAdapter = uuidAdapter,
				user_idAdapter = uuidAdapter,
				session_typeAdapter = sessionTypeAdapter
			)
		)
	}

	private fun migrateIfNeeded(driver: JdbcSqliteDriver) {
		val currentVersion = getCurrentVersion(driver)
		val schemaVersion = ServerDatabase.Schema.version

		if (currentVersion == 0L) {
			ServerDatabase.Schema.create(driver)
			setVersion(driver, schemaVersion)
		} else if (currentVersion < schemaVersion) {
			ServerDatabase.Schema.migrate(driver, currentVersion, schemaVersion)
			setVersion(driver, schemaVersion)
		}
	}

	private fun getCurrentVersion(driver: JdbcSqliteDriver): Long {
		return driver.executeQuery<Long>(null, "PRAGMA user_version;", { cursor ->
			cursor.next()
			QueryResult.Value(cursor.getLong(0) ?: 0L)
		}, 0).value
	}

	private fun setVersion(driver: JdbcSqliteDriver, version: Long) {
		driver.execute(null, "PRAGMA user_version = $version;", 0)
	}
}
