package xyz.tleskiv.tt.repo

interface MetadataRepository {
	suspend fun getValue(key: String): String?
	suspend fun setValue(key: String, value: String)
}
