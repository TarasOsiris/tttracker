package xyz.tleskiv.tt.db

import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.jdbc.sqlite.JdbcSqliteDriver
import java.io.File

actual class DatabaseFactory {
	actual fun createDriver(): SqlDriver {
		val databasePath = File(System.getProperty("user.home"), ".tabletennistracker/app.db")
		databasePath.parentFile?.mkdirs()

		val driver = JdbcSqliteDriver("jdbc:sqlite:${databasePath.absolutePath}")
		AppDatabase.Schema.create(driver)
		return driver
	}
}
