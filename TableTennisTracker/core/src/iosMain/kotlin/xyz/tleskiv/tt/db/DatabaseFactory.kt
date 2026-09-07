package xyz.tleskiv.tt.db

import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.native.NativeSqliteDriver

class DatabaseFactory {
	fun createDriver(): SqlDriver {
		return NativeSqliteDriver(
			schema = AppDatabase.Schema,
			name = "app.db"
		)
	}
}
