package xyz.tleskiv.tt.db

import android.content.Context
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.android.AndroidSqliteDriver

class DatabaseFactory(private val context: Context) {
	fun createDriver(): SqlDriver {
		return AndroidSqliteDriver(
			schema = AppDatabase.Schema,
			context = context,
			name = "app.db"
		)
	}
}
