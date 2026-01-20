package xyz.tleskiv.tt.repo.impl

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.repo.MetadataRepository
import xyz.tleskiv.tt.util.nowMillis

class MetadataRepositoryImpl(
	private val database: AppDatabase,
	private val ioDispatcher: CoroutineDispatcher
) : MetadataRepository {

	override suspend fun getValue(key: String): String? = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectByKey(key).executeAsOneOrNull()?.value_
	}

	override suspend fun setValue(key: String, value: String): Unit = withContext(ioDispatcher) {
		val now = nowMillis
		database.appDatabaseQueries.insert(key, value, now, now)
	}
}
