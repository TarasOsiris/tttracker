package xyz.tleskiv.tt.repo

interface MetadataRepository {
	suspend fun getValue(key: String): String?
	suspend fun getValues(keys: Collection<String>): Map<String, String>
	suspend fun setValue(key: String, value: String)

	suspend fun update(values: Map<String, String> = emptyMap(), deletedKeys: Collection<String> = emptyList())
}
