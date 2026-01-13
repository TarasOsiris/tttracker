package xyz.tleskiv.tt.data.db

import app.cash.sqldelight.driver.jdbc.sqlite.JdbcSqliteDriver
import xyz.tleskiv.tt.db.ServerDatabase
import java.io.File

object DatabaseFactory {

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

		return ServerDatabase.Companion(driver)
	}
}
