package xyz.tleskiv.tt.db

import app.cash.sqldelight.db.QueryResult
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.jdbc.sqlite.JdbcSqliteDriver
import java.io.File

class DatabaseFactory {
	fun createDriver(): SqlDriver {
		val databasePath = File(System.getProperty("user.home"), ".tabletennistracker/app.db")
		databasePath.parentFile?.mkdirs()

		val driver = JdbcSqliteDriver("jdbc:sqlite:${databasePath.absolutePath}")
		migrateIfNeeded(driver)
		return driver
	}

	private fun migrateIfNeeded(driver: SqlDriver) {
		val currentVersion = getCurrentVersion(driver)
		val schemaVersion = AppDatabase.Schema.version

		if (currentVersion == 0L) {
			AppDatabase.Schema.create(driver)
			setVersion(driver, schemaVersion)
		} else if (currentVersion < schemaVersion) {
			AppDatabase.Schema.migrate(driver, currentVersion, schemaVersion)
			setVersion(driver, schemaVersion)
		}
	}

	private fun getCurrentVersion(driver: SqlDriver): Long {
		return driver.executeQuery<Long>(null, "PRAGMA user_version;", { cursor ->
			cursor.next()
			QueryResult.Value(cursor.getLong(0) ?: 0L)
		}, 0).value
	}

	private fun setVersion(driver: SqlDriver, version: Long) {
		driver.execute(null, "PRAGMA user_version = $version;", 0)
	}
}
