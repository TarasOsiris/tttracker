package xyz.tleskiv.tt.di.components

import android.content.ClipData
import android.content.Context
import android.content.Intent
import androidx.core.content.FileProvider
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext
import java.io.File
import java.util.UUID

class AndroidFileSharer(
	private val context: Context,
	private val ioDispatcher: CoroutineDispatcher
) : FileSharer {

	override suspend fun shareTextFiles(files: List<SharedTextFile>) {
		val uris = withContext(ioDispatcher) {
			// A fresh folder per export, so a share target still reading the last one is not handed a
			// file that is being replaced underneath it. Older exports are swept first.
			val root = File(context.cacheDir, EXPORT_DIR).apply { deleteRecursively() }
			val folder = File(root, UUID.randomUUID().toString()).apply { mkdirs() }
			files.map { file ->
				val written = File(folder, file.name).apply { writeText(file.content) }
				FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", written)
			}
		}
		val send = Intent(Intent.ACTION_SEND_MULTIPLE).apply {
			type = files.first().mimeType
			putParcelableArrayListExtra(Intent.EXTRA_STREAM, ArrayList(uris))
			clipData = ClipData.newRawUri(null, uris.first()).apply { uris.drop(1).forEach { addItem(ClipData.Item(it)) } }
			addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
		}
		val chooser = Intent.createChooser(send, null).apply { addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) }
		context.startActivity(chooser)
	}

	private companion object {
		const val EXPORT_DIR = "export"
	}
}
