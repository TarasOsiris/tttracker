package xyz.tleskiv.tt.sync

/**
 * One row on its way to or from iCloud: a flat bag of fields the Swift side copies onto a `CKRecord`
 * as they are, so the field mapping lives in Kotlin only.
 *
 * One map per CloudKit field type, so each value arrives in Swift already typed. A null column is
 * absent from all three; on the way out it is listed in [nullKeys], because CloudKit saves only the
 * keys a record sets and a key left unset would keep its old server value.
 */
class CloudRecord(
	val recordType: String,
	val recordName: String,
	val strings: Map<String, String>,
	val integers: Map<String, Long>,
	val doubles: Map<String, Double>,
	val nullKeys: List<String>,
	/** A deletion. A tombstone carries no fields, so a deleted row's text does not stay in iCloud. */
	val isDeleted: Boolean,
	/** The row's updated_at, in epoch ms: what last-writer-wins compares. */
	val modifiedAt: Long,
	/** Base64 of the `CKRecord` system fields last seen, or null for a record iCloud has never had. */
	val systemFields: String?
)

class CloudRecordDeletion(val recordType: String, val recordName: String)
