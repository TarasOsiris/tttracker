package xyz.tleskiv.tt.db

import app.cash.sqldelight.db.SqlDriver

expect class DatabaseFactory {
	fun createDriver(): SqlDriver
}
