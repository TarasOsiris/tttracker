import Foundation
import HealthKit

/// A table tennis workout as Apple Health recorded it, copied out of `HKWorkout` so it can cross
/// actors and drive SwiftUI.
struct HealthWorkout: Identifiable, Hashable, Sendable {
    /// `HKWorkout.uuid`, which stays the same on every device Health syncs the workout to — what a
    /// session stores to stay linked.
    let id: String
    let start: Date
    let end: Date
    let activeEnergyKilocalories: Double?
    let averageHeartRate: Double?
    let maxHeartRate: Double?
    let sourceName: String

    var duration: TimeInterval { end.timeIntervalSince(start) }
    var durationMinutes: Int { Int((duration / 60).rounded()) }
}

/// One minute of heart rate, for the chart.
struct HeartRatePoint: Identifiable, Hashable, Sendable {
    let time: Date
    let beatsPerMinute: Double

    var id: Date { time }
}

/// The app's only door into HealthKit. Read-only: nothing is written to Health yet.
///
/// Nothing read here leaves the device through the app: it is shown and forgotten, never stored in
/// the database (which iCloud syncs — App Review guideline 5.1.3 forbids health data in iCloud) and
/// never sent to analytics. Only a workout's UUID is kept, on the session it is linked to.
final class HealthStore: Sendable {
    static let shared = HealthStore()

    /// How far back the picker looks.
    static let lookback: TimeInterval = 30 * 24 * 60 * 60

    private let store = HKHealthStore()

    private static let heartRate = HKQuantityType(.heartRate)
    private static let readTypes: Set<HKObjectType> = [
        HKObjectType.workoutType(),
        heartRate,
        HKQuantityType(.activeEnergyBurned),
        HKQuantityType(.workoutEffortScore),
        HKQuantityType(.estimatedWorkoutEffortScore),
    ]

    /// False on devices without Health, such as some iPads.
    var isAvailable: Bool { HKHealthStore.isHealthDataAvailable() }

    /// Whether the user has already been asked. Health never says whether reading was allowed, so
    /// this is as close as the app gets; it is used to look for a matching workout without raising
    /// the permission sheet over a screen that did not ask for it.
    func hasAskedForAccess() async -> Bool {
        guard isAvailable else { return false }
        let status = try? await store.statusForAuthorizationRequest(toShare: [], read: Self.readTypes)
        return status == .unnecessary
    }

    /// Shows Health's permission sheet the first time; afterwards returns at once.
    func requestAccess() async throws {
        guard isAvailable else { return }
        try await store.requestAuthorization(toShare: [], read: Self.readTypes)
    }

    /// Table tennis workouts of the last 30 days, newest first. Empty when reading is not allowed,
    /// which Health reports the same way as having no workouts.
    func recentWorkouts() async throws -> [HealthWorkout] {
        let since = Date.now.addingTimeInterval(-Self.lookback)
        let predicate = NSCompoundPredicate(andPredicateWithSubpredicates: [
            HKQuery.predicateForWorkouts(with: .tableTennis),
            HKQuery.predicateForSamples(withStart: since, end: nil),
        ])
        let descriptor = HKSampleQueryDescriptor(
            predicates: [.workout(predicate)],
            sortDescriptors: [SortDescriptor(\.startDate, order: .reverse)]
        )
        return try await descriptor.result(for: store).map(HealthWorkout.init)
    }

    /// The workout with this UUID, or nil when it is not in Health on this device (deleted, not
    /// synced here yet, or not readable).
    func workout(id: String) async throws -> HealthWorkout? {
        try await hkWorkout(id: id).map(HealthWorkout.init)
    }

    /// Average heart rate per minute across the workout.
    func heartRate(during workout: HealthWorkout) async throws -> [HeartRatePoint] {
        let descriptor = HKStatisticsCollectionQueryDescriptor(
            predicate: .quantitySample(
                type: Self.heartRate,
                predicate: HKQuery.predicateForSamples(withStart: workout.start, end: workout.end)
            ),
            options: .discreteAverage,
            anchorDate: workout.start,
            intervalComponents: DateComponents(minute: 1)
        )
        let unit = HKUnit.count().unitDivided(by: .minute())
        return try await descriptor.result(for: store)
            .statistics()
            .compactMap { statistics in
                statistics.averageQuantity().map {
                    HeartRatePoint(time: statistics.startDate, beatsPerMinute: $0.doubleValue(for: unit))
                }
            }
    }

    /// The effort the user rated the workout on Apple Watch (1–10, the scale RPE uses), or else the
    /// one Apple estimated, if either exists.
    func effortScore(of workout: HealthWorkout) async -> Int? {
        guard let hkWorkout = try? await hkWorkout(id: workout.id) else { return nil }
        for type in [HKQuantityType(.workoutEffortScore), HKQuantityType(.estimatedWorkoutEffortScore)] {
            let descriptor = HKSampleQueryDescriptor(
                predicates: [
                    .quantitySample(
                        type: type,
                        predicate: HKQuery.predicateForWorkoutEffortSamplesRelated(workout: hkWorkout, activity: nil)
                    ),
                ],
                sortDescriptors: [SortDescriptor(\.endDate, order: .reverse)],
                limit: 1
            )
            if let sample = try? await descriptor.result(for: store).first {
                return Int(sample.quantity.doubleValue(for: .appleEffortScore()).rounded())
            }
        }
        return nil
    }

    private func hkWorkout(id: String) async throws -> HKWorkout? {
        guard let uuid = UUID(uuidString: id) else { return nil }
        let descriptor = HKSampleQueryDescriptor(
            predicates: [.workout(HKQuery.predicateForObject(with: uuid))],
            sortDescriptors: []
        )
        return try await descriptor.result(for: store).first
    }
}

private extension HealthWorkout {
    init(_ workout: HKWorkout) {
        let bpm = HKUnit.count().unitDivided(by: .minute())
        let heartRate = workout.statistics(for: HKQuantityType(.heartRate))
        id = workout.uuid.uuidString
        start = workout.startDate
        end = workout.endDate
        activeEnergyKilocalories = workout.statistics(for: HKQuantityType(.activeEnergyBurned))?
            .sumQuantity()?
            .doubleValue(for: .kilocalorie())
        averageHeartRate = heartRate?.averageQuantity()?.doubleValue(for: bpm)
        maxHeartRate = heartRate?.maximumQuantity()?.doubleValue(for: bpm)
        sourceName = workout.sourceRevision.source.name
    }
}
