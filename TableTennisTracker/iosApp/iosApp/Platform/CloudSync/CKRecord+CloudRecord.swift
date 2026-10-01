import CloudKit
import Shared

/// Translation between Kotlin's flat `CloudRecord` and CloudKit's `CKRecord`. The field names and
/// types are decided in Kotlin (`CloudSyncRepositoryImpl`); this copies them across blind.
extension CKRecord {

    /// Stamped on every record sent, so the device receiving it can weigh it against its own row. A
    /// key of ours rather than `modificationDate`, which records when the server received the save,
    /// not when the user made the edit.
    static let modifiedAtKey = "modifiedAt"
    static let isDeletedKey = "isDeleted"

    var modifiedAt: Int64 {
        (self[Self.modifiedAtKey] as? NSNumber)?.int64Value ?? 0
    }

    /// A key CloudKit holds no value for arrives absent, which Kotlin reads as null.
    var cloudRecord: CloudRecord {
        var strings: [String: String] = [:]
        var integers: [String: KotlinLong] = [:]
        var doubles: [String: KotlinDouble] = [:]
        for key in allKeys() where key != Self.modifiedAtKey && key != Self.isDeletedKey {
            if let string = self[key] as? String {
                strings[key] = string
            } else if let number = self[key] as? NSNumber {
                if CFNumberIsFloatType(number) {
                    doubles[key] = KotlinDouble(value: number.doubleValue)
                } else {
                    integers[key] = KotlinLong(value: number.int64Value)
                }
            }
        }
        return CloudRecord(
            recordType: recordType,
            recordName: recordID.recordName,
            strings: strings,
            integers: integers,
            doubles: doubles,
            nullKeys: [],
            isDeleted: (self[Self.isDeletedKey] as? NSNumber)?.int64Value == 1,
            modifiedAt: modifiedAt,
            systemFields: systemFieldsArchive)
    }

    /// Every key, every time: CloudKit saves only the keys a record sets, so a field left unset —
    /// including one that has just become null — would keep its old server value.
    func setValues(of cloud: CloudRecord) {
        for (key, value) in cloud.strings {
            self[key] = value as NSString
        }
        for (key, value) in cloud.integers {
            self[key] = NSNumber(value: value.int64Value)
        }
        for (key, value) in cloud.doubles {
            self[key] = NSNumber(value: value.doubleValue)
        }
        for key in cloud.nullKeys {
            self[key] = nil
        }
        self[Self.isDeletedKey] = NSNumber(value: Int64(cloud.isDeleted ? 1 : 0))
        self[Self.modifiedAtKey] = NSNumber(value: cloud.modifiedAt)
    }

    /// The change tag and friends, without the fields. Sending a save built on these is what tells
    /// CloudKit which version the edit was made against.
    var systemFieldsArchive: String {
        let coder = NSKeyedArchiver(requiringSecureCoding: true)
        encodeSystemFields(with: coder)
        coder.finishEncoding()
        return coder.encodedData.base64EncodedString()
    }

    static func fromSystemFields(_ archive: String) -> CKRecord? {
        guard let data = Data(base64Encoded: archive),
              let coder = try? NSKeyedUnarchiver(forReadingFrom: data) else { return nil }
        coder.requiresSecureCoding = true
        defer { coder.finishDecoding() }
        return CKRecord(coder: coder)
    }
}
