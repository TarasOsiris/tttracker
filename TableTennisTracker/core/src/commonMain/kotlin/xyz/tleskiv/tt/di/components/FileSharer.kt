package xyz.tleskiv.tt.di.components

/** Hands generated text files to the platform's share sheet. */
interface FileSharer {
	suspend fun shareTextFiles(files: List<SharedTextFile>)
}

data class SharedTextFile(val name: String, val mimeType: String, val content: String)
