package xyz.tleskiv.tt.repo.impl

import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext
import xyz.tleskiv.tt.db.AppDatabase
import xyz.tleskiv.tt.repo.MetadataRepository
import xyz.tleskiv.tt.util.nowInstant

class MetadataRepositoryImpl(
	private val database: AppDatabase,
	private val ioDispatcher: CoroutineDispatcher
) : MetadataRepository {

	override suspend fun getValue(key: String): String? = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectByKey(key).executeAsOneOrNull()?.value_
	}

	override suspend fun getValues(keys: Collection<String>): Map<String, String> = withContext(ioDispatcher) {
		database.appDatabaseQueries.selectByKeys(keys).executeAsList().associate { it.key to it.value_ }
	}

	override suspend fun setValue(key: String, value: String) = update(mapOf(key to value))

	override suspend fun update(values: Map<String, String>, deletedKeys: Collection<String>): Unit =
		withContext(ioDispatcher) {
			val now = nowInstant
			database.transaction {
				values.forEach { (key, value) -> database.appDatabaseQueries.insert(key, value, now, now) }
				deletedKeys.forEach { database.appDatabaseQueries.deleteByKey(it) }
			}
		}
}
