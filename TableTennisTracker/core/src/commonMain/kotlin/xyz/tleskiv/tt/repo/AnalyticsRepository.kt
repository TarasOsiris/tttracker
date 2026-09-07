package xyz.tleskiv.tt.repo

import kotlinx.coroutines.flow.Flow
import xyz.tleskiv.tt.db.GetAnalyticsSummary

interface AnalyticsRepository {
	val summary: Flow<GetAnalyticsSummary>
}
