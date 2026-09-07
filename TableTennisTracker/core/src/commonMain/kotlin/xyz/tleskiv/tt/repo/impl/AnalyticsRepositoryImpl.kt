package xyz.tleskiv.tt.repo.impl

import app.cash.sqldelight.coroutines.asFlow
import app.cash.sqldelight.coroutines.mapToOne
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.db.GetAnalyticsSummary
import xyz.tleskiv.tt.repo.AnalyticsRepository

class AnalyticsRepositoryImpl(
	private val database: AppDatabase,
	private val ioDispatcher: CoroutineDispatcher
) : AnalyticsRepository {
	override val summary: Flow<GetAnalyticsSummary> =
		database.appDatabaseQueries.getAnalyticsSummary().asFlow().mapToOne(ioDispatcher)
}
